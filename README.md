# Sistema de Ordem de Serviço - Telecontrol

Sistema web para gerenciamento de ordens de serviço com CRUD de clientes, produtos e ordens.

## Tecnologias
- **Backend**: PHP 8.1+ (Orientado a Objetos)
- **Frontend**: HTML, JavaScript, jQuery, Bootstrap 5
- **Banco**: PostgreSQL
- **Autenticação**: JWT

## Instalação Rápida

### 1. Clone e configure
```bash
git clone <url-do-repositorio>
cd Projeto-Telecontrol
copy env.example .env
```

### 2. Execute com Docker
```bash
docker-compose up -d
```

### 3. Acesse
- **Frontend**: http://localhost:3000
- **Login**: admin@telecontrol.com / password

## Funcionalidades

### ✅ Clientes
- CRUD completo
- Validação de CPF
- Busca e filtros

### ✅ Produtos
- CRUD completo
- Controle de status e garantia
- Busca avançada

### ✅ Ordens de Serviço
- CRUD completo
- Cadastro automático de clientes
- Sistema de logs
- Validações integradas

### ✅ Segurança
- Autenticação JWT
- Validação de CPF
- Proteção contra SQL Injection
- Controle de acesso por roles

## API Endpoints

```
POST /api/auth/login          # Login
GET  /api/clientes           # Listar clientes
POST /api/clientes           # Criar cliente
GET  /api/produtos           # Listar produtos
POST /api/produtos           # Criar produto
GET  /api/ordens             # Listar ordens
POST /api/ordens             # Criar ordem
```

## Estrutura Simplificada

```
backend/
├── src/
│   ├── Core/           # Database, Router
│   ├── Models/         # Cliente, Produto, Ordem
│   ├── Controllers/    # Auth, CRUD
│   └── Middleware/     # Auth, CORS
├── database/           # Schema e dados
└── public/            # Ponto de entrada

frontend/
├── assets/            # CSS, JS
├── pages/             # HTML das páginas
└── index.html         # Página principal
```

## Comandos Úteis

```bash
docker-compose up -d    # Iniciar
docker-compose down     # Parar
docker-compose logs     # Ver logs
```
