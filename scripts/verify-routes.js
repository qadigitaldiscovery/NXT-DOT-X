import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Route verification script for data management module
 * This script checks:
 * 1. All routes are correctly configured
 * 2. Components for each route exist and can be loaded
 * 3. Data connections for content are functional
 */

console.log('📋 Data Management Module Verification');
console.log('======================================');

// Extract routes from the routing configuration file
const extractRoutes = () => {
  try {
    const routesPath = path.resolve(__dirname, '../src/routes/dataManagementRoutes.tsx');
    const routesContent = fs.readFileSync(routesPath, 'utf8');
    
    // Parse routes using regex
    const routeRegex = /<Route\s+path="([^"]+)"/g;
    const routes = [];
    let match;
    
    while ((match = routeRegex.exec(routesContent)) !== null) {
      routes.push(match[1]);
    }
    
    // Add the parent path to nested routes as needed
    const fullRoutes = routes.map(route => {
      if (route.startsWith('/')) return route;
      return `/data-management/${route}`;
    });
    
    return [...new Set(fullRoutes)]; // Remove duplicates
  } catch (error) {
    console.error('❌ Error extracting routes:', error.message);
    return [];
  }
};

// Verify components exist for routes
const verifyComponents = (routes) => {
  console.log('\n🔍 Checking Components for Routes:');
  
  const componentMappings = {
    '/data-management': 'src/pages/data-management/DashboardHome.tsx',
    '/data-management/suppliers': 'src/pages/SuppliersPage.tsx',
    '/data-management/customers': 'src/pages/data-management/customers/CustomersPage.tsx',
    '/data-management/supplier-costing': 'src/pages/data-management/cost-management/SupplierCosting.tsx',
    '/data-management/cost-analysis': 'src/pages/data-management/cost-management/CostAnalysis.tsx',
    '/data-management/cost-management': 'src/pages/data-management/cost-management/CostDashboard.tsx',
    '/data-management/pricing/competitor-pricing': 'src/pages/data-management/pricing/CompetitorPricing.tsx',
    '/data-management/pricing/price-management': 'src/pages/data-management/pricing/PriceManagement.tsx',
    '/data-management/uploads': 'src/pages/UploadsPage.tsx',
    '/data-management/uploads/new': 'src/pages/NewUploadPage.tsx',
    '/data-management/uploads/holding': 'src/pages/UploadsPage.tsx',
    '/data-management/uploads/bulk-import': 'src/pages/UploadsPage.tsx',
    '/data-management/documents': 'src/pages/data-management/documents/DocumentsPage.tsx',
    '/data-management/export-data': 'src/pages/data-management/data/ExportData.tsx',
    '/data-management/insights': 'src/pages/data-management/insights/DataInsights.tsx',
    '/data-management/connections': 'src/pages/data-management/connections/DataConnections.tsx',
    '/data-management/settings': 'src/pages/DataManagementSettings.tsx',
  };
  
  const results = [];
  
  routes.forEach(route => {
    // Skip routes with dynamic parameters or catch-all routes
    if (route.includes('*') || route.includes(':')) {
      results.push({ route, exists: 'N/A', status: '⚠️ Dynamic route' });
      return;
    }
    
    const componentPath = componentMappings[route];
    if (!componentPath) {
      results.push({ route, exists: false, status: '❌ No component mapping found' });
      return;
    }
    
    const fullPath = path.resolve(__dirname, '..', componentPath);
    const exists = fs.existsSync(fullPath);
    
    if (exists) {
      // Check for page title and main content elements
      const content = fs.readFileSync(fullPath, 'utf8');
      const hasTitle = /moduleTitle|<h1|<title/.test(content);
      const hasContent = /<div|<main|<section/.test(content);
      
      if (hasTitle && hasContent) {
        results.push({ route, exists: true, status: '✅ Component verified' });
      } else {
        results.push({ 
          route, 
          exists: true, 
          status: '⚠️ Component may be incomplete: ' + 
                 (!hasTitle ? 'Missing title ' : '') + 
                 (!hasContent ? 'Missing content blocks' : '')
        });
      }
    } else {
      results.push({ route, exists: false, status: '❌ Component file not found' });
    }
  });
  
  // Display results in a table
  console.table(results);
  
  return results.every(r => r.exists === true || r.exists === 'N/A');
};

