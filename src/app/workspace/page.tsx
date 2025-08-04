
"use client";

import { useRouter } from "next/navigation";
import { Smartphone, Code, Coffee, FileCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const workspaces = [
  {
    name: "Android",
    icon: <Smartphone className="h-12 w-12 text-primary" />,
    description: "Develop for Android Auto and in-flight systems.",
  },
  {
    name: "Python",
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.5 18H5.5C4.1 18 3 16.9 3 15.5V8.5C3 7.1 4.1 6 5.5 6H10.5V7.5H5.5C4.9 7.5 4.5 7.9 4.5 8.5V11.5H10.5V13H4.5V15.5C4.5 16.1 4.9 16.5 5.5 16.5H10.5V18Z"/>
            <path d="M13.5 6H18.5C19.9 6 21 7.1 21 8.5V15.5C21 16.9 19.9 18 18.5 18H13.5V16.5H18.5C19.1 16.5 19.5 16.1 19.5 15.5V12.5H13.5V11H19.5V8.5C19.5 7.9 19.1 7.5 18.5 7.5H13.5V6Z"/>
        </svg>
    ),
    description: "Backend services, data analysis, and machine learning.",
  },
  {
    name: "Go",
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.6,3.2C10,3.3,8.3,4,6.9,4.9C3.2,7.4,2.2,12.2,4.7,16c2,3,5.4,4.4,9,4c1.7-0.2,3.3-0.8,4.7-1.7 c-0.6-0.4-1.1-0.8-1.7-1.2c-1.1,0.7-2.3,1.1-3.6,1.2c-3.9,0.2-7.4-2.6-7.6-6.5c-0.2-4.2,3-7.8,7.2-8l0,0c1.1-0.1,2.2,0.2,3.2,0.7 c0.5,0.3,1.1,0.6,1.6,0.9C17.3,7,16.8,6,16.2,5.2C15,4,13.3,3.3,11.6,3.2z M12,8.2c-2,0-3.6,1.6-3.6,3.6s1.6,3.6,3.6,3.6 s3.6-1.6,3.6-3.6S14,8.2,12,8.2z M12,9c1.5,0,2.8,1.2,2.8,2.8s-1.2,2.8-2.8,2.8s-2.8-1.2-2.8-2.8S10.5,9,12,9z"/>
        </svg>
    ),
    description: "High-performance networking and concurrent services.",
  },
  {
    name: "Java",
    icon: <Coffee className="h-12 w-12 text-primary" />,
    description: "Robust enterprise-level applications and backend systems.",
  },
  {
    name: "JavaScript",
    icon: <FileCode className="h-12 w-12 text-primary" />,
    description: "Modern web frontends and Node.js backend services.",
  },
];

export default function WorkspacePage() {
  const router = useRouter();

  const handleSelectWorkspace = () => {
    router.push("/develop");
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Select Your Workspace</h1>
        <p className="text-muted-foreground mt-2">
          Choose a development environment to get started.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
        {workspaces.map((workspace) => (
          <Card
            key={workspace.name}
            onClick={handleSelectWorkspace}
            className="cursor-pointer hover:shadow-lg hover:border-primary transition-all duration-200"
          >
            <CardHeader className="flex flex-col items-center text-center space-y-4">
              {workspace.icon}
              <CardTitle>{workspace.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center text-sm">{workspace.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
