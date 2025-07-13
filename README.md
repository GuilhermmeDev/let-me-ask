# 🎤 Let me Ask

**Uma plataforma minimalista e moderna de perguntas e respostas ao vivo**, com suporte a interações por texto e áudio, e respostas geradas automaticamente com inteligência artificial.

> Aplicação fullstack em monorepo, com tecnologias modernas no frontend e backend, ideal para eventos ao vivo, workshops, salas de aula e muito mais.

---

## ✨ Funcionalidades

- **Landing Page** com apresentação do projeto e chamada para ação
- **Criação de Salas** com nome e descrição
- **Lista de Salas Recentes** para acesso rápido
- **Envio de Perguntas** validadas por formulário
- **Respostas por IA** geradas automaticamente
- **Gravação e Upload de Áudio** por participantes
- **Interface Responsiva** e amigável

---

## 🧱 Estrutura do Monorepo
```bash
nlw-agents/
├── server/ # Backend (Fastify + PostgreSQL + Drizzle)
├── web/ # Frontend (React + Vite + Tailwind)
└── README.md # Este arquivo
```


---

## 🧠 Tecnologias

### Frontend (`/web`)

- **React 19** + **TypeScript**
- **Vite** — Dev/build tool ultrarrápido
- **Tailwind CSS** — Estilização moderna com utilitários
- **React Router DOM** — Roteamento SPA
- **React Hook Form** + **Zod** — Formulários com validação
- **TanStack React Query** — Cache e requisições assíncronas
- **Lucide React** — Ícones modernos
- **Day.js** — Manipulação de datas
- **Radix UI** — Componentes acessíveis
- **Biome** — Linter e formatter de código

### Backend (`/server`)

- **Fastify** — API performática e leve
- **Drizzle ORM** — Migrations, seed e schemas tipados
- **PostgreSQL** — Banco de dados relacional via Docker
- **Zod** — Validação de variáveis de ambiente
- **Docker Compose** — Setup do banco local
- **TypeScript** — Segurança com tipagem estática

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js **18+**
- Docker e Docker Compose

---

### 1. Clone o projeto

```bash
git clone https://github.com/seu-usuario/nlw-agents.git
cd nlw-agents
```

### 2. Suba o banco de dados com Docker
```bash
cd server
docker-compose up -d
```

### 3. Configure o backend

```bash
cp .env.example .env
# edite o .env se necessário
npm install
npx drizzle-kit push:pg
npm run db:seed     # opcional
npm run dev         # inicia a API em http://localhost:3333
```

### 4. Configure o frontend
```bash
cd ../web
npm install
npm run dev         # inicia a aplicação em http://localhost:5173
```


# 📁 Estrutura resumida
`/web`
```bash
src/
├── pages/         # Landing, Criação de Sala, Sala, etc.
├── components/    # Componentes reutilizáveis
├── http/          # Hooks para API
├── lib/           # Utilitários
```

`/server`
```bash
src/
├── db/
│   ├── connection.ts
│   ├── migrations/
│   ├── schemas/
│   └── seed.ts
├── env.ts
├── server.ts
└── http/routes/
```

# 📦 Scripts úteis
## Web

`npm run dev` — Dev server

`npm run build` — Build de produção

`npm run preview` — Visualiza a build

## Server

`npm run dev` — Inicia o servidor com hot reload

`npm run db:seed` — Popula o banco com dados fake

`npm start` — Inicia o servidor em produção

# 🙋 Contribuição

Sinta-se à vontade para abrir issues ou pull requests. Sugestões de melhoria são bem-vindas!
