export const WA_NUMBER = "6281234567890";
export const DRIVER_PRICE = 150000; // supir per hari
export const DELIVERY_PRICE = 75000; // antar-jemput dalam kota

export const UNITS = [
  {
    id: "city-car",
    name: "City Car",
    model: "Hatchback 1.2 — 5 Penumpang",
    seats: 5,
    transmission: "Matic",
    price: 300000,
    cover:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop",
    desc: "Lincah menembus macet, gampang parkir, cocok untuk agenda harian.",
    tags: ["Matic", "Irit BBM", "Bluetooth"],
    booked: [{ start: "2026-11-05", end: "2026-11-07" }],
  },
  {
    id: "mpv-family",
    name: "Sedan Premium",
    model: "Coupe 2.0 — 4 Penumpang",
    seats: 4,
    transmission: "Matic",
    price: 550000,
    cover:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop",
    desc: "Gaya dan nyaman: untuk acara, perjalanan bisnis, atau weekend keluar kota.",
    tags: ["Kursi kulit", "Mode sport", "Kamera 360°"],
    booked: [
      { start: "2026-11-02", end: "2026-11-04" },
      { start: "2026-11-10", end: "2026-11-12" },
    ],
  },
  {
    id: "suv-trail",
    name: "SUV Petualang",
    model: "SUV 4×4 — 7 Penumpang",
    seats: 7,
    transmission: "Matic",
    price: 850000,
    cover:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
    desc: "Tangguh untuk Lembang, Ciwidey, sampai jalur camping keluar kota.",
    tags: ["4×4", "Ban serep penuh", "Roof rail"],
    booked: [],
  },
  {
    id: "sport-premium",
    name: "Sport Premium",
    model: "Sport Car 3.8 — 2 Penumpang",
    seats: 2,
    transmission: "Matic",
    price: 1500000,
    cover:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
    desc: "Untuk momen spesial: wisuda, prewedding, atau sekadar self-reward.",
    tags: ["Kelas atas", "Asuransi penuh", "Wajib KTP+SIM A"],
    booked: [{ start: "2026-11-15", end: "2026-11-17" }],
  },
  {
    id: "van-group",
    name: "Bus Rombongan",
    model: "Bus Wisata — 31 Penumpang",
    seats: 31,
    transmission: "Manual",
    price: 1500000,
    cover:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1200&auto=format&fit=crop",
    desc: "Untuk rombongan: acara kantor, perjalanan dinas, sampai wisata grup.",
    tags: ["Kapasitas 31", "Reclining seat", "Wajib + supir"],
    booked: [
      { start: "2026-11-01", end: "2026-11-08" },
      { start: "2026-11-21", end: "2026-11-23" },
    ],
  },
  {
    id: "jeep-tour",
    name: "Jeep Tour",
    model: "Jeep Off-road — 4 Penumpang",
    seats: 4,
    transmission: "Manual",
    price: 900000,
    cover:
      "https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?q=80&w=1200&auto=format&fit=crop",
    desc: "Paket open trip gunung & titik favorit: papandayan, tangkuban, bromo.",
    tags: ["Off-road", "Paket + sopir", "Fit lengkap"],
    booked: [{ start: "2026-11-28", end: "2026-11-29" }],
  },
];

export const STATUS_FLOW = ["Menunggu", "Dikonfirmasi", "Berjalan", "Selesai"];

export const fmtIDR = (n) => "Rp" + (n || 0).toLocaleString("id-ID");

export const unitById = (id) => UNITS.find((u) => u.id === id);

export const toISO = (d) => d.toISOString().slice(0, 10);

export const addDays = (iso, n) => {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + n);
  return toISO(d);
};

/* Tanggal default pencarian: 3 hari dari sekarang, durasi 3 hari */
export const defaultDates = () => {
  const s = new Date();
  s.setHours(0, 0, 0, 0);
  s.setDate(s.getDate() + 3);
  return { start: toISO(s), end: addDays(toISO(s), 2) };
};

export const daysBetween = (start, end) => {
  if (!start || !end) return 0;
  const a = new Date(start + "T00:00:00");
  const b = new Date(end + "T00:00:00");
  return Math.round((b - a) / 86400000) + 1;
};

export const fmtRange = (start, end) => {
  const opt = { day: "numeric", month: "short" };
  return `${new Date(start + "T00:00:00").toLocaleDateString("id-ID", opt)} – ${new Date(
    end + "T00:00:00"
  ).toLocaleDateString("id-ID", opt)}`;
};

/* Cek apakah rentang [start, end] tabrakan dengan booking yang sudah ada */
export const rangesOverlap = (aStart, aEnd, bStart, bEnd) =>
  aStart <= bEnd && bStart <= aEnd;

export const unitAvailability = (unit, start, end, bookings = []) => {
  const all = [
    ...unit.booked,
    ...bookings
      .filter((b) => b.unitId === unit.id && b.status !== "Selesai")
      .map((b) => ({ start: b.start, end: b.end })),
  ];
  return !all.some((r) => rangesOverlap(start, end, r.start, r.end));
};
