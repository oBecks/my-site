export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  stack: string[];
  year: string;
  role: string;
  links: {
    live?: string;
    github?: string;
  };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "commit-pet",
    title: "Commit Pet",
    summary:
      "A GitHub App that grows a pixel pet from your commits, with an MCP server so coding agents can check on it too.",
    description: [
      "Commit Pet is a GitHub App that gives every repo its own pet. Install it, and each push feeds the pet, which grows from egg to hatchling to juvenile to adult as XP builds up, rendered as a live SVG badge you can drop straight into your README.",
      "Once a release ships, the pet switches into a deployed phase and starts reacting to open issues instead of commits. Built the whole pipeline solo: GitHub webhooks write to Postgres through Drizzle, Clerk handles GitHub OAuth for the dashboard, and an MCP server lets coding agents like Claude Code check and update a repo's pet directly from the terminal.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Clerk",
      "MCP",
      "Vercel",
    ],
    year: "2026",
    role: "Solo developer",
    links: {
      live: "https://commit-pet.vercel.app",
      github: "https://github.com/oBecks/commit-pet",
    },
    featured: true,
  },
  {
    slug: "quizip",
    title: "Quizip",
    summary:
      "A real-time multiplayer trivia party game for iOS and Android: host a room, share a code, and race the clock together with no sign-up.",
    description: [
      "Quizip is built around one mechanic: a host starts a room, friends join with a short code, and everyone answers the same multiple-choice question at once on their own phone. Each question runs on a 15-second timer, and answering faster scores more, from 1000 points down to a floor of 500.",
      "Built with Flutter for iOS and Android, backed entirely by Firebase: Cloud Firestore holds room and game state, and Anonymous Authentication gives each player an identity with no account required. The question bank pulls from the Open Trivia DB API and refreshes automatically every three days via a scheduled GitHub Action.",
    ],
    stack: [
      "Flutter",
      "Firebase",
      "Cloud Firestore",
      "Provider",
      "Open Trivia DB",
    ],
    year: "2026",
    role: "Solo developer",
    links: {},
    featured: true,
  },
  {
    slug: "my-site",
    title: "This Portfolio",
    summary:
      "A fast, minimal Next.js portfolio built to show real, shipped projects instead of placeholders.",
    description: [
      "The site you're looking at right now. Built with the Next.js App Router and styled with Tailwind CSS and shadcn/ui on top of Base UI primitives, aiming for something quick to load and easy to keep current.",
      "Scroll reveals run on Motion, theming (including the light/dark toggle) runs on next-themes, and the whole thing is typed end-to-end in TypeScript with ESLint, Prettier, and Vitest wired into a single check script.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Motion"],
    year: "2026",
    role: "Solo developer",
    links: {
      github: "https://github.com/oBecks/my-site",
    },
    featured: true,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}
