
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { vendorDetailTabs } from '@/config/vendorTabs';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TabsContainerProps {
  children: React.ReactNode;
  vendorId: string;
}

export function TabsContainer({ children, vendorId }: TabsContainerProps) {
  const [activeTab, setActiveTab] = useState('data');
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <>
      <Tabs defaultValue="data" value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <div className="border-b">
          <TabsList className="overflow-x-auto w-full justify-start h-auto py-0 bg-transparent">
            {vendorDetailTabs.map((tab) => {
              if (tab.key === 'add') {
                return (
                  <button
                    key={tab.key}
                    onClick={() => setAddDialogOpen(true)}
                    className="ml-auto px-2 py-1 rounded-sm text-sm text-white bg-green-600 hover:bg-green-700 flex items-center"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" /> ADD
                  </button>
                );
              }
              
              return (
                <TabsTrigger
                  key={tab.key}
                  value={tab.key}
                  className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        
        <TabsContent value="data" className="py-4">
          {children}
        </TabsContent>
        
        {/* Placeholders for other tabs */}
        {vendorDetailTabs
          .filter(tab => tab.key !== 'data' && tab.key !== 'add')
          .map(tab => (
            <TabsContent key={tab.key} value={tab.key} className="py-4">
              <div className="text-center py-12 bg-muted/30 rounded-md">
                <h3 className="text-xl font-medium mb-2">{tab.label} Module</h3>
                <p className="text-muted-foreground">
                  This module is part of the complete Healthcare Supplier dashboard.
                </p>
              </div>
            </TabsContent>
          ))}
      </Tabs>
      
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Record</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border rounded hover:bg-muted/50 text-center">
                Add Credit Report
              </button>
              <button className="p-4 border rounded hover:bg-muted/50 text-center">
                Add Performance Data
              </button>
              <button className="p-4 border rounded hover:bg-muted/50 text-center">
                Add Contract
              </button>
              <button className="p-4 border rounded hover:bg-muted/50 text-center">
                Add Message
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
