import { z } from "zod";

export const tutorRegistrationSchema = z.object({
  // Step 1 — Personal Info
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian mobile number"
    ),

  // Step 2 — College Details
  collegeName: z
    .string({ error: "Please select your college" })
    .min(1, "Please select your college"),
  degree: z
    .string({ error: "Please select your degree" })
    .min(1, "Please select your degree"),
  yearOfStudy: z
    .number({ error: "Please select your year of study" })
    .min(1, "Year must be between 1 and 5")
    .max(5, "Year must be between 1 and 5"),

  // Step 3 — Teaching Preferences
  bio: z
    .string()
    .min(20, "Bio must be at least 20 characters")
    .max(500, "Bio must be under 500 characters"),
  teachingMode: z.enum(["ONLINE", "OFFLINE", "BOTH"] as const, {
    error: "Please select a teaching mode",
  }),
  subjects: z
    .array(z.string())
    .min(1, "Please select at least one subject"),

  // Step 4 — Documents (optional for now, handled via file upload component)
  idCardFile: z.any().optional(),
  profilePicture: z.any().optional(),
});

// Per-step validation schemas for multi-step form
export const step1Schema = tutorRegistrationSchema.pick({
  fullName: true,
  email: true,
  phone: true,
});

export const step2Schema = tutorRegistrationSchema.pick({
  collegeName: true,
  degree: true,
  yearOfStudy: true,
});

export const step3Schema = tutorRegistrationSchema.pick({
  bio: true,
  teachingMode: true,
  subjects: true,
});

export const step4Schema = tutorRegistrationSchema.pick({
  idCardFile: true,
  profilePicture: true,
});

export type TutorRegistrationValues = z.infer<typeof tutorRegistrationSchema>;

// Step schemas array for easy indexing
export const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema];
