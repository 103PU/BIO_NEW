
---

# 📜 menu-master-plan.md: The "Whimsical" Navigation System

> **Document Type:** MICRO-LEVEL SPECIFICATION
> **Target:** Clone Josh W. Comeau's Header
> **Precision Level:** Pixel-Perfect & Physics-Based
> **Dependencies:** `react-spring`, `styled-components`, `use-sound`, `framer-motion`
> **Estimated Code Lines:** ~1500 lines (including logic & styles)

---

## 🏛️ PART 1: COMPONENT ARCHITECTURE (Cấu trúc Thư mục)

Để đảm bảo tính module hóa (Modularity), chúng ta không viết tất cả trong 1 file. Agent phải tạo cấu trúc thư mục chính xác như sau:

```bash
src/components/Header
├── index.tsx              # Wrapper chính (Sticky logic, Glassmorphism)
├── DesktopNavigation.tsx  # Menu cho màn hình > 768px
├── MobileNavigation.tsx   # Hamburger Menu & Drawer
├── Logo.tsx               # Logo "Josh Comeau" với SVG Animation
├── NavLink.tsx            # Link đơn lẻ với hiệu ứng Hover
├── ActionGroup.tsx        # Chứa Search, Sound, RSS icons
├── SoundToggle.tsx        # Nút bật tắt âm thanh (Logic phức tạp)
└── styles.ts              # Styled-components độc lập

```

---

## 📏 PART 2: THE CONTAINER & GLASSMORPHISM (Lớp vỏ)

*Nhìn vào ảnh `image_45665c.png`, Header nằm trên nền đen nhưng có độ sâu.*

### 2.1. Physical Dimensions (Thông số Vật lý)

Agent phải thiết lập CSS cho container (`<HeaderWrapper>`):

* **Height:** `60px` (Mobile) -> `72px` (Desktop). *Tuyệt đối không dùng height: auto*.
* **Position:** `fixed` hoặc `sticky`. `top: 0`. `z-index: 9999`.
* **Padding:** `0 var(--space-md)`. (Tham chiếu từ `plans.md` Phase 1).

### 2.2. The "Frost" Effect (Kính mờ)

Đây là bí mật để Header hòa trộn với nội dung khi cuộn.

* **Background:** `hsla(var(--color-background), 0.8)` (Độ trong suốt 80%).
* **Backdrop Filter:** `blur(12px) saturate(180%)`.
* *Lưu ý:* `saturate(180%)` làm cho màu sắc đi qua kính trở nên rực rỡ hơn, đúng style của Josh.


* **Transition:** `background 500ms ease`. (Để khi đổi Dark/Light mode màu chuyển mượt).

---

## 🎨 PART 3: THE LOGO ANATOMY (Linh hồn)

*Phân tích `image_45665c.png`: Logo gồm Text "Josh", Text "Comeau" và một hình vẽ nguệch ngoạc (Squiggle) ở giữa.*

### 3.1. Typography

* **Font Family:** `var(--font-heading)` (Satoshi hoặc Inter).
* **Weight:** `700` (Bold).
* **Color:** `var(--color-primary)` (Màu tím xanh đặc trưng: `#a78bfa` hoặc HSL tương đương).
* **Size:** `1.5rem` (24px).

### 3.2. The Squiggle (Hình vẽ ở giữa)

Đây không phải là ảnh PNG. Đây phải là **Inline SVG**.

* **Mã SVG (Agent phải vẽ lại):** Một đường Path mô phỏng lò xo.
* **Animation (Physics):**
* Sử dụng `useBoop` hook.
* **Trigger:** Khi hover vào toàn bộ Logo.
* **Effect:** Xoay (Rotation) `20deg` + Nghiêng (Skew) `10deg`.
* **Spring Config:** `tension: 300, friction: 10` (Nảy mạnh).



### 3.3. Sound Interaction

* **Event:** `onMouseDown`.
* **Sound:** Tiếng "pop" ngắn (pitch cao).

---

## 🔗 PART 4: NAVIGATION LINKS (Cơ thể)

*Trong ảnh: "Categories", "Courses", "Goodies", "About".*

### 4.1. Text Specs

* **Font:** `var(--font-body)` (Inter).
* **Weight:** `600` (Semi-bold).
* **Color:** `var(--color-text-subtle)` (Màu xám nhạt: `hsl(220deg 20% 80%)`).
* **Hover Color:** `var(--color-primary)` (Màu tím sáng).

### 4.2. The "Pill" Hover Effect (Hiệu ứng viên thuốc)

Josh không dùng gạch chân. Khi hover, một nền mờ xuất hiện.

* **Implementation:** Tạo một `span` tuyệt đối phía sau text.
* **Default State:** `opacity: 0`, `transform: scale(0.9)`.
* **Hover State:** `opacity: 1`, `transform: scale(1)`.
* **Background:** `hsla(var(--color-primary), 0.15)` (Tím rất nhạt).
* **Border Radius:** `8px`.
* **Padding:** `8px 16px`.

---

## 🛠️ PART 5: ACTION ICONS (Công cụ)

