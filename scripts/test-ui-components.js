import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * UI Component Testing Script for Data Management Module
 * This script analyzes React components to:
 * 1. Verify all interactive elements (buttons, links)
 * 2. Check form components and validation
 * 3. Find all user interactions and their handlers
 */

console.log('🧪 Data Management UI Component Verification');
console.log('============================================');

// Map of pages to test
const pagesToTest = [
  {
    name: 'Dashboard',
    path: '../src/pages/data-management/DashboardHome.tsx',
    expectedButtons: ['Access', 'Analyze', 'View'],
    expectedForms: [],
    expectedTables: [],
    navCards: [
      'Supplier Management', 'Customer Management', 'Supplier Costing',
      'Cost Analysis', 'Document Repository', 'Competitor Pricing',
      'Price Management', 'File Uploads', 'Data Insights'
    ]
  },
  {
    name: 'Suppliers',
    path: '../src/pages/SuppliersPage.tsx',
    expectedButtons: ['Add Supplier', 'Edit', 'Delete', 'Filter', 'Export'],
    expectedForms: ['Search', 'Filter'],
    expectedTables: ['SupplierTable'],
    expectedActions: ['edit', 'delete', 'view']
  },
  {
    name: 'Customers',
    path: '../src/pages/data-management/customers/CustomersPage.tsx',
    expectedButtons: ['Add Customer', 'Edit', 'Delete', 'Filter'],
    expectedForms: ['CustomerForm'],
    expectedTables: ['CustomerTable'],
    expectedActions: ['edit', 'delete', 'view']
  },
  {
    name: 'Supplier Costing',
    path: '../src/pages/data-management/cost-management/SupplierCosting.tsx',
    expectedButtons: ['Manage', 'Add', 'View'],
    expectedForms: [],
    expectedTables: [],
    expectedCharts: true
  },
  {
    name: 'Cost Analysis',
    path: '../src/pages/data-management/cost-management/CostAnalysis.tsx',
    expectedButtons: ['Filter', 'Export', 'View'],
    expectedForms: ['DateRangeFilter'],
    expectedCharts: true
  },
  {
    name: 'Cost Management',
    path: '../src/pages/data-management/cost-management/CostDashboard.tsx',
    expectedButtons: ['Manage', 'View', 'Filter'],
    expectedForms: [],
    expectedTables: ['CostTable'],
    expectedCharts: true
  },
  {
    name: 'Competitor Pricing',
    path: '../src/pages/data-management/pricing/CompetitorPricing.tsx',
    expectedButtons: ['Add', 'Edit', 'Delete', 'Export'],
    expectedForms: ['PriceForm'],
    expectedTables: ['PricingTable']
  },
  {
    name: 'Price Management',
    path: '../src/pages/data-management/pricing/PriceManagement.tsx',
    expectedButtons: ['Add Price', 'Edit', 'Delete', 'Filter'],
    expectedForms: ['PriceForm'],
    expectedTables: ['PriceTable']
  },
  {
    name: 'File Uploads',
    path: '../src/pages/UploadsPage.tsx',
    expectedButtons: ['Upload', 'Delete', 'Download', 'Process'],
    expectedForms: ['UploadForm'],
    expectedTables: ['FileTable'],
    expectedDropzones: true
  },
  {
    name: 'Documents',
    path: '../src/pages/data-management/documents/DocumentsPage.tsx',
    expectedButtons: ['Upload', 'Download', 'Delete', 'Share'],
    expectedForms: [],
    expectedTables: ['DocumentTable'],
    expectedFileBrowser: true
  },
  {
    name: 'Export Data',
    path: '../src/pages/data-management/data/ExportData.tsx',
    expectedButtons: ['Export', 'Configure', 'Schedule'],
    expectedForms: ['ExportForm'],
    expectedTables: ['ExportHistoryTable']
  },
  {
    name: 'Data Insights',
    path: '../src/pages/data-management/insights/DataInsights.tsx',
    expectedButtons: ['Filter', 'Export', 'Configure'],
    expectedForms: ['InsightFilters'],
    expectedCharts: true
  },
  {
    name: 'Data Connections',
    path: '../src/pages/data-management/connections/DataConnections.tsx',
    expectedButtons: ['Add Connection', 'Configure', 'Test', 'Delete'],
    expectedForms: ['ConnectionForm'],
    expectedTables: ['ConnectionTable']
  },
  {
    name: 'Settings',
    path: '../src/pages/DataManagementSettings.tsx',
    expectedButtons: ['Save', 'Reset', 'Apply'],
    expectedForms: ['SettingsForm'],
    expectedTables: [],
    expectedToggles: true
  }
];

