import { prisma } from "@/lib/prisma";
import { savePageAction } from "@/lib/adminActions";

const PAGE_SLUGS = [
  { slug: "about", fallbackTitle: "About Navya Hospital" },
  { slug: "facilities", fallbackTitle: "Our Facilities" },
  { slug: "insurance-billing", fallbackTitle: "Insurance & Billing" },
];

export default async function AdminPagesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const pages = await prisma.page.findMany();
  const bySlug = new Map(pages.map((p) => [p.slug, p]));

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--ink)]">Pages</h1>
        <p className="mt-1 text-sm text-[var(--ink-soft)]">Edit the free-form text pages shown on the live site.</p>
        {saved && <p className="mt-3 rounded-md bg-[var(--good-bg)] px-3 py-2 text-sm text-[var(--good)]">Saved.</p>}
      </div>

      {PAGE_SLUGS.map(({ slug, fallbackTitle }) => {
        const page = bySlug.get(slug);
        return (
          <form key={slug} action={savePageAction} className="space-y-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6">
            <input type="hidden" name="slug" value={slug} />
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">/{slug}</p>

            <div>
              <label className="block text-sm font-medium text-[var(--ink)]">Title</label>
              <input
                name="title"
                defaultValue={page?.title ?? fallbackTitle}
                required
                className="mt-1 w-full rounded-md border border-[var(--line)] px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--ink)]">
                Content (leave a blank line between paragraphs)
              </label>
              <textarea
                name="body"
                defaultValue={page?.body ?? ""}
                rows={6}
                required
                className="mt-1 w-full rounded-md border border-[var(--line)] px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none"
              />
            </div>

            <button type="submit" className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
              Save
            </button>
          </form>
        );
      })}
    </div>
  );
}
