export const site = {
  name: "VIP Cosmetic Academy",
  city: "Berlin",
  slogan: {
    de: "Schönheit braucht Qualität.",
    vi: "Vẻ đẹp cần chất lượng.",
    en: "Beauty needs quality.",
  },
  /* Chuyển từ Dong Xuan Center (Herzbergstraße 128–139) về đây, 15/08/2026.
     Trước đây địa chỉ tách làm `line1` (sảnh + phòng) và `line2` (phố); chỗ mới
     không có số sảnh/phòng nên gộp làm một `street`. Đổi tên trường có chủ ý:
     nếu còn nơi nào đọc `line1`/`line2` thì TypeScript báo lỗi ngay lúc build,
     thay vì lặng lẽ in ra địa chỉ cũ. */
  address: {
    street: "Herzbergstraße 56–59",
    zip: "10365",
    city: "Berlin-Lichtenberg",
    country: "Deutschland",
  },
  /* Toạ độ số 56 theo OpenStreetMap — dùng cho khối bản đồ ở cuối trang. */
  geo: { lat: 52.526224, lng: 13.498604 },
  /* Địa chỉ dạng CHỮ cho Google Maps, không phải toạ độ: Maps tự chọn lối vào
     đã gắn cho toà nhà, còn toạ độ trần thì nó thả điểm giữa lòng đường.
     Dùng gạch nối "56-59" chứ không phải gạch ngang "–" để an toàn trong URL. */
  mapsQuery: "Herzbergstraße 56-59, 10365 Berlin, Germany",
  phone: "+49 176 68304046",
  phoneHref: "tel:+4917668304046",
  whatsapp: "https://wa.me/4917668304046",
  email: "vipcosmeticacademy.de@gmail.com",
  hours: {
    de: "Mo–Fr 09:00–18:00 · Sa nach Vereinbarung",
    vi: "T2–T6 09:00–18:00 · T7 theo lịch hẹn",
    en: "Mon–Fri 09:00–18:00 · Sat by appointment",
  },
  certifications: ["DEKRA", "AZAV", "NiSV"],
};

/**
 * Đường dẫn chỉ đường. KHÔNG khai điểm xuất phát — Google Maps tự lấy vị trí
 * người dùng đang đứng, nên khách quét mã QR ngoài đường là có ngay lộ trình.
 *
 * Mã QR trong `public/media/qr-anfahrt.svg` chứa ĐÚNG chuỗi này. Đổi địa chỉ
 * thì phải sinh lại mã, không thì mã dẫn về chỗ cũ.
 */
export const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(site.mapsQuery);

/** Bản đồ nhúng OpenStreetMap — không đặt cookie, không phải hỏi đồng ý như Google Maps. */
export const mapEmbedUrl =
  "https://www.openstreetmap.org/export/embed.html?bbox=13.4946%2C52.5246%2C13.5026%2C52.5279" +
  `&layer=mapnik&marker=${site.geo.lat}%2C${site.geo.lng}`;
