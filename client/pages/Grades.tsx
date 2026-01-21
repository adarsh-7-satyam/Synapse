import Placeholder from "./Placeholder";
import { BarChart3 } from "lucide-react";

export default function Grades() {
  return (
    <Placeholder
      title="Grades & Performance"
      description="View your academic performance, internal marks, CGPA, and performance trends."
      icon={<BarChart3 className="w-8 h-8" />}
      features={[
        "Subject-wise grades and marks",
        "Internal assessment scores",
        "CGPA calculation and tracking",
        "Grade distribution analysis",
        "Performance trend graphs",
        "Comparative performance statistics",
        "Grade appeal submission",
      ]}
    />
  );
}
