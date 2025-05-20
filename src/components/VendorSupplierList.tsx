import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from './ui/table';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { usePartners } from '../hooks/usePartners';
import { Partner } from '../types/partners';
import { Badge } from './ui/badge';
import { Star, AlertCircle, CheckCircle } from 'lucide-react';

export const VendorSupplierList = () => {
  const navigate = useNavigate();
  const { partners, loading, error } = usePartners();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
      inactive: { color: 'bg-red-100 text-red-800', icon: AlertCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config?.icon;

    return (
      <Badge variant="outline" className={`${config?.color} flex items-center gap-1`}>
        {Icon && <Icon className="h-3 w-3" />}
        <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
      </Badge>
    );
  };

  const getPartnerTypeIcon = (type: Partner['type']) => {
    return type === 'vendor' ? (
      <Star className="h-4 w-4 text-blue-500" />
    ) : (
      <Star className="h-4 w-4 text-green-500" />
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading partners: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Partners Directory</CardTitle>
          <Button onClick={() => navigate('/partner/new')}>
            Add New Partner
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell className="font-medium">{partner.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getPartnerTypeIcon(partner.type)}
                      <span className="capitalize">{partner.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(partner.status)}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <a href={`mailto:${partner.contactEmail}`} className="text-sm hover:underline">
                        {partner.contactEmail}
                      </a>
                      <span className="text-sm text-muted-foreground">
                        {partner.contactPhone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {partner.type === 'vendor' && (
                      <div className="text-sm">
                        Credit Score: {(partner as any).creditScore || 'N/A'}
                      </div>
                    )}
                    {partner.type === 'supplier' && (
                      <div className="text-sm">
                        Files: {(partner as any).uploadedFiles?.length || 0}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/partner/${partner.id}`)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
