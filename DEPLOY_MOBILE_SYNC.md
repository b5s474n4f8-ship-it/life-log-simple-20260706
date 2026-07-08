# Vitality Journal 手机部署与同步指引

这个 App 是一个静态 PWA，可以部署到 Cloudflare Pages。同步功能使用 Cloudflare Pages Functions + KV；云端只保存加密后的 JSON envelope，明文日志不会上传到服务器。

## 0. 本次版本更新

- 加入中文 / English 切换。
- 在 `Keep / 保存` 面板中加入 `Restore old history / 恢复旧历史` 按钮。
- 旧历史口令输入更宽容：大小写、漏掉短横线、中文输入法长横线都会自动规范化。
- 你给的旧历史口令 `3G5S-XW2R-V6RQ-QVXU` 已本地验证可以解开 `history-v1.enc.json`，可恢复 11 天历史记录。
- 更新了 PWA 缓存版本，避免手机继续读取旧缓存。

## 1. 准备 Cloudflare Pages 项目

1. 打开 Cloudflare Dashboard。
2. 进入 `Workers & Pages`。
3. 点击 `Create application`。
4. 选择 `Pages`。
5. 选择一种部署方式：
   - 推荐：连接 Git 仓库。
   - 临时方式：直接上传 `life-log-simple-20260706` 文件夹。
6. 项目根目录选择：`life-log-simple-20260706`。
7. Build command 留空。
8. Build output directory 填：`.`
9. 点击 Deploy。

部署后会得到一个地址，类似：

```text
https://your-project.pages.dev
```

## 2. 配置 KV，同步手机和电脑

1. 在 Cloudflare Dashboard 进入 `Workers & Pages`。
2. 找到 `KV` 或 `Storage & Databases > KV`。
3. 新建一个 KV namespace，例如：

```text
vitality_journal_sync
```

4. 回到你的 Pages 项目。
5. 进入 `Settings`。
6. 找到 `Functions` 或 `Bindings`。
7. 添加 KV namespace binding：

```text
Variable name: VITALITY_SYNC
KV namespace: vitality_journal_sync
```

8. 保存设置。
9. 重新 Deploy 一次。

同步接口应该可以访问：

```text
https://your-project.pages.dev/api/sync/your-sync-id
```

如果未配置 KV，App 本身仍能本地使用，但 `Pull / Push / Sync now` 不会工作。

## 3. 第一次打开与恢复旧历史

1. 用浏览器打开部署后的 HTTPS 地址。
2. 点击右上角 `保存 / Keep`。
3. 点击 `恢复旧历史 / Restore old history`。
4. 输入旧历史口令：

```text
3G5S-XW2R-V6RQ-QVXU
```

5. 点击 `解锁 / Unlock`。
6. 成功后会提示恢复了多少天记录。

注意：这个旧历史口令只用于恢复打包在 App 里的旧历史文件 `history-v1.enc.json`。它不是云同步的 Sync ID，也不是同步密语。

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
4. 如果还不行，在 Cloudflare Pages 重新 Deploy，并确认 `sw.js` 已更新到 `vitality-journal-20260708-bilingual-1`。

## 7. 安全与备份

- 同步密语丢失后，云端加密数据无法解开。
- 旧历史口令和同步密语是两套东西。
- 最稳妥的离线备份仍然是：`保存 / Keep > Backup JSON`。
- 同步是合并逻辑：同一条记录如果在两台设备都编辑过，较新的 `updated_at` 会胜出。
## 8. 官方参考

- Cloudflare Pages Functions Bindings: https://developers.cloudflare.com/pages/functions/bindings/
- Cloudflare Pages Build configuration: https://developers.cloudflare.com/pages/configuration/build-configuration/
- Cloudflare Workers KV bindings: https://developers.cloudflare.com/kv/concepts/kv-bindings/