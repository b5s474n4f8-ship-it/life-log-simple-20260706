# Vitality Journal Deployment Guide

Current mode: Simple Local Organizer.

The app now keeps the daily flow low-maintenance:

- LifeLog records are saved as complete original entries.
- The organize button uses local, lightweight extraction for basic structure.
- Priming generates a local action line without external setup.
- Corpus keeps one user input as one complete corpus item.
- Copy, Markdown export, JSON backup, old history restore, and encrypted sync remain available.

No separate model service setup is required for daily use.

## 1. Upload These Files To GitHub

Update the repository root with the current versions of these files:

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

Optional documentation files can also be uploaded, but they are not required for the app to run.

## 2. Deploy On Cloudflare Workers

1. Open Cloudflare Dashboard.
2. Go to `Workers & Pages`.
3. Open the existing project: `life-log-simple-20260706`.
4. Make sure the project is connected to the GitHub repository.
5. Trigger a new deploy from the latest GitHub commit.
6. Wait until the deployment shows success.
7. Click `Visit` to open the live URL.

The static assets setting is already in `wrangler.toml`:

```toml
[assets]
directory = "."
binding = "ASSETS"
not_found_handling = "single-page-application"
run_worker_first = ["/api/*"]
```

## 3. Confirm The App Is Updated

Open the deployed site and check:

1. The main tabs are `看见 / 定向 / 趋势 / 语料`.
2. The LifeLog organize area says local draft or local organization.
3. There is no external model setup panel in `保存 / Keep`.
4. The `语料` page shows complete record cards, not tiny fragmented fields.

If the phone still shows the old version:

1. Close the Home Screen app completely.
2. Open the deployed URL in Safari and refresh.
3. If needed, delete the Home Screen icon and add it again.
4. Confirm `sw.js` contains:

```text
vitality-journal-20260712-simple-local
```

## 4. Restore Old History

1. Open the deployed app.
2. Tap `保存 / Keep`.
3. Tap `恢复旧历史 / Restore old history`.
4. Enter the old history code:

```text
3G5S-XW2R-V6RQ-QVXU
```

5. Tap `解锁 / Unlock`.
6. The app should report how many days were merged.

This old history code is only for the bundled encrypted history package. It is not the cloud sync passphrase.

## 5. Use Phone And Computer Sync

Use the same values on both devices.

1. Open `保存 / Keep`.
2. In `加密同步 / Encrypted sync`, enter:

```text
Sync ID: lily-vitality
Sync passphrase: choose your own phrase with at least 10 characters
```

3. On the device that already has data, tap `Push / 推送`.
4. On the other device, enter the same Sync ID and passphrase.
5. Tap `Pull / 拉取`.
6. Later, use `Sync now / 立即同步`.

The sync payload is encrypted in the browser before upload.

## 6. Backfill Missed Days

1. Use the top `记录日期 / Record date` picker.
2. Choose the past date.
3. Add LifeLog or Priming content.
4. Save.
5. Return to today when done.

Backfilled entries are stored under the selected date.

## 7. Copy And Export

For corpus:

1. Open `语料 / Corpus`.
2. Use search if needed.
3. Tap `Copy shown / 复制当前语料` to copy the visible corpus.
4. Tap `Export corpus / 导出语料` to download Markdown.
5. Each card also has its own `Copy` button.

For full backup:

1. Open `保存 / Keep`.
2. Tap `Export Markdown / 导出 Markdown` for a readable journal export.
3. Tap `Backup JSON / 备份 JSON` for full restore data.

## 8. Current Daily Flow

```text
看见：保存完整 LifeLog 记录
整理：生成本地中性抽取，原文不变
定向：写/说 Priming，生成可编辑行动线
趋势：查看 7/30 天节奏和反复信号
语料：按完整输入查看、复制、导出
保存：备份、恢复旧历史、加密同步
```