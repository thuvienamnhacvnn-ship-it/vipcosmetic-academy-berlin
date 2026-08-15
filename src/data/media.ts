import type { DepartmentId } from "./types";

export const media = {
  hero: "/media/hero.jpg",
  banner: [
    "/media/banner/01-lashes.jpg",
    "/media/banner/02-atelier.jpg",
    "/media/banner/03-nails.png",
    "/media/banner/04-class.png",
    "/media/banner/05-skin.png",
  ],
  atelier: "/media/atelier.jpg",
  departments: {
    lashes: "/media/lashes.jpg",
    nails: "/media/nails.jpg",
    skin: "/media/skin.jpg",
    feet: "/media/feet.jpg",
    pmu: "/media/pmu.jpg",
    makeup: "/media/makeup.jpg",
    hair: "/media/makeup.jpg",
    advanced: "/media/skin.jpg",
    nisv: "/media/atelier.jpg",
    trainer: "/media/hero.jpg",
  } satisfies Record<DepartmentId, string>,
  videos: [
    { src: "/media/videos/nail-v2.mp4", poster: "/media/videos/nail-v2.jpg", label: { de: "Nagelkurs", vi: "Khóa nail", en: "Nail class" } },
    { src: "/media/videos/nail-v3.mp4", poster: "/media/videos/nail-v3.jpg", label: { de: "Nagelkurs · Form", vi: "Khóa nail · form", en: "Nail form" } },
    { src: "/media/videos/nail-v4.mp4", poster: "/media/videos/nail-v4.jpg", label: { de: "Nagelkurs · Praxis", vi: "Khóa nail · thực hành", en: "Nail practice" } },
    { src: "/media/videos/atelier.mp4", poster: "/media/atelier.jpg", label: { de: "Fußpflege", vi: "Chăm sóc chân", en: "Foot care" } },
  ],
  academyVideos: [
    { src: "/media/videos/nail-v2.mp4", poster: "/media/videos/nail-v2.jpg", label: { de: "Nagelkurs · Praxis", vi: "Khóa nail · thực hành", en: "Nail class" } },
    { src: "/media/videos/nail-v3.mp4", poster: "/media/videos/nail-v3.jpg", label: { de: "Nagelkurs · Form", vi: "Khóa nail · form", en: "Nail form" } },
    { src: "/media/videos/nail-v4.mp4", poster: "/media/videos/nail-v4.jpg", label: { de: "Nagelkurs · Coaching", vi: "Khóa nail · kèm lớp", en: "Nail coaching" } },
    { src: "/media/videos/atelier.mp4", poster: "/media/atelier.jpg", label: { de: "Fußpflege", vi: "Chăm sóc chân", en: "Foot care" } },
  ],
  academyPhotos: [
    { src: "/media/academy/01-class.jpg", label: { de: "Nagelklasse", vi: "Lớp nail", en: "Nail class" }, span: "wide" },
    { src: "/media/academy/02-room.jpg", label: { de: "Unterrichtsraum", vi: "Phòng học", en: "Classroom" }, span: "wide" },
    { src: "/media/academy/03-teacher.jpg", label: { de: "Lehrerin am Tisch", vi: "Giảng viên kèm bàn", en: "Teacher at table" } },
    { src: "/media/academy/04-coach.jpg", label: { de: "Einzelcoaching", vi: "Kèm 1:1", en: "One-to-one" } },
    { src: "/media/academy/05-design.jpg", label: { de: "Nail-Design", vi: "Làm design", en: "Nail design" } },
    { src: "/media/academy/06-practice.jpg", label: { de: "Praxis am Modell", vi: "Thực hành trên mẫu", en: "Practice on model" } },
  ],
};

export function deptImage(id: DepartmentId) {
  return media.departments[id];
}
