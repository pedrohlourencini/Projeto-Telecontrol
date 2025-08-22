#!/bin/bash

echo "=== Sistema de Ordem de Serviço - Telecontrol ==="
echo ""

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo "Docker não está instalado"
    exit 1
fi

echo "Docker encontrado"
echo ""

# Criar .env se não existir
if [ ! -f .env ]; then
    echo "Criando arquivo .env..."
    cat > .env << EOF
DB_HOST=postgres
DB_PORT=5432
DB_NAME=telecontrol_db
DB_USER=telecontrol_user
DB_PASS=telecontrol_pass
JWT_SECRET=your-secret-key
EOF
    echo "Arquivo .env criado"
fi

# Iniciar containers
echo "Iniciando containers..."
docker compose up -d

echo ""
echo "Instalação concluída!"
echo ""
echo "Acesse: http://localhost:3000"
echo "Login: admin@telecontrol.com / admin123"
echo ""
echo "Comandos:"
echo "   docker-compose down     # Parar"
echo "   docker-compose logs     # Ver logs"
