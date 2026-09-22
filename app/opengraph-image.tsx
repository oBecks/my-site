import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name}, ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const headline = "Projects, experiments, and whatever I'm building next.";
const domain = "obeck.dev";

// Inter rather than the site's Geist: Satori renders Geist's word spacing
// unevenly, and Inter is a close match.
async function loadInter(weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`
  ).then((res) => res.text());
  const url = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype)'\)/
  )?.[1];
  if (!url) throw new Error(`Could not load Inter ${weight}`);
  return fetch(url).then((res) => res.arrayBuffer());
}

// Previews like LinkedIn's Featured card shrink this to ~360px wide, so
// everything is sized to stay legible at roughly 30% scale.
export default async function OpengraphImage() {
  const [bold, semibold, logo] = await Promise.all([
    loadInter(700),
    loadInter(600),
    readFile(join(process.cwd(), "app/icon.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundColor: "#0a0a0a",
        color: "#fafafa",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 144,
            fontWeight: 700,
            letterSpacing: "-0.045em",
            lineHeight: 1,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 58,
            fontWeight: 600,
            lineHeight: 1.2,
            color: "#c8c8c8",
            maxWidth: 1000,
          }}
        >
          {headline}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={92} height={92} alt="" />
          <div style={{ fontSize: 44, fontWeight: 600 }}>{siteConfig.role}</div>
        </div>
        <div style={{ fontSize: 44, fontWeight: 600, color: "#c8c8c8" }}>
          {domain}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter", data: bold, weight: 700, style: "normal" },
        { name: "Inter", data: semibold, weight: 600, style: "normal" },
      ],
    }
  );
}
