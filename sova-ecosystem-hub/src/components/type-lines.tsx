import { useEffect, useState } from "react";

interface TypeLinesProps {
  lines: string[];
  speed?: number; // chars per tick
  tick?: number; // ms
  startDelay?: number;
  className?: string;
  loop?: boolean;
}

/** Types lines sequentially. After all lines done, optionally loops. */
export function TypeLines({
  lines,
  speed = 2,
  tick = 24,
  startDelay = 200,
  className,
  loop = false,
}: TypeLinesProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (lineIndex >= lines.length) {
      if (loop) {
        const r = setTimeout(() => {
          setLineIndex(0);
          setCharCount(0);
        }, 2200);
        return () => clearTimeout(r);
      }
      return;
    }
    const current = lines[lineIndex];
    if (charCount < current.length) {
      const t = setTimeout(() => setCharCount((c) => Math.min(c + speed, current.length)), tick);
      return () => clearTimeout(t);
    }
    const next = setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharCount(0);
    }, 320);
    return () => clearTimeout(next);
  }, [charCount, lineIndex, lines, speed, tick, started, loop]);

  return (
    <div className={className}>
      {lines.slice(0, lineIndex).map((l, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {l}
        </div>
      ))}
      {lineIndex < lines.length && (
        <div className="whitespace-pre-wrap">
          {lines[lineIndex].slice(0, charCount)}
          <span className="caret h-[1em] align-baseline" />
        </div>
      )}
    </div>
  );
}
