# 🚗 BMW Care - Sistema de Gerenciamento de Manutenções

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</div>

## 📝 Descrição do Projeto

O **BMW Care** é uma plataforma full-stack completa para o gerenciamento de veículos e seus respectivos históricos de manutenção. Desenvolvido como projeto final acadêmico, o sistema foi construído com foco em uma arquitetura de software robusta e escalável, utilizando **Arquitetura em Cebola (Onion Architecture)** no backend para garantir a separação de responsabilidades e a manutenibilidade do código.

A aplicação conta com dois níveis de acesso:
* **Administrador:** Possui controle total sobre a plataforma, podendo gerenciar usuários, todos os veículos e todos os registros de manutenção.
* **Usuário Comum:** Pode gerenciar sua própria "garagem", cadastrando seus veículos e adicionando serviços de manutenção para cada um deles.

---

## ✨ Principais Funcionalidades

* **Autenticação Segura:** Sistema de login com JWT (JSON Web Tokens).
* **Controle de Acesso por Cargo:** Rotas e funcionalidades distintas para `Admin` e `User`.
* **Painel de Admin Completo:** CRUD (Criar, Ler, Atualizar, Deletar) de Usuários, Veículos e Manutenções.
* **Painel de Usuário Intuitivo:** Visualização da "garagem" pessoal e gestão do histórico de cada veículo.
* **Interface Moderna e Responsiva:** Frontend construído com Next.js e Shadcn/ui, garantindo uma ótima experiência em desktop e mobile.
* **Notificações em Tempo Real:** Feedback visual com Toasts para o usuário após ações de CRUD.

---

## 💻 Stack de Tecnologias

#### **Backend**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Banco de Dados:** SQLite (com o driver `better-sqlite3`)
* **Autenticação:** JSON Web Token (`jsonwebtoken`)
* **Senha:** `bcryptjs` para hashing

#### **Frontend**
* **Framework:** Next.js (com App Router)
* **Linguagem:** TypeScript
* **UI:** React
* **Componentes:** Shadcn/ui
* **Estilização:** Tailwind CSS
* **Requisições API:** Axios
* **Notificações:** Sonner

#### **Deployment**
* **Containerização:** Docker & Docker Compose

---

## 🧅 Visão Geral da Arquitetura

O backend foi desenvolvido seguindo os princípios da **Arquitetura em Cebola**, que isola a lógica de negócio de detalhes de infraestrutura. As camadas são:

1.  **Domain (Domínio):** O núcleo da aplicação. Contém apenas as entidades de negócio (`User`, `Vehicle`, etc.) e as interfaces (contratos) dos repositórios. Não conhece banco de dados, frameworks ou qualquer tecnologia externa.
2.  **Application (Aplicação):** Orquestra a lógica de negócio. Contém os **Casos de Uso** (ex: "Criar Veículo", "Deletar Usuário") que utilizam as interfaces do domínio para executar as regras de negócio da aplicação.
3.  **Infrastructure (Infraestrutura):** A camada mais externa. Aqui residem os detalhes técnicos: a implementação concreta dos repositórios (código `better-sqlite3`), o serviço de autenticação com JWT, e a configuração do banco de dados.
4.  **Presentation (Apresentação):** O ponto de entrada da API. Contém os **Controladores** e as **Rotas** do Express.js, que recebem as requisições HTTP e disparam os Casos de Uso correspondentes.

Essa estrutura garante que o coração da aplicação (a lógica de negócio) seja independente de tecnologia, facilitando a manutenção e a troca de componentes.

---

## 🚀 Como Rodar o Projeto com Docker (Recomendado)

Esta é a forma mais simples e garantida de executar o projeto completo para avaliação.

#### **Pré-requisito:**
* Ter o [**Docker Desktop**](https://www.docker.com/products/docker-desktop/) instalado e em execução na sua máquina.

#### **Instruções:**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/PedroSIDev/BMWCare.git
    ```

2.  **Navegue até a raiz do projeto clonado:**
    ```bash
    cd BMWCare
    ```

3.  **Execute o Docker Compose:**
    Este único comando irá construir as imagens do backend e do frontend e iniciar os dois serviços.
    ```bash
    docker-compose up --build
    ```
    Aguarde o processo ser finalizado.

4.  **Acesse a aplicação:**
    Abra seu navegador e acesse `http://localhost:3000`.

A aplicação completa estará no ar, com o frontend e o backend se comunicando.

---

## 🎯 Desafios e Aprendizados

O desenvolvimento deste sistema apresentou desafios que foram cruciais para o aprendizado da equipe:

* **Adotando a Arquitetura em Cebola:** O maior desafio conceitual foi aplicar rigorosamente a inversão de dependência. O resultado foi um backend desacoplado, testável e cuja biblioteca de banco de dados pôde ser trocada (de `sql.js` para `better-sqlite3`) sem impactar a lógica de negócio.

* **Problemas de Hospedagem:** A tentativa inicial de hospedar em plataformas PaaS modernas falhou devido à natureza de arquivo do SQLite. Isso nos levou a aprender e implementar uma solução com **Docker e Docker Compose**, que encapsula toda a aplicação e suas dependências, garantindo que ela rode de forma consistente em qualquer ambiente.

* **Experiência de Usuário no Frontend:** Criar um fluxo de estado consistente (como os dados do dashboard que sumiam ao navegar) foi um desafio resolvido com a aplicação de **React Context**, "elevando o estado" para o layout principal e garantindo uma experiência fluida.

---
