export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="text-primary-foreground font-bold text-sm">
                F
              </span>
            </div>
            <span className="font-bold text-lg tracking-tight">
              Find<span className="text-primary">My</span>Tutor
            </span>
          </a>
          <nav className="flex items-center gap-4">
            <a
              href="/tutors"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Find Tutors
            </a>
            <a
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </a>
            <a
              href="/register"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90 transition-colors"
            >
              Register
            </a>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} FindMyTutor — Connecting Kochi&apos;s
            college students with families who need them.
          </p>
        </div>
      </footer>
    </div>
  );
}
