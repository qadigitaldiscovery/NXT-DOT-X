# Testing Standards and Configuration

This document outlines the standardized testing approach for the NXT-DOT-X platform.

## Test Setup

### Configuration Files

1. **Jest Configuration** (`jest.config.js`):
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }],
    '^.+\\.(js|jsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'automatic' }]
      ]
    }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['node_modules/(?!(@supabase|@testing-library)/)']
}
```

2. **Test Setup** (`src/test/setup.ts`):
```typescript
import '@testing-library/jest-dom';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.resetAllMocks();
});

process.env.VITE_SUPABASE_URL = 'https://test.supabase.co';
process.env.VITE_SUPABASE_ANON_KEY = 'test-anon-key';
```

## Testing Patterns

### 1. Authentication Testing

Example test structure (`auth.test.ts`):
```typescript
describe('Authentication', () => {
  describe('signInWithPassword', () => {
    it('should authenticate successfully with valid credentials', async () => {
      // Test implementation
    });

    it('should fail with invalid credentials', async () => {
      // Test implementation
    });
  });

  describe('signOut', () => {
    it('should sign out successfully', async () => {
      // Test implementation
    });
  });
});
```

### 2. Mock Implementation

Example mock structure (`mocks/supabase.ts`):
```typescript
export const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com'
};

export const mockProfile = {
  id: mockUser.id,
  role: 'user',
  permissions: ['users.view']
};

export const mockSupabaseClient = {
  auth: {
    signInWithPassword: async () => ({
      data: { user: mockUser, session: { access_token: 'test-token' } },
      error: null
    }),
    signOut: async () => ({ error: null })
  },
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({
          data: mockProfile,
          error: null
        })
      })
    })
  })
};
```

## Best Practices

1. **Test Organization**
   - Group related tests using `describe` blocks
   - Use clear, descriptive test names
   - Follow the Arrange-Act-Assert pattern

2. **Mocking**
   - Create separate mock files for different services
   - Keep mocks simple and focused
   - Use TypeScript for type safety in mocks

3. **Test Coverage**
   - Aim for comprehensive coverage of core functionality
   - Include both success and error cases
   - Test edge cases and boundary conditions

4. **Async Testing**
   - Use async/await for asynchronous tests
   - Handle promises properly
   - Test both resolved and rejected states

## Required Dependencies

```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^5.x",
    "@testing-library/react": "^13.x",
    "@testing-library/user-event": "^14.x",
    "@types/jest": "^29.x",
    "jest": "^29.x",
    "jest-environment-jsdom": "^29.x",
    "ts-jest": "^29.x",
    "identity-obj-proxy": "^3.x"
  }
}
```

## Running Tests

- Run all tests: `npm test`
- Run with coverage: `npm test -- --coverage`
- Run specific test file: `npm test -- path/to/test.ts`
- Run in watch mode: `npm test -- --watch`

## Continuous Integration

- Tests should be run as part of the CI pipeline
- All tests must pass before merging to main branches
- Coverage reports should be generated and tracked

This testing setup should be used as a template for all new features and components in the NXT-DOT-X platform.
