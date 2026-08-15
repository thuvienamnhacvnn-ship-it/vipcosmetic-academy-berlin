"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { products } from "@/data/products";
import { formatEuro, tloc } from "@/lib/utils";

type Line = { id: string; qty: number };

const KEY = "vca-cart";

function readCart(): Line[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function addToCart(id: string, qty = 1) {
  const lines = readCart();
  const i = lines.findIndex((l) => l.id === id);
  if (i >= 0) lines[i].qty += qty;
  else lines.push({ id, qty });
  localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event("vca-cart"));
}

export function AddButton({ id }: { id: string }) {
  const t = useTranslations("shop");
  return (
    <button
      type="button"
      className="btn btn-gold"
      onClick={() => addToCart(id)}
    >
      {t("add")}
    </button>
  );
}

export function Cart({ locale }: { locale: string }) {
  const t = useTranslations("shop");
  const ta = useTranslations("apply");
  const [lines, setLines] = useState<Line[]>([]);
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const sync = () => setLines(readCart());
    sync();
    window.addEventListener("vca-cart", sync);
    return () => window.removeEventListener("vca-cart", sync);
  }, []);

  const items = lines
    .map((l) => ({ ...l, product: products.find((p) => p.id === l.id) }))
    .filter((x) => x.product);
  const total = items.reduce((s, x) => s + (x.product!.price * x.qty), 0);

  async function checkout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!items.length) return;
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        message: fd.get("message"),
        items: items.map((x) => ({
          id: x.id,
          slug: x.product!.slug,
          title: x.product!.title.de,
          qty: x.qty,
          price: x.product!.price,
        })),
        total,
      }),
    });
    setBusy(false);
    if (!res.ok) return;
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event("vca-cart"));
    setOk(true);
  }

  if (ok) return <p className="frame p-6 text-sm">{t("ok")}</p>;

  return (
    <div className="space-y-6">
      <h2 className="display text-3xl">{t("cart")}</h2>
      {items.length === 0 ? (
        <p className="text-sm text-muted">{t("empty")}</p>
      ) : (
        <ul className="space-y-3 text-sm">
          {items.map((x) => (
            <li key={x.id} className="flex justify-between gap-3 border-b border-border pb-2">
              <span>
                {tloc(x.product!.title, locale)} × {x.qty}
              </span>
              <span>{formatEuro(x.product!.price * x.qty, locale)}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="text-sm">
        {t("total")}: <strong>{formatEuro(total, locale)}</strong>
      </p>
      <p className="text-xs text-muted">{t("pickup")}</p>
      <form onSubmit={checkout} className="space-y-3">
        <input name="name" required placeholder={ta("name")} className="input" />
        <input name="email" type="email" required placeholder={ta("email")} className="input" />
        <input name="phone" required placeholder={ta("phone")} className="input" />
        <textarea name="message" rows={2} placeholder={ta("message")} className="input" />
        <button type="submit" disabled={busy || !items.length} className="btn btn-gold">
          {t("checkout")}
        </button>
      </form>
    </div>
  );
}
