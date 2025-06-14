'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove('auth_token');
        router.push('/');
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Button onClick={handleLogout} variant="destructive">
                    Sair (Logout)
                </Button>
            </div>
            <p className="mt-4">Bem-vindo! Você está logado.</p>
            {/* Aqui você vai listar os veículos, etc. */}
        </div>
    );
}