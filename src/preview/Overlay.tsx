// src/preview/Overlay.tsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import type { Channel } from "@storybook/channels";
import { EVENTS } from "../constants";
import type { Pin } from "../types";
import { pctFromClientPoint } from "./utils";

type Props = {
  channel: Channel;
  storyId: string;
};

export const Overlay: React.FC<Props> = ({ channel, storyId }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pinMode, setPinMode] = useState(false);
  const [hover, setHover] = useState<{ xPct: number; yPct: number } | null>(null);

  // Sync Pin Mode depuis le panel
  useEffect(() => {
    const onToggle = ({ enabled, storyId: target }: { enabled: boolean; storyId: string }) => {
      if (target === storyId) setPinMode(enabled);
    };
    channel.on(EVENTS.TOGGLE_PIN_MODE, onToggle);
    return () => channel.off(EVENTS.TOGGLE_PIN_MODE, onToggle);
  }, [channel, storyId]);

  // ESC pour sortir
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPinMode(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!pinMode || !ref.current) return;
    const { xPct, yPct } = pctFromClientPoint(ref.current, e.clientX, e.clientY);
    setHover({ xPct, yPct });
  }, [pinMode]);

  const onClick = useCallback((e: React.MouseEvent) => {
    if (!pinMode || !ref.current) return;
    e.preventDefault();
    const { xPct, yPct } = pctFromClientPoint(ref.current, e.clientX, e.clientY);

    const pin: Pin = {
      id: crypto.randomUUID(),
      storyId,
      xPct,
      yPct,
      resolved: false,
      createdAt: new Date().toISOString(),
    };

    channel.emit(EVENTS.CREATE_PIN, pin);
  }, [pinMode, channel, storyId]);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onClick={onClick}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: pinMode ? "auto" : "none",
        cursor: pinMode ? "crosshair" : "default",
        boxShadow: pinMode ? "inset 0 0 0 9999px rgba(14,165,233,0.06)" : "none",
        transition: "box-shadow .15s ease",
      }}
      aria-hidden={!pinMode}
    >
      {pinMode && hover && (
        <div
          style={{
            position: "absolute",
            left: `${hover.xPct}%`,
            top: `${hover.yPct}%`,
            transform: "translate(-50%, -50%)",
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: "2px solid #0EA5E9",
            background: "#fff",
            boxShadow: "0 1px 2px rgba(0,0,0,.12)",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};
