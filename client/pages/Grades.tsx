import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  BookOpen, 
  Calendar,
  CheckCircle,
  Award,
  Calculator,
  Cpu,
  Brain,
  Database,
  Code,
  Beaker,
  Zap,
  Hash,
  BookText,
  Users,
  Globe,
  Target,
  Activity
} from "lucide-react";

// Define the correct grading system (A+ and A both = 10, A- = 9, B = 8, B- = 7, etc.)
const gradePoints = {
  "A+": 10,
  "A": 10,
  "A-": 9,
  "B": 8,
  "B-": 7,
  "C": 6,
  "C-": 5,
  "D": 4,
  "F": 0
};

// Course data for 3 semesters using your exact courses
const semesterData = [
  {
    semester: 1,
    name: "2024-25-M",
    program: "B.Tech Computer Science and Engineering",
    courses: [
      { code: "PHP102", title: "PHYSICS LAB", type: "Institute Core", credits: 1.5, grade: "A-" },
      { code: "CYL100", title: "APPLIED CHEMISTRY", type: "Institute Core", credits: 3, grade: "A" },
      { code: "CYL101", title: "ENVIRONMENTAL SCIENCE", type: "Institute Core", credits: 1, grade: "A" },
      { code: "CSL100", title: "INTRODUCTION TO PROGRAMMING", type: "Institute Core", credits: 4.5, grade: "A" },
      { code: "MAL100", title: "MATHEMATICS-I", type: "Institute Core", credits: 4, grade: "A-" },
      { code: "PHL101", title: "PHYSICS FOR ENGINEERS", type: "Institute Core", credits: 4, grade: "B" },
      { code: "LAN102", title: "SPEAKING AND WRITING SKILLS", type: "Non-graded", credits: 2, grade: "A" },
      { code: "NCN100", title: "PRACTICES FOR COMPREHENSIVE WELLBEING", type: "Non-graded", credits: 1, grade: "B" },
      { code: "NCN102", title: "National Sports Organization", type: "Non-graded", credits: 1, grade: "A" }
    ]
  },
  {
    semester: 2,
    name: "2024-25-W",
    program: "B.Tech Computer Science and Engineering",
    courses: [
      { code: "ECL101", title: "BASIC ELECTRONICS ENGINEERING", type: "Institute Core", credits: 4, grade: "B" },
      { code: "CYP102", title: "CHEMISTRY LAB", type: "Institute Core", credits: 1.5, grade: "A-" },
      { code: "BML101", title: "BIOLOGY FOR ENGINEERS", type: "Institute Core", credits: 3, grade: "B" },
      { code: "MEP102", title: "DIGITAL FABRICATION", type: "Institute Core", credits: 3, grade: "A-" },
      { code: "MAL101", title: "MATHEMATICS-II", type: "Institute Core", credits: 4, grade: "A" },
      { code: "EEL101", title: "BASIC ELECTRICAL ENGINEERING", type: "Institute Core", credits: 4, grade: "B" },
      { code: "LAN103", title: "PROFESSIONAL ETHICS", type: "Non-graded", credits: 1, grade: "A" },
      { code: "NCN102", title: "National Sports Organization", type: "Non-graded", credits: 1, grade: "B" }
    ]
  },
  {
    semester: 3,
    name: "2025-26-M",
    program: "B.Tech Computer Science and Engineering",
    courses: [
      { code: "LAL100", title: "INTRODUCTION TO COMMUNICATION SKILLS", type: "Institute Core", credits: 2, grade: "A" },
      { code: "LAL221", title: "INDIAN WRITING IN ENGLISH", type: "Liberal Art", credits: 2, grade: "A-" },
      { code: "NCN102", title: "National Sports Organization", type: "Non-graded", credits: 1, grade: "B" },
      { code: "CSL202", title: "DATA STRUCTURES", type: "Program Core", credits: 4, grade: "A" },
      { code: "CSL201", title: "DISCRETE MATHEMATICS", type: "Program Core", credits: 4, grade: "A-" },
      { code: "CSP203", title: "SOFTWARE TOOLS & TECHNOLOGIES LAB", type: "Program Core", credits: 3, grade: "B" },
      { code: "MAL403", title: "PROBABILITY AND STATISTICS", type: "Program Linked", credits: 4, grade: "A" }
    ]
  },
  {
    semester: 4,
    name: "2025-26-W",
    program: "B.Tech Computer Science and Engineering",
    courses: [
      { code: "LAL101", title: "INTRODUCTION TO FINANCE", type: "Liberal Art", credits: 1, grade: "In Progress" },
      { code: "LAL224", title: "INTRODUCTION TO POSTCOLONIAL LITERATURE", type: "Liberal Art", credits: 2, grade: "In Progress" },
      { code: "LAL249", title: "INTRODUCTION TO UNDERSTANDING PSYCHOLOGICAL...", type: "Liberal Art", credits: 2, grade: "In Progress" },
      { code: "NCN102", title: "National Sports Organization", type: "Non-graded", credits: 2, grade: "In Progress" },
      { code: "CSL253", title: "THEORY OF COMPUTATION", type: "Program Core", credits: 4, grade: "In Progress" },
      { code: "CSL251", title: "COMPUTER ORGANIZATION AND ARCHITECTURE", type: "Program Core", credits: 4, grade: "In Progress" },
      { code: "CSL252", title: "DESIGN AND ANALYSIS OF ALGORITHMS", type: "Program Core", credits: 4, grade: "In Progress" }
    ]
  }
];

