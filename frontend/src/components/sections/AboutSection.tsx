import Image from "next/image";
import { ShieldCheck, Users, Wrench, Database } from "lucide-react";

const features = [
    {
        icon: <ShieldCheck className="h-8 w-8 text-blue-500" />,
        title: "Controle de Acesso por Cargo",
        description: "Sistema de permissões robusto com dois níveis de acesso: Administrador com controle total e Usuário com acesso aos seus próprios dados."
    },
    {
        icon: <Users className="h-8 w-8 text-blue-500" />,
        title: "Gerenciamento Centralizado",
        description: "Uma plataforma única para administradores gerenciarem todos os usuários, veículos e históricos de manutenção de forma simples e eficiente."
    },
    {
        icon: <Wrench className="h-8 w-8 text-blue-500" />,
        title: "Histórico Completo",
        description: "Cada veículo possui um registro detalhado de todas as manutenções realizadas, facilitando o acompanhamento e a valorização do ativo."
    },
    {
        icon: <Database className="h-8 w-8 text-blue-500" />,
        title: "Arquitetura Sólida",
        description: "Construído com Arquitetura em Cebola (Onion Architecture), garantindo um código desacoplado, testável e fácil de manter e escalar."
    }
];

export default function AboutSection() {
    return (
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-zinc-950 text-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* A seção de texto e features à esquerda continua a mesma */}
                    <div className="space-y-4">
                        <div className="inline-block rounded-lg bg-zinc-800 px-3 py-1 text-sm">
                            Nossa Solução
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            A Plataforma Definitiva para Gestão de Veículos
                        </h2>
                        <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Nosso sistema foi desenhado para oferecer controle total e clareza sobre o ciclo de vida de cada veículo da sua frota. Da criação de usuários à gestão de manutenções, tudo em um só lugar.
                        </p>
                        <div className="grid gap-6 pt-6">
                            {features.map((feature) => (
                                <div key={feature.title} className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">{feature.title}</h3>
                                        <p className="text-sm text-gray-400">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- ÁREA DA IMAGEM ATUALIZADA --- */}
                    <div className="flex items-center justify-center">
                        <Image
                            src="/images/x6m.jpg" // 1. Caminho para a nova imagem
                            alt="Veículo BMW em destaque"         // 2. Texto alternativo atualizado
                            width={1200}
                            height={900}
                            className="
                                rounded-2xl shadow-2xl shadow-blue-500/20   
                                transform transition-all duration-500 ease-in-out 
                                -rotate-2 hover:rotate-0 hover:scale-105
                            "
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}