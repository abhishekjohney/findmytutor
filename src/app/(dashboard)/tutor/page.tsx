import Link from "next/link";
import {
  BookOpen,
  UserCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  ArrowRight,
  Star,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_TUTORS, MOCK_LEADS } from "@/lib/mock-data";
import { LeadStatus } from "@/types";

// Demo: pretend we're Arjun Menon (tutor_01)
const MY_TUTOR = MOCK_TUTORS[0];
const MY_LEADS = MOCK_LEADS.filter((l) => l.tutorProfileId === MY_TUTOR.id);

const STATS = [
  {
    label: "Incoming Leads",
    value: MY_LEADS.length,
    icon: BookOpen,
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    label: "Accepted",
    value: MY_LEADS.filter((l) => l.status === LeadStatus.ACCEPTED).length,
    icon: CheckCircle2,
    color: "text-green-500 bg-green-500/10",
  },
  {
    label: "Pending",
    value: MY_LEADS.filter((l) => l.status === LeadStatus.PENDING).length,
    icon: Clock,
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    label: "Subjects",
    value: MY_TUTOR.subjects.length,
    icon: Star,
    color: "text-purple-500 bg-purple-500/10",
  },
];

const STATUS_STYLES: Record<LeadStatus, string> = {
  [LeadStatus.PENDING]: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  [LeadStatus.ACCEPTED]: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  [LeadStatus.DECLINED]: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

export default function TutorDashboardPage() {
  return (
    <div className="space-y-7 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {MY_TUTOR.user.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Here&apos;s an overview of your tutor profile and activity.
        </p>
      </div>

      {/* Verification banner */}
      {!MY_TUTOR.isVerified && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-900/20 p-4 flex items-start gap-3">
          <Clock className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-sm text-amber-800 dark:text-amber-300">
              Verification Pending
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
              Upload your college ID to get verified and appear to more parents.
            </p>
          </div>
          <Link href="/dashboard/tutor/profile" className="ml-auto shrink-0">
            <Button size="sm" variant="outline" className="text-xs">
              Upload ID
            </Button>
          </Link>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-0 shadow-md">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <Card className="border-0 shadow-md lg:col-span-2">
          <CardHeader className="pb-3 flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent Leads</CardTitle>
              <CardDescription>Parents who contacted you</CardDescription>
            </div>
            <Link href="/dashboard/tutor/leads">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {MY_LEADS.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No leads yet. Make sure your profile is complete!
              </p>
            ) : (
              <div className="space-y-3">
                {MY_LEADS.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      P
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Parent Request</p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                        {lead.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {lead.createdAt.toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${STATUS_STYLES[lead.status]}`}
                    >
                      {lead.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile Snapshot */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Profile</CardTitle>
            <CardDescription>Your current info</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {(MY_TUTOR.user.name ?? "?")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm">{MY_TUTOR.user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {MY_TUTOR.degree}
                </p>
              </div>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">Mode</span>
                <Badge variant="secondary" className="text-xs font-normal">
                  {MY_TUTOR.teachingMode}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">College</span>
                <span className="text-xs font-medium truncate max-w-[120px]">
                  CUSAT
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">Subjects</span>
                <span className="text-xs font-medium">
                  {MY_TUTOR.subjects.length}
                </span>
              </div>
            </div>
            <Link href="/dashboard/tutor/profile" className="block">
              <Button variant="outline" size="sm" className="w-full gap-1 text-xs">
                <UserCircle className="h-3.5 w-3.5" /> Edit Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Subjects */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Subjects You Teach</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {MY_TUTOR.subjects.map((sub) => (
              <Badge key={sub.id} variant="secondary" className="text-sm font-normal py-1 px-3">
                {sub.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
