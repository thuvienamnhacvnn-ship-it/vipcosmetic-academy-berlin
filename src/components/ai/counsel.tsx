"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MessageCircle, Send, X } from "lucide-react";

export function CounselWidget() {
  const t = useTranslations("ai");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: t("greeting") },
  ]);

  async function send() {
    const text = input.trim();
    if (!text || pending) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setPending(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, locale }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply ?? t("thinking") }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: t("thinking") }]);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-gold px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink shadow-lg"
        >
          <MessageCircle className="h-4 w-4" />
          {t("open")}
        </button>
      ) : (
        <div className="fixed bottom-4 right-4 z-50 flex h-[28rem] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden border border-border bg-background shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-fg">{t("title")}</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-sm px-3 py-2 ${
                  m.role === "user" ? "ml-auto bg-gold text-ink" : "bg-surface text-foreground"
                }`}
              >
                {m.content}
              </div>
            ))}
            {pending ? <p className="text-muted">{t("thinking")}</p> : null}
          </div>
          <form
            className="flex gap-2 border-t border-border p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder")}
              className="input"
            />
            <button type="submit" className="btn btn-gold !px-3" aria-label={t("send")}>
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
