import { useEffect, useRef, useState } from "react";

interface BinaryTextProps {
  text: string;
  className?: string;
  speedMs?: number;
  staggerMs?: number;
}

export function BinaryText({
  text,
  className,
  speedMs = 45,
  staggerMs = 55,
}: BinaryTextProps) {
  const chars = [...text];
  const [display, setDisplay] = useState<string[]>(() =>
    chars.map(() => (Math.random() > 0.5 ? "1" : "0"))
  );
  const revealedRef = useRef(new Set<number>());

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    chars.forEach((_, i) => {
      const t = setTimeout(() => {
        revealedRef.current.add(i);
        setDisplay((prev) => {
          const next = [...prev];
          next[i] = chars[i];
          return next;
        });
      }, i * staggerMs);
      timeouts.push(t);
    });

    const interval = setInterval(() => {
      setDisplay((prev) => {
        const next = [...prev];
        let changed = false;
        for (let i = 0; i < chars.length; i++) {
          if (!revealedRef.current.has(i)) {
            next[i] = Math.random() > 0.5 ? "1" : "0";
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    }, speedMs);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">
        {chars.map((char, i) => (
          <span key={i} className="relative inline-block whitespace-pre tabular-nums">
            <span aria-hidden="true" className="invisible">
              {char === " " ? "\u00A0" : char}
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center font-mono text-muted-foreground/80"
            >
              {display[i]}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
