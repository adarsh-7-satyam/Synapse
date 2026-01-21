import Placeholder from "./Placeholder";
import { CheckCircle } from "lucide-react";

export default function Attendance() {
  return (
    <Placeholder
      title="Attendance Tracker"
      description="Monitor your subject-wise attendance with visual progress indicators and alerts."
      icon={<CheckCircle className="w-8 h-8" />}
      features={[
        "Subject-wise attendance percentage",
        "Visual progress bars for each course",
        "Attendance warnings if below 75%",
        "Attendance history and trends",
        "Leave requests and approvals",
        "Attendance reports and statistics",
        "Class-wise attendance details",
      ]}
    />
  );
}
