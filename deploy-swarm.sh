#!/bin/bash
echo "=== ЗАПУСК СИСТЕМЫ В SWARM ==="

# 1. Очистка
echo "1. Очистка..."
docker stack rm restaurant 2>/dev/null || true
docker service rm $(docker service ls -q) 2>/dev/null || true
sleep 3

# 2. Тегирование образов 
echo "2. Тегирование образов..."
docker tag restarant-system-backend:latest restaurant-backend:latest
docker tag restarant-system-frontend:latest restaurant-frontend:latest

# 3. Проверить
echo "3. Проверка образов:"
docker images | grep -E "(restaurant|restarant)"

# 4. Инициализация Swarm
echo "4. Инициализация Swarm..."
docker swarm init 2>/dev/null || echo "Swarm уже инициализирован"

# 5. Запуск стека
echo "5. Запуск стека..."
docker stack deploy -c docker-compose-swarm.yml restaurant

# 6. Ожидание запуска
echo "6. Ожидание запуска (40 секунд)..."
sleep 40

# 7. Проверка
echo "=== РЕЗУЛЬТАТ ==="
docker service ls