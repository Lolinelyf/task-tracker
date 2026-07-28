# Mock API

JSON Server с JWT авторизацией на основе `json-server-auth`.

## Установка

```bash
npm install
```

## Запуск

```bash
npm run server
```

Сервер запустится на порту 3001: [http://localhost:3001](http://localhost:3001)

## API Эндпоинты

### Авторизация

| Метод | Эндпоинт    | Описание                        |
| ----- | ----------- | ------------------------------- |
| POST  | `/register` | Регистрация нового пользователя |
| POST  | `/login`    | Вход в систему                  |

### Регистрация

```bash
curl -X POST http://localhost:3001/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"12345678"}'
```

### Логин

```bash
curl -X POST http://localhost:3001/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"12345678"}'
```

### Задачи (требуют авторизации)

Все запросы к задачам требуют заголовок:

```
Authorization: Bearer <access_token>
```

| Метод  | Эндпоинт     | Описание              |
| ------ | ------------ | --------------------- |
| GET    | `/tasks`     | Получить список задач |
| POST   | `/tasks`     | Создать задачу        |
| GET    | `/tasks/:id` | Получить задачу по ID |
| PATCH  | `/tasks/:id` | Обновить задачу       |
| PUT    | `/tasks/:id` | Заменить задачу       |
| DELETE | `/tasks/:id` | Удалить задачу        |

### Пагинация и фильтры

```bash
# Пагинация
GET /tasks?_page=1&_limit=5

# Фильтр по статусу
GET /tasks?status=todo

# Поиск по названию
GET /tasks?title_like=настроить

# Комбинированный запрос
GET /tasks?status=todo&title_like=настроить&_page=1&_limit=5
```

## Тестовый пользователь

После запуска сервера зарегистрируйте тестового пользователя:

```bash
curl -X POST http://localhost:3001/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"12345678"}'
```

## Структура данных

### Task

```json
{
  "id": 1,
  "title": "Название задачи",
  "description": "Описание задачи",
  "status": "todo | in-progress | done",
  "priority": "low | medium | high",
  "createdAt": "2026-07-28T13:00:00.000Z"
}
```

### User

```json
{
  "id": 1,
  "email": "user@example.com",
  "password": "hashed_password"
}
```

## Лицензия

MIT
