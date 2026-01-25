import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Construction } from "lucide-react";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface PlaceholderProps {
  title: string;
  description: string;
  icon: ReactNode;
  features?: string[];
  backLink?: string;
}

export default function Placeholder({
  title,
  description,
  icon,
  features,
  backLink = "/",
}: PlaceholderProps) {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl mb-6">
            <div className="text-primary">{icon}</div>
          </div>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        <Card className="p-8 bg-blue-50 border-blue-200 mb-8">
          <div className="flex items-start gap-4">
            <Construction className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Coming Soon
              </h3>
              <p className="text-blue-800 text-sm">
                This feature is being developed. Let us know what you'd like to see!
              </p>
            </div>
          </div>
        </Card>

        {features && features.length > 0 && (
          <Card className="p-6 mb-8">
            <h3 className="font-semibold mb-4">Planned Features</h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to={backLink}>
            <Button variant="outline">
              Back to Home
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
          <Link to="/timetable">
            <Button>
              View Timetable
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Continue exploring other features while we build this section
        </p>
      </div>
    </Layout>
  );
}
