import type { ComponentType } from "react";
import { Nunito, Orbitron } from "next/font/google";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

const orbitron = Orbitron({ subsets: ["latin"], weight: "700" });
const nunito = Nunito({ subsets: ["latin"], weight: "800" });

function CommitPetMark() {
  return (
    <svg
      viewBox="60 16 180 180"
      className="h-16 w-16 sm:h-20 sm:w-20"
      aria-hidden="true"
    >
      <path
        d="M 95 140 C 60 70, 75 35, 85 35 C 100 35, 120 70, 135 100 Z"
        fill="#FF9333"
      />
      <path
        d="M 100 120 C 75 70, 82 45, 87 45 C 95 45, 110 70, 125 90 Z"
        fill="#1A1512"
      />
      <path
        d="M 205 140 C 240 70, 225 35, 215 35 C 200 35, 180 70, 165 100 Z"
        fill="#FF9333"
      />
      <path
        d="M 200 120 C 225 70, 218 45, 213 45 C 205 45, 190 70, 175 90 Z"
        fill="#1A1512"
      />
      <circle cx="150" cy="115" r="62" fill="#FF9333" />
      <ellipse cx="150" cy="144" rx="34" ry="26" fill="#FCE6CA" />
      <path
        d="M 144 139 C 144 135, 156 135, 156 139 C 156 146, 151 149, 150 149 C 149 149, 144 146, 144 139 Z"
        fill="#1A1512"
      />
      <ellipse cx="123" cy="112" rx="13" ry="16" fill="#FFFFFF" />
      <ellipse cx="125" cy="112" rx="9" ry="12" fill="#1A1512" />
      <circle cx="122" cy="107" r="3.5" fill="#FFFFFF" />
      <ellipse cx="177" cy="112" rx="13" ry="16" fill="#FFFFFF" />
      <ellipse cx="175" cy="112" rx="9" ry="12" fill="#1A1512" />
      <circle cx="172" cy="107" r="3.5" fill="#FFFFFF" />
    </svg>
  );
}

function CommitPetCover() {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3"
      style={{
        background: "linear-gradient(160deg, #FFF7EC 0%, #FBD9B0 100%)",
      }}
    >
      <CommitPetMark />
      <p className="text-lg font-semibold tracking-tight text-[#2B2115] sm:text-xl">
        Commit Pet
      </p>
    </div>
  );
}

function QuizipMark() {
  return (
    <svg
      viewBox="0 0 1024 1024"
      className="h-20 w-20 sm:h-24 sm:w-24"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="quizip-mark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8B44C" />
          <stop offset="55%" stopColor="#FF3864" />
          <stop offset="100%" stopColor="#C81E3A" />
        </linearGradient>
        <filter id="quizip-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
      </defs>
      <circle
        cx="512"
        cy="460"
        r="300"
        fill="#C81E3A"
        opacity="0.5"
        filter="url(#quizip-glow)"
      />
      <circle
        cx="512"
        cy="460"
        r="290"
        fill="none"
        stroke="url(#quizip-mark)"
        strokeWidth="100"
      />
      <path
        d="M 590 540 L 662 612 L 615 652 L 782 840"
        fill="none"
        stroke="url(#quizip-mark)"
        strokeWidth="86"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 860 795 L 878 838 L 921 856 L 878 874 L 860 917 L 842 874 L 799 856 L 842 838 Z"
        fill="#FFF3DC"
      />
    </svg>
  );
}

function QuizipCover() {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3"
      style={{
        background: "linear-gradient(135deg, #130306 0%, #2A1B1D 100%)",
      }}
    >
      <QuizipMark />
      <div className="flex flex-col items-center gap-1">
        <p
          className={cn(
            orbitron.className,
            "text-2xl tracking-wide text-[#F5EFEA] uppercase sm:text-3xl"
          )}
        >
          Quizip
        </p>
        <p className="text-xs font-medium tracking-[0.2em] text-[#C7B3B6] uppercase">
          Live Trivia
        </p>
      </div>
    </div>
  );
}

function ControlMark() {
  return (
    <svg
      viewBox="0 0 512 512"
      className="h-16 w-16 drop-shadow-[0_8px_20px_rgba(196,120,20,0.35)] sm:h-20 sm:w-20"
      aria-hidden="true"
    >
      <rect width="512" height="512" rx="112" fill="#F4AA2C" />
      <rect
        x="114"
        y="194"
        width="284"
        height="124"
        rx="62"
        fill="none"
        stroke="#381C01"
        strokeWidth="36"
      />
      <circle cx="336" cy="256" r="30" fill="#381C01" />
    </svg>
  );
}

function ControlCover() {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3"
      style={{
        background: "linear-gradient(160deg, #FBF8F3 0%, #F1E6D6 100%)",
      }}
    >
      <ControlMark />
      <p
        className={cn(
          nunito.className,
          "text-lg tracking-tight text-[#2E2418] sm:text-xl"
        )}
      >
        Control
      </p>
    </div>
  );
}

function SiteCover() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[oklch(0.145_0_0)]">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 text-lg font-semibold tracking-tight text-white sm:h-20 sm:w-20 sm:text-xl">
        OB
      </div>
      <p className="text-sm font-medium tracking-tight text-white/70">
        Portfolio
      </p>
    </div>
  );
}

const covers: Record<string, ComponentType> = {
  "commit-pet": CommitPetCover,
  quizip: QuizipCover,
  control: ControlCover,
  "my-site": SiteCover,
};

export function ProjectCover({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const Cover = covers[project.slug];
  return (
    <div className={cn("overflow-hidden bg-muted", className)}>
      {Cover ? <Cover /> : null}
    </div>
  );
}
