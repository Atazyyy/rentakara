import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UnitCatalog from "./components/UnitCatalog";
import BookingSection from "./components/BookingSection";
import SchedulePanel from "./components/SchedulePanel";
import Footer from "./components/Footer";
import {
  addBooking,
  cycleStatus,
  loadBookings,
  resetBookings,
} from "./utils/bookings";
import { defaultDates } from "./data/rental";

export default function App() {
  const [dates, setDates] = useState(() => defaultDates());
  const [unitId, setUnitId] = useState(null);
  const [bookings, setBookings] = useState(() => loadBookings());

  const start = dates.start;
  const end = dates.end;

  const pickUnit = (id) => {
    setUnitId(id);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <Navbar />
      <main>
        <Hero onSearch={(s, e) => setDates({ start: s, end: e })} />
        <UnitCatalog
          start={start}
          end={end}
          bookings={bookings}
          onPick={pickUnit}
        />
        <BookingSection
          start={start}
          end={end}
          unitId={unitId}
          bookings={bookings}
          onBook={(b) => setBookings(addBooking(b))}
        />
        <SchedulePanel
          bookings={bookings}
          onCycle={(id) => setBookings(cycleStatus(id))}
          onReset={() => setBookings(resetBookings())}
        />
      </main>
      <Footer />
    </div>
  );
}
