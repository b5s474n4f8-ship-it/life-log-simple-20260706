# Vitality Journal

A low-friction LifeLog + Priming journal for daily recording, local organization, personal corpus review, export, backup, and encrypted sync.

Current mode: Simple Local Organizer.

## What It Does

- Observe: save complete LifeLog traces.
- Orient: turn a priming note into a small editable action line.
- Lens: view 7-day and 30-day rhythm and repeated signals.
- Corpus: keep each user input as one complete corpus item, with copy and Markdown export.
- Keep: export Markdown, backup JSON, restore bundled old history, and use encrypted sync.

Daily use does not require separate model service setup.

## Deployment

Use the step-by-step guide:

```text
DEPLOY_MOBILE_SYNC.md
```

For Cloudflare Workers, keep these files in the repository root:

```text
index.html
app.js
styles.css
sw.js
worker.js
wrangler.toml
manifest.webmanifest
icon-192.png
icon-512.png
apple-touch-icon.png
history-v1.enc.json
.nojekyll
```