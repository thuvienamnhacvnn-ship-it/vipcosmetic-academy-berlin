import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

const mark = {
  sm: "h-10 md:h-11",
  md: "h-12 md:h-[3.35rem]",
  lg: "h-24 md:h-36",
};

const word = {
  sm: "text-[0.82rem] md:text-[0.95rem] tracking-[0.14em]",
  md: "text-[1.05rem] md:text-[1.2rem] tracking-[0.16em]",
  lg: "text-[1.85rem] md:text-[3.1rem] tracking-[0.14em]",
};

const academy = {
  sm: "text-[0.52rem] tracking-[0.38em]",
  md: "text-[0.58rem] tracking-[0.42em]",
  lg: "text-[0.72rem] md:text-[0.9rem] tracking-[0.48em]",
};

export function BrandMark({
  size = "md",
  light = false,
  className,
}: {
  size?: Size;
  light?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3 md:gap-4", className)}>
      <img src="/logo/vip-mark.png" alt="" className={cn("w-auto shrink-0", mark[size])} />
      <span className={cn("leading-none", light ? "text-white" : "text-foreground")}>
        <span className={cn("display block font-semibold uppercase", word[size])}>VIP COSMETIC</span>
        <span className={cn("mt-1 block uppercase text-gold", academy[size])}>academy</span>
      </span>
    </span>
  );
}
