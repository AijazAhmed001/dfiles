# EFU AI Assistant Frontend

A clean, modular React + TypeScript frontend for a private multilingual EFU data assistant.

## Run

```bash
npm install
npm run dev
```

## Main architecture

- `src/app`: application bootstrapping, providers and routes
- `src/layouts`: page composition
- `src/pages`: route-level screens
- `src/components`: reusable feature and UI components
- `src/hooks`: reusable stateful behavior
- `src/services`: API and business-service boundaries
- `src/context`: shared application state
- `src/types`: TypeScript contracts
- `src/utils`: pure helper functions
- `src/styles`: global design system

Set `VITE_API_BASE_URL` when connecting the real ASP.NET Core backend.
