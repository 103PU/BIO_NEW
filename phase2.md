
# 📜 plans-phase2.md: Phase 2 - The Theme Engine & Visual Depth

> **Document Status:** APPROVED FOR IMPLEMENTATION
> **Target:** Josh W. Comeau Clone (High-Performance Personal Platform)
> **Prerequisites:** Phase 1 (Typography & Spacing) Completed.
> **Priority:** CRITICAL (Defines the look & feel of the platform)
> **Audience:** Senior Frontend Agent / Engineering Team

---

## 1. Executive Summary & Philosophy

Trong Phase này, Agent phải xây dựng một **"Hệ thống Chiếu sáng" (Lighting System)** chứ không đơn thuần là chọn bảng màu.

**Core Philosophy:**

1. **Color is Meaning:** Màu sắc không được hard-code. Màu sắc phải mang tính ngữ nghĩa (Semantic). Ví dụ: Không dùng `blue`, hãy dùng `action`.
2. **Shadows are Layers:** Bóng đổ trong đời thực không bao giờ là một lớp. Chúng ta sử dụng kỹ thuật **Layered Shadows** để tạo độ sâu siêu thực.
3. **Theme is Architecture:** Dark Mode không phải là tính năng phụ (Add-on). Nó là cốt lõi (Core). Phải đảm bảo **Zero-Flicker** (Không chớp trắng) khi tải trang.

---

## 2. Technical Specification: The "Zero-Flicker" Theme Architecture

*Đây là yêu cầu kỹ thuật quan trọng nhất. Hầu hết các website React/Next.js đều thất bại ở điểm này (bị chớp trắng khi F5).*

### 2.1. The Blocking Script Strategy (Chiến thuật chặn render)

Agent **KHÔNG ĐƯỢC** sử dụng `useEffect` để check theme (vì `useEffect` chạy sau khi UI đã render -> gây chớp).

**Giải pháp bắt buộc:**

1. Viết một đoạn Script thuần (Vanilla JS) dạng chuỗi String.
2. Inject đoạn script này vào thẻ `<head>` hoặc ngay đầu thẻ `<body>` trong `src/app/layout.tsx`.
3. **Logic của Script:**
* Check `localStorage` xem có key `theme` không.
* Nếu không, check `window.matchMedia('(prefers-color-scheme: dark)')`.
* Gán ngay lập tức class (hoặc data-attribute) cho thẻ `<html>`.
* Thiết lập biến CSS `--color-mode` ngay tại thời điểm đó.



```typescript
// src/lib/theme-script.ts
export const blockingThemeScript = `(function() {
  function getInitialColorMode() {
    const persistedPreference = window.localStorage.getItem('theme');
    const hasPersistedPreference = typeof persistedPreference === 'string';
    if (hasPersistedPreference) { return persistedPreference; }
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';
    if (hasMediaQueryPreference) { return mql.matches ? 'dark' : 'light'; }
    return 'light';
  }
  const colorMode = getInitialColorMode();
  document.documentElement.setAttribute('data-theme', colorMode);
  document.documentElement.style.setProperty('--initial-color-mode', colorMode);
})()`;

```

### 2.2. State Synchronization (Đồng bộ trạng thái)

Sau khi React "hydrate" (khởi động), nó phải đồng bộ với state của HTML mà không gây ra lỗi "Hydration Mismatch".

* **Yêu cầu:** Agent phải tạo `ThemeProvider` context để quản lý việc toggle theme sau khi load xong.

---

## 3. Module A: The Semantic Color System (HSL)

Chúng ta từ bỏ hệ Hex (`#ffffff`). Chuyển toàn bộ sang **HSL (Hue, Saturation, Lightness)**.
Lý do: HSL cho phép điều chỉnh độ sáng/tối bằng code (`calc()`).

### 3.1. Color Palette (Bảng màu nguyên thủy)

Định nghĩa các màu gốc trong `GlobalStyles`. Josh thường dùng các tông màu Pastel có độ bão hòa cao nhưng độ sáng vừa phải.

```css
:root {
  /* Primitives - Không dùng trực tiếp */
  --color-gray-100: 210deg 20% 98%;
  --color-gray-500: 210deg 10% 50%;
  --color-gray-900: 210deg 25% 10%;
  --color-primary-hue: 245deg; /* Màu tím đặc trưng */
}

```

### 3.2. Semantic Tokens (Bảng màu ngữ nghĩa) - MANDATORY

Agent chỉ được dùng các biến này trong Components.

| Token Name            | Light Mode Value       | Dark Mode Value        | Mục đích                            |
| --------------------- | ---------------------- | ---------------------- | ----------------------------------- |
| `--color-background`  | `hsl(0deg 0% 100%)`    | `hsl(210deg 30% 8%)`   | Nền chính trang web                 |
| `--color-text`        | `hsl(210deg 25% 10%)`  | `hsl(210deg 20% 98%)`  | Chữ chính (độ tương phản cao)       |
| `--color-text-subtle` | `hsl(210deg 10% 50%)`  | `hsl(210deg 15% 65%)`  | Meta data, ngày tháng               |
| `--color-primary`     | `hsl(245deg 100% 60%)` | `hsl(245deg 100% 70%)` | Brand color, Links                  |
| `--color-surface`     | `hsl(210deg 20% 96%)`  | `hsl(210deg 25% 12%)`  | **Quan trọng:** Nền của Bento Cards |
| `--color-border`      | `hsl(210deg 20% 90%)`  | `hsl(210deg 20% 20%)`  | Viền mờ                             |

### 3.3. Rules cho 6 Lớp Khung (Màu sắc)

