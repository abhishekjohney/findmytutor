"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  ArrowRight,
  Loader2,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const KOCHI_AREAS = [
  "Edappally",
  "Kakkanad",
  "Kalamassery",
  "Thrikkakara",
  "Palarivattom",
  "Vyttila",
  "Aluva",
  "Fort Kochi",
  "Ernakulam South",
  "Tripunithura",
  "Maradu",
  "Mattancherry",
  "Other",
];

const parentSchema = z.object({
  parentName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  area: z.string().min(1, "Please select your area"),
  childName: z.string().min(2, "Child's name must be at least 2 characters"),
  childGrade: z.string().min(1, "Please select your child's grade"),
  notes: z.string().optional(),
});

type ParentFormValues = z.infer<typeof parentSchema>;

export default function ParentRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ParentFormValues>({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      parentName: "",
      email: "",
      phone: "",
      area: "",
      childName: "",
      childGrade: "",
      notes: "",
    },
    mode: "onTouched",
  });

  const watchedArea = watch("area");
  const watchedGrade = watch("childGrade");

  const onSubmit = async (data: ParentFormValues) => {
    setIsSubmitting(true);
    console.log("Parent Registration:", data);
    await new Promise((r) => setTimeout(r, 1500));
    setIsComplete(true);
    setIsSubmitting(false);
  };

  if (isComplete) {
    return (
      <div className="w-full max-w-md text-center space-y-6">
        <div className="mx-auto w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome Aboard!
          </h2>
          <p className="text-muted-foreground text-sm">
            Your parent account has been created. You can now browse verified
            tutors and send requests.
          </p>
        </div>
        <Link href="/tutors">
          <Button className="gap-2">
            Browse Tutors <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="text-center space-y-2">
        <div className="h-12 w-12 rounded-xl bg-blue-500 flex items-center justify-center mx-auto shadow-lg">
          <User className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          Register as a Parent
        </h1>
        <p className="text-sm text-muted-foreground">
          Create your account to start finding verified tutors near you
        </p>
      </div>

      <Card className="border-0 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Your Details</CardTitle>
          <CardDescription>
            We&apos;ll match you with the best tutors in your area.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Parent Name */}
            <div className="space-y-2">
              <Label htmlFor="parentName">Your Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="parentName"
                  placeholder="Your name"
                  className={`pl-9 ${errors.parentName ? "border-destructive" : ""}`}
                  {...register("parentName")}
                />
              </div>
              {errors.parentName && (
                <p className="text-xs text-destructive">
                  {errors.parentName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="parent-email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="parent-email"
                  type="email"
                  placeholder="you@example.com"
                  className={`pl-9 ${errors.email ? "border-destructive" : ""}`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="parent-phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="parent-phone"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={`pl-9 ${errors.phone ? "border-destructive" : ""}`}
                  {...register("phone")}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone.message}</p>
              )}
            </div>

            {/* Area */}
            <div className="space-y-2">
              <Label htmlFor="area">Your Area in Kochi *</Label>
              <Select
                value={watchedArea || ""}
                onValueChange={(v) =>
                  setValue("area", v || "", { shouldValidate: true })
                }
              >
                <SelectTrigger
                  id="area"
                  className={errors.area ? "border-destructive" : ""}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Select your area" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {KOCHI_AREAS.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.area && (
                <p className="text-xs text-destructive">{errors.area.message}</p>
              )}
            </div>

            {/* Child Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="childName">Child&apos;s Name *</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="childName"
                    placeholder="Child's name"
                    className={`pl-9 ${errors.childName ? "border-destructive" : ""}`}
                    {...register("childName")}
                  />
                </div>
                {errors.childName && (
                  <p className="text-xs text-destructive">
                    {errors.childName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="childGrade">Grade / Class *</Label>
                <Select
                  value={watchedGrade || ""}
                  onValueChange={(v) =>
                    setValue("childGrade", v || "", { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    id="childGrade"
                    className={errors.childGrade ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Grade 6",
                      "Grade 7",
                      "Grade 8",
                      "Grade 9",
                      "Grade 10 (CBSE)",
                      "Grade 10 (State)",
                      "Grade 11 (CBSE)",
                      "Grade 11 (State)",
                      "Grade 12 (CBSE)",
                      "Grade 12 (State)",
                      "JEE Preparation",
                      "NEET Preparation",
                    ].map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.childGrade && (
                  <p className="text-xs text-destructive">
                    {errors.childGrade.message}
                  </p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">
                Additional Notes{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="notes"
                  placeholder="Any specific requirements, subjects, or schedule preferences..."
                  rows={3}
                  className="pl-9 resize-none"
                  {...register("notes")}
                />
              </div>
            </div>

            <Button
              id="parent-register-btn"
              type="submit"
              className="w-full gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
