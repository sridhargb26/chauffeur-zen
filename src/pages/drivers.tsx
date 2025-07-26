import { useState } from 'react';
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, User, Edit, Eye, Phone, Mail, MapPin, Star } from "lucide-react";

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  license: string;
  licenseExpiry: string;
  status: "active" | "inactive" | "on-break" | "off-duty";
  rating: number;
  totalTrips: number;
  yearsExperience: number;
  languages: string[];
  currentLocation?: string;
  assignedVehicle?: string;
  availability: "available" | "busy" | "unavailable";
}

const mockDrivers: Driver[] = [
  {
    id: "D001",
    name: "Michael Johnson",
    email: "michael.j@luxeride.com",
    phone: "+1 (555) 234-5678",
    license: "DL-123456789",
    licenseExpiry: "2025-06-15",
    status: "active",
    rating: 4.9,
    totalTrips: 1247,
    yearsExperience: 8,
    languages: ["English", "Spanish"],
    currentLocation: "Manhattan",
    assignedVehicle: "Mercedes S-Class (ABC-123)",
    availability: "available"
  },
  {
    id: "D002",
    name: "David Wilson",
    email: "david.w@luxeride.com", 
    phone: "+1 (555) 345-6789",
    license: "DL-987654321",
    licenseExpiry: "2024-11-20",
    status: "active",
    rating: 4.8,
    totalTrips: 892,
    yearsExperience: 5,
    languages: ["English", "French"],
    currentLocation: "LaGuardia Airport",
    assignedVehicle: "BMW 7 Series (XYZ-789)",
    availability: "busy"
  },
  {
    id: "D003",
    name: "Robert Brown",
    email: "robert.b@luxeride.com",
    phone: "+1 (555) 456-7890", 
    license: "DL-456789123",
    licenseExpiry: "2025-02-10",
    status: "on-break",
    rating: 4.7,
    totalTrips: 634,
    yearsExperience: 3,
    languages: ["English"],
    currentLocation: "Brooklyn",
    assignedVehicle: "Mercedes Sprinter (VAN-456)",
    availability: "unavailable"
  }
];

const statusColors = {
  active: "bg-success text-success-foreground",
  inactive: "bg-muted text-muted-foreground",
  "on-break": "bg-warning text-warning-foreground",
  "off-duty": "bg-destructive text-destructive-foreground"
};

const availabilityColors = {
  available: "bg-success text-success-foreground",
  busy: "bg-primary text-primary-foreground",
  unavailable: "bg-muted text-muted-foreground"
};

export function DriversPage() {
  const [drivers] = useState<Driver[]>(mockDrivers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = !searchTerm || 
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.license.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || driver.status === statusFilter;
    const matchesAvailability = !availabilityFilter || driver.availability === availabilityFilter;
    
    return matchesSearch && matchesStatus && matchesAvailability;
  });

  const driverStats = {
    total: drivers.length,
    active: drivers.filter(d => d.status === 'active').length,
    available: drivers.filter(d => d.availability === 'available').length,
    avgRating: drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length
  };

  return (
    <MainLayout title="Driver Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search drivers..." 
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on-break">On Break</SelectItem>
                <SelectItem value="off-duty">Off Duty</SelectItem>
              </SelectContent>
            </Select>
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Availability</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Driver
          </Button>
        </div>

        {/* Driver Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{driverStats.total}</div>
              <p className="text-sm text-muted-foreground">Total Drivers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">{driverStats.active}</div>
              <p className="text-sm text-muted-foreground">Active Drivers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{driverStats.available}</div>
              <p className="text-sm text-muted-foreground">Available Now</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold flex items-center gap-1">
                {driverStats.avgRating.toFixed(1)}
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              </div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Drivers List */}
        <div className="space-y-4">
          {filteredDrivers.map((driver) => (
            <Card key={driver.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        {driver.name}
                        <Badge className={statusColors[driver.status]}>
                          {driver.status.replace("-", " ")}
                        </Badge>
                        <Badge className={availabilityColors[driver.availability]}>
                          {driver.availability}
                        </Badge>
                      </CardTitle>
                      <p className="text-muted-foreground">{driver.id} • {driver.license}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{driver.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{driver.totalTrips} trips</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Contact Information */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Contact</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {driver.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {driver.phone}
                      </p>
                    </div>
                  </div>

                  {/* Experience & Languages */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Experience</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>{driver.yearsExperience} years</p>
                      <p>Languages: {driver.languages.join(", ")}</p>
                      <p>License expires: {driver.licenseExpiry}</p>
                    </div>
                  </div>

                  {/* Current Status */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Current Status</h4>
                    <div className="text-sm text-muted-foreground">
                      {driver.currentLocation && (
                        <p className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {driver.currentLocation}
                        </p>
                      )}
                      {driver.assignedVehicle && (
                        <p>Vehicle: {driver.assignedVehicle}</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 md:justify-end">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDrivers.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No drivers found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default DriversPage;