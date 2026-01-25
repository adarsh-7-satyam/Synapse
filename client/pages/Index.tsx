import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Clock,
  Calendar,
  Building2,
  Heart,
  BookOpen,
  CheckCircle,
  BarChart3,
  Bell,
  ListTodo,
  ArrowRight,
  Zap,
  Shield,
  Users,
} from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  badge?: string;
}

const mainFeatures: Feature[] = [
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Timetable",
    description:
      "View your weekly schedule with color-coded classes, subject details, faculty info, and room numbers.",
    href: "/timetable",
    badge: "Essential",
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Academic Calendar",
    description:
      "Stay updated on semester dates, exams, holidays, events, and assignment deadlines in one place.",
    href: "/academic-calendar",
    badge: "Essential",
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Hostel Management",
    description:
      "Check room allocation, hostel rules, submit maintenance complaints, and track resolution status.",
    href: "/hostel",
    badge: "Important",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Medical & Healthcare",
    description:
      "Easy access to medical facilities, doctors, health records, appointment booking, emergency contacts, mental wellness assessment, and campus maps.",
    href: "/medical",
    badge: "Healthcare",
  },
];

const academicFeatures: Feature[] = [
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Courses & Subjects",
    description: "View enrolled courses, credits, faculty information, and access syllabus documents.",
    href: "/courses",
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Attendance",
    description:
      "Track subject-wise attendance percentage with visual progress indicators and warnings.",
    href: "/attendance",
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Grades & Performance",
    description:
      "View internal marks, calculate CGPA, and analyze your academic performance trends.",
    href: "/grades",
  },
];

const communicationFeatures: Feature[] = [
  {
    icon: <Bell className="w-8 h-8" />,
    title: "Notices & Announcements",
    description:
      "Receive important updates with priority tags for exams, urgent matters, and general notifications.",
    href: "/notices",
  },
  {
    icon: <ListTodo className="w-8 h-8" />,
    title: "Tasks & Reminders",
    description:
      "Manage assignments, exam prep checklists, and personal notes in one productivity hub.",
    href: "/tasks",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <Link to={feature.href}>
      <Card className="h-full p-6 hover:shadow-lg transition-all cursor-pointer border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg text-primary">
            {feature.icon}
          </div>
          {feature.badge && (
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
              {feature.badge}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
        <div className="mt-4 flex items-center text-primary font-medium text-sm">
          <span>Explore</span>
          <ArrowRight size={16} className="ml-2" />
        </div>
      </Card>
    </Link>
  );
}

export default function Index() {
  return (
    <>
    
      {/* Hero Section */}
      
      <div className="mb-12">
        <div className="bg-gradient-to-br from-primary via-purple-600 to-secondary rounded-2xl p-12 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Campus Made Simple
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Synapse is your all-in-one platform for class schedules, hostel management, healthcare access, and academic excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/timetable">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    View Timetable
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/academic-calendar">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white/30 text-white bg-white/10 hover:bg-white/20"

                  >
                    Academic Calendar
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold">100+</div>
                <div className="text-sm text-white/80">Colleges Partnered</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-white/80">Active Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm text-white/80">Features</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features Section */}
      <div className="mb-16">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Essential Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Everything you need to manage your academic life, one click away.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {mainFeatures.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>

      {/* Academic Features Section */}
      <div className="mb-16">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Academic Tools</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Track your progress, monitor attendance, and achieve your academic goals.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {academicFeatures.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>

      {/* Communication Section */}
      <div className="mb-16">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Connected</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Get timely updates and manage your tasks efficiently.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {communicationFeatures.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 border-0 bg-white">
            <Zap className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Optimized for speed. Get information instantly, no delays.
            </p>
          </Card>
          <Card className="p-6 border-0 bg-white">
            <Shield className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
            <p className="text-sm text-muted-foreground">
              Your data is encrypted and protected with enterprise-grade security.
            </p>
          </Card>
          <Card className="p-6 border-0 bg-white">
            <Users className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Built for You</h3>
            <p className="text-sm text-muted-foreground">
              Designed by students, for students. Feedback drives our development.
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-white text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Organize Your Campus Life?</h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of students who are already using Synapse to manage their academic journey.
        </p>
        <Link to="/timetable">
          <Button size="lg" variant="secondary">
            Get Started Today
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </Link>
      </div>

      {/* Footer Info */}
      <div className="text-center text-sm text-muted-foreground py-8 border-t">
        <p>Built with modern technologies for the hackathon generation</p>
        <p className="mt-2">Synapse © 2024. Making campus administration simple.</p>
      </div>
    </>
  );
}
