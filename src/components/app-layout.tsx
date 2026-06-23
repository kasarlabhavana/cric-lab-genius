import { Link, useRouterState } from "@tanstack/react-router";
import { Beaker, BookOpen, Bot, Flame, Home, ListChecks, Menu, Moon, Sun, TrendingUp, Trophy, User, Users, X } from "lucide-react";
import { useState } from "react";
import { useUser, deriveLevel } from "@/lib/user-state";
import { useTheme } from "@/lib/theme";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/explore", label: "Explore", icon: BookOpen },
  { to: "/laboratory", label: "Laboratory", icon: Beaker },
  { to: "/ai-coach", label: "AI Coach", icon: Bot },
  { to: "/quiz", label: "Quiz Zone", icon: ListChecks },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/community", label: "Community", icon: Users },
] as const;

export function AppHeader() {
  const { state } = useUser();
  const { theme, toggle } = useTheme();
  const pathname = useRouterState({ select: s => s.location.pathname });
  const [open, setOpen] = useState(false);
  const level = deriveLevel(state.xp);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Logo />
          <span className="font-display text-lg font-bold tracking-tight text-primary">
            Cric<span className="text-[color:var(--brand-orange)]">Science</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {NAV.map(item => {
            const Icon = item.icon;
            const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-primary/8 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {state.user && (
            <div className="hidden sm:flex items-center gap-3 rounded-full border border-border bg-surface px-3 py-1.5">
              <div className="flex items-center gap-1 text-xs font-semibold text-[color:var(--brand-orange)]">
                <Flame className="size-3.5" /> {state.streak.count}
              </div>
              <div className="h-3.5 w-px bg-border" />
              <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                <Trophy className="size-3.5" /> {state.xp} XP
              </div>
              <div className="hidden md:block h-3.5 w-px bg-border" />
              <span className="hidden md:inline text-xs font-medium text-muted-foreground">{level.name}</span>
            </div>
          )}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted transition"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <Link
            to={state.user ? "/profile" : "/auth"}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
          >
            <User className="size-4" />
            {state.user ? state.user.name.split(" ")[0] : "Sign in"}
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="lg:hidden inline-flex items-center justify-center rounded-lg border border-border p-2 text-foreground" aria-label="Open menu">
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Logo />
                  <span className="font-display font-bold text-primary">CricScience</span>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close" className="p-1">
                  <X className="size-4" />
                </button>
              </div>
              <nav className="p-3">
                {NAV.map(item => {
                  const Icon = item.icon;
                  const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${active ? "bg-primary/8 text-primary" : "text-foreground hover:bg-muted"}`}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  to={state.user ? "/profile" : "/auth"}
                  onClick={() => setOpen(false)}
                  className="mt-3 flex items-center gap-3 rounded-lg bg-primary px-3 py-3 text-sm font-medium text-primary-foreground"
                >
                  <User className="size-4" />
                  {state.user ? "My Profile" : "Sign in"}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function AppFooter() {
  return (
    <footer className="border-t border-border bg-surface mt-16">
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Logo />
            <span className="font-display font-bold text-primary">CricScience</span>
          </div>
          <p className="text-muted-foreground">Democratizing elite cricket knowledge through physics, biomechanics and AI.</p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-2 text-sm">Learn</h4>
          <ul className="space-y-1.5 text-muted-foreground">
            <li><Link to="/explore" className="hover:text-foreground">Explore Topics</Link></li>
            <li><Link to="/laboratory" className="hover:text-foreground">Laboratory</Link></li>
            <li><Link to="/quiz" className="hover:text-foreground">Quiz Zone</Link></li>
            <li><Link to="/ai-coach" className="hover:text-foreground">AI Coach</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-2 text-sm">Company</h4>
          <ul className="space-y-1.5 text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/community" className="hover:text-foreground">Community</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-2 text-sm">Legal</h4>
          <ul className="space-y-1.5 text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-foreground">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CricScience. Built with love for the game.
      </div>
    </footer>
  );
}

function Logo() {
  return (
    <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12 H20" stroke="var(--brand-orange)" />
        <path d="M9 6 L15 18" />
      </svg>
    </span>
  );
}
