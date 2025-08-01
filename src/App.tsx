import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BookingsPage from "./pages/bookings";
import CustomersPage from "./pages/customers";
import FleetPage from "./pages/fleet";
import DriversPage from "./pages/drivers";
import RoutesPage from "./pages/routes";
import FinancialsPage from "./pages/financials";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/financials" element={<FinancialsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
