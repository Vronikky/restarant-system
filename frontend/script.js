// const API_URL = 'http://localhost:8000';
// let menuItems = [], selectedItems = [];

// document.addEventListener('DOMContentLoaded', () => {
//     checkConnection();
//     loadMenu();
// });

// async function checkConnection() {
//     try {
//         await fetch(`${API_URL}/health`);
//         updateStatus('Подключено', '#2ecc71');
//     } catch {
//         updateStatus('Тестовый режим', '#e74c3c');
//         loadTestData();
//     }
// }

// function updateStatus(text, color) {
//     const status = document.getElementById('status');
//     const icon = status.querySelector('.fa-circle');
//     const textEl = document.getElementById('status-text') || status.querySelector('span');
    
//     if (textEl) textEl.textContent = text;
//     icon.style.color = color;
// }

// async function loadMenu() {
//     try {
//         const res = await fetch(`${API_URL}/menu/`);
//         menuItems = await res.json();
//         displayMenu(menuItems);
//     } catch {
//         console.log('API недоступен');
//     }
// }

// function loadTestData() {
//     menuItems = [
//     {id:1,name:"Пицца Маргарита",desc:"Сыр моцарелла, томаты, базилик",price:550,category:"main"},
//     {id:2,name:"Стейк Рибай",desc:"Мраморная говядина 300г",price:1200,category:"main"},
//     {id:3,name:"Паста Карбонара",desc:"Спагетти, бекон, сыр",price:480,category:"main"},
//     {id:4,name:"Бургер Классик",desc:"Говядина, сыр, овощи",price:420,category:"main"},
//     {id:5,name:"Курица Гриль",desc:"С картофелем",price:380,category:"main"},
//     {id:6,name:"Лосось на гриле",desc:"С овощами",price:850,category:"main"},
//     {id:7,name:"Салат Цезарь",desc:"С курицей, пармезаном и соусом",price:450,category:"starters"},
//     {id:8,name:"Брускетта",desc:"Томаты, базилик",price:280,category:"starters"},
//     {id:9,name:"Сырные палочки",desc:"С соусом",price:320,category:"starters"},
//     {id:10,name:"Креветки в кляре",desc:"8 шт",price:520,category:"starters"},
//     {id:11,name:"Борщ",desc:"Сметана, зелень",price:300,category:"soups"},
//     {id:12,name:"Суп-пюре грибной",desc:"Грибы шампиньоны с гренками",price:280,category:"soups"},
//     {id:13,name:"Том Ям",desc:"Тайский суп",price:450,category:"soups"},
//     {id:14,name:"Кола 0.5л",desc:"Газированный напиток",price:150,category:"drinks"},
//     {id:15,name:"Кофе",desc:"Американо, Каппучино, Раф, Латте, Пряный латте",price:200,category:"drinks"},
//     {id:16,name:"Сок Свежевыжатый",desc:" апельсиновый/яблочный",price:130,category:"drinks"},
//     {id:17,name:"Чай зеленый/черный",desc:"С лимоном/мятой/малиной",price:120,category:"drinks"},
//     {id:18,name:"Морс Домашний",desc:"ягодный",price:80,category:"drinks"},
//     {id:19,name:"Чизкейк",desc:"Нью-Йорк",price:320,category:"desserts"},
//     {id:20,name:"Мороженое 3 шарика",desc:"ваниль, шоколад, клубника",price:250,category:"desserts"},
//     {id:21,name:"Шоколадный фондан",desc:"С мороженым",price:380,category:"desserts"},
//     ];
//     displayMenu(menuItems);
// }

// function displayMenu(items) {
//     const container = document.getElementById('menu-items');
//     container.innerHTML = '';
    
//     items.forEach(item => {
//         const div = document.createElement('div');
//         div.className = 'menu-item';
//         div.dataset.category = item.category || 'other';
//         div.innerHTML = `
//             <div class="menu-header">
//                 <span class="item-name">${item.name}</span>
//                 <span class="item-price">${item.price} ₽</span>
//             </div>
//             <p class="item-desc">${item.desc || item.description || ''}</p>
//             <div class="menu-footer">
//                 <span class="item-category">${getCatName(item.category)}</span>
//                 <button class="add-btn" onclick="addToOrder(${item.id})">
//                     <i class="fas fa-plus"></i> Добавить
//                 </button>
//             </div>
//         `;
//         container.appendChild(div);
//     });
// }

