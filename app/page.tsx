


import peopleData from "@/data/people.json";
import placesData from "@/data/places.json";
import recordsData from "@/data/records.json";
import parcelsData from "@/data/parcels.json";
import routesData from "@/data/routes.json";
import sourcesData from "@/data/sources.json";"use client";

const database = {
  people: peopleData,
  places: placesData,
  records: recordsData,
  parcels: parcelsData,
  routes: routesData,
  sources: sourcesData,
};

import React, { useState } from "react";
import { Search, Waves } from "lucide-react";

export default function Page() {
  const [query, setQuery] = useState("");

  return (
    <main className="min-h-screen bg-[#02131f] text-white flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-4xl">
        <div className="flex justify-center mb-6">
          <Waves className="w-16 h-16 text-cyan-300" />
        </div>

        <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-300 to-amber-200 bg-clip-text text-transparent">
          SEA TO LAND ENGINE
        </h1>

        <p className="text-xl text-slate-300 mb-3">
          A Search Engine for Memory, Humanity, Restoration, and Connection.
        </p>

        <p className="text-cyan-200 mb-10">
          WE ARE ONE — UNITY FOR ALL
        </p>

        <div className="flex gap-3 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-4 text-cyan-300 w-5 h-5" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search genealogy, archives, maps, records..."
              className="w-full rounded-2xl bg-black/30 border border-white/10 pl-12 pr-4 py-4 text-white outline-none"
            />
          </div>

          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(query)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="rounded-2xl bg-cyan-300 px-6 py-4 font-bold text-slate-950 hover:bg-cyan-200">
              SEARCH
            </button>
          </a>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/20 p-8">
          <script
            async
            src="https://cse.google.com/cse.js?cx=407c614cf7d9841f2"
          ></script>

          <div className="gcse-search"></div>
        </div>
      </div>
    </main>
  );
}