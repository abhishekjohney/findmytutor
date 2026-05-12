import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  GraduationCap,
  MapPin,
  Monitor,
  Home,
  Wifi,
  Phone,
  Mail,
  BookOpen,
  Users,
} from "lucide-react";
import { MOCK_TUTORS } from "@/lib/mock-data";
import { TeachingMode } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Static params for build
export async function generateStaticParams() {
  return MOCK_TUTORS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const tutor = MOCK_TUTORS.find((t) => t.id === id);
  if (!tutor) return { title: "Tutor Not Found | FindMyTutor" };
  return {
    title: `${tutor.user.name} — Tutor Profile | FindMyTutor`,
    description: tutor.bio.slice(0, 160),
  };
}

const GRADIENT_COLORS = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-orange-500 to-amber-600",
  "from-cyan-500 to-sky-600",
  "from-fuchsia-500 to-pink-600",
  "from-green-500 to-emerald-600",
];

function ModeIcon({ mode }: { mode: TeachingMode }) {
  if (mode === TeachingMode.ONLINE)
    return <Wifi className="h-4 w-4 text-blue-500" />;
  if (mode === TeachingMode.OFFLINE)
    return <Home className="h-4 w-4 text-amber-500" />;
  return <Monitor className="h-4 w-4 text-purple-500" />;
}

function ModeLabel({ mode }: { mode: TeachingMode }) {
  const map: Record<TeachingMode, string> = {
    [TeachingMode.ONLINE]: "Online sessions only",
    [TeachingMode.OFFLINE]: "Home visits only",
    [TeachingMode.BOTH]: "Online & Home visits",
  };
  return <span>{map[mode]}</span>;
}

export default async function TutorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tutor = MOCK_TUTORS.find((t) => t.id === id);
  if (!tutor) notFound();

  const initials = (tutor.user.name ?? "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const colorIdx = parseInt(tutor.id.replace("tutor_", "")) % GRADIENT_COLORS.length;
  const colorClass = GRADIENT_COLORS[colorIdx];

  const joinYear = tutor.createdAt.getFullYear();

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      {/* Back link */}
      <Link
        href="/tutors"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Tutors
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── LEFT COL ── */}
        <div className="lg:col-span-1 space-y-5">
          {/* Profile Card */}
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className={`h-20 bg-gradient-to-br ${colorClass}`} />
            <CardContent className="pt-0 pb-6 text-center">
              <div
                className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold text-2xl shadow-lg mx-auto -mt-10 mb-4 ring-4 ring-background`}
              >
                {initials}
              </div>
              <h1 className="text-xl font-bold tracking-tight">
                {tutor.user.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {tutor.degree}
              </p>

              {/* Verification badge */}
              <div className="mt-3 flex justify-center">
                {tutor.isVerified ? (
                  <span className="inline-flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400 font-medium bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                    <CheckCircle2 className="h-4 w-4" /> Verified Tutor
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm text-amber-600 font-medium bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                    <Clock className="h-4 w-4" /> Verification Pending
                  </span>
                )}
              </div>

              <Separator className="my-4" />

              {/* Details */}
              <div className="space-y-2.5 text-left text-sm">
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <GraduationCap className="h-4 w-4 shrink-0" />
                  <span className="truncate">{tutor.collegeName.split(" - ")[0]}</span>
                </div>
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <BookOpen className="h-4 w-4 shrink-0" />
                  <span>Year {tutor.yearOfStudy}</span>
                </div>
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <ModeIcon mode={tutor.teachingMode} />
                  <ModeLabel mode={tutor.teachingMode} />
                </div>
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>Kochi, Kerala</span>
                </div>
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <Users className="h-4 w-4 shrink-0" />
                  <span>Joined {joinYear}</span>
                </div>
              </div>

              <Button className="w-full mt-5 gap-2" id="contact-tutor-btn">
                <Mail className="h-4 w-4" />
                Send a Request
              </Button>

              {tutor.isVerified && (
                <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
                  <Phone className="h-3 w-3" />
                  Phone shared after acceptance
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── RIGHT COL ── */}
        <div className="lg:col-span-2 space-y-5">
          {/* About */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tutor.bio}
              </p>
            </CardContent>
          </Card>

          {/* Subjects */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Subjects ({tutor.subjects.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tutor.subjects.map((sub) => (
                  <Badge
                    key={sub.id}
                    variant="secondary"
                    className="text-sm font-normal py-1 px-3"
                  >
                    {sub.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Teaching Mode */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Teaching Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {([TeachingMode.ONLINE, TeachingMode.OFFLINE, TeachingMode.BOTH] as const).map((mode) => {
                  const isActive =
                    tutor.teachingMode === mode ||
                    tutor.teachingMode === TeachingMode.BOTH;
                  const modeActive =
                    tutor.teachingMode === mode ||
                    (tutor.teachingMode === TeachingMode.BOTH &&
                      mode !== TeachingMode.BOTH);
                  const strictActive = tutor.teachingMode === mode;

                  if (mode === TeachingMode.BOTH) return null;
                  return (
                    <div
                      key={mode}
                      className={`rounded-xl border p-4 text-center transition-colors ${
                        modeActive
                          ? "border-primary/40 bg-primary/5"
                          : "border-border bg-muted/20 opacity-40"
                      }`}
                    >
                      <ModeIcon mode={mode} />
                      <p className="text-sm font-medium mt-2">
                        {mode === TeachingMode.ONLINE ? "Online" : "Home Visit"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {modeActive ? "Available" : "Not available"}
                      </p>
                    </div>
                  );
                })}
                {/* Fill when BOTH */}
                {tutor.teachingMode !== TeachingMode.ONLINE && tutor.teachingMode !== TeachingMode.OFFLINE && (
                  <div className="rounded-xl border border-primary/40 bg-primary/5 p-4 text-center sm:col-span-1 hidden">
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* CTA Banner */}
          <div className={`rounded-2xl bg-gradient-to-br ${colorClass} p-6 text-white shadow-xl`}>
            <h3 className="font-bold text-lg">Interested in {tutor.user.name?.split(" ")[0]}&apos;s sessions?</h3>
            <p className="text-sm text-white/80 mt-1">
              Send a request and they&apos;ll get back to you within 24 hours.
            </p>
            <Button
              variant="secondary"
              className="mt-4"
              id="cta-contact-tutor-btn"
            >
              Send a Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
