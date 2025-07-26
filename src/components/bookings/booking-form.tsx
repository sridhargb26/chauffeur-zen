import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus } from 'lucide-react';
import { Booking, BookingLeg } from '@/hooks/use-bookings';

interface BookingFormProps {
  booking?: Booking;
  onSubmit: (booking: Omit<Booking, 'id'>) => void;
  onCancel: () => void;
}

export function BookingForm({ booking, onSubmit, onCancel }: BookingFormProps) {
  const [formData, setFormData] = useState({
    customer: booking?.customer || '',
    customerPhone: booking?.customerPhone || '',
    pickup: booking?.pickup || '',
    destination: booking?.destination || '',
    date: booking?.date || '',
    time: booking?.time || '',
    status: booking?.status || 'confirmed' as const,
    driver: booking?.driver || '',
    vehicle: booking?.vehicle || '',
    totalAmount: booking?.totalAmount || 0,
    notes: booking?.notes || '',
    legs: booking?.legs || [
      {
        id: 'L001',
        sequence: 1,
        pickup: '',
        destination: '',
        estimatedDuration: '',
        status: 'pending' as const
      }
    ]
  });

  const addLeg = () => {
    const newLeg: BookingLeg = {
      id: `L${String(formData.legs.length + 1).padStart(3, '0')}`,
      sequence: formData.legs.length + 1,
      pickup: '',
      destination: '',
      estimatedDuration: '',
      status: 'pending'
    };
    setFormData(prev => ({ ...prev, legs: [...prev.legs, newLeg] }));
  };

  const removeLeg = (index: number) => {
    if (formData.legs.length > 1) {
      setFormData(prev => ({
        ...prev,
        legs: prev.legs.filter((_, i) => i !== index)
      }));
    }
  };

  const updateLeg = (index: number, field: keyof BookingLeg, value: string) => {
    setFormData(prev => ({
      ...prev,
      legs: prev.legs.map((leg, i) => 
        i === index ? { ...leg, [field]: value } : leg
      )
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
            <Label htmlFor="customer">Customer Name</Label>
            <Input
              id="customer"
              value={formData.customer}
              onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="customerPhone">Customer Phone</Label>
            <Input
              id="customerPhone"
              value={formData.customerPhone}
              onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="totalAmount">Total Amount ($)</Label>
            <Input
              id="totalAmount"
              type="number"
              value={formData.totalAmount}
              onChange={(e) => setFormData(prev => ({ ...prev, totalAmount: Number(e.target.value) }))}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assignment</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="driver">Driver</Label>
            <Input
              id="driver"
              value={formData.driver}
              onChange={(e) => setFormData(prev => ({ ...prev, driver: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="vehicle">Vehicle</Label>
            <Input
              id="vehicle"
              value={formData.vehicle}
              onChange={(e) => setFormData(prev => ({ ...prev, vehicle: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Route Details</CardTitle>
            <Button type="button" onClick={addLeg} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Leg
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.legs.map((leg, index) => (
            <div key={leg.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Leg {leg.sequence}</h4>
                {formData.legs.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeLeg(index)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label>Pickup Location</Label>
                  <Input
                    value={leg.pickup}
                    onChange={(e) => updateLeg(index, 'pickup', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label>Destination</Label>
                  <Input
                    value={leg.destination}
                    onChange={(e) => updateLeg(index, 'destination', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label>Estimated Duration</Label>
                  <Input
                    value={leg.estimatedDuration}
                    onChange={(e) => updateLeg(index, 'estimatedDuration', e.target.value)}
                    placeholder="e.g., 30 min"
                  />
                </div>
              </div>
            </div>
          ))}
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
            placeholder="Special requests, notes, or instructions..."
            rows={3}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {booking ? 'Update Booking' : 'Create Booking'}
        </Button>
      </div>
    </form>
  );
}