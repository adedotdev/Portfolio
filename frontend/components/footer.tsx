import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 px-6 py-8 text-center font-mono text-xs text-muted sm:flex-row sm:justify-between sm:text-left">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Built with Next.js & Tailwind CSS</span>
      </div>
    </footer>
  );
}
