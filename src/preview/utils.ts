// src/preview/utils.ts
export function pctFromClientPoint(
  container: HTMLElement,
  clientX: number,
  clientY: number
): { xPct: number; yPct: number } {
  const rect = container.getBoundingClientRect();
  const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
  const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);
  const xPct = (x / rect.width) * 100;
  const yPct = (y / rect.height) * 100;
  return { xPct: round2(xPct), yPct: round2(yPct) };
}

const round2 = (n: number) => Math.round(n * 100) / 100;