// function getCatName(cat) {
//     const cats = {'main':'Основное','starters':'Закуска','drinks':'Напиток','desserts':'Десерт','soups':'Суп'};
//     return cats[cat] || cat;
// }

// function filterMenu(cat) {
//     document.querySelectorAll('.filter').forEach(btn => btn.classList.remove('active'));
//     event.target.classList.add('active');
    
//     document.querySelectorAll('.menu-item').forEach(item => {
//         item.style.display = (cat === 'all' || item.dataset.category === cat) ? 'flex' : 'none';
//     });
// }

// function addToOrder(id) {
//     const item = menuItems.find(i => i.id === id);
//     if (!item) return;
    
//     const existing = selectedItems.find(i => i.id === id);
//     if (existing) existing.quantity++;
//     else selectedItems.push({...item, quantity: 1});
    
//     updateOrderDisplay();
//     showNotif(`"${item.name}" добавлено`, 'success');
// }

// function updateOrderDisplay() {
//     const container = document.getElementById('order-items');
    
//     if (selectedItems.length === 0) {
//         container.innerHTML = '<p>Добавьте блюда</p>';
//     } else {
//         container.innerHTML = '';
//         selectedItems.forEach((item, i) => {
//             const div = document.createElement('div');
//             div.className = 'order-item';
//             div.innerHTML = `
//                 <div class="order-info">
//                     <strong>${item.name}</strong>
//                     <small>${item.price} ₽ × ${item.quantity}</small>
//                 </div>
//                 <div class="controls">
//                     <button class="qty-btn" onclick="changeQty(${i}, -1)"><i class="fas fa-minus"></i></button>
//                     <span class="qty-display">${item.quantity}</span>
//                     <button class="qty-btn" onclick="changeQty(${i}, 1)"><i class="fas fa-plus"></i></button>
//                     <button class="qty-btn remove" onclick="removeItem(${i})"><i class="fas fa-trash"></i></button>
//                 </div>
//                 <div class="item-total">${(item.price * item.quantity).toFixed(2)} ₽</div>
//             `;
//             container.appendChild(div);
//         });
//     }
    
//     updateTotal();
// }

// function changeQty(i, delta) {
//     selectedItems[i].quantity += delta;
//     if (selectedItems[i].quantity <= 0) selectedItems.splice(i, 1);
//     updateOrderDisplay();
// }

// function removeItem(i) {
//     const name = selectedItems[i].name;
//     selectedItems.splice(i, 1);
//     updateOrderDisplay();
//     showNotif(`"${name}" удалено`, 'info');
// }

// function updateTotal() {
//     const itemsCount = selectedItems.length;
//     const totalQty = selectedItems.reduce((s, i) => s + i.quantity, 0);
//     const totalAmt = selectedItems.reduce((s, i) => s + (i.price * i.quantity), 0);
    
//     document.getElementById('items-count').textContent = itemsCount;
//     document.getElementById('total-quantity').textContent = totalQty;
//     document.getElementById('total-amount').textContent = totalAmt.toFixed(2) + ' ₽';
// }

// function clearOrder() {
//     if (selectedItems.length === 0) return showNotif('Заказ пуст', 'info');
//     if (confirm('Очистить заказ?')) {
//         selectedItems = [];
//         updateOrderDisplay();
//         showNotif('Заказ очищен', 'info');
//     }
// }

// async function submitOrder() {
//     if (selectedItems.length === 0) return showNotif('Добавьте блюда', 'error');
    
//     const table = document.getElementById('table-number').value;
//     if (!table || table < 1) return showNotif('Укажите стол', 'error');
    
//     const orderData = {
//         table_number: +table,
//         items: selectedItems.map(i => ({menu_item_id: i.id, quantity: i.quantity}))
//     };
    
