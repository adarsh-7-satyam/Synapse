import Placeholder from "./Placeholder";
import { ListTodo } from "lucide-react";

export default function Tasks() {
  return (
    <Placeholder
      title="Tasks & Reminders"
      description="Manage assignments, exam prep, and personal notes in one productivity hub."
      icon={<ListTodo className="w-8 h-8" />}
      features={[
        "Create and manage assignments",
        "Set assignment deadlines and reminders",
        "Exam preparation checklists",
        "Personal notes and study materials",
        "Task priority and categorization",
        "Completion tracking and progress",
        "Calendar integration for due dates",
      ]}
    />
  );
}
