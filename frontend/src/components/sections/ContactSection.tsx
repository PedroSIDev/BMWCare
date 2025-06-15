import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
    return (
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-5xl text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Entre em Contato
                    </h2>
                    <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                        Tem alguma dúvida ou quer saber mais sobre o projeto? Fale conosco.
                    </p>
                </div>
                <div className="mx-auto mt-12 grid max-w-5xl items-start gap-10 lg:grid-cols-2">
                    {/* Coluna da Esquerda: Informações de Contato */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Email</h3>
                                <p className="text-muted-foreground">
                                    Nos envie um email para mais informações.
                                </p>
                                <a href="mailto:contato@bmwcare.com" className="font-medium text-primary hover:underline">
                                    contato@bmwcare.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <Phone className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Telefone</h3>
                                <p className="text-muted-foreground">
                                    Nosso time está disponível de Seg a Sex, das 9h às 18h.
                                </p>
                                <a href="tel:+5534999999999" className="font-medium text-primary hover:underline">
                                    +55 (34) 99999-9999
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Localização</h3>
                                <p className="text-muted-foreground">
                                    Uberaba, Minas Gerais, Brasil
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Coluna da Direita: Formulário de Contato */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Envie sua Mensagem</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label htmlFor="first-name">Nome</Label><Input id="first-name" placeholder="Seu nome" /></div>
                                    <div className="space-y-2"><Label htmlFor="last-name">Sobrenome</Label><Input id="last-name" placeholder="Seu sobrenome" /></div>
                                </div>
                                <div className="space-y-2"><Label htmlFor="email-form">Email</Label><Input id="email-form" type="email" placeholder="seu@email.com" /></div>
                                <div className="space-y-2"><Label htmlFor="message">Sua Mensagem</Label><Textarea id="message" placeholder="Digite sua mensagem aqui..." className="min-h-[120px]" /></div>
                                <Button type="submit" className="w-full">Enviar Mensagem</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}