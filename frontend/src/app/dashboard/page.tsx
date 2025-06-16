'use client';

import { useEffect, useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Wrench, Car as CarIcon } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface Maintenance { id: number; description: string; date: string; cost: number; }
interface Vehicle { id: number; model: string; year: number; plate: string; ownerId: number; maintenances?: Maintenance[]; }

export default function UserDashboardPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Estados para os Modais
    const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
    const [newVehicle, setNewVehicle] = useState({ model: '', year: '', plate: '' });
    const [viewingVehicle, setViewingVehicle] = useState<Vehicle | null>(null);
    const [isLoadingMaintenances, setIsLoadingMaintenances] = useState(false);
    const [newMaintData, setNewMaintData] = useState({ description: '', date: '', cost: '' });

    // --- Lógica de Dados ---
    const fetchVehicles = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get('/vehicles');
            setVehicles(response.data);
        } catch (err) {
            console.error("Falha ao buscar veículos:", err);
            setError("Não foi possível carregar sua garagem. Por favor, tente recarregar a página.");
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
            await api.post('/vehicles', { ...newVehicle, year: parseInt(newVehicle.year, 10) });
            toast.success("Veículo adicionado à sua garagem!");
            setIsAddVehicleOpen(false);
            setNewVehicle({ model: '', year: '', plate: '' });
            fetchVehicles();
        } catch (err) {
            toast.error("Falha ao adicionar veículo.");
            console.error(err);
        }
    };

    const handleViewMaintenances = async (vehicle: Vehicle) => {
        setViewingVehicle(vehicle);
        setIsLoadingMaintenances(true);
        try {
            const response = await api.get(`/vehicles/${vehicle.id}`);
            setViewingVehicle(response.data);
        } catch (err) {
            toast.error("Falha ao carregar manutenções.");
            console.error(err);
        } finally {
            setIsLoadingMaintenances(false);
        }
    };

    const handleAddMaintenance = async (e: FormEvent) => {
        e.preventDefault();
        if (!viewingVehicle || !newMaintData.date) {
            toast.error("Por favor, preencha todos os campos, incluindo a data.");
            return;
        }
        try {
            await api.post(`/vehicles/${viewingVehicle.id}/maintenances`, { ...newMaintData, cost: Number(newMaintData.cost) });
            toast.success(`Manutenção adicionada ao ${viewingVehicle.model}!`);
            setNewMaintData({ description: '', date: '', cost: '' });
            handleViewMaintenances(viewingVehicle);
        } catch (err) {
            toast.error("Falha ao adicionar manutenção.");
            console.error(err);
        }
    };

    if (isLoading) return <p className="p-8">Carregando sua garagem...</p>;
    if (error) return <p className="p-8 text-red-500">{error}</p>;

    return (
        <div className="flex flex-col gap-8">
            {/* Seção de Boas-Vindas */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Bem-vindo ao seu Painel!</h1>
                <p className="text-muted-foreground">Acompanhe seus veículos e o histórico de manutenções.</p>
            </div>

            {/* Cabeçalho da Seção de Veículos */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Minha Garagem</h2>
                <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
                    <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Veículo</Button></DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader><DialogTitle>Adicionar Novo Veículo</DialogTitle><DialogDescription>Preencha os dados do seu veículo.</DialogDescription></DialogHeader>
                        <form onSubmit={handleAddVehicle}><div className="grid gap-4 py-4"><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="model" className="text-right">Modelo</Label><Input id="model" value={newVehicle.model} onChange={e => setNewVehicle({ ...newVehicle, model: e.target.value })} className="col-span-3" required /></div><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="year" className="text-right">Ano</Label><Input id="year" type="number" value={newVehicle.year} onChange={e => setNewVehicle({ ...newVehicle, year: e.target.value })} className="col-span-3" required /></div><div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="plate" className="text-right">Placa</Label><Input id="plate" value={newVehicle.plate} onChange={e => setNewVehicle({ ...newVehicle, plate: e.target.value })} className="col-span-3" required /></div></div><DialogFooter><Button type="submit">Adicionar à Garagem</Button></DialogFooter></form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Grid de Veículos ou Mensagem de Garagem Vazia */}
            {vehicles.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {vehicles.map(vehicle => (
                        <Card key={vehicle.id} className="flex flex-col">
                            <CardHeader><CardTitle>{vehicle.model}</CardTitle><CardDescription>Placa: {vehicle.plate} | Ano: {vehicle.year}</CardDescription></CardHeader>
                            <CardContent className="flex-grow"><p className="text-sm text-muted-foreground">Clique abaixo para ver o histórico ou adicionar um novo serviço.</p></CardContent>
                            <CardFooter>
                                <Button onClick={() => handleViewMaintenances(vehicle)} className="w-full"><Wrench className="mr-2 h-4 w-4" /> Ver/Adicionar Manutenções</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-8 py-20">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <CarIcon className="h-12 w-12 text-muted-foreground" />
                        <h3 className="text-2xl font-bold tracking-tight">Sua garagem está vazia</h3>
                        <p className="text-sm text-muted-foreground">Adicione seu primeiro veículo para começar.</p>
                    </div>
                </div>
            )}

            {/* Dialog para Ver e Adicionar Manutenções */}
            <Dialog open={!!viewingVehicle} onOpenChange={() => setViewingVehicle(null)}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader><DialogTitle>Histórico de Manutenção: {viewingVehicle?.model}</DialogTitle></DialogHeader>
                    {isLoadingMaintenances ? <p>Carregando...</p> : (
                        <div className="flex flex-col gap-4">
                            {viewingVehicle?.maintenances && viewingVehicle.maintenances.length > 0 ? (
                                <Table>
                                    <TableHeader><TableRow><TableHead>Descrição</TableHead><TableHead>Data</TableHead><TableHead className="text-right">Custo</TableHead></TableRow></TableHeader>
                                    <TableBody>{viewingVehicle.maintenances.map(m => (<TableRow key={m.id}><TableCell>{m.description}</TableCell><TableCell>{new Date(m.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell><TableCell className="text-right">R$ {m.cost.toFixed(2)}</TableCell></TableRow>))}</TableBody>
                                </Table>
                            ) : (<p className="py-4 text-center text-sm text-muted-foreground">Nenhuma manutenção registrada para este veículo.</p>)}

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Adicionar Nova Manutenção</AccordionTrigger>
                                    <AccordionContent>
                                        <form onSubmit={handleAddMaintenance} className="space-y-4 p-2">
                                            <div className="grid gap-2"><Label htmlFor="maint-desc">Descrição</Label><Textarea id="maint-desc" value={newMaintData.description} onChange={e => setNewMaintData({ ...newMaintData, description: e.target.value })} required /></div>
                                            <div className="grid gap-2"><Label htmlFor="maint-date">Data do Serviço</Label><Input id="maint-date" type="date" value={newMaintData.date} onChange={e => setNewMaintData({ ...newMaintData, date: e.target.value })} required /></div>
                                            <div className="grid gap-2"><Label htmlFor="maint-cost">Custo (R$)</Label><Input id="maint-cost" type="number" step="0.01" value={newMaintData.cost} onChange={e => setNewMaintData({ ...newMaintData, cost: e.target.value })} required /></div>
                                            <Button type="submit" size="sm">Salvar Manutenção</Button>
                                        </form>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}