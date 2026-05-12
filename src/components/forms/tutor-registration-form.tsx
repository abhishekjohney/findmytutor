"use client";

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  GraduationCap,
  BookOpen,
  FileCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { FileUpload } from "@/components/shared/file-upload";
import { MultiSelect } from "@/components/shared/multi-select";

import {
  tutorRegistrationSchema,
  stepSchemas,
  type TutorRegistrationValues,
} from "@/lib/validators/tutor-registration";
import { SUBJECTS, COLLEGES, DEGREES } from "@/lib/mock-data";

// ─── Step Configuration ──────────────────────────────────────────────────────

const STEPS = [
  {
    id: 0,
    title: "Personal Info",
    description: "Tell us about yourself",
    icon: User,
  },
  {
    id: 1,
    title: "College Details",
    description: "Your academic background",
    icon: GraduationCap,
  },
  {
    id: 2,
    title: "Teaching Preferences",
    description: "What & how you teach",
    icon: BookOpen,
  },
  {
    id: 3,
    title: "Documents & Review",
    description: "Upload ID & confirm",
    icon: FileCheck,
  },
];

// ─── Main Component ──────────────────────────────────────────────────────────

export function TutorRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const form = useForm<TutorRegistrationValues>({
    resolver: zodResolver(tutorRegistrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      collegeName: "",
      degree: "",
      yearOfStudy: undefined,
      bio: "",
      teachingMode: undefined,
      subjects: [],
      idCardFile: undefined,
      profilePicture: undefined,
    },
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = form;

  const watchedValues = watch();

  // ─── Step Navigation ─────────────────────────────────────────────────────

  const validateCurrentStep = useCallback(async () => {
    const stepSchema = stepSchemas[currentStep];
    const stepFields = Object.keys(
      stepSchema.shape
    ) as (keyof TutorRegistrationValues)[];
    const isValid = await trigger(stepFields);
    return isValid;
  }, [currentStep, trigger]);

  const goToNextStep = useCallback(async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, validateCurrentStep]);

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  // ─── Form Submission ─────────────────────────────────────────────────────

  const onSubmit = useCallback(
    async (data: TutorRegistrationValues) => {
      setIsSubmitting(true);
      try {
        // Simulate API call
        console.log("📝 Tutor Registration Data:", data);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsComplete(true);
      } catch (error) {
        console.error("Registration failed:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  // ─── Success State ───────────────────────────────────────────────────────

  if (isComplete) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md text-center border-0 shadow-xl">
          <CardContent className="pt-10 pb-10 space-y-6">
            <div className="mx-auto w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center animate-in zoom-in-50 duration-500">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
              <h2 className="text-2xl font-bold tracking-tight">
                Registration Submitted!
              </h2>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Thank you, <strong>{watchedValues.fullName}</strong>! Your
                profile is under review. We&apos;ll notify you once your college
                ID is verified.
              </p>
            </div>
            <div className="flex flex-col gap-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-500">
              <Badge variant="secondary" className="mx-auto">
                <Sparkles className="h-3 w-3 mr-1" />
                Verification typically takes 24-48 hours
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─── Progress ─────────────────────────────────────────────────────────────

  const progressValue = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* ── Step Indicator ─────────────────────────────────────────────── */}
      <div className="space-y-4">
        {/* Mobile step indicator */}
        <div className="flex items-center justify-between sm:hidden">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep + 1} of {STEPS.length}
          </span>
          <Badge variant="secondary">{STEPS[currentStep].title}</Badge>
        </div>

        {/* Desktop step indicator */}
        <div className="hidden sm:flex items-center justify-between gap-2">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <React.Fragment key={step.id}>
                <button
                  type="button"
                  onClick={() => {
                    if (isCompleted) setCurrentStep(index);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md scale-105"
                      : isCompleted
                      ? "bg-primary/10 text-primary cursor-pointer hover:bg-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                  disabled={!isCompleted && !isActive}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                  <span className="text-xs font-medium hidden lg:inline">
                    {step.title}
                  </span>
                </button>
                {index < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 rounded-full transition-colors duration-300 ${
                      index < currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <Progress value={progressValue} className="h-1.5" />
      </div>

      {/* ── Form Card ──────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              {React.createElement(STEPS[currentStep].icon, {
                className: "h-5 w-5 text-primary",
              })}
              {STEPS[currentStep].title}
            </CardTitle>
            <CardDescription>
              {STEPS[currentStep].description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* ── Step 1: Personal Info ─────────────────────────────────── */}
            {currentStep === 0 && (
              <div className="space-y-4 animate-in fade-in-0 slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    {...register("fullName")}
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-destructive">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@college.ac.in"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    {...register("phone")}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">
                      {errors.phone.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    This will be shared with parents once you accept a lead
                  </p>
                </div>
              </div>
            )}

            {/* ── Step 2: College Details ───────────────────────────────── */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in-0 slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <Label htmlFor="collegeName">College / University *</Label>
                  <Select
                    value={watchedValues.collegeName || ""}
                    onValueChange={(value) => {
                      setValue("collegeName", value as string, { shouldValidate: true });
                    }}
                  >
                    <SelectTrigger
                      id="collegeName"
                      className={
                        errors.collegeName ? "border-destructive" : ""
                      }
                    >
                      <SelectValue placeholder="Select your college" />
                    </SelectTrigger>
                    <SelectContent>
                      {COLLEGES.map((college) => (
                        <SelectItem key={college} value={college}>
                          {college}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.collegeName && (
                    <p className="text-xs text-destructive">
                      {errors.collegeName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="degree">Degree / Program *</Label>
                  <Select
                    value={watchedValues.degree || ""}
                    onValueChange={(value) => {
                      setValue("degree", value as string, { shouldValidate: true });
                    }}
                  >
                    <SelectTrigger
                      id="degree"
                      className={errors.degree ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Select your degree" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEGREES.map((degree) => (
                        <SelectItem key={degree} value={degree}>
                          {degree}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.degree && (
                    <p className="text-xs text-destructive">
                      {errors.degree.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearOfStudy">Year of Study *</Label>
                  <Select
                    value={
                      watchedValues.yearOfStudy
                        ? String(watchedValues.yearOfStudy)
                        : ""
                    }
                    onValueChange={(value) => {
                      setValue("yearOfStudy", parseInt(value as string), {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <SelectTrigger
                      id="yearOfStudy"
                      className={
                        errors.yearOfStudy ? "border-destructive" : ""
                      }
                    >
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((year) => (
                        <SelectItem key={year} value={String(year)}>
                          {year === 1
                            ? "1st Year"
                            : year === 2
                            ? "2nd Year"
                            : year === 3
                            ? "3rd Year"
                            : `${year}th Year`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.yearOfStudy && (
                    <p className="text-xs text-destructive">
                      {errors.yearOfStudy.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ── Step 3: Teaching Preferences ─────────────────────────── */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in-0 slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio / About You *</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell parents about your teaching experience, approach, and what makes you a great tutor..."
                    rows={4}
                    {...register("bio")}
                    className={errors.bio ? "border-destructive" : ""}
                  />
                  <div className="flex justify-between">
                    {errors.bio ? (
                      <p className="text-xs text-destructive">
                        {errors.bio.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <p className="text-xs text-muted-foreground">
                      {watchedValues.bio?.length || 0}/500
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Teaching Mode *</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["ONLINE", "OFFLINE", "BOTH"] as const).map((mode) => {
                      const isSelected = watchedValues.teachingMode === mode;
                      return (
                        <button
                          key={mode}
                          type="button"
                          onClick={() =>
                            setValue("teachingMode", mode, {
                              shouldValidate: true,
                            })
                          }
                          className={`px-3 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/30"
                              : "border-border hover:border-primary/50 hover:bg-muted"
                          }`}
                        >
                          {mode === "BOTH" ? "Both" : mode === "ONLINE" ? "🌐 Online" : "🏠 Offline"}
                        </button>
                      );
                    })}
                  </div>
                  {errors.teachingMode && (
                    <p className="text-xs text-destructive">
                      {errors.teachingMode.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Subjects You Can Teach *</Label>
                  <MultiSelect
                    options={SUBJECTS.map((s) => ({
                      id: s.id,
                      name: s.name,
                    }))}
                    selected={watchedValues.subjects || []}
                    onChange={(selected) =>
                      setValue("subjects", selected, { shouldValidate: true })
                    }
                    placeholder="Search and select subjects..."
                    maxSelections={8}
                  />
                  {errors.subjects && (
                    <p className="text-xs text-destructive">
                      {errors.subjects.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ── Step 4: Documents & Review ───────────────────────────── */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
                {/* File Uploads */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FileUpload
                    label="College ID Card"
                    description="JPG, PNG or PDF"
                    accept="image/*,.pdf"
                    maxSizeMB={5}
                    value={watchedValues.idCardFile as File | undefined}
                    onFileSelect={(file) =>
                      setValue("idCardFile", file)
                    }
                  />
                  <FileUpload
                    label="Profile Picture"
                    description="JPG or PNG (square recommended)"
                    accept="image/*"
                    maxSizeMB={3}
                    value={watchedValues.profilePicture as File | undefined}
                    onFileSelect={(file) =>
                      setValue("profilePicture", file)
                    }
                  />
                </div>

                <Separator />

                {/* Review Summary */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-primary" />
                    Review Your Details
                  </h3>

                  <div className="rounded-lg border bg-muted/30 p-4 space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <div>
                        <span className="text-muted-foreground text-xs">
                          Name
                        </span>
                        <p className="font-medium">
                          {watchedValues.fullName || "—"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs">
                          Email
                        </span>
                        <p className="font-medium truncate">
                          {watchedValues.email || "—"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs">
                          Phone
                        </span>
                        <p className="font-medium">
                          {watchedValues.phone || "—"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs">
                          College
                        </span>
                        <p className="font-medium truncate">
                          {watchedValues.collegeName || "—"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs">
                          Degree
                        </span>
                        <p className="font-medium">
                          {watchedValues.degree || "—"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs">
                          Year
                        </span>
                        <p className="font-medium">
                          {watchedValues.yearOfStudy
                            ? `Year ${watchedValues.yearOfStudy}`
                            : "—"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs">
                          Mode
                        </span>
                        <p className="font-medium">
                          {watchedValues.teachingMode || "—"}
                        </p>
                      </div>
                    </div>

                    {watchedValues.bio && (
                      <div>
                        <span className="text-muted-foreground text-xs">
                          Bio
                        </span>
                        <p className="font-medium text-xs leading-relaxed mt-0.5">
                          {watchedValues.bio}
                        </p>
                      </div>
                    )}

                    {watchedValues.subjects &&
                      watchedValues.subjects.length > 0 && (
                        <div>
                          <span className="text-muted-foreground text-xs">
                            Subjects
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {watchedValues.subjects.map((subjectId) => {
                              const subject = SUBJECTS.find(
                                (s) => s.id === subjectId
                              );
                              return (
                                <Badge
                                  key={subjectId}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {subject?.name || subjectId}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Navigation Buttons ───────────────────────────────────── */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                type="button"
                variant="ghost"
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
                className="gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              {currentStep < STEPS.length - 1 ? (
                <Button
                  type="button"
                  onClick={goToNextStep}
                  className="gap-1 min-w-[120px]"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="gap-1 min-w-[160px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Submit Registration
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
