# API Schema

## Авторизация

### Регистрация

**POST** `/register`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "12345678"
}
```

**Response (201):**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "user@example.com",
    "id": 1
  }
}
```

---

### Логин

**POST** `/login`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "12345678"
}
```

**Response (200):**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Задачи

Все запросы требуют заголовок:

```text
Authorization: Bearer <access_token>
```

---

### Получить список задач

**GET** `/tasks`

**Query параметры:**

| Параметр     | Тип    | Описание               |
| ------------ | ------ | ---------------------- |
| `_page`      | number | Номер страницы         |
| `_limit`     | number | Количество на странице |
| `status`     | string | Фильтр по статусу      |
| `title_like` | string | Поиск по названию      |

**Response (200):**

```json
[
  {
    "id": 1,
    "title": "Настроить окружение",
    "description": "Установить зависимости",
    "status": "todo",
    "priority": "medium",
    "createdAt": "2026-07-01T10:00:00.000Z"
  }
]
```

**Headers:**

```text
X-Total-Count: 10
```

---

### Создать задачу

**POST** `/tasks`

**Request Body:**

```json
{
  "title": "Новая задача",
  "description": "Описание",
  "status": "todo",
  "priority": "medium"
}
```

**Response (201):**

```json
{
  "id": 5,
  "title": "Новая задача",
  "description": "Описание",
  "status": "todo",
  "priority": "medium",
  "createdAt": "2026-07-28T13:00:00.000Z"
}
```

---

### Получить задачу по ID

**GET** `/tasks/:id`

**Response (200):**

```json
{
  "id": 1,
  "title": "Настроить окружение",
  "description": "Установить зависимости",
  "status": "todo",
  "priority": "medium",
  "createdAt": "2026-07-01T10:00:00.000Z"
}
```

---

### Обновить задачу

**PATCH** `/tasks/:id`

**Request Body:**

```json
{
  "title": "Обновлённое название",
  "status": "in-progress"
}
```

**Response (200):**

```json
{
  "id": 1,
  "title": "Обновлённое название",
  "description": "Установить зависимости",
  "status": "in-progress",
  "priority": "medium",
  "createdAt": "2026-07-01T10:00:00.000Z"
}
```

---

### Удалить задачу

**DELETE** `/tasks/:id`

**Response (200):**

```json
{}
```

---

## Статусы задач

| Значение      | Описание     |
| ------------- | ------------ |
| `todo`        | К выполнению |
| `in-progress` | В процессе   |
| `done`        | Готово       |

## Приоритеты задач

| Значение | Описание |
| -------- | -------- |
| `low`    | Низкий   |
| `medium` | Средний  |
| `high`   | Высокий  |

---
