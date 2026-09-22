import { describe, expect, it } from "vitest";
import { buildInstructions } from "@/lib/assistant/instructions";
import { projects, type Project } from "@/lib/projects";
import { profile } from "@/lib/profile";
import { siteConfig } from "@/lib/site-config";

describe("buildInstructions", () => {
  const instructions = buildInstructions();

  it("includes every Project with a link to its page", () => {
    for (const project of projects) {
      expect(instructions).toContain(project.title);
      expect(instructions).toContain(`/projects/${project.slug}`);
    }
  });

  it("picks up a newly added Project without any other change", () => {
    const newProject: Project = {
      slug: "brand-new",
      title: "Brand New Thing",
      summary: "Freshly shipped.",
      description: ["It does a thing."],
      stack: ["Rust"],
      year: "2027",
      role: "Solo developer",
      links: {},
    };

    const withNewProject = buildInstructions({
      projects: [...projects, newProject],
      profile,
      site: siteConfig,
    });

    expect(withNewProject).toContain("Brand New Thing");
    expect(withNewProject).toContain("/projects/brand-new");
  });

  it("includes the Profile", () => {
    for (const job of profile.experience) {
      expect(instructions).toContain(job.company);
    }
    for (const entry of profile.education) {
      expect(instructions).toContain(entry.school);
    }
  });

  it("offers email and LinkedIn as the contact routes", () => {
    expect(instructions).toContain(siteConfig.email);
    expect(instructions).toContain(siteConfig.social.linkedin);
  });

  it("never contains a phone number", () => {
    expect(instructions).not.toMatch(/\+?\d[\d\s-]{8,}\d/);
  });
});
