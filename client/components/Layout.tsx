import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  Menu,
  Home,
  Calendar,
  Clock,
  Building2,
  Heart,
  BookOpen,
  CheckCircle,
  BarChart3,
  Bell,
  ListTodo,
  User,
  LogOut,
} from "lucide-react";
import { ReactNode } from "react";

interface NavLink {
  label: string;
  href: string;
  icon: ReactNode;
  category: "main" | "academic" | "admin";
}

const navLinks: NavLink[] = [
  {
    label: "Home",
    href: "/",
    icon: <Home size={20} />,
    category: "main",
  },
  {
    label: "Timetable",
    href: "/timetable",
    icon: <Clock size={20} />,
    category: "main",
  },
  {
    label: "Academic Calendar",
    href: "/academic-calendar",
    icon: <Calendar size={20} />,
    category: "main",
  },
  {
    label: "Hostel Management",
    href: "/hostel",
    icon: <Building2 size={20} />,
    category: "main",
  },
  {
    label: "Medical & Healthcare",
    href: "/medical",
    icon: <Heart size={20} />,
    category: "main",
  },
  {
    label: "Courses & Subjects",
    href: "/courses",
    icon: <BookOpen size={20} />,
    category: "academic",
  },
  {
    label: "Attendance",
    href: "/attendance",
    icon: <CheckCircle size={20} />,
    category: "academic",
  },
  {
    label: "Grades",
    href: "/grades",
    icon: <BarChart3 size={20} />,
    category: "academic",
  },
  {
    label: "Notices",
    href: "/notices",
    icon: <Bell size={20} />,
    category: "admin",
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: <ListTodo size={20} />,
    category: "admin",
  },
];

function NavigationContent() {
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const mainLinks = navLinks.filter((link) => link.category === "main");
  const academicLinks = navLinks.filter((link) => link.category === "academic");
  const adminLinks = navLinks.filter((link) => link.category === "admin");

  return (
    <nav className="flex flex-col h-full">
      <div className="flex-1 space-y-8 py-6 px-4">
        {/* Main Links */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground mb-3 px-2">
            NAVIGATION
          </h3>
          <div className="space-y-1">
            {mainLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button
                  variant={isActive(link.href) ? "default" : "ghost"}
                  className="w-full justify-start gap-3"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Academic Links */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground mb-3 px-2">
            ACADEMICS
          </h3>
          <div className="space-y-1">
            {academicLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button
                  variant={isActive(link.href) ? "default" : "ghost"}
                  className="w-full justify-start gap-3"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Admin Links */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground mb-3 px-2">
            COMMUNICATION
          </h3>
          <div className="space-y-1">
            {adminLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button
                  variant={isActive(link.href) ? "default" : "ghost"}
                  className="w-full justify-start gap-3"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container max-w-full px-4 h-16 flex items-center justify-between">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center gap-3 font-bold">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-foreground">Synapse</span>
          </Link>

          {/* Desktop Navigation Toggle and User Actions */}
          <div className="flex items-center gap-4">
            {/* Profile and Logout Buttons - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2">
                <User size={18} />
                <span>Profile</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <LogOut size={18} />
                <span>Logout</span>
              </Button>
            </div>

            {/* Mobile Navigation Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="py-4">
                  <Link to="/" className="flex items-center gap-3 font-bold px-4 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <span className="text-xl font-bold">Synapse</span>
                  </Link>
                  <NavigationContent />
                  {/* Profile and Logout in Mobile Menu */}
                  <div className="border-t p-4 space-y-2">
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <User size={20} />
                      <span>Profile</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <LogOut size={20} />
                      <span>Logout</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden lg:flex w-64 border-r bg-gray-50 flex-col">
          <NavigationContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50">
          <div className="container max-w-full px-4 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}