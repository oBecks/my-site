// Omer's background, drafted from the CV. The Assistant sees all of this even
// though the site doesn't render it (yet). Never add a phone number or home
// address here: anything in this file can be repeated to any Visitor.

export type Experience = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
};

export type Profile = {
  headline: string;
  bio: string[];
  education: { degree: string; school: string; period: string }[];
  experience: Experience[];
  skills: { label: string; items: string[] }[];
  sideInterests: { title: string; summary: string }[];
  languages: string[];
};

export const profile: Profile = {
  headline: "Software developer finishing a B.Sc. in Computer Science",
  bio: [
    "Omer is a software developer who likes owning a project end to end, from the database schema to the last pixel of the UI.",
    "He currently works in a Network Operations Center, where he monitors production systems, digs through logs and metrics during outages, and scripts away the repetitive parts of the job.",
    "Outside work he builds playful side projects, often with AI coding agents like Claude Code as part of the workflow.",
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science",
      school: "Afeka Academic College of Engineering",
      period: "2022 – 2026",
    },
  ],
  experience: [
    {
      role: "Network Operations Center (NOC)",
      company: "Rapyd",
      period: "Apr 2026 – present",
      highlights: [
        "Monitors production systems and investigates outages using logs and metrics.",
        "Writes scripts to automate recurring NOC tasks.",
        "Tracks incidents in Jira and documents fixes in Confluence.",
      ],
    },
    {
      role: "Sales Representative",
      company: "Anipet (Maabarot Group)",
      period: "2023 – 2026",
      highlights: [
        "Managed customer relations and sales for retail and online orders.",
        "Handled orders, questions, and complaints directly with customers.",
        "Met the store's monthly sales targets.",
      ],
    },
    {
      role: "Technical Support & Customer Service",
      company: "Hemilton (Xiaomi Israel)",
      period: "2018 – 2020",
      highlights: [
        "Provided technical support and troubleshooting for hardware and software.",
        "Diagnosed issues from customer reports and traced them to the root cause.",
      ],
    },
  ],
  skills: [
    {
      label: "AI & agentic tools",
      items: [
        "Claude Code",
        "Gemini",
        "Antigravity",
        "Agentic PR review tools",
        "Model Context Protocol (MCP)",
      ],
    },
    {
      label: "Web & mobile",
      items: [
        "Flutter",
        "Next.js",
        "Firebase (Firestore, Auth)",
        "PostgreSQL",
        "GitHub Apps & webhooks",
      ],
    },
    {
      label: "Languages",
      items: [
        "Java",
        "C",
        "C++",
        "Python",
        "Dart",
        "TypeScript",
        "Bash",
        "Assembly",
      ],
    },
    {
      label: "Tools",
      items: [
        "Git",
        "GitHub",
        "GitHub Actions",
        "Vercel",
        "Jira",
        "Confluence",
        "Kibana",
      ],
    },
    {
      label: "Networking & security",
      items: ["TCP/IP", "DNS", "DHCP", "HTTP/S", "OSI model", "Wireshark"],
    },
    {
      label: "Systems & CS fundamentals",
      items: [
        "Memory management",
        "Multithreading",
        "OS internals",
        "Linux (Ubuntu, Bash)",
        "Windows internals",
        "Data structures & algorithms",
        "Object-oriented design",
      ],
    },
    {
      label: "Ways of working",
      items: [
        "Troubleshooting",
        "Log analysis",
        "Monitoring",
        "Root cause analysis",
      ],
    },
  ],
  sideInterests: [
    {
      title: "3D printing & CAD",
      summary:
        "Designs 3D objects and mechanical parts and prints them on his own 3D printer.",
    },
    {
      title: "Home automation",
      summary:
        "Self-hosts Home Assistant and scripts custom IoT integrations, with some Arduino tinkering on the side.",
    },
  ],
  languages: ["Hebrew (native)", "English (fluent)"],
};
