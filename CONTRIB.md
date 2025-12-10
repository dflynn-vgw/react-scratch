# Contributing

Thanks for your interest in contributing to this project! This guide will help you get started.

## Getting Started

1. **Fork and clone** the repository
2. **Install dependencies**: `npm install`
3. **Create a branch**: `git checkout -b feature/your-feature-name`
4. **Make your changes** and commit them
5. **Push to your fork** and open a pull request

## Development Workflow

```bash
# Start dev server (hot reload enabled)
npm run dev

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Type check
npx tsc --noEmit

# Lint your code
npm run lint

# Format code
npm run format
```

## Code Quality

### Pre-commit Hooks
This project uses **Husky** and **lint-staged** to automatically:
- Run ESLint on staged TypeScript files
- Format code with Prettier
- Prevent commits with linting errors

The hooks run automatically when you commit—no setup needed!

### Code Standards
- **TypeScript**: All code must be type-safe
- **Component files**: Use PascalCase (e.g., `MyComponent.tsx`)
- **Tests**: Write tests for new features using Vitest + React Testing Library
- **Formatting**: Prettier will auto-format on commit

## CI/CD Workflows

This project uses two GitHub Actions workflows:

### CI Workflow (`.github/workflows/ci.yml`)
**Triggers:** Push and pull requests to `main`/`master`

**Steps:**
1. ✅ ESLint - Checks code quality
2. ✅ TypeScript - Type checking (`tsc --noEmit`)
3. ✅ Tests - Runs all unit tests
4. ✅ Build - Ensures production build succeeds

**All checks must pass** before a PR can be merged.

### Deploy Workflow (`.github/workflows/deploy.yml`)
**Triggers:** 
- Automatically after CI workflow succeeds on `main`/`master`
- Manual trigger via GitHub Actions UI

**Steps:**
1. Waits for CI workflow to complete successfully
2. Builds the production app
3. Deploys to GitHub Pages

**Live URL:** `https://dflynn-vgw.github.io/react-scratch/`

**Important:** The deploy workflow only runs if CI passes. Broken code won't be deployed.

## Pull Request Guidelines

1. **Keep PRs focused** - One feature or fix per PR
2. **Write descriptive commits** - Explain what and why
3. **Update tests** - Add or update tests for your changes
4. **Ensure CI passes** - All checks must be green
5. **Keep it small** - Easier to review and merge

## Testing

Write tests for:
- New components
- New features or functionality
- Bug fixes (add a test that would have caught the bug)

Run tests before pushing:
```bash
npm test -- --run
```

## Questions?

Feel free to open an issue for discussion before starting work on major changes.
