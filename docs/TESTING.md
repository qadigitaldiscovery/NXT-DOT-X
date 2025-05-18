# Testing Guide for NXT-DOT-X

This guide explains how to write and run tests in the NXT-DOT-X platform.

## Quick Start

1. Create new test files for a component:
```bash
npm run test:setup ComponentName
```
This will create:
- `src/test/ComponentName.test.tsx`
- `src/test/mocks/ComponentName.ts`

2. Run tests:
```bash
npm test                 # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
```

## Testing Standards

Our testing setup includes:
- Jest for test running and assertions
- React Testing Library for component testing
- Jest DOM for DOM-related assertions
- TypeScript support
- Mocking utilities

See [testing-standards.md](./testing-standards.md) for detailed configuration and patterns.

## Directory Structure

```
src/
├── test/
│   ├── setup.ts              # Global test setup
│   ├── *.test.tsx           # Test files
│   └── mocks/               # Mock implementations
│       └── *.ts             # Mock files
```

## Writing Tests

### Component Tests

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    render(<ComponentName />);
    // Add assertions
  });

  it('should handle user interactions', async () => {
    render(<ComponentName />);
    // Test interactions
  });
});
```

### API/Integration Tests

```typescript
import { mockApiClient } from '../mocks/apiClient';

describe('API Integration', () => {
  it('should handle successful requests', async () => {
    // Test API calls
  });

  it('should handle errors', async () => {
    // Test error scenarios
  });
});
```

## Best Practices

1. **Test Organization**
   - Group related tests using `describe` blocks
   - Use clear, descriptive test names
   - Follow the Arrange-Act-Assert pattern

2. **Component Testing**
   - Test user interactions and visual elements
   - Verify component behavior and state changes
   - Test error states and edge cases

3. **Integration Testing**
   - Mock external dependencies
   - Test API calls and responses
   - Verify error handling

4. **Mocking**
   - Create separate mock files for different services
   - Keep mocks simple and focused
   - Use TypeScript for type safety

## Common Testing Scenarios

### Testing User Interactions
```typescript
it('should handle button click', async () => {
  render(<MyComponent />);
  const button = screen.getByRole('button');
  await fireEvent.click(button);
  expect(screen.getByText('Clicked!')).toBeInTheDocument();
});
```

### Testing Async Operations
```typescript
it('should load data', async () => {
  render(<MyComponent />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  await screen.findByText('Data loaded');
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});
```

### Testing Error States
```typescript
it('should handle errors', async () => {
  mockApiClient.getData.mockRejectedValueOnce(new Error('API Error'));
  render(<MyComponent />);
  await screen.findByText('Error: API Error');
});
```

## Continuous Integration

Tests are automatically run:
- On every pull request
- Before merging to main branches
- During deployment builds

Coverage reports are generated and tracked to maintain code quality.

## Troubleshooting

Common issues and solutions:

1. **Tests not running**
   - Verify file naming (should end with `.test.ts` or `.test.tsx`)
   - Check Jest configuration
   - Ensure all dependencies are installed

2. **Test failures**
   - Check console for error messages
   - Verify mock implementations
   - Ensure async operations are properly handled

3. **Coverage issues**
   - Verify test patterns in jest.config.js
   - Check for excluded files/patterns
   - Run with `--coverage` flag for detailed report

## Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)

For more detailed information about our testing configuration and patterns, see [testing-standards.md](./testing-standards.md).
