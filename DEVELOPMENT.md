# Development Workflow & Best Practices

This document outlines the development workflow, pre-commit checks, and best practices for maintaining code quality.

## 🚀 Pre-Commit System

We use a comprehensive pre-commit system to ensure code quality before any code is committed or pushed.

### What Runs on Commit

When you commit code, the following checks run automatically:

1. **Lint-staged**: Runs on staged files only
   - ESLint with auto-fix
   - Prettier formatting
   - Auto-adds fixed files

2. **TypeScript Type Checking**: Ensures no type errors
3. **ESLint**: Checks all files for linting issues
4. **Prettier Check**: Ensures consistent formatting
5. **Build Check**: Ensures the project builds successfully

### What Runs on Push

When you push code, additional checks run:

1. **Security Audit**: Checks for known vulnerabilities
2. **Final Build Check**: Ensures everything builds correctly
3. **Uncommitted Changes Warning**: Alerts about uncommitted changes

## 📝 Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Reverting previous commits

### Examples

```bash
feat: add wallet connection feature
fix(wallet): resolve persistence issue
docs: update README with setup instructions
style: format code with prettier
refactor(components): improve wallet button
chore: update dependencies
```

## 🛠️ Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run type-check   # Run TypeScript type checking
npm run format       # Format code with Prettier
npm run format:check # Check formatting without changing files
```

### Git Hooks

```bash
npm run prepare      # Install Husky hooks
```

## 🔧 Configuration Files

### ESLint (`.eslint.config.mjs`)

- Next.js recommended rules
- TypeScript support
- Prettier integration
- Custom rules for code quality

### Prettier (`.prettierrc`)

- Single quotes
- 80 character line width
- 2 space indentation
- Trailing commas
- JSX single quotes

### TypeScript (`tsconfig.json`)

- Strict type checking
- Next.js optimizations
- Path mapping for imports

## 🚨 Common Issues & Solutions

### Pre-commit Hook Fails

If the pre-commit hook fails:

1. **TypeScript Errors**: Fix type errors in your code
2. **ESLint Errors**: Run `npm run lint:fix` to auto-fix issues
3. **Formatting Issues**: Run `npm run format` to fix formatting
4. **Build Errors**: Fix any build errors in your code

### Bypassing Hooks (Emergency Only)

⚠️ **Only use in emergencies!**

```bash
git commit --no-verify -m "emergency: bypass hooks"
git push --no-verify
```

### Manual Checks

You can run checks manually:

```bash
# Check everything before committing
npm run type-check
npm run lint
npm run format:check
npm run build
```

## 📋 Development Checklist

Before committing code, ensure:

- [ ] Code follows TypeScript best practices
- [ ] No ESLint errors or warnings
- [ ] Code is properly formatted
- [ ] Project builds successfully
- [ ] Commit message follows conventional format
- [ ] No console.log statements in production code
- [ ] No `any` types (use proper TypeScript types)
- [ ] React hooks dependencies are correct

## 🎯 Best Practices

### TypeScript

- Use strict typing, avoid `any`
- Define proper interfaces for props and state
- Use type guards when necessary
- Leverage TypeScript's built-in utility types

### React

- Use functional components with hooks
- Follow React hooks rules
- Use proper dependency arrays in useEffect
- Avoid prop drilling, use context when needed

### Code Style

- Use meaningful variable and function names
- Keep functions small and focused
- Add JSDoc comments for complex functions
- Use consistent import/export patterns

### Performance

- Use React.memo for expensive components
- Optimize re-renders with useMemo and useCallback
- Lazy load components when appropriate
- Use proper key props in lists

## 🔍 Debugging

### Pre-commit Issues

1. Check the error messages in the terminal
2. Run individual checks to isolate the issue
3. Check the configuration files for syntax errors
4. Ensure all dependencies are installed

### TypeScript Issues

1. Check `tsconfig.json` for proper configuration
2. Ensure all imports are correct
3. Check for missing type definitions
4. Use TypeScript's strict mode features

### ESLint Issues

1. Check `.eslint.config.mjs` for configuration
2. Ensure all plugins are installed
3. Check for conflicting rules
4. Use `--fix` flag to auto-fix issues

## 📚 Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev/learn)
