import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useChannel, useStorybookState } from "storybook/manager-api";
import { EVENTS } from "../constants";
import { Pin } from "../types";
import { PinList } from "./PinList";
import { CommentList } from "./CommentList";

export const Panel: React.FC<{ active?: boolean }> = ({ active }) => {
  const state = useStorybookState();
  const storyId = state?.storyId ?? "";
  const [pinMode, setPinMode] = useState(false);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const [pins, setPins] = useState<Pin[]>([]); // in-memory pour l’instant

  const emit = useChannel({
    [EVENTS.CREATE_PIN]: (pin: Pin) => {
      setPins((prev) => [pin, ...prev]);
    },
    [EVENTS.SELECT_PIN]: (pinId: string) => {
      setSelectedPinId(pinId);
    },
    [EVENTS.UPDATE_PIN]: (patch: Partial<Pin> & { id: string }) => {
      setPins((prev) => prev.map(p => p.id === patch.id ? { ...p, ...patch } : p));
    }
  });

  // Toggle pin mode -> informer le preview (overlay)
  const onTogglePinMode = useCallback(() => {
    const next = !pinMode;
    setPinMode(next);
    emit(EVENTS.TOGGLE_PIN_MODE, { enabled: next, storyId });
  }, [pinMode, emit, storyId]);

  // Charger les pins de la story (plus tard depuis storage)
  useEffect(() => {
    setPins([]); // reset quand on change de story
    emit(EVENTS.LOAD_FOR_STORY, { storyId });
  }, [storyId, emit]);

  const selectedPin = useMemo(
    () => pins.find((p) => p.id === selectedPinId) || null,
    [pins, selectedPinId]
  );

  if (!active) return null;

  return (
    <div style={{ padding: 12, fontFamily: "Inter, ui-sans-serif, system-ui" }}>
      <header style={{
        display: "flex", alignItems: "center", gap: 8, marginBottom: 12
      }}>
        <button
          onClick={onTogglePinMode}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #E2E8F0",
            background: pinMode ? "#0EA5E9" : "#fff",
            color: pinMode ? "#fff" : "#0F172A",
            cursor: "pointer",
            fontWeight: 600
          }}
          title="Drop pins on the canvas (N to start, Esc to exit)"
        >
          {pinMode ? "Pin Mode: ON" : "Pin Mode: OFF"}
        </button>

        <div style={{ marginLeft: "auto", opacity: 0.7, fontSize: 12 }}>
          Story: <strong>{storyId || "—"}</strong>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <section>
          <h4 style={{ margin: "6px 0" }}>Pins</h4>
          <PinList
            pins={pins}
            selectedId={selectedPinId}
            onSelect={setSelectedPinId}
            onResolve={(id) => emit(EVENTS.UPDATE_PIN, { id, resolved: true })}
          />
        </section>

        <section>
          <h4 style={{ margin: "6px 0" }}>Thread</h4>
          <CommentList
            pin={selectedPin}
            onAdd={(bodyMd) => emit(EVENTS.ADD_COMMENT, { pinId: selectedPinId, bodyMd })}
          />
        </section>
      </div>

      {!pins.length && (
        <p style={{ marginTop: 16, fontSize: 12, opacity: 0.7 }}>
          No pins yet. Toggle <strong>Pin Mode</strong> and click on the canvas to drop your first note.
        </p>
      )}
    </div>
  );
};
