import { Clock, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { WA_NUMBER } from "../data/rental";

const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Halo Rentakara! Saya mau tanya ketersediaan unit."
)}`;

export default function Footer() {
  return (
    <footer id="kontak" className="scroll-mt-20 border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-2xl font-extrabold tracking-tight text-ink">
              Renta<span className="text-tealx">kara</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-soft">
              Rental mobil di Bandung yang percaya penyewaan itu harus
              secelesai belanja online: cek tanggal, pesan, jalan.
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-soft">
              <ShieldCheck className="h-4 w-4 text-tealx" /> Unit asuransi lengkap
            </p>
          </div>

          <div>
            <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-tealdark">
              <MapPin className="h-4 w-4" /> Kantor
            </p>
            <p className="mt-3 text-sm leading-relaxed text-soft">
              Jl. Raya Lembang No. 12,
              <br />
              Bandung Barat, Jawa Barat 40391
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-soft">
              <Clock className="h-4 w-4 text-tealx" /> Setiap hari 06.00 – 22.00
            </p>
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-tealdark">
              Booking cepat
            </p>
            <p className="mt-3 text-sm leading-relaxed text-soft">
              Butuh unit hari ini? Chat admin — unit yang tersedia bisa jalan
              dalam 1 jam.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-tealx px-4 py-2 text-sm font-bold text-white transition hover:bg-tealdark"
            >
              <MessageCircle className="h-4 w-4" /> Chat Admin
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-soft sm:flex-row sm:items-center">
          <p>© 2026 Rentakara. Seluruh merek, unit, dan jadwal bersifat fiktif.</p>
          <p>
            Concept demo — dibuat oleh{" "}
            <a
              href="https://github.com/Atazyyy"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-ink hover:text-tealdark"
            >
              Agni Miftah Fauzi
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
