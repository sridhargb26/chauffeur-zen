import { useState } from 'react';
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Search, Filter, Calendar, MapPin, User, Car, Edit, Eye, Trash2 } from "lucide-react";
import { useBookings, Booking } from '@/hooks/use-bookings';
import { BookingForm } from '@/components/bookings/booking-form';


const statusColors = {
  confirmed: "bg-accent text-accent-foreground",
  "in-progress": "bg-primary text-primary-foreground",
  completed: "bg-success text-success-foreground",
  cancelled: "bg-destructive text-destructive-foreground"
};

export function BookingsPage() {
  const { bookings, createBooking, updateBooking, deleteBooking, filterBookings } = useBookings();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);

  const filteredBookings = filterBookings({
    search: searchTerm,
    status: statusFilter || undefined,
  });

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsFormOpen(true);
  };

  const handleDelete = (bookingId: string) => {
    setBookingToDelete(bookingId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (bookingToDelete) {
      deleteBooking(bookingToDelete);
      setBookingToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleFormSubmit = (bookingData: Omit<Booking, 'id'>) => {
    if (selectedBooking) {
      updateBooking(selectedBooking.id, bookingData);
    } else {
      createBooking(bookingData);
    }
    setIsFormOpen(false);
    setSelectedBooking(null);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setSelectedBooking(null);
  };
  return (
    <MainLayout title="Bookings Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search bookings..." 
                className="pl-10 w-80" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Booking
          </Button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      {booking.id}
                      <Badge className={statusColors[booking.status]}>
                        {booking.status.replace("-", " ")}
                      </Badge>
                    </CardTitle>
                    <p className="text-muted-foreground mt-1">{booking.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${booking.totalAmount}</p>
                    <p className="text-sm text-muted-foreground">{booking.date} • {booking.time}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Route Information */}
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Route
                    </h4>
                    {booking.legs.map((leg) => (
                      <div key={leg.id} className="text-sm text-muted-foreground">
                        <p>#{leg.sequence}: {leg.pickup} → {leg.destination}</p>
                        <p className="text-xs">Est. {leg.estimatedDuration}</p>
                      </div>
                    ))}
                  </div>

                  {/* Driver & Vehicle */}
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Assignment
                    </h4>
                    {booking.driver && (
                      <div className="text-sm text-muted-foreground">
                        <p>Driver: {booking.driver}</p>
                        <p className="flex items-center gap-1">
                          <Car className="w-3 h-3" />
                          {booking.vehicle}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 md:justify-end">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(booking)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(booking.id)}>
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create/Edit Booking Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedBooking ? 'Edit Booking' : 'Create New Booking'}
              </DialogTitle>
            </DialogHeader>
            <BookingForm
              booking={selectedBooking || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the booking.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
}

export default BookingsPage;