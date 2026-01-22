---
description: "Apply when handling environment files, user input, or security-sensitive code. .env file protection (never edit without approval), input validation with Zod schemas, error handling, and no hardcoded secrets or credentials."
alwaysApply: false
---

# Security Rules

## Environment Files

### Critical Rule
**Never edit `.env*` files without explicit user approval.**

- `.env` files contain sensitive configuration
- Always ask before modifying environment variables
- Never commit `.env` files to version control

## Input Validation

For any forms or user input:

- Use Zod schemas for validation
- Validate on both client and server (when applicable)
- Sanitize user input before display

```tsx
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(50),
});
```

## Error Handling

- Wrap async operations in try-catch
- Display user-friendly error messages
- Never expose internal error details to users
- Log errors appropriately for debugging

```tsx
try {
  // operation
} catch (error) {
  console.error("Operation failed:", error);
  // Show user-friendly message
}
```

## No Hardcoded Secrets

- Never hardcode API keys, tokens, or credentials
- Use environment variables for sensitive data
- Keep secrets out of client-side code

## Dependencies

- Use latest stable versions when adding dependencies
- Be cautious with new/unknown packages
- Prefer well-maintained packages with active communities

## Design Mode Note

While in prototype/Design Mode:
- Security is still important for code quality
- These patterns ensure production-ready handoff
- Even static prototypes should follow secure coding practices
