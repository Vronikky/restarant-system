import sys
import os
import time
from sqlalchemy import text


sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.database import SessionLocal, engine
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
    
    # Ожидаем подключение к БД
    if not wait_for_db():
        print("Не удалось подключиться к базе данных")
        return
    
    db = SessionLocal()
    try:
        # Проверяем, есть ли уже данные
        if db.query(MenuItem).first():
            print("Данные уже существуют в базе")
            return
        # Добавляем тестовые блюда
        menu_items = [
            {"name": "Пицца Маргарита", "description": "Сыр моцарелла, томаты, базилик", "price": 550, "category": "main"},
            {"name": "Стейк Рибай", "description": "Мраморная говядина, 300г", "price": 1200, "category": "main"},
            {"name": "Паста Карбонара", "description": "Спагетти, бекон, сыр", "price": 480, "category": "main"},
            {"name": "Бургер Классик", "description": "Говядина, сыр, овощи", "price": 420, "category": "main"},
            {"name": "Курица Гриль", "description": "С картофелем", "price": 380, "category": "main"},
            {"name": "Лосось на гриле", "description": "С овощами", "price": 850, "category": "main"},
            {"name": "Салат Цезарь", "description": "С курицей, пармезаном и соусом", "price": 450, "category": "starters"},
            {"name": "Брускетта", "description": "Томаты, базилик", "price": 280, "category": "starters"},
            {"name": "Сырные палочки", "description": "С соусом", "price": 320, "category": "starters"},
            {"name": "Креветки в кляре", "description": "8 шт", "price": 520, "category": "starters"},
            {"name": "Тирамису", "description": "Итальянский десерт", "price": 350, "category": "desserts"},
            {"name": "Борщ", "description": "Сметана, зелень", "price": 300, "category": "soups"},
            {"name": "Суп-пюре грибной", "description": "Грибы шампиньоны с гренками", "price": 280, "category": "soups"},
            {"name": "Том Ям", "description": "Тайский суп", "price":450, "category": "soups"},
            {"name": "Кофе", "description": "Американо, Каппучино, Раф, Латте, Пряный латте", "price": 200, "category": "drinks"},
            {"name": "Кола 0.5л", "description": "Газированный напиток", "price": 150, "category": "drinks"},
            {"name": "Сок Свежевыжатый", "description": "апельсиновый/яблочный", "price": 130, "category": "drinks"},
            {"name": "Чай зеленый/черный", "description": "С лимоном/мятой/малиной", "price": 120, "category": "drinks"},
            {"name": "Морс Домашний", "description": "ягодный", "price": 80, "category": "drinks"},
            {"name": "Чизкейк", "description": "Нью-Йорк", "price": 320, "category": "deserts"},
            {"name": "Мороженое 3 шарика", "description": "ваниль, шоколад, клубника", "price": 250, "category": "deserts"},
            {"name": "Шоколадный фондан", "description": "С мороженым", "price": 380, "category": "deserts"},
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