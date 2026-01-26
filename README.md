# 🧠 Synapse – Smart Campus Management System

Synapse is a modern, student-centric campus management web application designed to unify academic, administrative, hostel, and wellness-related services into a single platform.

A **special focus of Synapse is the Medical & Mental Wellness section**, ensuring students have timely access to health services, notices, and emotional well-being support alongside academics.

---

## 👥 Team Members

- Shlok Divyam 
- Adarsh Satyam 
- Kadali Gagan Venkata Asish  
 
 
---

## 🌟 Major Features

### 📚 Academic Management
- Semester-wise course listing with credits and faculty
- Credit visualization
- Academic notices and schedules

### 🏥 Medical & Mental Wellness (Special Focus)
- Dedicated medical notices and alerts
- Mental wellness self-assessment
- Navigation to nearby hospitals and medical stores
- Health camp and medical center announcements

### 🔔 Notices & Announcements
- Academic, Exam, Placement, Medical, Hostel, Library, Finance notices
- Priority levels: Urgent, High, Medium, Low
- Category filters and search
- Pinned notices
- Detailed notice view with attachments
- Read / unread tracking

### 🏠 Hostel Management
- Student, room, and roommate details
- Hostel rules
- Maintenance complaint system
- Complaint tracking (Pending / Resolved)
- Visitor approval and visitor logs

### ✅ Tasks & Reminders
- Task creation with category, priority, date, and time
- Pending / Finished / Unfinished states
- Deadline-today highlighting
- Productivity dashboard with stats

---

## 🛠️ Technologies Used

### 🔵 Google Technologies
- **Google Meet** – Video conferencing for medical consultations and mentoring  
-**Google Gemini API** – Mental wellness test and emotional health analysis (requires API key in `.env`)
- **Google Maps API** – Navigation to nearby hospitals and medical stores  
- **Google Chrome** – Development and testing  
- **Google Fonts** – Typography  
- **Material Design principles** – UI/UX inspiration  

### ⚙️ Core Stack
- React.js
- TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons

---

## 🚀 How to Run the Project Locally

### Prerequisites
- Node.js (v18+)
- npm
- Git
- Windows PowerShell

---

### Step 1: Clone the Repository 

   git clone https://github.com/ShlokDivyam1109/Synapse.git

---

### Step 2: Navigate to Project Directory

    cd Synapse

(If your local folder name is different)

    cd Desktop\SYNAPSE-CAMPUS-42D

---

### Step 3: Install Dependencies

    npm install

---

### Step 4: Start Development Server

    npm run dev

---

### Step 5: Set up Environment Variables

Create a `.env` file in the root directory (same level as `package.json`) with the following content:

```env
# Public variables
VITE_PUBLIC_BUILDER_KEY=__BUILDER_PUBLIC_KEY__
PING_MESSAGE="ping pong"

# Replace with your own Gemini API key
GEMINI_API_KEY=your_gemini_api_key_here


```

Note: The .env file is excluded from Git (via .gitignore) for security. Get your Gemini API key from Google AI Studio.

### Step 6: Open in Browser
The development server will start on an available port (typically 5173, 3000, or 8080).

Example URLs:

http://localhost:5173/

http://localhost:3000/

http://localhost:8080/

Check your terminal output for the exact local URL, then open it in your browser.

---

## 🔧 Data Handling
- Frontend uses mock data
- React Hooks for state management
- localStorage & sessionStorage for persistence
- Backend-ready models for API integration

---

## 🔮 Future Enhancements
- Backend + database integration
- Authentication and role-based access
- Admin dashboards
- Medical appointment booking
- Push notifications
- Calendar sync

---

## 📌 Conclusion
Synapse is a scalable, modular, and student-focused campus platform with a strong emphasis on **medical awareness, mental wellness, academics, and productivity**.

Designed for hackathons and real-world campus deployment.

⭐ Star the repository if you like the project!
