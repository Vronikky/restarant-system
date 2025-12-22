import sys
import os
import time
from sqlalchemy import text


sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.database import SessionLocal, engine, Base
from app.models.models import MenuItem

def wait_for_db(max_retries=30, delay=2):
    
    db = SessionLocal()
    for i in range(max_retries):
        try:
            db.execute(text("SELECT 1"))
            print("Подключение к базе данных установлено")
            db.close()
            return True
        except Exception as e:
            print(f"Ожидание базы данных... ({i+1}/{max_retries}) - {e}")
            time.sleep(delay)
    db.close()
    return False

def init_test_data():
    print("Инициализация базы данных...")
    print("Создание таблиц...")
    Base.metadata.create_all(bind=engine)
    print("Таблицы созданы")
    # Ожидаем подключение к БД
    if not wait_for_db():
        print("Не удалось подключиться к базе данных")
        return
    
    db = SessionLocal()
    try:
        from app.db.database import Base, engine
        Base.metadata.create_all(bind=engine)
        print("Таблицы базы данных созданы")
        # Проверяем, есть ли уже данные
        if db.query(MenuItem).first():
            print("Данные уже существуют в базе")
            return
        # Добавляем тестовые блюда
        menu_items = [
            {"name": "Пицца Маргарита", "description": "Сыр, томаты, базилик", "price": 550, "category": "main"},
            {"name": "Стейк Рибай", "description": "Говядина 300г", "price": 1200, "category": "main"},
            {"name": "Паста Карбонара", "description": "Спагетти, бекон, сыр", "price": 480, "category": "main"},
            {"name": "Бургер Классик", "description": "Говядина, сыр, овощи", "price": 420, "category": "main"},
            {"name": "Курица Гриль", "description": "С картофелем", "price": 380, "category": "main"},
            {"name": "Лосось на гриле", "description": "С овощами", "price": 850, "category": "main"},
            {"name": "Салат Цезарь", "description": "Курица, пармезан", "price": 450, "category": "starters"},
            {"name": "Брускетта", "description": "Томаты, базилик", "price": 280, "category": "starters"},
            {"name": "Сырные палочки", "description": "С соусом", "price": 320, "category": "starters"},
            {"name": "Креветки в кляре", "description": "8 шт", "price": 520, "category": "starters"},
            {"name": "Оливки", "description": "Маринованные", "price": 180, "category": "starters"},
            {"name": "Борщ", "description": "Сметана, зелень", "price": 300, "category": "soups"},
            {"name": "Суп-пюре грибной", "description": "С гренками", "price": 280, "category": "soups"},
            {"name": "Харчо", "description": "Острый суп", "price": 320, "category": "soups"},
            {"name": "Том Ям", "description": "Тайский суп", "price": 450, "category": "soups"},
            {"name": "Кола 0.5л", "description": "Напиток", "price": 150, "category": "drinks"},
            {"name": "Кофе Американо", "description": "Свежий", "price": 200, "category": "drinks"},
            {"name": "Сок апельсиновый", "description": "Свежевыжатый", "price": 180, "category": "drinks"},
            {"name": "Чай черный", "description": "С лимоном", "price": 120, "category": "drinks"},
            {"name": "Морс ягодный", "description": "Домашний", "price": 160, "category": "drinks"},
            {"name": "Пиво разливное", "description": "0.5л", "price": 220, "category": "drinks"},
            {"name": "Тирамису", "description": "Итальянский", "price": 350, "category": "desserts"},
            {"name": "Чизкейк", "description": "Нью-Йорк", "price": 320, "category": "desserts"},
            {"name": "Мороженое", "description": "3 шарика", "price": 250, "category": "desserts"},
            {"name": "Шоколадный фондан", "description": "С мороженым", "price": 380, "category": "desserts"},
        ]
        
        for item_data in menu_items:
            item = MenuItem(**item_data)
            db.add(item)
        
        db.commit()
        print(f"Добавлено {len(menu_items)} тестовых блюд")
        
    except Exception as e:
        print(f"Ошибка инициализации: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_test_data()
