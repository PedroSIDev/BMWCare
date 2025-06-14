'use client';

import { useEffect, useState } from 'react';
// Não precisamos mais do useRouter e do Cookies aqui
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, Car } from 'lucide-react';
import api from '@/lib/api'; // Certifique-se de que o caminho está correto

interface Stats {
    userCount: number;
    vehicleCount: number;
}

export default function AdminDashboardPage() {
    // A lógica de busca de dados permanece a mesma
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [usersResponse, vehiclesResponse] = await Promise.all([
                    api.get('/users'),
                    api.get('/vehicles')
                ]);
                setStats({
                    userCount: usersResponse.data.length,
                    vehicleCount: vehiclesResponse.data.length,
                });
            } catch (error) {
                console.error("Falha ao buscar dados para o dashboard:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // A função handleLogout foi removida daqui

    return (
        <>
            {/* O CABEÇALHO AGORA É MAIS SIMPLES, SEM O BOTÃO DE LOGOUT */}
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>

            {isLoading ? (
                <p>Carregando estatísticas...</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* ... seus cards de estatísticas ... */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total de Usuários
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.userCount}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total de Veículos
                            </CardTitle>
                            <Car className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.vehicleCount}</div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}