import Placeholder from "./Placeholder";
import { Bell } from "lucide-react";

export default function Notices() {
  return (
    <Placeholder
      title="Notices & Announcements"
      description="Stay updated with important college announcements, notices, and critical information."
      icon={<Bell className="w-8 h-8" />}
      features={[
        "College-wide announcements and notices",
        "Department-specific updates",
        "Urgent notifications and alerts",
        "Priority tags (Exam, Urgent, General)",
        "Notice archive and history",
        "Notification preferences",
        "Notice search and filtering",
      ]}
    />
  );
}
