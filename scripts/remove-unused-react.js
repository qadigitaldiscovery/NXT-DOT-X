const fs = require('fs');
const path = require('path');

// Function to process a file
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if the file uses JSX or React.something
  const hasJSX = content.includes('<') && content.includes('/>') || content.includes('</');
  const usesReactDirectly = content.includes('React.') || content.includes('extends React.');
  
  if (!hasJSX && !usesReactDirectly) {
    // Remove the React import
    const newContent = content.replace(/import React from ['"]react['"];?\n/, '');
    fs.writeFileSync(filePath, newContent);
    console.log(`Removed unused React import from ${filePath}`);
  }
}

// Function to walk through directories
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.tsx')) {
      processFile(filePath);
    }
  });
}

// Start processing from src directory
walkDir(path.join(__dirname, '..', 'src'));
