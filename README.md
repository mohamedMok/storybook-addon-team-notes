# 📌 Storybook Addon — Team Notes

Figma-like **pins & threaded comments** directly in Storybook.  
Bridge **Design × Product × Dev** on every component, without leaving your docs.

## ✨ What you get (v0.1)
- Drop **pins** on the canvas and start a **thread** (per story).
- **Pin mode** toggle from the panel.
- Starts with **Local Storage** (zero setup).  
- Optional **Supabase** provider for realtime & auth (coming soon).

## 🚀 Install
```bash
npm i -D storybook-addon-team-notes
# or
pnpm add -D storybook-addon-team-notes
```

Add to `.storybook/main.ts`:
```ts
export default {
  addons: [
    {
      name: 'storybook-addon-team-notes',
      options: {
        storage: 'local',         // 'local' for zero-setup (MVP)
        // storage: 'supabase',    // coming soon
        // projectKey: 'org/repo'  // used by remote providers
      }
    }
  ]
};
```

Open Storybook and show the **Team Notes** panel. Toggle **Pin mode**, click on the canvas, and start commenting.

## 🗺 Roadmap
- [x] UI: panel, overlay, pins
- [ ] Local storage provider
- [ ] Supabase provider (CRUD + Realtime + Auth)
- [ ] GitHub Issues provider
- [ ] Mentions, resolve, deep-linking

## 🤝 Contributing
PRs welcome! Check issues for good first tasks.

## 📄 License
MIT © Mohamed Mokhtari
