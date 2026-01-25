import { useState } from "react";
const COMPLAINTS_KEY = "hostel_complaints";



import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import {
  Building2,
  Wrench,
  FileText,
  Users,
  Bell,
} from "lucide-react";

/* ============================
   TYPES (Backend-ready models)
============================ */

interface Roommate {
  name: string;
  rollNo: string;
}

interface RoomDetails {
  hostelName: string;
  roomNumber: string;
  floor: number;
  roomType: "Single" | "Double";
  roommates: Roommate[];
}

interface Complaint {
  id: string;
  type: string;
  description: string;
  dateTime: string; // date + time
  status: "Pending" | "Resolved";
  complainerName: string;
  roomNo: string;
}

interface Notice {
  title: string;
  dateTime: string; // date + time
  description: string;
}


interface VisitorLog {
  name: string;
  relation: string;
  visitDate: string;
  status: "Approved" | "Pending";
}

/* ============================
   MOCK DATA (Replace via API)
============================ */




// TODO: Replace with API call
const mockStudentData = {
  name: "Adarsh Satyam",
  studentId: "22CS001",
  city: "Patna",
  contactNo: "9876543210",
};

// TODO: Replace with API call
const mockRoommateData = {
  name: "Rohit Sharma",
  rollNo: "22CS101",
  city: "Ranchi",
  contactNo: "9123456780",
};


// TODO: Replace with API call
const mockRoomData: RoomDetails = {
  hostelName: "Aryabhatta Hostel",
  roomNumber: "B-214",
  floor: 2,
  roomType: "Double",
  roommates: [
    { name: "Rohit Sharma", rollNo: "22CS101" },
  ],
};



// TODO: Replace with API call
const hostelRules: string[] = [
  "Entry after 11 PM requires prior permission.",
  "Visitors are allowed only in common areas.",
  "Maintain cleanliness in rooms and corridors.",
  "Electric appliances require approval.",
  "Ragging is strictly prohibited.",
];

// TODO: Replace with API call
const mockNotices: Notice[] = [
  {
    title: "Fire Safety Drill",
    dateTime: "Jan 23, 2026, 04:00 PM",
    description: "Mandatory fire safety drill for all hostel residents.",
  },
  {
    title: "Mess Menu Update",
    dateTime: "Jan 22, 2026, 08:00 AM",
    description: "New mess menu will be applicable from next week.",
  },
  {
    title: "Electricity Shutdown",
    dateTime: "Jan 21, 2026, 11:30 PM",
    description: "Temporary power shutdown due to transformer maintenance.",
  },
  {
    title: "Hostel Inspection",
    dateTime: "Jan 20, 2026, 09:00 AM",
    description: "Rooms will be inspected for safety compliance.",
  },
  {
    title: "Water Supply Maintenance",
    dateTime: "Jan 18, 2026, 10:00 AM",
    description: "Water supply will be interrupted from 10 AM to 2 PM.",
  },
];



// TODO: Replace with API call
const mockVisitors: VisitorLog[] = [
  {
    name: "Amit Verma",
    relation: "Brother",
    visitDate: "Jan 12, 2026",
    status: "Approved",
  },
  {
    name: "Sunita Verma",
    relation: "Mother",
    visitDate: "Jan 20, 2026",
    status: "Approved",
  },
];

/* ============================
   MAIN COMPONENT
============================ */

const initialComplaints: Complaint[] = [
  {
    id: "CMP-001",
    type: "Electricity",
    description: "Fan not working properly.",
    dateTime: "15 Jan 2026, 10:30 AM",
    status: "Resolved",
    complainerName: "Adarsh Satyam",
    roomNo: "B-214",
  },
  {
    id: "CMP-002",
    type: "Water",
    description: "Low water pressure in bathroom.",
    dateTime: "12 Jan 2026, 8:15 PM",
    status: "Resolved",
    complainerName: "Adarsh Satyam",
    roomNo: "B-214",
  },
];