//     try {
//         const res = await fetch(`${API_URL}/orders/`, {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(orderData)
//         });
//         const order = await res.json();
        
//         showNotif(`Заказ #${order.id} отправлен! ${order.total_amount} ₽`, 'success');
//         updateStats(order.total_amount);
//         selectedItems = [];
//         updateOrderDisplay();
//     } catch {
//         const total = selectedItems.reduce((s, i) => s + (i.price * i.quantity), 0);
//         showNotif(`Заказ #${Math.floor(Math.random()*900)+100} (тест). ${total.toFixed(2)} ₽`, 'info');
//         updateStats(total);
//         selectedItems = [];
//         updateOrderDisplay();
//     }
// }

// function updateStats(amount) {
//     const ordersEl = document.getElementById('orders-today');
//     const revenueEl = document.getElementById('revenue');
//     const activeEl = document.getElementById('active-count');
    
//     ordersEl.textContent = +ordersEl.textContent + 1;
//     revenueEl.textContent = (+revenueEl.textContent.replace(/[^\d]/g, '') + amount).toLocaleString('ru') + ' ₽';
//     activeEl.textContent = +activeEl.textContent + 1;
// }

// function showNotif(msg, type) {
//     const notif = document.getElementById('notification');
//     const msgEl = document.getElementById('notification-message');
    
//     msgEl.textContent = msg;
//     notif.className = `notification show ${type}`;
//     setTimeout(() => notif.className = 'notification', 3000);
// }

// function hideNotification() {
//     document.getElementById('notification').className = 'notification';
// }
const API_URL = 'http://localhost:8000';
let menuItems = [], selectedItems = [];

// БОЛЬШОЕ МЕНЮ (25 блюд)
const TEST_MENU = [
    // Основные блюда
    {id:1,name:"Пицца Маргарита",desc:"Сыр, томаты, базилик",price:550,category:"main"},
    {id:2,name:"Стейк Рибай",desc:"Говядина 300г",price:1200,category:"main"},
    {id:3,name:"Паста Карбонара",desc:"Спагетти, бекон, сыр",price:480,category:"main"},
    {id:4,name:"Бургер Классик",desc:"Говядина, сыр, овощи",price:420,category:"main"},
    {id:5,name:"Курица Гриль",desc:"С картофелем",price:380,category:"main"},
    {id:6,name:"Лосось на гриле",desc:"С овощами",price:850,category:"main"},
    
    // Закуски
    {id:7,name:"Салат Цезарь",desc:"Курица, пармезан",price:450,category:"starters"},
    {id:8,name:"Брускетта",desc:"Томаты, базилик",price:280,category:"starters"},
    {id:9,name:"Сырные палочки",desc:"С соусом",price:320,category:"starters"},
    {id:10,name:"Креветки в кляре",desc:"8 шт",price:520,category:"starters"},
    {id:11,name:"Оливки",desc:"Маринованные",price:180,category:"starters"},
    
    // Супы
    {id:12,name:"Борщ",desc:"Сметана, зелень",price:300,category:"soups"},
    {id:13,name:"Суп-пюре грибной",desc:"С гренками",price:280,category:"soups"},
    {id:14,name:"Харчо",desc:"Острый суп",price:320,category:"soups"},
    {id:15,name:"Том Ям",desc:"Тайский суп",price:450,category:"soups"},
    
    // Напитки
    {id:16,name:"Кола 0.5л",desc:"Напиток",price:150,category:"drinks"},
    {id:17,name:"Кофе Американо",desc:"Свежий",price:200,category:"drinks"},
    {id:18,name:"Сок апельсиновый",desc:"Свежевыжатый",price:180,category:"drinks"},
    {id:19,name:"Чай черный",desc:"С лимоном",price:120,category:"drinks"},
    {id:20,name:"Морс ягодный",desc:"Домашний",price:160,category:"drinks"},
    {id:21,name:"Пиво разливное",desc:"0.5л",price:220,category:"drinks"},
    
    // Десерты
    {id:22,name:"Тирамису",desc:"Итальянский",price:350,category:"desserts"},
    {id:23,name:"Чизкейк",desc:"Нью-Йорк",price:320,category:"desserts"},
    {id:24,name:"Мороженое",desc:"3 шарика",price:250,category:"desserts"},
    {id:25,name:"Шоколадный фондан",desc:"С мороженым",price:380,category:"desserts"},
];

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Ресторанная система запущена');
    console.log('🌐 API URL:', API_URL);
    
    checkConnection();
    
    // Добавляем кнопку отладки в консоли
    window.debugMenu = () => {
        console.log('📊 Отладка меню:');
        console.log('Количество блюд:', menuItems.length);
        console.log('Блюда:', menuItems);
        const container = document.getElementById('menu-items');
        console.log('Контейнер меню:', container);
        console.log('HTML контейнера:', container.innerHTML);
    };
    
    window.debugTest = () => {
        console.log('🧪 Тест: загрузка тестовых данных');
        loadTestData();
    };
});

