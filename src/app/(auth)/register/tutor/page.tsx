import { Metadata } from "next";
import { TutorRegistrationForm } from "@/components/forms/tutor-registration-form";

export const metadata: Metadata = {
  title: "Register as a Tutor | FindMyTutor",
  description:
    "Join FindMyTutor as a college student tutor. Connect with parents in Kochi looking for home tutoring. Register with your college ID and start earning.",
};

export default function TutorRegistrationPage() {
  return (
    <div className="w-full max-w-2xl space-y-6">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Become a <span className="text-primary">Tutor</span>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
          Share your knowledge with students in your area. Complete your profile
          to get started.
        </p>
      </div>

      {/* Registration Form */}
      <TutorRegistrationForm />
    </div>
  );
}
