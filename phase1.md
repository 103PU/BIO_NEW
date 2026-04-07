
# 📜 plans.md: Phase 1 - The Fluid Foundation System

> **Document Status:** APPROVED FOR IMPLEMENTATION
> **Target:** Josh W. Comeau Clone (High-Performance Personal Platform)
> **Priority:** CRITICAL (Blocker for all subsequent UI tasks)
> **Audience:** Senior Frontend Agent / Engineering Team
> **Context:** - Current state is rigid. Goal is Fluidity.

---

## 1. Executive Summary & Philosophy

Bước này không đơn thuần là chọn Font chữ hay chỉnh Margin. Đây là việc xây dựng một **Hệ điều hành hiển thị (Visual Operating System)**.

Hệ thống này phải tuân thủ nguyên tắc **"Fluid Typography & Spacing"**. Chúng ta từ chối sử dụng đơn vị tĩnh (`px`) cho bố cục chính. Thay vào đó, chúng ta sử dụng các hàm toán học (`clamp()`, `calc()`, `min()`, `max()`) để giao diện "thở" nhịp nhàng theo kích thước thiết bị của người dùng, từ iPhone SE đến màn hình Ultrawide 4K.

**Agent Directive:** Mọi dòng code CSS được viết ra trong Phase này phải trả lời được câu hỏi: *"Giá trị này có scale mượt mà không?"*

---

## 2. Technical Specification: The Mathematical Core

Trước khi đi vào Typography hay Spacing, Agent phải thiết lập các **Hằng số toán học (Mathematical Constants)** trong `GlobalStyles`.

### 2.1. The Fluid Formula (Công thức dòng chảy)

Agent phải triển khai hàm nội suy tuyến tính (Linear Interpolation) cho mọi giá trị biến thiên.
Công thức: `clamp(MIN, PREFERRED, MAX)`

* **Viewport Min:** `320px` (Mobile)
* **Viewport Max:** `1200px` (Desktop Standard) - *Lưu ý: Josh dùng mốc này để bắt đầu khóa Layout.*

### 2.2. Breakpoints System (Hệ thống điểm ngắt)

Không hard-code media query lung tung. Định nghĩa các điểm ngắt ngữ nghĩa:

```typescript
// styles/breakpoints.ts
export const QUERIES = {
  mobileAndDown: '(max-width: 600px)',
  tabletAndDown: '(max-width: 950px)',
  laptopAndDown: '(max-width: 1300px)',
  desktopAndUp: '(min-width: 1301px)',
};

```

---

## 3. Module A: The Fluid Typography System

*Hệ thống chữ cái phải đảm bảo tính đọc (Readability) và tính thẩm mỹ (Aesthetics) trên 6 lớp khung xương sống.*

### 3.1. Font Family Selection

Để đạt được vẻ đẹp "Whimsical" nhưng vẫn "Technical" của Josh:

* **Primary Font (UI/Body):** Cần một Sans-serif hiện đại, có `x-height` cao và hỗ trợ `Variable Weight`.
* *Recommendation:* **"Inter"** hoặc **"Satoshi"**.
* *Fallback:* system-ui, -apple-system, Segoe UI.


* **Accent Font (Headings/Hero):** Cần một Font có tính cách mạnh.
* *Recommendation:* **"Newsreader"** (Serif) hoặc **"JetBrains Mono"** (cho Code snippet).



### 3.2. The Modular Scale (Thang tỉ lệ chữ)

Không chọn size ngẫu nhiên. Sử dụng tỉ lệ **Major Third (1.250)** cho Desktop và **Minor Third (1.200)** cho Mobile.

**Triển khai Design Tokens (CSS Variables):**

```css
:root {
  /* Cơ sở: 1rem = 16px */
  
  /* Caption / Label nhỏ */
  --font-xs: clamp(0.75rem, 0.70rem + 0.25vw, 0.875rem);
  
  /* Body Text - Chuẩn đọc */
  --font-sm: clamp(0.9375rem, 0.91rem + 0.14vw, 1rem); /* 15px -> 16px */
  --font-md: clamp(1.125rem, 1.08rem + 0.22vw, 1.25rem); /* 18px -> 20px */
  
  /* Headings - Tăng trưởng mạnh */
  --font-lg: clamp(1.35rem, 1.28rem + 0.35vw, 1.5rem);   /* H3 */
  --font-xl: clamp(1.75rem, 1.60rem + 0.75vw, 2.25rem);   /* H2 */
  --font-2xl: clamp(2.5rem, 2.1rem + 2.0vw, 3.5rem);      /* H1 / Hero */
  --font-3xl: clamp(3rem, 2.5rem + 3.5vw, 4.5rem);        /* Display Text */
}

```

### 3.3. Typography Rules cho 6 Lớp Khung (MANDATORY)

1. **Dynamic Header:**
* Sử dụng `--font-sm` với `font-weight: 500`.
* Letter-spacing: `0.01em` (Tăng nhẹ độ thoáng cho chữ nhỏ).


2. **Hero Section:**
* Tiêu đề chính bắt buộc dùng `--font-3xl`.
* Line-height: `1.1` (Chữ to cần dòng khít).
* Letter-spacing: `-0.02em` (Chữ to cần kerning chặt hơn).


3. **Bento Grid Cards:**
* Title Card: `--font-lg` (Bold).
* Description: `--font-sm` (Regular).
* Date/Tags: `--font-xs` (Uppercase, tracking-wide).


4. **Sidebars:**
* Chỉ sử dụng `--font-xs` hoặc `--font-sm`. Không được lấn át nội dung chính.