// Calculate SGPA for a semester
const calculateSGPA = (courses) => {
  let totalCredits = 0;
  let totalGradePoints = 0;
  
  courses.forEach(course => {
    if (course.grade !== "In Progress" && gradePoints[course.grade] !== undefined) {
      totalCredits += course.credits;
      totalGradePoints += gradePoints[course.grade] * course.credits;
    }
  });
  
  return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "0.00";
};

// Calculate CGPA across all completed semesters
const calculateCGPA = () => {
  let totalCredits = 0;
  let totalGradePoints = 0;
  
  // Only include completed semesters (1-3)
  semesterData.slice(0, 3).forEach(semester => {
    semester.courses.forEach(course => {
      if (course.grade !== "In Progress" && gradePoints[course.grade] !== undefined) {
        totalCredits += course.credits;
        totalGradePoints += gradePoints[course.grade] * course.credits;
      }
    });
  });
  
  return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "0.00";
};

// Get grade color based on grade
const getGradeColor = (grade) => {
  switch(grade) {
    case "A+":
    case "A":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "A-":
      return "bg-green-100 text-green-800 border-green-200";
    case "B":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "B-":
      return "bg-cyan-100 text-cyan-800 border-cyan-200";
    case "C":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "C-":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "D":
      return "bg-red-100 text-red-800 border-red-200";
    case "In Progress":
      return "bg-slate-100 text-slate-800 border-slate-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Get type color based on course type
const getTypeColor = (type) => {
  switch (type) {
    case "Institute Core":
      return "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700";
    case "Program Core":
      return "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700";
    case "Program Linked":
      return "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700";
    case "Liberal Art":
      return "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700";
    case "Non-graded":
      return "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700";
    default:
      return "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700";
  }
};

// Get icon for course based on code
const getCourseIcon = (code) => {
  if (code.startsWith("CS")) {
    if (code.includes("100")) return <Code className="w-5 h-5" />;
    if (code.includes("201") || code.includes("202")) return <Database className="w-5 h-5" />;
    if (code.includes("251") || code.includes("252") || code.includes("253")) return <Cpu className="w-5 h-5" />;
    return <Code className="w-5 h-5" />;
  } else if (code.startsWith("MA") || code.includes("403")) {
    return <Calculator className="w-5 h-5" />;
  } else if (code.startsWith("LA")) {
    return <BookText className="w-5 h-5" />;
  } else if (code.startsWith("PH")) {
    return <Zap className="w-5 h-5" />;
  } else if (code.startsWith("CY")) {
    return <Beaker className="w-5 h-5" />;
  } else if (code.startsWith("EE") || code.startsWith("EC")) {
    return <Activity className="w-5 h-5" />;
  } else if (code.startsWith("BM")) {
    return <Brain className="w-5 h-5" />;
  } else if (code.startsWith("ME")) {
    return <Target className="w-5 h-5" />;
  } else if (code.startsWith("NC")) {
    return <Users className="w-5 h-5" />;
  } else {
    return <BookOpen className="w-5 h-5" />;
  }
};

export default function Grades() {
  const [activeSemester, setActiveSemester] = useState(4); 
  const [sgpaData, setSgpaData] = useState([]);
  
  useEffect(() => {
    // Calculate SGPA for each completed semester
    const sgpaValues = semesterData.slice(0, 3).map(sem => ({
      semester: sem.semester,
      name: sem.name,
      sgpa: calculateSGPA(sem.courses)
    }));
    setSgpaData(sgpaValues);
  }, []);
  
  const currentSemester = semesterData.find(sem => sem.semester === activeSemester);
  const cgpa = calculateCGPA();
  
  // Calculate statistics
  const totalCompletedCourses = semesterData.slice(0, 3).reduce((sum, sem) => 
    sum + sem.courses.filter(c => c.grade !== "In Progress").length, 0);
  
  const totalCompletedCredits = semesterData.slice(0, 3).reduce((sum, sem) => 
    sum + sem.courses.filter(c => c.grade !== "In Progress").reduce((credits, course) => credits + course.credits, 0), 0);
  
  const highestGradeCount = semesterData.slice(0, 3).reduce((count, sem) => {
    return count + sem.courses.filter(c => c.grade === "A" || c.grade === "A+").length;
  }, 0);

  const gradeDistribution = {
    "A/A+": semesterData.slice(0, 3).reduce((count, sem) => 
      count + sem.courses.filter(c => c.grade === "A" || c.grade === "A+").length, 0),
    "A-": semesterData.slice(0, 3).reduce((count, sem) => 
      count + sem.courses.filter(c => c.grade === "A-").length, 0),
    "B": semesterData.slice(0, 3).reduce((count, sem) => 
      count + sem.courses.filter(c => c.grade === "B").length, 0),
    "B-": semesterData.slice(0, 3).reduce((count, sem) => 
      count + sem.courses.filter(c => c.grade === "B-").length, 0),
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Grades & Performance
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            View your academic performance, internal marks, CGPA, and performance trends.
          </p>
        </div>
        
        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Overall CGPA</h3>
              <Award className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-gray-900">{cgpa}</span>
              <span className="text-gray-500 mb-1">/ 10.00</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Based on {totalCompletedCourses} completed courses</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Current Semester SGPA</h3>
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-gray-900">
                {activeSemester === 4 ? "In Progress" : calculateSGPA(currentSemester.courses)}
              </span>
              {activeSemester !== 4 && <span className="text-gray-500 mb-1">/ 10.00</span>}
            </div>
            <p className="text-sm text-gray-500 mt-2">{currentSemester.name}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Completed Credits</h3>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-gray-900">{totalCompletedCredits.toFixed(1)}</span>
              <span className="text-gray-500 mb-1">credits</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Out of 140 required for graduation</p>
          </div>
        </div>

        {/* Semester Selector */}
        <div className="mb-6 bg-white p-4 rounded-xl shadow border border-gray-200">
          <div className="flex flex-wrap gap-2 mb-4">
            {semesterData.map((semester) => (
              <button
                key={semester.semester}
                onClick={() => setActiveSemester(semester.semester)}
                className={`px-5 py-3 rounded-xl font-medium transition-all ${activeSemester === semester.semester 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-blue-300'}`}
              >
                {semester.name}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">{currentSemester.name}</h2>
            {activeSemester === 4 && (
              <span className="ml-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium rounded-full">
                Ongoing Semester
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Courses */}
          <div className="lg:w-2/3">
            {/* Courses Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Credits
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Points
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentSemester.courses.map((course, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
                              {getCourseIcon(course.code)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{course.code}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">{course.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium ${getTypeColor(course.type)} border border-gray-200`}>
                            {course.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900 font-medium">{course.credits}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getGradeColor(course.grade)}`}>
                            {course.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900 font-medium">
                            {course.grade !== "In Progress" && gradePoints[course.grade] !== undefined 
                              ? gradePoints[course.grade] 
                              : "-"}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Semester SGPA Summary */}
              {activeSemester !== 4 && (
                <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Semester GPA (SGPA)</h3>
                      <p className="text-sm text-gray-600">Calculated based on credits and grades</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">{calculateSGPA(currentSemester.courses)}</div>
                      <div className="text-sm text-gray-600">out of 10.00</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Legend */}
            <div className="mt-6 p-6 bg-white rounded-xl shadow border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-blue-600" />
                Grade Points System
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {Object.entries(gradePoints).map(([grade, points]) => (
                  <div key={grade} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold mb-2 ${getGradeColor(grade)}`}>
                      {grade}
                    </span>
                    <span className="text-sm font-medium text-gray-700">= {points} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Stats and Graph */}
          <div className="lg:w-1/3">
            {/* Performance Graph */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">SGPA Trend</h3>
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              
              <div className="space-y-6">
                {sgpaData.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        <div className="text-xs text-gray-500">Semester {item.semester}</div>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{item.sgpa}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000" 
                        style={{ width: `${parseFloat(item.sgpa) * 10}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Overall CGPA</div>
                    <div className="text-2xl font-bold text-gray-900">{cgpa}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Target</div>
                    <div className="text-2xl font-bold text-gray-900">9.0+</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-1000" 
                    style={{ width: `${(parseFloat(cgpa) / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Performance Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Performance Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Award className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Highest Grades</div>
                      <div className="text-sm text-gray-500">A/A+ grades</div>
                    </div>
                  </div>
                  <div className="text-emerald-600 font-bold">{gradeDistribution["A/A+"]}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <BookOpen className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">A- Grades</div>
                      <div className="text-sm text-gray-500">Excellent performance</div>
                    </div>
                  </div>
                  <div className="text-green-600 font-bold">{gradeDistribution["A-"]}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">B Grades</div>
                      <div className="text-sm text-gray-500">Good performance</div>
                    </div>
                  </div>
                  <div className="text-blue-600 font-bold">{gradeDistribution["B"]}</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Academic Standing</div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full border border-emerald-200">
                    <Award className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-emerald-800">Excellent Standing</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Maintaining all grades B or above. Strong performance in core subjects!
                  </p>
                </div>
              </div>
            </div>

            {/* Grade Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
              <div className="space-y-3">
                {Object.entries(gradeDistribution).map(([grade, count]) => (
                  <div key={grade} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${grade === "A/A+" ? "bg-emerald-500" : grade === "A-" ? "bg-green-500" : grade === "B" ? "bg-blue-500" : "bg-cyan-500"}`}></div>
                      <span className="text-sm text-gray-700">{grade}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{count}</span>
                      <span className="text-xs text-gray-500">
                        ({((count / totalCompletedCourses) * 100).toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Visual grade distribution */}
              <div className="mt-4 flex h-4 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500" 
                  style={{ width: `${(gradeDistribution["A/A+"] / totalCompletedCourses) * 100}%` }}
                  title="A/A+"
                ></div>
                <div 
                  className="bg-green-500" 
                  style={{ width: `${(gradeDistribution["A-"] / totalCompletedCourses) * 100}%` }}
                  title="A-"
                ></div>
                <div 
                  className="bg-blue-500" 
                  style={{ width: `${(gradeDistribution["B"] / totalCompletedCourses) * 100}%` }}
                  title="B"
                ></div>
                <div 
                  className="bg-cyan-500" 
                  style={{ width: `${(gradeDistribution["B-"] / totalCompletedCourses) * 100}%` }}
                  title="B-"
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Grading System Info */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            How Your GPA is Calculated
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">SGPA Formula</h4>
              <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
                <p className="font-mono text-gray-800 text-sm">
                  SGPA = Σ(Grade Point × Credits) ÷ Σ(Credits)
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                For each semester, SGPA is calculated by summing the product of grade points and credits, then dividing by total credits.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">CGPA Formula</h4>
              <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
                <p className="font-mono text-gray-800 text-sm">
                  CGPA = Σ(Grade Point × Credits) ÷ Σ(Credits)
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                CGPA is calculated using the same formula but includes all completed courses across all semesters.
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-blue-200">
            <h4 className="font-medium text-gray-800 mb-2">Example Calculation</h4>
            <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
              <p className="text-sm text-gray-700">
                CSL100 (4.5 credits, Grade: A = 10 points): 4.5 × 10 = 45<br/>
                MAL100 (4 credits, Grade: A- = 9 points): 4 × 9 = 36<br/>
                Total: 45 + 36 = 81 grade points<br/>
                Total Credits: 4.5 + 4 = 8.5<br/>
                SGPA = 81 ÷ 8.5 = 9.53
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}