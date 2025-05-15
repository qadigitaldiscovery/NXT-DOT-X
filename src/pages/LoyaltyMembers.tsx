
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus } from 'lucide-react';

const LoyaltyMembers = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Members</h1>
          <p className="text-muted-foreground">Manage loyalty program members.</p>
        </div>
        
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Add Member</span>
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            className="pl-8"
          />
        </div>
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Export</Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Member Directory</CardTitle>
          <CardDescription>View and manage your loyalty program members.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Email</th>
                  <th className="text-left p-3 font-medium">Points</th>
                  <th className="text-left p-3 font-medium">Tier</th>
                  <th className="text-left p-3 font-medium">Joined</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3">John Doe</td>
                  <td className="p-3">john@example.com</td>
                  <td className="p-3">2,450</td>
                  <td className="p-3">Gold</td>
                  <td className="p-3">Jan 15, 2023</td>
                  <td className="p-3">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Jane Smith</td>
                  <td className="p-3">jane@example.com</td>
                  <td className="p-3">1,280</td>
                  <td className="p-3">Silver</td>
                  <td className="p-3">Mar 22, 2023</td>
                  <td className="p-3">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Robert Johnson</td>
                  <td className="p-3">robert@example.com</td>
                  <td className="p-3">5,670</td>
                  <td className="p-3">Platinum</td>
                  <td className="p-3">Nov 5, 2022</td>
                  <td className="p-3">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoyaltyMembers;
