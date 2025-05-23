import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouteGuard } from '../utils/rbac/RouteGuard';
import { Permission } from '../utils/rbac/permissions';

// Lazy-loaded components for better performance
const ProductsHome = lazy(() => import('../pages/products/ProductsHome'));
const ProductCatalog = lazy(() => import('../pages/products/ProductCatalog'));
const ProductManagement = lazy(() => import('../pages/products/ProductManagement'));
const ProductPricing = lazy(() => import('../pages/products/ProductPricing'));
const ProductInventory = lazy(() => import('../pages/products/ProductInventory'));
const ProductSettings = lazy(() => import('../pages/products/ProductSettings'));

// Loading fallback for lazy-loaded components
const LoadingFallback = () => <div className="loading-spinner">Loading...</div>;

/**
 * Product Management routes
 */
export const ProductsRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={
          <RouteGuard requiredPermissions={Permission.PRODUCT_VIEW}>
            <ProductsHome />
          </RouteGuard>
        } />
        
        <Route path="/catalog" element={
          <RouteGuard requiredPermissions={Permission.PRODUCT_VIEW}>
            <ProductCatalog />
          </RouteGuard>
        } />
        
        <Route path="/management" element={
          <RouteGuard requiredPermissions={Permission.PRODUCT_EDIT}>
            <ProductManagement />
          </RouteGuard>
        } />
        
        <Route path="/pricing" element={
          <RouteGuard requiredPermissions={Permission.PRODUCT_EDIT}>
            <ProductPricing />
          </RouteGuard>
        } />
        
        <Route path="/inventory" element={
          <RouteGuard requiredPermissions={Permission.PRODUCT_EDIT}>
            <ProductInventory />
          </RouteGuard>
        } />
        
        <Route path="/settings" element={
          <RouteGuard requiredPermissions={Permission.PRODUCT_EDIT}>
            <ProductSettings />
          </RouteGuard>
        } />
      </Routes>
    </Suspense>
  );
};

export default ProductsRoutes;