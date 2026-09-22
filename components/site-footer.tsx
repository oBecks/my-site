import Link from "next/link";
import { GithubLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/site-config";

const socialLinks = [
  { label: "GitHub", href: siteConfig.social.github, icon: GithubLogo },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinLogo },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: EnvelopeSimple },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-[color,background-color,border-color,transform] duration-150 ease-[var(--ease-out-strong)] hover:border-foreground/30 hover:bg-muted hover:text-foreground active:scale-90"
            >
              <Icon size={17} weight="regular" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
