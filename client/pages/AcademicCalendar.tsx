import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon,
  List,
  BookOpen,
  Trophy,
  AlertCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "exam" | "holiday" | "event" | "deadline" | "semester";
  description: string;
  time?: string;
}

const academicEvents: CalendarEvent[] = [
  // ===== JAN 2026 =====

  { id: "1", date: "2026-01-05", title: "Winter Semester Begins", type: "semester", description: "Start of Winter Semester" },
  { id: "2", date: "2026-01-05", title: "Course Registration Deadline", type: "deadline", description: "Last day to register courses" },
  { id: "3", date: "2026-01-05", title: "Orientation Program", type: "event", description: "Welcome orientation" },

  { id: "4", date: "2026-01-06", title: "Data Structures Quiz", type: "exam", description: "Quiz 1" },
  { id: "5", date: "2026-01-06", title: "Library Orientation", type: "event", description: "Library resources session" },

  { id: "6", date: "2026-01-07", title: "Web Dev Assignment Released", type: "event", description: "Assignment briefing" },
  { id: "7", date: "2026-01-07", title: "Assignment Submission Deadline", type: "deadline", description: "Initial submission" },

  { id: "8", date: "2026-01-08", title: "Guest Lecture: AI Trends", type: "event", description: "Industry expert talk" },
  { id: "9", date: "2026-01-08", title: "Operating Systems Lab", type: "exam", description: "Lab evaluation" },

  { id: "10", date: "2026-01-09", title: "Sports Club Registrations", type: "event", description: "Open registrations" },

  { id: "11", date: "2026-01-10", title: "Weekly Attendance Review", type: "deadline", description: "Attendance check" },
  { id: "12", date: "2026-01-10", title: "Cultural Club Meet", type: "event", description: "Introductory meet" },

  { id: "13", date: "2026-01-11", title: "Algorithms Tutorial", type: "event", description: "Extra tutorial session" },

  { id: "14", date: "2026-01-12", title: "DS Assignment Deadline", type: "deadline", description: "Submit assignment" },
  { id: "15", date: "2026-01-12", title: "Problem Solving Contest", type: "event", description: "Coding contest" },

  { id: "16", date: "2026-01-13", title: "Mid-Sem Preparation Session", type: "event", description: "Exam prep guidance" },

  { id: "17", date: "2026-01-14", title: "Database Quiz", type: "exam", description: "Short quiz" },
  { id: "18", date: "2026-01-14", title: "Project Proposal Submission", type: "deadline", description: "Proposal due" },

  { id: "19", date: "2026-01-15", title: "Mid-Sem Exam – Data Structures", type: "exam", description: "Written exam" },
  { id: "20", date: "2026-01-15", title: "Coding Contest", type: "event", description: "Inter-hostel contest" },
  { id: "21", date: "2026-01-15", title: "Attendance Freeze", type: "deadline", description: "Final attendance locked" },

  { id: "22", date: "2026-01-16", title: "Mid-Sem Exam – Algorithms", type: "exam", description: "Theory exam" },

  { id: "23", date: "2026-01-17", title: "Career Guidance Seminar", type: "event", description: "Industry insights" },

  { id: "24", date: "2026-01-18", title: "Cultural Night", type: "event", description: "Music & dance night" },
  { id: "25", date: "2026-01-18", title: "Ethics Assignment Deadline", type: "deadline", description: "Final submission" },

  { id: "26", date: "2026-01-19", title: "Group Discussion Round", type: "exam", description: "Assessment round" },

  { id: "27", date: "2026-01-20", title: "Hackathon Registration Opens", type: "event", description: "Register now" },

  { id: "28", date: "2026-01-21", title: "Web Dev Mid-Sem", type: "exam", description: "Practical exam" },

  { id: "29", date: "2026-01-22", title: "Research Workshop", type: "event", description: "Research methodology" },

  { id: "30", date: "2026-01-23", title: "Mini Project Deadline", type: "deadline", description: "Project submission" },

  { id: "31", date: "2026-01-24", title: "Tech Talk Series", type: "event", description: "Emerging technologies" },

  { id: "32", date: "2026-01-25", title: "Mock Interview Day", type: "event", description: "Interview practice" },

  { id: "33", date: "2026-01-26", title: "Republic Day Holiday", type: "holiday", description: "National holiday" },

  {
  id: "60",date: "2026-01-27",title: "Academic Advising Session",type: "event",description: "One-on-one faculty guidance"},

  { id: "35", date: "2026-01-28", title: "Database Lab Exam", type: "exam", description: "Lab assessment" },

  { id: "36", date: "2026-01-29", title: "Internship Awareness Session", type: "event", description: "Internship roadmap" },

  { id: "37", date: "2026-01-30", title: "Feedback Form Deadline", type: "deadline", description: "Submit feedback" },

  { id: "38", date: "2026-01-31", title: "Departmental Meetup", type: "event", description: "Faculty-student interaction" },

  // ===== FEB 2026 (TILL 15) =====

  { id: "39", date: "2026-02-01", title: "Sports Week Begins", type: "event", description: "Annual sports week" },

  { id: "40", date: "2026-02-02", title: "Database Project Demo", type: "exam", description: "Live demo" },
  { id: "41", date: "2026-02-02", title: "Sports Events", type: "event", description: "Track & field" },

  { id: "42", date: "2026-02-03", title: "Tech Fest Planning Meet", type: "event", description: "Volunteer meeting" },

  { id: "43", date: "2026-02-04", title: "Web Dev Hackathon", type: "event", description: "24-hour hackathon" },
  { id: "44", date: "2026-02-04", title: "Hackathon Submission", type: "deadline", description: "Final submission" },

  { id: "45", date: "2026-02-05", title: "Hackathon Evaluation", type: "exam", description: "Judging round" },

  { id: "46", date: "2026-02-06", title: "Resume Review Session", type: "event", description: "Resume feedback" },

  { id: "47", date: "2026-02-07", title: "Sports Finals", type: "event", description: "Final matches" },

  { id: "48", date: "2026-02-08", title: "Mental Health Workshop", type: "event", description: "Wellness session" },

  { id: "49", date: "2026-02-09", title: "Internal Assessment", type: "exam", description: "Continuous evaluation" },

  {
  id: "62",
  date: "2026-02-10",
  title: "Advanced Coding Workshop",
  type: "event",
  description: "Hands-on problem solving"
},
{
  id: "63",
  date: "2026-02-10",
  title: "Lab Maintenance Window",
  type: "deadline",
  description: "Lab access restricted post 6 PM"
},

  { id: "52", date: "2026-02-11", title: "Elective Selection Opens", type: "event", description: "Choose electives" },

  { id: "53", date: "2026-02-12", title: "Soft Skills Assessment", type: "exam", description: "Communication test" },
  { id: "54", date: "2026-02-12", title: "Group Presentation", type: "event", description: "Presentation day" },

  { id: "55", date: "2026-02-13", title: "Course Feedback Deadline", type: "deadline", description: "Submit feedback" },

  { id: "56", date: "2026-02-14", title: "Cultural Fest Day 1", type: "event", description: "Fest inauguration" },

  { id: "57", date: "2026-02-15", title: "Cultural Fest Day 2", type: "event", description: "Performances & DJ" },
  {
  id: "70",
  date: "2026-01-23",
  title: "Elective Orientation Session",
  type: "event",
  description: "Overview of available electives for the semester"
},
{
  id: "71",
  date: "2026-01-23",
  title: "Web Development Assignment Released",
  type: "deadline",
  description: "Assignment instructions shared on portal"
},

// Jan 24

{
  id: "73",
  date: "2026-01-24",
  title: "Student Council Open Meet",
  type: "event",
  description: "Open discussion with council members"
},

// Jan 25
{
  id: "74",
  date: "2026-01-25",
  title: "Library Usage Workshop",
  type: "event",
  description: "Effective research & referencing techniques"
},
{
  id: "75",
  date: "2026-01-25",
  title: "Minor Project Topic Selection Deadline",
  type: "deadline",
  description: "Submit preferred project topics"
},

// Jan 26 (Holiday-safe additions)
{
  id: "76",
  date: "2026-01-26",
  title: "Republic Day Cultural Program",
  type: "event",
  description: "Patriotic performances and speeches"
},

// Jan 27
{
  id: "78",
  date: "2026-01-27",
  title: "Faculty Mentorship Meet",
  type: "event",
  description: "Mentor–mentee interaction session"
},
{
  id: "79",
  date: "2026-01-27",
  title: "Database Design Assignment Released",
  type: "deadline",
  description: "ER diagram and schema design task"
},
];


