import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl ring-1 ring-border transition-[transform,box-shadow] duration-200 ease-[var(--ease-out-strong)] hover:ring-foreground/30 active:scale-[0.98]"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-base font-medium tracking-tight">
            {project.title}
          </h3>
          <ArrowUpRight
            size={18}
            className="mt-0.5 shrink-0 text-muted-foreground transition-transform duration-200 ease-[var(--ease-in-out-strong)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
          />
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-3 text-xs text-muted-foreground">
          {project.stack.slice(0, 3).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
