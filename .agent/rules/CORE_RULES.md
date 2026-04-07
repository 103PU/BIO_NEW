# CORE RULES & MANDATES

> [!IMPORTANT]
> These rules are NON-NEGOTIABLE. Failure to follow them will result in rejected code.

## 1. 🎨 Artisan UI Mandates (VISUAL CORE)

### Fluid Typography & Spacing
**Rule**: CẤM dùng đơn vị tĩnh (`px`) cho font-size và layout padding chính.
**Require**: Bắt buộc dùng biến CSS `clamp()` đã định nghĩa trong `GlobalStyles.ts`.
- ❌ `font-size: 16px;`
- ✅ `font-size: var(--font-size-base);` (Sử dụng `clamp(1rem, ..., 1.125rem)`)

### Layered Shadows (Depth)
**Rule**: Bóng đổ phải có chiều sâu vật lý (3 lớp). Không dùng `box-shadow` đơn.
- ❌ `box-shadow: 0 4px 6px black;`
- ✅ `box-shadow: var(--shadow-md);` (Được cấu thành từ 3 lớp umbra/penumbra/ambient).

### Zero-Flicker Architecture
**Rule**: Dark Mode phải load ngay tức thì. Không được chớp trắng.
- **Mechanism**: Script chặn render (`theme-script.tsx`) phải được inject vào `<head>`.
- **Constraint**: Không dùng `useEffect` để set initial theme.

### Bento Grid System
**Rule**: Layout chính phải dùng `display: grid` với `grid-template-areas`.
- **Constraint**: Mobile stack dọc, Tablet 2 cột, Desktop 4 cột.
- **Component**: Luôn sử dụng `<BentoCard>` wrapper cho các ô nội dung.

## 2. 🚨 Critical Security Rules

### Authentication Check
**Use Case**: ALL Server Actions & API Routes.
```typescript
'use server'
export async function anyAction() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}
```

### Input Validation (Zod)
**Use Case**: ALL user input.
```typescript
const schema = z.object({ title: z.string().min(3) });
const parsed = schema.parse(data);
```

## 3. 🎯 4-Level Data Hierarchy
**Structure**: `Department` -> `Category` (Phân Mục) -> `Topic` (Loại) -> `Document`.
**Tags**: Specific models (MPC 3054). **MachineModel**: Series (MP, MPC).

## 4. ⚡ Server Actions Pattern
**Format**: `Promise<{ success: boolean; error?: string; data?: any }>`
**Database**:
- Multi-table updates **MUST** use `prisma.$transaction`.
- Call `revalidatePath` after mutation.

## 5. 🔍 Systematic Debugging (Iron Law)
**No fixes without root cause investigation.**
1.  **Investigate**: Read errors, reproduce.
2.  **Analyze**: Compare with working examples.
3.  **Hypothesize & Test**: Try ONE change at a time.
4.  **Implement**: Fix and Verify.

## 6. 🌐 Language Standard
- **User-Facing**: 100% Vietnamese.
- **Code Comments**: English permitted.
