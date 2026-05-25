export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-purple-400/30 bg-slate-900 p-8 shadow-2xl">
          <div className="text-sm font-bold uppercase tracking-widest text-purple-300">
            Sea-to-Land Engine Admin
          </div>

          <h1 className="mt-4 text-4xl font-bold md:text-6xl">
            Add Records / Control Panel
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Use these templates to add new people, places, land parcels, sources,
            registry links, and friend business listings to the Engine. Copy the
            matching block into the correct JSON file inside the <b>data</b> folder.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/"
              className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-bold uppercase tracking-widest text-cyan-200 hover:bg-cyan-400/20"
            >
              Back to Engine
            </a>

            <a
              href="/history"
              className="rounded-xl border border-amber-400/40 bg-amber-400/10 px-5 py-3 text-sm font-bold uppercase tracking-widest text-amber-200 hover:bg-amber-400/20"
            >
              Open Living History
            </a>
          </div>
        </div>

        <TemplateSection
          title="Add a Person"
          file="data/people.json"
          code={`{
  "id": "new-person-id",
  "name": "Full Name",
  "type": "Ancestor / person / business contact / researcher",
  "places": ["place-id"],
  "records": ["record-id"],
  "status": "Evidence Target"
}`}
        />

        <TemplateSection
          title="Add a Place"
          file="data/places.json"
          code={`{
  "id": "new-place-id",
  "name": "Place Name",
  "type": "Town / province / port / land region",
  "status": "Active research location",
  "notes": "Short note about why this place matters."
}`}
        />

        <TemplateSection
          title="Add a Land Parcel"
          file="data/parcels.json"
          code={`{
  "id": "parcel-id",
  "legal": "Legal land description",
  "type": "Land parcel / title / patent / grant",
  "person": "person-id",
  "status": "Evidence Target"
}`}
        />

        <TemplateSection
          title="Add a Record"
          file="data/records.json"
          code={`{
  "id": "record-id",
  "title": "Record title",
  "type": "Land record / census / probate / church / military / newspaper",
  "people": ["person-id"],
  "places": ["place-id"],
  "parcels": ["parcel-id"],
  "status": "Needs original source image and citation"
}`}
        />

        <TemplateSection
          title="Add a Source"
          file="data/sources.json"
          code={`{
  "id": "source-id",
  "name": "Source name",
  "type": "Archive / document / website / government source",
  "repository": "Repository or website name",
  "url": "https://example.com",
  "status": "Needs Source"
}`}
        />

        <TemplateSection
          title="Add a Registry Link"
          file="data/registries.json"
          code={`{
  "id": "registry-id",
  "name": "Registry or archive name",
  "category": "Land Title Database / Archive / Genealogy / Government",
  "region": "Region",
  "type": "Official record source",
  "url": "https://example.com",
  "status": "Official Link Added",
  "use": "Explain what this link is used for."
}`}
        />

        <TemplateSection
          title="Add a Friend Business"
          file="data/businesses.json"
          code={`{
  "id": "business-id",
  "name": "Business Name",
  "owner": "Owner Name",
  "category": "Business category",
  "location": "City / online / region",
  "description": "Short business description.",
  "website": "https://example.com",
  "email": "",
  "phone": "",
  "status": "Friend Submitted",
  "offer": "Special offer, product, or service."
}`}
        />

        <section className="mt-10 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-6">
          <h2 className="text-2xl font-bold text-amber-200">
            Safe Update Workflow
          </h2>

          <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-slate-950 p-4 text-sm text-slate-200">
{`npm run build
git add .
git commit -m "Update Sea to Land Engine"
git push`}
          </pre>

          <p className="mt-4 text-slate-300">
            Always run the build first. If it says <b>Compiled successfully</b>,
            then commit and push. Vercel will redeploy automatically.
          </p>
        </section>
      </section>
    </main>
  );
}

function TemplateSection({
  title,
  file,
  code,
}: {
  title: string;
  file: string;
  code: string;
}) {
  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6">
      <div className="text-sm font-bold uppercase tracking-widest text-cyan-300">
        {file}
      </div>

      <h2 className="mt-2 text-2xl font-bold">{title}</h2>

      <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-slate-950 p-4 text-sm text-slate-200">
        {code}
      </pre>
    </section>
  );
}