import { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Register | FindMyTutor",
  description: "Create your FindMyTutor account. Join as a tutor or parent.",
};

export default function RegisterPage() {
  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Join FindMyTutor</h1>
        <p className="text-muted-foreground text-sm">
          Choose how you want to use the platform
        </p>
      </div>

      <div className="grid gap-4">
        <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
          <Link href="/register/tutor" className="absolute inset-0 z-10" />
          <CardHeader className="pb-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">I&apos;m a College Student</CardTitle>
            <CardDescription>
              Register as a tutor and start teaching students in your area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              Register as Tutor →
            </Button>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
          <Link href="/register/parent" className="absolute inset-0 z-10" />
          <CardHeader className="pb-3">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-2 group-hover:bg-blue-500/20 transition-colors">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <CardTitle className="text-lg">I&apos;m a Parent</CardTitle>
            <CardDescription>
              Find verified college student tutors near you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full group-hover:bg-blue-500 group-hover:text-white transition-colors">
              Register as Parent →
            </Button>
          </CardContent>
        </Card>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
