import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface BookingLeg {
  id: string;
  sequence: number;
  pickup: string;
  destination: string;
  estimatedDuration: string;
  status: "pending" | "active" | "completed";
}

export interface Booking {
  id: string;
  customer: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  status: "confirmed" | "in-progress" | "completed" | "cancelled";
  driver?: string;
  vehicle?: string;
  legs: BookingLeg[];
  totalAmount: number;
  customerPhone?: string;
  notes?: string;
}

const initialBookings: Booking[] = [
  {
    id: "BK001",
    customer: "John Smith",
    pickup: "JFK Airport",
    destination: "Manhattan Hotel",
    date: "2024-01-26",
    time: "14:30",
    status: "confirmed",
    driver: "Michael Johnson",
    vehicle: "Mercedes S-Class",
    totalAmount: 250,
    customerPhone: "+1 (555) 123-4567",
    notes: "VIP customer, provide water bottles",
    legs: [
      {
        id: "L001",
        sequence: 1,
        pickup: "JFK Airport Terminal 1",
        destination: "Manhattan Hotel",
        estimatedDuration: "45 min",
        status: "pending"
      }
    ]
  },
  {
    id: "BK002",
    customer: "Sarah Davis",
    pickup: "Corporate Office",
    destination: "LaGuardia Airport",
    date: "2024-01-26",
    time: "16:00",
    status: "in-progress",
    driver: "David Wilson",
    vehicle: "BMW 7 Series",
    totalAmount: 180,
    customerPhone: "+1 (555) 987-6543",
    legs: [
      {
        id: "L002",
        sequence: 1,
        pickup: "Corporate Office Downtown",
        destination: "LaGuardia Airport",
        estimatedDuration: "35 min",
        status: "active"
      }
    ]
  },
  {
    id: "BK003",
    customer: "Tech Corp Inc.",
    pickup: "Conference Center",
    destination: "Multiple stops",
    date: "2024-01-25",
    time: "18:45",
    status: "completed",
    driver: "Robert Brown",
    vehicle: "Mercedes Sprinter",
    totalAmount: 450,
    customerPhone: "+1 (555) 456-7890",
    legs: [
      {
        id: "L003",
        sequence: 1,
        pickup: "Conference Center",
        destination: "Restaurant Downtown",
        estimatedDuration: "20 min",
        status: "completed"
      },
      {
        id: "L004",
        sequence: 2,
        pickup: "Restaurant Downtown", 
        destination: "Hotel Uptown",
        estimatedDuration: "30 min",
        status: "completed"
      }
    ]
  }
];

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const { toast } = useToast();

  const createBooking = useCallback((newBooking: Omit<Booking, 'id'>) => {
    const id = `BK${String(bookings.length + 1).padStart(3, '0')}`;
    const booking: Booking = { ...newBooking, id };
    setBookings(prev => [...prev, booking]);
    toast({
      title: "Booking Created",
      description: `Booking ${id} has been successfully created.`,
    });
    return booking;
  }, [bookings.length, toast]);

  const updateBooking = useCallback((id: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, ...updates } : booking
    ));
    toast({
      title: "Booking Updated",
      description: `Booking ${id} has been successfully updated.`,
    });
  }, [toast]);

  const deleteBooking = useCallback((id: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
    toast({
      title: "Booking Deleted",
      description: `Booking ${id} has been successfully deleted.`,
      variant: "destructive",
    });
  }, [toast]);

  const getBooking = useCallback((id: string) => {
    return bookings.find(booking => booking.id === id);
  }, [bookings]);

  const filterBookings = useCallback((filters: {
    search?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    return bookings.filter(booking => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!booking.customer.toLowerCase().includes(searchLower) &&
            !booking.id.toLowerCase().includes(searchLower) &&
            !booking.pickup.toLowerCase().includes(searchLower) &&
            !booking.destination.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      
      if (filters.status && booking.status !== filters.status) {
        return false;
      }

      if (filters.dateFrom && booking.date < filters.dateFrom) {
        return false;
      }

      if (filters.dateTo && booking.date > filters.dateTo) {
        return false;
      }

      return true;
    });
  }, [bookings]);

  return {
    bookings,
    createBooking,
    updateBooking,
    deleteBooking,
    getBooking,
    filterBookings,
  };
}