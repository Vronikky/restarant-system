#!/bin/bash
# deploy-fixed.sh

echo "🚀 Запуск исправленного деплоя..."

# 1. Проверка Swarm
if ! docker node ls &> /dev/null; then
    echo "🔧 Инициализация Docker Swarm..."
    docker swarm init
fi

# 2. Создание сети
echo "🌐 Создание сети..."
docker network create -d overlay restaurant_network 2>/dev/null || true

# 3. Сборка образов (если нет в Docker Hub)
echo "🔨 Сборка образов..."
docker build -t restaurant-backend:latest ./backend
docker build -t restaurant-frontend:latest ./frontend

# 4. Деплой
echo "⚡ Деплой стека..."
docker stack deploy -c docker-compose-swarm.yml restaurant

# 5. Проверка
echo "⏳ Ожидание запуска..."
sleep 10

echo "✅ Деплой завершён!"
echo ""
echo "📊 Статус:"
docker service ls

echo ""
echo "🌐 Доступно по адресам:"
echo "   • Веб-интерфейс: http://localhost"
echo "   • API:          http://localhost:8000"
echo "   • Grafana:      http://localhost:3000"
echo "   • Prometheus:   http://localhost:9090"