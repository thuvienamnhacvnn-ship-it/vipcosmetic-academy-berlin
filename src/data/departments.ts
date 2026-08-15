import type { Department } from "./types";

export const departments: Department[] = [
  {
    id: "lashes",
    title: { de: "Wimpern & Brauen", vi: "Nghề Mi & Mày", en: "Lashes & Brows" },
    teaser: {
      de: "1:1, Volumen, Lifting, Brow Lamination — Praxis bis zur Studio-Reife.",
      vi: "Nối 1:1, volume, lifting, dán mày — thực hành đến khi làm được tại salon.",
      en: "Classic, volume, lift and brow lamination — trained to studio standard.",
    },
    body: {
      de: "Die Wimpernausbildung ist eines der stärksten Einstiegsfelder in Berlin. Wir unterrichten klassische 1:1-Technik, russisches Volumen, Lashlifting und Brow Lamination — mit echten Modellen, Hygieneprotokoll und Foto-Portfolio.",
      vi: "Nghề mi là cửa vào mạnh nhất tại Berlin. Học nối 1:1, volume Nga, uốn mi, dán mày — trên mẫu thật, quy trình vệ sinh và portfolio ảnh.",
    },
  },
  {
    id: "nails",
    title: { de: "Nägel", vi: "Nghề Nail", en: "Nails" },
    teaser: {
      de: "Zwei Stufen: Grundkurs Form & Acryl (1 Monat, 1.000 €) und Intensiv Form & Design (3 Monate, 1.500 €).",
      vi: "Hai cấp: cơ bản Đắp bột dũa form (1 tháng, 1.000 €) và nâng cao Form & Design (3 tháng, 1.500 €).",
      en: "Two tracks: Form & acrylic basics (1 month, €1,000) and Form & design intensive (3 months, €1,500).",
    },
    body: {
      de: "Aus dem aktuellen Ausbildungsangebot: Grundkurs «Kỹ thuật đắp bột dũa form» — 30 Einheiten, Form, Farbe, Salon-Sets, europäische Flow-Form, Jobhilfe, Festpreis 1.000 €. Aufbau «Chuyên sâu dũa form & design» — 90 Einheiten, Fehlerkorrektur, Design, internationales Zertifikat, 100 % Modellpraxis, Fahrtkostenzuschuss, Festpreis 1.500 €. Keine versteckten Gebühren.",
      vi: "Theo gói đang mở: khóa cơ bản Kỹ thuật đắp bột dũa form — 30 buổi, form, sơn màu, mẫu salon, form chảy Âu, hỗ trợ việc làm, 1.000 € không phát sinh phí. Khóa nâng cao Chuyên sâu dũa form & design — 90 buổi, sửa form và lỗi, design chuyên nghiệp, chứng chỉ quốc tế, thực hành mẫu thật 100%, hỗ trợ đi lại, 1.500 € không phát sinh phí.",
    },
  },
  {
    id: "skin",
    title: { de: "Hautpflege & Kosmetik", vi: "Chăm sóc da", en: "Skincare" },
    teaser: {
      de: "Fachkosmetik, Aquafacial, BB Glow, Anti-Aging — dermatologisch fundiert.",
      vi: "Mỹ phẩm chuyên khoa, aquafacial, BB Glow, chống lão hóa — nền tảng da liễu.",
      en: "Professional skincare, aquafacial, BB Glow and anti-aging — dermatology-led.",
    },
    body: {
      de: "Kosmetikausbildung mit Hautanalyse, Gerätekunde, klassischen und medizinischen Behandlungen. Crash-Kurse für Quereinstieg, Intensivlehrgänge für den Berufseinstieg in Berliner Instituten.",
      vi: "Đào tạo chăm sóc da: phân tích da, thiết bị, liệu trình cổ điển và y khoa. Có khóa cấp tốc và khóa chuyên sâu cho làm việc tại viện Berlin.",
    },
  },
  {
    id: "feet",
    title: { de: "Fußpflege", vi: "Chăm sóc chân", en: "Foot care" },
    teaser: {
      de: "Fachfußpflege — gefragt in Studios, Pflege und mobilen Services.",
      vi: "Chăm sóc chân chuyên khoa — nhu cầu cao ở tiệm, dưỡng lão và dịch vụ tại nhà.",
      en: "Professional foot care — in demand in studios, care homes and mobile service.",
    },
    body: {
      de: "Die Fachfußpflege-Ausbildung verbindet Anatomie, Instrumentenkunde, Hornhaut- und Nagelarbeit, Hygiene und Kundenführung. Ein Beruf mit stabiler Nachfrage in Berlin.",
      vi: "Khóa chăm sóc chân gồm giải phẫu, dụng cụ, xử lý chai và móng, vệ sinh và tiếp khách. Nghề có nhu cầu ổn định tại Berlin.",
    },
  },
  {
    id: "pmu",
    title: { de: "Permanent Make-up", vi: "Phun xăm thẩm mỹ", en: "Permanent makeup" },
    teaser: {
      de: "PMU, Microblading, Remover, Augenringe — präzise, sicher, portfolioreif.",
      vi: "Phun xăm, microblading, xóa mực, quầng mắt — chính xác, an toàn, có portfolio.",
      en: "PMU, microblading, remover and under-eye work — precise, safe, portfolio-ready.",
    },
    body: {
      de: "Permanent Make-up ist das Premium-Segment der Academy. Pigmentlehre, Zeichnung, Maschine und Handtechnik, Nachsorge und Korrektur. inkl. Microblading, Remover und Spezialmodule.",
      vi: "Phun xăm là phân khúc cao cấp. Học sắc tố, vẽ form, máy và tay, chăm sóc và sửa. Gồm microblading, xóa mực và module chuyên sâu.",
    },
  },
  {
    id: "makeup",
    title: { de: "Make-up & Visagistik", vi: "Trang điểm & Visagist", en: "Makeup & visagism" },
    teaser: {
      de: "Make-up Artist, Visagist, Kombi-Kurse — Bridal, Editorial, Studio.",
      vi: "Makeup artist, visagist, khóa kết hợp — cưới, editorial, studio.",
      en: "Makeup artist and visagist tracks — bridal, editorial, studio.",
    },
    body: {
      de: "Von Tages-Make-up bis Bridal und Editorial. Farbtheorie, Gesichtsanatomie, Fototauglichkeit. Auch als Kombi mit Visagistik und Train-the-Trainer.",
      vi: "Từ makeup ngày đến cưới và editorial. Lý thuyết màu, cấu trúc mặt, chụp ảnh. Có khóa kết hợp visagist và train-the-trainer.",
    },
  },
  {
    id: "hair",
    title: { de: "Haarverlängerung", vi: "Nối tóc", en: "Hair extension" },
    teaser: {
      de: "Extensions, Bonding, Pflege — Studio-Technik für Länge und Volumen.",
      vi: "Nối tóc, bonding, chăm sóc — kỹ thuật tiệm cho dài và dày.",
      en: "Extensions, bonding and aftercare — studio technique for length and volume.",
    },
    body: {
      de: "Haarverlängerung und Hair/Brow-Vitamin-Behandlungen. Schnitt, Bonding, Pflegeprotokoll und Kundenberatung.",
      vi: "Nối tóc và liệu trình vitamin tóc/mày. Cắt, bonding, quy trình chăm sóc và tư vấn.",
    },
  },
  {
    id: "advanced",
    title: { de: "Advanced Aesthetics", vi: "Thẩm mỹ nâng cao", en: "Advanced aesthetics" },
    teaser: {
      de: "Fadenlifting, Plasma Lifting — Geräte- und Fadentechniken.",
      vi: "Căng chỉ, plasma lifting — kỹ thuật chỉ và máy.",
      en: "Thread lift and plasma lift — device and thread techniques.",
    },
    body: {
      de: "Aufbaumodule für fortgeschrittene Kosmetikerinnen: Fadenlifting und Plasma. NiSV-Nachweis wo gesetzlich nötig.",
      vi: "Module nâng cao: căng chỉ và plasma. Cần NiSV khi luật yêu cầu.",
    },
  },
  {
    id: "trainer",
    title: { de: "Train the Trainer", vi: "Đào tạo giảng viên", en: "Train the trainer" },
    teaser: {
      de: "Didaktik für Stylistinnen, die selbst unterrichten.",
      vi: "Sư phạm cho stylist muốn đứng lớp.",
      en: "Teaching skills for stylists who want to instruct.",
    },
    body: {
      de: "Kursaufbau, Korrektur, Prüfungsvorbereitung — wer die Academy-Methode weitergeben will.",
      vi: "Xây khóa, sửa bài, chuẩn bị thi — cho người muốn truyền phương pháp Academy.",
    },
  },
  {
    id: "nisv",
    title: { de: "NiSV Fachkunde", vi: "Chứng chỉ NiSV", en: "NiSV qualification" },
    teaser: {
      de: "Gesetzlich vorgeschriebene Fachkunde für Gerätebehandlungen.",
      vi: "Chứng chỉ pháp lý bắt buộc cho liệu trình máy.",
      en: "Legally required qualification for device-based treatments.",
    },
    body: {
      de: "Seit der NiSV-Verordnung (01.01.2021) brauchen Studios nachweisbare Fachkunde für nichtmedizinische Anwendungen mit Geräten. Wir bieten die zertifizierten Module.",
      vi: "Từ quy định NiSV (01.01.2021), tiệm cần chứng chỉ khi dùng máy thẩm mỹ không y khoa. Academy mở các module được chứng nhận.",
    },
  },
];
