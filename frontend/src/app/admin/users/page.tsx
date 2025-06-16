'use client';

import { useEffect, useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    password?: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' as 'user' | 'admin' });

    // --- LÓGICA DE DADOS ---
    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (err) {
            console.error("Falha ao buscar usuários:", err);
            setError("Não foi possível carregar os usuários.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // --- LÓGICA DAS AÇÕES (HANDLERS) ---
    const handleAddUser = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/users', newUser);
            toast.success(`Usuário "${newUser.name}" criado com sucesso!`);
            setIsAddDialogOpen(false);
            setNewUser({ name: '', email: '', password: '', role: 'user' });
            fetchUsers();
        } catch (err) {
            toast.error("Falha ao adicionar usuário.");
            console.error("Falha ao adicionar usuário:", err);
        }
    };

    const handleUpdateUser = async (e: FormEvent) => {
        e.preventDefault();
        if (!editingUser) return;

        const userData = { ...editingUser };
        if (!userData.password) {
            delete userData.password;
        }

        try {
            await api.put(`/users/${editingUser.id}`, userData);
            toast.success(`Usuário "${editingUser.name}" atualizado com sucesso!`);
            setIsEditDialogOpen(false);
            setEditingUser(null);
            fetchUsers();
        } catch (err) {
            toast.error("Falha ao atualizar usuário.");
            console.error("Falha ao atualizar usuário:", err);
        }
    };

    const handleDeleteUser = async () => {
        if (!userToDelete) return;

        try {
            await api.delete(`/users/${userToDelete.id}`);
            toast.success(`Usuário "${userToDelete.name}" deletado com sucesso!`);
            setUserToDelete(null);
            fetchUsers();
        } catch (err) {
            toast.error("Falha ao deletar usuário.");
            console.error("Falha ao deletar usuário:", err);
        }
    };

    const openEditDialog = (user: User) => {
        setEditingUser({ ...user, password: '' });
        setIsEditDialogOpen(true);
    };

    // --- RENDERIZAÇÃO ---
    if (isLoading) return <p>Carregando usuários...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Gerenciar Usuários</h1>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" className="gap-1">
                            <PlusCircle className="h-4 w-4" />
                            Adicionar Usuário
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader><DialogTitle>Adicionar Novo Usuário</DialogTitle></DialogHeader>
                        <form onSubmit={handleAddUser}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="name" className="text-right">Nome</Label><Input id="name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} className="col-span-3" required /></div>
                                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="email" className="text-right">Email</Label><Input id="email" type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} className="col-span-3" required /></div>
                                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="password" className="text-right">Senha</Label><Input id="password" type="password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} className="col-span-3" required /></div>
                                <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="role" className="text-right">Cargo</Label><Select value={newUser.role} onValueChange={(value: 'user' | 'admin') => setNewUser({ ...newUser, role: value })}><SelectTrigger className="col-span-3"><SelectValue placeholder="Selecione o cargo" /></SelectTrigger><SelectContent><SelectItem value="user">Usuário Comum</SelectItem><SelectItem value="admin">Administrador</SelectItem></SelectContent></Select></div>
                            </div>
                            <DialogFooter><Button type="submit">Salvar Usuário</Button></DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader><CardTitle>Usuários do Sistema</CardTitle><CardDescription>Lista de todos os usuários cadastrados.</CardDescription></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow><TableHead>Nome</TableHead><TableHead>Email</TableHead><TableHead>Cargo</TableHead><TableHead className="text-right w-[100px]">Ações</TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell><span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>{user.role}</span></TableCell>
                                    <TableCell className="text-right">
                                        <Button onClick={() => openEditDialog(user)} variant="outline" size="icon" className="h-8 w-8 mr-2"><Pencil className="h-4 w-4" /></Button>
                                        <AlertDialog open={userToDelete?.id === user.id} onOpenChange={(isOpen) => !isOpen && setUserToDelete(null)}>
                                            <AlertDialogTrigger asChild><Button onClick={() => setUserToDelete(user)} variant="destructive" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader><AlertDialogTitle>Você tem certeza?</AlertDialogTitle><AlertDialogDescription>Essa ação não pode ser desfeita. Isso irá deletar permanentemente o usuário <strong>{userToDelete?.name}</strong> e todos os seus dados.</AlertDialogDescription></AlertDialogHeader>
                                                <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDeleteUser}>Confirmar Exclusão</AlertDialogAction></AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Modal de Edição (reutiliza a estrutura) */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader><DialogTitle>Editar Usuário: {editingUser?.name}</DialogTitle></DialogHeader>
                    <form onSubmit={handleUpdateUser}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="edit-name" className="text-right">Nome</Label><Input id="edit-name" value={editingUser?.name ?? ''} onChange={e => setEditingUser(prev => prev ? { ...prev, name: e.target.value } : null)} className="col-span-3" required /></div>
                            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="edit-email" className="text-right">Email</Label><Input id="edit-email" type="email" value={editingUser?.email ?? ''} onChange={e => setEditingUser(prev => prev ? { ...prev, email: e.target.value } : null)} className="col-span-3" required /></div>
                            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="edit-password" className="text-right">Nova Senha</Label><Input id="edit-password" type="password" placeholder="(Deixe em branco para não alterar)" value={editingUser?.password ?? ''} onChange={e => setEditingUser(prev => prev ? { ...prev, password: e.target.value } : null)} className="col-span-3" /></div>
                            <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="edit-role" className="text-right">Cargo</Label><Select value={editingUser?.role} onValueChange={(value: 'user' | 'admin') => setEditingUser(prev => prev ? { ...prev, role: value } : null)}><SelectTrigger className="col-span-3"><SelectValue placeholder="Selecione o cargo" /></SelectTrigger><SelectContent><SelectItem value="user">Usuário Comum</SelectItem><SelectItem value="admin">Administrador</SelectItem></SelectContent></Select></div>
                        </div>
                        <DialogFooter><Button type="submit">Salvar Alterações</Button></DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}