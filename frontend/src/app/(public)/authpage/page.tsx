'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation'; // Importe o useRouter
import axios from 'axios';
import Cookies from 'js-cookie'; // Importe o js-cookie
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";

export default function AuthPage() {
    const [email, setEmail] = useState(""); // Pré-preenchido para facilitar o teste
    const [password, setPassword] = useState(""); // Pré-preenchido
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter(); // Inicialize o router

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // 1. Faz a chamada para a API de login
            const response = await axios.post('http://localhost:3001/api/login', {
                email,
                password
            });

            // 2. Se o login for bem-sucedido, pega o token
            const { token, user } = response.data;

            // 3. Salva o token em um cookie
            // O cookie será usado pelo Middleware para proteger rotas no servidor
            Cookies.set('auth_token', token, { expires: 1 / 24 }); // Expira em 1 hora

            // 4. Redireciona para o dashboard
            if (user.role === 'admin') {
                router.push('/admin/dashboard'); // Redireciona admin
            } else {
                router.push('/dashboard'); // Redireciona usuário comum
            }
        } catch (err) {
            // 5. Se der erro, mostra a mensagem
            setError("E-mail ou senha inválidos. Tente novamente.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Button asChild size="icon" className="bg-zinc-950">
                            <a href="/">
                                <ChevronLeft />
                            </a>
                        </Button>
                        <div>
                            <CardTitle>Painel de Login</CardTitle>
                            <CardDescription>
                                Faça login para acessar o sistema!
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@gmail.com"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Senha</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Esqueceu sua senha?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
                        )}
                        <Button
                            type="submit"
                            className="w-full mt-6 h-12 text-base font-semibold"
                            disabled={isLoading} // Desabilita o botão durante o carregamento
                        >
                            {isLoading ? 'Entrando...' : 'Login'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
