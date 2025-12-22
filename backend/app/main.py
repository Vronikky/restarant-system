from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from prometheus_client import Counter, generate_latest
import logging
import time

from app.db.database import Base, engine, get_db
from app import crud
from app.models.models import MenuItem, Order, OrderItem
from app.schemas.schemas import MenuItem as MenuItemSchema, MenuItemCreate, OrderCreate, Order as OrderSchema

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Создаем таблицы в базе данных
try:
    Base.metadata.create_all(bind=engine)
    logger.info("Таблицы базы данных созданы/проверены")
    
    # Запустить init_data для добавления тестовых данных
    import subprocess
    result = subprocess.run(["python", "init_data.py"], capture_output=True, text=True)
    if result.returncode == 0:
        logger.info("Тестовые данные добавлены")
    else:
        logger.warning(f"init_data.py завершился с кодом {result.returncode}: {result.stderr}")
        
except Exception as e:
    logger.error(f"Ошибка создания таблиц: {e}")

app = FastAPI(title="Restaurant Order System API", version="1.0.0")

# Настройка CORS для фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Метрики Prometheus
orders_counter = Counter('orders_total', 'Total orders')
revenue_counter = Counter('revenue_total', 'Total revenue')

@app.get("/")
def root():
    return {
        "message": "Restaurant Order System API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "menu": "/menu/",
            "orders": "/orders/",
            "health": "/health",
            "metrics": "/metrics",
            "docs": "/docs"
        }
    }

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    """Проверка здоровья приложения и подключения к БД"""
    try:
        # Проверяем подключение к базе данных
        db.execute("SELECT 1")
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": time.time(),
            "service": "restaurant-api"
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(status_code=503, detail="Database connection failed")

@app.get("/metrics")
def metrics():
    return generate_latest()

# Меню
@app.get("/menu/", response_model=list[MenuItemSchema])
def read_menu(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_menu_items(db, skip=skip, limit=limit)
    logger.info(f"Получено {len(items)} блюд из меню")
    return items

@app.post("/menu/", response_model=MenuItemSchema)
def create_menu_item(item: MenuItemCreate, db: Session = Depends(get_db)):
    return crud.create_menu_item(db=db, item=item)

# Заказы
@app.post("/orders/", response_model=OrderSchema)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    db_order = crud.create_order(db=db, order=order)
    
    logger.info(f"Создан заказ #{db_order.id} для стола {db_order.table_number}")
    
    # Обновляем метрики
    orders_counter.inc()
    revenue_counter.inc(db_order.total_amount)
    
    return db_order

@app.get("/orders/", response_model=list[OrderSchema])
def read_orders(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    orders = crud.get_orders(db, skip=skip, limit=limit)
    logger.info(f"Получено {len(orders)} заказов")
    return orders

@app.get("/orders/{order_id}", response_model=OrderSchema)
def read_order(order_id: int, db: Session = Depends(get_db)):
    order = crud.get_order(db, order_id=order_id)
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
