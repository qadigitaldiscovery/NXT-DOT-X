// Mock data for database tables
export const mockTables = [
    { name: 'suppliers', row_count: 156, size: '1.2 MB', last_vacuum: '2023-05-10' },
    { name: 'products', row_count: 2350, size: '4.8 MB', last_vacuum: '2023-05-12' },
    { name: 'supplier_product_costs', row_count: 5621, size: '12.6 MB', last_vacuum: '2023-05-08' },
    { name: 'supplier_contacts', row_count: 320, size: '0.8 MB', last_vacuum: '2023-05-15' },
    { name: 'supplier_documents', row_count: 145, size: '0.5 MB', last_vacuum: '2023-05-11' },
    { name: 'supplier_cost_uploads', row_count: 78, size: '0.3 MB', last_vacuum: '2023-05-14' },
    { name: 'currency_exchange_rates', row_count: 42, size: '0.1 MB', last_vacuum: '2023-05-13' }
];
// Mock data for recent queries 
export const mockRecentQueries = [
    {
        id: '1',
        query: 'SELECT * FROM suppliers WHERE status = \'active\'',
        timestamp: '2023-05-15 14:32:45',
        duration: '125ms',
        user: 'admin'
    },
    {
        id: '2',
        query: 'UPDATE products SET category = \'Electronics\' WHERE id IN (SELECT id FROM products WHERE category IS NULL)',
        timestamp: '2023-05-15 13:45:22',
        duration: '350ms',
        user: 'admin'
    },
    {
        id: '3',
        query: 'SELECT p.name, s.name as supplier, spc.cost FROM products p JOIN supplier_product_costs spc ON p.id = spc.product_id JOIN suppliers s ON spc.supplier_id = s.id LIMIT 100',
        timestamp: '2023-05-15 11:20:18',
        duration: '420ms',
        user: 'admin'
    }
];