export default function HostelManagement() {
  // Complaint state
  // ================= VISITOR STATE =================
const [visitorRequests, setVisitorRequests] = useState<VisitorLog[]>(() =>
  [...mockVisitors].sort(
    (a, b) =>
      new Date(b.visitDate).getTime() -
      new Date(a.visitDate).getTime()
  )
);

const [guestName, setGuestName] = useState("");
const [relation, setRelation] = useState("");
const [visitDate, setVisitDate] = useState("");

const submitVisitorRequest = () => {
  if (!guestName || !relation || !visitDate) return;

  const newRequest: VisitorLog = {
    name: guestName,
    relation,
    visitDate,
    status: "Pending",
  };

  setVisitorRequests((prev) => [newRequest, ...prev]);

  setGuestName("");
  setRelation("");
  setVisitDate("");
};
// =================================================

  const [selectedComplaint, setSelectedComplaint] =
  useState<Complaint | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
  const stored = sessionStorage.getItem(COMPLAINTS_KEY);
  return stored ? JSON.parse(stored) : initialComplaints;
});


  const [type, setType] = useState("Electricity");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitComplaint = () => {
  const now = new Date();

  const newComplaint: Complaint = {
    id: `CMP-${Date.now()}`,
    type,
    description,
    dateTime: now.toLocaleString(),
    status: "Pending",
    complainerName: mockStudentData.name,
    roomNo: mockRoomData.roomNumber,
  };

  setComplaints((prev) => {
    const updated = [newComplaint, ...prev];
    sessionStorage.setItem(COMPLAINTS_KEY, JSON.stringify(updated));
    setSelectedComplaint(newComplaint);
    return updated;
  });

  setDescription("");
  setSubmitted(true);

  setTimeout(() => setSubmitted(false), 3000);
};


  const [tab, setTab] = useState("room");

  const sortedNotices = [...mockNotices].sort(
  (a, b) =>
    new Date(b.dateTime).getTime() -
    new Date(a.dateTime).getTime()
);


  const sortedComplaints = [...complaints].sort(
  (a, b) =>
    new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
);


  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Hostel Management</h1>
        <p className="text-muted-foreground">
          Manage room details, complaints, notices, and visitors.
        </p>
      </div>

      {/* Top Tabs (LIKE Medical Page) */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-muted rounded-lg p-1 inline-flex">


          <TabsTrigger value="room">Room Details</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="notices">Hostel Notices</TabsTrigger>
          <TabsTrigger value="visitors">Visitor Logs</TabsTrigger>
        </TabsList>

        {/* STUDENT DETAILS */}
        <TabsContent value="room" className="space-y-6">
          
<section className="rounded-xl border bg-background p-6 shadow-sm">
  <h2 className="text-xl font-semibold mb-4">Student Details</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    {[
      {
        label: "Student Name",
        value: mockStudentData.name,
        color: "bg-blue-50 text-blue-700",
      },
      {
        label: "Student ID",
        value: mockStudentData.studentId,
        color: "bg-purple-50 text-purple-700",
      },
      {
        label: "City",
        value: mockStudentData.city,
        color: "bg-green-50 text-green-700",
      },
      {
        label: "Contact No",
        value: mockStudentData.contactNo,
        color: "bg-indigo-50 text-indigo-700",
      },
    ].map((item) => (
      <div key={item.label} className={`rounded-lg p-4 ${item.color}`}>
        <p className="text-xs opacity-80">{item.label}</p>
        <p className="text-lg font-semibold">{item.value}</p>
      </div>
    ))}
  </div>
</section>


           {/* Room Details */}
           

      <section className="rounded-xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          My Room Details
        </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
  {[
    {
      label: "Hostel",
      value: mockRoomData.hostelName,
      color: "bg-indigo-50 text-indigo-700",
    },
    {
      label: "Room No",
      value: mockRoomData.roomNumber,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Floor",
      value: mockRoomData.floor,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Room Type",
      value: mockRoomData.roomType,
      color: "bg-violet-50 text-violet-700",
    },
  ].map((item) => (
    <div
      key={item.label}
      className={`rounded-lg p-4 ${item.color}`}
    >
      <p className="text-xs opacity-80">{item.label}</p>
      <p className="text-lg font-semibold">{item.value}</p>
    </div>
  ))}
</div>



     

      </section>

      <section className="rounded-xl border bg-background p-6 shadow-sm">
  <h2 className="text-xl font-semibold mb-4">Roommate Details</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[
      {
        label: "Name",
        value: mockRoommateData.name,
        color: "bg-orange-50 text-orange-700",
      },
      {
        label: "Roommate ID",
        value: mockRoommateData.rollNo,
        color: "bg-pink-50 text-pink-700",
      },
      {
        label: "City",
        value: mockRoommateData.city,
        color: "bg-teal-50 text-teal-700",
      },
      {
        label: "Contact No",
        value: mockRoommateData.contactNo,
        color: "bg-yellow-50 text-yellow-800",
      },
    ].map((item) => (
      <div key={item.label} className={`rounded-lg p-4 ${item.color}`}>
        <p className="text-xs opacity-80">{item.label}</p>
        <p className="text-lg font-semibold">{item.value}</p>
      </div>
    ))}
  </div>
