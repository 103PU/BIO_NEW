

# 📜 plans-phase4.md: Phase 4 - The Data Layer & Interactive Physics

> **Document Status:** APPROVED FOR IMPLEMENTATION
> **Target:** Josh W. Comeau Clone (High-Performance Personal Platform)
> **Prerequisites:** Phase 1, 2, 3 Completed.
> **Priority:** HIGH (Enables community & analytics features)
> **Audience:** Senior Full-stack Agent / Engineering Team

---

## 1. Executive Summary & Philosophy

Trong Phase này, Agent chuyển từ Frontend thuần túy sang **Serverless Backend**. Chúng ta không xây dựng server truyền thống. Chúng ta sử dụng **Edge Functions** và **Database-as-a-Service**.

**Core Philosophy:**

1. **Optimistic UI (Giao diện Lạc quan):** Khi người dùng bấm "Like" hoặc gửi Comment, UI phải cập nhật **NGAY LẬP TỨC** trước khi server trả lời. Không được hiện loading spinner cho các tác vụ nhỏ.
2. **Edge First:** API phải chạy ở Edge (gần người dùng nhất) để giảm độ trễ (Latency).
3. **Privacy Focused:** View Counter không được lưu IP người dùng. Sử dụng cơ chế Hashing để đếm lượt xem duy nhất (Unique Views) mà không vi phạm quyền riêng tư.

---

## 2. Technical Specification: The Serverless Stack

### 2.1. Database: Supabase (PostgreSQL)

* **Lý do:** Miễn phí, mạnh mẽ, hỗ trợ Real-time subscription (cho Guestbook).
* **Interface:** Sử dụng **Prisma ORM** để định nghĩa Schema (Type-safe tuyệt đối).

### 2.2. Authentication: NextAuth.js (v5) hoặc Supabase Auth

* **Provider:** Chỉ hỗ trợ **GitHub** và **Google**. Không làm form đăng ký/đăng nhập truyền thống (Username/Password) để tránh spam và rủi ro bảo mật.

### 2.3. Data Fetching: SWR / React Query

* **Lý do:** Để xử lý việc cache dữ liệu, revalidation và đặc biệt là **Optimistic Updates** (Cập nhật giao diện giả lập).

---

## 3. Module A: Database Schema Design (Prisma)

Agent phải tạo file `schema.prisma` với cấu trúc tối ưu sau:

```prisma
// schema.prisma

model View {
  slug  String @id // URL của bài viết (VD: 'hello-world')
  count BigInt @default(1)
}

model Guestbook {
  id         BigInt   @id @default(autoincrement())
  email      String   // Email người dùng (từ OAuth)
  body       String   // Nội dung comment
  createdBy  String   // Tên người dùng
  createdAt  DateTime @default(now())
  isApproved Boolean  @default(true) // Auto-approve, có thể tắt nếu bị spam
}

model Like {
  // Tùy chọn: Nếu muốn làm tính năng 'Thả tim' từng bài viết
  slug      String
  sessionId String // Hash của IP + UserAgent
  count     Int    @default(1)
  
  @@id([slug, sessionId])
}

```

---

## 4. Module B: The "Magic" View Counter (Analytics)

Tính năng đếm lượt xem bài viết, nhưng phải thông minh.

### 4.1. The API Route (Increment Logic)

* **Method:** `POST /api/views/[slug]`
* **Logic:**
1. Nhận request.
2. Hash IP người dùng (SHA-256) -> Tạo `sessionId`.
3. Kiểm tra trong Redis (hoặc DB): `sessionId` này đã xem `slug` này trong 24h qua chưa?
4. Nếu chưa -> DB: `UPDATE views SET count = count + 1 WHERE slug = ...`
5. Nếu rồi -> Bỏ qua (Debounce).



### 4.2. UI Component (Client Side)

* **Visual:** Số lượt xem không hiện ra "bụp" một cái. Nó phải chạy số (Counting Animation).
* **Tech:** Dùng `framer-motion` với `animate(0, viewCount)`.

---

## 5. Module C: The Interactive Guestbook (Community)

Đây là nơi áp dụng **Optimistic UI** triệt để nhất.

### 5.1. Authentication Flow

* Button "Sign in with GitHub" phải đẹp, có icon.
* Sau khi sign-in, chuyển hướng về trang Guestbook ngay lập tức.

### 5.2. Submission Logic (The Optimistic Pattern)

Quy trình Agent phải code:

1. User gõ: "Website đẹp quá!" -> Bấm Gửi.
2. **IMMEDIATELY (Client):**
* Tự tạo một object comment giả: `{ name: 'Me', body: 'Website đẹp quá!', id: Date.now() }`.
* Inject object này vào list comment đang hiển thị trên màn hình.
* Reset ô input về rỗng.
* Phát âm thanh "Success" (useSound).


3. **BACKGROUND (Server):**
* Gửi request `POST /api/guestbook`.
* Nếu thành công -> Revalidate data thật từ server (SWR `mutate`).
* Nếu lỗi -> Rollback (Xóa comment giả, hiện thông báo lỗi, điền lại text vào input).



---

## 6. Module D: Dynamic Open Graph (OG) Images

Khi chia sẻ link lên Facebook/Twitter, ảnh thumbnail phải được tạo tự động chứa Tiêu đề bài viết + Số view.

### 6.1. Tech Stack: `@vercel/og`

* Agent phải tạo route `src/app/og/route.tsx`.
* **Logic:**
* Sử dụng `ImageResponse` để vẽ HTML/CSS thành ảnh PNG.
* **Design:** Background gradient theo theme của web, Tiêu đề to ở giữa, Avatar tác giả ở góc.
* **Font:** Load font Inter/Satoshi vào trong ImageResponse để ảnh không bị lỗi font mặc định.



---

## 7. Implementation Checklist (Agent to-do)

**Step 1: Backend Setup**

1. [ ] Khởi tạo Project trên Supabase. Lấy API Keys.
2. [ ] Cài đặt Prisma (`npm i prisma @prisma/client`).
3. [ ] Push Schema lên DB (`npx prisma db push`).

**Step 2: API Development**

1. [ ] Viết Route `GET /api/views/[slug]` (Lấy số view).
2. [ ] Viết Route `POST /api/views/[slug]` (Tăng view - có logic chống spam).
3. [ ] Viết Route `POST /api/guestbook` (Yêu cầu Auth).

**Step 3: UI Integration (The Hard Part)**

1. [ ] Code component `<ViewCounter />`. Tích hợp vào Header bài viết.
2. [ ] Code component `<Guestbook />` với form nhập liệu có Validate (Zod).
3. [ ] Cài đặt `SWR` và viết hook `useGuestbook` xử lý Optimistic UI.

**Step 4: Social Polish**

1. [ ] Tạo `og-image.tsx` generator. Test thử trên localhost.

---

## 8. Quality Assurance (Performance Criteria)

Agent phải tự kiểm tra:

* **Latency:** API tăng view phải phản hồi dưới **200ms** (Nhờ Edge Runtime).
* **CLS (Cumulative Layout Shift):** Khi số View load xong, nó có đẩy nội dung khác nhảy xuống không?
* *Fix:* Phải có Skeleton Loading hoặc dành sẵn chỗ (min-height/min-width) cho con số đó.


* **Spam Protection:** Thử refresh trang liên tục 10 lần. Số view chỉ được tăng 1 lần.

---

**End of Phase 4 Plan.**
*Agent, hãy bắt đầu với việc kết nối Prisma và Supabase. Đây là trái tim dữ liệu của hệ thống.*