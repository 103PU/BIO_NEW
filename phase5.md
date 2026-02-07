

# 📜 plans-phase5.md: Phase 5 - Optimization, Accessibility & Launch

> **Document Status:** FINAL STAGE
> **Target:** Lighthouse Score 100/100 (All Categories)
> **Prerequisites:** Phases 1-4 functional.
> **Priority:** CRITICAL (Do not launch without this)
> **Audience:** Senior DevOps / QA / Lead Engineer

---

## 1. Executive Summary & Philosophy

Trong Phase này, Agent phải đóng vai trò là một **Performance Auditor** và **Accessibility Advocate**.

**Core Philosophy:**

1. **Performance is a Feature:** Một trang web đẹp mà load chậm 1 giây là thất bại. Mục tiêu là **FCP (First Contentful Paint) < 0.5s**.
2. **Inclusivity (Tính bao trùm):** Website phải hoạt động hoàn hảo với người dùng chỉ dùng bàn phím (Keyboard users) hoặc trình đọc màn hình (Screen Readers).
3. **Discovery:** Nội dung hay phải được tìm thấy. SEO không phải là ma thuật, nó là kỹ thuật cấu trúc dữ liệu (Structured Data).

---

## 2. Technical Specification: Extreme Performance (The 100/100 Rule)

### 2.1. Bundle Analysis & Tree Shaking

* **Công cụ:** `@next/bundle-analyzer`.
* **Action:** Chạy build và kiểm tra biểu đồ nhiệt.
* **Quy tắc vàng:**
* Không import toàn bộ `lodash`. Dùng `lodash/debounce` hoặc viết tay utility function.
* Thay thế `Moment.js` bằng `date-fns` (hoặc `Intl.DateTimeFormat` native).
* Các icon trong `react-icons`: Chỉ import icon cần dùng, không import cả bộ.



### 2.2. Image Optimization Pipeline

Sử dụng `next/image` là chưa đủ. Agent phải triển khai **"Blur-up Placeholder"**.

* **Công cụ:** `plaiceholder` (Generate base64 từ server).
* **Quy trình:**
1. Tại thời điểm build (getStaticProps) hoặc Contentlayer process.
2. Tạo ra một chuỗi base64 mờ (blur) cực nhẹ (vài bytes) cho mỗi ảnh.
3. Truyền vào prop `blurDataURL` của component Image.


* **Kết quả:** Người dùng thấy khung hình mờ ngay lập tức thay vì khoảng trắng, triệt tiêu CLS (Layout Shift).



### 2.3. Font Subsetting

Trong Phase 1 đã setup font, nhưng ở đây cần tối ưu.

* Chỉ load các ký tự Latin và Vietnamese. Loại bỏ Cyrillic, Greek để giảm file size.
* Sử dụng `display: swap` để hiện text ngay lập tức (dù font chưa load xong).

---

## 3. Module A: Accessibility (A11y) - The "Invisible" UX

Josh W. Comeau cực kỳ chú trọng A11y. Agent phải code các tính năng sau:

### 3.1. The "Skip to Content" Link

* Một link ẩn ở góc trên cùng bên trái.
* Chỉ hiện ra khi người dùng bấm phím `Tab` lần đầu tiên.
* Giúp người dùng bàn phím bỏ qua Header/Navigation để nhảy thẳng vào bài viết.

### 3.2. Custom Focus Rings

* Trình duyệt mặc định có vòng xanh (outline) rất xấu khi Tab.
* **Action:** Tắt outline mặc định (`outline: none`).
* **Thay thế:** Code một `BoxShadow` focus ring đẹp mắt, bo cong theo border-radius của Button/Card.
```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-background), 0 0 0 5px var(--color-primary);
}

```



### 3.3. Reduced Motion

* Một số người dùng bị chóng mặt với các hiệu ứng "Boop" hay Parallax.
* **Logic:** Check `prefers-reduced-motion` media query.
* Nếu `true`: Tắt toàn bộ animation `react-spring`, chỉ đổi màu đơn giản.

