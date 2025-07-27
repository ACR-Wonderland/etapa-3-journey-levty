
# Etapa 3: Persistência de Dados com PostgreSQL e Knex.js

## 🧩 Contexto

O Departamento de Polícia está avançando na modernização de seus sistemas. Após a criação da API REST (Etapa 2), que armazenava dados em memória, agora chegou o momento de dar um passo importante rumo à persistência real.  
A partir desta etapa, todos os registros de **agentes** e **casos policiais** devem ser armazenados em um **banco de dados PostgreSQL**.

Sua missão será **migrar a API existente**, que atualmente utiliza arrays, para uma solução robusta e escalável, utilizando **Knex.js** como Query Builder, **migrations** para versionamento de esquemas e **seeds** para inserir dados iniciais.

---

## 🎯 Objetivo

Refatorar a API de gerenciamento de agentes e casos policiais para utilizar um **banco de dados PostgreSQL**, com suporte a migrations e seeds, mantendo todas as funcionalidades REST da etapa anterior.

---

## **O que deve ser feito**

### 1. Configurar o banco de dados PostgreSQL com Docker
- Crie um arquivo `docker-compose.yml` na raiz do projeto para subir um container do PostgreSQL com um **volume persistente**.

Exemplo básico de `docker-compose.yml`:

```yml
version: '3'
services:
  db:
    image: postgres:15
    container_name: postgres_db
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: policia_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

- Após criar o arquivo, suba o banco de dados com:

```bash
docker compose up -d
```

---

### 2. Criar a pasta `db/`
Dentro da pasta `db/`, você deve criar os seguintes arquivos:

#### **`knexfile.js`**
Configurações de conexão com o PostgreSQL para ambiente de desenvolvimento:

```js
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'postgres',
      database: 'policia_db'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};
```

#### **`db.js`**
Arquivo responsável por criar e exportar a instância do Knex:

```js
const knex = require('knex');
const config = require('./knexfile');

const db = knex(config.development);
module.exports = db;
```

---

### 3. Criar as Migrations
- Use o Knex CLI para gerar as migrations:

```bash
npx knex migrate:make [nome da migration]

```

- As tabelas devem ter as seguintes colunas:
  - `agentes`: `id`, `nome (string)`, `dataDeIncorporacao (date)`, `cargo (string)`
  - `casos`: `id`, `titulo (string)`, `descricao (string)`, `status (aberto/solucionado)`, `agente_id (UUID)` com **foreign key** para `agentes.id`.

**IMPORTANTE! Não utilizaremos mais o uuid, pois o PostgreSQL lida com a lógica de indexação e incrementa automaticamente. Jamais explicite o id dentro de um payload que será guardado no banco de dados, pois isso pode causar comportamento indesejado**
---

### 4. Criar Seeds
- Crie seeds para popular as tabelas com pelo menos 2 agentes e 2 casos:

```bash
npx knex seed:make [nome do arquivo de seeds]

```
- Execute as seeds com:
```bash
knex seed:run
```

---

### 5. Refatorar os Repositories
- Substituir os arrays atuais por queries usando **Knex.js** (`select`, `insert`, `update`, `delete`).

---

### 6. Manter Rotas e Controladores
- Todos os endpoints de **/casos** e **/agentes** devem continuar funcionando com as mesmas regras e validações.

---

### 7. Documentar no README
Adicione instruções claras para:
- Subir o banco com Docker.
- Executar migrations:
- Rodar seeds:


---

## **Bônus 🌟**
- Adicionar um script `npm run db:reset` que derruba, recria, migra e popula o banco automaticamente.
- Implementar endpoint `/agentes/:id/casos` para listar todos os casos atribuídos a um agente.
