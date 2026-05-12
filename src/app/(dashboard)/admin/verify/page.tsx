"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  GraduationCap,
  Phone,
  Mail,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Filter,
} from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MOCK_TUTORS } from "@/lib/mock-data";

type VerifyStatus = "pending" | "verified" | "rejected";

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

export default function AdminVerifyPage() {
  const [tutors, setTutors] = useState(
    MOCK_TUTORS.map((t) => ({
      ...t,
      adminStatus: (t.isVerified ? "verified" : "pending") as VerifyStatus,
    }))
  );
  const [filter, setFilter] = useState<"ALL" | VerifyStatus>("ALL");
  const [expanded, setExpanded] = useState<string | null>(null);

  const updateStatus = (tutorId: string, status: VerifyStatus) => {
    setTutors((prev) =>
      prev.map((t) =>
        t.id === tutorId
          ? { ...t, adminStatus: status, isVerified: status === "verified" }
          : t
      )
    );
  };

  const filtered = tutors.filter((t) =>
    filter === "ALL" ? true : t.adminStatus === filter
  );

  const counts = {
    pending: tutors.filter((t) => t.adminStatus === "pending").length,
    verified: tutors.filter((t) => t.adminStatus === "verified").length,
    rejected: tutors.filter((t) => t.adminStatus === "rejected").length,
  };

  const FILTER_OPTIONS = [
    { value: "ALL", label: "All", count: tutors.length },
    { value: "pending", label: "Pending", count: counts.pending },
    { value: "verified", label: "Verified", count: counts.verified },
    { value: "rejected", label: "Rejected", count: counts.rejected },
  ];

  const STATUS_STYLES: Record<VerifyStatus, string> = {
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    verified: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  };

  const STATUS_ICONS: Record<VerifyStatus, React.ElementType> = {
    pending: Clock,
    verified: CheckCircle2,
    rejected: XCircle,
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          Verify Tutors
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Review tutor applications and approve or reject based on their college
          ID verification.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {(["pending", "verified", "rejected"] as VerifyStatus[]).map((s) => {
          const Icon = STATUS_ICONS[s];
          return (
            <Card key={s} className="border-0 shadow-sm">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${STATUS_STYLES[s]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{counts[s]}</p>
                    <p className="text-xs text-muted-foreground capitalize">{s}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            id={`verify-filter-${opt.value.toLowerCase()}`}
            onClick={() => setFilter(opt.value as "ALL" | VerifyStatus)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium flex items-center gap-1.5 ${
              filter === opt.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-border hover:border-primary/40"
            }`}
          >
            {opt.label}
            <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${filter === opt.value ? "bg-white/20" : "bg-muted"}`}>
              {opt.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tutors List */}
      <div className="space-y-3">
        {filtered.map((tutor) => {
          const initials = (tutor.user.name ?? "?")
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
          const colorIdx =
            parseInt(tutor.id.replace("tutor_", "")) % GRADIENT_COLORS.length;
          const colorClass = GRADIENT_COLORS[colorIdx];
          const StatusIcon = STATUS_ICONS[tutor.adminStatus];
          const isExpanded = expanded === tutor.id;

          return (
            <Card key={tutor.id} className="border-0 shadow-md overflow-hidden">
              <CardContent className="pt-0 pb-0">
                {/* Main row */}
                <div className="flex items-center gap-4 py-4 flex-wrap sm:flex-nowrap">
                  <div
                    className={`h-11 w-11 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold shrink-0`}
                  >
                    {initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm">{tutor.user.name}</p>
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[tutor.adminStatus]}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {tutor.adminStatus.charAt(0).toUpperCase() +
                          tutor.adminStatus.slice(1)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {tutor.degree} · Year {tutor.yearOfStudy} ·{" "}
                      {tutor.collegeName.split(" - ")[0]}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    {tutor.adminStatus !== "verified" && (
                      <Button
                        size="sm"
                        className="gap-1 text-xs bg-green-600 hover:bg-green-700"
                        onClick={() => updateStatus(tutor.id, "verified")}
                        id={`approve-tutor-${tutor.id}`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                      </Button>
                    )}
                    {tutor.adminStatus !== "rejected" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-xs text-destructive border-destructive/30 hover:bg-destructive/10"
                        onClick={() => updateStatus(tutor.id, "rejected")}
                        id={`reject-tutor-${tutor.id}`}
                      >
                        <XCircle className="h-3.5 w-3.5" /> Reject
                      </Button>
                    )}
                    <button
                      id={`expand-tutor-${tutor.id}`}
                      onClick={() =>
                        setExpanded(isExpanded ? null : tutor.id)
                      }
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <>
                    <Separator />
                    <div className="py-4 space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-0.5">
                            <Mail className="h-3 w-3" /> Email
                          </p>
                          <p className="font-medium truncate">{tutor.user.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-0.5">
                            <Phone className="h-3 w-3" /> Phone
                          </p>
                          <p className="font-medium">{tutor.phone}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-0.5">
                            <GraduationCap className="h-3 w-3" /> Teaching Mode
                          </p>
                          <p className="font-medium">{tutor.teachingMode}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1.5">Bio</p>
                        <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 rounded-lg p-3">
                          {tutor.bio}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1.5">Subjects</p>
                        <div className="flex flex-wrap gap-1.5">
                          {tutor.subjects.map((s) => (
                            <Badge key={s.id} variant="secondary" className="text-xs">
                              {s.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-lg bg-muted/50 p-3 text-center text-sm text-muted-foreground border border-dashed">
                        <BookOpen className="h-5 w-5 mx-auto mb-1 text-muted-foreground/60" />
                        ID card upload viewer — available after file upload is
                        implemented
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
