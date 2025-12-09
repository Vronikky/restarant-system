from sqlalchemy.orm import Session
from datetime import datetime

# Импортируем модели и схемы
from app.models.models import MenuItem, Order, OrderItem
from app.schemas.schemas import MenuItemCreate

# Меню
def get_menu_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(MenuItem).offset(skip).limit(limit).all()

def get_menu_item(db: Session, item_id: int):
    return db.query(MenuItem).filter(MenuItem.id == item_id).first()

def create_menu_item(db: Session, item: MenuItemCreate):
    db_item = MenuItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

# Заказы
def create_order(db: Session, order):
    # Получаем цены блюд на момент заказа
    order_items = []
    total_amount = 0
    
    for item in order.items:
        menu_item = get_menu_item(db, item.menu_item_id)
        if not menu_item:
            raise ValueError(f"Menu item {item.menu_item_id} not found")
        
        # Создаем OrderItem с ценой на момент заказа
        order_item = OrderItem(
            menu_item_id=item.menu_item_id,
            quantity=item.quantity,
            price_at_time=menu_item.price
        )
        order_items.append(order_item)
        total_amount += menu_item.price * item.quantity
    
    # Создаем заказ
    db_order = Order(
        table_number=order.table_number,
        customer_name=order.customer_name if hasattr(order, 'customer_name') else None,
        total_amount=total_amount,
        status="pending",
        created_at=datetime.utcnow(),
        items=order_items
    )
    
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def get_orders(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Order).offset(skip).limit(limit).all()

def get_order(db: Session, order_id: int):
    return db.query(Order).filter(Order.id == order_id).first()