5. **Newsletter/CTA:**
* Input text: `--font-md` (Để người dùng dễ nhập liệu, tránh zoom trên iOS).
* Button text: `--font-sm` (Bold, Uppercase).


6. **Footer:**
* Copyright/Legal: `--font-xs` (Color contrast thấp).



---

## 4. Module B: The Fluid Spacing System

*Khoảng trắng là yếu tố định hình sự sang trọng. Chúng ta sử dụng hệ thống Spacing ngữ nghĩa.*

### 4.1. The Spacing Scale

Agent phải định nghĩa các biến sau trong `:root`:

```css
:root {
  /* Vi chỉnh nhỏ (Icon gaps) */
  --space-2xs: clamp(4px, 2px + 0.5vw, 8px);
  --space-xs:  clamp(8px, 6px + 0.5vw, 12px);
  
  /* Layout gaps (Bento Grid gaps) */
  --space-sm:  clamp(12px, 10px + 1vw, 24px);
  --space-md:  clamp(16px, 12px + 2vw, 32px);
  
  /* Section gaps (Padding các vùng lớn) */
  --space-lg:  clamp(24px, 20px + 3vw, 48px);
  --space-xl:  clamp(32px, 24px + 5vw, 64px);
  
  /* Macro Layout (Khoảng cách giữa các Section lớn) */
  --space-2xl: clamp(64px, 48px + 8vw, 128px);
  --space-3xl: clamp(96px, 64px + 10vw, 192px);
}

```

### 4.2. Spacing Rules cho 6 Lớp Khung (MANDATORY)

1. **Dynamic Header:**
* Height: Cố định theo biến `--header-height` (khoảng `60px` -> `80px`).
* Padding X: `--space-md` (Mobile) -> `--space-xl` (Desktop).


2. **Hero Section:**
* Padding Top: `--space-3xl` (Tạo khoảng thở lớn đầu trang).
* Padding Bottom: `--space-2xl`.
* Gap giữa Text và Image: `--space-xl`.


3. **Bento Grid:**
* Grid Gap: `--space-md` (Để các ô trông liền mạch nhưng không dính chùm).
* Padding trong Card: `--space-md` hoặc `--space-lg` tùy kích thước ô.


4. **Interactive Sidebars:**
* Margin Left/Right: `--space-auto` (Căn giữa nội dung chính).
* Gutter Width: `--space-xl`.


5. **Newsletter:**
* Padding Internal: `--space-2xl` (Tạo sự tập trung).


6. **Footer:**
* Margin Top: `--space-3xl` (Tách biệt hoàn toàn với nội dung trên).



---

## 5. Module C: Layout Wrapper Strategy

*Để đảm bảo nội dung không bao giờ bị "bể" trên màn hình siêu rộng (4K).*

Agent phải tạo 2 Wrapper Components cốt lõi:

### 5.1. `<MaxWidthWrapper>`

Dùng để giới hạn độ rộng nội dung chính.

```tsx
// Styled-component Logic
const Wrapper = styled.div`
  max-width: 1100px; /* Chuẩn đọc của Josh */
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-md);
  padding-right: var(--space-md);
  
  /* Trên màn hình cực lớn, tăng padding để nội dung không bị loãng */
  @media (min-width: 1400px) {
    max-width: 1250px;
  }
`;

```

### 5.2. `<FullBleedWrapper>`

Dùng cho **Newsletter** hoặc **Footer background**.

* Logic: Thoát khỏi `MaxWithWrapper` để tràn viền màn hình (`width: 100vw`), nhưng nội dung bên trong vẫn căn giữa.

---

## 6. Implementation Checklist (Agent to-do)

Trước khi chuyển sang Phase 2 (Colors & Shadows), Agent phải hoàn thành các file sau:

1. [ ] **`src/styles/GlobalStyles.ts`**:
* Chứa toàn bộ CSS Variables (`--font-*`, `--space-*`) định nghĩa ở trên.
* Reset CSS (Sử dụng *Josh's Custom CSS Reset* - Agent hãy tự tìm kiếm hoặc yêu cầu cung cấp).


2. [ ] **`src/app/layout.tsx`**:
* Load font (Inter & Newsreader) từ `next/font/google`.
* Inject `GlobalStyles` vào body.


3. [ ] **`src/components/Typography.tsx`**:
* Tạo các components nguyên tử: `<Heading>`, `<Text>`, `<Label>`.
* Các component này nhận props `size`, `weight` và map vào biến CSS tương ứng.


4. [ ] **`src/components/Spacer.tsx`**:
* Component tạo khoảng trắng tàng hình: `<Spacer axis="vertical" size="lg" />`.



---

## 7. Quality Assurance (Tiêu chuẩn nghiệm thu)

Agent tự kiểm tra kết quả dựa trên các tiêu chí:

* **Fluidity Test:** Khi co kéo trình duyệt từ 320px đến 1920px, Font size và Spacing có thay đổi mượt mà không? Hay bị giật cục (jump)? -> *Yêu cầu: Mượt hoàn toàn.*
* **Accessibility Test:** Font size nhỏ nhất (`--font-xs`) có đạt chuẩn tối thiểu 12px-14px không? Line-height có đủ thoáng (1.5 cho body text) không?
* **Layer Compliance:** Các biến số có được áp dụng đúng cho 6 Layout xương sống không? (Ví dụ: Header không được dùng font to như Hero).

---

**End of Plan.**
*Agent, hãy bắt đầu thực thi Module A và B ngay lập tức. Báo cáo lại khi đã thiết lập xong Global Variables.*