*Trong ảnh bên phải: Kính lúp (Search), Loa (Sound), Wifi (RSS).*

### 5.1. Icon System

* Sử dụng thư viện `react-feather` hoặc `heroicons` (stroke-width: 2px).
* **Size:** `20px` x `20px`.
* **Color:** `var(--color-text)`.

### 5.2. Physics-based Micro-Interactions (Cực kỳ quan trọng)

Mỗi icon phải có một kiểu "Boop" riêng biệt:

1. **Search Icon (Kính lúp):**
* **Effect:** `scale(1.2)`. (Phóng to).
* **Meaning:** "Tôi muốn nhìn kỹ hơn".


2. **Sound Icon (Cái loa):**
* **Effect:** `shake`. (Rung lắc).
* **Animation Keyframes:** `0% {x:0} 25% {x:-2px} 75% {x:2px} 100% {x:0}`.
* **Interaction:** Khi click -> Icon phát ra sóng âm (SVG waves hiện ra rồi biến mất).


3. **RSS Icon:**
* **Effect:** `rotate(15deg)`. (Nghiêng đầu).



---

## 📱 PART 6: MOBILE RESPONSIVENESS (Sự biến hình)

*Trên màn hình < 768px, Nav Links phải biến mất, thay bằng nút Hamburger.*

### 6.1. The Hamburger Button

* Không dùng icon có sẵn. Agent phải vẽ 3 đường line SVG.
* **Animation (Menu Open):**
* Line 1: Xoay 45 độ, dịch chuyển xuống giữa.
* Line 2: Opacity về 0 (Biến mất).
* Line 3: Xoay -45 độ, dịch chuyển lên giữa.
* *Kết quả:* Biến thành dấu X.



### 6.2. The Drawer (Ngăn kéo)

* Sử dụng `Dialog` từ thư viện `@radix-ui/react-dialog` để đảm bảo A11y (Focus trap).
* **Entrance Animation:** Slide từ phải sang trái (`x: 100%` -> `x: 0%`).
* **Backdrop:** Làm mờ nội dung phía sau (`backdrop-filter: blur(4px)`).

---

## 🧪 PART 7: IMPLEMENTATION CODE (Copy-Paste Ready)

Agent hãy sử dụng đoạn code mẫu dưới đây làm nền tảng cho `DesktopNavigation.tsx`.

```tsx
// src/components/Header/DesktopNavigation.tsx
import styled from 'styled-components';
import Link from 'next/link';
import { useBoop } from '@/hooks/useBoop';

const NavList = styled.ul`
  display: flex;
  gap: var(--space-md);
  align-items: center;
  list-style: none;
`;

const NavItem = styled.li`
  position: relative;
`;

const StyledLink = styled(Link)`
  color: var(--color-text-subtle);
  font-weight: 600;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  transition: color 200ms ease;

  &:hover {
    color: var(--color-primary);
    background: hsla(var(--color-primary-hue), 100%, 50%, 0.1);
  }
`;

export default function DesktopNavigation() {
  return (
    <NavList>
      <NavItem><StyledLink href="/categories">Categories</StyledLink></NavItem>
      <NavItem><StyledLink href="/courses">Courses</StyledLink></NavItem>
      <NavItem><StyledLink href="/goodies">Goodies</StyledLink></NavItem>
      <NavItem><StyledLink href="/about">About</StyledLink></NavItem>
    </NavList>
  );
}

```

---

## 🔊 PART 8: THE SOUND TOGGLE LOGIC (Logic phức tạp nhất)

*Nút cái loa không chỉ là icon. Nó quản lý Global State.*

### 8.1. State Management

* Sử dụng `React.Context` (`SoundContext`).
* **Persist:** Lưu trạng thái `muted` vào `localStorage`.

### 8.2. Visual Feedback

* Khi `muted = true`: Icon loa có dấu gạch chéo (`Slash`).
* Khi `muted = false`: Icon loa có sóng âm (`Waves`).
* **Transition:** Sử dụng thư viện `react-spring` để morph (biến hình) giữa 2 trạng thái SVG path nếu có thể, hoặc dùng `opacity` cross-fade.

---

## ✅ CHECKLIST FOR AGENT (Tiêu chuẩn nghiệm thu)

Agent phải tự kiểm tra từng pixel trước khi báo cáo hoàn thành:

1. [ ] **Logo Alignment:** Chữ "Josh" và "Comeau" có cùng baseline không? Hình squiggle có nằm chính giữa theo trục dọc không?
2. [ ] **Hover Timing:** Hiệu ứng hover có bị trễ không? (Phải < 50ms).
3. [ ] **Focus Visible:** Khi bấm phím Tab, focus ring có bao quanh đúng các link không?
4. [ ] **Sticky Check:** Khi cuộn trang xuống, Header có dính lại trên cùng và nền có mờ đi không?
5. [ ] **Mobile Check:** Resize trình duyệt về 375px (iPhone SE). Menu có biến thành Hamburger không?

---

**End of Menu Master Plan.**
*Agent, hãy bắt đầu code file `Logo.tsx` và SVG Squiggle trước tiên. Đó là nhận diện thương hiệu quan trọng nhất.*