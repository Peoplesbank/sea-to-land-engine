import peopleData from "@/data/people.json";
import placesData from "@/data/places.json";
import recordsData from "@/data/records.json";
import parcelsData from "@/data/parcels.json";
import routesData from "@/data/routes.json";
import sourcesData from "@/data/sources.json";
import registriesData from "@/data/registries.json";
import businessesData from "@/data/businesses.json";

const database = {
  people: peopleData as any[],
  places: placesData as any[],
  records: recordsData as any[],
  parcels: parcelsData as any[],
  routes: routesData as any[],
  sources: sourcesData as any[],
  registries: registriesData as any[],
  businesses: businessesData as any[],
};

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-cyan-400/30 bg-slate-900 p-8">
          <div className="text-sm font-bold uppercase tracking-widest text-amber-300">
            Sea-to-Land Engine Living Document
          </div>

          <h1 className="mt-4 text-4xl font-bold md:text-6xl">
            My History, My Facts, My Proof Trail
          </h1>

          <p className="mt-4 text-slate-300">
            This page turns the Sea-to-Land Engine into a readable living document.
            It summarizes the embedded archive: people, places, land records,
            routes, sources, registries, proof levels, and what still needs evidence.
          </p>
        </div>

        <Section title="What facts do I already have?">
          <p>
            The Engine currently contains {database.people.length} person record,
            {` ${database.places.length}`} places, {database.records.length} record group,
            {` ${database.parcels.length}`} land parcels, {database.routes.length} route,
            {` ${database.sources.length}`} source, and {database.registries.length} public registry links.
          </p>
        </Section>

        <Section title="What people are in my archive?">
          {database.people.map((person) => (
            <Card key={person.id}>
              <h3 className="text-xl font-bold">{person.name}</h3>
              <p className="mt-2 text-slate-300">{person.type}</p>
              <p className="mt-2 text-amber-300">Status: {person.status}</p>
            </Card>
          ))}
        </Section>

        <Section title="What land records do I have?">
          {database.parcels.map((parcel) => (
            <Card key={parcel.id}>
              <h3 className="text-xl font-bold">{parcel.legal}</h3>
              <p className="mt-2 text-slate-300">{parcel.type}</p>
              <p className="mt-2 text-amber-300">Status: {parcel.status}</p>
            </Card>
          ))}
        </Section>

        <Section title="What sources are already attached?">
          {database.sources.map((source) => (
            <Card key={source.id}>
              <h3 className="text-xl font-bold">{source.name}</h3>
              <p className="mt-2 text-slate-300">{source.type}</p>
              <p className="mt-2 text-amber-300">Status: {source.status}</p>
            </Card>
          ))}
        </Section>

        <Section title="What still needs evidence?">
          <ul className="space-y-3 text-slate-300">
            <li>• Original Saskatchewan land patent images.</li>
            <li>• Title chain / abstract for SE 27-06-01-3.</li>
            <li>• Title chain / abstract for SW 27-06-01-3.</li>
            <li>• Source citations for each person-place-parcel connection.</li>
            <li>• Verified links from family tradition into documented proof.</li>
          </ul>
        </Section>
      </section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold text-cyan-300">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-slate-950 p-5">
      {children}
    </div>
  );
}