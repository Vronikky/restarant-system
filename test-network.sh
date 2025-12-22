#!/bin/bash
echo "ТЕСТ СЕТЕВОГО ВЗАИМОДЕЙСТВИЯ В SWARM"
echo "========================================"

# 1. Показать сеть (исправленное имя)
echo "1. Сеть restaurant_restaurant_network:"
docker network inspect restaurant_restaurant_network --format='{{range .Containers}}{{.Name}} - {{.IPv4Address}}{{"\n"}}{{end}}' 2>/dev/null || echo "  Сеть не найдена или пуста"

# 2. Проверить сервисы
echo -e "\n2. Сервисы в Swarm:"
docker service ls --format "table {{.Name}}\t{{.Replicas}}\t{{.Image}}"

# 3. Проверить контейнеры
echo -e "\n3. Запущенные контейнеры:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Image}}"
