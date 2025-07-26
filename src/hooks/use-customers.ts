import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "individual" | "corporate";
  status: "active" | "inactive" | "vip";
  totalBookings: number;
  lastBooking: string;
  address?: string;
  preferences?: {
    vehicleType?: string;
    specialRequests?: string[];
  };
  contacts?: {
    primary: string;
    secondary?: string;
  };
  notes?: string;
}

const initialCustomers: Customer[] = [
  {
    id: "CU001",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    type: "individual",
    status: "vip",
    totalBookings: 45,
    lastBooking: "2024-01-25",
    address: "123 Park Avenue, New York, NY 10001",
    preferences: {
      vehicleType: "Luxury Sedan",
      specialRequests: ["Child seat", "Water bottles"]
    },
    contacts: {
      primary: "John Smith",
      secondary: "Jane Smith (spouse)"
    },
    notes: "Prefers punctual service, frequently travels to airports"
  },
  {
    id: "CU002",
    name: "Tech Corp Inc.",
    email: "bookings@techcorp.com",
    phone: "+1 (555) 987-6543",
    type: "corporate",
    status: "active",
    totalBookings: 128,
    lastBooking: "2024-01-24",
    address: "500 Business Plaza, Manhattan, NY 10005",
    preferences: {
      vehicleType: "Executive Fleet",
      specialRequests: ["Invoice to accounting", "Multiple stops"]
    },
    contacts: {
      primary: "Sarah Johnson (Travel Manager)",
      secondary: "Mike Davis (Assistant)"
    },
    notes: "Large corporate account, handle with priority"
  },
  {
    id: "CU003",
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    phone: "+1 (555) 456-7890",
    type: "individual",
    status: "active",
    totalBookings: 12,
    lastBooking: "2024-01-20",
    address: "789 Broadway, New York, NY 10003",
    preferences: {
      vehicleType: "Standard Sedan"
    },
    contacts: {
      primary: "Emma Wilson"
    },
    notes: "Regular weekly bookings for business meetings"
  }
];

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const { toast } = useToast();

  const createCustomer = useCallback((newCustomer: Omit<Customer, 'id' | 'totalBookings' | 'lastBooking'>) => {
    const id = `CU${String(customers.length + 1).padStart(3, '0')}`;
    const customer: Customer = { 
      ...newCustomer, 
      id, 
      totalBookings: 0, 
      lastBooking: new Date().toISOString().split('T')[0] 
    };
    setCustomers(prev => [...prev, customer]);
    toast({
      title: "Customer Created",
      description: `Customer ${customer.name} has been successfully created.`,
    });
    return customer;
  }, [customers.length, toast]);

  const updateCustomer = useCallback((id: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id ? { ...customer, ...updates } : customer
    ));
    toast({
      title: "Customer Updated",
      description: `Customer has been successfully updated.`,
    });
  }, [toast]);

  const deleteCustomer = useCallback((id: string) => {
    const customer = customers.find(c => c.id === id);
    setCustomers(prev => prev.filter(customer => customer.id !== id));
    toast({
      title: "Customer Deleted",
      description: `Customer ${customer?.name} has been successfully deleted.`,
      variant: "destructive",
    });
  }, [customers, toast]);

  const getCustomer = useCallback((id: string) => {
    return customers.find(customer => customer.id === id);
  }, [customers]);

  const filterCustomers = useCallback((filters: {
    search?: string;
    type?: string;
    status?: string;
  }) => {
    return customers.filter(customer => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!customer.name.toLowerCase().includes(searchLower) &&
            !customer.email.toLowerCase().includes(searchLower) &&
            !customer.id.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      
      if (filters.type && customer.type !== filters.type) {
        return false;
      }

      if (filters.status && customer.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [customers]);

  return {
    customers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomer,
    filterCustomers,
  };
}