import { CalendarCheck } from "lucide-react";

const LINKS = [
  { href: "#unit", label: "Unit" },
  { href: "#cara-sewa", label: "Cara Sewa" },
  { href: "#booking", label: "Ajukan Sewa" },
  { href: "#jadwal", label: "Panel Jadwal" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8">
        <a href="#" className="text-xl font-extrabold tracking-tight text-ink">
          Renta<span className="text-tealx">kara</span>
        </a>

        <div className="hidden items-center gap-7 text-sm font-medium text-soft md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-ink">
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#unit"
          className="inline-flex items-center gap-1.5 rounded-full bg-tealx px-4 py-2 text-sm font-bold text-white shadow-md shadow-tealx/25 transition hover:bg-tealdark"
        >
          <CalendarCheck className="h-4 w-4" /> Cek Ketersediaan
        </a>
      </nav>
    </header>
  );
}
