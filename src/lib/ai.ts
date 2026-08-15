import { publishedCourses } from "@/data/courses";
import { departments } from "@/data/departments";
import { site } from "@/data/site";
import { tloc } from "@/lib/utils";

export function localCounsel(question: string, locale: string): string {
  const q = question.toLowerCase();
  const vi = locale === "vi";

  if (/(shop|gian hàng|sản phẩm|keo|bột|tray|mua|bestell|kleber|acryl)/.test(q)) {
    return vi
      ? "Gian hàng bán đồ hỗ trợ ngành Mi, Nail và chăm sóc da (khay mi, keo, nhíp, bột, form, dũa, jade, serum). Xem /shop."
      : "Im Shop: Werkzeuge für Wimpern, Nägel und Hautpflege. Siehe /shop.";
  }
  if (/(termin|lịch|hen|besuch|tham quan|modell|mẫu)/.test(q)) {
    return vi
      ? `Đặt lịch tại /termin hoặc gọi ${site.phone}. Có thể hẹn tư vấn khóa, tham quan campus Herzbergstraße 56–59 hoặc đăng ký làm mẫu.`
      : `Termine über /termin oder ${site.phone}. Beratung, Campus-Besichtigung Herzbergstraße 56–59 oder Modell-Termin.`;
  }
  if (/(gutschein|bildung|jobcenter|agentur|tài trợ|voucher)/.test(q)) {
    return vi
      ? "Nhiều khóa AZAV có thể học bằng Bildungsgutschein (Agentur für Arbeit / Jobcenter). Gửi đăng ký và chọn «Bildungsgutschein» — chúng tôi kiểm tra khóa nào đủ điều kiện."
      : "Viele AZAV-Lehrgänge sind mit Bildungsgutschein möglich. Bei der Anmeldung «Bildungsgutschein» wählen — wir prüfen die Förderfähigkeit.";
  }
  if (/(adresse|address|wo |ở đâu|dong xuan|campus|berlin)/.test(q)) {
    return `${site.address.street}, ${site.address.zip} ${site.address.city}. ${site.phone}`;
  }
  if (/(preis|học phí|kosten|giá|euro)/.test(q)) {
    const list = publishedCourses()
      .filter((c) => c.priceFrom)
      .slice(0, 8)
      .map((c) => `${tloc(c.title, locale)}: ab ${c.priceFrom} €`)
      .join(vi ? " · " : " · ");
    return vi
      ? `Học phí từ (tư nhân, chưa gồm tài trợ): ${list}. Gửi form đăng ký để nhận báo giá chính xác.`
      : `Private Einstiegspreise: ${list}. Verbindliches Angebot nach Anmeldung.`;
  }

  const scored = publishedCourses()
    .map((c) => {
      const hay = `${c.slug} ${c.title.de} ${c.title.vi} ${c.summary.de} ${c.summary.vi} ${c.department}`.toLowerCase();
      const words = q.split(/\s+/).filter((w) => w.length > 2);
      return { c, n: words.filter((w) => hay.includes(w)).length };
    })
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n);

  if (scored[0]) {
    const c = scored[0].c;
    return vi
      ? `${tloc(c.title, "vi")}: ${tloc(c.summary, "vi")} Thời lượng ${tloc(c.duration, "vi")}. ${c.priceFrom ? `Từ ${c.priceFrom} €.` : ""} Chi tiết /kurse/${c.slug} — đăng ký /anmeldung.`
      : `${tloc(c.title, "de")}: ${tloc(c.summary, "de")} Dauer ${tloc(c.duration, "de")}. ${c.priceFrom ? `Ab ${c.priceFrom} €.` : ""} Mehr unter /kurse/${c.slug} — Anmeldung /anmeldung.`;
  }

  if (/(ngành|ausbildung|beruf|dạy gì|was bietet|khóa)/.test(q)) {
    const names = departments.map((d) => tloc(d.title, locale)).join(", ");
    return vi
      ? `VIP Cosmetic Academy đào tạo: ${names}. Xem toàn bộ tại /ausbildung.`
      : `Wir bilden aus in: ${names}. Vollständige Liste unter /ausbildung.`;
  }

  return vi
    ? `VIP Cosmetic Academy — ${departments.length} nhóm ngành, ${publishedCourses().length} khóa. Hỏi tên khóa, học phí, Bildungsgutschein hoặc đặt lịch. Campus: ${site.address.street}. Điện thoại ${site.phone}.`
    : `VIP Cosmetic Academy — ${departments.length} Ausbildungsfelder, ${publishedCourses().length} Kurse. Frag nach einem Kurs, Preis, Bildungsgutschein oder Termin. Campus: ${site.address.street}. Tel. ${site.phone}.`;
}

export async function counsel(question: string, locale: string): Promise<string> {
  const fallback = localCounsel(question, locale);
  const key = process.env.XAI_API_KEY;
  if (!key) return fallback;

  const catalog = publishedCourses()
    .map((c) => `${c.title.de} / ${c.title.vi} (${c.slug}, ${c.department}${c.priceFrom ? `, ab ${c.priceFrom}€` : ""})`)
    .join("; ");

  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              `Du bist VIP Counsel der VIP Cosmetic Academy. Antworte kurz, höflich, auf der Sprache des Users (de/vi/en). ` +
              `Campus: ${site.address.street}, ${site.address.zip} ${site.address.city}. Tel ${site.phone}. ` +
              `Katalog: ${catalog}. Keine medizinischen Heilversprechen. Bei Termin auf /termin verweisen.`,
          },
          { role: "user", content: question },
        ],
      }),
    });
    if (!res.ok) return fallback;
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return data.choices?.[0]?.message?.content?.trim() || fallback;
  } catch {
    return fallback;
  }
}
