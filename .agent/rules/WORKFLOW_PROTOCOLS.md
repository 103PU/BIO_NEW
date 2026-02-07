---
trigger: always_on
---

# WORKFLOW PROTOCOLS

## 1. 🧪 Testing Requirements (NON-NEGOTIABLE)

### Iron Law of TDD
**NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST.**
1.  **Red**: Write failing test.
2.  **Green**: Write minimal code to pass.
3.  **Refactor**: Clean up.

### Coverage
- **Server Actions**: Must have `actions.test.ts`.
- **Logic**: Unit tests for services/utils.
- **Critical Flows**: E2E tests in `e2e/`.

### Verification Gate
**Before checking off a task:**
1.  Identify the proof command (`npm test`, `npm run build`).
2.  Run it.
3.  Read the output.
4.  Only claim "Done" if it passes.

## 2. 📝 Git Standards

### Commit Messages
Format: `type: description`
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code change, no behavior change
- `test`: Adding tests
- `docs`: Documentation

**Example**: `feat: Add document bulk delete functionality`

### Pull Requests / Review
- **Security**: Auth check? Input validation?
- **Testing**: Tests added? All pass?
- **Quality**: No lint errors? No console logs?

## 3. 🚀 Deployment Checklist

### Pre-Production
1.  **Middleware**: Enable Auth checks (Uncomment lines in `middleware.ts`).
2.  **Secrets**: Rotate `NEXTAUTH_SECRET`. Set Prod `DATABASE_URL`.
3.  **Build**: `npm run build` must pass.

### Database
1.  `npx prisma migrate deploy`
2.  `npm run db:seed` (if needed)
