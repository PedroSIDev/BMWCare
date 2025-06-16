'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';

interface Stats {
    userCount: number;
    vehicleCount: number;
    maintenanceCount: number;
}

interface AdminStatsContextType {
    stats: Stats | null;
    isLoading: boolean;
}

const AdminStatsContext = createContext<AdminStatsContextType | undefined>(undefined);

export function AdminStatsProvider({ children }: { children: ReactNode }) {
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [usersResponse, vehiclesResponse, maintenancesResponse] = await Promise.all([
                    api.get('/users'),
                    api.get('/vehicles'),
                    api.get('/maintenances'),
                ]);
                setStats({
                    userCount: usersResponse.data.length,
                    vehicleCount: vehiclesResponse.data.length,
                    maintenanceCount: maintenancesResponse.data.length,
                });
            } catch (err) {
                console.error("Falha ao buscar dados para o contexto:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <AdminStatsContext.Provider value={{ stats, isLoading }}>
            {children}
        </AdminStatsContext.Provider>
    );
}

export function useAdminStats() {
    const context = useContext(AdminStatsContext);
    if (context === undefined) {
        throw new Error('useAdminStats must be used within a AdminStatsProvider');
    }
    return context;
}