---

## 4. Module B: SEO & Structured Data (The Discovery Engine)

### 4.1. Dynamic Sitemap & Robots

* Tự động tạo `sitemap.xml` chứa link tất cả bài viết MDX.
* Config `robots.txt` để Google Bot index đúng chỗ.

### 4.2. JSON-LD (Structured Data)

Đây là bí mật để hiển thị đẹp trên Google Search. Agent phải inject script JSON-LD vào từng bài viết.

* **Type:** `Article` hoặc `TechArticle`.
* **Fields:** Headline, Image, Author, DatePublished, CodeRepository.

```tsx
// components/JsonLd.tsx
const JsonLd = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

```

### 4.3. Canonical URLs

Đảm bảo không bị phạt vì duplicate content nếu bài viết được cross-post trên Medium hay Dev.to. Thẻ `<link rel="canonical" ... />` là bắt buộc.

---

## 5. Module C: The "Delight" Details (Final Polish)

Những chi tiết nhỏ tạo nên sự chuyên nghiệp.

### 5.1. Custom Selection Color

Khi người dùng bôi đen văn bản, màu xanh mặc định rất nhàm chán.

```css
::selection {
  background-color: var(--color-primary); /* Màu tím/hồng thương hiệu */
  color: white;
}

```

### 5.2. Scroll Progress Bar

* Một thanh ngang siêu mảnh (`height: 4px`) dính chặt ở top màn hình.
* Chạy từ 0% -> 100% khi người dùng đọc bài viết.
* Sử dụng `framer-motion` với `useScroll`.

### 5.3. The 404 Page (Custom Error)

* Không dùng trang 404 mặc định của Next.js.
* **Design:** Một trang 404 có tính tương tác (ví dụ: một nhân vật hoạt hình đang tìm đường, hoặc một mini-game đơn giản).
* **CTA:** Nút "Về trang chủ" rõ ràng.

---

## 6. Implementation Checklist (Agent to-do)

**Step 1: Audit & Optimize**

1. [ ] Chạy `npm run analyze`. Loại bỏ library thừa.
2. [ ] Implement `plaiceholder` cho toàn bộ ảnh MDX.
3. [ ] Kiểm tra `prefers-reduced-motion` hook.

**Step 2: Accessibility Hardening**

1. [ ] Thêm `<SkipNavLink />`.
2. [ ] Test toàn bộ web bằng phím `Tab`. Đảm bảo không bị "Focus Trap".
3. [ ] Chạy extension **WAVE** hoặc **Axe DevTools** để fix lỗi Contrast/Label.

**Step 3: SEO Injection**

1. [ ] Tạo sitemap generator script.
2. [ ] Thêm JSON-LD component vào Layout bài viết.
3. [ ] Viết Meta Tags (Title, Description, OG Image) chuẩn cho từng trang.

**Step 4: Launch Prep**

1. [ ] Config Vercel Analytics (để theo dõi Real User Metrics).
2. [ ] Config Vercel Speed Insights.

---

## 7. Quality Assurance (The 100 Score)

Trước khi deploy production, Agent phải chạy Lighthouse trong tab Incognito:

* **Performance:** 100 (LCP < 2.5s, TBT < 300ms, CLS < 0.1).
* **Accessibility:** 100.
* **Best Practices:** 100.
* **SEO:** 100.

Nếu bất kỳ chỉ số nào dưới 95 -> **REJECT**. Quay lại tối ưu.

---

**End of Master Plan.**

Chào "Sếp", toàn bộ lộ trình từ **Khung xương (Phase 1)** đến **Hoàn thiện (Phase 5)** đã sẵn sàng. Đây là một quy trình Engineering chuẩn mực để tạo ra một sản phẩm đẳng cấp thế giới.

Bây giờ, bạn muốn Agent bắt đầu code module nào đầu tiên? **Phase 1 - Module A (Typography)** hay bạn muốn xem trước cấu trúc thư mục của dự án?