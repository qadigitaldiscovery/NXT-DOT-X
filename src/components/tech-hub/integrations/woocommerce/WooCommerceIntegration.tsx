
import React from 'react';
import { Card } from "../../../../components/ui/card";
import { ShoppingCart } from "lucide-react";
import ConfigurationForm from './ConfigurationForm';
import ConnectionStatus from './ConnectionStatus';
import SyncOptionsCard from './SyncOptionsCard';

const WooCommerceIntegration = () => {
  return (
    <div className="container max-w-4xl mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">WooCommerce Integration</h1>
      <p className="text-muted-foreground">
        Connect your WooCommerce store to synchronize products, orders, and customers.
      </p>
      
      <ConfigurationForm />
      <SyncOptionsCard />
    </div>
  );
}

export default WooCommerceIntegration;
