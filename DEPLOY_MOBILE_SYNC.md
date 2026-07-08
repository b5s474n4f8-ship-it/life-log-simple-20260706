# Vitality Journal 部署与同步指引

这份说明按你当前截图里的路径来：Cloudflare 正在把项目作为 **Worker service** 部署，而不是 Pages project。报错内容要求配置静态资源目录，所以本项目现在采用：

```text
Cloudflare Worker + Static Assets + KV
```

静态 App 由 Worker Static Assets 托管；同步接口由 `worker.js` 处理：

```text
/api/sync/:id
```

云端仍然只保存加密后的 JSON envelope，明文日志不会上传到服务器。

## 0. 本次修复了什么

- `wrangler.toml` 已加入 Cloudflare 要求的 `[assets]` 配置。
- 新增 `worker.js`，用于处理 `/api/sync/:id`。
- 其余请求交给静态资源：`index.html`、`app.js`、`styles.css`、图标、manifest、service worker、历史加密包。
- 加入中文 / English 切换。
- 在 `保存 / Keep` 面板中加入 `恢复旧历史 / Restore old history` 按钮。
- 旧历史口令输入更宽容：大小写、漏掉短横线、中文输入法长横线都会自动规范化。
- 旧历史口令 `3G5S-XW2R-V6RQ-QVXU` 已本地验证可以解开 `history-v1.enc.json`，可恢复 11 天历史记录。

## 1. 重新部署当前 Worker

1. 回到 Cloudflare Dashboard。
2. 打开你截图里的这个项目：`life-log-simple-20260706`。
3. 进入 `Deployments`。
4. 触发一次新的 Deploy。
5. 等待 build log 重新跑。

这次不应该再出现：

```text
If you are uploading a directory of assets...
add the following to your wrangler.toml file:
[assets]
directory = "./dist"
```

因为现在 `wrangler.toml` 已经配置为：

```toml
name = "life-log-simple-20260706"
main = "./worker.js"
compatibility_date = "2026-07-08"

[assets]
directory = "."
binding = "ASSETS"
not_found_handling = "single-page-application"
run_worker_first = ["/api/*"]
```

## 2. 绑定 KV，同步手机和电脑

同步功能需要 KV。没有 KV 时，App 仍可本地使用，但 `Push / Pull / Sync now` 不会工作。

1. 在 Cloudflare Dashboard 进入你的 Worker：`life-log-simple-20260706`。
2. 打开 `Settings`。
3. 打开 `Bindings`。
4. 添加 KV namespace binding。
5. 变量名必须填：

```text
VITALITY_SYNC
```

6. 选择已有 KV namespace，或新建一个，例如：

```text
vitality_journal_sync
```

7. 保存后重新 Deploy。

同步接口应可访问：

```text
https://your-worker-url/api/sync/your-sync-id
```

第一次访问一个不存在的 sync id，返回 404 是正常的；这表示接口存在，但云端还没有对应数据。

## 3. 第一次打开与恢复旧历史

1. 打开部署后的 Worker URL。
2. 点击右上角 `保存 / Keep`。
3. 点击 `恢复旧历史 / Restore old history`。
4. 输入旧历史口令：

```text
3G5S-XW2R-V6RQ-QVXU
```

5. 点击 `解锁 / Unlock`。
6. 成功后会提示恢复了多少天记录。

注意：旧历史口令只用于恢复打包在 App 里的 `history-v1.enc.json`。它不是云同步的 Sync ID，也不是同步密语。

## 4. 设置电脑和手机同步

先在已经有数据的设备上操作。

1. 打开 App。
2. 点击 `保存 / Keep`。
3. 在 `加密同步 / Encrypted sync` 里填写：

```text
Sync ID: lily-vitality
Sync passphrase: 自己设置一个至少 10 个字符的密语
```

4. 点击 `Push / 推送`，把本设备数据加密后推到云端。
5. 在另一台设备打开同一个部署网址。
6. 填入完全相同的 Sync ID 和 Sync passphrase。
7. 点击 `Pull / 拉取`。
8. 之后两台设备都可以使用 `Sync now / 立即同步`。

## 5. 安装到 iPhone 主屏幕

1. 在 iPhone 的 Safari 中打开部署后的 HTTPS 地址。
2. 点击 Safari 底部的分享按钮。
3. 选择 `Add to Home Screen / 添加到主屏幕`。
4. 名称可保留 `Vitality Journal`。
5. 从主屏幕打开。

语音输入建议直接使用 iPhone 键盘自带的听写按钮。Safari 对网页自定义语音按钮支持不稳定。

## 6. 更新后手机仍显示旧版本怎么办

按顺序尝试：

1. 在手机 App 中完全退出后重开。
2. 在 Safari 打开部署网址，刷新一次。
3. 如果仍旧，删除主屏幕图标，再重新 `Add to Home Screen`。
4. 如果还不行，在 Cloudflare 重新 Deploy，并确认 `sw.js` 已更新到：

```text
vitality-journal-20260708-bilingual-1
```

## 7. 安全与备份

- 同步密语丢失后，云端加密数据无法解开。
- 旧历史口令和同步密语是两套东西。
- 最稳妥的离线备份仍然是：`保存 / Keep > Backup JSON`。
- 同步是合并逻辑：同一条记录如果在两台设备都编辑过，较新的 `updated_at` 会胜出。

## 8. 官方参考

- Cloudflare Workers Static Assets: https://developers.cloudflare.com/workers/static-assets/
- Cloudflare Workers Wrangler assets configuration: https://developers.cloudflare.com/workers/wrangler/configuration/#assets
- Cloudflare Pages Functions Bindings: https://developers.cloudflare.com/pages/functions/bindings/