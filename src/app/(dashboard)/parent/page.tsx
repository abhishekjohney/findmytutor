import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_TUTORS, MOCK_LEADS } from "@/lib/mock-data";
import { LeadStatus, TeachingMode } from "@/types";

// Demo: pretend we're parent user_p01
const MY_LEADS = MOCK_LEADS.filter((l) => l.parentId === "user_p01");
const MY_TUTORS = MY_LEADS.map((lead) =>
  MOCK_TUTORS.find((t) => t.id === lead.tutorProfileId)
).filter(Boolean) as (typeof MOCK_TUTORS)[0][];

const STATUS_STYLES = {
  [LeadStatus.PENDING]: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  [LeadStatus.ACCEPTED]: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  [LeadStatus.DECLINED]: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

const GRADIENT_COLORS = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
];

export default function ParentDashboardPage() {
  return (
    <div className="space-y-7 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Parent Dashboard 👨‍👩‍👧
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Find tutors, manage your requests, and track sessions.
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
          <CardContent className="pt-6 pb-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Find a Tutor</p>
              <p className="text-sm text-muted-foreground">
                Browse {MOCK_TUTORS.filter((t) => t.isVerified).length} verified tutors in Kochi
              </p>
            </div>
            <Link href="/tutors">
              <Button size="sm" className="gap-1">
                Browse <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="pt-6 pb-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">My Requests</p>
              <p className="text-sm text-muted-foreground">
                {MY_LEADS.length} request{MY_LEADS.length !== 1 ? "s" : ""} sent
              </p>
            </div>
            <Link href="/dashboard/parent/leads">
              <Button size="sm" variant="outline" className="gap-1">
                View <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Requests",
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
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="border-0 shadow-sm">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${s.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Your Tutors */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3 flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Your Tutors</CardTitle>
            <CardDescription>Tutors you&apos;ve contacted</CardDescription>
          </div>
          <Link href="/tutors">
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              Find More <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {MY_TUTORS.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <GraduationCap className="h-10 w-10 text-muted-foreground mx-auto" />
              <p className="font-medium">No tutors yet</p>
              <p className="text-sm text-muted-foreground">
                Browse and send a request to a tutor to get started.
              </p>
              <Link href="/tutors">
                <Button size="sm">Find Tutors</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MY_TUTORS.map((tutor, i) => {
                const lead = MY_LEADS.find((l) => l.tutorProfileId === tutor.id);
                const initials = (tutor.user.name ?? "?")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();
                const colorClass = GRADIENT_COLORS[i % GRADIENT_COLORS.length];

                return (
                  <div
                    key={tutor.id}
                    className="flex items-start gap-3 p-4 rounded-xl border hover:shadow-sm transition-shadow"
                  >
                    <div
                      className={`h-11 w-11 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold shrink-0`}
                    >
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-sm truncate">
                          {tutor.user.name}
                        </p>
                        {lead && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${STATUS_STYLES[lead.status]}`}
                          >
                            {lead.status}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {tutor.degree}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {tutor.subjects.slice(0, 2).map((s) => (
                          <Badge
                            key={s.id}
                            variant="secondary"
                            className="text-xs font-normal"
                          >
                            {s.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
