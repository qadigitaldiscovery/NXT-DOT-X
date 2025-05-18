#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get component name from command line argument
const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name');
  process.exit(1);
}

const testTemplate = `import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    render(<${componentName} />);
    // Add your test assertions here
  });

  it('should handle user interactions', async () => {
    render(<${componentName} />);
    // Add interaction tests here
  });

  it('should handle error states', () => {
    render(<${componentName} />);
    // Add error state tests here
  });
});
`;

const mockTemplate = `export const mock${componentName}Props = {
  // Add mock props here
};

export const mock${componentName}Data = {
  // Add mock data here
};
`;

function createTestFiles(componentName) {
  const testDir = path.join(process.cwd(), 'src/test');
  const mocksDir = path.join(testDir, 'mocks');

  // Ensure directories exist
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  if (!fs.existsSync(mocksDir)) {
    fs.mkdirSync(mocksDir, { recursive: true });
  }

  // Create test file
  const testFile = path.join(testDir, `${componentName}.test.tsx`);
  fs.writeFileSync(testFile, testTemplate);
  console.log(`Created test file: ${testFile}`);

  // Create mock file
  const mockFile = path.join(mocksDir, `${componentName}.ts`);
  fs.writeFileSync(mockFile, mockTemplate);
  console.log(`Created mock file: ${mockFile}`);

  console.log('\nTest files created successfully!');
  console.log('\nNext steps:');
  console.log('1. Add your component-specific test cases');
  console.log('2. Add necessary mock data');
  console.log('3. Run tests with: npm test');
}

try {
  createTestFiles(componentName);
} catch (error) {
  console.error('Error creating test files:', error);
  process.exit(1);
}
