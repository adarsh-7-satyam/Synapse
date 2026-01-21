import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Stethoscope,
  Phone,
  Calendar,
  MapPin,
  Clock,
  AlertCircle,
  MessageSquare,
  Video,
  Brain,
  Map,
  Search,
  Heart,
  Users,
  Building2,
  Pill,
  Navigation,
  Plus,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

// ============ DATA ============

const doctorsData = [
  { id: 1, name: "Dr. Atul Prakash Srivastava", specialization: "General & Emergency Physician", availableDays: "Mon–Fri", timings: "09:30 AM–06:00 PM" },
  { id: 2, name: "Dr. Ankur Parganiha", specialization: "Paediatric", availableDays: "1st & 3rd Fri", timings: "02:00 PM–04:00 PM" },
  { id: 3, name: "Dr. Anuj Gupta", specialization: "ENT", availableDays: "2nd & 4th Fri", timings: "03:00 PM–05:00 PM" },
  { id: 4, name: "Dr. Vishal Agrawal", specialization: "General Medicine", availableDays: "2nd & 4th Tue", timings: "04:00 PM–06:00 PM" },
  { id: 5, name: "Dr. Rahul Thakur", specialization: "Orthopaedic", availableDays: "1st & 3rd Wed", timings: "04:00 PM–06:00 PM" },
  { id: 6, name: "Dr. Saket Banchhore", specialization: "Dentist", availableDays: "2nd & 4th Wed", timings: "02:00 PM–04:00 PM" },
  { id: 7, name: "Dr. Alloukik Agrawal", specialization: "Psychiatry", availableDays: "1st & 3rd Thu", timings: "12:00 PM–02:00 PM" },
  { id: 8, name: "Dr. Bhuvaneshwari Dewangan", specialization: "Dermatology", availableDays: "2nd & 4th Thu", timings: "01:30 PM–03:30 PM" },
  { id: 9, name: "Dr. Monideepa Saha", specialization: "Obs & Gynae", availableDays: "All Tuesdays", timings: "03:30 PM–05:30 PM" },
  { id: 10, name: "Dr. Suyas Noel", specialization: "Ophthalmologist", availableDays: "2nd Saturday", timings: "10:00 AM–12:00 PM" },
  { id: 11, name: "Dr. Anushree", specialization: "Physiotherapy", availableDays: "Mon–Sat", timings: "09:00 AM–03:00 PM" },
  { id: 12, name: "Dr. Pavendra Chandrakar", specialization: "Yoga", availableDays: "Mon–Sat", timings: "06:00 AM–08:00 AM & 05:00 PM–07:00 PM" },
];

const emergencyContacts = [
  { title: "Health Centre Telephone", number: "07882991612", icon: Phone },
  { title: "Health Centre Helpline", number: "09424283691", icon: Phone },
  { title: "Ambulance", number: "07647068419", icon: AlertCircle },
];

const hospitalsData = [
  { id: 1, name: "Max Healthcare", distance: 2.5, specialization: "Multi-specialty", helpline: "1860-500-5000", availability: "24x7" },
  { id: 2, name: "Apollo Hospital", distance: 3.8, specialization: "Cardiology, Neurology", helpline: "1860-500-1066", availability: "24x7" },
  { id: 3, name: "Fortis Hospital", distance: 1.9, specialization: "Emergency, General Surgery", helpline: "1860-123-1010", availability: "24x7" },
  { id: 4, name: "City Hospital", distance: 4.2, specialization: "General Medicine", helpline: "0755-4092000", availability: "24x7" },
];

const medicalStoresData = [
  { id: 1, name: "MedPlus Pharmacy", distance: 0.8, phone: "09876543210", timings: "07:00 AM–11:00 PM" },
  { id: 2, name: "Apollo Pharmacy", distance: 1.2, phone: "09876543211", timings: "08:00 AM–10:00 PM" },
  { id: 3, name: "Health First Pharmacy", distance: 1.5, phone: "09876543212", timings: "24x7" },
  { id: 4, name: "City Pharmacy", distance: 2.1, phone: "09876543213", timings: "07:00 AM–09:00 PM" },
];

