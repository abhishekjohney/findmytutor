import { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Search, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FindMyTutor — Home Tuition by College Students in Kochi",
  description:
    "Connect with verified college student tutors near you. Affordable home tuition for CBSE, State Board, JEE, and NEET preparation in Kochi, Kerala.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                F
              </span>
            </div>
            <span className="font-bold text-lg tracking-tight">
              Find<span className="text-primary">My</span>Tutor
            </span>
          </div>
          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <div className="container mx-auto px-4 py-20 sm:py-32 relative">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <GraduationCap className="h-4 w-4" />
                Trusted by families across Kochi
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Find the perfect{" "}
                <span className="text-primary">college tutor</span> for your
                child
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Connect with verified CUSAT & Kochi-area college students who
                offer affordable, high-quality home tuition for CBSE, State
                Board, JEE & NEET.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/tutors">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    <Search className="h-4 w-4" />
                    Find a Tutor
                  </Button>
                </Link>
                <Link href="/register/tutor">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 w-full sm:w-auto"
                  >
                    Become a Tutor
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Verified Students</h3>
                <p className="text-sm text-muted-foreground">
                  Every tutor is verified with their college ID card before they
                  can connect with families.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Quality Teaching</h3>
                <p className="text-sm text-muted-foreground">
                  College students bring fresh perspectives and relatable
                  teaching methods that students love.
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Easy to Find</h3>
                <p className="text-sm text-muted-foreground">
                  Search by subject, location, and teaching mode to find the
                  perfect tutor for your child.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} FindMyTutor. Connecting Kochi&apos;s
          college students with families.
        </p>
      </footer>
    </div>
  );
}
