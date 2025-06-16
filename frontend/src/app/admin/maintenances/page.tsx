'use client';

import { useEffect, useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Trash2 } from 'lucide-react';
import api from '@/lib/api';
import { toast } from "sonner";
import { format } from 'date-fns';


interface Maintenance {
    id: number;
    description: string;
    date: string;
    cost: number;
    vehicleId: number;
    vehicleModel?: string;
    vehiclePlate?: string;
}

export default function AdminMaintenancesPage() {
    const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [editingMaintenance, setEditingMaintenance] = useState<Maintenance | null>(null);
    const [maintenanceToDelete, setMaintenanceToDelete] = useState<Maintenance | null>(null);

    const fetchMaintenances = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/maintenances');
            setMaintenances(response.data);
        } catch (err) {
            console.error("Falha ao buscar manutenções:", err);
            setError("Não foi possível carregar as manutenções.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMaintenances();
    }, []);

    const handleUpdateMaintenance = async (e: FormEvent) => {
        e.preventDefault();
        if (!editingMaintenance) return;
        try {
            await api.put(`/maintenances/${editingMaintenance.id}`, {
                description: editingMaintenance.description,
                date: editingMaintenance.date,
                cost: Number(editingMaintenance.cost),
            });
            toast.success("Manutenção atualizada com sucesso!");
            setEditingMaintenance(null);
            fetchMaintenances();
        } catch (err) {
            toast.error("Falha ao atualizar manutenção.");
            console.error("Falha ao atualizar manutenção:", err);
        }
    };

    const handleDeleteMaintenance = async () => {
        if (!maintenanceToDelete) return;
        try {
            await api.delete(`/maintenances/${maintenanceToDelete.id}`);
            toast.success("Manutenção deletada com sucesso!");
            setMaintenanceToDelete(null);
            fetchMaintenances();
        } catch (err) {
            toast.error("Falha ao deletar manutenção.");
            console.error("Falha ao deletar manutenção:", err);
        }
    };

    if (isLoading) return <p className="p-4">Carregando manutenções...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-lg font-semibold md:text-2xl">Gerenciar Manutenções</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Registros de Manutenção</CardTitle>
                    <CardDescription>Lista de todas as manutenções registradas no sistema.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[40%]">Descrição</TableHead>
                                <TableHead>Veículo</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Custo</TableHead>
                                <TableHead className="text-right w-[100px]">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {maintenances.length > 0 ? (
                                maintenances.map((m) => (
                                    <TableRow key={m.id}>
                                        <TableCell className="font-medium">{m.description}</TableCell>
                                        <TableCell>
                                            <div className="font-medium">{m.vehicleModel ?? 'Veículo não encontrado'}</div>
                                            <div className="text-xs text-muted-foreground">{m.vehiclePlate ?? `ID: ${m.vehicleId}`}</div>
                                        </TableCell>
                                        <TableCell>{new Date(m.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell>
                                        <TableCell>R$ {m.cost.toFixed(2)}</TableCell>
                                        <TableCell className="text-right">
                                            <Button onClick={() => setEditingMaintenance(m)} variant="outline" size="icon" className="h-8 w-8 mr-2"><Pencil className="h-4 w-4" /></Button>
                                            <AlertDialog open={maintenanceToDelete?.id === m.id} onOpenChange={(isOpen) => !isOpen && setMaintenanceToDelete(null)}>
                                                <AlertDialogTrigger asChild><Button onClick={() => setMaintenanceToDelete(m)} variant="destructive" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader><AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle><AlertDialogDescription>Deseja realmente deletar o registro de manutenção:{maintenanceToDelete?.description}?</AlertDialogDescription></AlertDialogHeader>
                                                    <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDeleteMaintenance}>Deletar</AlertDialogAction></AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        Nenhum registro de manutenção encontrado.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Dialog para Editar Manutenção */}
            <Dialog open={!!editingMaintenance} onOpenChange={() => setEditingMaintenance(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader><DialogTitle>Editar Manutenção</DialogTitle></DialogHeader>
                    <form onSubmit={handleUpdateMaintenance}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="edit-desc" className="text-right">Descrição</Label><Textarea id="edit-desc" value={editingMaintenance?.description ?? ''} onChange={e => setEditingMaintenance(prev => prev ? { ...prev, description: e.target.value } : null)} className="col-span-3" required /></div>
                            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="edit-date" className="text-right">Data</Label><Input id="edit-date" type="date" value={editingMaintenance?.date ? format(new Date(editingMaintenance.date), 'yyyy-MM-dd') : ''} onChange={e => setEditingMaintenance(prev => prev ? { ...prev, date: e.target.value } : null)} className="col-span-3" required /></div>
                            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="edit-cost" className="text-right">Custo (R$)</Label><Input id="edit-cost" type="number" step="0.01" value={editingMaintenance?.cost ?? ''} onChange={e => setEditingMaintenance(prev => prev ? { ...prev, cost: Number(e.target.value) } : null)} className="col-span-3" required /></div>
                        </div>
                        <DialogFooter><Button type="submit">Salvar Alterações</Button></DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}