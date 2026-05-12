"use client";

import { useState } from "react";
import {
  UserCircle,
  Phone,
  Mail,
  GraduationCap,
  BookOpen,
  Save,
  CheckCircle2,
  Loader2,
  Camera,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MultiSelect } from "@/components/shared/multi-select";
import { MOCK_TUTORS, SUBJECTS } from "@/lib/mock-data";
import { TeachingMode } from "@/types";

// Demo: pretend we are tutor_01
const INITIAL = MOCK_TUTORS[0];

export default function TutorProfileEditPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState(INITIAL.user.name ?? "");
  const [phone, setPhone] = useState(INITIAL.phone);
  const [bio, setBio] = useState(INITIAL.bio);
  const [mode, setMode] = useState<TeachingMode>(INITIAL.teachingMode);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    INITIAL.subjects.map((s) => s.id)
  );

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Update your public tutor profile visible to parents.
          </p>
        </div>
        <Button
          id="save-profile-btn"
          onClick={handleSave}
          disabled={isSaving}
          className="gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving...
            </>
          ) : saved ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-green-400" /> Saved!
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Avatar / ID Card */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Camera className="h-4 w-4 text-primary" /> Photos & Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-md shrink-0">
              {initials}
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Profile Picture</p>
              <Button variant="outline" size="sm" className="text-xs gap-1.5">
                <Camera className="h-3.5 w-3.5" /> Upload Photo
              </Button>
              <p className="text-xs text-muted-foreground">JPG or PNG, max 3 MB</p>
            </div>
            <Separator orientation="vertical" className="h-16 hidden sm:block" />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">College ID Card</p>
                {INITIAL.isVerified ? (
                  <Badge className="text-xs bg-green-600 hover:bg-green-600">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs border-amber-400 text-amber-600">
                    Pending
                  </Badge>
                )}
              </div>
              <Button variant="outline" size="sm" className="text-xs gap-1.5">
                <GraduationCap className="h-3.5 w-3.5" /> Upload ID
              </Button>
              <p className="text-xs text-muted-foreground">JPG, PNG or PDF, max 5 MB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Info */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <UserCircle className="h-4 w-4 text-primary" /> Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name">Full Name</Label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="profile-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="profile-email"
                  value={INITIAL.user.email ?? ""}
                  disabled
                  className="pl-9 opacity-60"
                />
              </div>
              <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="profile-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
                className="pl-9"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Shared with parents only after you accept their lead.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Teaching Preferences */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" /> Teaching Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Bio */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="profile-bio">Bio</Label>
              <span className="text-xs text-muted-foreground">
                {bio.length}/500
              </span>
            </div>
            <Textarea
              id="profile-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              maxLength={500}
              className="resize-none"
            />
          </div>

          {/* Teaching Mode */}
          <div className="space-y-2">
            <Label>Teaching Mode</Label>
            <div className="grid grid-cols-3 gap-2">
              {(["ONLINE", "OFFLINE", "BOTH"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m as TeachingMode)}
                  className={`px-3 py-3 rounded-lg border text-sm font-medium transition-all ${
                    mode === m
                      ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/30"
                      : "border-border hover:border-primary/40 hover:bg-muted"
                  }`}
                >
                  {m === "ONLINE" ? "🌐 Online" : m === "OFFLINE" ? "🏠 Offline" : "🔀 Both"}
                </button>
              ))}
            </div>
          </div>

          {/* Subjects */}
          <div className="space-y-2">
            <Label>Subjects</Label>
            <MultiSelect
              options={SUBJECTS.map((s) => ({ id: s.id, name: s.name }))}
              selected={selectedSubjects}
              onChange={setSelectedSubjects}
              placeholder="Search and select subjects..."
              maxSelections={8}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
