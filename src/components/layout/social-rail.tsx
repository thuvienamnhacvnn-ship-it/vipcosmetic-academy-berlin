"use client";

import { Instagram, Phone } from "lucide-react";
import { usePathname } from "@/i18n/navigation";
import { site } from "@/data/site";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 23l6.5-1.7A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.8 1 1-3.7-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1a7.5 7.5 0 0 1-2.2-1.4 8.3 8.3 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5l-.9-2.1c-.2-.6-.5-.5-.6-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.5 13.5 0 0 0 5.2 4.6 17 17 0 0 0 1.7.6 4 4 0 0 0 1.9.1 3 3 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}

const items = [
  { href: site.instagram, label: "Instagram", icon: Instagram },
  { href: site.whatsapp, label: "WhatsApp", icon: WhatsAppIcon },
  { href: site.phoneHref, label: `Hotline ${site.phone}`, icon: Phone },
];

export function SocialRail() {
  const path = usePathname();
  if (path.startsWith("/admin") || path.startsWith("/login") || path.startsWith("/konto")) return null;

  return (
    <aside
      className="app-rail pointer-events-none fixed left-3 top-1/2 z-40 -translate-y-1/2 lg:left-4"
      aria-label="Social media"
    >
      <div className="pointer-events-auto flex flex-col items-center gap-3">
        <span className="h-10 w-px bg-gold/50" aria-hidden />
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={item.label}
              title={item.label}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-gold/45 bg-black/35 text-gold backdrop-blur-md transition hover:bg-gold hover:text-ink"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          );
        })}
        <span className="h-10 w-px bg-gold/50" aria-hidden />
      </div>
    </aside>
  );
}
