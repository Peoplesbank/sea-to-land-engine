"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Globe,
  Database,
  Waves,
  Mountain,
  Shield,
  Map,
  ScrollText,
  Users,
  Landmark,
} from "lucide-react";

function Button({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`rounded-2xl px-5 py-3 font-semibold transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
}

function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

const layers = [
  {
    title: "Genealogy",
    icon: Users,
    items: [
      "Family Trees",
      "Migration Paths",
      "DNA Clusters",
      "Clan Archives",
    ],
  },
  {
    title: "Archives",
    icon: ScrollText,
    items: [
      "Parish Records",
      "Church Archives",
      "Government Records",
      "Historical Manuscripts",
    ],
  },
  {
    title: "Maps",
    icon: Map,
    items: [
      "Land Titles",
      "Parcel Maps",
      "Historical Overlays",
      "Earth & Sea Layers",
    ],
  },
  {
    title: "Government",
    icon: Landmark,
    items: [
      "Court Dockets",
      "Civil Records",
      "Public Operations",
      "Live Data Feeds",
    ],
  },
];

function Subject({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: string[];
  icon: any;
}) {
  return (
    <Card className="hover:scale-[1.02] transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Icon className="text-cyan-300 w-7 h-7" />
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>

        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-xl bg-white/5 px-4 py-3 text-slate-200 border border-white/5"
            >
              {item}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function SeaToLandSearchEngine() {
  const [query, setQuery] = useState("");

  const filteredLayers = useMemo(() => {
    if (!query) return layers;

    return layers.filter((layer) => {
      return (
        layer.title.toLowerCase().includes(query.toLowerCase()) ||
        layer.items.some((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        )
      );
    });
  }, [query]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#02131f] text-white relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/60 via-slate-950/80 to-black" />

      <div className="relative z-10 px-6 py-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-5">
            <div className="rounded-full bg-cyan-400/10 p-6 border border-cyan-300/20 shadow-2xl">
              <Waves className="w-16 h-16 text-cyan-300" />
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-cyan-300 to-amber-200 bg-clip-text text-transparent">
            SEA TO LAND ENGINE
          </h1>

          <p className="mt-6 text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            A Search Engine for Memory, Humanity, Restoration, and Connection.
          </p>

          <p className="mt-4 text-cyan-200 text-lg tracking-wide">
            “WE ARE ONE — UNITY FOR ALL”
          </p>

          <p className="mt-2 text-amber-200 italic">
            “To Restore The Future, We Must Remember The Past.”
          </p>
        </div>

        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-4 text-cyan-200 w-5 h-5" />

                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search archives, genealogy, maps, government records, migration routes..."
                  className="w-full rounded-2xl bg-black/30 border border-white/10 pl-12 pr-4 py-4 text-white placeholder:text-slate-400 outline-none focus:border-cyan-300"
                />
              </div>

              <Button className="bg-cyan-300 text-slate-950 hover:bg-cyan-200">
                SEARCH
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredLayers.map((layer) => (
            <Subject
              key={layer.title}
              title={layer.title}
              items={layer.items}
              icon={layer.icon}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-14">
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="mx-auto mb-4 text-cyan-300 w-10 h-10" />
              <h3 className="font-bold text-xl mb-2">Global Search</h3>
              <p className="text-slate-300 text-sm">
                Unified search across archives, maps, genealogy, and history.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Database className="mx-auto mb-4 text-cyan-300 w-10 h-10" />
              <h3 className="font-bold text-xl mb-2">Memory Engine</h3>
              <p className="text-slate-300 text-sm">
                Connect families, migrations, land, and historical records.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Mountain className="mx-auto mb-4 text-cyan-300 w-10 h-10" />
              <h3 className="font-bold text-xl mb-2">Sea To Land</h3>
              <p className="text-slate-300 text-sm">
                Restoration philosophy connecting humanity and Earth.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="mx-auto mb-4 text-cyan-300 w-10 h-10" />
              <h3 className="font-bold text-xl mb-2">Protected System</h3>
              <p className="text-slate-300 text-sm">
                Future-ready architecture with AI reasoning and archive layers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}