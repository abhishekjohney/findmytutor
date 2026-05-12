import {
  Users,
  GraduationCap,
  CheckCircle2,
  Clock,
  BookOpen,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
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
import { LeadStatus } from "@/types";

const STATS = [
  {
    label: "Total Tutors",
    value: MOCK_TUTORS.length,
    icon: GraduationCap,
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    label: "Verified",
    value: MOCK_TUTORS.filter((t) => t.isVerified).length,
    icon: CheckCircle2,
    color: "text-green-500 bg-green-500/10",
  },
  {
    label: "Pending Verification",
    value: MOCK_TUTORS.filter((t) => !t.isVerified).length,
    icon: Clock,
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    label: "Total Leads",
    value: MOCK_LEADS.length,
    icon: BookOpen,
    color: "text-purple-500 bg-purple-500/10",
  },
];

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

export default function AdminDashboardPage() {
  const pendingTutors = MOCK_TUTORS.filter((t) => !t.isVerified);
  const recentTutors = [...MOCK_TUTORS]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-7 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Platform overview and management tools.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="border-0 shadow-md">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${s.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pending verification alert */}
      {pendingTutors.length > 0 && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-900/20 p-4 flex items-center gap-3">
          <Clock className="h-5 w-5 text-amber-500 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-sm text-amber-800 dark:text-amber-300">
              {pendingTutors.length} tutor{pendingTutors.length > 1 ? "s" : ""}{" "}
              awaiting verification
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-400">
              Review their college IDs and approve or reject.
            </p>
          </div>
          <Link href="/dashboard/admin/verify">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white gap-1">
              Review <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent tutors */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3 flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent Registrations</CardTitle>
              <CardDescription>Latest tutor sign-ups</CardDescription>
            </div>
            <Link href="/dashboard/admin/verify">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                Verify All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTutors.map((tutor, i) => {
              const initials = (tutor.user.name ?? "?")
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              const colorClass = GRADIENT_COLORS[parseInt(tutor.id.replace("tutor_", "")) % GRADIENT_COLORS.length];

              return (
                <div
                  key={tutor.id}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/40 transition-colors"
                >
                  <div
                    className={`h-9 w-9 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                  >
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {tutor.user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {tutor.degree}
                    </p>
                  </div>
                  {tutor.isVerified ? (
                    <Badge className="text-xs bg-green-600 hover:bg-green-600 shrink-0">
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs border-amber-400 text-amber-600 shrink-0">
                      Pending
                    </Badge>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Lead stats */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Lead Activity</CardTitle>
            <CardDescription>Recent contact requests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {MOCK_LEADS.map((lead) => {
              const tutor = MOCK_TUTORS.find(
                (t) => t.id === lead.tutorProfileId
              );
              const statusColors = {
                [LeadStatus.PENDING]: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
                [LeadStatus.ACCEPTED]: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
                [LeadStatus.DECLINED]: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
              };
              return (
                <div
                  key={lead.id}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/40 transition-colors"
                >
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    P
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      → {tutor?.user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lead.createdAt.toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${statusColors[lead.status]}`}
                  >
                    {lead.status}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
