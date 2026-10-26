import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarRange,
  Clock,
  MapPin,
  Star,
} from "lucide-react";
import Reveal from "./Reveal";
import { addDays, toISO } from "../data/rental";

function defaultStart() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3);
  return toISO(d);
}

export default function Hero({ onSearch }) {
  const [start, setStart] = useState(defaultStart);
  const [end, setEnd] = useState(() => addDays(defaultStart(), 2));

  const submit = (e) => {
    e.preventDefault();
    onSearch(start, end);
    document.getElementById("unit")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-12 md:px-8 md:pt-16 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs font-bold text-tealdark"
          >
            <BadgeCheck className="h-3.5 w-3.5" />
            Rental Mobil Bandung · Booking Online
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl"
          >
            Sewa kendaraan,{" "}
            <span className="text-tealx">tanpa drama</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-soft"
          >
            Cek ketersediaan tanggal langsung di web, hitung biayanya, dan
            ajukan sewa dalam hitungan menit. Unit terawat, supir berpengalaman,
            tanpa biaya tersembunyi.
          </motion.p>

          {/* form cek ketersediaan */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            onSubmit={submit}
            className="mt-7 rounded-2xl border border-line bg-card p-4 shadow-sm"
          >
            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-wider text-soft">
                  Tanggal ambil
                </span>
                <input
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-tealx"
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-wider text-soft">
                  Tanggal kembali
                </span>
                <input
                  type="date"
                  value={end}
                  min={start}
                  onChange={(e) => setEnd(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-tealx"
                />
              </label>
              <button
                type="submit"
                className="self-end rounded-xl bg-tealx px-5 py-2.5 text-sm font-bold text-white transition hover:bg-tealdark"
              >
                Cari Unit
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-soft"
          >
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-sand text-sand" /> 4,9/5 dari 380+
              penyewa
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-tealx" /> Buka 06.00 – 22.00
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-tealx" /> Antar-jemput se-Bandung
            </span>
          </motion.div>
        </div>

        {/* kanan: foto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl border border-line shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop"
              alt="Kendaraan Rentakara"
              className="h-72 w-full object-cover sm:h-96"
            />
          </div>
          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 shadow-lg">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tealx/10 text-tealdark">
              <CalendarRange className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-extrabold text-ink">24 unit siap jalan</p>
              <p className="text-xs text-soft">perawatan tiap 5.000 km</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
