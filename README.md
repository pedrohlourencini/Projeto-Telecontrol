# Sistema de Ordem de Serviço - Telecontrol

Sistema desenvolvido para gerenciar ordens de serviço da empresa Telecontrol. Permite cadastrar clientes, produtos e controlar todo o fluxo de ordens de serviço com interface web responsiva e API REST.

## Tecnologias

### Backend
- PHP 8.1+ (orientação a objetos)
- PostgreSQL 15
- JWT para autenticação
- Apache
- Composer

### Frontend
- HTML5, CSS3, JavaScript
- jQuery
- Bootstrap 5
- Nginx

### Infraestrutura
- Docker e Docker Compose
- Shell Script para instalação

## Pré-requisitos

- Docker e Docker Compose
- Portas 3000, 8000 e 5432 livres

## Instalação

### Instalação Automática

```bash
git clone <url-do-repositorio>
cd Projeto-Telecontrol
chmod +x install.sh
./install.sh
```

### Instalação Manual

```bash
git clone <url-do-repositorio>
cd Projeto-Telecontrol
docker compose up -d
```

Aguarde alguns minutos para a inicialização completa.

## Acesso

Após a instalação, acesse:

- Frontend: http://localhost:3000
- API: http://localhost:8000/api
- Banco: localhost:5432

**Login padrão:**
- Email: admin@telecontrol.com
- Senha: admin123

## Funcionalidades

### Clientes
- CRUD completo
- Validação de CPF/CNPJ
- Busca simples

### Produtos
- CRUD completo
- Controle de status
- Busca básica

### Ordens de Serviço
- CRUD completo
- Relacionamento com clientes e produtos
- Sistema de status

### Segurança
- Autenticação JWT
- Validação básica de dados
- Proteção contra SQL Injection

## API

```
POST /api/auth/login          # Login
GET  /api/clientes           # Listar clientes
POST /api/clientes           # Criar cliente
PUT  /api/clientes/{id}      # Atualizar cliente
DELETE /api/clientes/{id}    # Remover cliente
GET  /api/produtos           # Listar produtos
POST /api/produtos           # Criar produto
PUT  /api/produtos/{id}      # Atualizar produto
DELETE /api/produtos/{id}    # Remover produto
GET  /api/ordens             # Listar ordens
POST /api/ordens             # Criar ordem
PUT  /api/ordens/{id}        # Atualizar ordem
DELETE /api/ordens/{id}      # Remover ordem
```

## Estrutura Simplificada

```
backend/
├── src/
│   ├── Core/           # Database, Router
│   ├── Models/         # Cliente, Produto, Ordem, Usuario
│   └── Controllers/    # Auth, CRUD
├── api/routes/         # Definição das rotas
├── database/           # Schema e dados
├── public/            # Ponto de entrada

frontend/
├── assets/            # CSS, JS
├── pages/             # HTML das páginas
├── index.html         # Página principal
```

## Comandos Úteis

```bash
# Iniciar sistema
docker compose up -d

# Parar sistema
docker compose down

# Ver logs
docker compose logs
docker compose logs php
docker compose logs postgres

# Acessar container PHP
docker exec -it telecontrol-php-1 bash

# Acessar banco PostgreSQL
docker exec -it telecontrol-postgres-1 psql -U telecontrol_user -d telecontrol_db
```

## Configuração

### Variáveis de Ambiente
```env
DB_HOST=postgres
DB_NAME=telecontrol_db
DB_USER=telecontrol_user
DB_PASS=telecontrol_pass
JWT_SECRET=your-secret-key
```

Para alterar a chave JWT, modifique `JWT_SECRET` no `docker-compose.yml` e reinicie.

## Problemas Comuns

### Containers não iniciam
```bash
# Verificar portas
netstat -tulpn | grep :3000
netstat -tulpn | grep :8000
netstat -tulpn | grep :5432
```

### Erro de conexão com banco
```bash
# Verificar logs
docker compose logs postgres
docker compose restart postgres
```

### Erro de permissão
```bash
chmod +x install.sh
chmod -R 755 backend/
chmod -R 755 frontend/
```

### Cache do navegador
- Ctrl+F5 para recarregar
- Ou limpar cache
