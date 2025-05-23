import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface OdooConnectionFormProps {
  onSubmit: (data: any) => void;
  initialValues?: {
    url: string;
    username: string;
    password?: string;
    api_key?: string;
    database: string;
    auth_method: 'credentials' | 'api_key';
  };
}

const OdooConnectionForm = ({ onSubmit, initialValues }: OdooConnectionFormProps) => {
  const [formData, setFormData] = useState({
    url: initialValues?.url || '',
    username: initialValues?.username || '',
    password: initialValues?.password || '',
    api_key: initialValues?.api_key || '',
    database: initialValues?.database || '',
    db_name: initialValues?.database || '', // Alias for database
    auth_method: initialValues?.auth_method || 'credentials',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="url">Odoo Server URL</Label>
          <Input
            id="url"
            placeholder="https://myodoo.example.com"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="database">Database Name</Label>
          <Input
            id="database"
            placeholder="odoo_production"
            value={formData.db_name}
            onChange={(e) => setFormData({ ...formData, db_name: e.target.value, database: e.target.value })}
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            The database name for your Odoo instance
          </p>
        </div>
        
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="admin"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label>Authentication Method</Label>
          <Select value={formData.auth_method} onValueChange={(value) => setFormData({ ...formData, auth_method: value as 'credentials' | 'api_key' })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select auth method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credentials">Credentials</SelectItem>
              <SelectItem value="api_key">API Key</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.auth_method === 'credentials' ? (
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
        ) : (
          <div>
            <Label htmlFor="api_key">API Key</Label>
            <Input
              id="api_key"
              type="password"
              value={formData.api_key}
              onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
              required
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          Save Connection
        </Button>
      </div>
    </form>
  );
};

export default OdooConnectionForm;
