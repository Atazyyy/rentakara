import {
  Ban,
  CalendarDays,
  CheckCircle2,
  Cog,
  Users,
} from "lucide-react";
import Reveal from "./Reveal";
import {
  UNITS,
  fmtIDR,
  fmtRange,
  unitAvailability,
} from "../data/rental";

export default function UnitCatalog({ start, end, bookings, onPick }) {
  const results = UNITS.map((u) => ({
    ...u,
    available: unitAvailability(u, start, end, bookings),
  }));

  return (
    <section id="unit" className="scroll-mt-20 border-t border-line py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-extrabold uppercase tracking-widest text-tealdark">
            Katalog
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Pilih Unit untuk{" "}
            <span className="text-tealx">{fmtRange(start, end)}</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-soft">
            Status ketersediaan dihitung langsung dari jadwal tiap unit — unit
            yang sudah dibooking otomatis ditandai.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((u, i) => (
            <Reveal key={u.id} delay={(i % 3) * 0.08} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition hover:shadow-lg">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={u.cover}
                    alt={u.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span
                    className={
                      "absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold " +
                      (u.available
                        ? "bg-tealx text-white"
                        : "bg-white/90 text-rose-600")
                    }
                  >
                    {u.available ? (
                      <>
                        <CheckCircle2 className="h-3 w-3" /> Tersedia
                      </>
                    ) : (
                      <>
                        <Ban className="h-3 w-3" /> Terbooking
                      </>
                    )}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-extrabold text-ink">{u.name}</h3>
                  <p className="mt-0.5 text-xs font-semibold text-soft">{u.model}</p>
                  <p className="mt-2 text-xs leading-relaxed text-soft">{u.desc}</p>

                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {u.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-paper px-2.5 py-1 text-[11px] font-semibold text-soft"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-soft">
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-tealx" /> {u.seats} kursi
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Cog className="h-3.5 w-3.5 text-tealx" /> {u.transmission}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-tealx" /> per hari
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
                    <p className="mt-4 font-extrabold text-ink">
                      {fmtIDR(u.price)}
                      <span className="text-xs font-semibold text-soft"> /hari</span>
                    </p>
                    <button
                      onClick={() => onPick(u.id)}
                      disabled={!u.available}
                      className={
                        "mt-4 rounded-full px-4 py-2 text-sm font-bold transition " +
                        (u.available
                          ? "bg-tealx text-white hover:bg-tealdark"
                          : "cursor-not-allowed bg-paper text-soft/50")
                      }
                    >
                      {u.available ? "Ajukan Sewa" : "Tidak Tersedia"}
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
