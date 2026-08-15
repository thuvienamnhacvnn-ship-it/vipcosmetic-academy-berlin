"use client";

export const themeInitScript = `
(function(){try{var t=localStorage.getItem('vca-theme');if(t==='light'){document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();
`;

export function ThemeToggle() {
  function toggle() {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("vca-theme", next);
    } catch {
      /* ignore */
    }
  }

  return (
    <button type="button" onClick={toggle} className="btn btn-ghost !px-3 !py-2" aria-label="Theme">
      <span className="hidden dark:inline">Light</span>
      <span className="inline dark:hidden">Dark</span>
    </button>
  );
}
