---
trigger: always_on
---

# WORKFLOW PROTOCOLS

## 1. 🧪 Testing Requirements (NON-NEGOTIABLE)

### Iron Law of TDD
**NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST.**

### Visual Verification (Artisan Gate)
**Before checking off a task:**
1.  **Fluidity Check**: Resize trình duyệt từ 320px -> 1920px. Layout có vỡ không? Font chữ có scale mượt không?
2.  **Theme Check**: Toggle Dark/Light mode liên tục. Có bị chớp trắng không? Màu sắc có đảo đúng logic semantic không?
3.  **Physics Check**: Hover vào Button/Card. Có hiệu ứng bay lên/bóng đổ không?

## 2. 📝 Git Standards

### Commit Messages
Format: `type: description`
- `feat`: New feature (e.g., `feat: Add Guestbook bento card`)
- `style`: Visual changes (e.g., `style: Adjust fluid typography clamp`)
- `fix`: Bug fix
- `refactor`: Code change, no behavior change

### Pull Requests / Review
- **UI Integrity**: Đã so sánh với `LAYOUT.md` chưa?
- **Responsiveness**: Đã test trên Mobile chưa?

## 3. 🚀 Deployment Checklist

### Pre-Production
1.  **Visual Regression**: Đảm bảo phiên bản build không bị mất CSS/Style (FOUC).
2.  **Middleware**: Enable Auth checks.
3.  **Secrets**: Rotate `NEXTAUTH_SECRET`. Set Prod `DATABASE_URL`.
4.  **Build**: `npm run build` must pass.

### Database
1.  `npx prisma migrate deploy`
2.  `npm run db:seed` (if needed)
