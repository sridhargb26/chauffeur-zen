import { useState } from 'react';
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Search, Car, Edit, Eye, Trash2, Fuel, MapPin } from "lucide-react";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  license: string;
  vin: string;
  status: "available" | "in-use" | "maintenance" | "retired";
  type: "sedan" | "suv" | "luxury" | "van" | "limousine";
  capacity: number;
  mileage: number;
  lastService: string;
  nextService: string;
  driver?: string;
  location?: string;
}

const mockVehicles: Vehicle[] = [
  {
    id: "V001",
    make: "Mercedes-Benz",
    model: "S-Class",
    year: 2023,
    license: "ABC-123",
    vin: "WDD2222221A123456",
    status: "available",
    type: "luxury",
    capacity: 4,
    mileage: 15420,
    lastService: "2024-01-15",
    nextService: "2024-04-15",
    location: "Manhattan Depot"
  },
  {
    id: "V002", 
    make: "BMW",
    model: "7 Series",
    year: 2022,
    license: "XYZ-789",
    vin: "WBA7F2C51HG123456",
    status: "in-use",
    type: "luxury",
    capacity: 4,
    mileage: 28540,
    lastService: "2024-01-10",
    nextService: "2024-04-10",
    driver: "David Wilson",
    location: "LaGuardia Airport"
  },
  {
    id: "V003",
    make: "Mercedes-Benz",
    model: "Sprinter",
    year: 2023,
    license: "VAN-456",
    vin: "WD3PE8CD5F5123456",
    status: "maintenance",
    type: "van",
    capacity: 14,
    mileage: 22100,
    lastService: "2024-01-20",
    nextService: "2024-02-20"
  }
];

const statusColors = {
  available: "bg-success text-success-foreground",
  "in-use": "bg-primary text-primary-foreground", 
  maintenance: "bg-warning text-warning-foreground",
  retired: "bg-muted text-muted-foreground"
};

const typeColors = {
  sedan: "bg-blue-100 text-blue-800",
  suv: "bg-green-100 text-green-800",
  luxury: "bg-purple-100 text-purple-800",
  van: "bg-orange-100 text-orange-800",
  limousine: "bg-pink-100 text-pink-800"
};

export function FleetPage() {
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = !searchTerm || 
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.license.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || vehicle.status === statusFilter;
    const matchesType = !typeFilter || vehicle.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const fleetStats = {
    total: vehicles.length,
    available: vehicles.filter(v => v.status === 'available').length,
    inUse: vehicles.filter(v => v.status === 'in-use').length,
    maintenance: vehicles.filter(v => v.status === 'maintenance').length
  };

  return (
    <MainLayout title="Fleet Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search vehicles..." 
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
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="in-use">In Use</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="van">Van</SelectItem>
                <SelectItem value="limousine">Limousine</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Vehicle
          </Button>
        </div>

        {/* Fleet Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{fleetStats.total}</div>
              <p className="text-sm text-muted-foreground">Total Vehicles</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">{fleetStats.available}</div>
              <p className="text-sm text-muted-foreground">Available</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{fleetStats.inUse}</div>
              <p className="text-sm text-muted-foreground">In Use</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">{fleetStats.maintenance}</div>
              <p className="text-sm text-muted-foreground">Maintenance</p>
            </CardContent>
          </Card>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Car className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{vehicle.make} {vehicle.model}</CardTitle>
                      <p className="text-muted-foreground text-sm">{vehicle.year} • {vehicle.license}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge className={statusColors[vehicle.status]}>
                      {vehicle.status.replace("-", " ")}
                    </Badge>
                    <Badge className={typeColors[vehicle.type]} variant="outline">
                      {vehicle.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="ml-2 font-medium">{vehicle.capacity} passengers</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Mileage:</span>
                      <span className="ml-2 font-medium">{vehicle.mileage.toLocaleString()} mi</span>
                    </div>
                  </div>

                  {vehicle.driver && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Driver:</span>
                      <span className="ml-2 font-medium">{vehicle.driver}</span>
                    </div>
                  )}

                  {vehicle.location && (
                    <div className="text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{vehicle.location}</span>
                    </div>
                  )}

                  <div className="text-sm">
                    <span className="text-muted-foreground">Next Service:</span>
                    <span className="ml-2 font-medium">{vehicle.nextService}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No vehicles found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default FleetPage;