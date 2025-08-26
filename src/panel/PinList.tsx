import React from "react";
import { Pin } from "../types";

export const PinList: React.FC<{
  pins: Pin[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onResolve: (id: string) => void;
}> = ({ pins, selectedId, onSelect, onResolve }) => {
  return (
    <div style={{
      border: "1px solid #E2E8F0",
      borderRadius: 8,
      padding: 8,
      maxHeight: 280,
      overflow: "auto"
    }}>
      {pins.map((p) => (
        <div
          key={p.id}
          onClick={() => onSelect(p.id)}
          style={{
            padding: "8px 10px",
            borderRadius: 8,
            marginBottom: 6,
            background: selectedId === p.id ? "#F1F5F9" : "#fff",
            border: "1px solid #E2E8F0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer"
          }}
        >
          <div>
            <div style={{ fontWeight: 600 }}>Pin #{p.id.slice(0, 4)}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {Math.round(p.xPct)}% × {Math.round(p.yPct)}% • {p.resolved ? "Resolved" : "Open"}
            </div>
          </div>
          {!p.resolved && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onResolve(p.id);
              }}
              style={{
                padding: "4px 8px",
                borderRadius: 6,
                border: "1px solid #E2E8F0",
                background: "#fff",
                cursor: "pointer",
                fontSize: 12
              }}
            >
              Resolve
            </button>
          )}
        </div>
      ))}

      {!pins.length && (
        <div style={{ fontSize: 12, opacity: 0.7 }}>No pins yet.</div>
      )}
    </div>
  );
};