const mentalHealthQuestions = [
  { id: 1, question: "How often do you feel anxious or stressed?", category: "anxiety" },
  { id: 2, question: "Do you have trouble sleeping or concentration?", category: "stress" },
  { id: 3, question: "How would you rate your mood today?", category: "mood" },
  { id: 4, question: "Do you feel overwhelmed by daily responsibilities?", category: "stress" },
  { id: 5, question: "How often do you experience mood swings?", category: "mood" },
  { id: 6, question: "Do you find it difficult to handle interpersonal conflicts?", category: "anxiety" },
  { id: 7, question: "How is your appetite and eating pattern?", category: "physical" },
  { id: 8, question: "Do you have any thoughts of self-harm or suicide?", category: "critical" },
];

// ============ COMPONENTS ============

// Tab 1: Overview
function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-0">
        <h2 className="text-3xl font-bold mb-2">Campus Health Centre</h2>
        <p className="text-muted-foreground mb-6">Your trusted partner in campus wellness and healthcare</p>
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Calendar size={18} /> Book Appointment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book an Appointment</DialogTitle>
                <DialogDescription>Select a doctor and preferred time</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <p className="text-sm text-muted-foreground">Feature fully integrated in "Online Consultation" tab</p>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="gap-2">
            <AlertCircle size={18} /> Emergency Call
          </Button>
        </div>
      </Card>

      {/* Health Centre Timings */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock size={20} className="text-primary" />
            Health Centre Timings
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between pb-3 border-b">
              <span className="font-medium">Monday to Friday</span>
              <span className="text-muted-foreground">09:00 AM – 05:30 PM</span>
            </div>
            <div className="flex justify-between pb-3 border-b">
              <span className="font-medium">Saturday, Sunday & Holidays</span>
              <span className="text-muted-foreground">09:00 AM – 05:30 PM</span>
            </div>
            <div className="flex justify-between pt-3 bg-red-50 p-3 rounded-lg">
              <span className="font-semibold text-red-900">Emergency</span>
              <span className="font-bold text-red-900">24x7</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Stethoscope size={20} className="text-primary" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Users size={18} />
              View All Doctors
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <AlertCircle size={18} />
              Emergency Contacts
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Building2 size={18} />
              View Hospitals
            </Button>
          </div>
        </Card>
      </div>

      {/* Important Information */}
      <Card className="p-6 bg-yellow-50 border-yellow-200">
        <div className="flex gap-4">
          <AlertCircle size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-yellow-900 mb-2">Important Medical Instructions</h4>
            <ul className="space-y-1 text-sm text-yellow-800 list-disc list-inside">
              <li>Please bring your college ID for all medical consultations</li>
              <li>Arrive 10 minutes early for appointments</li>
              <li>For emergencies, call 07647068419 immediately</li>
              <li>All prescriptions and medical reports are confidential</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Tab 2: Doctors & Timings
function DoctorsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("");

  const filteredDoctors = doctorsData.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialization = !filterSpecialization || doctor.specialization.includes(filterSpecialization);
    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search doctor by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="gap-2"
            icon={<Search size={18} />}
          />
        </div>
        <select
          value={filterSpecialization}
          onChange={(e) => setFilterSpecialization(e.target.value)}
          className="px-4 py-2 rounded-lg border border-border bg-background"
        >
          <option value="">All Specializations</option>
          <option value="General">General Medicine</option>
          <option value="Dental">Dental</option>
          <option value="Psychiatry">Psychiatry</option>
        </select>
      </div>

      {/* Doctors Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-4 font-semibold">Sr No</th>
              <th className="text-left p-4 font-semibold">Doctor Name</th>
              <th className="text-left p-4 font-semibold">Specialization</th>
              <th className="text-left p-4 font-semibold">Available Days</th>
              <th className="text-left p-4 font-semibold">Timings</th>
              <th className="text-left p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor, index) => (
              <tr key={doctor.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">{index + 1}</td>
                <td className="p-4 font-medium">{doctor.name}</td>
                <td className="p-4">{doctor.specialization}</td>
                <td className="p-4">{doctor.availableDays}</td>
                <td className="p-4 text-muted-foreground">{doctor.timings}</td>
                <td className="p-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">Book</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Book Appointment</DialogTitle>
                        <DialogDescription>with {doctor.name} - {doctor.specialization}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label>Preferred Date</Label>
                          <Input type="date" />
                        </div>
                        <div>
                          <Label>Symptoms / Reason for Visit</Label>
                          <Textarea placeholder="Brief description..." />
                        </div>
                        <Button className="w-full">Confirm Appointment</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredDoctors.length === 0 && (
        <Card className="p-8 text-center bg-gray-50">
          <p className="text-muted-foreground">No doctors found matching your criteria</p>
        </Card>
      )}
    </div>
  );
}

// Tab 3: Emergency Contacts
function EmergencyContactsTab() {
  return (
    <div className="space-y-6">
      {/* Emergency Warning */}
      <Card className="p-6 bg-red-50 border-red-200">
        <div className="flex gap-4">
          <AlertCircle size={28} className="text-red-600 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-red-900 mb-2">In case of medical emergency</h3>
            <p className="text-red-800">Call the ambulance number immediately: <span className="font-bold text-2xl">07647068419</span></p>
          </div>
        </div>
      </Card>

      {/* Emergency Contacts Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {emergencyContacts.map((contact, index) => {
          const IconComponent = contact.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <IconComponent size={24} className="text-primary" />
                <Badge variant="outline">Important</Badge>
              </div>
              <h3 className="font-semibold mb-3">{contact.title}</h3>
              <p className="text-2xl font-bold text-primary mb-4">{contact.number}</p>
              <Button className="w-full gap-2">
                <Phone size={18} />
                Call Now
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Additional Emergency Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">On-call Services</h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>On-call Doctors (available 24/7)</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>Nursing Staff (available 24/7)</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>Psychological Counselor (on call)</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>Ambulance Service (immediate dispatch)</span>
          </li>
        </ul>
      </Card>

      {/* Quick Tips */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Emergency Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800 list-disc list-inside">
          <li>Always keep emergency numbers saved in your phone</li>
          <li>Know your blood type and any allergies</li>
          <li>Keep important medical documents handy</li>
          <li>Share emergency contacts with close friends and family</li>
        </ul>
      </Card>
    </div>
  );
}

