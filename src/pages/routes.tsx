import { useState } from 'react';
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, MapPin, Clock, Route, Edit, Eye } from "lucide-react";

interface RouteStop {
  id: string;
  name: string;
  address: string;
  estimatedTime: string;
  type: "pickup" | "destination" | "waypoint";
}

interface SavedRoute {
  id: string;
  name: string;
  description: string;
  category: "airport" | "hotel" | "business" | "custom";
  stops: RouteStop[];
  totalDistance: string;
  estimatedDuration: string;
  frequency: number; // how often used
  lastUsed: string;
  status: "active" | "archived";
}

const mockRoutes: SavedRoute[] = [
  {
    id: "R001",
    name: "JFK to Manhattan Hotels",
    description: "Standard route from JFK Airport to major Manhattan hotels",
    category: "airport",
    stops: [
      {
        id: "S001",
        name: "JFK Airport Terminal 1",
        address: "Queens, NY 11430",
        estimatedTime: "0 min",
        type: "pickup"
      },
      {
        id: "S002", 
        name: "Manhattan Financial District",
        address: "Wall Street, NY 10005",
        estimatedTime: "45 min",
        type: "waypoint"
      },
      {
        id: "S003",
        name: "Manhattan Hotel District",
        address: "Midtown, NY 10019",
        estimatedTime: "55 min", 
        type: "destination"
      }
    ],
    totalDistance: "18.2 miles",
    estimatedDuration: "55-75 min",
    frequency: 156,
    lastUsed: "2024-01-26",
    status: "active"
  },
  {
    id: "R002",
    name: "Corporate Shuttle Route",
    description: "Daily shuttle between corporate offices",
    category: "business",
    stops: [
      {
        id: "S004",
        name: "Tech Corp HQ",
        address: "500 Business Plaza, NY 10005",
        estimatedTime: "0 min",
        type: "pickup"
      },
      {
        id: "S005",
        name: "Financial Center",
        address: "200 Liberty Street, NY 10281",
        estimatedTime: "15 min",
        type: "waypoint"
      },
      {
        id: "S006",
        name: "Conference Center",
        address: "Jacob K. Javits Center, NY 10001",
        estimatedTime: "30 min",
        type: "destination"
      }
    ],
    totalDistance: "8.5 miles",
    estimatedDuration: "30-45 min",
    frequency: 89,
    lastUsed: "2024-01-25",
    status: "active"
  },
  {
    id: "R003",
    name: "Grand Tour Route",
    description: "Premium sightseeing tour of NYC landmarks",
    category: "custom",
    stops: [
      {
        id: "S007",
        name: "Times Square",
        address: "Times Square, NY 10036",
        estimatedTime: "0 min",
        type: "pickup"
      },
      {
        id: "S008",
        name: "Central Park",
        address: "Central Park, NY 10024",
        estimatedTime: "15 min",
        type: "waypoint"
      },
      {
        id: "S009",
        name: "Brooklyn Bridge",
        address: "Brooklyn Bridge, NY 10038",
        estimatedTime: "45 min",
        type: "waypoint"
      },
      {
        id: "S010",
        name: "Statue of Liberty Ferry",
        address: "Battery Park, NY 10004",
        estimatedTime: "75 min",
        type: "destination"
      }
    ],
    totalDistance: "25.3 miles",
    estimatedDuration: "90-120 min",
    frequency: 23,
    lastUsed: "2024-01-20",
    status: "active"
  }
];

const categoryColors = {
  airport: "bg-blue-100 text-blue-800",
  hotel: "bg-green-100 text-green-800", 
  business: "bg-purple-100 text-purple-800",
  custom: "bg-orange-100 text-orange-800"
};

const stopTypeColors = {
  pickup: "bg-success text-success-foreground",
  destination: "bg-destructive text-destructive-foreground", 
  waypoint: "bg-warning text-warning-foreground"
};

export function RoutesPage() {
  const [routes] = useState<SavedRoute[]>(mockRoutes);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = !searchTerm || 
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || route.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const routeStats = {
    total: routes.length,
    active: routes.filter(r => r.status === 'active').length,
    totalUsage: routes.reduce((sum, r) => sum + r.frequency, 0),
    mostUsed: routes.reduce((prev, current) => prev.frequency > current.frequency ? prev : current)
  };

  return (
    <MainLayout title="Route Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search routes..." 
                className="pl-10 w-80" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="airport">Airport</SelectItem>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Route
          </Button>
        </div>

        {/* Route Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{routeStats.total}</div>
              <p className="text-sm text-muted-foreground">Saved Routes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">{routeStats.active}</div>
              <p className="text-sm text-muted-foreground">Active Routes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{routeStats.totalUsage}</div>
              <p className="text-sm text-muted-foreground">Total Usage</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-lg font-bold truncate">{routeStats.mostUsed.name}</div>
              <p className="text-sm text-muted-foreground">Most Popular</p>
            </CardContent>
          </Card>
        </div>

        {/* Routes List */}
        <div className="space-y-4">
          {filteredRoutes.map((route) => (
            <Card key={route.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Route className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        {route.name}
                        <Badge className={categoryColors[route.category]}>
                          {route.category}
                        </Badge>
                      </CardTitle>
                      <p className="text-muted-foreground">{route.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{route.frequency} uses</p>
                    <p className="text-sm text-muted-foreground">Last: {route.lastUsed}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Route Details */}
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Route Details
                    </h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Distance: {route.totalDistance}</p>
                      <p className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Duration: {route.estimatedDuration}
                      </p>
                      <p>Stops: {route.stops.length}</p>
                    </div>
                  </div>

                  {/* Route Stops */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Stops</h4>
                    <div className="space-y-2">
                      {route.stops.slice(0, 3).map((stop, index) => (
                        <div key={stop.id} className="flex items-center gap-2 text-sm">
                          <Badge className={stopTypeColors[stop.type]} variant="outline">
                            {index + 1}
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{stop.name}</p>
                            <p className="text-muted-foreground text-xs truncate">{stop.estimatedTime}</p>
                          </div>
                        </div>
                      ))}
                      {route.stops.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          +{route.stops.length - 3} more stops
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 lg:justify-end">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm">
                      Use Route
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <div className="text-center py-12">
            <Route className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No routes found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default RoutesPage;