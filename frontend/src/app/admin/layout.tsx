'use client'; // 1. Adicionado para permitir interatividade (hooks e eventos)

import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 2. Importado o useRouter
import Cookies from 'js-cookie'; // 3. Importado o Cookies
import { Button } from '@/components/ui/button';
import { Car, Users, Wrench, LayoutDashboard, LogOut } from 'lucide-react'; // 4. Importado o ícone de Logout

export default function AdminLayout({ children }: { children: ReactNode }) {
    // 5. Adicionada a lógica de logout dentro do layout
    const router = useRouter();
    const handleLogout = () => {
        Cookies.remove('auth_token');
        router.push('/authpage');
    };
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            {/* Sidebar */}
            <div className="hidden border-r border-zinc-800 bg-zinc-950 text-zinc-50 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b border-zinc-800 px-4 lg:h-[60px] lg:px-6">
                        <Link href="/admin/dashboard" className="flex items-center gap-3 font-semibold">
                            <Car className="h-6 w-6" />
                            <span>Painel Admin</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-4">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <Link
                                href="/admin/dashboard"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-zinc-50"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link
                                href="#" // Substitua pelo link real, ex: /admin/users
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-zinc-50"
                            >
                                <Users className="h-4 w-4" />
                                Gerenciar Usuários
                            </Link>
                            <Link
                                href="#" // Substitua pelo link real, ex: /admin/vehicles
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-zinc-50"
                            >
                                <Car className="h-4 w-4" />
                                Gerenciar Veículos
                            </Link>
                            <Link
                                href="#" // Substitua pelo link real, ex: /admin/maintenances
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-400 transition-all hover:text-zinc-50"
                            >
                                <Wrench className="h-4 w-4" />
                                Gerenciar Manutenções
                            </Link>
                        </nav>
                    </div>
                    <div className="mt-auto border-t border-zinc-800 p-4">
                        <Button onClick={handleLogout} variant="ghost" className="w-full justify-start gap-2">
                            <LogOut className="h-4 w-4" />
                            Sair (Logout)
                        </Button>
                    </div>
                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="flex flex-col">
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}