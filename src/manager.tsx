import React from "react";
import { addons, types } from "@storybook/manager-api";
import { ADDON_ID, PANEL_ID } from "./constants";
import { Panel } from "./panel/Panel";

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Team Notes",
    match: ({ viewMode }) => viewMode === "story", // n’afficher que sur les stories
    render: ({ active, key }) => <Panel active={active} key={key} />,
    paramKey: ADDON_ID // permet de passer des options par story si besoin
  });
});
