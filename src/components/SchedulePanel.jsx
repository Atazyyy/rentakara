import { CalendarCheck, Car, Receipt, RotateCcw, Wallet } from "lucide-react";
import Reveal from "./Reveal";
import {
  STATUS_FLOW,
  UNITS,
  daysBetween,
  fmtIDR,
  fmtRange,
  unitById,
} from "../data/rental";
import { resetBookings } from "../utils/bookings";

const STATUS_STYLE = {
  Menunggu: "bg-amber-100 text-amber-700",
  Dikonfirmasi: "bg-sky-100 text-sky-700",
  Berjalan: "bg-teal-100 text-teal-700",
  Selesai: "bg-stone-200 text-stone-500",
};

const todayISO = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
};

export default function SchedulePanel({ bookings, onCycle, onReset }) {
  const today = todayISO();
  const month = today.slice(0, 7);

  const busyToday = new Set(
    bookings
      .filter((b) => b.status !== "Selesai" && b.start <= today && b.end >= today)
      .map((b) => b.unitId)
  );
  const availableToday = UNITS.length - busyToday.size;
  const running = bookings.filter((b) => b.status === "Berjalan").length;
  const pending = bookings.filter((b) => b.status === "Menunggu").length;
  const monthRevenue = bookings
    .filter((b) => b.start.startsWith(month))
    .reduce((a, b) => a + b.total, 0);

  const stats = [
    { icon: Car, label: "Unit tersedia hari ini", value: `${availableToday}/${UNITS.length}` },
    { icon: CalendarCheck, label: "Sedang berjalan", value: running },
    { icon: Receipt, label: "Menunggu konfirmasi", value: pending },
    { icon: Wallet, label: "Pendapatan bulan ini", value: fmtIDR(monthRevenue) },
  ];

  return (
    <section id="jadwal" className="scroll-mt-20 border-t border-line py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-tealdark">
                Untuk Pemilik Rental
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Panel Jadwal & Booking
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-soft">
                Semua pengajuan sewa masuk ke sini. Klik status untuk
                mengubahnya: Menunggu → Dikonfirmasi → Berjalan → Selesai.
              </p>
            </div>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 text-xs font-bold text-soft transition hover:border-tealx hover:text-ink"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset data demo
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-line bg-card p-5 shadow-sm"
              >
                <div className="flex items-center gap-2 text-soft">
                  <s.icon className="h-4 w-4 text-tealx" />
                  <p className="text-[11px] font-extrabold uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
                <p className="mt-3 text-2xl font-extrabold text-ink">{s.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-6 overflow-hidden rounded-3xl border border-line bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-[11px] font-extrabold uppercase tracking-wider text-soft">
                    <th className="px-5 py-3">Kode</th>
                    <th className="px-5 py-3">Unit</th>
                    <th className="px-5 py-3">Tanggal</th>
                    <th className="px-5 py-3">Durasi</th>
                    <th className="px-5 py-3">Penyewa</th>
                    <th className="px-5 py-3">Total</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td className="px-5 py-3 font-mono text-xs font-bold text-tealdark">
                        {b.code}
                      </td>
                      <td className="px-5 py-3 font-semibold text-ink">
                        {unitById(b.unitId)?.name}
                        {b.withDriver && (
                          <span className="ml-2 rounded-full bg-tealx/10 px-2 py-0.5 text-[10px] font-bold text-tealdark">
                            +supir
                          </span>
                        )}
                        {b.delivery && (
                          <span className="ml-1.5 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                            antar
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-soft">{fmtRange(b.start, b.end)}</td>
                      <td className="px-5 py-3 text-soft">
                        {daysBetween(b.start, b.end)} hari
                      </td>
                      <td className="px-5 py-3 text-ink">{b.name}</td>
                      <td className="px-5 py-3 font-bold text-ink">{fmtIDR(b.total)}</td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => onCycle(b.id)}
                          className={
                            "rounded-full px-3 py-1 text-[11px] font-bold transition hover:brightness-95 " +
                            (STATUS_STYLE[b.status] || "bg-stone-200")
                          }
                          title="Klik untuk ubah status"
                        >
                          {b.status}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-line px-5 py-3 text-xs text-soft">
              {bookings.length} booking tersimpan di browser (localStorage) — di
              produksi tersambung ke database.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
