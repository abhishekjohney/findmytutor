// ─── Enums ───────────────────────────────────────────────────────────────────

export enum Role {
  ADMIN = "ADMIN",
  TUTOR = "TUTOR",
  PARENT = "PARENT",
}

export enum TeachingMode {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  BOTH = "BOTH",
}

export enum LeadStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface TutorProfile {
  id: string;
  userId: string;
  phone: string;
  collegeName: string;
  degree: string;
  yearOfStudy: number | null;
  bio: string;
  teachingMode: TeachingMode;
  idCardUrl: string | null;
  profilePictureUrl: string | null;
  isVerified: boolean;
  subjects: Subject[];
  user?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subject {
  id: string;
  name: string;
}

export interface TutorSubject {
  id: string;
  tutorProfileId: string;
  subjectId: string;
  subject?: Subject;
}

export interface Lead {
  id: string;
  parentId: string;
  tutorProfileId: string;
  message: string | null;
  status: LeadStatus;
  parent?: User;
  tutorProfile?: TutorProfile;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Form Types ──────────────────────────────────────────────────────────────

export interface TutorRegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  degree: string;
  yearOfStudy: number;
  bio: string;
  teachingMode: TeachingMode;
  subjects: string[];
  idCardFile?: File;
  profilePicture?: File;
}
