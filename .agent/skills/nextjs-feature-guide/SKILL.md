---
name: nextjs-feature-guide
description: Comprehensive guide for developing features in Vintechco Hub using Next.js 16 App Router, Server Actions, Tailwind CSS v4, and shadcn/ui. Replaces generic backend/frontend guides.
---

# Next.js Feature Development Guide

## Purpose
Standardized workflow for building features in the **Next.js 16 App Router** architecture (Monolith).

## When to Use This Skill
- Creating new features (`src/features/*`)
- Writing Server Actions (`actions.ts`)
- Building UI components with `shadcn/ui`
- Debugging Server/Client component issues

---

## 🏗️ Feature Structure (The "Vintechco Standard")

Every feature must follow this structure:

```
src/features/{feature-name}/
├── actions.ts           # ⚡ Server Assignments (Mutations)
├── actions.test.ts      # 🧪 Test file (REQUIRED)
├── components/          # 🎨 UI Components (Feature-specific)
├── services/            # 🧠 Business Logic (Prisma checks)
├── types/               # 📝 Zod Schemas & Types
└── utils/               # 🛠️ Helper functions
```

### 1. Server Actions (`actions.ts`)
**Rules:**
- Must start with `'use server'`
- **Authentication**: ALWAYS check `getServerSession`.
- **Validation**: ALWAYS `zod.parse`.
- **Response**: Return `{ success: boolean, error?: string, data?: any }`.
- **Revalidation**: `revalidatePath(...)` on success.

```typescript
'use server'
export async function createItem(data: unknown) {
  // 1. Auth
  const session = await getServerSession(authOptions);
  if (!session) return { success: false, error: "Unauthorized" };

  // 2. Validate
  const parsed = schema.safeParse(data);
  if (!parsed.success) return { success: false, error: "Invalid data" };

  // 3. Service Call
  try {
    await service.create(parsed.data);
    revalidatePath('/admin/items'); // 4. Revalidate
    return { success: true };
  } catch (e) {
    return { success: false, error: "Hệ thống lỗi" };
  }
}
```

### 2. Services (`services/*.ts`)
**Rules:**
**- Pure functions / Classes separate from UI.
- Direct Prisma usage.
- **NO** `NextRequest` / `NextResponse` objects here. just data.

```typescript**
export class DocumentService {
  async create(data: CreateDocDTO) {
    return prisma.$transaction(async (tx) => {
      // 1. Create Core
      const doc = await tx.document.create({
         data: { title: data.title, ... }
      });
      
      // 2. Create Extension (Metadata)
      await tx.technicalMetadata.create({
        data: {
          documentId: doc.id,
          documentTypeId: data.documentTypeId,
          ...
        }
      });
      
      return doc;
    });
  }

  async getAll() {
    const docs = await prisma.document.findMany({
      include: { technicalMetadata: true }
    });
    // Flatten for UI
    return docs.map(d => ({
      ...d,
      documentType: d.technicalMetadata?.documentType,
      ...
    }));
  }
}
```

### 3. Components (`components/*.tsx`)
**Rules:**
- **Server Components (Default)**: Use for fetching data.
  ```tsx
  // Page is Server Component
  export default async function Page() {
    const items = await prisma.item.findMany(); // Direct DB access allowed here
    return <ItemList items={items} />
  }
  ```
- **Client Components**: Use for interactivity (Forms, dialogs).
  ```tsx
  'use client'
  export function CreateButton() {
    const [open, setOpen] = useState(false);
    return <Dialog open={open} ... />
  }
  ```

---

## 🎨 Styling (Tailwind v4 + shadcn/ui)

**Rules:**
- Use `shadcn/ui` components from `@/components/ui`.
- **Tailwind v4**: No `tailwind.config.js`. Variables in CSS.
- **Micro-animations**: Use `framer-motion` or CSS transitions for "Premium" feel.

```tsx
// ✅ Correct
import { Button } from "@/components/ui/button";

export function Action() {
  return (
    <Button 
      variant="default" 
      className="hover:scale-105 transition-transform"
    >
      Lưu thay đổi
    </Button>
  )
}
```

---

## 🧪 Testing (Vitest + Playwright)

1.  **Unit Tests**: `actions.test.ts` MUST exist.
2.  **Mocking**: Use `vi.mock('@/lib/prisma')`.

---

## ⚠️ Anti-Patterns (What NOT to do)
- ❌ **API Routes**: Don't use `src/app/api/...` for internal mutations. Use Server Actions.
- ❌ **useEffect Data Fetching**: Don't fetch data in `useEffect`. Use Server Components.
- ❌ **Raw SQL**: Never use raw SQL strings.
- ❌ **English Errors**: User-facing errors must be Vietnamese.

