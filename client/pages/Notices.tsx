import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { 
  Bell, 
  Calendar, 
  Clock, 
  AlertCircle, 
  Megaphone, 
  BookOpen,
  GraduationCap,
  Filter,
  Search,
  ChevronRight,
  Pin,
  User,
  Building,
  Download,
  Share2,
  Eye,
  BellRing,
  X,
  Printer,
  Bookmark,
  FileText,
  ChevronLeft
} from "lucide-react";

// Helper function to convert 12-hour time to 24-hour format
const convertTo24Hour = (timeStr) => {
  // If time already has AM/PM
  if (timeStr.includes('AM') || timeStr.includes('PM')) {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = '00';
    }
    
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes}:00`;
  }
  
  // If time is already in 24-hour format or doesn't have AM/PM
  const [hours, minutes] = timeStr.split(':');
  return `${hours.padStart(2, '0')}:${minutes}:00`;
};

const initialNotices = [
  // Latest notices (last 24-48 hours)
  {
    id: 1,
    title: "Final Year Project Submission Deadline Extended",
    description: "Due to technical issues with the submission portal, the deadline for final year project submissions has been extended until January 30, 2026. All groups must submit their complete project reports and code repositories through the updated portal.",
    fullContent: `
      <h2>Final Year Project Submission - Deadline Extension</h2>
      
      <p>Dear Final Year Students,</p>
      
      <p>Due to unforeseen technical difficulties with our project submission portal, the Computer Science Department has decided to extend the submission deadline for all final year projects.</p>
      
      <p><strong>New Deadline:</strong> January 30, 2026 (Friday) - 11:59 PM</p>
      
      <p><strong>Important Notes:</strong></p>
      <ul>
        <li>The submission portal has been updated and is now fully functional</li>
        <li>All submissions must include: Complete project report, Source code repository link, Project demonstration video (10-15 minutes)</li>
        <li>Late submissions after the extended deadline will not be accepted under any circumstances</li>
        <li>Contact your project guide for any queries regarding submission format</li>
      </ul>
      
      <p>We apologize for the inconvenience and wish you the best for your project submissions.</p>
      
      <p><strong>Dr. S.K. Subidh Ali</strong><br>
      Head, Department of Computer Science<br>
      January 22, 2026</p>
    `,
    date: "2026-01-22",
    time: "10:30 AM",
    category: "Exam",
    priority: "urgent",
    department: "Computer Science",
    issuedBy: "Dr. S.K. Subidh Ali",
    attachments: ["Project Submission Guidelines.pdf"],
    pinned: true
  },
  {
    id: 2,
    title: "Campus Placement Drive: Google (2026 Batch)",
    description: "Google is conducting campus placements on February 15-16, 2026. All final year students with CGPA 8.0+ are eligible. Registration deadline: February 5, 2026.",
    fullContent: `
      <h2>Google Campus Placement Drive 2026</h2>
      
      <p><strong>Company:</strong> Google LLC</p>
      <p><strong>Drive Dates:</strong> February 15-16, 2026</p>
      <p><strong>Venue:</strong> Main Auditorium, Block A</p>
      
      <p><strong>Eligibility Criteria:</strong></p>
      <ul>
        <li>CGPA: 8.0 and above (No backlogs)</li>
        <li>Branches: Computer Science, IT, ECE, EEE</li>
        <li>Year of Passing: 2026</li>
      </ul>
      
      <p><strong>Registration Process:</strong></p>
      <ol>
        <li>Login to the placement portal</li>
        <li>Fill the Google registration form</li>
        <li>Upload updated resume</li>
        <li>Submit by February 5, 2026</li>
      </ol>
      
      <p><strong>Selection Process:</strong></p>
      <ul>
        <li>Online Assessment Test (February 10)</li>
        <li>Technical Interviews (February 15)</li>
        <li>HR Round (February 16)</li>
      </ul>
      
      <p>For queries, contact the Placement Cell.</p>
    `,
    date: "2026-01-22",
    time: "09:15 AM",
    category: "Placement",
    priority: "urgent",
    department: "Placement Cell",
    issuedBy: "Dr. Rekha Ravindran",
    attachments: ["Google_Placement_Brochure.pdf", "Registration_Form.docx"]
  },
  {
    id: 3,
    title: "Semester 4 Time Table Released",
    description: "The detailed timetable for Semester 4 (2025-26 Winter) has been released. Check the academic portal for your class schedule, room allocations, and faculty details.",
    fullContent: `
      <h2>Semester 4 Timetable (2025-26 Winter Session)</h2>
      
      <p>The timetable for the ongoing semester has been finalized and published. All students must adhere to the schedule strictly.</p>
      
      <p><strong>Key Points:</strong></p>
      <ul>
        <li>Timetable is effective from January 20, 2026</li>
        <li>Classes will follow the regular schedule</li>
        <li>Lab sessions are marked in blue on the timetable</li>
        <li>Tutorial sessions are marked in green</li>
      </ul>
      
      <p><strong>Important Notes:</strong></p>
      <ul>
        <li>Attendance is mandatory for all classes</li>
        <li>Changes in timetable will be notified separately</li>
        <li>Contact your class representative for any conflicts</li>
      </ul>
      
      <p>Download the timetable from the attachments below.</p>
    `,
    date: "2026-01-21",
    time: "04:45 PM",
    category: "Academic",
    priority: "high",
    department: "Academic Office",
    issuedBy: "Dr. Arnab Patra",
    attachments: ["Sem4_Timetable.pdf"]
  },
  {
    id: 4,
    title: "Hostel Maintenance - Water Supply Interruption",
    description: "Due to pipeline maintenance work, water supply in Boys Hostel Block B will be interrupted from 9 AM to 5 PM on January 24, 2026. Alternative arrangements have been made.",
    fullContent: `
      <h2>Hostel Water Supply Maintenance Notice</h2>
      
      <p>Dear Hostel Residents,</p>
      
      <p>This is to inform you that due to essential pipeline maintenance work, the water supply in Boys Hostel Block B will be temporarily interrupted.</p>
      
      <p><strong>Affected Area:</strong> Boys Hostel Block B (All floors)</p>
      <p><strong>Date:</strong> January 24, 2026 (Saturday)</p>
      <p><strong>Time:</strong> 9:00 AM to 5:00 PM</p>
      
      <p><strong>Alternative Arrangements:</strong></p>
      <ul>
        <li>Water tanks have been placed on each floor</li>
        <li>Boys Hostel Block A water supply will remain normal</li>
        <li>Mess timings will remain unchanged</li>
      </ul>
      
      <p>We apologize for the inconvenience and request your cooperation.</p>
      
      <p><strong>Hostel Warden Office</strong></p>
    `,
    date: "2026-01-21",
    time: "03:20 PM",
    category: "Hostel",
    priority: "medium",
    department: "Hostel Management",
    issuedBy: "Dr. Pawan Kumar Mishra"
  },
  {
    id: 5,
    title: "Library Extended Hours for End-Semester Exams",
    description: "Central library will remain open 24/7 from January 25 to February 10, 2026 for end-semester exam preparation. Night canteen facilities will be available.",
    fullContent: `
      <h2>Library Extended Hours Announcement</h2>
      
      <p>To facilitate end-semester exam preparation, the Central Library will operate 24/7 during the following period:</p>
      
      <p><strong>Extended Hours Period:</strong> January 25 - February 10, 2026</p>
      
      <p><strong>Facilities Available:</strong></p>
      <ul>
        <li>All reading sections open 24/7</li>
        <li>Discussion rooms available (book in advance)</li>
        <li>Night canteen service from 10 PM to 6 AM</li>
        <li>Extra charging points installed</li>
        <li>Wi-Fi available throughout</li>
      </ul>
      
      <p><strong>Rules to Follow:</strong></p>
      <ul>
        <li>Carry your college ID card</li>
        <li>Maintain silence in reading areas</li>
        <li>No food items allowed except in designated areas</li>
        <li>Personal belongings responsibility</li>
      </ul>
      
      <p>Best wishes for your exams!</p>
    `,
    date: "2026-01-21",
    time: "11:00 AM",
    category: "Library",
    priority: "medium",
    department: "Central Library",
    issuedBy: "Library Committee",
    attachments: ["Library_Rules.pdf"]
  },
  {
    id: 6,
    title: "Sports Week 2026 Registrations Open",
    description: "Annual Sports Week will be held from February 20-25, 2026. Registrations for all events are now open. Last date: February 10, 2026.",
    fullContent: `
      <h2>Sports Week 2026 - Registration Notice</h2>
      
      <p>Get ready for the most exciting event of the year! Sports Week 2026 is here with more events and bigger prizes.</p>
      
      <p><strong>Dates:</strong> February 20-25, 2026</p>
      
      <p><strong>Events:</strong></p>
      <ul>
        <li><strong>Athletics:</strong> 100m, 200m, 400m, Long Jump, High Jump</li>
        <li><strong>Team Sports:</strong> Football, Basketball, Volleyball, Cricket</li>
        <li><strong>Indoor Games:</strong> Chess, Carrom, Table Tennis</li>
        <li><strong>Special Events:</strong> Marathon, Tug of War</li>
      </ul>
      
      <p><strong>Registration Details:</strong></p>
      <ul>
        <li>Register at Sports Complex Office</li>
        <li>Online registration available on portal</li>
        <li>Last Date: February 10, 2026</li>
        <li>Registration Fee: ₹100 per individual event</li>
      </ul>
      
      <p>For more details, visit the Sports Office.</p>
    `,
    date: "2026-01-20",
    time: "02:30 PM",
    category: "Sports",
    priority: "medium",
    department: "Sports Committee",
    issuedBy: "Dr. Mahavir Sharma"
  },
  {
    id: 7,
    title: "Medical Camp: Free Health Check-up",
    description: "A free health check-up camp will be organized at the Medical Center on January 25, 2026 from 10 AM to 4 PM. All students and staff are encouraged to participate.",
    fullContent: `
      <h2>Free Health Check-up Camp</h2>
      
      <p>The College Medical Center in collaboration with City General Hospital is organizing a free comprehensive health check-up camp for all students and staff members.</p>
      
      <p><strong>Date:</strong> January 25, 2026 (Saturday)</p>
      <p><strong>Time:</strong> 10:00 AM to 4:00 PM</p>
      <p><strong>Venue:</strong> Medical Center, Ground Floor, Admin Block</p>
      
      <p><strong>Tests Included:</strong></p>
      <ul>
        <li>Basic Health Checkup (BP, Sugar, Weight, Height)</li>
        <li>Eye Checkup</li>
        <li>Dental Checkup</li>
        <li>Nutritional Counseling</li>
        <li>Mental Health Consultation</li>
      </ul>
      
      <p><strong>Registration:</strong> No prior registration required. Walk-ins welcome.</p>
      
      <p>Take care of your health - it's your most valuable asset!</p>
    `,
    date: "2026-01-20",
    time: "10:00 AM",
    category: "Medical",
    priority: "medium",
    department: "Medical Center",
    issuedBy: "Dr. Anindita Ghosh"
  },
  {
    id: 8,
    title: "Fee Payment Deadline for Semester 4",
    description: "Last date for payment of Semester 4 tuition fee is January 31, 2026. Late payment will attract a fine of ₹500 per day.",
    fullContent: `
      <h2>Semester 4 Fee Payment Deadline</h2>
      
      <p>Attention all students! This is a reminder regarding the payment of Semester 4 tuition and hostel fees.</p>
      
      <p><strong>Last Date for Payment:</strong> January 31, 2026 (Saturday)</p>
      
      <p><strong>Payment Methods:</strong></p>
      <ul>
        <li>Online payment through college portal</li>
        <li>DD in favor of "College Name" payable at City Bank</li>
        <li>Cash payment at Accounts Office (10 AM - 4 PM)</li>
      </ul>
      
      <p><strong>Late Payment Charges:</strong></p>
      <ul>
        <li>₹500 per day after deadline</li>
        <li>No exam permission if fees pending</li>
        <li>Hostel accommodation may be suspended</li>
      </ul>
      
      <p>For fee structure and payment queries, contact Accounts Office.</p>
    `,
    date: "2026-01-19",
    time: "05:00 PM",
    category: "Finance",
    priority: "urgent",
    department: "Accounts Office",
    issuedBy: "Finance Department"
  },
  {
    id: 9,
    title: "Workshop on Machine Learning Applications",
    description: "Two-day workshop on 'Advanced Machine Learning Applications in Industry' scheduled for February 5-6, 2026. Limited seats available.",
    fullContent: `
      <h2>Machine Learning Workshop Announcement</h2>
      
      <p>The Department of Computer Science is organizing a two-day workshop on Advanced Machine Learning Applications.</p>
      
      <p><strong>Topic:</strong> "Real-world ML Applications: From Theory to Practice"</p>
      <p><strong>Dates:</strong> February 5-6, 2026</p>
      <p><strong>Timings:</strong> 9:30 AM to 5:00 PM</p>
      <p><strong>Venue:</strong> Computer Lab 3, IT Block</p>
      
      <p><strong>Workshop Highlights:</strong></p>
      <ul>
        <li>Hands-on sessions with Python and TensorFlow</li>
        <li>Industry case studies</li>
        <li>Project implementation guidance</li>
        <li>Certificate of participation</li>
      </ul>
      
      <p><strong>Registration:</strong> ₹500 per participant (includes lunch)</p>
      <p><strong>Seats:</strong> Limited to 40 participants</p>
      
      <p>Register at CS Department Office.</p>
    `,
    date: "2026-01-19",
    time: "02:15 PM",
    category: "Workshop",
    priority: "medium",
    department: "Computer Science",
    issuedBy: "Dr. Vinod Kumar Reddy"
  },
  {
    id: 10,
    title: "Cultural Fest Auditions Schedule",
    description: "Auditions for the Annual Cultural Fest 'Utsav 2026' will be held from January 27-29, 2026. All interested students must register online.",
    fullContent: `
      <h2>Utsav 2026 - Cultural Fest Auditions</h2>
      
      <p>Get ready to showcase your talent! Auditions for Utsav 2026 are around the corner.</p>
      
      <p><strong>Audition Dates:</strong> January 27-29, 2026</p>
      <p><strong>Venue:</strong> Cultural Hall, Block C</p>
      
      <p><strong>Categories:</strong></p>
      <ul>
        <li>Music: Solo Singing, Band Performance</li>
        <li>Dance: Solo, Group, Classical, Western</li>
        <li>Drama: Skits, Mime, Stand-up Comedy</li>
        <li>Fine Arts: Painting, Photography</li>
      </ul>
      
      <p><strong>Registration Process:</strong></p>
      <ol>
        <li>Fill online registration form</li>
        <li>Select audition time slot</li>
        <li>Report 15 minutes before scheduled time</li>
        <li>Bring your own instruments if required</li>
      </ol>
      
      <p>Last date for registration: January 25, 2026</p>
    `,
    date: "2026-01-18",
    time: "04:00 PM",
    category: "Cultural",
    priority: "medium",
    department: "Cultural Committee",
    issuedBy: "Student Council"
  },
  // Additional notices (11-30)
  {
    id: 11,
    title: "Scholarship Application Deadline Approaching",
    description: "Last date for submitting scholarship applications for economically weaker students is February 15, 2026.",
    fullContent: "Full content about scholarship...",
    date: "2026-01-18",
    time: "11:00 AM",
    category: "Scholarship",
    priority: "high",
    department: "Student Welfare",
    issuedBy: "Dr. Anubhav Pradhan"
  },
  {
    id: 12,
    title: "Internet Maintenance on January 23",
    description: "Campus Wi-Fi will be unavailable from 2 AM to 6 AM on January 23 for scheduled maintenance.",
    fullContent: "Full content about internet maintenance...",
    date: "2026-01-17",
    time: "03:45 PM",
    category: "IT",
    priority: "medium",
    department: "IT Department",
    issuedBy: "Network Administrator"
  },
  {
    id: 13,
    title: "Alumni Meet 2026 Save the Date",
    description: "Annual Alumni Meet scheduled for March 15, 2026. All alumni are invited to register.",
    fullContent: "Full content about alumni meet...",
    date: "2026-01-17",
    time: "10:30 AM",
    category: "Alumni",
    priority: "low",
    department: "Alumni Relations",
    issuedBy: "Alumni Association"
  },
  {
    id: 14,
    title: "Research Paper Publication Workshop",
    description: "Workshop on how to publish research papers in reputed journals on February 8, 2026.",
    fullContent: "Full content about research workshop...",
    date: "2026-01-16",
    time: "02:00 PM",
    category: "Research",
    priority: "medium",
    department: "Research Cell",
    issuedBy: "Dr. Baswade Anand"
  },
  {
    id: 15,
    title: "Hostel Room Change Applications",
    description: "Applications for hostel room changes will be accepted from January 25-30, 2026.",
    fullContent: "Full content about hostel room change...",
    date: "2026-01-16",
    time: "11:15 AM",
    category: "Hostel",
    priority: "medium",
    department: "Hostel Management",
    issuedBy: "Hostel Warden"
  },
  {
    id: 16,
    title: "Mid-Semester Exam Schedule Released",
    description: "Schedule for mid-semester examinations of Semester 4 has been published.",
    fullContent: "Full content about mid-semester exams...",
    date: "2026-01-15",
    time: "05:30 PM",
    category: "Exam",
    priority: "high",
    department: "Examination Cell",
    issuedBy: "Dr. Kuldeep Kataria"
  },
  {
    id: 17,
    title: "Cafeteria Menu Update",
    description: "New healthy food options added to cafeteria menu starting January 20, 2026.",
    fullContent: "Full content about cafeteria...",
    date: "2026-01-15",
    time: "01:00 PM",
    category: "Mess",
    priority: "low",
    department: "Food Committee",
    issuedBy: "Mess Committee"
  },
  {
    id: 18,
    title: "Book Bank Scheme Renewal",
    description: "Last date for Book Bank scheme renewal is January 31, 2026 for existing members.",
    fullContent: "Full content about book bank...",
    date: "2026-01-14",
    time: "03:00 PM",
    category: "Library",
    priority: "medium",
    department: "Central Library",
    issuedBy: "Library Committee"
  },
  {
    id: 19,
    title: "Environmental Awareness Program",
    description: "Tree plantation drive scheduled for January 28, 2026. Volunteers needed.",
    fullContent: "Full content about environmental program...",
    date: "2026-01-14",
    time: "10:00 AM",
    category: "Event",
    priority: "low",
    department: "NSS",
    issuedBy: "NSS Coordinator"
  },
  {
    id: 20,
    title: "Transport Bus Schedule Change",
    description: "Revised bus timings effective from January 22, 2026. Check new schedule.",
    fullContent: "Full content about transport...",
    date: "2026-01-13",
    time: "04:45 PM",
    category: "Transport",
    priority: "medium",
    department: "Transport Office",
    issuedBy: "Transport Incharge"
  },
  {
    id: 21,
    title: "Career Counseling Session",
    description: "Free career counseling for final year students on February 3, 2026.",
    fullContent: "Full content about career counseling...",
    date: "2026-01-13",
    time: "11:30 AM",
    category: "Career",
    priority: "medium",
    department: "Training & Placement",
    issuedBy: "Career Counselor"
  },
  {
    id: 22,
    title: "Power Backup Testing",
    description: "Generator testing on January 24 from 10 AM to 12 PM. Minor power fluctuations expected.",
    fullContent: "Full content about power backup...",
    date: "2026-01-12",
    time: "02:15 PM",
    category: "Maintenance",
    priority: "medium",
    department: "Electrical",
    issuedBy: "Maintenance Dept"
  },
  {
    id: 23,
    title: "Technical Symposium Registrations",
    description: "Annual technical symposium 'TechFest 2026' registrations open till February 5.",
    fullContent: "Full content about tech symposium...",
    date: "2026-01-12",
    time: "10:00 AM",
    category: "Technical",
    priority: "medium",
    department: "IEEE Club",
    issuedBy: "IEEE Coordinator"
  },
  {
    id: 24,
    title: "Hostel Fee Refund Process",
    description: "Process for hostel fee refund for students leaving hostel mid-semester.",
    fullContent: "Full content about fee refund...",
    date: "2026-01-11",
    time: "03:30 PM",
    category: "Finance",
    priority: "medium",
    department: "Accounts",
    issuedBy: "Accounts Office"
  },
  {
    id: 25,
    title: "Faculty Development Program",
    description: "FDP on 'Innovative Teaching Methods' from January 29-31, 2026.",
    fullContent: "Full content about FDP...",
    date: "2026-01-11",
    time: "09:45 AM",
    category: "Faculty",
    priority: "low",
    department: "HRD",
    issuedBy: "HR Department"
  },
  {
    id: 26,
    title: "Anti-Ragging Awareness Campaign",
    description: "Series of workshops on anti-ragging from January 25-27, 2026.",
    fullContent: "Full content about anti-ragging...",
    date: "2026-01-10",
    time: "04:00 PM",
    category: "Awareness",
    priority: "high",
    department: "Disciplinary",
    issuedBy: "Disciplinary Committee"
  },
  {
    id: 27,
    title: "Student Grievance Redressal Meeting",
    description: "Monthly meeting with student representatives on January 28, 2026.",
    fullContent: "Full content about grievance meeting...",
    date: "2026-01-10",
    time: "11:00 AM",
    category: "Administration",
    priority: "medium",
    department: "Dean Office",
    issuedBy: "Dean Student Welfare"
  },
  {
    id: 28,
    title: "Entrepreneurship Cell Launch",
    description: "New Entrepreneurship Cell launching ceremony on February 1, 2026.",
    fullContent: "Full content about E-cell...",
    date: "2026-01-09",
    time: "02:30 PM",
    category: "Entrepreneurship",
    priority: "medium",
    department: "E-Cell",
    issuedBy: "Startup Cell"
  },
  {
    id: 29,
    title: "Blood Donation Camp",
    description: "Voluntary blood donation camp on January 26, 2026. All eligible donors welcome.",
    fullContent: "Full content about blood donation...",
    date: "2026-01-09",
    time: "10:15 AM",
    category: "Medical",
    priority: "medium",
    department: "Medical Center",
    issuedBy: "Red Cross Society"
  },
  {
    id: 30,
    title: "Library New Arrivals",
    description: "New books added to computer science and engineering sections.",
    fullContent: "Full content about library books...",
    date: "2026-01-08",
    time: "03:00 PM",
    category: "Library",
    priority: "low",
    department: "Library",
    issuedBy: "Librarian"
  },
];

const getPriorityColor = (priority) => {
  switch(priority) {
    case "urgent": return "bg-red-100 text-red-800 border-red-200";
    case "high": return "bg-orange-100 text-orange-800 border-orange-200";
    case "medium": return "bg-blue-100 text-blue-800 border-blue-200";
    case "low": return "bg-gray-100 text-gray-800 border-gray-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getCategoryColor = (category) => {
  switch(category) {
    case "Exam": return "bg-purple-100 text-purple-800";
    case "Placement": return "bg-emerald-100 text-emerald-800";
    case "Academic": return "bg-blue-100 text-blue-800";
    case "Hostel": return "bg-amber-100 text-amber-800";
    case "Medical": return "bg-red-100 text-red-800";
    case "Library": return "bg-indigo-100 text-indigo-800";
    case "Sports": return "bg-green-100 text-green-800";
    case "Cultural": return "bg-pink-100 text-pink-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function Notices() {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [readNotices, setReadNotices] = useState([]);

  // Load read notices from localStorage
  useEffect(() => {
    const savedReadNotices = localStorage.getItem('readNotices');
    if (savedReadNotices) {
      setReadNotices(JSON.parse(savedReadNotices));
    }
  }, []);

  // Save read notices to localStorage
  useEffect(() => {
    localStorage.setItem('readNotices', JSON.stringify(readNotices));
  }, [readNotices]);

  const markAsRead = (noticeId) => {
    if (!readNotices.includes(noticeId)) {
      setReadNotices([...readNotices, noticeId]);
    }
  };

  const isNoticeRead = (noticeId) => {
    return readNotices.includes(noticeId);
  };

  // Sort notices by date (latest first)
  const sortedNotices = [...initialNotices].sort((a, b) => {
    const dateComparison = b.date.localeCompare(a.date);
    
    if (dateComparison !== 0) return dateComparison;
    
    return b.time.localeCompare(a.time);
  });

  // Categories array
  const categories = [
    { id: "all", label: "All Notices", icon: <Bell className="w-4 h-4" />, count: initialNotices.length },
    { id: "unread", label: "Unread", icon: <BellRing className="w-4 h-4" />, count: initialNotices.length - readNotices.length },
    { id: "urgent", label: "Urgent", icon: <AlertCircle className="w-4 h-4" />, count: initialNotices.filter(n => n.priority === "urgent").length },
    { id: "exam", label: "Exam", icon: <BookOpen className="w-4 h-4" />, count: initialNotices.filter(n => n.category === "Exam").length },
    { id: "academic", label: "Academic", icon: <GraduationCap className="w-4 h-4" />, count: initialNotices.filter(n => n.category === "Academic").length },
    { id: "placement", label: "Placement", icon: <Megaphone className="w-4 h-4" />, count: initialNotices.filter(n => n.category === "Placement").length },
    { id: "hostel", label: "Hostel", icon: <Building className="w-4 h-4" />, count: initialNotices.filter(n => n.category === "Hostel").length },
    { id: "medical", label: "Medical", icon: <AlertCircle className="w-4 h-4" />, count: initialNotices.filter(n => n.category === "Medical").length },
  ];

  // Filter notices based on category and search
  const filteredNotices = sortedNotices.filter(notice => {
    const matchesCategory = selectedCategory === "all" || 
      (selectedCategory === "urgent" ? notice.priority === "urgent" : 
       selectedCategory === "unread" ? !isNoticeRead(notice.id) :
       notice.category === selectedCategory);
    
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const visibleNotices = filteredNotices.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const isToday = (dateStr) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
  };

  const isYesterday = (dateStr) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return dateStr === yesterday.toISOString().split('T')[0];
  };

  const getDisplayDate = (dateStr) => {
    if (isToday(dateStr)) return "Today";
    if (isYesterday(dateStr)) return "Yesterday";
    return formatDate(dateStr);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-md">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Notices & Announcements
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Stay updated with important college announcements, notices, and critical information.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Notices</p>
                  <p className="text-2xl font-bold text-gray-900">{initialNotices.length}</p>
                </div>
                <Bell className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Urgent</p>
                  <p className="text-2xl font-bold text-red-600">{initialNotices.filter(n => n.priority === "urgent").length}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Today</p>
                  <p className="text-2xl font-bold text-gray-900">{initialNotices.filter(n => isToday(n.date)).length}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pinned</p>
                  <p className="text-2xl font-bold text-amber-600">{initialNotices.filter(n => n.pinned).length}</p>
                </div>
                <Pin className="w-8 h-8 text-amber-500" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Notices List */}
            <div className="lg:w-2/3">
              {/* Search and Filter Bar */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search notices by title, department, or content..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filter
                  </button>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${selectedCategory === category.id 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
                    >
                      {category.icon}
                      <span>{category.label}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-100'}`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notices List */}
              <div className="space-y-4">
                {visibleNotices.map((notice) => (
                  <div 
                    key={notice.id} 
                    className={`bg-white rounded-xl shadow-lg border transition-all hover:shadow-xl cursor-pointer ${selectedNotice?.id === notice.id ? 'ring-2 ring-blue-500' : ''} ${notice.pinned ? 'border-l-4 border-l-amber-500' : 'border-gray-200'} ${isNoticeRead(notice.id) ? 'opacity-80' : ''}`}
                    onClick={() => setSelectedNotice(notice)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {notice.pinned && (
                              <Pin className="w-4 h-4 text-amber-500 fill-amber-500" />
                            )}
                            {isNoticeRead(notice.id) && (
                              <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                Read ✓
                              </div>
                            )}
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notice.priority)}`}>
                              {notice.priority.toUpperCase()}
                            </span>
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getCategoryColor(notice.category)}`}>
                              {notice.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{notice.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">{notice.description}</p>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${selectedNotice?.id === notice.id ? 'rotate-90' : ''}`} />
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Building className="w-4 h-4" />
                            <span>{notice.department}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <User className="w-4 h-4" />
                            <span>{notice.issuedBy}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span className={`font-medium ${isToday(notice.date) ? 'text-green-600' : ''}`}>
                              {getDisplayDate(notice.date)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{notice.time}</span>
                          </div>
                        </div>
                      </div>
                      
                      {notice.attachments && notice.attachments.length > 0 && (
                        <div className="mt-4 flex items-center gap-2">
                          <Download className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {notice.attachments.length} attachment{notice.attachments.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {visibleNotices.length < filteredNotices.length && (
                <div className="mt-8 text-center">
                  <button
                    onClick={loadMore}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    Load More Notices (Show {Math.min(5, filteredNotices.length - visibleNotices.length)} more)
                  </button>
                  <p className="text-gray-500 text-sm mt-2">
                    Showing {visibleNotices.length} of {filteredNotices.length} notices
                  </p>
                </div>
              )}
            </div>

            {/* Right Column - Notice Details Sidebar */}
            <div className="lg:w-1/3">
              {selectedNotice ? (
                <div className="h-[calc(100vh-2rem)] flex flex-col bg-white rounded-xl shadow-lg border border-gray-200">
                  {/* Sidebar Header */}
                  <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedNotice(null)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors lg:hidden"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <h2 className="text-lg font-bold text-gray-900">Notice Details</h2>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                          <Printer className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setSelectedNotice(null)}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedNotice.priority)}`}>
                        {selectedNotice.priority.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getCategoryColor(selectedNotice.category)}`}>
                        {selectedNotice.category}
                      </span>
                      {selectedNotice.pinned && (
                        <Pin className="w-4 h-4 text-amber-500 fill-amber-500" />
                      )}
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-3">{selectedNotice.title}</h2>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        <span>{selectedNotice.department}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{selectedNotice.issuedBy}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(selectedNotice.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{selectedNotice.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Content Area */}
                  <div className="flex-1 overflow-y-auto p-6">
                    {/* Notice Content */}
                    <div 
                      className="prose prose-blue max-w-none mb-8"
                      dangerouslySetInnerHTML={{ __html: selectedNotice.fullContent }}
                    />
                    
                    {/* Attachments */}
                    {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                      <div className="mt-8 pt-8 border-t border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Attachments ({selectedNotice.attachments.length})
                        </h3>
                        <div className="space-y-3">
                          {selectedNotice.attachments.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  <Download className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-700">{file}</span>
                                  <p className="text-xs text-gray-500 mt-1">PDF Document • 2.4 MB</p>
                                </div>
                              </div>
                              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                Download
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar Footer */}
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => markAsRead(selectedNotice.id)}
                        className={`flex-1 px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                          isNoticeRead(selectedNotice.id)
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        } transition-colors`}
                      >
                        <BellRing className="w-4 h-4" />
                        {isNoticeRead(selectedNotice.id) ? 'Marked as Read ✓' : 'Mark as Read'}
                      </button>
                      <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-3">
                      Last updated: {formatDate(selectedNotice.date)} at {selectedNotice.time}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center h-[calc(100vh-2rem)] flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Eye className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Select a Notice</h3>
                  <p className="text-gray-600 mb-8 max-w-md">
                    Click on any notice from the list to view its full details, attachments, and take actions here.
                  </p>
                  <div className="space-y-4 text-left max-w-xs">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">View full notice content</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Download attachments</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Share important notices</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Mark notices as read</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-gray-900 mb-4">Notice Statistics</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Total Notices</span>
                    <span className="font-bold text-gray-900">{initialNotices.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Unread Notices</span>
                    <span className="font-bold text-blue-600">{initialNotices.length - readNotices.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Read Notices</span>
                    <span className="font-bold text-green-600">{readNotices.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Urgent Unread</span>
                    <span className="font-bold text-red-600">{initialNotices.filter(n => n.priority === "urgent" && !isNoticeRead(n.id)).length}</span>
                  </div>
                </div>
                
                {readNotices.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Clear all read notices? This will mark all notices as unread.')) {
                        setReadNotices([]);
                      }
                    }}
                    className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                  >
                    Clear All Read Notices
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}