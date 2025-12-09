#!/bin/bash
echo "🔍 ТЕСТ СЕТЕВОГО ВЗАИМОДЕЙСТВИЯ"
echo "================================"

# 1. Показать 
echo "1. Сеть restaurant_network:"
docker network inspect restaurant_restaurant_network --format='{{range .Containers}}{{.Name}} - {{.IPv4Address}}{{"\n"}}{{end}}'

# 2. Проверить DNS resolution
echo -e "\n2. DNS разрешение имен:"
echo "   backend →" $(docker exec $(docker ps -q --filter name=restaurant_backend) nslookup backend 2>/dev/null | grep Address | tail -1)
echo "   frontend →" $(docker exec $(docker ps -q --filter name=restaurant_backend) nslookup frontend 2>/dev/null | grep Address | tail -1)
echo "   db →" $(docker exec $(docker ps -q --filter name=restaurant_backend) nslookup db 2>/dev/null | grep Address | tail -1)

# 3. Проверить соединение между сервисами
echo -e "\n3. Проверка соединений:"
echo "   Backend → DB (5432):" $(docker exec $(docker ps -q --filter name=restaurant_backend) nc -zv db 5432 2>&1 | grep succeeded || echo "FAILED")
echo "   Backend → Redis (6379):" $(docker exec $(docker ps -q --filter name=restaurant_backend) nc -zv redis 6379 2>&1 | grep succeeded || echo "FAILED")
echo "   Frontend → Backend (8000):" $(docker exec $(docker ps -q --filter name=restaurant_frontend) nc -zv backend 8000 2>&1 | grep succeeded || echo "FAILED")

# 4. Показать сетевую топологию
echo -e "\n4. Сетевая топология:"
docker network inspect restaurant_restaurant_network --format='{{json .Containers}}' | python3 -m json.tool
