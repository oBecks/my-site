import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "A selection of projects I've built.",
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 pt-16 pb-24 sm:pt-20">
      <h1 className="text-3xl font-medium tracking-tight md:text-4xl">Work</h1>
      <p className="mt-3 max-w-lg text-muted-foreground">
        A selection of projects, from solo tools to production apps built with
        small teams.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.slug} index={index}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