// Tab 4: Hospitals & Medical Stores
function HospitalsTab() {
  const [hospitalSubTab, setHospitalSubTab] = useState("hospitals");

  return (
    <div className="space-y-6">
      {/* Sub-tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setHospitalSubTab("hospitals")}
          className={`pb-4 px-4 font-medium transition-colors ${
            hospitalSubTab === "hospitals"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Building2 size={18} className="inline mr-2" />
          Nearby Hospitals
        </button>
        <button
          onClick={() => setHospitalSubTab("stores")}
          className={`pb-4 px-4 font-medium transition-colors ${
            hospitalSubTab === "stores"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Pill size={18} className="inline mr-2" />
          Medical Stores
        </button>
      </div>

      {/* Hospitals Content */}
      {hospitalSubTab === "hospitals" && (
        <div className="grid md:grid-cols-2 gap-6">
          {hospitalsData.map((hospital) => (
            <Card key={hospital.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{hospital.name}</h3>
                <Badge className="bg-green-100 text-green-800">{hospital.availability}</Badge>
              </div>
              <div className="space-y-3 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-muted-foreground" />
                  <span>{hospital.distance} km away</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope size={16} className="text-muted-foreground" />
                  <span>{hospital.specialization}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-muted-foreground" />
                  <span>{hospital.helpline}</span>
                </div>
              </div>
              <Button className="w-full gap-2">
                <Navigation size={18} />
                View on Map
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* Medical Stores Content */}
      {hospitalSubTab === "stores" && (
        <div className="grid md:grid-cols-2 gap-6">
          {medicalStoresData.map((store) => (
            <Card key={store.id} className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-4">{store.name}</h3>
              <div className="space-y-3 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-muted-foreground" />
                  <span>{store.distance} km away</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-muted-foreground" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-muted-foreground" />
                  <span>{store.timings}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full gap-2">
                <Phone size={18} />
                Call
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// Tab 5: Online Consultation
function OnlineConsultationTab() {
  const [appointments, setAppointments] = useState([
    { id: 1, doctor: "Dr. Atul Prakash", date: "2024-01-25", time: "02:00 PM", status: "confirmed" },
  ]);

  return (
    <div className="space-y-6">
      {/* Book Appointment Section */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Plus size={20} /> Book New Appointment
        </h3>
        <div className="grid md:grid-cols-4 gap-4 mb-4">
          <div>
            <Label className="text-sm">Doctor</Label>
            <select className="w-full mt-2 px-3 py-2 rounded-lg border border-border">
              <option>Select Doctor</option>
              {doctorsData.map((doc) => (
                <option key={doc.id} value={doc.name}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-sm">Preferred Date</Label>
            <Input type="date" className="mt-2" />
          </div>
          <div>
            <Label className="text-sm">Preferred Time</Label>
            <Input type="time" className="mt-2" />
          </div>
          <div className="flex items-end">
            <Button className="w-full">Book Appointment</Button>
          </div>
        </div>
      </Card>

      {/* My Appointments */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar size={20} /> My Appointments
        </h3>
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div key={apt.id} className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold">{apt.doctor}</h4>
                  <p className="text-sm text-muted-foreground">
                    {apt.date} at {apt.time}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">{apt.status}</Badge>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageSquare size={16} />
                  Reschedule
                </Button>
                <Button size="sm" className="gap-2 bg-green-600 hover:bg-green-700">
                  <Video size={16} />
                  Join Video Call
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Video Call Interface Placeholder */}
      <Card className="p-6 bg-gray-900 text-white min-h-96 flex flex-col items-center justify-center rounded-lg">
        <Video size={48} className="mb-4 opacity-50" />
        <p className="text-lg font-semibold mb-2">Video Consultation</p>
        <p className="text-gray-400 text-sm">Ready to connect - awaiting appointment time</p>
      </Card>
    </div>
  );
}

// Tab 6: Mental Wellness
function MentalWellnessTab() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [mentalHealthQuestions[currentQuestion].id]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < mentalHealthQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const finishAssessment = () => {
    if (Object.keys(answers).length === mentalHealthQuestions.length) {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    const values = Object.values(answers);
    return values.length > 0 ? Math.round((values.reduce((a, b) => a + b, 0) / (values.length * 5)) * 100) : 0;
  };

  const getRecommendation = (score: number) => {
    if (score >= 70) return { level: "High", text: "Please consult a healthcare professional", color: "red" };
    if (score >= 40) return { level: "Moderate", text: "Consider talking to a counselor", color: "yellow" };
    return { level: "Low", text: "You're doing well, continue self-care practices", color: "green" };
  };

  if (showResults) {
    const score = calculateScore();
    const recommendation = getRecommendation(score);
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Assessment Complete</h2>
          <p className="text-muted-foreground mb-8">Here are your results</p>

          <div className={`p-6 rounded-lg mb-6 bg-${recommendation.color}-50`}>
            <p className="text-lg font-semibold mb-2">Wellness Level: {recommendation.level}</p>
            <div className="text-4xl font-bold mb-4">{score}%</div>
            <p className="text-base">{recommendation.text}</p>
          </div>

          <div className="space-y-3 text-left mb-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold">Recommendations:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Practice daily meditation or breathing exercises</li>
              <li>Maintain a regular sleep schedule</li>
              <li>Engage in physical activities or sports</li>
              <li>Connect with friends and family regularly</li>
              <li>Limit screen time, especially before bed</li>
            </ul>
          </div>

          <Card className="p-4 bg-yellow-50 border-yellow-200 mb-6">
            <p className="text-xs text-yellow-800">
              <strong>Disclaimer:</strong> This assessment is not a medical diagnosis. Please consult with a mental health professional for proper evaluation and treatment.
            </p>
          </Card>

          <Button onClick={() => { setShowResults(false); setCurrentQuestion(0); setAnswers({}); }} className="w-full">
            Start New Assessment
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card className="p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Mental Wellness Assessment</h3>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {mentalHealthQuestions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / mentalHealthQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">{mentalHealthQuestions[currentQuestion].question}</h2>

          <RadioGroup onValueChange={(value) => handleAnswer(parseInt(value))}>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="1" id="never" />
                <Label htmlFor="never" className="cursor-pointer flex-1">Never</Label>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="2" id="rarely" />
                <Label htmlFor="rarely" className="cursor-pointer flex-1">Rarely</Label>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="3" id="sometimes" />
                <Label htmlFor="sometimes" className="cursor-pointer flex-1">Sometimes</Label>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="4" id="often" />
                <Label htmlFor="often" className="cursor-pointer flex-1">Often</Label>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="5" id="always" />
                <Label htmlFor="always" className="cursor-pointer flex-1">Always</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          {currentQuestion < mentalHealthQuestions.length - 1 ? (
            <Button onClick={nextQuestion} className="flex-1" disabled={!answers[mentalHealthQuestions[currentQuestion].id]}>
              Next
            </Button>
          ) : (
            <Button onClick={finishAssessment} className="flex-1" disabled={!answers[mentalHealthQuestions[currentQuestion].id]}>
              Finish Assessment
            </Button>
          )}
        </div>
      </Card>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <p className="text-xs text-blue-800">
          <strong>Disclaimer:</strong> This assessment is not a medical diagnosis. Please consult with a mental health professional for proper evaluation.
        </p>
      </Card>
    </div>
  );
}

// Tab 7: Maps & Navigation
function MapsTab() {
  return (
    <div className="space-y-6">
      {/* Map Placeholder */}
      <Card className="p-0 overflow-hidden h-96 bg-gray-200 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 flex flex-col items-center justify-center">
          <Map size={64} className="text-gray-400 mb-4" />
          <p className="text-gray-500 font-semibold">Campus Map Placeholder</p>
          <p className="text-gray-400 text-sm">Google Maps Integration Ready</p>
        </div>
      </Card>

      {/* Navigation Options */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Health Centre */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Stethoscope size={20} className="text-primary" />
            Health Centre
          </h3>
          <div className="space-y-3 mb-4 text-sm">
            <p><strong>Location:</strong> Building A, Ground Floor</p>
            <p><strong>Distance:</strong> 150 meters from main gate</p>
            <p><strong>ETA:</strong> 2 minutes walk</p>
          </div>
          <Button className="w-full gap-2">
            <Navigation size={18} />
            Get Directions
          </Button>
        </Card>

        {/* Nearest Hospital */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Building2 size={20} className="text-primary" />
            Nearest Hospital
          </h3>
          <div className="space-y-3 mb-4 text-sm">
            <p><strong>Name:</strong> Fortis Hospital</p>
            <p><strong>Distance:</strong> 1.9 km</p>
            <p><strong>ETA:</strong> 5 minutes by car</p>
          </div>
          <Button className="w-full gap-2">
            <Navigation size={18} />
            Get Route
          </Button>
        </Card>
      </div>

      {/* Locations List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Medical Facilities on Campus</h3>
        <div className="space-y-3">
          {[
            { name: "Main Health Centre", building: "Building A", floor: "Ground Floor" },
            { name: "Mental Health Counselling", building: "Building B", floor: "1st Floor" },
            { name: "Physiotherapy Clinic", building: "Building C", floor: "Ground Floor" },
            { name: "First Aid Kiosk", building: "Sports Complex", floor: "Main Hall" },
          ].map((location, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <div>
                <p className="font-medium">{location.name}</p>
                <p className="text-sm text-muted-foreground">{location.building} - {location.floor}</p>
              </div>
              <Button size="sm" variant="ghost">
                <ChevronRight size={18} />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============ MAIN COMPONENT ============

export default function Medical() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Medical & Healthcare</h1>
            <p className="text-muted-foreground mt-2">Comprehensive healthcare access for all campus members</p>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
            <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
            <TabsTrigger value="consultation">Consultation</TabsTrigger>
            <TabsTrigger value="mental">Wellness</TabsTrigger>
            <TabsTrigger value="maps">Maps</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="doctors">
            <DoctorsTab />
          </TabsContent>

          <TabsContent value="emergency">
            <EmergencyContactsTab />
          </TabsContent>

          <TabsContent value="hospitals">
            <HospitalsTab />
          </TabsContent>

          <TabsContent value="consultation">
            <OnlineConsultationTab />
          </TabsContent>

          <TabsContent value="mental">
            <MentalWellnessTab />
          </TabsContent>

          <TabsContent value="maps">
            <MapsTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
