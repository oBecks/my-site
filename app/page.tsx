import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { buttonVariants } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { getFeaturedProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-6 pt-16 pb-20 sm:pt-24">
        <div className="animate-hero-in">
          <p className="text-sm text-muted-foreground">{siteConfig.name}</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight text-balance md:text-6xl">
            {siteConfig.role} building things that last.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            {siteConfig.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/projects" className={buttonVariants({ size: "lg" })}>
              View work
            </Link>
            <Link
              href={`mailto:${siteConfig.email}`}
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-xl font-medium tracking-tight">
            Selected work
          </h2>
          <Link
            href="/projects"
            className="group flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <Reveal key={project.slug} index={index}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-24">
        <div className="max-w-2xl border-t border-border/60 pt-10">
          <p className="text-lg leading-relaxed text-muted-foreground">
            I work across the stack, from database schema to the last pixel
            of the UI. Most recently focused on developer tooling and
            performance-sensitive frontends.
          </p>
        </div>
      </section>
    </>
  );
}
