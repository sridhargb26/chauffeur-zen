import { MainLayout } from "@/components/layout/main-layout";
import { StatsCard } from "@/components/dashboard/stats-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentBookings } from "@/components/dashboard/recent-bookings";
import { 
  Calendar, 
  Users, 
  Car, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  MapPin, 
  Star 
} from "lucide-react";

const Index = () => {
  const stats = [
    {
      title: "Active Bookings",
      value: "24",
      change: { value: "+12%", type: "increase" as const },
      icon: Calendar,
      description: "from last week"
    },
    {
      title: "Total Customers",
      value: "1,284",
      change: { value: "+8%", type: "increase" as const },
      icon: Users,
      description: "active accounts"
    },
    {
      title: "Fleet Utilization",
      value: "87%",
      change: { value: "+5%", type: "increase" as const },
      icon: Car,
      description: "vehicles in use"
    },
    {
      title: "Monthly Revenue",
      value: "$45,230",
      change: { value: "+23%", type: "increase" as const },
      icon: DollarSign,
      description: "vs last month"
    },
    {
      title: "Average Rating",
      value: "4.8",
      change: { value: "+0.2", type: "increase" as const },
      icon: Star,
      description: "customer satisfaction"
    },
    {
      title: "On-Time Rate",
      value: "96%",
      change: { value: "+2%", type: "increase" as const },
      icon: Clock,
      description: "punctuality score"
    }
  ];

  return (
    <MainLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-primary rounded-lg p-6 text-primary-foreground">
          <h2 className="text-2xl font-bold mb-2">Welcome back, Admin!</h2>
          <p className="text-primary-foreground/80">
            Here's what's happening with your chauffeur service today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
          <div className="lg:col-span-2">
            <RecentBookings />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
