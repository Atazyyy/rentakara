import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Navigation,
  UserRound,
} from "lucide-react";
import Reveal from "./Reveal";
import {
  DELIVERY_PRICE,
  DRIVER_PRICE,
  UNITS,
  WA_NUMBER,
  daysBetween,
  fmtIDR,
  fmtRange,
  unitById,
  unitAvailability,
} from "../data/rental";
import { buildBooking } from "../utils/bookings";

const STEPS = ["Unit & Tanggal", "Data Penyewa", "Ringkasan"];

function Stepper({ step }) {
  return (
    <ol className="flex items-center gap-2">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const active = n === step;
        const done = n < step;
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold " +
                (done
                  ? "bg-tealdark text-white"
                  : active
                    ? "bg-tealx text-white"
                    : "border border-line bg-paper text-soft")
              }
            >
              {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : n}
            </span>
            <span
              className={
                "hidden text-xs font-bold sm:block " +
                (active ? "text-ink" : "text-soft")
              }
            >
              {label}
            </span>
            {n < STEPS.length && <span className="h-px flex-1 bg-line" aria-hidden />}
          </li>
        );
      })}
    </ol>
  );
}

export default function BookingSection({ start, end, unitId, bookings, onBook }) {
  const [step, setStep] = useState(1);
  const [localUnit, setLocalUnit] = useState(unitId || UNITS[0].id);
  const [localStart, setLocalStart] = useState(start);
  const [localEnd, setLocalEnd] = useState(end);
  const [withDriver, setWithDriver] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [name, setName] = useState("");
  const [wa, setWa] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(null);

  useEffect(() => {
    if (unitId) setLocalUnit(unitId);
    if (start) setLocalStart(start);
    if (end) setLocalEnd(end);
  }, [unitId, start, end]);

  const unit = unitById(localUnit);
  const days = daysBetween(localStart, localEnd);
  const available = unitAvailability(unit, localStart, localEnd, bookings);
  const total =
    days * unit.price +
    (withDriver ? days * DRIVER_PRICE : 0) +
    (delivery ? DELIVERY_PRICE : 0);

  const next = () => {
    setError("");
    if (step === 1) {
      if (days < 1) return setError("Tanggal kembali minimal 1 hari setelah ambil.");
      if (!available)
        return setError("Unit sudah terbooking di tanggal itu — pilih unit lain.");
      return setStep(2);
    }
    if (step === 2) {
      if (name.trim().length < 3) return setError("Nama minimal 3 karakter.");
      if (wa.replace(/\D/g, "").length < 9)
        return setError("Nomor WhatsApp tidak valid.");
      return setStep(3);
    }
  };

  const submit = () => {
    const booking = buildBooking({
      unitId: localUnit,
      start: localStart,
      end: localEnd,
      withDriver,
      delivery,
      name: name.trim(),
      wa: wa.trim(),
    });
    booking.total = total;
    onBook(booking);
    setDone(booking);
  };

  const reset = () => {
    setDone(null);
    setStep(1);
    setName("");
    setWa("");
    setError("");
  };

  const waLink = done
    ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
        `Halo Rentakara! Saya mengajukan sewa.\n\nKode: ${done.code}\nUnit: ${unitById(done.unitId).name}\nTanggal: ${fmtRange(done.start, done.end)}\nNama: ${done.name}\nTotal: ${fmtIDR(done.total)}`
      )}`
    : "#";

  return (
    <section id="booking" className="scroll-mt-20 border-t border-line py-16">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal>
          <p className="text-xs font-extrabold uppercase tracking-widest text-tealdark">
            Booking
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Ajukan Sewa dalam 3 Langkah
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-soft">
            Isi data sekali, dapat kode booking, dan konfirmasi lewat WhatsApp.
            Pembayaran saat unit diambil.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 rounded-3xl border border-line bg-card p-6 shadow-sm sm:p-8">
            {done ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-4 text-center"
              >
                <CheckCircle2 className="h-14 w-14 text-tealx" />
                <h3 className="mt-4 text-2xl font-extrabold text-ink">
                  Pengajuan Terkirim!
                </h3>
                <p className="mt-2 max-w-sm text-sm text-soft">
                  Simpan kode booking ini — tunjukkan saat pengambilan unit.
                </p>
                <p className="mt-6 rounded-2xl border-2 border-dashed border-tealx bg-tealx/5 px-8 py-4 text-3xl font-extrabold tracking-widest text-tealdark">
                  {done.code}
                </p>
                <div className="mt-6 w-full max-w-sm space-y-1.5 rounded-2xl border border-line bg-paper p-4 text-sm">
                  <p className="font-extrabold text-ink">{unitById(done.unitId).name}</p>
                  <p className="text-soft">
                    {fmtRange(done.start, done.end)} · {fmtIDR(done.total)}
                  </p>
                  <p className="text-soft">a.n. {done.name}</p>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-tealx px-5 py-2.5 text-sm font-bold text-white transition hover:bg-tealdark"
                  >
                    <MessageCircle className="h-4 w-4" /> Konfirmasi ke WhatsApp
                  </a>
                  <button
                    onClick={reset}
                    className="rounded-full border border-line px-5 py-2.5 text-sm font-bold text-soft transition hover:border-tealx hover:text-ink"
                  >
                    Ajukan Lagi
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                <Stepper step={step} />

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="s1"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.3 }}
                      className="mt-7"
                    >
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <label className="text-[11px] font-extrabold uppercase tracking-wider text-soft">
                            Unit
                          </label>
                          <select
                            value={localUnit}
                            onChange={(e) => setLocalUnit(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-tealx"
                          >
                            {UNITS.map((u) => (
                              <option key={u.id} value={u.id}>
                                {u.name} — {fmtIDR(u.price)}/hari
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-extrabold uppercase tracking-wider text-soft">
                            Ambil
                          </label>
                          <input
                            type="date"
                            value={localStart}
                            onChange={(e) => setLocalStart(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-tealx"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-extrabold uppercase tracking-wider text-soft">
                            Kembali
                          </label>
                          <input
                            type="date"
                            value={localEnd}
                            min={localStart}
                            onChange={(e) => setLocalEnd(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-tealx"
                          />
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3">
                          <input
                            type="checkbox"
                            checked={withDriver}
                            onChange={(e) => setWithDriver(e.target.checked)}
                            className="h-4 w-4 accent-tealx"
                          />
                          <span className="text-sm font-semibold text-ink">
                            Tambah supir{" "}
                            <span className="text-soft">
                              (+{fmtIDR(DRIVER_PRICE)}/hari)
                            </span>
                          </span>
                        </label>
                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3">
                          <input
                            type="checkbox"
                            checked={delivery}
                            onChange={(e) => setDelivery(e.target.checked)}
                            className="h-4 w-4 accent-tealx"
                          />
                          <span className="text-sm font-semibold text-ink">
                            Antar-jemput dalam kota{" "}
                            <span className="text-soft">(+{fmtIDR(DELIVERY_PRICE)})</span>
                          </span>
                        </label>
                      </div>

                      <p className="mt-4 rounded-xl bg-tealx/10 px-4 py-3 text-sm font-semibold text-tealdark">
                        {days} hari × {unit.name} = {fmtIDR(days * unit.price)}
                        {!available && " — namun unit ini terbooking di tanggal tsb."}
                      </p>
                      {error && (
                        <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600">
                          {error}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="s2"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.3 }}
                      className="mt-7 space-y-4"
                    >
                      <div className="rounded-xl border border-line bg-paper px-4 py-3 text-sm">
                        <span className="text-soft">Memesan:</span>{" "}
                        <span className="font-extrabold text-ink">{unit.name}</span>{" "}
                        — <span className="font-semibold text-tealdark">{fmtRange(localStart, localEnd)}</span>
                      </div>
                      <div>
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-soft">
                          Nama lengkap
                        </label>
                        <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-line bg-paper px-4 focus-within:border-tealx">
                          <UserRound className="h-4 w-4 text-soft" />
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="cth. Dewi Kartika"
                            className="w-full bg-transparent py-3 text-sm font-semibold text-ink outline-none placeholder:font-normal placeholder:text-soft/60"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-soft">
                          Nomor WhatsApp
                        </label>
                        <input
                          value={wa}
                          onChange={(e) => setWa(e.target.value)}
                          placeholder="0812xxxxxxxx"
                          inputMode="tel"
                          className="mt-1.5 w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm font-semibold text-ink outline-none placeholder:font-normal placeholder:text-soft/60 focus:border-tealx"
                        />
                      </div>
                      {error && (
                        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600">
                          {error}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="s3"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.3 }}
                      className="mt-7"
                    >
                      <div className="overflow-hidden rounded-2xl border border-line">
                        <div className="bg-paper px-5 py-4">
                          <p className="text-lg font-extrabold text-ink">{unit.name}</p>
                          <p className="mt-0.5 text-xs font-semibold text-soft">
                            {unit.model} · {fmtRange(localStart, localEnd)} ({days} hari)
                          </p>
                        </div>
                        <div className="divide-y divide-line px-5 text-sm">
                          <div className="flex justify-between py-3">
                            <span className="text-soft">Sewa unit</span>
                            <span className="font-semibold text-ink">{fmtIDR(days * unit.price)}</span>
                          </div>
                          <div className="flex justify-between py-3">
                            <span className="text-soft">Supir</span>
                            <span className="font-semibold text-ink">
                              {withDriver ? fmtIDR(days * DRIVER_PRICE) : "—"}
                            </span>
                          </div>
                          <div className="flex justify-between py-3">
                            <span className="text-soft">Antar-jemput</span>
                            <span className="font-semibold text-ink">
                              {delivery ? fmtIDR(DELIVERY_PRICE) : "—"}
                            </span>
                          </div>
                          <div className="flex justify-between py-3">
                            <span className="text-soft">Penyewa</span>
                            <span className="text-right font-semibold text-ink">
                              <span className="block">{name}</span>
                              <span className="block text-xs font-normal text-soft">{wa}</span>
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-tealx/10 px-5 py-4">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-tealdark">
                              Total
                            </span>
                            <span className="text-xl font-extrabold text-tealdark">
                              {fmtIDR(total)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {error && (
                        <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600">
                          {error}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setError("");
                      setStep((s) => Math.max(1, s - 1));
                    }}
                    disabled={step === 1}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-bold text-soft transition hover:border-tealx hover:text-ink disabled:invisible"
                  >
                    <ArrowLeft className="h-4 w-4" /> Kembali
                  </button>
                  {step < 3 ? (
                    <button
                      onClick={next}
                      className="inline-flex items-center gap-1.5 rounded-full bg-tealx px-6 py-2.5 text-sm font-bold text-white transition hover:bg-tealdark"
                    >
                      Lanjut <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={submit}
                      className="inline-flex items-center gap-1.5 rounded-full bg-tealx px-6 py-2.5 text-sm font-bold text-white transition hover:bg-tealdark"
                    >
                      <Navigation className="h-4 w-4" /> Kirim Pengajuan
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
