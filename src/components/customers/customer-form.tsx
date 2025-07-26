import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { Customer } from '@/hooks/use-customers';

interface CustomerFormProps {
  customer?: Customer;
  onSubmit: (customer: Omit<Customer, 'id' | 'totalBookings' | 'lastBooking'>) => void;
  onCancel: () => void;
}

export function CustomerForm({ customer, onSubmit, onCancel }: CustomerFormProps) {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    type: customer?.type || 'individual' as const,
    status: customer?.status || 'active' as const,
    address: customer?.address || '',
    preferences: {
      vehicleType: customer?.preferences?.vehicleType || '',
      specialRequests: customer?.preferences?.specialRequests || []
    },
    contacts: {
      primary: customer?.contacts?.primary || '',
      secondary: customer?.contacts?.secondary || ''
    },
    notes: customer?.notes || ''
  });

  const [newRequest, setNewRequest] = useState('');

  const addSpecialRequest = () => {
    if (newRequest.trim()) {
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          specialRequests: [...prev.preferences.specialRequests, newRequest.trim()]
        }
      }));
      setNewRequest('');
    }
  };

  const removeSpecialRequest = (index: number) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        specialRequests: prev.preferences.specialRequests.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Customer Type</Label>
            <Select value={formData.type} onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="primaryContact">Primary Contact</Label>
            <Input
              id="primaryContact"
              value={formData.contacts.primary}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                contacts: { ...prev.contacts, primary: e.target.value }
              }))}
              required
            />
          </div>

          {formData.type === 'corporate' && (
            <div>
              <Label htmlFor="secondaryContact">Secondary Contact</Label>
              <Input
                id="secondaryContact"
                value={formData.contacts.secondary}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  contacts: { ...prev.contacts, secondary: e.target.value }
                }))}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="vehicleType">Preferred Vehicle Type</Label>
            <Input
              id="vehicleType"
              value={formData.preferences.vehicleType}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                preferences: { ...prev.preferences, vehicleType: e.target.value }
              }))}
              placeholder="e.g., Luxury Sedan, SUV, etc."
            />
          </div>

          <div>
            <Label>Special Requests</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newRequest}
                onChange={(e) => setNewRequest(e.target.value)}
                placeholder="Add a special request..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialRequest())}
              />
              <Button type="button" onClick={addSpecialRequest} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {formData.preferences.specialRequests.map((request, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {request}
                  <button
                    type="button"
                    onClick={() => removeSpecialRequest(index)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Internal notes about this customer..."
            rows={3}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {customer ? 'Update Customer' : 'Create Customer'}
        </Button>
      </div>
    </form>
  );
}