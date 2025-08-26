export const ADDON_ID = "storybook-addon-team-notes";
export const PANEL_ID = `${ADDON_ID}/panel`;

export const EVENTS = {
  TOGGLE_PIN_MODE: `${ADDON_ID}/toggle-pin-mode`,
  CREATE_PIN: `${ADDON_ID}/create-pin`,
  SELECT_PIN: `${ADDON_ID}/select-pin`,
  LOAD_FOR_STORY: `${ADDON_ID}/load-for-story`,
  ADD_COMMENT: `${ADDON_ID}/add-comment`,
  UPDATE_PIN: `${ADDON_ID}/update-pin`,
  RESOLVE_PIN: `${ADDON_ID}/resolve-pin`
} as const;
