export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  stack: string[];
  year: string;
  role: string;
  image: string;
  links: {
    live?: string;
    github?: string;
  };
  featured?: boolean;
};

// TODO: replace with your real projects. Swap `image` for an actual
// screenshot or og-image of each project once you have one.
export const projects: Project[] = [
  {
    slug: "flow-metrics",
    title: "Flow Metrics",
    summary: "A dashboard that turns raw event logs into team-level delivery metrics.",
    description: [
      "Flow Metrics ingests deploy and PR events from GitHub and CI, then computes lead time, deploy frequency, and change failure rate per team.",
      "Built the ingestion pipeline, the aggregation layer, and the dashboard UI. Handles a few million events a day without falling behind.",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "tRPC"],
    year: "2025",
    role: "Solo developer",
    image: "https://picsum.photos/seed/flow-metrics-project/1200/800",
    links: {
      live: "https://example.com",
      github: "https://github.com/example/flow-metrics",
    },
    featured: true,
  },
  {
    slug: "reef",
    title: "Reef",
    summary: "A lightweight component library for internal tools, shared across four product teams.",
    description: [
      "Reef started as a way to stop four teams from rebuilding the same dropdown. It's a themeable component set on top of Radix primitives.",
      "Shipped with a Storybook instance, visual regression tests, and a migration guide that got the whole org off the old library in six weeks.",
    ],
    stack: ["React", "Radix UI", "Storybook", "Vitest"],
    year: "2024",
    role: "Lead developer",
    image: "https://picsum.photos/seed/reef-project/1200/800",
    links: {
      github: "https://github.com/example/reef",
    },
    featured: true,
  },
  {
    slug: "tidepool",
    title: "Tidepool",
    summary: "A CLI that snapshots and diffs local database state for faster debugging.",
    description: [
      "Tidepool grew out of debugging a flaky staging environment: it snapshots a Postgres database, then diffs two snapshots row by row.",
      "Used daily by the backend team to catch migrations that silently corrupt data before they hit production.",
    ],
    stack: ["Rust", "PostgreSQL", "Clap"],
    year: "2024",
    role: "Solo developer",
    image: "https://picsum.photos/seed/tidepool-project/1200/800",
    links: {
      github: "https://github.com/example/tidepool",
    },
    featured: true,
  },
  {
    slug: "night-market",
    title: "Night Market",
    summary: "An e-commerce storefront for a small batch coffee roaster, from checkout to fulfillment.",
    description: [
      "Full storefront build for a local roaster: product catalog, subscriptions, and a fulfillment queue their two-person team runs by hand.",
      "Optimized for the slow connections their customers actually have, not a fast office wifi. LCP under 1.8s on 4G.",
    ],
    stack: ["Next.js", "Stripe", "Sanity"],
    year: "2023",
    role: "Solo developer",
    image: "https://picsum.photos/seed/night-market-project/1200/800",
    links: {
      live: "https://example.com",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}
