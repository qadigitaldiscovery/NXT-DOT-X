import React from 'react';

const ProductsHome: React.FC = () => {
  return (
    <div className="module-container">
      <h1>Products Home</h1>
      <p>Welcome to the Products Management Hub. This is the main overview for all product-related activities.</p>
      <ul>
        <li><a href="/products/catalog">Product Catalog</a></li>
        <li><a href="/products/management">Product Management</a></li>
        <li><a href="/products/pricing">Product Pricing</a></li>
        <li><a href="/products/inventory">Product Inventory</a></li>
        <li><a href="/products/settings">Product Settings</a></li>
      </ul>
    </div>
  );
};

export default ProductsHome;