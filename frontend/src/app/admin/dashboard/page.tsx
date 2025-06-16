'use client';

import Link from 'next/link';
import { useAdminStats } from '@/context/AdminStatsContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Users, Car, Wrench, ArrowUpRight } from 'lucide-react';

export default function AdminDashboardPage() {
    const { stats, isLoading } = useAdminStats();

    const statCards = [
        {
            title: "Total de Usuários",
            count: stats?.userCount,
            icon: Users,
            href: "/admin/users"
        },
        {
            title: "Total de Veículos",
            count: stats?.vehicleCount,
            icon: Car,
            href: "/admin/vehicles"
        },
        {
            title: "Total de Manutenções",
            count: stats?.maintenanceCount,
            icon: Wrench,
            href: "/admin/maintenances"
        }
    ];

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>

            {isLoading ? (
                <p>Carregando estatísticas...</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {statCards.map((card) => (
                        <Link href={card.href} key={card.title}>
                            <Card className="hover:bg-accent hover:text-accent-foreground transition-colors">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {card.title}
                                    </CardTitle>
                                    <card.icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{card.count ?? 0}</div>
                                </CardContent>
                                <CardFooter>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                        Ver detalhes <ArrowUpRight className="h-3 w-3" />
                                    </div>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}