"use client";

import React, { useMemo, useState } from "react";
import peopleData from "@/data/people.json";
import placesData from "@/data/places.json";
import recordsData from "@/data/records.json";
import parcelsData from "@/data/parcels.json";
import routesData from "@/data/routes.json";
import sourcesData from "@/data/sources.json";
import registriesData from "@/data/registries.json";
import businessesData from "@/data/businesses.json";

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
  businesses: businessesData as any[],
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
  const [mode, setMode] = useState<"archive" | "public" | "restore" | "market">("archive");

const allResults = useMemo(() => {
  const archiveResults: SearchItem[] = [
    ...database.people.map((item) => ({ ...item, category: "Person" })),
    ...database.places.map((item) => ({ ...item, category: "Place" })),
    ...database.records.map((item) => ({ ...item, category: "Record" })),
    ...database.parcels.map((item) => ({ ...item, category: "Parcel" })),
    ...database.routes.map((item) => ({ ...item, category: "Route" })),
    ...database.sources.map((item) => ({ ...item, category: "Source" })),
  ];

  const publicResults: SearchItem[] = [
    ...database.registries.map((item) => ({ ...item, category: "Registry" })),
  ];

  const restoreResults: SearchItem[] = [
    ...database.parcels.map((item) => ({ ...item, category: "Parcel" })),
    ...database.routes.map((item) => ({ ...item, category: "Route" })),
    ...database.records
      .filter((item) => JSON.stringify(item).toLowerCase().includes("land"))
      .map((item) => ({ ...item, category: "Record" })),
    ...database.sources.map((item) => ({ ...item, category: "Source" })),
  ];

  const marketResults: SearchItem[] = [
    ...database.businesses.map((item) => ({ ...item, category: "Business" })),
  ];

  const combined =
    mode === "archive"
      ? archiveResults
      : mode === "public"
      ? publicResults
      : mode === "restore"
      ? restoreResults
      : marketResults;

  const q = query.toLowerCase().trim();

  if (!q) return combined;

  return combined.filter((item) => textOf(item).includes(q));
}, [query, mode]);

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
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
  <div className="pointer-events-none fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-cyan-950 to-emerald-950" />

    <div className="absolute left-1/2 top-[-120px] h-[620px] w-[1000px] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl" />

    <div className="absolute bottom-[-120px] right-[-120px] h-[520px] w-[720px] rounded-full bg-amber-400/15 blur-3xl" />

    <div className="absolute bottom-[-80px] left-[-80px] h-[420px] w-[620px] rounded-full bg-emerald-400/12 blur-3xl" />

    <div
      className="absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.20) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.20) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    />

    <svg
      className="absolute inset-0 h-full w-full opacity-30"
      viewBox="0 0 1200 900"
      preserveAspectRatio="none"
    >
      <path
        d="M0 300 C 180 220, 260 390, 440 310 S 760 210, 960 330 S 1130 420, 1200 330"
        fill="none"
        stroke="rgba(34,211,238,0.35)"
        strokeWidth="3"
        strokeDasharray="12 14"
      />
      <path
        d="M0 520 C 220 430, 360 610, 560 520 S 850 420, 1200 560"
        fill="none"
        stroke="rgba(251,191,36,0.28)"
        strokeWidth="2"
        strokeDasharray="8 18"
      />
      <path
        d="M100 760 C 300 660, 520 780, 720 700 S 980 620, 1160 740"
        fill="none"
        stroke="rgba(52,211,153,0.24)"
        strokeWidth="2"
        strokeDasharray="10 16"
      />
    </svg>

    <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
  </div>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-3xl border border-cyan-400/30 bg-slate-900 p-8 shadow-2xl">
          <div className="flex items-center gap-3 text-cyan-300">
            <Globe2 className="h-8 w-8" />
            <span className="text-sm font-bold uppercase tracking-widest">
              Sea-to-Land Engine
            </span>
          </div>

          <div className="mt-5 inline-flex rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-amber-200">
  Sea King Engine • King of Water • Restoration Archive
</div>

<h1 className="mt-5 text-4xl font-bold md:text-6xl">
  The Sea Remembers. The Land Records. The Engine Restores.
</h1>

<p className="mt-4 max-w-3xl text-slate-300">
  A Sea-to-Land historical research engine for memory, genealogy, land titles,
  migration routes, proof trails, public registries, and restoring the land back
  through truth, records, and living history.
</p>

<p className="mt-4 max-w-3xl text-lg font-semibold text-amber-200">
  From the King of Water to the memory of the land — restoring what was lost,
  proving what remains, and building the archive for future generations.
