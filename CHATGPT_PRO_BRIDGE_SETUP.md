# ChatGPT Pro Bridge Setup

这个方案用于在不额外购买 OpenAI API 额度的情况下，让 ChatGPT Pro 负责 LifeLog / Priming 的高质量整理，并把结果保存回 Vitality Journal。

## 你日常怎么用

1. 打开你创建的 Custom GPT。
2. 直接说或粘贴：
   - `今天的 LifeLog：...`
   - `今天的 Priming：...`
   - `补记 2026-07-09：...`
3. Custom GPT 会整理并调用 Action 保存到 Vitality Journal Bridge。
4. 打开 Vitality Journal App。
5. 点右上角 `保存 / Keep`。
6. 在 `ChatGPT Pro Bridge` 里点 `拉取 GPT 结果 / Pull GPT results`。
7. 结果会合并进 App，可以在 `看见 / 定向 / 趋势 / 语料` 里查看、编辑、复制、导出。

## 一次性部署配置

### 1. 设置 Cloudflare Secret

在 Cloudflare Worker 项目里添加一个 Secret：

```text
GPT_ACTION_TOKEN
```

值可以自己设一个长一点的随机字符串，例如：

```text
vj_2026_lily_private_bridge_change_me
```

不要把这个 token 上传到 GitHub。

### 2. 部署最新代码

确保这些文件已经上传到 GitHub / Cloudflare：

```text
index.html
app.js
styles.css
worker.js
sw.js
wrangler.toml
CUSTOM_GPT_INSTRUCTIONS.md
CHATGPT_PRO_BRIDGE_SETUP.md
```

部署成功后，访问：

```text
https://你的-worker域名/gpt-action-openapi.json
```

你会看到一份 OpenAPI schema。复制整份内容。

### 3. 创建 Custom GPT

在 ChatGPT 里创建一个新的 GPT：

```text
Name: Vitality Journal Bridge
Description: LifeLog and Priming sensemaking bridge for Vitality Journal.
```

把 `CUSTOM_GPT_INSTRUCTIONS.md` 的内容复制到 Instructions。

### 4. 添加 Action

在 GPT Builder 里添加 Action：

- Schema：粘贴 `https://你的-worker域名/gpt-action-openapi.json` 里复制出来的 schema。
- Authentication：选择 `API Key` 或 Bearer token 形式。
- API Key / Token：填你在 Cloudflare 设置的同一个 `GPT_ACTION_TOKEN`。

如果界面要求 header/name，使用：

```text
Authorization: Bearer 你的_GPT_ACTION_TOKEN
```

### 5. 在 App 里保存 Bridge 设置

打开 Vitality Journal App：

1. 点 `保存 / Keep`。
2. 找到 `ChatGPT Pro Bridge`。
3. Bridge ID 填一个稳定 ID，例如：

```text
lily-vitality
```

4. Bridge token 填同一个 `GPT_ACTION_TOKEN`。
5. 点 `保存桥接 / Save bridge`。

之后 Custom GPT 每次保存时都使用同一个 Bridge ID。

## 如果 Action 没跑通

使用备用路径：

1. 在 App 里点 `复制给 GPT 的提示 / Copy GPT prompt`。
2. 粘贴到 ChatGPT。
3. 让 ChatGPT 返回 `{ "records": [...] }` JSON。
4. 复制 JSON。
5. 回 App，在 `手动导入兜底 / Manual import fallback` 粘贴并导入。

## 隐私说明

- 原来的同步仍然是客户端加密后上传。
- ChatGPT Pro Bridge 收件箱是 token-protected，但不是用你的同步密语做端到端加密。
- 不要在 LifeLog / Priming 里写银行卡号、验证码、证件号、登录密码、私钥等敏感信息。
- 如果你更重视私密性，可以只使用“手动导入兜底”，不启用 Action 自动保存。