import Placeholder from "./Placeholder";
import { Heart } from "lucide-react";

export default function Healthcare() {
  return (
    <Placeholder
      title="Healthcare System"
      description="Access medical facilities, manage health records, book appointments, and reach emergency contacts."
      icon={<Heart className="w-8 h-8" />}
      features={[
        "View available medical facilities on campus",
        "Book medical appointments online",
        "Access personal health records",
        "Prescription history and medical reports",
        "Emergency contact information",
        "Health insurance details",
        "Vaccination records",
      ]}
    />
  );
}