</section>


      {/* Hostel Rules */}
      <section className="rounded-xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Hostel Rules
        </h2>

        <ul className="list-disc list-inside mt-4 space-y-2">
          {hostelRules.map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
        </ul>
      </section>
        </TabsContent>

        {/* COMPLAINTS */}
        <TabsContent value="complaints" className="space-y-6">
          {/* Raise Complaint */}
      <section className="rounded-xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Wrench className="w-5 h-5" />
          Raise Maintenance Complaint
        </h2>

        <div className="space-y-4 mt-4">
          <select
            className="w-full border rounded-md p-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Electricity</option>
            <option>Water</option>
            <option>WiFi</option>
            <option>Furniture</option>
            <option>Other</option>
          </select>

          <textarea
            className="w-full border rounded-md p-2"
            placeholder="Describe the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={submitComplaint}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Submit Complaint
          </button>

          {submitted && (
            <p className="text-green-600">
              Complaint submitted successfully.
            </p>
          )}
        </div>
      </section>

      {/* Complaint Tracking */}
      <section className="rounded-xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-semibold">My Complaints</h2>

        {complaints.length === 0 ? (
          <p className="text-muted-foreground mt-2">
            No complaints submitted yet.
          </p>
          ) : (
  <>

 

    <ul className="space-y-3 mt-4">
  {sortedComplaints.map((c) => {
    const isOpen = selectedComplaint?.id === c.id;

    return (
      <li key={c.id} className="space-y-2">
        {/* Complaint Row */}
        <div
          onClick={() =>
            setSelectedComplaint(isOpen ? null : c)
          }
          className={`border rounded-md p-4 flex justify-between cursor-pointer
            ${isOpen ? "bg-muted" : "hover:bg-muted"}`}
        >
          <div>
            <p className="font-medium">{c.type}</p>
            <p className="text-sm text-muted-foreground">
              {c.dateTime}
            </p>
          </div>

          <span
            className={`text-sm font-semibold px-2 py-1 rounded-md ${
              c.status === "Resolved"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {c.status}
          </span>
        </div>

        {/* Inline Details */}
        {isOpen && (
          <div className="ml-4 rounded-lg border bg-background p-4 text-sm">
            <p><b>Complainer:</b> {c.complainerName}</p>
            <p><b>Room No:</b> {c.roomNo}</p>
            <p><b>Type:</b> {c.type}</p>
            <p><b>Date & Time:</b> {c.dateTime}</p>
            <p><b>Status:</b> {c.status}</p>

            <p className="mt-2">
              <b>Description:</b><br />
              {c.description}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedComplaint(null);
              }}
              className="mt-3 text-xs text-primary underline"
            >
              Hide details
            </button>
          </div>
        )}
      </li>
    );
  })}
</ul>


    
  </>
)}

       
        
      </section>

      
      
        </TabsContent>

      

        <TabsContent value="notices">
           {/* Notices */}
      <section className="rounded-xl border bg-background p-6 shadow-sm">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Hostel Notices
        </h2>

        <div className="space-y-4 mt-4">
          {sortedNotices.map((n, i) => (

          <div
  key={i}
  className="border-2 border-black rounded-md p-4 
           bg-orange-100"

>

              <p className="font-medium">{n.title}</p>
              <p className="text-sm text-muted-foreground">{n.dateTime}</p>

              <p className="mt-1">{n.description}</p>
            </div>
          ))}
        </div>
      </section>
        </TabsContent>

        {/* VISITORS */}
        <TabsContent value="visitors" className="space-y-6">

  {/* REQUEST APPROVAL */}
  <section className="rounded-xl border bg-background p-6 shadow-sm">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <Users className="w-5 h-5" />
      Request Visitor Approval
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        className="border-2 border-black rounded-md p-2"
        placeholder="Guest Name"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
      />

      <input
        className="border-2 border-black rounded-md p-2"
        placeholder="Relation"
        value={relation}
        onChange={(e) => setRelation(e.target.value)}
      />

      <input
        type="date"
        className="border-2 border-black rounded-md p-2"
        value={visitDate}
        onChange={(e) => setVisitDate(e.target.value)}
      />
    </div>

    <button
      onClick={submitVisitorRequest}
      className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
    >
      Request Approval
    </button>
  </section>

  {/* VISITOR LOG */}
  <section className="rounded-xl border bg-background p-6 shadow-sm">
    <h2 className="text-xl font-semibold mb-4">Visitor Log</h2>

    <ul className="space-y-3">
      {visitorRequests.map((v, i) => (
        <li
          key={i}
          className={`border-2 rounded-md p-4 flex justify-between
            ${v.status === "Approved"
              ? "bg-green-50 border-green-600"
              : "bg-red-50 border-red-600"}`}
        >
          <div>
            <p className="font-medium">{v.name}</p>
            <p className="text-sm text-muted-foreground">
              {v.relation} • {v.visitDate}
            </p>
          </div>

          <span
            className={`text-sm font-semibold px-3 py-1 rounded-md
              ${v.status === "Approved"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"}`}
          >
            {v.status}
          </span>
        </li>
      ))}
    </ul>
  </section>

</TabsContent>

      </Tabs>
    </div>
  );
}




    

     

      

      
      
  

