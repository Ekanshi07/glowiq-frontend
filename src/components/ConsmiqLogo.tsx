import { cn } from "@/lib/utils";

interface EkanshiLogoProps {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  showText?: boolean;
  inverted?: boolean;
}

const EkanshiLogo = ({
  className,
  markClassName,
  textClassName,
  showText = true,
  inverted = false,
}: EkanshiLogoProps) => (
  <div className={cn("inline-flex items-center gap-2.5", className)}>
    <span className={cn("relative flex h-10 w-10 items-center justify-center rounded-xl brand-gradient shadow-sm", markClassName)}>
      <span className="font-serif text-2xl font-bold leading-none text-white">C</span>
      <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-background bg-brand-gold" />
    </span>
    {showText && (
      <span
        className={cn(
          "font-bold tracking-tight",
          inverted ? "text-background" : "text-primary",
          textClassName
        )}
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Ekanshi
      </span>
    )}
  </div>
);

export default EkanshiLogo;
