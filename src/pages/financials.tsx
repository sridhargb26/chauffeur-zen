import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, Filter, Plus } from "lucide-react";

export function FinancialsPage() {
  const financialStats = {
    monthlyRevenue: 245780,
    monthlyExpenses: 89430,
    profit: 156350,
    profitMargin: 63.6,
    outstandingInvoices: 15,
    totalOutstanding: 28450
  };

  const recentTransactions = [
    {
      id: "T001",
      type: "revenue",
      description: "Booking Payment - John Smith",
      amount: 250,
      date: "2024-01-26",
      status: "completed"
    },
    {
      id: "T002", 
      type: "expense",
      description: "Vehicle Maintenance - V001",
      amount: -450,
      date: "2024-01-25",
      status: "completed"
    },
    {
      id: "T003",
      type: "revenue",
      description: "Corporate Account - Tech Corp",
      amount: 1250,
      date: "2024-01-25",
      status: "pending"
    }
  ];

  const outstandingInvoices = [
    {
      id: "INV-001",
      customer: "Tech Corp Inc.",
      amount: 1250,
      dueDate: "2024-02-15",
      status: "pending",
      daysOverdue: 0
    },
    {
      id: "INV-002",
      customer: "Marketing Agency Ltd.",
      amount: 890,
      dueDate: "2024-02-10", 
      status: "overdue",
      daysOverdue: 5
    }
  ];

  return (
    <MainLayout title="Financial Management">
      <div className="space-y-6">
        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-success">
                    ${financialStats.monthlyRevenue.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-destructive">
                    ${financialStats.monthlyExpenses.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Monthly Expenses</p>
                </div>
                <TrendingDown className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    ${financialStats.profit.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Net Profit</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {financialStats.profitMargin}%
                  </div>
                  <p className="text-sm text-muted-foreground">Profit Margin</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="relative">
                  <Input placeholder="Search transactions..." className="w-80" />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Date Range
                </Button>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Transaction
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'revenue' ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'
                        }`}>
                          <DollarSign className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.amount > 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                        </p>
                        <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Input placeholder="Search invoices..." className="w-80" />
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Invoice
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Outstanding Amount</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning">
                    ${financialStats.totalOutstanding.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {financialStats.outstandingInvoices} outstanding invoices
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Paid</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Outstanding Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {outstandingInvoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{invoice.id}</p>
                        <p className="text-sm text-muted-foreground">{invoice.customer}</p>
                        <p className="text-sm text-muted-foreground">Due: {invoice.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${invoice.amount}</p>
                        <Badge variant={invoice.status === 'overdue' ? 'destructive' : 'secondary'}>
                          {invoice.status}
                        </Badge>
                        {invoice.daysOverdue > 0 && (
                          <p className="text-xs text-destructive">
                            {invoice.daysOverdue} days overdue
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Financial Reports</h3>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="this-quarter">This Quarter</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Service Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Airport Transfers</span>
                      <span className="font-medium">$98,450 (40%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Corporate Services</span>
                      <span className="font-medium">$85,200 (35%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Event Transportation</span>
                      <span className="font-medium">$42,100 (17%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Other</span>
                      <span className="font-medium">$20,030 (8%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>January 2024</span>
                      <span className="font-medium text-success">+12.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>December 2023</span>
                      <span className="font-medium">$220,350</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>November 2023</span>
                      <span className="font-medium">$198,200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>October 2023</span>
                      <span className="font-medium">$215,890</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default FinancialsPage;