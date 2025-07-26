import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Building, User, Phone, Mail } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "individual" | "corporate";
  status: "active" | "inactive" | "vip";
  totalBookings: number;
  lastBooking: string;
  preferences?: {
    vehicleType?: string;
    specialRequests?: string[];
  };
  contacts?: {
    primary: string;
    secondary?: string;
  };
}

const mockCustomers: Customer[] = [
  {
    id: "CU001",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    type: "individual",
    status: "vip",
    totalBookings: 45,
    lastBooking: "2024-01-25",
    preferences: {
      vehicleType: "Luxury Sedan",
      specialRequests: ["Child seat", "Water bottles"]
    },
    contacts: {
      primary: "John Smith",
      secondary: "Jane Smith (spouse)"
    }
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
    preferences: {
      vehicleType: "Executive Fleet",
      specialRequests: ["Invoice to accounting", "Multiple stops"]
    },
    contacts: {
      primary: "Sarah Johnson (Travel Manager)",
      secondary: "Mike Davis (Assistant)"
    }
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
    preferences: {
      vehicleType: "Standard Sedan"
    },
    contacts: {
      primary: "Emma Wilson"
    }
  }
];

const statusColors = {
  active: "bg-success text-success-foreground",
  inactive: "bg-muted text-muted-foreground",
  vip: "bg-accent text-accent-foreground"
};

export function CustomersPage() {
  return (
    <MainLayout title="Customer Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search customers..." className="pl-10 w-80" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-sm text-muted-foreground">Total Customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">156</div>
              <p className="text-sm text-muted-foreground">Corporate Accounts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">89</div>
              <p className="text-sm text-muted-foreground">VIP Customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">95%</div>
              <p className="text-sm text-muted-foreground">Customer Retention</p>
            </CardContent>
          </Card>
        </div>

        {/* Customers List */}
        <div className="space-y-4">
          {mockCustomers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      {customer.type === "corporate" ? (
                        <Building className="w-6 h-6 text-primary-foreground" />
                      ) : (
                        <User className="w-6 h-6 text-primary-foreground" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        {customer.name}
                        <Badge className={statusColors[customer.status]}>
                          {customer.status.toUpperCase()}
                        </Badge>
                        {customer.type === "corporate" && (
                          <Badge variant="outline">Corporate</Badge>
                        )}
                      </CardTitle>
                      <p className="text-muted-foreground">{customer.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{customer.totalBookings} bookings</p>
                    <p className="text-sm text-muted-foreground">Last: {customer.lastBooking}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Contact Information */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Contact Information</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {customer.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {customer.phone}
                      </p>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Preferences</h4>
                    <div className="text-sm text-muted-foreground">
                      {customer.preferences?.vehicleType && (
                        <p>Vehicle: {customer.preferences.vehicleType}</p>
                      )}
                      {customer.preferences?.specialRequests && (
                        <p>Special: {customer.preferences.specialRequests.join(", ")}</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 md:justify-end">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button variant="outline" size="sm">New Booking</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>

                {/* Multiple Contacts for Corporate */}
                {customer.type === "corporate" && customer.contacts && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <h4 className="font-medium mb-2">Contacts</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>Primary: {customer.contacts.primary}</p>
                      {customer.contacts.secondary && (
                        <p>Secondary: {customer.contacts.secondary}</p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default CustomersPage;