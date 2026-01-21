import Placeholder from "./Placeholder";
import { BookOpen } from "lucide-react";

export default function Courses() {
  return (
    <Placeholder
      title="Courses & Subjects"
      description="View your enrolled courses, credits, faculty information, and access course materials."
      icon={<BookOpen className="w-8 h-8" />}
      features={[
        "List of enrolled courses and subjects",
        "Course credits and semester information",
        "Faculty details and office hours",
        "Access to syllabus and course materials",
        "Prerequisites and course requirements",
        "Course announcements and updates",
        "GPA impact calculator",
      ]}
    />
  );
}
