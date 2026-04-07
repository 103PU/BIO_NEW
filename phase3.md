
**Phase 3: The Component Architecture & Bento Grid System.**

Đây là giai đoạn "Xây dựng khung xương thịt". Chúng ta không code nguyên một trang (Page), mà chúng ta code từng "Tế bào" (Atom) và lắp ghép chúng thành "Cơ thể" (Organism). Điểm nhấn của phase này là hệ thống **Bento Grid thông minh** - linh hồn của trang chủ.

Dưới đây là bản kế hoạch kỹ thuật `plans-phase3.md` chi tiết.

---

# 📜 plans-phase3.md: Phase 3 - Component Architecture & The Bento Grid

> **Document Status:** APPROVED FOR IMPLEMENTATION
> **Target:** Josh W. Comeau Clone (High-Performance Personal Platform)
> **Prerequisites:** Phase 1 & 2 Completed (Tokens ready).
> **Priority:** HIGH (The visible layer of the application)
> **Audience:** Senior Frontend Agent / Engineering Team

---

## 1. Executive Summary & Philosophy

Trong Phase này, Agent chuyển từ tư duy "Global" sang tư duy "Modular". Chúng ta áp dụng triệt để **Atomic Design**.

**Core Philosophy:**

1. **Polymorphism (Đa hình):** Một `Button` có thể là `<button>`, nhưng cũng có thể là `<a>` (Link) nếu cần, nhưng Style không đổi.
2. **Composition over Inheritance:** Các Bento Cards được lắp ghép từ nhiều component nhỏ (Image, Heading, Tag) thay vì viết một component Card khổng lồ.
3. **The "Stretched Link" Pattern:** Trong Bento Grid, cả một ô thẻ phải click được, nhưng vẫn đảm bảo ngữ nghĩa HTML chuẩn (không lồng thẻ `<a>` vào trong thẻ `<div>` click được).

---

## 2. Technical Specification: The Bento Grid Engine

*Đây là layout phức tạp nhất. Không được dùng Flexbox đơn thuần. Bắt buộc dùng CSS Grid Areas.*

### 2.1. Grid Architecture (Kiến trúc Lưới)

Hệ thống Grid phải thay đổi cấu trúc hoàn toàn dựa trên Viewport (Responsive Layout Shifting).

**Grid Template Areas (Desktop - 1200px+):**
Chúng ta chia lưới thành 4 cột x 3 hàng (12 ô đơn vị).

```css
.bento-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: var(--space-md);
  
  grid-template-areas:
    "bio      bio      latest   latest"
    "project1 project2 latest   latest"
    "course   course   social   stats";
}

```

**Grid Template Areas (Tablet - 768px+):**

```css
.bento-grid {
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "bio      bio"
    "latest   latest"
    "project1 project2"
    "course   course"
    "social   stats";
}

```

**Mobile:** `display: flex; flex-direction: column;` (Stack vertical).

### 2.2. The "Tilt" Effect (Hiệu ứng nghiêng 3D)

Để đạt chuẩn >90% giống Josh, các ô Bento không chỉ đứng yên.

* **Logic:** Khi di chuột, card sẽ nghiêng nhẹ theo hướng chuột.
* **Tech Stack:** `react-spring` hoặc `framer-motion` (dùng `useMotionValue` để track tọa độ X/Y của chuột trên Card).
* **Constraint:** Chỉ enable hiệu ứng này trên Desktop (hoặc thiết bị có `hover: hover`). Tắt trên Mobile để tăng hiệu năng.

---

## 3. Module A: Atomic Components (Các nguyên tử)

Agent phải xây dựng các component này trước khi làm Layout. Chúng phải kế thừa toàn bộ Token của Phase 1 & 2.

### 3.1. The "Whimsical" Button (MANDATORY)

* **Visual:**
* Background: `--color-primary`.
* Shadow: `--shadow-sm`.
* Border-radius: `8px` (hoặc biến `--radius-md`).


* **Interaction (Physics):**
* Hover: `transform: translateY(-2px)` + Shadow tăng lên `--shadow-md`.
* Active (Click): `transform: translateY(1px)` + Shadow giảm về 0.


* **Sound:** Tích hợp `use-sound` (tiếng "pop" ngắn).

