import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, MapPin, User, Plus, Edit2 } from "lucide-react";
import { useState } from "react";

interface ClassSession {
  id: string;
  subject: string;
  time: string;
  room: string;
  faculty: string;
  color: string;
}

interface DaySchedule {
  day: string;
  date: string;
  classes: ClassSession[];
}

// Sample timetable data
const sampleTimetable: DaySchedule[] = [
  {
    day: "Monday",
    date: "Jan 20",
    classes: [
      {
        id: "1",
        subject: "Design and Analysis of Algorithms (CSL 252)",
        time: "11:30 - 12:30",
        room: "Room L-102",
        faculty: "Dr. Vinod Reddy",
        color: "bg-blue-100 border-blue-300 text-blue-900",
      },
      {
        id: "2",
        subject: "Introduction to Postcolonial Literature (LAL 224)",
        time: "12:30 - 1:30",
        room: "L-208",
        faculty: "Ms. Shruti Vinayan",
        color: "bg-purple-100 border-purple-300 text-purple-900",
      },
      {
        id: "3",
        subject: "Database Management",
        time: "13:30 - 15:00",
        room: "Room 205",
        faculty: "Prof. Aditya Singh",
        color: "bg-green-100 border-green-300 text-green-900",
      },
    ],
  },
  {
    day: "Tuesday",
    date: "Jan 21",
    classes: [
      {
        id: "4",
        subject: "Algorithms",
        time: "09:00 - 10:30",
        room: "Room 103",
        faculty: "Dr. Vikram Patel",
        color: "bg-orange-100 border-orange-300 text-orange-900",
      },
      {
        id: "5",
        subject: "Operating Systems",
        time: "11:00 - 12:30",
        room: "Room 210",
        faculty: "Dr. Isha Gupta",
        color: "bg-red-100 border-red-300 text-red-900",
      },
    ],
  },
  {
    day: "Wednesday",
    date: "Jan 22",
    classes: [
      {
        id: "6",
        subject: "Object Oriented Programming",
        time: "09:00 - 10:30",
        room: "Lab B",
        faculty: "Mr. Rohan Malhotra",
        color: "bg-pink-100 border-pink-300 text-pink-900",
      },
      {
        id: "7",
        subject: "Web Development",
        time: "10:45 - 12:15",
        room: "Lab A",
        faculty: "Ms. Priya Sharma",
        color: "bg-purple-100 border-purple-300 text-purple-900",
      },
      {
        id: "8",
        subject: "Professional Ethics",
        time: "14:00 - 15:00",
        room: "Room 301",
        faculty: "Dr. Meera Desai",
        color: "bg-indigo-100 border-indigo-300 text-indigo-900",
      },
    ],
  },
  {
    day: "Thursday",
    date: "Jan 23",
    classes: [
      {
        id: "9",
        subject: "Data Structures",
        time: "09:00 - 10:30",
        room: "Room 101",
        faculty: "Dr. Rajesh Kumar",
        color: "bg-blue-100 border-blue-300 text-blue-900",
      },
      {
        id: "10",
        subject: "Compiler Design",
        time: "13:30 - 15:00",
        room: "Room 215",
        faculty: "Prof. Arjun Verma",
        color: "bg-cyan-100 border-cyan-300 text-cyan-900",
      },
    ],
  },
  {
    day: "Friday",
    date: "Jan 24",
    classes: [
      {
        id: "11",
        subject: "Software Engineering",
        time: "09:00 - 10:30",
        room: "Room 205",
        faculty: "Dr. Sanjay Mishra",
        color: "bg-emerald-100 border-emerald-300 text-emerald-900",
      },
      {
        id: "12",
        subject: "Database Management",
        time: "10:45 - 12:15",
        room: "Lab C",
        faculty: "Prof. Aditya Singh",
        color: "bg-green-100 border-green-300 text-green-900",
      },
      {
        id: "13",
        subject: "Project Work",
        time: "14:00 - 16:00",
        room: "Room 401",
        faculty: "Various Faculty",
        color: "bg-teal-100 border-teal-300 text-teal-900",
      },
    ],
  },
];

function ClassCard({ session }: { session: ClassSession }) {
  return (
    <Card className={`p-4 border-l-4 ${session.color} cursor-pointer hover:shadow-md transition-shadow`}>
      <h3 className="font-semibold text-sm mb-3">{session.subject}</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Clock size={16} className="opacity-70" />
          <span>{session.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} className="opacity-70" />
          <span>{session.room}</span>
        </div>
        <div className="flex items-center gap-2">
          <User size={16} className="opacity-70" />
          <span className="text-xs">{session.faculty}</span>
        </div>
      </div>
    </Card>
  );
}

export default function Timetable() {
  const [isAdminMode] = useState(false);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">Timetable</h1>
            <p className="text-muted-foreground mt-2">
              Your weekly class schedule for Spring 2024
            </p>
          </div>

          {isAdminMode && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus size={20} className="mr-2" />
                  Add Class
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Class</DialogTitle>
                  <DialogDescription>
                    Add a new class to your timetable
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Day</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mon">Monday</SelectItem>
                        <SelectItem value="tue">Tuesday</SelectItem>
                        <SelectItem value="wed">Wednesday</SelectItem>
                        <SelectItem value="thu">Thursday</SelectItem>
                        <SelectItem value="fri">Friday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Subject</Label>
                    <Input placeholder="Subject name" />
                  </div>
                  <div>
                    <Label>Time</Label>
                    <Input placeholder="09:00 - 10:30" />
                  </div>
                  <div>
                    <Label>Room</Label>
                    <Input placeholder="Room number" />
                  </div>
                  <div>
                    <Label>Faculty</Label>
                    <Input placeholder="Faculty name" />
                  </div>
                  <Button className="w-full">Add Class</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Weekly View */}
        <div className="space-y-6">
          {sampleTimetable.map((daySchedule) => (
            <div key={daySchedule.day}>
              <div className="flex items-center justify-between mb-4 pb-2 border-b">
                <div>
                  <h2 className="text-2xl font-bold">{daySchedule.day}</h2>
                  <p className="text-sm text-muted-foreground">{daySchedule.date}</p>
                </div>
                {isAdminMode && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Edit2 size={16} className="mr-2" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit {daySchedule.day} Schedule</DialogTitle>
                        <DialogDescription>
                          Modify classes for {daySchedule.day}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <p className="text-sm text-muted-foreground">
                          Edit functionality would go here
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              {daySchedule.classes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {daySchedule.classes.map((session) => (
                    <ClassCard key={session.id} session={session} />
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center bg-gray-50">
                  <p className="text-muted-foreground">No classes scheduled</p>
                </Card>
              )}
            </div>
          ))}
        </div>

        {/* Admin Mode Info */}
        {!isAdminMode && (
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Admin Feature</h3>
            <p className="text-sm text-blue-800">
              Admins can update timetables, add new classes, and manage schedules from the admin dashboard.
            </p>
          </Card>
        )}
      </div>
    </Layout>
  );
}
