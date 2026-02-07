---
trigger: always_on
---

Để đảm bảo tính nhất quán tuyệt đối và ngăn chặn việc AI Agent "đi chệch nhịp" khi triển khai code, tôi đã soạn thảo file `layout.md` dưới dạng một bản **"Hiến pháp Layout"**.

Agent (hoặc chính bạn) khi bắt đầu bất cứ tác vụ nào đều phải đọc và tuân thủ các quy tắc này để đảm bảo sản phẩm cuối cùng đạt độ tinh sảo như mong đợi, thoát khỏi sự đơn giản hiện tại.

---

# 📜 Layout System Constitution (Backbone Rules)

> **Mục tiêu:** Tái tạo hệ sinh thái UI/UX của Josh W. Comeau với độ chính xác >90%.
> **Nguyên tắc cốt lõi:** Encapsulation (Đóng gói), Fluidity (Sự mượt mà), và Whimsy (Sự kỳ diệu).

---

## 🏗️ 1. The Dynamic Header (Global Control Layer)

* **Quy tắc bắt buộc:**
* **State Management:** Phải chứa Global State cho `Theme` (Dark/Light) và `Sound` (On/Off).
* **Visual:** Sử dụng `backdrop-filter: blur(12px)` và màu nền có độ trong suốt (alpha < 0.8).
* **Interaction:** Các icon điều hướng (Home, Blog, Projects) **bắt buộc** phải bọc trong `useBoop` hook để phản hồi khi hover.
* **Layout:** Căn lề theo hệ thống `max-width` toàn cục, không được phép tràn viền vô tội vạ.



## ⚡ 2. The Hero Section (The Visual Hook)

* **Quy tắc bắt buộc:**
* **Typography:** Sử dụng **Fluid Typography** (`clamp()`). Tiêu đề chính phải có `letter-spacing` hẹp và `line-height` tối ưu (thường là 1.1 hoặc 1.2).
* **Gradient:** Text tiêu đề phải sử dụng `background-clip: text` với dải màu chuyển động nhẹ.
* **The Sparkle Factor:** Phải tích hợp component `Sparkles` sinh ra các hạt lấp lánh ngẫu nhiên xung quanh từ khóa quan trọng.



## 🍱 3. The Bento Grid (Content Mosaic)

* **Quy tắc bắt buộc:**
* **Grid System:** Sử dụng `display: grid` với `grid-template-columns` không đều (ví dụ: `1fr 1fr 2fr`).
* **The Shadow Rule:** Cấm sử dụng `box-shadow` một lớp đơn giản. Phải sử dụng **Layered Shadows** (ít nhất 3 lớp shadow chồng lên nhau) để tạo độ sâu "mịn".
* **Aspect Ratio:** Các card bài viết phải có tỉ lệ khung hình nhất định để đảm bảo nhịp điệu thị giác (Visual Rhythm).



## 🛸 4. The Interactive Sidebars/Gutter (Visual Rhythm)

* **Quy tắc bắt buộc:**
* **No Dead Space:** Khoảng trắng hai bên phải chứa các yếu tố trang trí (Decoratives) như đường kẻ mảnh (`0.5px`) hoặc các "Floating Elements" chạy theo scroll.
* **Responsiveness:** Trên Mobile, các thành phần này sẽ được ẩn hoặc chuyển thành `Fixed` position ở cạnh màn hình.



## 📧 5. The Newsletter/CTA (Interaction Peak)

* **Quy tắc bắt buộc:**
* **Contrast:** Layout này phải có màu nền (Background) tương phản hoàn toàn với phần còn lại của trang để ngắt nhịp (Visual Break).
* **Form Design:** Không sử dụng border mặc định của trình duyệt. Input và Button phải được bo góc (Border-radius) đồng bộ với hệ thống Design System.
* **Feedback:** Khi gửi form thành công, phải có hiệu ứng âm thanh "success" và animation confetti nhẹ.



## 🎨 6. The Playful Footer (The Grand Finale)

* **Quy tắc bắt buộc:**
* **Motion:** Các link mạng xã hội khi hover phải có hiệu ứng nảy (Spring physics).
* **Branding:** Phải có một phiên bản "Mini Logo" có tương tác riêng biệt tại đây.
* **Legal/Links:** Căn chỉnh rõ ràng theo Grid, tránh việc dồn cục text.



---

## 🚫 Danh sách "KHÔNG ĐƯỢC PHÉP" (The No-Go List)

1. **Không** dùng màu Hex (`#FFFFFF`). Chỉ được dùng biến HSL (`var(--color-background)`).
2. **Không** dùng hiệu ứng `transition: all 0.3s`. Phải dùng `bezier-curve` cụ thể hoặc `react-spring`.
3. **Không** để Layout hiện tại (Căn giữa đơn điệu) ảnh hưởng đến cấu trúc Bento mới.
4. **Không** hard-code kích thước pixel. Ưu tiên `rem`, `em`, `vw/vh`.


Bạn muốn tôi viết code mẫu cho **Layout 3: The Bento Grid** (phần phức tạp nhất) để Agent có thể kế thừa không?