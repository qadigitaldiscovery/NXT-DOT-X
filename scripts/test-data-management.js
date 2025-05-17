import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Master Test Script for Data Management Module
 * This script runs all verification tests to ensure:
 * 1. Routes are properly configured
 * 2. UI components are complete and functional
 * 3. Navigation works correctly
 * 4. All expected functionality is present
 */

console.log('🚀 Data Management Module Complete Test Suite');
console.log('============================================');

// Create scripts directory if it doesn't exist
const scriptsDir = path.resolve(__dirname);
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

// Function to run a test script and handle errors
const runScript = (scriptName, description) => {
  console.log(`\n\n📌 Running ${description}...`);
  console.log('═'.repeat(50));
  
  const scriptPath = path.join(scriptsDir, scriptName);
  
  try {
    if (!fs.existsSync(scriptPath)) {
      console.error(`❌ Script not found: ${scriptPath}`);
      return false;
    }
    
    execSync(`node "${scriptPath}"`, { stdio: 'inherit' });
    console.log(`\n✅ ${description} completed successfully`);
    return true;
  } catch (error) {
    console.error(`\n❌ ${description} failed: ${error.message}`);
    return false;
  }
};

// Main test execution
const runAllTests = () => {
  console.log('\n🧪 Starting comprehensive testing...\n');
  
  const results = {
    routes: runScript('verify-routes.js', 'Route Verification'),
    ui: runScript('test-ui-components.js', 'UI Component Analysis')
  };
  
  // Summary report
  console.log('\n\n📊 TEST SUMMARY');
  console.log('═'.repeat(50));
  console.log(`Route Verification: ${results.routes ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`UI Component Analysis: ${results.ui ? '✅ PASS' : '❌ FAIL'}`);
  
  const allPassed = Object.values(results).every(result => result === true);
  console.log(`\nOverall Status: ${allPassed ? '✅ ALL TESTS PASSED' : '⚠️ SOME TESTS FAILED'}`);
  
  console.log('\n📋 NEXT STEPS:');
  console.log('  1. Review the generated test reports');
  console.log('  2. Fix any issues identified in problem pages');
  console.log('  3. Verify all navigation and functionality manually');
  
  return allPassed;
};

// Run all tests
const success = runAllTests();

// Exit with appropriate code
process.exit(success ? 0 : 1); 