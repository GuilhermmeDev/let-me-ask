<div align="center">
  <h1>nlw-agents &mdash; Backend</h1>
  <p>API Node.js para gerenciamento de salas, usando Fastify, Drizzle ORM, PostgreSQL (via Docker) e validação com Zod.</p>
</div>

---

## ✨ Visão Geral

Este projeto é o backend do <b>nlw-agents</b>, fornecendo endpoints para gerenciamento de salas (rooms) e integração com banco de dados PostgreSQL. Utiliza Fastify para a API, Drizzle ORM para migrations e seed, e Docker para facilitar o setup do banco.

---

## 🚀 Tecnologias & Bibliotecas

- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/) (via Docker)
- [Zod](https://zod.dev/) (validação de env)
- [@fastify/cors](https://github.com/fastify/fastify-cors)
- [drizzle-seed](https://github.com/drizzle-team/drizzle-seed)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📁 Estrutura do Projeto

```
server/
├── src/
│   ├── db/
│   │   ├── connection.ts         # Conexão com o banco via Drizzle
│   │   ├── seed.ts               # Seed do banco
│   │   ├── migrations/           # Migrations SQL
│   │   └── schemas/              # Schemas das tabelas
│   ├── env.ts                    # Validação das variáveis de ambiente
│   ├── server.ts                 # Inicialização do servidor Fastify
│   └── http/routes/              # Rotas HTTP
├── docker-compose.yaml           # Setup do PostgreSQL com Docker
├── drizzle.config.ts             # Configuração do Drizzle
├── .env.example                  # Exemplo de variáveis de ambiente
└── package.json                  # Scripts e dependências
```

---

## ⚙️ Configuração & Uso

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/nlw-agents.git
cd nlw-agents/server
```

### 2. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e preencha os valores:

```bash
cp .env.example .env
```

Exemplo:

```env
PORT=3333
DATABASE_URL=postgres://docker:docker@localhost:5432/nlw_agents
```

### 3. Suba o banco de dados com Docker

```bash
docker-compose up -d
```

### 4. Instale as dependências

```bash
npm install
```

### 5. Rode as migrations (Drizzle)

```bash
npx drizzle-kit push:pg
```

### 6. (Opcional) Popule o banco com seed

```bash
npm run db:seed
```

### 7. Inicie o servidor em modo desenvolvimento

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`.

---

## 🛣️ Endpoints

- `GET /rooms` — Lista todas as salas cadastradas.

Exemplo de uso (arquivo `client.http`):

```http
GET http://localhost:3333/rooms
```

---

## 📝 Scripts úteis

- `npm run dev` — Inicia o servidor com hot reload
- `npm start` — Inicia o servidor em produção
- `npm run db:seed` — Reseta e popula o banco com dados fake

---

## 🐳 Banco de Dados via Docker

O serviço PostgreSQL é configurado via `docker-compose.yaml` e já inclui a extensão `vector` (pgvector). Usuário, senha e banco padrão: `docker`/`docker`/`nlw_agents`.

---

## 🛡️ Validação de Ambiente

As variáveis de ambiente são validadas com Zod (`src/env.ts`).

---

## 🧩 Migrations & Seed

- Migrations SQL ficam em `src/db/migrations/`
- Schemas das tabelas em `src/db/schemas/`
- Para rodar seed: `npm run db:seed`

---

## 🙋‍♂️ Contribuição

Sinta-se livre para abrir issues ou pull requests!
