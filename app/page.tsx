"use client";

import React, { useMemo, useState } from "react";
import peopleData from "@/data/people.json";
import placesData from "@/data/places.json";
import recordsData from "@/data/records.json";
import parcelsData from "@/data/parcels.json";
import routesData from "@/data/routes.json";
import sourcesData from "@/data/sources.json";
import registriesData from "@/data/registries.json"; 

import {
  Search,
  Database,
  Map,
  Users,
  FileText,
  Globe2,
  Link2,
  Route,
  Archive,
} from "lucide-react";

const database = {
  people: peopleData as any[],
  places: placesData as any[],
  records: recordsData as any[],
  parcels: parcelsData as any[],
  routes: routesData as any[],
  sources: sourcesData as any[],
  registries: registriesData as any[],
};

type SearchItem = any & {
  category: string;
};

function textOf(item: any) {
  return JSON.stringify(item).toLowerCase();
}

function titleOf(item: SearchItem) {
  return item.name || item.title || item.legal || item.id || "Untitled";
}

function statusOf(item: SearchItem) {
  return item.status || item.type || item.notes || "Sea-to-Land Engine data record";
}

function findById(list: any[], id: string) {
  return list.find((item) => item.id === id);
}

export default function Page() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SearchItem | null>(null);

 const allResults = useMemo(() => {
  const combined: SearchItem[] = [
    ...database.people.map((item) => ({ ...item, category: "Person" })),
    ...database.places.map((item) => ({ ...item, category: "Place" })),
    ...database.records.map((item) => ({ ...item, category: "Record" })),
    ...database.parcels.map((item) => ({ ...item, category: "Parcel" })),
    ...database.routes.map((item) => ({ ...item, category: "Route" })),
    ...database.sources.map((item) => ({ ...item, category: "Source" })),
    ...database.registries.map((item) => ({ ...item, category: "Registry" })),
  ];

  const q = query.toLowerCase().trim();

  if (!q) return combined;

  return combined.filter((item) => textOf(item).includes(q));
}, [query]);

  const activeItem = selected || allResults[0] || null;

  const proofTrail = useMemo(() => {
    if (!activeItem) {
      return {
        people: [],
        places: [],
        parcels: [],
        records: [],
        routes: [],
        sources: [],
        registries: database.registries,
      };
    }

    const people = new Set<any>();
    const places = new Set<any>();
    const parcels = new Set<any>();
    const records = new Set<any>();
    const routes = new Set<any>();
    const sources = new Set<any>();
    const registries = new Set<any>();

    if (activeItem.category === "Person") {
      people.add(activeItem);

      database.records.forEach((record) => {
        if ((record.people || []).includes(activeItem.id)) records.add(record);
      });

      database.parcels.forEach((parcel) => {
        if (parcel.person === activeItem.id) parcels.add(parcel);
      });
    }

    if (activeItem.category === "Place") {
      places.add(activeItem);

      database.records.forEach((record) => {
        if ((record.places || []).includes(activeItem.id)) records.add(record);
      });
    }

    if (activeItem.category === "Record") {
      records.add(activeItem);

      (activeItem.people || []).forEach((id: string) => {
        const item = findById(database.people, id);
        if (item) people.add(item);
      });

      (activeItem.places || []).forEach((id: string) => {
        const item = findById(database.places, id);
        if (item) places.add(item);
      });

      (activeItem.parcels || []).forEach((id: string) => {
        const item = findById(database.parcels, id);
        if (item) parcels.add(item);
      });
    }

    if (activeItem.category === "Parcel") {
      parcels.add(activeItem);

      const person = findById(database.people, activeItem.person);
      if (person) people.add(person);

      database.records.forEach((record) => {
        if ((record.parcels || []).includes(activeItem.id)) records.add(record);
      });
    }

    if (activeItem.category === "Route") {
      routes.add(activeItem);
      database.places.forEach((place) => {
        if ((activeItem.path || []).some((point: string) => place.name.includes(point) || point.includes(place.name))) {
          places.add(place);
        }
      });
    }

    if (activeItem.category === "Source") {
      sources.add(activeItem);
      database.records.forEach((record) => records.add(record));
    }

    Array.from(records).forEach((record: any) => {
      (record.people || []).forEach((id: string) => {
        const item = findById(database.people, id);
        if (item) people.add(item);
      });

      (record.places || []).forEach((id: string) => {
        const item = findById(database.places, id);
        if (item) places.add(item);
      });

      (record.parcels || []).forEach((id: string) => {
        const item = findById(database.parcels, id);
        if (item) parcels.add(item);
      });
    });

    return {
      people: Array.from(people),
      places: Array.from(places),
      parcels: Array.from(parcels),
      records: Array.from(records),
      routes: Array.from(routes),
      sources: Array.from(sources),
      registries: Array.from(registries),
    };
  }, [activeItem]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-3xl border border-cyan-400/30 bg-slate-900 p-8 shadow-2xl">
          <div className="flex items-center gap-3 text-cyan-300">
            <Globe2 className="h-8 w-8" />
            <span className="text-sm font-bold uppercase tracking-widest">
              Sea-to-Land Engine
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold md:text-6xl">
            A Search Engine for Memory
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Search people, places, land parcels, records, routes, sources,
            archives, genealogy, and restoration evidence.
          </p>

          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3">
            <Search className="h-5 w-5 text-cyan-300" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Myers, Saskatchewan, land grants, New Amsterdam..."
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Stat icon={<Users />} label="People" value={database.people.length} />
          <Stat icon={<Map />} label="Places" value={database.places.length} />
          <Stat icon={<FileText />} label="Records" value={database.records.length} />
          <Stat icon={<Database />} label="Parcels" value={database.parcels.length} />
          <Stat icon={<Route />} label="Routes" value={database.routes.length} />
          <Stat icon={<Archive />} label="Sources" value={database.sources.length} />
        </div>
	<Stat icon={<Archive />} label="Registries" value={database.registries.length} />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px]">
          <section>
            <h2 className="text-2xl font-bold">Search Results</h2>

            <div className="mt-5 grid gap-4">
              {allResults.map((item, index) => (
                <button
                  key={`${item.category}-${item.id || index}`}
                  onClick={() => setSelected(item)}
                  className={`rounded-2xl border p-5 text-left transition ${
                    activeItem?.id === item.id && activeItem?.category === item.category
                      ? "border-cyan-300 bg-cyan-400/10"
                      : "border-white/10 bg-slate-900 hover:border-cyan-400/50"
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                    {item.category}
                  </div>

                  <h3 className="mt-2 text-xl font-bold">{titleOf(item)}</h3>

                  <p className="mt-2 text-slate-300">{item.type || item.notes || statusOf(item)}</p>

                  {item.status && (
                    <p className="mt-3 text-sm text-amber-300">Status: {item.status}</p>
                  )}
                </button>
              ))}

              {allResults.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-slate-400">
                  No matching records yet.
                </div>
              )}
            </div>
          </section>

          <ProofTrail item={activeItem} trail={proofTrail} />
        </div>
      </section>
    </main>
  );
}

function ProofTrail({ item, trail }: { item: SearchItem | null; trail: any }) {
  if (!item) {
    return (
      <aside className="rounded-2xl border border-white/10 bg-slate-900 p-6">
        <h2 className="text-2xl font-bold">Proof Trail</h2>
        <p className="mt-3 text-slate-400">Select a result to see connected evidence.</p>
      </aside>
    );
  }

  return (
    <aside className="h-fit rounded-2xl border border-cyan-400/30 bg-slate-900 p-6">
      <div className="flex items-center gap-2 text-cyan-300">
        <Link2 className="h-5 w-5" />
        <span className="text-sm font-bold uppercase tracking-widest">Proof Trail</span>
      </div>

      <h2 className="mt-3 text-2xl font-bold">{titleOf(item)}</h2>
      <p className="mt-2 text-sm text-slate-300">{statusOf(item)}</p>

      {item.status && (
        <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-200">
          Proof Status: {item.status}
        </div>
      )}
       
      <section className="mt-10 rounded-2xl border border-cyan-400/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold text-cyan-300">
            Public Research Links
          </h2>

          <p className="mt-2 text-slate-300">
            These are outside research doors: registries, archives, libraries,
            land titles, newspapers, FamilySearch, WikiTree, and government
            records. They are separate from My Archive Only.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {database.registries.map((registry) => (
              <div
                key={registry.id}
                className="rounded-2xl border border-white/10 bg-slate-950 p-5"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                  {registry.category}
                </div>

                <h3 className="mt-2 text-lg font-bold">{registry.name}</h3>

                <p className="mt-2 text-sm text-slate-300">{registry.use}</p>

                <p className="mt-3 text-sm text-amber-300">
                  Status: {registry.status}
                </p>
              </div>
            ))}
          </div>
        </section>

      <TrailList title="Linked People" items={trail.people} />
      <TrailList title="Linked Places" items={trail.places} />
      <TrailList title="Linked Parcels" items={trail.parcels} />
      <TrailList title="Linked Records" items={trail.records} />
      <TrailList title="Linked Routes" items={trail.routes} />
      <TrailList title="Linked Sources" items={trail.sources} />
      <TrailList title="Linked Registries" items={trail.registries} />
    </aside>
  );
}

function TrailList({ title, items }: { title: string; items: any[] }) {
  return (
    <div className="mt-5 rounded-xl border border-white/10 bg-slate-950 p-4">
      <div className="font-semibold text-cyan-300">{title}</div>

      {items.length ? (
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          {items.map((item, index) => (
            <li key={item.id || index}>• {item.name || item.title || item.legal || item.id}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-slate-500">No links yet.</p>
      )}
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
      <div className="flex items-center gap-3 text-cyan-300">
        {icon}
        <span className="font-semibold">{label}</span>
      </div>
      <div className="mt-3 text-3xl font-bold">{value}</div>
    </div>
  );
}