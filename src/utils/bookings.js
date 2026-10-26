const KEY = "rtk-bookings-v1";
const STATUS_FLOW = ["Menunggu", "Dikonfirmasi", "Berjalan", "Selesai"];

const NAMES = [
  "Dewi Kartika",
  "Rangga Mahendra",
  "Putri Lestari",
  "Hendra Saputra",
  "Maya Puspita",
  "Fikri Ramadhan",
  "Laras Wulandari",
  "Bayu Firmansyah",
];

function makeCode() {
  return "RTK-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}

function seedBookings() {
  const seeds = [
    ["city-car", -1, 1, "Dikonfirmasi"],
    ["mpv-family", 0, 2, "Berjalan"],
    ["van-group", 3, 5, "Menunggu"],
    ["mpv-premium", 6, 8, "Dikonfirmasi"],
    ["suv-trail", 9, 11, "Menunggu"],
    ["sedan-executive", -3, -1, "Selesai"],
    ["city-car", -5, -4, "Selesai"],
    ["mpv-family", 14, 16, "Menunggu"],
  ];
  const now = Date.now();
  return seeds.map(([unitId, offsetStart, offsetEnd, status], i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + offsetStart);
    const start = d.toISOString().slice(0, 10);
    const d2 = new Date(d);
    d2.setDate(d.getDate() + (offsetEnd - offsetStart));
    const end = d2.toISOString().slice(0, 10);
    return {
      id: "seed-" + i,
      code: makeCode(),
      unitId,
      start,
      end,
      withDriver: unitId === "van-group" || unitId === "sedan-executive",
      delivery: i % 3 === 0,
      name: NAMES[i % NAMES.length],
      wa: "0812" + String(10000000 + Math.floor(Math.random() * 89999999)),
      total: 0,
      status,
      createdAt: now - i * 86400000,
    };
  });
}

export function loadBookings() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* abaikan */
  }
  const seeded = seedBookings();
  saveBookings(seeded);
  return seeded;
}

export function saveBookings(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* abaikan */
  }
}

export function addBooking(booking) {
  const next = [booking, ...loadBookings()];
  saveBookings(next);
  return next;
}

export function cycleStatus(id) {
  return loadBookings().map((b) => {
    if (b.id !== id) return b;
    const idx = STATUS_FLOW.indexOf(b.status);
    return { ...b, status: STATUS_FLOW[(idx + 1) % STATUS_FLOW.length] };
  });
}

export function resetBookings() {
  const seeded = seedBookings();
  saveBookings(seeded);
  return seeded;
}

export function buildBooking({ unitId, start, end, withDriver, delivery, name, wa }) {
  return {
    id: "ord-" + Date.now(),
    code: makeCode(),
    unitId,
    start,
    end,
    withDriver,
    delivery,
    name,
    wa,
    total: 0, // dihitung pemanggil
    status: "Menunggu",
    createdAt: Date.now(),
  };
}