// Find all UI interactive elements in component
const findInteractiveElements = (content) => {
  const result = {
    buttons: [],
    links: [],
    forms: [],
    tables: [],
    charts: [],
    dropdowns: [],
    modals: []
  };

  // Find buttons
  const buttonRegex = /<Button[^>]*>([^<]*)<\/Button>/g;
  let match;
  while ((match = buttonRegex.exec(content)) !== null) {
    if (match[1].trim()) {
      result.buttons.push(match[1].trim());
    }
  }

  // Find links
  const linkRegex = /<Link[^>]*>[^<]*<\/Link>/g;
  while ((match = linkRegex.exec(content)) !== null) {
    result.links.push(match[0]);
  }

  // Find forms
  const formRegex = /<Form[^>]*>|useForm\(/g;
  while ((match = formRegex.exec(content)) !== null) {
    result.forms.push(match[0]);
  }

  // Find tables
  const tableRegex = /<Table[^>]*>|<DataTable[^>]*>/g;
  while ((match = tableRegex.exec(content)) !== null) {
    result.tables.push(match[0]);
  }

  // Find charts
  const chartRegex = /<(Bar|Line|Pie|Area|Radar|Scatter)Chart[^>]*>/g;
  while ((match = chartRegex.exec(content)) !== null) {
    result.charts.push(match[0]);
  }

  // Find dropdowns
  const dropdownRegex = /<(Dropdown|Select|Menu)[^>]*>/g;
  while ((match = dropdownRegex.exec(content)) !== null) {
    result.dropdowns.push(match[0]);
  }

  // Find modals
  const modalRegex = /<(Modal|Dialog)[^>]*>/g;
  while ((match = modalRegex.exec(content)) !== null) {
    result.modals.push(match[0]);
  }

  return result;
};

// Find event handlers in component
const findEventHandlers = (content) => {
  const handlers = [];
  
  // Look for function declarations that handle events
  const handlerRegex = /(?:const|function)\s+handle(\w+)\s*=?\s*\(?/g;
  let match;
  
  while ((match = handlerRegex.exec(content)) !== null) {
    handlers.push(`handle${match[1]}`);
  }
  
  return handlers;
};

// Check if specific functionality exists
const checkFunctionality = (content, page) => {
  const result = {
    hasSearch: /search|filter|query/.test(content.toLowerCase()),
    hasPagination: /pagination|paginate|page(Size|Number)/.test(content),
    hasSorting: /sort|order(By)?/.test(content),
    hasFiltering: /filter|where|query/.test(content),
    hasExport: /export|download|csv|excel|pdf/.test(content.toLowerCase()),
    hasForm: /Form|useForm|formState|register|handleSubmit/.test(content),
    hasValidation: /validate|validation|isRequired|pattern|minLength/.test(content),
    hasErrorHandling: /try\s*{[^}]*}\s*catch|error|invalid|onError/.test(content),
    hasDataFetching: /fetch|axios|useQuery|get\(|post\(/.test(content),
    hasStateManagement: /useState|useReducer|useContext|store|redux/.test(content),
    missingExpectedButtons: []
  };
  
  // Check for expected buttons
  if (page.expectedButtons) {
    page.expectedButtons.forEach(button => {
      if (!content.toLowerCase().includes(button.toLowerCase())) {
        result.missingExpectedButtons.push(button);
      }
    });
  }
  
  return result;
};

// Process a single page
const processPage = (page) => {
  try {
    const filePath = path.resolve(__dirname, page.path);
    
    if (!fs.existsSync(filePath)) {
      return {
        name: page.name,
        exists: false,
        error: 'File not found'
      };
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const elements = findInteractiveElements(content);
    const handlers = findEventHandlers(content);
    const functionality = checkFunctionality(content, page);
    
    return {
      name: page.name,
      exists: true,
      elements,
      handlers,
      functionality,
      content: content.length, // Just store the size
      allElementsFound: elements.buttons.length > 0 || elements.links.length > 0
    };
  } catch (error) {
    return {
      name: page.name,
      exists: false,
      error: error.message
    };
  }
};

// Find component imports to trace UI elements
const findComponentImports = (content) => {
  const imports = [];
  const importRegex = /import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    const components = match[1].split(',').map(c => c.trim());
    const source = match[2];
    
    components.forEach(component => {
      if (component) {
        imports.push({ component, source });
      }
    });
  }
  
  return imports;
};

// Process all pages
const processAllPages = () => {
  const results = [];
  const problemPages = [];
  
  pagesToTest.forEach(page => {
    console.log(`\n🔍 Testing ${page.name} page...`);
    const result = processPage(page);
    
    if (!result.exists) {
      console.log(`❌ ${page.name} - ${result.error}`);
      problemPages.push({ page: page.name, reason: result.error });
      results.push(result);
      return;
    }
    
    console.log(`✅ Found ${result.elements.buttons.length} buttons, ${result.elements.links.length} links, ${result.handlers.length} event handlers`);
    
    // Check for issues
    const issues = [];
    
    if (result.functionality.missingExpectedButtons.length > 0) {
      issues.push(`Missing expected buttons: ${result.functionality.missingExpectedButtons.join(', ')}`);
    }
    
    if (page.expectedForms && page.expectedForms.length > 0 && !result.functionality.hasForm) {
      issues.push('Expected form functionality not found');
    }
    
    if (page.expectedCharts && result.elements.charts.length === 0) {
      issues.push('Expected charts not found');
    }
    
    if (page.expectedTables && page.expectedTables.length > 0 && result.elements.tables.length === 0) {
      issues.push('Expected tables not found');
    }
    
    if (!result.functionality.hasErrorHandling) {
      issues.push('No error handling detected');
    }
    
    if (issues.length > 0) {
      console.log('⚠️ Issues found:');
      issues.forEach(issue => console.log(`  - ${issue}`));
      problemPages.push({ page: page.name, reason: issues.join('; ') });
    } else {
      console.log('✅ No issues detected');
    }
    
    results.push(result);
  });
  
  // Summary results
  console.log('\n📊 Test Summary:');
  console.log(`Total pages tested: ${pagesToTest.length}`);
  console.log(`Pages with issues: ${problemPages.length}`);
  
  if (problemPages.length > 0) {
    console.log('\n⚠️ Pages requiring attention:');
    console.table(problemPages);
  }
  
  return {
    totalTested: pagesToTest.length,
    problemPages,
    results
  };
};

// Generate a markdown report
const generateReport = (results) => {
  let report = '# Data Management Module UI Test Report\n\n';
  
  report += '## Summary\n\n';
  report += `- Total pages tested: ${results.totalTested}\n`;
  report += `- Pages with issues: ${results.problemPages.length}\n\n`;
  
  if (results.problemPages.length > 0) {
    report += '## Pages Requiring Attention\n\n';
    report += '| Page | Issues |\n';
    report += '| ---- | ------ |\n';
    
    results.problemPages.forEach(problem => {
      report += `| ${problem.page} | ${problem.reason} |\n`;
    });
    
    report += '\n';
  }
  
  report += '## Detailed Results\n\n';
  
  results.results.forEach(result => {
    if (!result.exists) {
      report += `### ${result.name} ❌\n\n`;
      report += `Error: ${result.error}\n\n`;
      return;
    }
    
    report += `### ${result.name} ${result.functionality.missingExpectedButtons.length === 0 ? '✅' : '⚠️'}\n\n`;
    
    report += '#### Interactive Elements\n\n';
    report += `- Buttons: ${result.elements.buttons.length}\n`;
    report += `- Links: ${result.elements.links.length}\n`;
    report += `- Forms: ${result.elements.forms.length}\n`;
    report += `- Tables: ${result.elements.tables.length}\n`;
    report += `- Charts: ${result.elements.charts.length}\n`;
    report += `- Dropdowns: ${result.elements.dropdowns.length}\n`;
    report += `- Modals: ${result.elements.modals.length}\n\n`;
    
    report += '#### Event Handlers\n\n';
    report += `Total: ${result.handlers.length}\n\n`;
    
    if (result.handlers.length > 0) {
      report += '```\n';
      result.handlers.forEach(handler => {
        report += `${handler}\n`;
      });
      report += '```\n\n';
    }
    
    report += '#### Functionality Check\n\n';
    report += `- Search: ${result.functionality.hasSearch ? '✅' : '❌'}\n`;
    report += `- Pagination: ${result.functionality.hasPagination ? '✅' : '❌'}\n`;
    report += `- Sorting: ${result.functionality.hasSorting ? '✅' : '❌'}\n`;
    report += `- Filtering: ${result.functionality.hasFiltering ? '✅' : '❌'}\n`;
    report += `- Export: ${result.functionality.hasExport ? '✅' : '❌'}\n`;
    report += `- Form Handling: ${result.functionality.hasForm ? '✅' : '❌'}\n`;
    report += `- Validation: ${result.functionality.hasValidation ? '✅' : '❌'}\n`;
    report += `- Error Handling: ${result.functionality.hasErrorHandling ? '✅' : '❌'}\n`;
    report += `- Data Fetching: ${result.functionality.hasDataFetching ? '✅' : '❌'}\n`;
    report += `- State Management: ${result.functionality.hasStateManagement ? '✅' : '❌'}\n\n`;
    
    if (result.functionality.missingExpectedButtons.length > 0) {
      report += '#### Missing Expected Buttons\n\n';
      result.functionality.missingExpectedButtons.forEach(button => {
        report += `- ${button}\n`;
      });
      report += '\n';
    }
  });
  
  return report;
};

// Run the tests and generate report
const runTests = () => {
  console.log('🚀 Starting UI component testing...\n');
  
  const results = processAllPages();
  const report = generateReport(results);
  
  // Save report to file
  const reportPath = path.resolve(__dirname, '../test-report-ui.md');
  fs.writeFileSync(reportPath, report);
  
  console.log(`\n📝 Report saved to ${reportPath}`);
  
  return results;
};

runTests();

export {
  processPage,
  findInteractiveElements,
  findEventHandlers,
  checkFunctionality,
  runTests
}; 