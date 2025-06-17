<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f4/BMW_logo_%28gray%29.svg" alt="Logo da BMW" width="120"/>
</p>

<h1 align="center">
  BMW Care - Sistema de Gerenciamento de Manutenções
</h1>

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</div>

<br>

<div align="center">
  <strong>Acesse a aplicação completa, com deploy do frontend e backend:</strong>
  <br>
  <a href="https://bmw-care.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Acessar%20Aplicação-007BFF?style=for-the-badge&logo=vercel&logoColor=white" alt="Acessar Aplicação" />
  </a>
</div>

## BMW Care - Demonstração

[![Demonstração do BMW Care V1](https://github.com/PedroSIDev/BMWCare/blob/main/img.png)](https://www.linkedin.com/feed/update/urn:li:activity:7340408539980390401/)

<p align="center">
  <em>Clique na imagem para assistir à demonstração completa.</em>
</p>

## 📝 Descrição do Projeto

O **BMW Care** é uma plataforma full-stack completa para o gerenciamento de veículos e seus respectivos históricos de manutenção. Desenvolvido como projeto final acadêmico, o sistema foi construído com foco em uma arquitetura de software robusta e escalável, utilizando **Arquitetura em Cebola (Onion Architecture)** no backend para garantir a separação de responsabilidades e a manutenibilidade do código.

A aplicação conta com dois níveis de acesso:
* **Administrador:** Possui controle total sobre a plataforma, podendo gerenciar usuários, todos os veículos e todos os registros de manutenção.
* **Usuário Comum:** Pode gerenciar sua própria "garagem", cadastrando seus veículos e adicionando serviços de manutenção para cada um deles.

---

## ✨ Funcionalidades Detalhadas

#### Gerais
- **Login Seguro:** Autenticação baseada em JWT para proteger rotas e dados.
- **Interface Responsiva:** Experiência de usuário otimizada para desktop, tablets e smartphones.
- **Notificações em Tempo Real:** Feedback visual com Toasts para o usuário após ações de CRUD.

#### Usuário Comum
- **Gerenciamento de Garagem:** Adicione, visualize, edite e remova seus próprios veículos.
- **Histórico de Manutenção:** Crie e delete registros de manutenção para cada um de seus veículos, mantendo um histórico completo.
- **Painel Intuitivo:** Uma visão clara de todos os seus veículos e acesso rápido às suas manutenções.

#### Administrador
- **Gestão Total de Usuários:** Crie, visualize, edite e remova qualquer usuário da plataforma.
- **Visão Completa de Veículos:** Acesse e gerencie todos os veículos cadastrados no sistema, independentemente do proprietário.
- **Controle Total de Manutenções:** Visualize e gerencie todos os registros de manutenção da plataforma.
- **Painel Administrativo Dedicado:** Interfaces exclusivas para facilitar a administração geral do sistema.

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

---

## 🧅 Visão Geral da Arquitetura

O backend foi desenvolvido seguindo os princípios da **Arquitetura em Cebola**, que isola a lógica de negócio de detalhes de infraestrutura. As camadas são:

1.  **Domain (Domínio):** O núcleo da aplicação. Contém apenas as entidades de negócio (`User`, `Vehicle`, etc.) e as interfaces (contratos) dos repositórios. Não conhece banco de dados, frameworks ou qualquer tecnologia externa.
2.  **Application (Aplicação):** Orquestra a lógica de negócio. Contém os **Casos de Uso** (ex: "Criar Veículo", "Deletar Usuário") que utilizam as interfaces do domínio para executar as regras de negócio da aplicação.
3.  **Infrastructure (Infraestrutura):** A camada mais externa. Aqui residem os detalhes técnicos: a implementação concreta dos repositórios (código `better-sqlite3`), o serviço de autenticação com JWT, e a configuração do banco de dados.
4.  **Presentation (Apresentação):** O ponto de entrada da API. Contém os **Controladores** e as **Rotas** do Express.js, que recebem as requisições HTTP e disparam os Casos de Uso correspondentes.

Essa estrutura garante que o coração da aplicação (a lógica de negócio) seja independente de tecnologia, facilitando a manutenção e a troca de componentes.

---

## 🛠️ Instalação e Deploy

Você pode executar o projeto de duas maneiras: utilizando Docker (recomendado para uma experiência "plug-and-play") ou configurando os ambientes de backend e frontend manualmente.

### 🐳 Via Docker (Recomendado)

Esta é a forma mais simples e garantida de executar o projeto completo para avaliação.

**Pré-requisito:**
* Ter o [**Docker Desktop**](https://www.docker.com/products/docker-desktop/) instalado e em execução na sua máquina.

**Instruções:**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/PedroSIDev/BMWCare.git](https://github.com/PedroSIDev/BMWCare.git)
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

### 🔧 Localmente (Para Desenvolvimento)

Para rodar os ambientes separadamente, você precisará de dois terminais.

**1. Configurando o Backend:**
```bash
# Navegue para a pasta do backend
cd BMWCare/backend

# Instale as dependências
npm install

# Crie um arquivo .env e adicione a variável JWT_SECRET
# Ex: JWT_SECRET="seu_segredo_super_secreto"

# Inicie o servidor do backend
npm start
# O servidor estará rodando em http://localhost:3001
````

**2. Configurando o Frontend:**

```bash
# Em um novo terminal, navegue para a pasta do frontend
cd BMWCare/frontend

# Instale as dependências
npm install

# Crie um arquivo .env.local e adicione as variáveis necessárias
# NEXT_PUBLIC_API_URL="http://localhost:3001/api"
# JWT_SECRET="seu_segredo_super_secreto" (deve ser o mesmo do backend)

# Inicie o servidor de desenvolvimento
npm run dev
# A aplicação estará disponível em http://localhost:3000
```

-----

## 📡 Endpoints da API

A API segue os padrões RESTful. Todas as rotas, exceto login, são prefixadas com `/api` e protegidas, exigindo um token JWT no cabeçalho `Authorization`.

| Método HTTP | Endpoint | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/login` | Autentica um usuário e retorna um token JWT. | Público |
| `POST` | `/api/users/register`| Cria um novo usuário (disponível apenas para admins). | Admin |
| `GET` | `/api/users` | Lista todos os usuários. | Admin |
| `DELETE`| `/api/users/:id` | Deleta um usuário específico. | Admin |
| `GET` | `/api/vehicles` | Lista veículos (usuário vê os seus, admin vê todos).| User, Admin|
| `POST` | `/api/vehicles` | Cadastra um novo veículo para o usuário logado. | User, Admin|
| `DELETE`| `/api/vehicles/:id`| Deleta um veículo específico. | User, Admin|
| `POST` | `/api/maintenances`| Adiciona um registro de manutenção a um veículo. | User, Admin|
| `GET` | `/api/maintenances/vehicle/:vehicleId` | Lista todas as manutenções de um veículo. | User, Admin|
| `DELETE`| `/api/maintenances/:id` | Deleta um registro de manutenção. | User, Admin|

-----

## 👨‍💻 Exemplo de Uso

Para testar a aplicação, você pode seguir este fluxo:

1.  **Acesse a Aplicação:**

      * Vá para `http://localhost:3000` (se estiver rodando localmente) ou [https://bmw-care.vercel.app/](https://bmw-care.vercel.app/).

2.  **Login como Administrador:**

      * A base de dados é inicializada com um usuário administrador padrão. Utilize as seguintes credenciais para fazer login:
          * **Email:** `admin@bmw.com`
          * **Senha:** `admin123`

3.  **Navegue pelo Painel de Admin:**

      * No dashboard, você terá acesso total. Experimente criar um novo usuário clicando no botão correspondente. Por exemplo:
          * **Email:** `usuario@teste.com`
          * **Senha:** `senha123`

4.  **Login como Usuário Comum:**

      * Faça logout da conta de administrador.
      * Acesse novamente a página de login e entre com as credenciais do novo usuário que você acabou de criar.

5.  **Gerencie sua Garagem:**

      * Você será redirecionado para o dashboard de usuário.
      * Adicione um novo veículo à sua garagem.
      * Selecione o veículo recém-criado para visualizar seu histórico e adicione um novo registro de manutenção.

-----

## 🎯 Desafios e Aprendizados

O desenvolvimento deste sistema apresentou desafios que foram cruciais para o aprendizado:

  * **Adotando a Arquitetura em Cebola:** O maior desafio conceitual foi aplicar rigorosamente a inversão de dependência. O resultado foi um backend desacoplado, testável e cuja biblioteca de banco de dados pôde ser trocada (de `sql.js` para `better-sqlite3`) sem impactar a lógica de negócio.

  * **Problemas de Hospedagem:** A tentativa inicial de hospedar em plataformas PaaS modernas falhou devido à natureza de arquivo do SQLite. Isso nos levou a aprender e implementar uma solução com **Docker e Docker Compose**, que encapsula toda a aplicação e suas dependências, garantindo que ela rode de forma consistente em qualquer ambiente.

  * **Experiência de Usuário no Frontend:** Criar um fluxo de estado consistente (como os dados do dashboard que sumiam ao navegar) foi um desafio resolvido com a aplicação de **React Context**, "elevando o estado" para o layout principal e garantindo uma experiência fluida.
