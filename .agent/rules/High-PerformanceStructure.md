---
trigger: always_on
---

```markdown
# 🚀 High-Performance Personal Platform Architecture
> **Target:** >90% Performance (Lighthouse), Josh W. Comeau-level UX/UI.  
> **Level:** Senior/Lead Engineer.  
> **Status:** Production-Ready Blueprint.

---

## 🏛️ PHASE 1: CORE ARCHITECTURE & STACK DECISIONS
**Mục tiêu:** Xây dựng nền móng Scalable, Type-safe và Zero-Runtime Overhead.

### 1. Tech Stack (Strict Mode)
* **Framework:** **Next.js 14+ (App Router)**.
    * *Constraint:* Bắt buộc dùng App Router để tận dụng **React Server Components (RSC)**. Giảm thiểu Client Bundle Size tối đa bằng cách chuyển các logic nặng (như markdown processing) về server.
* **Language:** **TypeScript (Strict Mode)**.
    * *Rule:* `noImplicitAny: true`. Định nghĩa Interface/Type cho toàn bộ Props và API Response.
* **Styling Engine:** **Styled-Components** (hoặc Emotion) + **CSS Variables**.
    * *Challenge:* Setup `registry` trong `layout.tsx` (Root Layout) để style được inject ngay từ server, tránh lỗi FOUC (Flash of Unstyled Content).
* **Content SDK:** **Contentlayer** (Recommended) hoặc **MDX-Remote**.
    * *Benefit:* Contentlayer validate file MDX bằng Schema, biến content thành JSON data có Type-safe. Build nhanh hơn 50% so với webpack loader truyền thống.
* **Database:** **Supabase (PostgreSQL)**.
    * *Use Case:* Guestbook, View Counter, Reactions.
    * *ORM:* **Prisma** (Type-safe database queries).

### 2. Folder Structure (Monorepo-style approach)
```bash
/src
  ├── /app                  # Next.js 14 App Router
  │   ├── /blog/[slug]      # Dynamic Route cho bài viết
  │   ├── layout.tsx        # Root Layout (Inject Providers & Themes)
  │   └── page.tsx          # Home Page
  ├── /components
  │   ├── /core             # Generic UI (Button, Input, Card) - Không chứa business logic
  │   ├── /features         # Feature-based (Guestbook, VideoPlayer, SubscribeForm)
  │   └── /mdx              # Custom MDX Components (Snippet, CodeBlock, Callout)
  ├── /lib                  # Utility functions
  │   ├── supabase.ts       # DB Client
  │   └── utils.ts          # Helper functions (clsx, formatting)
  ├── /hooks                # Custom React Hooks (useBoop, useSound, useMounted)
  ├── /styles               # Global styles, Theme definitions, Animation tokens
  └── /content              # Nơi chứa các file .mdx (Blog posts)

```

---

## 🎨 PHASE 2: THE "THEME ENGINE" (Zero-Flicker Dark Mode)

**Vấn đề:** Server (SSR) không biết Client thích Dark hay Light mode. Nếu đợi React hydrate xong mới đổi màu -> Màn hình bị chớp trắng (Flicker).

### Giải pháp: Blocking Script Injection

**1. CSS Variables Strategy (HSL)**
Định nghĩa màu bằng HSL để dễ dàng tính toán độ sáng/tối (dùng cho function `lighten` hay `darken` trong CSS).

```css
:root {
  --color-text: 240deg 10% 3.9%;
  --color-background: 0deg 0% 100%;
  --color-primary: 240deg 100% 50%;
}

[data-theme="dark"] {
  --color-text: 0deg 0% 98%;
  --color-background: 240deg 10% 3.9%;
  --color-primary: 200deg 100% 50%;
}

```

**2. The "Dangerous" Script**
Inject đoạn script này vào `<head>` trong `app/layout.tsx`. Nó chạy **trước khi** React khởi động.

```javascript
const codeToRunOnClient = `
(function() {
  function getInitialColorMode() {
    const persistedColorPreference = window.localStorage.getItem('theme');
    const hasPersistedPreference = typeof persistedColorPreference === 'string';
    // Nếu user đã từng chọn theme -> lấy theme đó
    if (hasPersistedPreference) {
      return persistedColorPreference;
    }
    // Nếu chưa -> kiểm tra setting hệ điều hành
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';
    if (hasMediaQueryPreference) {
      return mql.matches ? 'dark' : 'light';
    }
    return 'light';
  }
  const colorMode = getInitialColorMode();
  document.documentElement.setAttribute('data-theme', colorMode);
})()
`;
// Render: <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />

