from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class MenuItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    category: Optional[str] = None

class MenuItemCreate(MenuItemBase):
    pass

class MenuItem(MenuItemBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class OrderItemBase(BaseModel):
    menu_item_id: int
    quantity: int = 1

class OrderItemCreate(OrderItemBase):
    pass

class OrderItem(OrderItemBase):
    id: int
    price_at_time: float
    
    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    table_number: int
    customer_name: Optional[str] = None
    items: List[OrderItemCreate]

class Order(BaseModel):
    id: int
    table_number: int
    customer_name: Optional[str]
    status: str
    total_amount: float
    created_at: datetime
    items: List[OrderItem]
    
    class Config:
        from_attributes = True