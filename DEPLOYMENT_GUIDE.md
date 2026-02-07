# 🚀 Deployment Guide: Vintechco Hub (Part 2: Vercel)

Bạn đã đẩy code lên GitHub thành công. Bây giờ là bước cuối cùng: **Deploy lên Vercel**.

## ▲ Phần 3: Deploy lên Vercel

**Bước 3.1: Import Project**
1. Vào [Vercel Dashboard](https://vercel.com/dashboard).
2. Bấm **Add New...** -> **Project**.
3. Chọn **Import** cạnh repo `vintechco-hub` (hoặc tên repo bạn vừa tạo).

**Bước 3.2: Cấu hình Build (Quan trọng)**
* **Framework Preset:** Next.js (Vercel tự nhận).
* **Root Directory:** `./` (Mặc định).
* **Build Command:** `velite build && next build` (hoặc `npm run build` nếu package.json đã config đúng).
* **Output Directory:** `.next` (Mặc định).
* **Install Command:** `npm install` (Mặc định).

**Bước 3.3: Environment Variables (BẮT BUỘC)**
Bấm mở rộng phần **Environment Variables**. Bạn có thể điền ngay hoặc **để trống và điền sau** (nhưng lần deploy đầu tiên sẽ bị lỗi -> Cần Redeploy).

**Cấu hình cho Neon Database (Postgres):**

| Variable Name     | Value (Lấy từ Neon Dashboard)                                            |
| :---------------- | :----------------------------------------------------------------------- |
| `DATABASE_URL`    | `postgres://...` (Pooled Connection String - Chọn **Pooled** trong Neon) |
| `DIRECT_URL`      | `postgres://...` (Direct Connection String - Chọn **Direct** trong Neon) |
| `NEXTAUTH_SECRET` | `(Tự nghĩ ra một chuỗi ngẫu nhiên dài)`                                  |
| `NEXTAUTH_URL`    | `https://vintechco-hub.vercel.app`                                       |
| `GITHUB_ID`       | ...                                                                      |
| `GITHUB_SECRET`   | ...                                                                      |

> **Lưu ý:** Nếu bạn dùng Neon, hãy vào Dashboard của Neon -> **Project Settings** -> Lấy `Connection String`. Neon hỗ trợ tốt Prisma nên bạn cứ điền vào là chạy.

**Bước 3.4: Deploy**

| Variable Name     | Value (Ví dụ / Lấy ở đâu)                                                                                              |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`    | `postgres://...` (Lấy từ Supabase -> Project Settings -> Database -> Connection String -> URI -> **Transaction Mode**) |
| `DIRECT_URL`      | `postgres://...` (Lấy từ Supabase -> ... -> **Session Mode**)                                                          |
| `NEXTAUTH_SECRET` | `(Tự nghĩ ra một chuỗi ngẫu nhiên dài, VD: a1b2c3d4...)`                                                               |
| `NEXTAUTH_URL`    | `https://vintechco-hub.vercel.app` (Điền tạm domain dự kiến, sau khi deploy xong sửa lại nếu khác)                     |
| `GITHUB_ID`       | `(Lấy từ GitHub Developer Settings -> OAuth Apps)`                                                                     |
| `GITHUB_SECRET`   | `(Lấy từ GitHub Developer Settings -> OAuth Apps)`                                                                     |

**Bước 3.4: Deploy**
* Bấm **Deploy**.
* Chờ khoảng 1-2 phút. Vercel sẽ chạy:
    1.  Install Dependencies.
    2.  Build Velite Content & Next.js.
    3.  Assign Domains.

---

## ✅ Phần 4: Hậu kỳ (Sau khi Deploy thành công)

1. **Update `NEXTAUTH_URL`**:
    * Vào Vercel Settings -> Environment Variables.
    * Sửa `NEXTAUTH_URL` thành domain thật Vercel cấp cho bạn (VD: `https://your-project.vercel.app`).
    * Redeploy (Vercel -> Deployments -> Redeploy) để ăn biến mới.

2. **Setup Homepage (GitHub OAuth)**:
    * Vào lại GitHub OAuth App settings.
    * Sửa **Homepage URL** thành domain mới (VD: `https://your-project.vercel.app`).
    * Sửa **Authorization callback URL** thành: `https://your-project.vercel.app/api/auth/callback/github`.

Chúc mừng! Website của bạn đã online 🚀
