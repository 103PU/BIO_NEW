# CODING STANDARDS

## 1. 📁 File & Folder Structure

### Feature-Based Organization
```
src/features/
├── {feature-name}/
│   ├── actions.ts           # Server Actions
│   ├── actions.test.ts      # Tests (REQUIRED)
│   ├── components/          # UI components
│   ├── services/            # Business logic
│   ├── types/               # Domain types
│   └── utils/               # Helpers
```

### Naming Conventions
- **Components**: PascalCase (`AuthButton.tsx`)
- **Hooks**: camelCase (`useOfflineSession.ts`)
- **Utilities**: kebab-case (`text-processing.ts`)
- **Imports**: ALWAYS use `@/` alias (`@/lib/prisma/client`).

## 2. 📊 Code Quality

### TypeScript
- **Strict Mode**: Enabled. `noImplicitAny` is ON.
- **No `any`**: Use `unknown` with Zod validation.
- **No Props Mutation**: Treat props as immutable.

### React Components
- **Server Components**: Default. Use for data fetching.
- **Client Components**: Only when needed (State, Effects, Events). Add `'use client'`.

### Error Handling
- **Server**: Try-catch blocks in Actions. Log error -> Return clean Vietnamese message.
- **Client**: `ErrorBoundary` for crashes. `toast.error` for Action failures.

## 3. 🗂️ Database Best Practices

### Queries
- **Avoid N+1**: Use `include` or join queries appropriately.
- **Indexes**: Respect defined indexes (`title`, `createdAt`, `documentTypeId`, `topicId`).

### Migrations
- **Never Skip**: Always use `prisma migrate dev` for schema changes.
- **Never Edit Schema Directly on Prod**: Use migrations.

## 4. 🔐 Environment Variables
- **Secrets**: Never commit `.env`. Use `.env.example`.
- **Validation**: Ensure all env vars are checked at startup (config validation).