1. **Dynamic Header:** Dùng `--color-surface` với độ trong suốt `alpha: 0.8` + `backdrop-filter: blur`.
2. **Hero Section:** Text Gradient sử dụng `--color-primary` pha với màu Secondary (ví dụ: Pink/Cyan).
3. **Bento Grid:**
* Light Mode: Nền trắng (`--color-background`), viền mờ.
* Dark Mode: Nền xám đen (`--color-surface`), **KHÔNG DÙNG SHADOW**, thay vào đó dùng viền sáng (`1px solid var(--color-border)`).



---

## 4. Module B: The Layered Shadow Engine (Physics)

Bóng đổ mặc định của CSS (`box-shadow: 2px 2px 5px black`) trông rất giả ("nhựa"). Agent phải triển khai **Smooth Shadows**.

### 4.1. The Layering Technique

Một shadow "xịn" phải được cấu thành từ 3 lớp:

1. **Umbra:** Bóng tối nhất, gần vật thể nhất (Direct light).
2. **Penumbra:** Bóng trung gian, lan tỏa nhẹ.
3. **Ambient:** Bóng môi trường, rất mờ và rộng (Ambient occlusion).

### 4.2. Implementation Code

Agent phải tạo Design Tokens cho shadow:

```css
:root {
  /* Shadow thấp (Button, Card nhỏ) */
  --shadow-sm: 
    0px 0.5px 0.6px hsl(var(--shadow-color) / 0.1),
    0px 1.5px 1.8px -0.8px hsl(var(--shadow-color) / 0.1),
    0px 3.5px 4.2px -1.7px hsl(var(--shadow-color) / 0.1);
    
  /* Shadow cao (Modal, Hover Card) */
  --shadow-lg:
    0px 0.8px 1px hsl(var(--shadow-color) / 0.08),
    0px 2.8px 3.4px -0.6px hsl(var(--shadow-color) / 0.08),
    0px 6.7px 8.1px -1.2px hsl(var(--shadow-color) / 0.08),
    0px 16.2px 19.6px -1.8px hsl(var(--shadow-color) / 0.08),
    0px 35px 40px -2.5px hsl(var(--shadow-color) / 0.08);
}

[data-theme="light"] { --shadow-color: 210deg 25% 40%; }
[data-theme="dark"]  { --shadow-color: 0deg 0% 0%; /* Shadow gần như tàng hình ở dark mode */ }

```

### 4.3. The "Elevation" Rule (Quy tắc độ cao)

Khi hover vào một Bento Card:

* `transform: translateY(-4px)` (Card bay lên).
* `box-shadow` chuyển từ `--shadow-md` sang `--shadow-lg`.
* **Logic vật lý:** Vật càng xa mặt đất, bóng càng mờ và lan rộng.

---

## 5. Module C: Texture & Glassmorphism (The "Whimsy")

Để tránh giao diện bị "phẳng" (Flat) quá mức, chúng ta thêm Texture.

### 5.1. Noise Texture (Hiệu ứng hạt)

Tạo một file SVG `noise.svg` (các hạt nhiễu).

* Thêm vào `GlobalStyles` dưới dạng `background-image` cho `<body>`.
* Độ trong suốt cực thấp (`opacity: 0.03` ở Light mode, `0.05` ở Dark mode).
* *Tác dụng:* Làm cho màu nền trông như bề mặt giấy/kim loại, giảm cảm giác kỹ thuật số.

### 5.2. Glassmorphism (Kính mờ)

Áp dụng cho **Dynamic Header** và **Modal/Dialog**.

* Công thức chuẩn:
```css
background: hsla(var(--color-surface), 0.7);
backdrop-filter: blur(12px) saturate(160%); /* Saturate giúp màu sau kính rực rỡ hơn */
border-bottom: 1px solid var(--color-border);

```



---

## 6. Implementation Checklist (Agent to-do)

Agent phải thực hiện tuần tự các bước sau:

1. [ ] **`src/app/layout.tsx`**:
* Inject `blockingThemeScript` vào `<head>`.
* Đảm bảo không bị Flash of Unstyled Content (FOUC).


2. [ ] **`src/styles/theme.ts`**:
* Định nghĩa toàn bộ biến HSL (`--color-*`).
* Định nghĩa Layered Shadows (`--shadow-*`).


3. [ ] **`src/components/Provider.tsx`**:
* Xây dựng `ThemeProvider` context để các component con có thể `useTheme()`.


4. [ ] **`src/components/Card.tsx` (Bento Core)**:
* Tạo component Card cơ bản áp dụng `--color-surface` và `--shadow-md`.
* Cài đặt hiệu ứng Hover Elevation (Bay lên + Đổi bóng).


5. [ ] **Testing**:
* F5 trang web ở chế độ Dark Mode -> Nếu thấy màn hình trắng lóe lên dù chỉ 0.1s -> **THẤT BẠI**. Phải sửa lại Script.



---

## 7. Quality Assurance (Visual Acceptance Criteria)

* **Độ sâu:** Các ô Bento Grid có cảm giác "nổi" lên khỏi nền không? Hay trông giống như hình vẽ 2D dán lên?
* **Độ tương phản:** Ở Dark Mode, chữ `--color-text-subtle` có đọc được không? (Kiểm tra Contrast Ratio chuẩn WCAG AA).
* **Màu sắc thương hiệu:** Màu Primary (Tím/Hồng) có được sử dụng tiết chế (chỉ cho Link, Button, Accent) hay bị lạm dụng tràn lan?
* *Quy tắc:* Màu Primary chiếm tối đa 10% diện tích màn hình.



---

**End of Phase 2 Plan.**
*Agent, nhiệm vụ của bạn là biến bản thiết kế logic này thành các file CSS/TSX thực tế. Hãy bắt đầu với việc Inject Script chặn render.*