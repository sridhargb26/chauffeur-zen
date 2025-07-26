import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Calendar, Car, Users, DollarSign } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      label: "New Booking",
      icon: Plus,
      variant: "default" as const,
      onClick: () => console.log("New booking")
    },
    {
      label: "Schedule Trip",
      icon: Calendar,
      variant: "outline" as const,
      onClick: () => console.log("Schedule trip")
    },
    {
      label: "Add Customer",
      icon: Users,
      variant: "outline" as const,
      onClick: () => console.log("Add customer")
    },
    {
      label: "Fleet Status",
      icon: Car,
      variant: "outline" as const,
      onClick: () => console.log("Fleet status")
    },
    {
      label: "Generate Invoice",
      icon: DollarSign,
      variant: "outline" as const,
      onClick: () => console.log("Generate invoice")
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            size="sm"
            onClick={action.onClick}
            className="flex items-center gap-2"
          >
            <action.icon className="w-4 h-4" />
            {action.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}