import "./global.css";
import Layout from "@/components/Layout";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Timetable from "./pages/Timetable";
import AcademicCalendar from "./pages/AcademicCalendar";
import HostelManagement from "./pages/HostelManagement";
import Medical from "./pages/Medical";
import Courses from "./pages/Courses";
import Attendance from "./pages/Attendance";
import Grades from "./pages/Grades";
import Notices from "./pages/Notices";
import Tasks from "./pages/Tasks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/academic-calendar" element={<AcademicCalendar />} />
          <Route
  path="/hostel"
  element={
    <Layout>
      <HostelManagement />
    </Layout>
  }
/>

          <Route path="/medical" element={<Medical />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/tasks" element={<Tasks />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