function getTypeColor(type: CalendarEvent["type"]) {
  switch (type) {
    case "exam":
      return "bg-red-100 text-red-900 border-red-300";
    case "holiday":
      return "bg-green-100 text-green-900 border-green-300";
    case "event":
      return "bg-blue-100 text-blue-900 border-blue-300";
    case "deadline":
      return "bg-orange-100 text-orange-900 border-orange-300";
    case "semester":
      return "bg-purple-100 text-purple-900 border-purple-300";
    default:
      return "bg-gray-100 text-gray-900 border-gray-300";
  }
}

function getTypeIcon(type: CalendarEvent["type"]) {
  switch (type) {
    case "exam":
      return <Trophy size={16} />;
    case "holiday":
      return <AlertCircle size={16} />;
    case "event":
      return <Zap size={16} />;
    case "deadline":
      return <AlertCircle size={16} />;
    case "semester":
      return <BookOpen size={16} />;
    default:
      return null;
  }
}

function getTypeLabel(type: CalendarEvent["type"]) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function EventCard({ event }: { event: CalendarEvent }) {
  const date = new Date(event.date);
  const formatted = date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className={`p-4 border-l-4 rounded-lg border ${getTypeColor(event.type)} cursor-pointer hover:shadow-md transition-all`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-sm">{event.title}</h3>
          <p className="text-xs opacity-75">{formatted}</p>
        </div>
        <Badge className="gap-1" variant="outline">
          {getTypeIcon(event.type)}
          {getTypeLabel(event.type)}
        </Badge>
      </div>
      <p className="text-sm mb-2">{event.description}</p>
      {event.time && <p className="text-xs opacity-75">⏰ {event.time}</p>}
    </div>
  );
}

