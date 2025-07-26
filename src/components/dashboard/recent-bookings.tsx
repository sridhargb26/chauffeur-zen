import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    vehicle: "Mercedes S-Class"
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
    vehicle: "BMW 7 Series"
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
    vehicle: "Mercedes Sprinter"
  }
];

const statusColors = {
  confirmed: "bg-accent text-accent-foreground",
  "in-progress": "bg-primary text-primary-foreground",
  completed: "bg-success text-success-foreground",
  cancelled: "bg-destructive text-destructive-foreground"
};

export function RecentBookings() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Bookings</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-medium">{booking.id}</span>
                  <Badge className={statusColors[booking.status]}>
                    {booking.status.replace("-", " ")}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p><strong>Customer:</strong> {booking.customer}</p>
                  <p><strong>Route:</strong> {booking.pickup} → {booking.destination}</p>
                  <p><strong>Schedule:</strong> {booking.date} at {booking.time}</p>
                  {booking.driver && (
                    <p><strong>Driver:</strong> {booking.driver} • {booking.vehicle}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}