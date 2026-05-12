export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center">
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
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-start justify-center px-4 py-8 sm:py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t py-4 text-center text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} FindMyTutor. Built for Kochi students &
          parents.
        </p>
      </footer>
    </div>
  );
}
