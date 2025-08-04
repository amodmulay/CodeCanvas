
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building, Users, Plane, ArrowRight, LogIn } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const onboardingOptions = [
  {
    name: "Internal Developer",
    icon: <Building className="h-12 w-12 text-primary" />,
    description: "Sign in with your Panasonic corporate account to access internal tools and repositories.",
    path: "/register",
  },
  {
    name: "External Developer",
    icon: <Users className="h-12 w-12 text-primary" />,
    description: "Register and set up your environment as a partner or third-party developer.",
    path: "/register",
  },
];

export default function OnboardingPage() {
  const router = useRouter();

  const handleSelectOption = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background p-4">
      <div className="flex items-center gap-2 mb-8">
        <Plane className="h-8 w-8 text-primary" />
        <span className="text-3xl font-bold">Panasonic Avionics</span>
      </div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Developer Onboarding</h1>
        <p className="text-muted-foreground mt-2 max-w-lg">
          Welcome! Let's get you set up. Please select the option that best describes you to tailor your development environment.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {onboardingOptions.map((option) => (
          <Card
            key={option.name}
            className="flex flex-col"
          >
            <CardHeader className="flex flex-col items-center text-center space-y-4">
              {option.icon}
              <CardTitle>{option.name}</CardTitle>
              <CardDescription className="text-sm h-12">{option.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end justify-center">
              <Button 
                onClick={() => handleSelectOption(option.path)}
                className="w-full"
              >
                Continue as {option.name}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
       <div className="mt-8 text-center">
         <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign In
            </Link>
          </p>
      </div>
    </div>
  );
}
