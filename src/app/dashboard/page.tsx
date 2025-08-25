import {currentUser} from "@clerk/nextjs/server";
import CockpitGauge from "../components/CockpitGuage";
import StatCard from "../components/StatCard";
import Odometer from "../components/Odomoeter";

// demo – podmień na dane z bazy
const fuelLogs = [
  {odo: 39239, liters: 4.64, date: "2024-09-01"},
  {odo: 39413, liters: 5.14, date: "2024-09-10"},
  {odo: 39600, liters: 4.9, date: "2024-09-18"},
];
const tankCapacity = 13; // CBR125R ~13 l (dopasuj)
const currentOdo = 40324; // ostatni odczyt przebiegu
const lastFillOdo = fuelLogs[fuelLogs.length - 1].odo;
const nextOdo = 0;
export default async function Dashboard() {
  const user = await currentUser();

  const avg = 2.2; // L/100 srednie spalanie {bede obliczał z tankowania}
  const consumedKm = currentOdo - lastFillOdo; // km zrobione od ostatniego tankowania

  const fuelPct = (() => {
    const usedL = (avg / 100) * consumedKm;
    const left = Math.max(0, tankCapacity - usedL);
    return (left / tankCapacity) * 100;
  })();

  const oilService = {name: "Wymiana oleju", dueKm: 40500}; // przykład
  const s ={};
  return (
    // <main className="p-8">
    //   <h2 className="text-xl font-semibold">Cześć, {user?.firstName ?? "Motocyklisto"}!</h2>
    //   {/* tu wstawisz: tankowania, nadchodzące serwisy, ulubione instrukcje */}
    // </main>

    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1000px 600px at 20% -10%, #1a1c22 0%, #0a0b0d 60%)",
        color: "#e5e7eb",
        padding: "24px",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1 style={{fontSize: 28, fontWeight: 800}}>Motorek — Kokpit</h1>
      </header>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          alignItems: "start",
        }}
      >
        {/* lewy zegar: paliwo */}

        <div
          style={{
            display: "grid",
            placeItems: "center",
            background: "#0b0c10",
            border: "1px solid #1b1d22",
            borderRadius: 16,
          }}
        >
          <CockpitGauge
            label="Paliwo"
            value={fuelPct}
            unit="%"
            dangerFrom={85}
          />
        </div>

        {/* środek: odometr + staty */}

        <div style={{display: "grid", gap: 16}}>
          <Odometer km={currentOdo} />
          <StatCard
            title="Ostatnie tankowanie"
            value={`${fuelLogs.at(-1)!.liters.toFixed(2)} l @ ${
              fuelLogs.at(-1)!.odo
            } km`}
            hint={new Date(fuelLogs.at(-1)!.date).toLocaleDateString()}
          />
          <StatCard
            title="Średnie spalanie"
            value={`${avg.toFixed(2)} l/100 km`}
            hint="liczone z 3 ostatnich tankowań"
          />
        </div>

        {/* prawy zegar: serwis / zasięg */}

        <div style={{display: "grid", gap: 16}}>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              background: "#0b0c10",
              border: "1px solid #1b1d22",
              borderRadius: 16,
            }}
          >
            <CockpitGauge
              label="Do tankowania (km)"
              value={Math.max(0, (nextOdo ?? currentOdo) - currentOdo)}
              max={300} // skala – dostosuj
            />
          </div>
          <StatCard
            title={oilService.name}
            value={s.due ? "WYKONAJ TERAZ" : `${s.kmLeft} km do serwisu`}
            hint={`Plan: ${oilService.dueKm.toLocaleString()} km`}
          />
        </div>
      </section>
    </main>
  );
}
