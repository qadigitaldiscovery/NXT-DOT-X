import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useVendors } from '@/hooks/useVendorDetail';
import { getCreditRating } from '@/utils/vendorCalculations';

export function VendorsList() {
  const { data: vendors, isLoading, error } = useVendors();
  const navigate = useNavigate();
  
  if (isLoading) {
    return <div className="text-center py-8">Loading vendors...</div>;
  }
  
  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading vendors</div>;
  }
  
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Healthcare Suppliers</h2>
        <Button onClick={() => navigate('/data-management/supplier-vendors/new')}>Add New Partner</Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Local Score</TableHead>
              <TableHead>Risk Rating</TableHead>
              <TableHead>Created</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No vendors found. Get started by adding your first supplier.
                </TableCell>
              </TableRow>
            ) : (
              vendors?.map((vendor) => {
                // Get rating for each vendor based on local score
                const [ratingCode, riskDesc] = vendor.local_score 
                  ? getCreditRating(vendor.local_score) 
                  : ['N/A', 'Not Assessed'];
                
                return (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-medium">{vendor.company_name}</TableCell>
                    <TableCell>{vendor.local_score ?? 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs text-white
                          ${ratingCode === 'A' ? 'bg-green-500' : 
                            ratingCode === 'B' ? 'bg-lime-500' :
                            ratingCode === 'C' ? 'bg-yellow-500' :
                            ratingCode === 'D' ? 'bg-orange-500' :
                            ratingCode === 'E' ? 'bg-red-500' : 'bg-gray-400'}`}>
                          {ratingCode}
                        </span>
                        <span>{riskDesc}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {vendor.created_at 
                        ? new Date(vendor.created_at).toLocaleDateString() 
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" onClick={() => navigate(`/data-management/supplier-vendors?id=${vendor.id}&type=vendor`)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
