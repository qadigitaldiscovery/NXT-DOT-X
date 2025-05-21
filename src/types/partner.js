// Helper functions to convert between types
export function vendorToPartner(vendor) {
    return {
        ...vendor,
        id: vendor.id || '',
        type: 'vendor',
        name: vendor.name || vendor.company_name || '',
        credit_rating: vendor.creditRating || 'B',
        status: vendor.status || 'active'
    };
}
export function supplierToPartner(supplier) {
    return {
        ...supplier,
        id: supplier.id || '',
        type: 'supplier',
        credit_rating: supplier.credit_rating || 'B',
        status: supplier.status || 'active'
    };
}
