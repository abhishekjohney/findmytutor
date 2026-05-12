import Link from "next/link";
import { CheckCircle2, Clock, XCircle, ArrowRight, GraduationCap, MapPin } from "lucide-react";
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

const STATUS_ICONS = {
  [LeadStatus.PENDING]: Clock,
  [LeadStatus.ACCEPTED]: CheckCircle2,
  [LeadStatus.DECLINED]: XCircle,
};

const STATUS_STYLES = {
  [LeadStatus.PENDING]:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  [LeadStatus.ACCEPTED]:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  [LeadStatus.DECLINED]:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

const GRADIENT_COLORS = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
];

export default function ParentLeadsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Requests</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Track the status of your tutor requests.
          </p>
        </div>
        <Link href="/tutors">
          <Button className="gap-2">
            <GraduationCap className="h-4 w-4" /> Find More Tutors
          </Button>
        </Link>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-3 gap-4">
        {[LeadStatus.PENDING, LeadStatus.ACCEPTED, LeadStatus.DECLINED].map(
          (status) => {
            const count = MY_LEADS.filter((l) => l.status === status).length;
            const Icon = STATUS_ICONS[status];
            return (
              <Card key={status} className="border-0 shadow-sm">
                <CardContent className="pt-4 pb-4 text-center">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center mx-auto mb-2 ${STATUS_STYLES[status]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-xl font-bold">{count}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {status.toLowerCase()}
                  </p>
                </CardContent>
              </Card>
            );
          }
        )}
      </div>

      {/* Leads list */}
      {MY_LEADS.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
            <GraduationCap className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="font-semibold">No requests yet</p>
          <p className="text-sm text-muted-foreground">
            Browse tutors and send your first request.
          </p>
          <Link href="/tutors">
            <Button>Find Tutors</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {MY_LEADS.map((lead, i) => {
            const tutor = MOCK_TUTORS.find((t) => t.id === lead.tutorProfileId);
            const StatusIcon = STATUS_ICONS[lead.status];
            const colorClass = GRADIENT_COLORS[i % GRADIENT_COLORS.length];
            const initials = (tutor?.user.name ?? "?")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <Card key={lead.id} className="border-0 shadow-md">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-start gap-4">
                    {/* Tutor avatar */}
                    <Link href={`/tutors/${tutor?.id}`}>
                      <div
                        className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold shrink-0 hover:opacity-90 transition-opacity cursor-pointer`}
                      >
                        {initials}
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0 space-y-2">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <Link
                            href={`/tutors/${tutor?.id}`}
                            className="font-semibold text-sm hover:underline"
                          >
                            {tutor?.user.name ?? "Unknown Tutor"}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {tutor?.degree} · {tutor?.collegeName.split(" - ")[0]}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[lead.status]}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {lead.status}
                        </span>
                      </div>

                      {/* Subjects */}
                      <div className="flex flex-wrap gap-1">
                        {tutor?.subjects.slice(0, 3).map((s) => (
                          <Badge
                            key={s.id}
                            variant="secondary"
                            className="text-xs font-normal"
                          >
                            {s.name}
                          </Badge>
                        ))}
                      </div>

                      {/* Your message */}
                      <div className="rounded-lg bg-muted/40 p-3 text-sm text-muted-foreground italic border-l-2 border-primary/40">
                        &ldquo;{lead.message}&rdquo;
                      </div>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          Sent{" "}
                          {lead.createdAt.toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        {lead.status === LeadStatus.ACCEPTED && (
                          <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Phone shared — check email
                          </span>
                        )}
                        {lead.status === LeadStatus.DECLINED && (
                          <Link href="/tutors">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-7 gap-1"
                            >
                              Find Another <ArrowRight className="h-3 w-3" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
