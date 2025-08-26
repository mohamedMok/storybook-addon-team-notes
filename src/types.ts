// Types shared across manager & preview

export type Pin = {
  id: string;
  storyId: string;
  xPct: number; // % position X relative to story canvas
  yPct: number; // % position Y relative to story canvas
  resolved?: boolean;
  createdAt: string;
  createdBy?: string; // user id or name
};

export type NoteComment = {
  id: string;
  pinId: string;
  author?: string;
  bodyMd: string;
  createdAt: string;
};
