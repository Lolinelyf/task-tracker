# 📋 Task Tracker

SPA-приложение для управления задачами с авторизацией и CRUD-операциями.

## 📁 Структура проекта

```
task-tracker/
├── frontend/     # Vue 3 приложение
├── mock-api/     # JSON Server с JWT авторизацией
└── README.md     # Документация проекта
```

## ⚙️ Требования

- Node.js >= 18
- npm или yarn

## 🚀 Быстрый старт

### 1. Запуск mock-api

```bash
cd mock-api
npm install
npm run server
```

Сервер будет доступен по адресу: [http://localhost:3001](http://localhost:3001)

### 2. Запуск фронтенда

```bash
cd frontend
npm install
npm run dev
```

Приложение будет доступно по адресу: [http://localhost:5173](http://localhost:5173)

### 3. Тестовый пользователь

```
Email: test@test.com
Password: 12345678
```

## 🛠 Технологии

### Frontend

- [Vue 3](https://vuejs.org/) (Composition API)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

### Backend (mock)

- [JSON Server](https://github.com/typicode/json-server)
- JWT авторизация

## ✨ Основные функции

- Авторизация (JWT)
- Список задач с пагинацией
- Создание задачи
- Редактирование задачи
- Удаление задачи с подтверждением
- Быстрое изменение статуса
- Фильтрация по статусу
- Поиск по названию (с debounce)
- Обработка ошибок
- Адаптивный дизайн

## 📖 Документация

- [API Schema](./docs/api-schema.md)
- [Frontend](./docs/frontend.md)
- [Mock API](./docs/mock-api.md)

## 📄 Лицензия

MIT