// Проверка подключения
async function checkConnection() {
    console.log('🔍 Проверка подключения к серверу...');
    try {
        const response = await fetch(`${API_URL}/health`);
        console.log('📡 Ответ сервера:', response.status);
        
        if (response.ok) {
            console.log('✅ Сервер доступен');
            updateStatus('Подключено', '#2ecc71');
            loadMenu();
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (error) {
        console.warn('⚠️ Сервер недоступен:', error.message);
        console.log('🔄 Переход в тестовый режим...');
        updateStatus('Тестовый режим', '#e74c3c');
        loadTestData();
    }
}

function updateStatus(text, color) {
    const status = document.getElementById('status');
    const icon = status.querySelector('.fa-circle');
    const textEl = document.getElementById('status-text');
    
    console.log('🔄 Обновление статуса:', text);
    
    if (textEl) {
        textEl.textContent = text;
    }
    if (icon) {
        icon.style.color = color;
    }
}

// Загрузка меню с сервера
async function loadMenu() {
    console.log('📥 Загрузка меню с сервера...');
    try {
        const response = await fetch(`${API_URL}/menu/`);
        console.log('📡 Статус ответа:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        menuItems = await response.json();
        console.log('✅ Загружено блюд:', menuItems.length);
        console.log('📋 Пример первого блюда:', menuItems[0]);
        
        displayMenu(menuItems);
        
    } catch (error) {
        console.error('❌ Ошибка загрузки меню:', error.message);
        console.log('🔄 Загрузка тестовых данных...');
        loadTestData();
    }
}

// Загрузка тестовых данных
function loadTestData() {
    console.log('🧪 Загрузка тестового меню...');
    menuItems = [...TEST_MENU];
    console.log('✅ Тестовое меню загружено:', menuItems.length, 'блюд');
    displayMenu(menuItems);
    showNotif('Используется тестовое меню', 'info');
}

// Отображение меню
function displayMenu(items) {
    console.log('🎨 Отображение меню...');
    console.log('Количество блюд для отображения:', items.length);
    
    const container = document.getElementById('menu-items');
    
    if (!container) {
        console.error('❌ Контейнер меню не найден!');
        return;
    }
    
    console.log('Контейнер найден:', container);
    
    if (!items || items.length === 0) {
        console.log('📭 Меню пустое');
        container.innerHTML = '<p class="empty-message">Меню пустое</p>';
        return;
    }
    
    console.log('Создание карточек...');
    container.innerHTML = '';
    
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.dataset.category = item.category || 'other';
        
        const description = item.desc || item.description || 'Без описания';
        
        div.innerHTML = `
            <div class="menu-header">
                <span class="item-name">${item.name}</span>
                <span class="item-price">${item.price} ₽</span>
            </div>
            <p class="item-desc">${description}</p>
            <div class="menu-footer">
                <span class="item-category">${getCatName(item.category)}</span>
                <button class="add-btn" onclick="addToOrder(${item.id})">
                    <i class="fas fa-plus"></i> Добавить
                </button>
            </div>
        `;
        
        container.appendChild(div);
    });
    
    console.log('✅ Карточки созданы:', items.length, 'шт');
}

// Перевод названий категорий
function getCatName(cat) {
    const categories = {
        'main': 'Основное',
        'starters': 'Закуска',
        'drinks': 'Напиток',
        'desserts': 'Десерт',
        'soups': 'Суп'
    };
    return categories[cat] || cat;
}

// Фильтрация меню
function filterMenu(category) {
    console.log('🔍 Фильтрация по категории:', category);
    
    // Обновляем активную кнопку
    document.querySelectorAll('.filter').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Показываем/скрываем элементы
    const allItems = document.querySelectorAll('.menu-item');
    console.log('Найдено элементов:', allItems.length);
    
    let visibleCount = 0;
    
    allItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'flex';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    console.log(`✅ Отображено элементов: ${visibleCount} из ${allItems.length}`);
}

// Добавление блюда в заказ
function addToOrder(itemId) {
    console.log('➕ Добавление в заказ ID:', itemId);
    
    const item = menuItems.find(i => i.id === itemId);
    if (!item) {
        console.error('❌ Блюдо не найдено:', itemId);
        return;
    }
    
    console.log('Найдено блюдо:', item.name);
    
    // Проверяем, есть ли уже это блюдо в заказе
    const existingItem = selectedItems.find(i => i.id === itemId);
    
    if (existingItem) {
        existingItem.quantity++;
        console.log(`Увеличено количество: ${existingItem.name} → ${existingItem.quantity}`);
    } else {
        selectedItems.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
        console.log(`Добавлено новое блюдо: ${item.name}`);
    }
    
    updateOrderDisplay();
    showNotif(`"${item.name}" добавлено в заказ`, 'success');
}

// Обновление отображения заказа
function updateOrderDisplay() {
    const container = document.getElementById('order-items');
    
    if (!container) {
        console.error('❌ Контейнер заказа не найден');
        return;
    }
    
    if (selectedItems.length === 0) {
        container.innerHTML = '<p class="empty-message">Выберите блюда из меню</p>';
        console.log('📭 Заказ пустой');
    } else {
        container.innerHTML = '';
        console.log('🛒 Обновление заказа:', selectedItems.length, 'позиций');
        
        selectedItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <div class="order-info">
                    <strong>${item.name}</strong>
                    <small>${item.price} ₽ × ${item.quantity}</small>
                </div>
                <div class="controls">
                    <button class="qty-btn" onclick="changeQty(${index}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQty(${index}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="qty-btn remove" onclick="removeItem(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="item-total">
                    ${(item.price * item.quantity).toFixed(2)} ₽
                </div>
            `;
            container.appendChild(itemElement);
        });
    }
    
    updateTotal();
}

// Изменение количества
function changeQty(index, delta) {
    console.log(`🔄 Изменение количества: ${index} на ${delta}`);
    
    if (selectedItems[index]) {
        selectedItems[index].quantity += delta;
        
        if (selectedItems[index].quantity <= 0) {
            const removed = selectedItems.splice(index, 1);
            console.log(`🗑️ Удалено: ${removed[0].name}`);
        }
        
        updateOrderDisplay();
    }
}

// Удаление позиции
function removeItem(index) {
    if (selectedItems[index]) {
        const itemName = selectedItems[index].name;
        selectedItems.splice(index, 1);
        updateOrderDisplay();
        showNotif(`"${itemName}" удалено из заказа`, 'info');
        console.log(`🗑️ Удалено блюдо: ${itemName}`);
    }
}

// Обновление итоговой суммы
function updateTotal() {
    const itemsCount = selectedItems.length;
    const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('items-count').textContent = itemsCount;
    document.getElementById('total-quantity').textContent = totalQuantity;
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2) + ' ₽';
    
    console.log(`💰 Итог: ${itemsCount} поз., ${totalQuantity} шт., ${totalAmount.toFixed(2)} ₽`);
}

// Очистка заказа
function clearOrder() {
    if (selectedItems.length === 0) {
        showNotif('Заказ уже пустой', 'info');
        return;
    }
    
    if (confirm('Очистить весь заказ?')) {
        console.log('🧹 Очистка заказа');
        selectedItems = [];
        updateOrderDisplay();
        showNotif('Заказ очищен', 'info');
    }
}

// Отправка заказа
async function submitOrder() {
    console.log('📤 Отправка заказа...');
    
    if (selectedItems.length === 0) {
        showNotif('Добавьте блюда в заказ', 'error');
        console.log('❌ Пустой заказ');
        return;
    }
    
    const tableNumber = document.getElementById('table-number').value;
    if (!tableNumber || tableNumber < 1) {
        showNotif('Укажите номер стола', 'error');
        console.log('❌ Не указан стол');
        return;
    }
    
    console.log(`📋 Заказ для стола №${tableNumber}:`, selectedItems);
    
    const orderData = {
        table_number: parseInt(tableNumber),
        items: selectedItems.map(item => ({
            menu_item_id: item.id,
            quantity: item.quantity
        }))
    };
    
    console.log('📦 Данные для отправки:', orderData);
    
    try {
        const response = await fetch(`${API_URL}/orders/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const order = await response.json();
        console.log('✅ Заказ отправлен:', order);
        
        showNotif(`Заказ #${order.id} отправлен! Сумма: ${order.total_amount} ₽`, 'success');
        
        // Обновляем статистику
        updateStats(order.total_amount);
        
        // Очищаем заказ
        selectedItems = [];
        updateOrderDisplay();
        
        console.log('🔄 Заказ очищен, статистика обновлена');
        
    } catch (error) {
        console.error('❌ Ошибка отправки:', error.message);
        
        // Тестовый режим
        const totalAmount = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const orderNumber = Math.floor(Math.random() * 900) + 100;
        
        console.log(`🧪 Тестовый заказ #${orderNumber}: ${totalAmount.toFixed(2)} ₽`);
        
        showNotif(`Заказ #${orderNumber} отправлен (тестовый режим). Сумма: ${totalAmount.toFixed(2)} ₽`, 'info');
        
        updateStats(totalAmount);
        selectedItems = [];
        updateOrderDisplay();
    }
}

// Обновление статистики
function updateStats(amount) {
    const ordersEl = document.getElementById('orders-today');
    const revenueEl = document.getElementById('revenue');
    const activeEl = document.getElementById('active-count');
    
    const currentOrders = parseInt(ordersEl.textContent) || 0;
    const currentRevenue = parseFloat(revenueEl.textContent.replace(/[^\d]/g, '')) || 0;
    const currentActive = parseInt(activeEl.textContent) || 0;
    
    ordersEl.textContent = currentOrders + 1;
    revenueEl.textContent = (currentRevenue + amount).toLocaleString('ru-RU') + ' ₽';
    activeEl.textContent = currentActive + 1;
    
    console.log(`📊 Статистика обновлена: заказов=${currentOrders+1}, выручка=${currentRevenue+amount}`);
}

// Уведомления
function showNotif(message, type = 'success') {
    console.log(`🔔 Уведомление [${type}]: ${message}`);
    
    const notification = document.getElementById('notification');
    const messageEl = document.getElementById('notification-message');
    
    if (!notification || !messageEl) {
        console.error('❌ Элементы уведомлений не найдены');
        return;
    }
    
    messageEl.textContent = message;
    notification.className = `notification show ${type}`;
    
    setTimeout(() => {
        notification.className = 'notification';
    }, 3000);
}

function hideNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.className = 'notification';
    }
}

// Горячие клавиши
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'Enter') {
        console.log('⌨️ Горячая клавиша: Ctrl+Enter - отправка заказа');
        submitOrder();
    }
    if (event.key === 'Escape') {
        console.log('⌨️ Горячая клавиша: Escape - очистка заказа');
        clearOrder();
    }
});

// Отладочные функции
console.log('🔧 Отладочные функции доступны:');
console.log('• debugMenu() - показать информацию о меню');
console.log('• debugTest() - загрузить тестовые данные');
console.log('• filterMenu("category") - фильтровать меню');