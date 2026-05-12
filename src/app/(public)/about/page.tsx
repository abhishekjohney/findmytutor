import { Metadata } from "next";
import {
  GraduationCap,
  Shield,
  Users,
  Heart,
  MapPin,
  Lightbulb,
  Star,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOCK_TUTORS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "About | FindMyTutor",
  description:
    "Learn about FindMyTutor — connecting Kochi's college students with families seeking quality, affordable home tutoring.",
};

const STATS = [
  { label: "Tutors Registered", value: "50+" },
  { label: "Subjects Covered", value: "20+" },
  { label: "Families Served", value: "100+" },
  { label: "Avg. Rating", value: "4.9★" },
];

const VALUES = [
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "Every tutor is verified with their college ID before going live. Parents can browse with confidence.",
  },
  {
    icon: GraduationCap,
    title: "Academic Excellence",
    description:
      "Our tutors are top-performing college students who recently cleared the same boards and exams.",
  },
  {
    icon: Heart,
    title: "Affordable Tuition",
    description:
      "College students offer competitive rates, making quality education accessible to every family.",
  },
  {
    icon: Lightbulb,
    title: "Modern Teaching",
    description:
      "Fresh graduates bring relatable teaching styles, digital tools, and up-to-date syllabus knowledge.",
  },
];

export default function AboutPage() {
  const verifiedCount = MOCK_TUTORS.filter((t) => t.isVerified).length;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-background to-muted/30">
        <div className="container mx-auto px-4 py-20 max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <MapPin className="h-4 w-4" /> Based in Kochi, Kerala
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            About{" "}
            <span className="text-primary">
              Find<span className="text-foreground">My</span>Tutor
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We bridge the gap between college students who want to earn while
            studying, and families in Kochi who need affordable, high-quality
            home tutoring for their children.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-16 max-w-4xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              FindMyTutor was started to solve a simple problem: parents in Kochi
              struggle to find reliable, affordable tutors for their children,
              while college students at CUSAT and other nearby institutions want
              flexible, part-time work that matches their skills.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We verify every tutor&apos;s college ID, making the process safe
              and transparent for families. Tutors get discovered, parents get
              connected — and students succeed.
            </p>
          </div>
          <div className="rounded-2xl border bg-muted/30 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Trusted Platform</p>
                <p className="text-xs text-muted-foreground">
                  {verifiedCount} verified tutors currently active
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Two-Sided Marketplace</p>
                <p className="text-xs text-muted-foreground">
                  Designed for both tutors and parents
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Kochi-Focused</p>
                <p className="text-xs text-muted-foreground">
                  Hyper-local — covering Ernakulam district
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t bg-muted/20">
        <div className="container mx-auto px-4 py-16 max-w-4xl space-y-10">
          <h2 className="text-2xl font-bold tracking-tight text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-4 p-5 rounded-2xl border bg-card hover:shadow-md transition-shadow"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16 max-w-3xl text-center space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground">
            Whether you&apos;re a parent searching for a tutor, or a college
            student ready to teach — we&apos;ve got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/tutors">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Find a Tutor
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register/tutor">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 w-full sm:w-auto"
              >
                <GraduationCap className="h-4 w-4" />
                Become a Tutor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
