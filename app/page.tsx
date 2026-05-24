"use client";

import React, { useMemo, useState } from "react";
import peopleData from "@/data/people.json";
import placesData from "@/data/places.json";
import recordsData from "@/data/records.json";
import parcelsData from "@/data/parcels.json";
import routesData from "@/data/routes.json";
import sourcesData from "@/data/sources.json";
import { Search, Database, Map, Users, FileText, Globe2 } from "lucide-react";

const database = {
  people: peopleData,
  places: placesData,
  records: recordsData,
  parcels: parcelsData,
  routes: routesData,
  sources: sourcesData,
};

export default function Page() {
  const [query, setQuery] = useState("");

  const people = database.people as any[];
  const places = database.places as any[];
  const records = database.records as any[];
  const parcels = database.parcels as any[];
  const routes = database.routes as any[];
  const sources = database.sources as any[];

  const allResults = useMemo(() => {
    const combined = [
      ...people.map((item) => ({ ...item, category: "Person" })),
      ...places.map((item) => ({ ...item, category: "Place" })),
      ...records.map((item) => ({ ...item, category: "Record" })),
      ...parcels.map((item) => ({ ...item, category: "Parcel" })),
      ...routes.map((item) => ({ ...item, category: "Route" })),
      ...sources.map((item) => ({ ...item, category: "Source" })),
    ];

    const q = query.toLowerCase().trim();

    if (!q) return combined;

    return combined.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(q)
    );
  }, [query, people, places, records, parcels, routes, sources]);

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
          <Stat icon={<Users />} label="People" value={people.length} />
          <Stat icon={<Map />} label="Places" value={places.length} />
          <Stat icon={<FileText />} label="Records" value={records.length} />
          <Stat icon={<Database />} label="Parcels" value={parcels.length} />
          <Stat icon={<Globe2 />} label="Routes" value={routes.length} />
          <Stat icon={<Search />} label="Sources" value={sources.length} />
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Search Results</h2>

          <div className="mt-5 grid gap-4">
            {allResults.map((item, index) => (
              <div
                key={`${item.category}-${item.id || index}`}
                className="rounded-2xl border border-white/10 bg-slate-900 p-5"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                  {item.category}
                </div>

                <h3 className="mt-2 text-xl font-bold">
                  {item.name || item.title || item.legal || item.id || "Untitled"}
                </h3>

                <p className="mt-2 text-slate-300">
                  {item.type || item.status || item.notes || "Sea-to-Land Engine data record"}
                </p>

                {item.status && (
                  <p className="mt-3 text-sm text-amber-300">
                    Status: {item.status}
                  </p>
                )}
              </div>
            ))}

            {allResults.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-slate-400">
                No matching records yet.
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
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