```tsx
// props interface
interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

```

### 3.2. Tags & Badges

* Dùng để hiển thị Category (React, CSS, Career).
* **Style:** Background màu `--color-primary` nhưng giảm `opacity` xuống 0.1 (Transparentize). Text màu `--color-primary`.
* **Hover:** Đậm màu lên một chút.

### 3.3. VisuallyHidden (Accessibility)

* Component vô hình về mặt thị giác nhưng hữu hình với Screen Reader.
* Dùng cho các icon button (Ví dụ: Nút Toggle Theme chỉ có icon mặt trăng, cần `<VisuallyHidden>Toggle Dark Mode</VisuallyHidden>`).

---

## 4. Module B: The Content Pipeline (MDX Engine)

*Xây dựng cơ chế hiển thị bài viết.*

### 4.1. Contentlayer Config

Agent phải setup file `contentlayer.config.ts`.

* **Define Document Types:** `Post`, `Project`, `Snippet`.
* **Computed Fields:**
* `slug`: Tự động cắt từ tên file.
* `readingTime`: Tính toán dựa trên số từ.
* `blurImage`: Tạo base64 placeholder cho ảnh thumbnail.



### 4.2. Code Snippet Component (`<Pre>`)

Đây là phần khó nhất của Blog Developer.

* **Yêu cầu:** Phải hiển thị được tên file, icon ngôn ngữ, và nút Copy.
* **Tech:** `rehype-pretty-code`.
* **Visual:** Style giống giao diện VSCode (dùng theme `One Dark Pro` hoặc `Dracula`).

---

## 5. Module C: The Bento Card Component (Molecules)

Xây dựng component `<BentoCard>` tổng quát để tái sử dụng.

### 5.1. Anatomy of a Card (Cấu tạo)

1. **Wrapper:** `position: relative`, `overflow: hidden`, `border-radius: xl`.
2. **Background:** Màu `--color-surface`.
3. **Content Layer:** `z-index: 2`. Chứa Text.
4. **Decor Layer:** `z-index: 1`. Chứa hình minh họa (Image) hoặc Pattern hạt (Noise).
5. **Action Layer:** Link phủ toàn bộ card (`::after { content: ''; position: absolute; inset: 0; }`).

### 5.2. Special Card: The "Latest Post"

Card này đặc biệt quan trọng.

* **Layout:** Ảnh bên trái (hoặc trên), Text bên phải (hoặc dưới).
* **Feature:** Có nhãn "NEW" nhấp nháy (CSS Animation pulse) ở góc.

---

## 6. Implementation Checklist (Agent to-do)

**Step 1: Atoms Construction**

1. [ ] Code component `<Button>` (với Sound & Physics).
2. [ ] Code component `<Tag>` và `<VisuallyHidden>`.
3. [ ] Code component `<Input>` (Custom focus ring, không dùng default outline).

**Step 2: Content Engine Setup**

1. [ ] Cài đặt `contentlayer` và `next-contentlayer`.
2. [ ] Config `rehype-pretty-code` để highlight syntax.
3. [ ] Tạo 1 bài viết mẫu `.mdx` để test render.

**Step 3: Bento Grid Assembly**

1. [ ] Viết CSS Grid Layout (Grid Areas) cho trang chủ.
2. [ ] Code component `<BentoCard>`.
3. [ ] Lắp ghép dữ liệu (Hard-code tạm thời hoặc lấy từ MDX) vào Grid.

---

## 7. Quality Assurance (UX Criteria)

Agent phải tự kiểm tra:

* **Tab Navigation:** Có thể dùng phím Tab để nhảy qua từng ô Bento không? Focus Ring có hiện rõ không?
* **Mobile Stack:** Trên điện thoại, các ô có xếp chồng lên nhau gọn gàng với khoảng cách `--space-md` không?
* **Text Contrast:** Text trên Bento Card (nền xám/đen) có đủ độ tương phản không?
* **Image Optimization:** Ảnh trong Bento Card có dùng `next/image` để lazy load không? (Bắt buộc để đạt điểm Performance 100).

---

**End of Phase 3 Plan.**
*Agent, hãy bắt đầu bằng việc tạo hệ thống Atomic Components (Button, Tag) trước khi lắp vào Grid.*