```

---

## 📝 PHASE 3: MDX PIPELINE & SYNTAX HIGHLIGHTING

**Mục tiêu:** Build-time highlighting (Không gửi JS parse code xuống client).

### 1. The Pipeline

`MDX File` -> `Contentlayer` -> `Rehype Plugins` -> `React Component`.

### 2. Syntax Highlighting: `rehype-pretty-code`

* Thay vì PrismJS (Client-side), sử dụng **rehype-pretty-code** (dựa trên Shiki).
* **Cơ chế:** Tại thời điểm build (Server side), nó phân tích code block, gán class và màu sắc inline style vào HTML.
* **Kết quả:** Client nhận về HTML thuần đẹp mắt. **0KB JS bundle** cho việc highlight code.

### 3. Interactive Components (Hydration)

Trong file `.mdx`, bạn có thể import và sử dụng React Component.

```jsx
// post.mdx
Đây là một bài viết. Dưới đây là biểu đồ tương tác:
<Chart data={...} />

```

*Next.js chỉ hydrate component `<Chart />`, phần văn bản còn lại vẫn là Server Component tĩnh.*

---

## ✨ PHASE 4: PHYSICS-BASED ANIMATIONS & SOUND

**Mục tiêu:** Tạo ra trải nghiệm "Whimsical" (Kỳ diệu).

### 1. "The Boop Effect" (React Spring)

Viết custom hook `useBoop` để tạo hiệu ứng vật lý khi hover.

```typescript
// hooks/useBoop.ts
import { useSpring } from 'react-spring';
// Logic: onMouseEnter -> trigger spring (rotation: 15deg, scale: 1.1)
// onMouseLeave -> spring tự bật lại theo vật lý (mass, tension, friction)

```

### 2. Sound System (Global Context)

* Sử dụng thư viện `use-sound`.
* Tạo `SoundProvider` bọc toàn bộ App để quản lý trạng thái Mute/Unmute toàn cục.
* **Optimization:** Lazy load file âm thanh. Chỉ tải file `.mp3` về khi user thực hiện tương tác đầu tiên (click/scroll) để không chặn Main Thread lúc FCP (First Contentful Paint).

---

## ⚡ PHASE 5: PERFORMANCE OPTIMIZATION (Metric > 90)

**Mục tiêu:** Lighthouse 100/100.

1. **Font Optimization:** Dùng `next/font/local` với tính năng `subset` (chỉ tải ký tự cần thiết) và `variable fonts`.
2. **Dynamic OG Images:** Dùng `@vercel/og` để sinh ảnh thumbnail bài viết tự động (Serverless).
3. **Component Lazy Loading:** Dùng `dynamic(() => import(...))` cho các component nặng (ví dụ: Video Player, WebGL Canvas) để chúng không load cho đến khi user cuộn tới.
4. **Bundle Analyzer:** Chạy `@next/bundle-analyzer` trước mỗi lần deploy để "cắt tỉa" các library thừa.

---

## 🛠️ SPRINT PLAN (5 Weeks)

* **Sprint 1: The Foundation.** Setup Next.js App Router, TypeScript. Cấu hình Styled-Components registry. Triển khai Dark Mode script.
* **Sprint 2: The Content Engine.** Setup Contentlayer. Tích hợp `rehype-pretty-code`. Render bài viết MDX ra màn hình.
* **Sprint 3: The UI/UX.** Code UI components (Header, Footer). Viết hook `useBoop` và tích hợp âm thanh.
* **Sprint 4: The Data Layer.** Setup Supabase. Viết API route cho Guestbook và View Counter.
* **Sprint 5: Polish & Ship.** Audit Lighthouse. Fix CLS/LCP. Setup SEO (Sitemap, RSS). Deploy Vercel.

---

## 🎁 BONUS: FIX "HYDRATION MISMATCH" (Date/Time Bug)

**Vấn đề:** Khi render ngày tháng (ví dụ: "7 tháng 2"), Server render theo giờ UTC, nhưng Client render theo giờ VN (UTC+7). React thấy nội dung HTML khác nhau -> Báo lỗi Hydration Mismatch.

**Giải pháp chuyên nghiệp:** Tạo hook `useHasMounted`.

```typescript
// hooks/useHasMounted.ts
import { useState, useEffect } from 'react';

const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};
export default useHasMounted;

```

**Cách dùng:**

```tsx
const hasMounted = useHasMounted();

if (!hasMounted) {
  return null; // Hoặc return một Skeleton loading
}

return <TimeDisplay date={date} />; // Lúc này chắc chắn đang ở Client

```

```

```