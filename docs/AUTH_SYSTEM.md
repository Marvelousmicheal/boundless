# Authentication System Documentation

This document describes the comprehensive authentication system implemented using Zustand for state management, with persistence and proper error handling.

## Overview

The authentication system provides:

- **Zustand Store**: Centralized state management with persistence
- **Automatic Token Refresh**: Handles 401 errors and token expiration
- **Server & Client Support**: Works in both server and client components
- **Type Safety**: Full TypeScript support
- **Error Handling**: Consistent 401 error handling across the app

## Architecture

### Core Components

1. **Auth Store** (`lib/stores/auth-store.ts`)
   - Manages authentication state
   - Handles token persistence
   - Provides login/logout actions

2. **API Client** (`lib/api/api.ts`)
   - Automatic token refresh on 401 errors
   - Consistent error handling
   - Request/response interceptors

3. **Auth API** (`lib/api/auth.ts`)
   - Authentication API functions
   - Store integration
   - Enhanced utilities

4. **Auth Hooks** (`hooks/use-auth.ts`)
   - Client-side auth utilities
   - Backward compatibility with NextAuth
   - Error handling hooks

5. **Server Auth Utilities** (`lib/auth/server-auth.ts`)
   - Server-side authentication
   - Protected route utilities
   - Cookie-based token access

## Usage

### Client Components

#### Basic Authentication Hook

```tsx
import { useAuth } from '@/hooks/use-auth';

function MyComponent() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  );
}
```

#### Protected Routes

```tsx
import { ProtectedRoute } from '@/components/auth/protected-route';

function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Protected Dashboard Content</div>
    </ProtectedRoute>
  );
}

// With role requirements
function AdminPanel() {
  return (
    <ProtectedRoute requireRole='ADMIN'>
      <div>Admin Only Content</div>
    </ProtectedRoute>
  );
}
```

#### Login Form

```tsx
import { LoginForm } from '@/components/auth/login-form';

function SignInPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <LoginForm
        onSuccess={() => router.push('/dashboard')}
        onError={error => console.error(error)}
      />
    </div>
  );
}
```

### Server Components

#### Server-side Authentication

```tsx
import { getServerUser, requireServerAuth } from '@/lib/auth/server-auth';

// Optional auth check
async function ProfilePage() {
  const user = await getServerUser();

  if (!user) {
    return <div>Please sign in</div>;
  }

  return <div>Welcome, {user.name}!</div>;
}

// Required auth check
async function ProtectedPage() {
  const user = await requireServerAuth(); // Redirects to /auth/signin if not authenticated

  return <div>Protected content for {user.name}</div>;
}
```

#### With Server Actions

```tsx
import { getServerAuthHeaders } from '@/lib/auth/server-auth';

async function updateProfile(formData: FormData) {
  'use server';

  const headers = await getServerAuthHeaders();

  const response = await fetch('/api/profile', {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.get('name'),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  return response.json();
}
```

## API Integration

### Making Authenticated Requests

```tsx
import { api } from '@/lib/api/api';

// Automatic token handling
const response = await api.get('/api/protected-endpoint');

// With custom headers
const response = await api.post('/api/data', data, {
  headers: {
    'Custom-Header': 'value',
  },
});
```

### Error Handling

```tsx
import { useAuthErrorHandler } from '@/hooks/use-auth';

function MyComponent() {
  const { handleAuthError } = useAuthErrorHandler();

  const handleApiCall = async () => {
    try {
      await api.get('/api/protected');
    } catch (error) {
      if (handleAuthError(error)) {
        // Auth error was handled (user redirected to login)
        return;
      }
      // Handle other errors
      console.error('API Error:', error);
    }
  };
}
```

## Configuration

### Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

### Store Persistence

The auth store automatically persists to localStorage and syncs with cookies:

```tsx
// Store configuration in lib/stores/auth-store.ts
persist(
  (set, get) => ({
    // ... store implementation
  }),
  {
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage),
    partialize: state => ({
      user: state.user,
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      isAuthenticated: state.isAuthenticated,
    }),
  }
);
```

## Error Handling

### 401 Unauthorized Errors

The system automatically handles 401 errors:

1. **Automatic Token Refresh**: Attempts to refresh the access token
2. **Fallback to Login**: If refresh fails, redirects to login page
3. **State Cleanup**: Clears auth state and cookies
4. **User Feedback**: Shows appropriate error messages

### Custom Error Handling

```tsx
import { useAuthActions } from '@/hooks/use-auth';

function MyComponent() {
  const { setError } = useAuthActions();

  const handleError = (error: any) => {
    if (error.status === 401) {
      setError('Session expired. Please login again.');
    } else {
      setError(error.message);
    }
  };
}
```

## Migration from NextAuth

The system maintains backward compatibility with NextAuth:

```tsx
// Old NextAuth usage still works
import { useSession } from 'next-auth/react';

function Component() {
  const { data: session } = useSession();
  // ... existing code
}

// New Zustand usage
import { useAuth } from '@/hooks/use-auth';

function Component() {
  const { user, isAuthenticated } = useAuth();
  // ... new code
}
```

## Best Practices

### 1. Use Protected Routes

Always wrap protected content with `ProtectedRoute`:

```tsx
<ProtectedRoute requireRole='ADMIN'>
  <AdminPanel />
</ProtectedRoute>
```

### 2. Handle Loading States

```tsx
const { isLoading, user } = useAuth();

if (isLoading) {
  return <LoadingSpinner />;
}
```

### 3. Server-side Validation

Always validate auth on the server for sensitive operations:

```tsx
async function sensitiveAction() {
  'use server';

  const user = await requireServerAuth();
  // Proceed with action
}
```

### 4. Error Boundaries

Wrap components that make API calls in error boundaries:

```tsx
<ErrorBoundary fallback={<ErrorComponent />}>
  <ComponentWithApiCalls />
</ErrorBoundary>
```

## Troubleshooting

### Common Issues

1. **Hydration Mismatch**: Ensure auth provider wraps the app
2. **Token Not Persisting**: Check localStorage and cookie settings
3. **401 Loops**: Verify refresh token endpoint is working
4. **Server/Client Mismatch**: Use appropriate auth utilities for each context

### Debug Mode

Enable debug logging:

```tsx
// In development
if (process.env.NODE_ENV === 'development') {
  console.log('Auth State:', useAuthStore.getState());
}
```

## Security Considerations

1. **Token Storage**: Tokens are stored in both localStorage and cookies
2. **Automatic Cleanup**: Failed auth attempts clear all stored data
3. **HTTPS Only**: Ensure cookies are secure in production
4. **Token Refresh**: Implements secure token refresh flow
5. **CSRF Protection**: Uses proper CSRF tokens where needed

## Performance

1. **Selective Re-renders**: Zustand only re-renders when subscribed state changes
2. **Lazy Loading**: Auth state is loaded only when needed
3. **Persistent State**: Reduces unnecessary API calls on page reload
4. **Efficient Updates**: Batch updates to minimize re-renders
