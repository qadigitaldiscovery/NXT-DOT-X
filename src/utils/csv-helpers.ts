
/**
 * Formats a CSV string into a 2D array
 * @param csvText The CSV text to format
 * @returns A 2D array representing the CSV data
 */
export function formatCSV(csvText: string): string[][] {
  // Split by newlines
  const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
  
  // Parse each line into an array
  return lines.map(line => {
    // Handle quoted values (that may contain commas)
    const result = [];
    let currentValue = '';
    let insideQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        result.push(currentValue);
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    
    // Push the last value
    result.push(currentValue);
    
    // Clean up values: remove quotes and trim whitespace
    return result.map(val => val.replace(/^"(.*)"$/, '$1').trim());
  });
}
