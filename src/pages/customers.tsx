import { useState } from 'react';
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Search, Filter, Building, User, Phone, Mail, Edit, Eye, Trash2 } from "lucide-react";
import { useCustomers, Customer } from '@/hooks/use-customers';
import { CustomerForm } from '@/components/customers/customer-form';


const statusColors = {
  active: "bg-success text-success-foreground",
  inactive: "bg-muted text-muted-foreground",
  vip: "bg-accent text-accent-foreground"
};

export function CustomersPage() {
  const { customers, createCustomer, updateCustomer, deleteCustomer, filterCustomers } = useCustomers();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);

  const filteredCustomers = filterCustomers({
    search: searchTerm,
    type: typeFilter || undefined,
    status: statusFilter || undefined,
  });

  const customerStats = {
    total: customers.length,
    corporate: customers.filter(c => c.type === 'corporate').length,
    vip: customers.filter(c => c.status === 'vip').length,
    retention: 95 // This would be calculated from actual data
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  };

  const handleDelete = (customerId: string) => {
    setCustomerToDelete(customerId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (customerToDelete) {
      deleteCustomer(customerToDelete);
      setCustomerToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleFormSubmit = (customerData: Omit<Customer, 'id' | 'totalBookings' | 'lastBooking'>) => {
    if (selectedCustomer) {
      updateCustomer(selectedCustomer.id, customerData);
    } else {
      createCustomer(customerData);
    }
    setIsFormOpen(false);
    setSelectedCustomer(null);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setSelectedCustomer(null);
  };
  return (
    <MainLayout title="Customer Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search customers..." 
                className="pl-10 w-80" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{customerStats.total}</div>
              <p className="text-sm text-muted-foreground">Total Customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{customerStats.corporate}</div>
              <p className="text-sm text-muted-foreground">Corporate Accounts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{customerStats.vip}</div>
              <p className="text-sm text-muted-foreground">VIP Customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{customerStats.retention}%</div>
              <p className="text-sm text-muted-foreground">Customer Retention</p>
            </CardContent>
          </Card>
        </div>

        {/* Customers List */}
        <div className="space-y-4">
          {filteredCustomers.map((customer) => (
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
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(customer)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(customer.id)}>
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
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

        {/* Create/Edit Customer Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedCustomer ? 'Edit Customer' : 'Create New Customer'}
              </DialogTitle>
            </DialogHeader>
            <CustomerForm
              customer={selectedCustomer || undefined}
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
                This action cannot be undone. This will permanently delete the customer and all associated data.
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

export default CustomersPage;