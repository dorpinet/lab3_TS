# Практична робота №3

**Тема:** Узагальнення, декоратори та утиліти типів TypeScript

**Варіант:** 2, Книжковий онлайн магазин, сутність `BookEntity`

## Опис проєкту

Типізований in-memory шар доступу до даних на TypeScript. Реалізовано патерн Generic Repository: один універсальний репозиторій працює з будь-якою сутністю, що розширює `BaseEntity`. Для предметної області «Книжковий онлайн магазин» створено сутність `BookEntity` з полями `title`, `price`, `isbn`, `pageCount`, `author` та `status`.

### Рівень 1
- `BaseEntity`: базовий інтерфейс з полями `id`, `createdAt`, `updatedAt`.
- `ApiResponse<TData>`: універсальна обгортка відповіді API.
- `IRepository<T extends BaseEntity>`: контракт репозиторію (`create`, `findById`, `findAll`, `deleteById`).
- `InMemoryRepository<T extends BaseEntity>`: реалізація на основі `Map<string, T>`.

### Рівень 2
- `EntityStatus`: строковий enum (`ACTIVE`, `ARCHIVED`, `DRAFT`).
- `CreateDto<T>`: `Omit<T, keyof BaseEntity>`, сутність без системних полів.
- `UpdateDto<T>`: `Partial<CreateDto<T>>`, будь-яка підмножина змінюваних полів.
- `EntitySummary<T>`: `Pick<T, "id" | "title" | "price">`, легкий витяг сутності.
- `EntityAnalytics<T>`: `Record<T["status"], number>`, лічильник сутностей за статусами.
- Метод `update(id, patch)`: оновлює `updatedAt`, зберігає незмінними `id` та `createdAt`, повертає `null`, якщо запису немає.
- `BookRepository`: спеціалізований репозиторій із методом `getStatusAnalytics()`.

## Структура проєкту

```
lab3_TS/
├── screenshots/
├── src/
│   ├── decorators/
│   ├── repositories/
│   │   ├── book.repository.ts
│   │   ├── in-memory.repository.ts
│   │   ├── repository.interface.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── api-response.ts
│   │   ├── base-entity.ts
│   │   ├── book.entity.ts
│   │   ├── dto.ts
│   │   ├── entity-status.ts
│   │   └── index.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

![Структура проєкту](screenshots/Screenshot%202026-10-28%20140807.png)

## Інструкція запуску

Потрібні Node.js 18+ та npm.

```bash
npm install
npm run typecheck
npm start
```

- `npm run typecheck` виконує `tsc --noEmit`, перевіряє типи без генерації файлів.
- `npm start` запускає демонстрацію через `tsx src/index.ts`.

## Конфігурація компілятора

У `tsconfig.json` увімкнено суворий режим (`strict`, `noImplicitAny`) та прапорці для декораторів (`experimentalDecorators`, `emitDecoratorMetadata`).

## Ключові фрагменти коду

### Утилітарні типи (`src/types/dto.ts`)

![dto.ts](screenshots/Screenshot%202026-10-28%20140905.png)

### Generic-репозиторій (`src/repositories/in-memory.repository.ts`)

![in-memory.repository.ts](screenshots/Screenshot%202026-10-28%20140934.png)

## Результати роботи

### Перевірка типів без помилок

![npm run typecheck](screenshots/Screenshot%202026-10-28%20140749.png)

### Виконання програми (створення, оновлення, пошук, видалення, статистика)

![npm start, частина 1](screenshots/Screenshot%202026-10-28%20140831.png)

### Стандартизована відповідь `ApiResponse<T>`

![npm start, частина 2](screenshots/Screenshot%202026-10-28%20140837.png)

## Висновки

Під час роботи опановано generics з обмеженнями типів (`extends BaseEntity`), утилітарні типи `Omit`, `Partial`, `Pick`, `Record` для побудови DTO та реалізовано патерн Generic Repository. Один клас `InMemoryRepository<T>` працює з будь-якою сутністю без дублювання коду, а компілятор гарантує типобезпеку на всіх операціях.
