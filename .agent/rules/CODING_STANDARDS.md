# CODING STANDARDS

## 1. 📁 File & Folder Structure

### Feature-Based Organization
```
src/features/
├── {feature-name}/
│   ├── actions.ts           # Server Actions
│   ├── components/          # UI components
│   ├── hooks/               # Custom hooks
│   └── types/               # Domain types
```

### Naming Conventions
- **Components**: PascalCase (`BentoCard.tsx`)
- **Tokens**: Semantic naming (`--color-surface`, `--shadow-md`) - NEVER color names (`--color-gray`).
- **Imports**: ALWAYS use `@/` alias (`@/components/core/Button`).

## 2. 🎨 CSS & Styling Standards (Artisan)

### Styled Components
- **Isolation**: Mỗi component phải tự styling chính nó. Không dùng CSS global ngoại trừ `GlobalStyles.ts`.
- **Dynamic Props**: Sử dụng transient props (`$variant`) để truyền tham số style.
  ```tsx
  const Box = styled.div<{ $isActive: boolean }>`
    opacity: ${p => p.$isActive ? 1 : 0.5};
  `
  ```

### Animation (Physics)
- **Library**: `framer-motion` là chuẩn duy nhất.
- **Springs**: Ưu tiên `type: "spring"` hơn `ease-in-out` cho các tương tác tự nhiên.
- **Micro-interactions**: Hover, Tap, Focus đều phải có phản hồi thị giác.

### Colors (HSL)
- **Syntax**: Luôn dùng `hsl(var(--variable))` hoặc `hsl(var(--variable) / 0.5)` (alpha).
- **Theme**: Không được hard-code mã màu hex.

## 3. 📊 Code Quality

### TypeScript
- **Strict Mode**: Enabled.
- **No `any`**: Trừ trường hợp `styled-components` props conflict (như `as` prop của Link).

### React Components
- **Server Components**: Mặc định.
- **Client Components**: Chỉ dùng khi cần `useState`, `useEffect` hoặc `framer-motion`.

## 4. 🗂️ Database Best Practices
- **Queries**: Tránh N+1. Dùng `include` hợp lý.
- **Migrations**: `prisma migrate dev` cho mọi thay đổi schema.

## 5. 🔐 Environment Variables
- **Secrets**: `.env.local` only.
- **Validation**: Kiểm tra biến môi trường khi khởi động app.
