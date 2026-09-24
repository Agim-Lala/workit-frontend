# Workit Frontend

This app follows a feature-based React architecture inspired by Bulletproof React.

## Stack

- React + TypeScript on Vite
- React Router for routing
- TanStack Query for API and server state
- Axios for HTTP
- React Hook Form and Zod for forms and validation
- Tailwind CSS with shadcn/ui-style local components
- Zustand for small temporary UI state

## Structure

```text
src/
├── app/
├── assets/
├── components/
├── config/
├── features/
├── hooks/
├── lib/
├── services/
├── types/
└── utils/
```

Feature modules own their API calls, hooks, schemas, types, pages, and feature-specific components. Shared code flows from `components`, `lib`, `types`, and `utils` into features and then into `app`.

## Rules

- Use `@/` imports for source files.
- Keep API data in TanStack Query.
- Use Zustand only for local UI state such as filters or temporary drafts.
- Do not import one feature from another feature.
- Store date values as ISO 8601 strings with timezone offsets.
- Treat client-side permission checks as UX only; backend authorization remains required.
- Do not create test files.
