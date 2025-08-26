import React, { useState } from "react";
import { Pin } from "../types";

export const CommentList: React.FC<{
  pin: Pin | null;
  onAdd: (bodyMd: string) => void;
}> = ({ pin, onAdd }) => {
  const [value, setValue] = useState("");

  if (!pin) {
    return (
      <div style={{
        border: "1px solid #E2E8F0",
        borderRadius: 8,
        padding: 12,
        fontSize: 12,
        opacity: 0.7
      }}>
        Select a pin to view or start a thread.
      </div>
    );
  }

  return (
    <div style={{
      border: "1px solid #E2E8F0",
      borderRadius: 8,
      padding: 8,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>Pin #{pin.id.slice(0,4)}</div>

      {/* Placeholder des messages (sera branché sur storage plus tard) */}
      <div style={{
        background: "#F8FAFC",
        border: "1px solid #E2E8F0",
        borderRadius: 8,
        padding: 8,
        minHeight: 80
      }}>
        <div style={{ fontSize: 12, opacity: 0.6 }}>
          (Thread messages will appear here)
        </div>
      </div>

      <div style={{ display: "flex", gap: 6 }}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write a comment (Markdown supported soon)"
          style={{
            flex: 1,
            padding: "8px 10px",
            borderRadius: 8,
            border: "1px solid #E2E8F0"
          }}
        />
        <button
          onClick={() => {
            if (!value.trim()) return;
            onAdd(value.trim());
            setValue("");
          }}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #E2E8F0",
            background: "#0EA5E9",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          Comment
        </button>
      </div>
    </div>
  );
};
