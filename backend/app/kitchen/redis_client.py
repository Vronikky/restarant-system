import redis
import json
import os

redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST", "redis"),
    port=int(os.getenv("REDIS_PORT", 6379)),
    password=os.getenv("REDIS_PASSWORD", "redis123"),
    decode_responses=True
)

def send_to_kitchen(order_data: dict):
    try:
        order_json = json.dumps(order_data, default=str)
        redis_client.publish('kitchen_orders', order_json)
        print(f"Заказ #{order_data.get('id')} отправлен на кухню")
    except Exception as e:
        print(f"Ошибка отправки заказа в Redis: {e}")