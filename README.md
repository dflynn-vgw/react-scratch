# My React App: Simulating Authentication Flows for Email, Google, Facebook & Apple Providers

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

### Screenshots

#### Sign Up with Email
![Sign Up with Email](docs/screenshots/signup-email.svg)

#### Sign Up with Authentication Provider (Facebook, Google, Apple)
![Sign Up with Google](docs/screenshots/signup-google.svg)

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
