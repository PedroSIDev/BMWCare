'use client';

import { useEffect, useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wrench, Pencil, Trash2, PlusCircle, Plus } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface Maintenance {
    id: number;
    description: string;
    date: string;
    cost: number;
}
interface Vehicle {
    id: number;
    model: string;
    year: number;
    plate: string;
    ownerId: number;
    maintenances?: Maintenance[];
}

export default function AdminVehiclesPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- Estados para os Modais ---
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newVehicle, setNewVehicle] = useState({ model: '', year: '', plate: '', ownerId: '' });

    const [, setIsEditDialogOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

    const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

    const [isMaintDialogOpen, setIsMaintDialogOpen] = useState(false);
    const [viewingMaintenances, setViewingMaintenances] = useState<Vehicle | null>(null);
    const [isLoadingMaintenances, setIsLoadingMaintenances] = useState(false);

    const [isAddMaintOpen, setIsAddMaintOpen] = useState(false);
    const [vehicleForNewMaint, setVehicleForNewMaint] = useState<Vehicle | null>(null);
    const [newMaintData, setNewMaintData] = useState({ description: '', date: '', cost: '' });

    // --- Lógica de Busca de Dados ---
    const fetchVehicles = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/vehicles');
            setVehicles(response.data);
        } catch (err) {
            console.error("Falha ao buscar veículos:", err);
            setError("Não foi possível carregar os veículos.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    // --- Lógica das Ações (Handlers) ---
    const handleAddVehicle = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/vehicles', {
                ...newVehicle,
                year: parseInt(newVehicle.year, 10),
                ownerId: parseInt(newVehicle.ownerId, 10),
            });
            toast.success("Veículo adicionado com sucesso!");
            setIsAddDialogOpen(false);
            setNewVehicle({ model: '', year: '', plate: '', ownerId: '' });
            fetchVehicles();
        } catch (err) {
            toast.error("Falha ao adicionar veículo.");
            console.error(err);
        }
    };

    const handleUpdateVehicle = async (e: FormEvent) => {
        e.preventDefault();
        if (!editingVehicle) return;
        try {
            await api.put(`/vehicles/${editingVehicle.id}`, {
                model: editingVehicle.model,
                year: parseInt(String(editingVehicle.year), 10),
                plate: editingVehicle.plate,
            });
            toast.success("Veículo atualizado com sucesso!");
            setIsEditDialogOpen(false);
            setEditingVehicle(null);
            fetchVehicles();
        } catch (err) {
            toast.error("Falha ao atualizar veículo.");
            console.error(err);
        }
    };

    const handleDeleteVehicle = async () => {
        if (!vehicleToDelete) return;
        try {
            await api.delete(`/vehicles/${vehicleToDelete.id}`);
            toast.success("Veículo deletado com sucesso!");
            setVehicleToDelete(null);
            fetchVehicles();
        } catch (err) {
            toast.error("Falha ao deletar veículo.");
            console.error(err);
        }
    };

    const handleViewMaintenances = async (vehicle: Vehicle) => {
        setViewingMaintenances(vehicle);
        setIsMaintDialogOpen(true);
        setIsLoadingMaintenances(true);
        try {
            const response = await api.get(`/vehicles/${vehicle.id}`);
            setViewingMaintenances(response.data);
        } catch (err) {
            console.error("Falha ao buscar manutenções:", err);
            toast.error("Não foi possível carregar as manutenções.");
        } finally {
            setIsLoadingMaintenances(false);
        }
    };

    const handleAddMaintenance = async (e: FormEvent) => {
        e.preventDefault();
        if (!vehicleForNewMaint) return;
        try {
            await api.post(`/vehicles/${vehicleForNewMaint.id}/maintenances`, {
                ...newMaintData,
                cost: Number(newMaintData.cost),
            });
            toast.success(`Manutenção adicionada ao veículo ${vehicleForNewMaint.model}!`);
            setIsAddMaintOpen(false);
            setNewMaintData({ description: '', date: '', cost: '' });
        } catch (err) {
            toast.error("Falha ao adicionar manutenção.");
            console.error(err);
        }
    };

    const openAddMaintDialog = (vehicle: Vehicle) => {
        setVehicleForNewMaint(vehicle);
        setIsAddMaintOpen(true);
    };

    if (isLoading) return <p className="p-4">Carregando veículos...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Gerenciar Veículos</h1>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild><Button size="sm" className="gap-1"><PlusCircle className="h-4 w-4" />Adicionar Veículo</Button></DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader><DialogTitle>Adicionar Novo Veículo</DialogTitle><DialogDescription>Preencha os dados do veículo abaixo.</DialogDescription></DialogHeader>
                        <form onSubmit={handleAddVehicle}>
                            <div className="grid gap-4 py-4"><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="add-model" className="text-right">Modelo</Label><Input id="add-model" value={newVehicle.model} onChange={e => setNewVehicle({ ...newVehicle, model: e.target.value })} className="col-span-3" required /></div><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="add-year" className="text-right">Ano</Label><Input id="add-year" type="number" value={newVehicle.year} onChange={e => setNewVehicle({ ...newVehicle, year: e.target.value })} className="col-span-3" required /></div><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="add-plate" className="text-right">Placa</Label><Input id="add-plate" value={newVehicle.plate} onChange={e => setNewVehicle({ ...newVehicle, plate: e.target.value })} className="col-span-3" required /></div><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="add-ownerId" className="text-right">ID do Dono</Label><Input id="add-ownerId" type="number" value={newVehicle.ownerId} onChange={e => setNewVehicle({ ...newVehicle, ownerId: e.target.value })} className="col-span-3" required /></div></div>
                            <DialogFooter><Button type="submit">Salvar Veículo</Button></DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader><CardTitle>Frota Cadastrada</CardTitle><CardDescription>Lista de todos os veículos no sistema.</CardDescription></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Modelo</TableHead><TableHead>Placa</TableHead><TableHead>Ano</TableHead><TableHead>ID do Dono</TableHead><TableHead className="text-right w-[200px]">Ações</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {vehicles.length > 0 ? (
                                vehicles.map((vehicle) => (
                                    <TableRow key={vehicle.id}>
                                        <TableCell className="font-medium">{vehicle.model}</TableCell>
                                        <TableCell>{vehicle.plate}</TableCell>
                                        <TableCell>{vehicle.year}</TableCell>
                                        <TableCell>{vehicle.ownerId}</TableCell>
                                        <TableCell className="text-right">
                                            <Button onClick={() => openAddMaintDialog(vehicle)} variant="outline" size="icon" className="h-8 w-8 mr-2" title="Adicionar Manutenção"><Plus className="h-4 w-4" /></Button>
                                            <Button onClick={() => handleViewMaintenances(vehicle)} variant="outline" size="icon" className="h-8 w-8 mr-2" title="Ver Manutenções"><Wrench className="h-4 w-4" /></Button>
                                            <Button onClick={() => setEditingVehicle(vehicle)} variant="outline" size="icon" className="h-8 w-8 mr-2" title="Editar Veículo"><Pencil className="h-4 w-4" /></Button>
                                            <AlertDialog open={vehicleToDelete?.id === vehicle.id} onOpenChange={(isOpen) => !isOpen && setVehicleToDelete(null)}>
                                                <AlertDialogTrigger asChild><Button onClick={() => setVehicleToDelete(vehicle)} variant="destructive" size="icon" className="h-8 w-8" title="Deletar Veículo"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                                                <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle><AlertDialogDescription>Deseja realmente deletar o veículo <strong>{vehicleToDelete?.model} ({vehicleToDelete?.plate})</strong>?</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDeleteVehicle}>Deletar</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow><TableCell colSpan={5} className="h-24 text-center">Nenhum veículo encontrado.</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* --- DIALOGS / MODAIS --- */}
            <Dialog open={isMaintDialogOpen} onOpenChange={setIsMaintDialogOpen}><DialogContent className="sm:max-w-2xl"><DialogHeader><DialogTitle>Manutenções de: {viewingMaintenances?.model}</DialogTitle></DialogHeader>{isLoadingMaintenances ? <p>Carregando...</p> : (viewingMaintenances?.maintenances && viewingMaintenances.maintenances.length > 0 ? (<Table><TableHeader><TableRow><TableHead>Descrição</TableHead><TableHead>Data</TableHead><TableHead className="text-right">Custo</TableHead></TableRow></TableHeader><TableBody>{viewingMaintenances.maintenances.map(m => (<TableRow key={m.id}><TableCell>{m.description}</TableCell><TableCell>{new Date(m.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell><TableCell className="text-right">R$ {m.cost.toFixed(2)}</TableCell></TableRow>))}</TableBody></Table>) : (<p className="py-8 text-center text-muted-foreground">Nenhuma manutenção encontrada para este veículo.</p>))}</DialogContent></Dialog>
            <Dialog open={!!editingVehicle} onOpenChange={() => setEditingVehicle(null)}><DialogContent className="sm:max-w-[425px]"><DialogHeader><DialogTitle>Editar Veículo</DialogTitle></DialogHeader><form onSubmit={handleUpdateVehicle}><div className="grid gap-4 py-4"><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="edit-model" className="text-right">Modelo</Label><Input id="edit-model" value={editingVehicle?.model ?? ''} onChange={e => setEditingVehicle(prev => prev ? { ...prev, model: e.target.value } : null)} className="col-span-3" required /></div><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="edit-year" className="text-right">Ano</Label><Input id="edit-year" type="number" value={editingVehicle?.year ?? ''} onChange={e => setEditingVehicle(prev => prev ? { ...prev, year: Number(e.target.value) } : null)} className="col-span-3" required /></div><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="edit-plate" className="text-right">Placa</Label><Input id="edit-plate" value={editingVehicle?.plate ?? ''} onChange={e => setEditingVehicle(prev => prev ? { ...prev, plate: e.target.value } : null)} className="col-span-3" required /></div></div><DialogFooter><Button type="submit">Salvar Alterações</Button></DialogFooter></form></DialogContent></Dialog>
            <Dialog open={isAddMaintOpen} onOpenChange={setIsAddMaintOpen}><DialogContent><DialogHeader><DialogTitle>Adicionar Manutenção para: {vehicleForNewMaint?.model}</DialogTitle><DialogDescription>Placa: {vehicleForNewMaint?.plate}</DialogDescription></DialogHeader><form onSubmit={handleAddMaintenance}><div className="grid gap-4 py-4"><div className="grid gap-2"><Label htmlFor="maint-desc">Descrição</Label><Textarea id="maint-desc" placeholder="Ex: Troca de óleo e filtros" value={newMaintData.description} onChange={(e) => setNewMaintData({ ...newMaintData, description: e.target.value })} required /></div><div className="grid gap-2"><Label htmlFor="maint-date">Data</Label><Input id="maint-date" type="date" value={newMaintData.date} onChange={(e) => setNewMaintData({ ...newMaintData, date: e.target.value })} required /></div><div className="grid gap-2"><Label htmlFor="maint-cost">Custo (R$)</Label><Input id="maint-cost" type="number" step="0.01" placeholder="150.00" value={newMaintData.cost} onChange={(e) => setNewMaintData({ ...newMaintData, cost: e.target.value })} required /></div></div><DialogFooter><Button type="submit">Adicionar</Button></DialogFooter></form></DialogContent></Dialog>
        </div>
    );
}