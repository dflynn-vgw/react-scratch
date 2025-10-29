# React + TypeScript + Vite

A modern React project setup with TypeScript, Vite, Vitest, Tailwind CSS, ESLint, and Prettier.

## Tech Stack

- **React 19** + **TypeScript** - Modern React with type safety
- **Vite** - Fast build tool and dev server
- **Vitest** - Unit testing framework (Vite-native)
- **React Testing Library** - Component testing utilities
- **Tailwind CSS v4** - Utility-first CSS framework
- **ESLint** + **Prettier** - Code quality and formatting

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Build for production
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

## Project Structure

```
src/
  ├── App.tsx                   # Main app component with auth flow routing
  ├── App.test.tsx              # Comprehensive authentication flow tests
  ├── context/
  │   └── AuthContext.tsx       # Authentication context & localStorage management
  ├── pages/
  │   ├── SignUp.tsx            # Sign-up page with email & social auth options
  │   ├── SignIn.tsx            # Sign-in page
  │   ├── EmailVerification.tsx # Email verification simulation page
  │   ├── TermsAndConditions.tsx# Terms acceptance for first-time sign-in
  │   └── Welcome.tsx           # Welcome/dashboard page
  ├── setupTests.ts             # Test setup (jest-dom)
  └── index.css                 # Tailwind imports
```

## Authentication Flow

This app includes a **simulated authentication flow** with no backend required. All data is persisted in `localStorage` for demonstration purposes.

### Features

- **Multiple Sign-Up Options**
  - Email & Password with validation
  - Social authentication (Facebook, Google, Apple) - simulated
  
- **Email Verification**
  - Email sign-ups require verification before sign-in
  - Simulated verification process with animated UI

- **Sign-In Flow**
  - Validates credentials against stored users
  - Error handling for non-existent users and incorrect passwords
  - Prevents sign-in with unverified email

- **First-Time User Experience**
  - Terms & Conditions acceptance required on first sign-in
  - Scrollable terms content with checkbox agreement

- **User Session Management**
  - Welcome page with user profile display
  - Sign-out functionality
  - Session persistence across page refreshes

- **Password Visibility Toggle**
  - Show/hide password with eye icon (●/○)
  - Available on all password fields

- **Retro Terminal Aesthetic**
  - Black background with yellow/white text
  - ASCII art borders and decorations
  - Monospace font styling

### Flow Steps

1. **Sign Up** → Choose email/password or social provider
2. **Email Verification** → Simulate verification (email sign-ups only)
3. **Sign In** → Authenticate with credentials
4. **Accept Terms** → First-time sign-in requires accepting T&Cs
5. **Welcome** → Access authenticated area with user info

### Testing

The authentication flow includes **21 comprehensive tests** covering:
- Sign-up validation and success flows
- Email verification simulation
- Sign-in with error handling
- Terms & conditions acceptance
- Welcome page display and sign-out
- Complete end-to-end authentication journey

Run tests with:
```bash
npm test
```

### localStorage Keys

The app uses the following localStorage keys:
- `auth_users` - Stores all registered users and their hashed passwords
- `auth_current_user` - Current authenticated user session
- `auth_pending_verification` - Email addresses awaiting verification

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