export default function AcademicCalendar() {
 const [selectedDate, setSelectedDate] = useState<Date | undefined>(
  new Date()
);

const [activeFilter, setActiveFilter] = useState<
  "all" | "exam" | "deadline" | "holiday" | "event" | "semester"
>("all");



  const eventsForSelectedDate = academicEvents.filter(
    (event) =>
      new Date(event.date).toDateString() ===
      selectedDate?.toDateString()
  );

  // Sort events by date
  const filteredEvents =
  activeFilter === "all"
    ? academicEvents
    : academicEvents.filter((event) => event.type === activeFilter);

const sortedEvents = [...filteredEvents].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);


  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">Academic Calendar</h1>
          <p className="text-muted-foreground mt-2">
            Track important dates, exams, deadlines, and events
          </p>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full max-w-xs grid-cols-2">
            <TabsTrigger value="calendar" className="gap-2">
              <CalendarIcon size={18} />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <List size={18} />
              List View
            </TabsTrigger>
          </TabsList>

          {/* Calendar View */}
          <TabsContent value="calendar" className="space-y-6 mt-6">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 items-stretch">


             <Card className="p-8 lg:col-span-1 flex flex-col min-h-[540px]">

  <h3 className="text-sm font-semibold text-muted-foreground mb-3">
    Select a date
  </h3>

  <div className="flex-1 flex items-center justify-center">
   <Calendar
  mode="single"
  selected={selectedDate}
  onSelect={setSelectedDate}
  showOutsideDays={false}
  className="w-full bg-blue-50 rounded-xl px-6"

 classNames={{
  // Base table
  table: "w-full border-collapse",

  // ✅ WEEKDAY LABELS (THIS FIXES THE SPLIT TEXT ISSUE)
  weekdays: "grid grid-cols-7 gap-x-6 mb-2",
  weekday:
    "h-11 w-11 flex items-center justify-center text-sm font-semibold text-blue-700",

  // Weeks wrapper
  weeks: "space-y-3",

  // Each week row
  week: "grid grid-cols-7 gap-x-6",

  // Each cell
  cell: "h-11 w-11 flex items-center justify-center",

  // Day button
 day: "h-11 w-11 flex items-center justify-center rounded-md transition hover:bg-indigo-200 aria-selected:bg-blue-600 aria-selected:text-white",



  day_selected: "!bg-blue-600 !text-white !font-bold",
  day_today: "!ring-2 !ring-blue-600 !font-bold",

  // Navigation arrows
  nav_button: "hover:bg-indigo-200 text-indigo-700",
}}


/>


  </div>

  <Button
    variant="outline"
    size="sm"
    className="mt-4 w-full"
    onClick={() => setSelectedDate(new Date())}
  >
    Go to Today
  </Button>
</Card>


              {/* Events for selected date */}
              <div className="flex flex-col h-full">

               <h2 className="text-2xl font-bold mb-1">
  {selectedDate?.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</h2>

<p className="text-sm text-muted-foreground mb-4">
  Academic events on selected date
</p>


                {eventsForSelectedDate.length > 0 ? (
                  <div className="space-y-4">
                    {eventsForSelectedDate.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center bg-gray-50">
                    <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                    <p className="text-muted-foreground">
                      No events scheduled for this date
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list" className="mt-6">
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-wrap gap-2">
               <Button
  size="sm"
  variant={activeFilter === "all" ? "outline" : "ghost"}
  onClick={() => setActiveFilter("all")}
>
  All Events
</Button>

<Button
  size="sm"
  variant={activeFilter === "exam" ? "outline" : "ghost"}
  onClick={() => setActiveFilter("exam")}
>
  Exams
</Button>

<Button
  size="sm"
  variant={activeFilter === "deadline" ? "outline" : "ghost"}
  onClick={() => setActiveFilter("deadline")}
>
  Deadlines
</Button>

<Button
  size="sm"
  variant={activeFilter === "holiday" ? "outline" : "ghost"}
  onClick={() => setActiveFilter("holiday")}
>
  Holidays
</Button>

<Button
  size="sm"
  variant={activeFilter === "event" ? "outline" : "ghost"}
  onClick={() => setActiveFilter("event")}
>
  Events
</Button>

              </div>

              {/* Events list */}
              <div className="space-y-3">
                {sortedEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Legend */}
        <Card className="p-6 bg-gray-50">
          <h3 className="font-semibold mb-4">Event Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm">Exam</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm">Holiday</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm">Event</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-sm">Deadline</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-sm">Semester</span>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
