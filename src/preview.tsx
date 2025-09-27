// src/preview.tsx
import React from "react";
import { addons } from "storybook/preview-api";
import type { DecoratorFunction } from "storybook/internal/types";
import { Overlay } from "./preview/Overlay";
import { EVENTS } from "./constants";

const channel = addons.getChannel();

/**
 * Decorator qui wrap chaque story avec un container
 * et un overlay en position absolue.
 */
export const decorators: DecoratorFunction[] = [
  (Story, context) => {
    const { id: storyId } = context; // id unique de la story
    return React.createElement("div", { style: { position: "relative" } }, [
      React.createElement(Story, { key: "story" }),
      React.createElement(Overlay, { key: "overlay", channel, storyId })
    ]);
  },
];

// Alternative JSX version (comment out the above and use this if JSX is properly configured)
/*
export const decorators: DecoratorFunction[] = [
  (Story, context) => {
    const { id: storyId } = context;
    return (
      <div style={{ position: "relative" }}>
        <Story />
        <Overlay channel={channel} storyId={storyId} />
      </div>
    );
  },
];
*/

// Optionnel : réagir à des events globaux si besoin ici
channel.on(EVENTS.LOAD_FOR_STORY, ({ storyId }) => {
  // place pour charger depuis storage plus tard
});
