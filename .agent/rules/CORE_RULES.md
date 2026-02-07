# CORE RULES & MANDATES

> [!IMPORTANT]
> These rules are NON-NEGOTIABLE. Failure to follow them will result in rejected code.

## 1. 🚨 Critical Security Rules

### Authentication Check
**Use Case**: ALL Server Actions & API Routes.
```typescript
'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function anyAction(data: unknown) {
  // ✅ REQUIRED: Check session FIRST
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false, error: "Bạn cần đăng nhập" };
  }
  // Continue...
}
```

### RBAC Protection
**Use Case**: Sensitive actions (Delete, Update, Admin tasks).
```typescript
// Example: Require ADMIN role
await requireRole([Role.ADMIN]);
// Or permission
await requirePermission('documents:create');
```

### Input Validation (Zod)
**Use Case**: ALL user input.
```typescript
const schema = z.object({
  title: z.string().min(3),
  // ...
});
const parsed = schema.safeParse(data);
if (!parsed.success) {
  return { success: false, error: "Dữ liệu không hợp lệ" };
}
const { title } = parsed.data; // Type-safe usage
```

### SQL Injection Prevention
**Rule**: ALWAYS use Prisma ORM. NEVER use raw SQL (`$queryRaw`) with user input.

## 2. 🎯 4-Level Data Hierarchy
**Structure**: `Department` -> `Category` (Phân Mục) -> `Topic` (Loại) -> `Document`.

- **Department**: Top level (e.g., Kỹ Thuật, Kinh Doanh).
- **Category (Type)**: "Quy Trình", "Tài Liệu", "Hình Ảnh".
- **Topic**: Specific grouping (e.g., "Cài đặt in-scan").
    - **Slug Rule**: `${categoryName}-${topicName}` (e.g., `quy-trinh-cai-dat-in-scan`).
- **Document**: The actual content.

**Tags vs MachineModel**:
- **MachineModel**: SERIES only (MP, MPC, MPW).
- **Tags**: Specific models (MPC 3054, MP 7001).

## 3. ⚡ Server Actions Pattern

### Standard Response Format
```typescript
type ActionResult = {
  success: boolean;
  error?: string; // Vietnamese error message
  data?: any;
};
```

### Transaction Requirement (CRITICAL)
**Rule**: Multi-table updates (Core `Document` + `TechnicalMetadata`) **MUST** use `prisma.$transaction`.
```typescript
await prisma.$transaction(async (tx) => {
  const doc = await tx.document.create({ ... });
  await tx.technicalMetadata.create({
    data: { documentId: doc.id, ... }
  });
});
```

### Facade Pattern (Access)
**Rule**: Consumers (UI/API) should receive a "flattened" object. Service layer must map Metadata fields to the root object.
- ❌ `doc.technicalMetadata.machineModels`
- ✅ `doc.machineModels`

### Revalidation
**Rule**: Call `revalidatePath` after every mutation.

## 4. 🔍 Systematic Debugging (Iron Law)
**No fixes without root cause investigation.**
1.  **Investigate**: Read errors, reproduce, trace data.
2.  **Analyze**: Compare with working examples.
3.  **Hypothesize & Test**: Try ONE change at a time.
4.  **Implement**: Fix and Verify.

## 5. 🌐 Vietnamese Language Standard
- **User-Facing**: 100% Vietnamese (Error messages, UI text).
  - ✅ `return { success: false, error: "Bạn cần đăng nhập" };`
- **Code Comments**: English permitted and encouraged for technical details.
