import Placeholder from "./Placeholder";
import { Building2 } from "lucide-react";

export default function HostelManagement() {
  return (
    <Placeholder
      title="Hostel Management"
      description="Manage room allocations, view hostel rules, submit complaints, and track maintenance requests."
      icon={<Building2 className="w-8 h-8" />}
      features={[
        "View room allocation and roommate details",
        "Access hostel rules and guidelines",
        "Submit maintenance complaints (electricity, water, WiFi)",
        "Track complaint status and resolution",
        "Hostel notices and announcements",
        "Visitor management system",
      ]}
    />
  );
}
