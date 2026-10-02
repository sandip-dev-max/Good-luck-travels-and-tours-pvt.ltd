import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { posts } from '@/data/site';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();

  const related = posts.filter((x) => x.slug !== p.slug).slice(0, 2);

  return (
    <main>
      <section className="relative min-h-[530px] overflow-hidden pt-24">
        <Image src={p.image} alt={p.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent" />
        <div className="relative mx-auto flex min-h-[530px] max-w-[1100px] items-end px-5 pb-14 sm:px-8">
          <div className="max-w-3xl text-white">
            <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white">
              <ArrowLeft size={13} /> Back to journal
            </Link>
            <div className="mt-6 text-xs font-semibold text-mist">{p.category} · {p.read} · {p.date}</div>
            <h1 className="mt-4 text-5xl font-semibold leading-[.92] tracking-[-.06em] sm:text-7xl">{p.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72">{p.excerpt}</p>
          </div>
        </div>
      </section>

      <article className="container-luxury py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-muted">
          <p className="text-lg font-semibold leading-8 text-ink-2">
            A memorable holiday is never only about the destination. It is about the rhythm of the trip: when you travel, how you move between places, and the kind of moments you want to bring home.
          </p>
          <p className="mt-7 text-sm leading-7">
            At Good Luck Travel, we believe the best journeys are planned with clarity, not chaos. Whether you are chasing mountain views, cultural heritage, or a relaxed family holiday, the smart route is to match your travel style with the right pace and local expertise. That is where the difference between a rushed trip and a truly rewarding one starts.
          </p>

          <h2 className="mt-10 text-3xl font-semibold text-navy">Start with the experience you want</h2>
          <p className="mt-4 text-sm leading-7">
            Before choosing flights or hotel names, ask what kind of trip you actually want. A romantic escape will feel different from a cultural expedition, and a family vacation requires different planning than a short adrenaline-filled getaway. The strongest itineraries usually begin with a simple question: what do we want to feel when we are there?
          </p>
          <p className="mt-4 text-sm leading-7">
            Once that answer is clear, the destination choices become easier. You may want a slower rhythm with fewer transfers, more evenings in one place, and enough flexibility to enjoy local food, hidden viewpoints, and spontaneous moments. Or you may prefer a packed itinerary filled with iconic landmarks, guided experiences, and efficient travel between cities.
          </p>

          <h2 className="mt-10 text-3xl font-semibold text-navy">Choose the right season and timing</h2>
          <p className="mt-4 text-sm leading-7">
            Timing often shapes the mood of a trip more than travellers expect. The same place can feel completely different in dry season, shoulder season, or festival week. Weather, crowds, and local events all influence comfort, pricing, and the pace of sightseeing.
          </p>
          <p className="mt-4 text-sm leading-7">
            That is why our team reviews the best travel windows with practical insight. We help clients plan around ideal conditions, lower travel costs, and a schedule that leaves space for rest instead of constant movement. A good trip should feel balanced from the first flight to the final night.
          </p>

          <h2 className="mt-10 text-3xl font-semibold text-navy">Build the journey around ease</h2>
          <p className="mt-4 text-sm leading-7">
            Once the travel style is clear, the next step is to shape the logistics around it. Flights, transit, hotel locations, visa guidance, and day plans should support the experience rather than compete with it. Well-planned travel is not about stuffing in as much as possible; it is about removing friction and creating smoother, more enjoyable days.
          </p>
          <p className="mt-4 text-sm leading-7">
            This is where local support matters. From airport transfers to hidden cultural gems, a knowledgeable travel partner helps you avoid common timing mistakes and missed opportunities. We map out practical details so you can focus on the adventure instead of the admin.
          </p>

          <h2 className="mt-10 text-3xl font-semibold text-navy">A confident plan makes every moment better</h2>
          <p className="mt-4 text-sm leading-7">
            The most successful holidays are not just beautiful on paper. They are easy to enjoy, well-paced, and built around what matters most to the traveller. With thoughtful planning, even a short getaway can feel immersive and deeply personal.
          </p>
          <p className="mt-4 text-sm leading-7">
            At Good Luck Travel, we help you turn inspiration into a practical plan that feels effortless from start to finish. Whether you are travelling for leisure, family time, or a once-in-a-lifetime adventure, we are here to build a journey that feels intentional, comfortable, and memorable.
          </p>
        </div>
      </article>

      <section className="soft-blue py-16">
        <div className="container-luxury">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-semibold text-navy">Keep exploring.</h2>
            <Link href="/blog" className="text-xs font-semibold text-sea">
              All stories →
            </Link>
          </div>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {related.map((x) => (
              <Link key={x.slug} href={`/blog/${x.slug}`} className="group relative min-h-[250px] overflow-hidden rounded-[20px]">
                <Image src={x.image} alt={x.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white">
                  <div className="text-[11px] font-bold text-white/60">{x.category}</div>
                  <div className="mt-2 text-xl font-semibold">{x.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