// Verify navigation elements in sidebar configuration
const verifyNavigation = () => {
  console.log('\n🧭 Checking Navigation Configuration:');
  
  try {
    const navConfigPath = path.resolve(__dirname, '../src/components/layout/sidebar/NavigationConfig.tsx');
    const navContent = fs.readFileSync(navConfigPath, 'utf8');
    
    // Find the data management category
    const dmCategoryMatch = navContent.match(/label: "Data Management"[\s\S]*?items: \[([\s\S]*?)\]/);
    
    if (!dmCategoryMatch) {
      console.error('❌ Data Management category not found in navigation config');
      return false;
    }
    
    // Extract navigation items
    const itemsSection = dmCategoryMatch[1];
    const itemRegex = /{\s*label:\s*'([^']+)'[^}]*path:\s*'([^']+)'/g;
    const navItems = [];
    let navMatch;
    
    while ((navMatch = itemRegex.exec(itemsSection)) !== null) {
      navItems.push({ label: navMatch[1], path: navMatch[2] });
    }
    
    console.log('📚 Found navigation items:');
    console.table(navItems);
    
    // Check if paths exist in routes
    const routePaths = extractRoutes();
    const missingRoutes = navItems.filter(item => !routePaths.includes(item.path));
    
    if (missingRoutes.length > 0) {
      console.log('⚠️ Navigation items without matching routes:');
      console.table(missingRoutes);
    } else {
      console.log('✅ All navigation items have matching routes');
    }
    
    return missingRoutes.length === 0;
  } catch (error) {
    console.error('❌ Error verifying navigation:', error.message);
    return false;
  }
};

// Verify links in component files
const verifyComponentLinks = () => {
  console.log('\n🔗 Checking Internal Links in Components:');
  
  const componentsDir = path.resolve(__dirname, '../src/pages/data-management');
  let allLinks = [];
  
  const processFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    
    // Look for navigate calls and Link components
    const navigateRegex = /navigate\(\s*['"](\/[^'"]*)['"]/g;
    const linkRegex = /<Link\s+to=['"](\/[^'"]*)['"]/g;
    
    let match;
    while ((match = navigateRegex.exec(content)) !== null) {
      allLinks.push({ file: fileName, link: match[1], type: 'navigate()' });
    }
    
    while ((match = linkRegex.exec(content)) !== null) {
      allLinks.push({ file: fileName, link: match[1], type: '<Link>' });
    }
  };
  
  const processDir = (dirPath) => {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    items.forEach(item => {
      const itemPath = path.join(dirPath, item.name);
      if (item.isDirectory()) {
        processDir(itemPath);
      } else if (item.name.endsWith('.tsx') || item.name.endsWith('.jsx')) {
        processFile(itemPath);
      }
    });
  };
  
  try {
    processDir(componentsDir);
    
    // Check additional files that might contain data management links
    const additionalFiles = [
      '../src/pages/UploadsPage.tsx',
      '../src/pages/SuppliersPage.tsx',
      '../src/pages/DataManagementSettings.tsx'
    ];
    
    additionalFiles.forEach(file => {
      const filePath = path.resolve(__dirname, file);
      if (fs.existsSync(filePath)) {
        processFile(filePath);
      }
    });
    
    console.log(`📊 Found ${allLinks.length} internal links:`);
    console.table(allLinks);
    
    // Verify against routes
    const routePaths = extractRoutes();
    const validLinks = allLinks.filter(item => {
      // Basic validation - check if the route exists or is a parent route
      return routePaths.some(route => 
        item.link === route || 
        item.link.startsWith(`${route}/`) ||
        route.startsWith(item.link + '/')
      );
    });
    
    const invalidLinks = allLinks.filter(item => !validLinks.includes(item));
    
    if (invalidLinks.length > 0) {
      console.log('⚠️ Potentially invalid links:');
      console.table(invalidLinks);
    } else {
      console.log('✅ All links appear to be valid');
    }
    
    return invalidLinks.length === 0;
  } catch (error) {
    console.error('❌ Error verifying component links:', error.message);
    return false;
  }
};

// Verify page content and data connections
const verifyPageContent = () => {
  console.log('\n📄 Checking Page Content and Data Connections:');
  
  // Map pages to expected content elements
  const contentChecks = [
    { 
      page: 'DashboardHome.tsx', 
      dataIndicators: ['navigate', 'Card', 'Button'],
      expectedElements: ['Dashboard', 'Card', 'navigate']
    },
    { 
      page: 'SuppliersPage.tsx', 
      dataIndicators: ['useSupplier', 'Table', 'data:'],
      expectedElements: ['Supplier', 'Table', 'filter']
    },
    { 
      page: 'customers/CustomersPage.tsx', 
      dataIndicators: ['useCustomer', 'Table', 'data:'],
      expectedElements: ['Customer', 'Directory', 'Table']
    },
    { 
      page: 'cost-management/SupplierCosting.tsx', 
      dataIndicators: ['cost', 'data', 'CostDashboard'],
      expectedElements: ['Supplier Costing', 'Cost']
    },
    { 
      page: 'cost-management/CostAnalysis.tsx', 
      dataIndicators: ['analysis', 'chart', 'data'],
      expectedElements: ['Analysis', 'Chart', 'Filter']
    },
    // Add more page checks here
  ];
  
  const results = [];
  
  contentChecks.forEach(check => {
    const pagePath = path.resolve(__dirname, '../src/pages/data-management', check.page);
    
    try {
      if (!fs.existsSync(pagePath)) {
        results.push({ 
          page: check.page, 
          contentFound: false, 
          dataFound: false,
          status: '❌ Page file not found'
        });
        return;
      }
      
      const content = fs.readFileSync(pagePath, 'utf8');
      
      // Check for expected content elements
      const hasContent = check.expectedElements.every(el => content.includes(el));
      
      // Check for data connection indicators
      const hasData = check.dataIndicators.some(indicator => content.includes(indicator));
      
      results.push({
        page: check.page,
        contentFound: hasContent,
        dataFound: hasData,
        status: hasContent && hasData ? '✅ Content and data verified' :
                hasContent ? '⚠️ Content found but data connections unclear' :
                hasData ? '⚠️ Data connections found but content incomplete' :
                '❌ Missing expected content and data'
      });
    } catch (error) {
      results.push({ 
        page: check.page, 
        contentFound: false, 
        dataFound: false,
        status: '❌ Error: ' + error.message
      });
    }
  });
  
  console.table(results);
  return results.every(r => r.contentFound && r.dataFound);
};

// Execute the checks
const runChecks = () => {
  console.log('\n🚀 Starting comprehensive route and content verification\n');
  
  const routes = extractRoutes();
  console.log(`📍 Found ${routes.length} routes in dataManagementRoutes.tsx`);
  console.log(routes);
  
  const componentsValid = verifyComponents(routes);
  const navigationValid = verifyNavigation();
  const linksValid = verifyComponentLinks();
  const contentValid = verifyPageContent();
  
  console.log('\n📊 Summary Results:');
  console.table({
    'Component Check': componentsValid ? '✅ PASS' : '❌ FAIL',
    'Navigation Check': navigationValid ? '✅ PASS' : '❌ FAIL',
    'Links Check': linksValid ? '✅ PASS' : '❌ FAIL',
    'Content Check': contentValid ? '✅ PASS' : '❌ FAIL',
    'Overall Status': (componentsValid && navigationValid && linksValid && contentValid) ? 
                      '✅ ALL CHECKS PASSED' : '⚠️ SOME CHECKS FAILED'
  });
  
  return {
    success: componentsValid && navigationValid && linksValid && contentValid,
    routes: routes.length,
    componentsValid,
    navigationValid,
    linksValid,
    contentValid
  };
};

// Run all checks
runChecks();

// Export for programmatic use
export {
  extractRoutes,
  verifyComponents,
  verifyNavigation,
  verifyComponentLinks,
  verifyPageContent,
  runChecks
}; 