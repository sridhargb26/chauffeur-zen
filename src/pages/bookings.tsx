import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Calendar, MapPin, User, Car } from "lucide-react";

interface Booking {
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
}

interface BookingLeg {
  id: string;
  sequence: number;
  pickup: string;
  destination: string;
  estimatedDuration: string;
  status: "pending" | "active" | "completed";
}

const mockBookings: Booking[] = [
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

const statusColors = {
  confirmed: "bg-accent text-accent-foreground",
  "in-progress": "bg-primary text-primary-foreground",
  completed: "bg-success text-success-foreground",
  cancelled: "bg-destructive text-destructive-foreground"
};

export function BookingsPage() {
  return (
    <MainLayout title="Bookings Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search bookings..." className="pl-10 w-80" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Booking
          </Button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {mockBookings.map((booking) => (
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
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default BookingsPage;