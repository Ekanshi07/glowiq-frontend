# Ekanshi Beauty Store — Frontend

React + TypeScript + Vite frontend for the Ekanshi beauty e-commerce platform.

## Tech Stack
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **State**: React Context (Auth + Cart)
- **Data Fetching**: TanStack React Query
- **Animations**: Framer Motion

## Project Structure
```
src/
├── components/
│   ├── layout/       # Navbar, Footer, Layout wrapper
│   ├── ui/           # shadcn/ui primitives
│   └── ProductCard   # Reusable product card
├── context/
│   ├── AuthContext   # JWT auth state
│   └── CartContext   # Cart + wishlist state
├── hooks/
│   └── useApi        # React Query hooks for all API calls
├── lib/
│   └── api.ts        # Central fetch client (adds auth header)
├── pages/            # Route-level page components
└── types/
    └── index.ts      # Shared TypeScript types
```

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000/api

# 3. Make sure backend is running first (see backend README)

# 4. Start dev server
npm run dev
# App runs on http://localhost:5173
```

## Key Architectural Decisions

### Auth Flow
- JWT token stored in `localStorage`
- `AuthContext` restores session on mount via `/api/auth/me`
- `CartProvider` is nested inside `AuthProvider` so cart can read auth state
- 401 responses auto-clear token and redirect to `/auth`

### Cart Persistence
- Cart items persisted to `localStorage` (survives page refresh)
- Wishlist is server-side (synced via API when user is logged in)
- Recently viewed is also localStorage-persisted

### Data Fetching
- All API calls go through `src/lib/api.ts` — single place to add auth headers
- All queries are in `src/hooks/useApi.ts` — clean separation
- React Query handles caching, loading states, and stale-while-revalidate

### Type Safety
- `src/types/index.ts` mirrors backend Mongoose models
- All API responses typed via `ApiResponse<T>` generic
- No `any` usage in application code
