
// Empty test file to force a refresh of the Landing component
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Landing from './pages/Landing';

// This is just a placeholder test to force a refresh
test('Landing component exists', () => {
  expect(Landing).toBeDefined();
});
