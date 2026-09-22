import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowSquareOut,
  GithubLogo,
} from "@phosphor-icons/react/dist/ssr";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/reveal";
import { ProjectCover } from "@/components/project-cover";
import { getProject, projects } from "@/lib/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-6 pt-12 pb-24 sm:pt-16">
      <Link
        href="/projects"
        className="group flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft
          size={14}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        All work
      </Link>

      <h1 className="mt-6 text-3xl font-medium tracking-tight md:text-4xl">
        {project.title}
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">{project.summary}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span>{project.year}</span>
        <span aria-hidden="true">·</span>
        <span>{project.role}</span>
      </div>

      {(project.links.live || project.links.github) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.live && (
            <Link
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants()}
            >
              Visit site
              <ArrowSquareOut size={16} />
            </Link>
          )}
          {project.links.github && (
            <Link
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              <GithubLogo size={16} />
              Source
            </Link>
          )}
        </div>
      )}

      <Reveal>
        <ProjectCover
          project={project}
          className="relative mt-10 aspect-[3/2] w-full rounded-xl"
        />
      </Reveal>

      <div className="mt-10 flex flex-col gap-4 text-base leading-relaxed text-foreground/90">
        {project.description.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <Separator className="mt-10" />

      <div className="mt-8">
        <h2 className="text-sm font-medium text-muted-foreground">Stack</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
