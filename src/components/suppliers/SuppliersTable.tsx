
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useSuppliers } from "../../hooks/use-suppliers";
import { formatDate } from "../../lib/utils";

export const SuppliersTable: React.FC = () => {
  const navigate = useNavigate();
  const { data: suppliers, isLoading } = useSuppliers();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Suppliers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            Loading suppliers...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suppliers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Credit Rating</TableHead>
              <TableHead>Performance Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers?.map((supplier) => (
              <TableRow
                key={supplier.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => navigate(`/beta1/suppliers/${supplier.id}`)}
              >
                <TableCell className="font-medium hover:text-blue-600 hover:underline">
                  {supplier.name}
                </TableCell>
                <TableCell>{supplier.code}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${
                      supplier.creditRating?.rating === 'A' ? 'text-green-600' :
                      supplier.creditRating?.rating === 'B' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {supplier.creditRating?.rating || 'N/A'}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({supplier.creditRating?.score || 'N/A'})
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${
                      (supplier.performance?.overall || 0) >= 90 ? 'text-green-600' :
                      (supplier.performance?.overall || 0) >= 70 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {supplier.performance?.overall || 'N/A'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    supplier.status === 'active' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {supplier.status}
                  </span>
                </TableCell>
                <TableCell>
                  {supplier.updated_at ? formatDate(supplier.updated_at) : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