</p>

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

        <div className="mt-8 grid gap-4 md:grid-cols-4">
  <button
    onClick={() => setMode("archive")}
    className={`rounded-2xl border p-5 text-left transition ${
      mode === "archive"
        ? "border-cyan-300 bg-cyan-400/20"
        : "border-cyan-400/30 bg-cyan-400/10 hover:bg-cyan-400/15"
    }`}
  >
    <div className="text-sm font-bold uppercase tracking-widest text-cyan-300">
      My Archive Only
    </div>
    <h3 className="mt-2 text-xl font-bold">Embedded Facts</h3>
    <p className="mt-2 text-sm text-slate-300">
      People, places, records, parcels, routes, sources, and proof status already inside your Engine.
    </p>
  </button>

  <button
    onClick={() => setMode("public")}
    className={`rounded-2xl border p-5 text-left transition ${
      mode === "public"
        ? "border-amber-300 bg-amber-400/20"
        : "border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/15"
    }`}
  >
    <div className="text-sm font-bold uppercase tracking-widest text-amber-300">
      Public Research Waters
    </div>
    <h3 className="mt-2 text-xl font-bold">Outside Registries</h3>
    <p className="mt-2 text-sm text-slate-300">
      Land titles, government records, archives, newspapers, FamilySearch, WikiTree, and official research doors.
    </p>
  </button>

  <button
    onClick={() => setMode("restore")}
    className={`rounded-2xl border p-5 text-left transition ${
      mode === "restore"
        ? "border-emerald-300 bg-emerald-400/20"
        : "border-emerald-400/30 bg-emerald-400/10 hover:bg-emerald-400/15"
    }`}
  >
    <div className="text-sm font-bold uppercase tracking-widest text-emerald-300">
      Restore the Land
    </div>
    <h3 className="mt-2 text-xl font-bold">Proof to Restoration</h3>
    <p className="mt-2 text-sm text-slate-300">
      Connect memory, land parcels, migration routes, and sources into a living restoration archive.
    </p>
  </button>

  <button
    onClick={() => setMode("market")}
    className={`rounded-2xl border p-5 text-left transition ${
      mode === "market"
        ? "border-purple-300 bg-purple-400/20"
        : "border-purple-400/30 bg-purple-400/10 hover:bg-purple-400/15"
    }`}
  >
    <div className="text-sm font-bold uppercase tracking-widest text-purple-300">
      Community Market
    </div>
    <h3 className="mt-2 text-xl font-bold">Friends Directory</h3>
    <p className="mt-2 text-sm text-slate-300">
      Friend-submitted businesses, services, sales links, partners, and project supporters.
    </p>
  </button>
</div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Stat icon={<Users />} label="People" value={database.people.length} />
          <Stat icon={<Map />} label="Places" value={database.places.length} />
          <Stat icon={<FileText />} label="Records" value={database.records.length} />
          <Stat icon={<Database />} label="Parcels" value={database.parcels.length} />
          <Stat icon={<Route />} label="Routes" value={database.routes.length} />
          <Stat icon={<Archive />} label="Sources" value={database.sources.length} />
          <Stat icon={<Archive />} label="Registries" value={database.registries.length} />
          <Stat icon={<Users />} label="Businesses" value={database.businesses.length} />
</div>

<section className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-6">
  <h2 className="text-2xl font-bold text-amber-200">
    Proof Level Legend
  </h2>

  <p className="mt-2 text-sm text-slate-300">
    These badges separate embedded facts, source targets, public leads, family tradition,
    and story layers so the Engine keeps truth, research, and restoration clearly marked.
  </p>

  <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
    <ProofBadge
      label="Evidence Target"
      text="Known item in the Engine that still needs original records, images, or citations."
    />
    <ProofBadge
      label="Needs Source"
      text="A lead or claim that should not be treated as proven until a source is attached."
    />
    <ProofBadge
      label="Official Link Added"
      text="A registry, archive, or public research doorway has been connected."
    />
    <ProofBadge
      label="Likely"
      text="A probable connection supported by clues, but not yet fully proven."
    />
    <ProofBadge
      label="Proven"
      text="A source-backed fact with clear evidence attached."
    />
    <ProofBadge
      label="Family Tradition"
      text="A passed-down story or family memory, preserved but marked separately from proof."
    />
    <ProofBadge
      label="Story Layer"
      text="Creative, symbolic, royal, or fictional presentation layer, not a factual proof claim."
    />
  </div>
</section>

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

<p className="mt-2 text-slate-300">
  {item.type || item.notes || statusOf(item)}
</p>

{item.status && (
  <span className="mt-3 inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200">
    {item.status}
  </span>
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
  <div className="mt-4 rounded-xl border border-amber-400/40 bg-amber-400/10 p-3 text-sm font-bold text-amber-200">
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

  {registry.url && (
    <a
      href={registry.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-block rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-200 hover:bg-cyan-400/20"
    >
      Open Registry
    </a>
  )}
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
            <li key={item.id || index}>
              • {item.name || item.title || item.legal || item.id}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-slate-500">No links yet.</p>
      )}
    </div>
  );
}

function ProofBadge({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950 p-4">
      <span className="inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200">
        {label}
      </span>
      <p className="mt-3 text-sm text-slate-300">{text}</p>
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