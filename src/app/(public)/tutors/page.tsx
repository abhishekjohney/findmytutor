"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  GraduationCap,
  MapPin,
  Monitor,
  Home,
  Wifi,
  CheckCircle2,
  Clock,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { MOCK_TUTORS, SUBJECTS } from "@/lib/mock-data";
import { TeachingMode } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TEACHING_MODE_OPTIONS = [
  { value: "ALL", label: "All Modes" },
  { value: TeachingMode.ONLINE, label: "Online" },
  { value: TeachingMode.OFFLINE, label: "Home Visit" },
  { value: TeachingMode.BOTH, label: "Both" },
];

function TeachingModeBadge({ mode }: { mode: TeachingMode }) {
  if (mode === TeachingMode.ONLINE) {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium">
        <Wifi className="h-3 w-3" /> Online
      </span>
    );
  }
  if (mode === TeachingMode.OFFLINE) {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 font-medium">
        <Home className="h-3 w-3" /> Home Visit
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 font-medium">
      <Monitor className="h-3 w-3" /> Online & Home
    </span>
  );
}

function TutorCard({ tutor }: { tutor: (typeof MOCK_TUTORS)[0] }) {
  const initials = (tutor.user.name ?? "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const colors = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-rose-500 to-pink-600",
    "from-orange-500 to-amber-600",
    "from-cyan-500 to-sky-600",
    "from-fuchsia-500 to-pink-600",
    "from-green-500 to-emerald-600",
  ];
  const colorClass = colors[parseInt(tutor.id.replace("tutor_", "")) % colors.length];

  return (
    <Link href={`/tutors/${tutor.id}`} className="group block">
      <div className="relative rounded-2xl border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 overflow-hidden">
        {/* Top accent bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${colorClass}`} />

        <div className="p-5 space-y-4">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div
              className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-md`}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-base leading-tight truncate">
                  {tutor.user.name}
                </h3>
                {tutor.isVerified ? (
                  <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> Pending
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5 truncate">
                {tutor.degree} · Year {tutor.yearOfStudy}
              </p>
              <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">
                  {tutor.collegeName.split(" - ")[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {tutor.bio}
          </p>

          {/* Subjects */}
          <div className="flex flex-wrap gap-1.5">
            {tutor.subjects.slice(0, 3).map((sub) => (
              <Badge
                key={sub.id}
                variant="secondary"
                className="text-xs font-normal"
              >
                {sub.name}
              </Badge>
            ))}
            {tutor.subjects.length > 3 && (
              <Badge variant="outline" className="text-xs font-normal">
                +{tutor.subjects.length - 3} more
              </Badge>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-1">
            <TeachingModeBadge mode={tutor.teachingMode} />
            <span className="text-xs font-medium text-primary group-hover:underline">
              View Profile →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function TutorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMode, setSelectedMode] = useState("ALL");
  const [selectedSubject, setSelectedSubject] = useState("ALL");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_TUTORS.filter((tutor) => {
      // Name/bio search
      const q = searchQuery.toLowerCase();
      if (
        q &&
        !tutor.user.name?.toLowerCase().includes(q) &&
        !tutor.bio.toLowerCase().includes(q) &&
        !tutor.degree.toLowerCase().includes(q) &&
        !tutor.subjects.some((s) => s.name.toLowerCase().includes(q))
      ) {
        return false;
      }
      // Teaching mode
      if (selectedMode !== "ALL" && tutor.teachingMode !== selectedMode)
        return false;
      // Subject
      if (
        selectedSubject !== "ALL" &&
        !tutor.subjects.some((s) => s.id === selectedSubject)
      )
        return false;
      // Verified
      if (verifiedOnly && !tutor.isVerified) return false;
      return true;
    });
  }, [searchQuery, selectedMode, selectedSubject, verifiedOnly]);

  const hasFilters =
    searchQuery || selectedMode !== "ALL" || selectedSubject !== "ALL" || verifiedOnly;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedMode("ALL");
    setSelectedSubject("ALL");
    setVerifiedOnly(false);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      {/* Page Header */}
      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Find Tutors</h1>
        <p className="text-muted-foreground">
          Browse {MOCK_TUTORS.length} verified college student tutors in Kochi
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="tutor-search"
            placeholder="Search by name, subject, or degree..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />

          {/* Teaching Mode Filter */}
          <div className="flex gap-1.5 flex-wrap">
            {TEACHING_MODE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                id={`mode-filter-${opt.value.toLowerCase()}`}
                onClick={() => setSelectedMode(opt.value)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
                  selectedMode === opt.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:border-primary/40 hover:text-primary"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-border hidden sm:block" />

          {/* Subject Filter */}
          <select
            id="subject-filter"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:border-primary/40 cursor-pointer outline-none focus:border-primary transition-colors font-medium"
          >
            <option value="ALL">All Subjects</option>
            {SUBJECTS.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>

          {/* Verified filter */}
          <button
            id="verified-filter"
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
              verifiedOnly
                ? "bg-green-600 text-white border-green-600"
                : "bg-background border-border hover:border-primary/40 hover:text-primary"
            }`}
          >
            <CheckCircle2 className="h-3 w-3" />
            Verified Only
          </button>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 ml-auto"
            >
              <X className="h-3 w-3" /> Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-5">
        Showing{" "}
        <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
        tutor{filtered.length !== 1 ? "s" : ""}
        {hasFilters ? " matching your filters" : ""}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
            <GraduationCap className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold">No tutors found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your filters or search query
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
