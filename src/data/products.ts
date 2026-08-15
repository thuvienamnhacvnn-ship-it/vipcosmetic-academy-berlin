import type { LText } from "./types";

export type ProductCat = "lashes" | "nails" | "skin";

export type Product = {
  id: string;
  slug: string;
  category: ProductCat;
  title: LText;
  summary: LText;
  description: LText;
  price: number;
  unit: LText;
  image: string;
};

export const products: Product[] = [
  {
    id: "p-lash-classic",
    slug: "wimpern-classic-0-07",
    category: "lashes",
    title: { de: "Classic-Wimpern 0.07", vi: "Mi classic 0.07", en: "Classic lashes 0.07" },
    summary: { de: "C-Curl, Längenmix für 1:1-Technik.", vi: "Cong C, mix độ dài cho nối 1:1.", en: "C-curl mixed lengths for 1:1." },
    description: {
      de: "Salon-Tray für den Unterricht und den Studioalltag. PBT-Faser, mattschwarz, auf Lehrgangsniveau der Academy.",
      vi: "Khay mi dùng dạy và làm tiệm. Sợi PBT, đen mờ, chuẩn giáo trình Academy.",
    },
    price: 18,
    unit: { de: "Tray", vi: "Khay", en: "Tray" },
    image: "/media/shop/lash-classic.jpg",
  },
  {
    id: "p-lash-volume",
    slug: "wimpern-volume-fans",
    category: "lashes",
    title: { de: "Volume-Fächer 5D–8D", vi: "Quạt volume 5D–8D", en: "Volume fans 5D–8D" },
    summary: { de: "Fertigfächer, leicht, für Volumen-Sets.", vi: "Quạt sẵn, nhẹ, cho bộ volume.", en: "Premade fans for volume sets." },
    description: {
      de: "Leichte Fertigfächer — weniger Belastung für Naturwimpern, reproduzierbar im Unterricht.",
      vi: "Quạt sẵn nhẹ — đỡ nặng mi thật, dễ dạy lại trong lớp.",
    },
    price: 24,
    unit: { de: "Tray", vi: "Khay", en: "Tray" },
    image: "/media/shop/lash-volume.jpg",
  },
  {
    id: "p-lash-glue",
    slug: "wimpernkleber-studio",
    category: "lashes",
    title: { de: "Studio-Kleber 5 ml", vi: "Keo nối mi studio 5 ml", en: "Studio adhesive 5 ml" },
    summary: { de: "1–2 Sek. Greifzeit, für geschulte Stylistinnen.", vi: "Bám 1–2 giây, dành cho stylist đã học.", en: "1–2s grab time, trained stylists only." },
    description: {
      de: "Nur für Absolventinnen / Profis. Trocken, kühl lagern. Sicherheitsdatenblatt liegt bei.",
      vi: "Chỉ cho học viên đã học / thợ. Bảo quản khô, mát. Có phiếu an toàn.",
    },
    price: 32,
    unit: { de: "Flasche", vi: "Chai", en: "Bottle" },
    image: "/media/shop/lash-glue.jpg",
  },
  {
    id: "p-lash-tweezers",
    slug: "pinzette-isolation",
    category: "lashes",
    title: { de: "Isolationspinzette", vi: "Nhíp tách mi", en: "Isolation tweezers" },
    summary: { de: "Gerade Spitze, handgeschliffen.", vi: "Mũi thẳng, mài tay.", en: "Straight tip, hand-finished." },
    description: {
      de: "Das Werkzeug aus dem 1:1-Kurs. Edelstahl, desinfizierbar.",
      vi: "Dụng cụ trong khóa 1:1. Inox, khử khuẩn được.",
    },
    price: 29,
    unit: { de: "Stück", vi: "Cây", en: "Piece" },
    image: "/media/shop/lash-tweezers.jpg",
  },
  {
    id: "p-lash-lift",
    slug: "lashlift-set",
    category: "lashes",
    title: { de: "Lashlift-Set", vi: "Bộ uốn mi", en: "Lash lift kit" },
    summary: { de: "Shields, Lotions, Kleber — Kursstandard.", vi: "Khuôn, dung dịch, keo — chuẩn khóa học.", en: "Shields, lotions, glue — course standard." },
    description: {
      de: "Komplettset wie im Wimpernlifting-Workshop. Für Studio und Übungsabend.",
      vi: "Bộ đủ như workshop uốn mi. Dùng tiệm và buổi tập.",
    },
    price: 49,
    unit: { de: "Set", vi: "Bộ", en: "Kit" },
    image: "/media/shop/lash-lift.jpg",
  },
  {
    id: "p-nail-acrylic",
    slug: "acrylpulver-set",
    category: "nails",
    title: { de: "Acrylpulver-Set", vi: "Bộ bột đắp móng", en: "Acrylic powder set" },
    summary: { de: "Clear, Cover, White — für Form-Grundkurs.", vi: "Clear, Cover, White — cho khóa form cơ bản.", en: "Clear, cover, white — form basics." },
    description: {
      de: "Die drei Pulver aus «Đắp bột dũa form cơ bản». Feine Körnung, europäische Flow-Form.",
      vi: "Ba loại bột trong khóa Đắp bột dũa form cơ bản. Hạt mịn, form chảy Âu.",
    },
    price: 42,
    unit: { de: "Set 3×30 g", vi: "Bộ 3×30 g", en: "Set 3×30 g" },
    image: "/media/shop/nail-acrylic.jpg",
  },
  {
    id: "p-nail-forms",
    slug: "nagelformen-dual",
    category: "nails",
    title: { de: "Dual-Forms & Schablonen", vi: "Form kép & giấy form", en: "Dual forms & paper forms" },
    summary: { de: "Wiederverwendbare Dual-Forms plus Papierschablonen.", vi: "Form kép tái sử dụng và giấy form.", en: "Reusable dual forms plus paper tips." },
    description: {
      de: "Wie im Unterricht: Dual-Form für Flow, Schablone für individuelle Länge.",
      vi: "Như trên lớp: form kép cho chảy Âu, giấy form cho chiều dài riêng.",
    },
    price: 16,
    unit: { de: "Pack", vi: "Gói", en: "Pack" },
    image: "/media/shop/nail-forms.jpg",
  },
  {
    id: "p-nail-files",
    slug: "feilen-set",
    category: "nails",
    title: { de: "Feilen-Set Pro", vi: "Bộ dũa chuyên nghiệp", en: "Pro file set" },
    summary: { de: "100/180, 180/240, Buffer — Form & Finish.", vi: "100/180, 180/240, buffer — form và bóng.", en: "100/180, 180/240, buffer — form and finish." },
    description: {
      de: "Genau die Körnungen aus dem Form-Kurs. Für Grundkurs und Intensiv.",
      vi: "Đúng độ nhám trong khóa form. Dùng cơ bản và nâng cao.",
    },
    price: 14,
    unit: { de: "Set", vi: "Bộ", en: "Set" },
    image: "/media/shop/nail-files.jpg",
  },
  {
    id: "p-nail-brushes",
    slug: "acrylpinsel",
    category: "nails",
    title: { de: "Acrylpinsel Kolinsky", vi: "Cọ đắp bột Kolinsky", en: "Kolinsky acrylic brush" },
    summary: { de: "Größe 8 — Standard im Academy-Unterricht.", vi: "Size 8 — chuẩn trên lớp Academy.", en: "Size 8 — academy class standard." },
    description: {
      de: "Für Perle, Flow-Form und Design. Mit Kappe.",
      vi: "Cho viên bột, form chảy và design. Có nắp.",
    },
    price: 36,
    unit: { de: "Stück", vi: "Cây", en: "Piece" },
    image: "/media/shop/nail-brush.jpg",
  },
  {
    id: "p-nail-hand",
    slug: "uebungshand",
    category: "nails",
    title: { de: "Übungshand + Tips", vi: "Tay tập + móng giả", en: "Practice hand + tips" },
    summary: { de: "Zum Üben von Form und Design zu Hause.", vi: "Tập form và design tại nhà.", en: "Practice form and design at home." },
    description: {
      de: "Flexible Übungshand, 100 Tips. Ergänzt die 30 bzw. 90 Unterrichtseinheiten.",
      vi: "Tay tập mềm, 100 móng giả. Bổ sung 30 hoặc 90 buổi trên lớp.",
    },
    price: 28,
    unit: { de: "Set", vi: "Bộ", en: "Set" },
    image: "/media/shop/nail-hand.jpg",
  },
  {
    id: "p-skin-jade",
    slug: "jade-gua-sha",
    category: "skin",
    title: { de: "Jade-Roller & Gua Sha", vi: "Con lăn ngọc & gua sha", en: "Jade roller & gua sha" },
    summary: { de: "Gesichts-Tools aus der Kosmetikausbildung.", vi: "Dụng cụ mặt trong khóa chăm sóc da.", en: "Facial tools from skincare class." },
    description: {
      de: "Set wie im Fachkosmetik-Unterricht. Kalt anwenden, desinfizierbar.",
      vi: "Bộ như trên lớp chăm sóc da. Dùng lạnh, khử khuẩn được.",
    },
    price: 38,
    unit: { de: "Set", vi: "Bộ", en: "Set" },
    image: "/media/shop/skin-jade.jpg",
  },
  {
    id: "p-skin-serum",
    slug: "serum-ampullen",
    category: "skin",
    title: { de: "Serum-Ampullen Studio", vi: "Ống serum studio", en: "Studio serum ampoules" },
    summary: { de: "Dropper-Seren für Gesichtsbehandlungen.", vi: "Serum nhỏ giọt cho liệu trình mặt.", en: "Dropper serums for facial treatments." },
    description: {
      de: "Für Aquafacial- und Fachkosmetik-Protokolle. Kühl lagern.",
      vi: "Cho aquafacial và liệu trình chuyên khoa. Bảo quản mát.",
    },
    price: 45,
    unit: { de: "3 Flaschen", vi: "3 chai", en: "3 bottles" },
    image: "/media/shop/skin-serum.jpg",
  },
  {
    id: "p-skin-pads",
    slug: "wattepads-studio",
    category: "skin",
    title: { de: "Wattepads Premium", vi: "Bông tẩy trang studio", en: "Premium cotton pads" },
    summary: { de: "Doppelt laminiert, fusselfrei.", vi: "Ép đôi, không xơ.", en: "Double-layered, lint-free." },
    description: {
      de: "Verbrauchsmaterial aus dem Kosmetikraum. 80 Stück.",
      vi: "Vật tư phòng da. 80 miếng.",
    },
    price: 8,
    unit: { de: "Pack", vi: "Gói", en: "Pack" },
    image: "/media/shop/skin-pads.jpg",
  },
  {
    id: "p-skin-bowl",
    slug: "messingschale",
    category: "skin",
    title: { de: "Messingschale", vi: "Bát đồng studio", en: "Brass bowl" },
    summary: { de: "Für Pads, Masken, Instrumente.", vi: "Đựng bông, mask, dụng cụ.", en: "For pads, masks, instruments." },
    description: {
      de: "Handgehämmert, wie im Atelier. Leicht zu reinigen.",
      vi: "Gõ tay, như trong atelier. Dễ vệ sinh.",
    },
    price: 22,
    unit: { de: "Stück", vi: "Cái", en: "Piece" },
    image: "/media/shop/skin-bowl.jpg",
  },
];

export function productBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
