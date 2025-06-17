'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { SiBmw } from 'react-icons/si';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const loginUrl = `${apiUrl}/login`;

        try {
            const response = await axios.post(loginUrl, { email, password });
            const { token, user } = response.data;
            Cookies.set('auth_token', token, { expires: 1 / 24, secure: process.env.NODE_ENV === 'production' });

            if (user.role === 'admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            setError("E-mail ou senha inválidos. Tente novamente.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
            {/* --- PAINEL DA DIREITA: FORMULÁRIO --- */}
            <div className="relative flex items-center justify-center py-12 h-screen">

                <Link href="/" passHref>
                    <Button variant="ghost" className="absolute top-8 left-8">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar para Home
                    </Button>
                </Link>

                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <SiBmw className="h-8 w-8 mx-auto" />
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Insira seu e-mail para acessar o painel
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="seu@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Senha</Label>

                                    {/* --- 2. MUDANÇA APLICADA AQUI --- */}
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="link" type="button" className="ml-auto inline-block h-auto p-0 text-sm underline">
                                                Esqueceu sua senha?
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Recuperação de Senha</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Para redefinir sua senha, por favor, entre em contato diretamente com o administrador do sistema.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogAction>Entendido</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                </div>
                                <Input id="password" type="password" placeholder="********" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            {error && (<p className="text-red-500 text-sm">{error}</p>)}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Entrando...' : 'Login'}
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Não tem uma conta?{" "}
                        <Link href="#" className="underline">
                            Cadastre-se
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- PAINEL DA ESQUERDA: IMAGEM --- */}
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/images/m4cs.jpg"
                    alt="Imagem de um carro de luxo"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}