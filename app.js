const DB_NAME = "vitality-journal-db";
const DB_STORE = "state";
const DB_KEY = "app";
const FALLBACK_KEY = "vitality-journal-fallback";
const LEGACY_DB_NAME = "life-log-v5";
const HISTORY_URL = "./history-v1.enc.json";
const HISTORY_ID = "encrypted-history-v1";
const HISTORY_AAD = new TextEncoder().encode("life-log-history-v1");
const SYNC_API_BASE = "./api/sync";
const AI_EXTRACT_API = "./api/extract";
const AI_PRIME_API = "./api/prime";
const GPT_BRIDGE_API = "./api/gpt/inbox";
const SYNC_ITERATIONS = 250000;

const LANGUAGE_KEY = "vitality-journal-language";
const I18N = {
  en: {
    back_today: "Back to today", main_workspace: "Main workspace", utilities: "Utilities", language: "Language",
    tab_observe: "Observe", tab_orient: "Orient", tab_lens: "Lens", tab_corpus: "Corpus", keep: "Keep",
    observe_title: "Record what wants to be seen", today: "Today", trace_label: "Add a LifeLog trace",
    trace_placeholder: "One sentence, one scene, one body signal, one thought. Leave it here first.", optional_tags: "Optional tags",
    save_trace: "Save trace", voice: "Voice", stop: "Stop", clear: "Clear", today_section: "Today", neutral_extraction: "Neutral extraction",
    refresh: "Refresh", protocol_note: "The app observes and organizes. It does not diagnose, rate, or label you.",
    orient_title: "Turn today into an action line", new: "New", priming_label: "Morning or pre-task priming",
    priming_placeholder: "Say the thoughts, plans, and possible resistance in your head.", generate_action_line: "Generate action line",
    save: "Save", recent_signals: "Recent signals", action_line: "Action line", not_generated: "Not generated", generated: "Generated",
    evening_check_label: "Two-minute evening check", outcome_placeholder: "What actually happened today? Did the action line help?", save_check: "Save check",
    lens_title: "Patterns over time", time_range: "Time range", range_7: "7 days", range_30: "30 days", possible_observations: "Possible observations",
    recording_rhythm: "Recording rhythm", by_date: "by date", corpus_title: "Personal corpus", copy_corpus: "Copy shown", export_corpus: "Export corpus", search_corpus: "Search corpus",
    corpus_placeholder: "Search original words, questions, body signals, contexts", backup_sync_title: "Backup and sync", close: "Close",
    dialog_copy: "Your journal stays on this device by default. Cloud sync stores only encrypted data.", export_markdown: "Export Markdown", backup_json: "Backup JSON", restore_json: "Restore JSON",
    restore_old_history: "Restore old history", history_help_title: "Old history code", history_help_copy: "Use the old unlock code only for the bundled history package. It is different from cloud Sync ID and Sync passphrase.",
    encrypted_sync: "Encrypted sync", sync_id: "Sync ID", sync_id_placeholder: "for example lily-vitality", sync_passphrase: "Sync passphrase", sync_passphrase_placeholder: "Used only on this device",
    save_settings: "Save settings", sync_now: "Sync now", pull: "Pull", push: "Push", sync_help: "Use the same Sync ID and passphrase on iPhone and computer.",
    unlock_copy: "Enter the old unlock code to restore the bundled encrypted history on this device.", unlock_code: "Unlock code", later: "Later", unlock: "Unlock", unlocking: "Unlocking",
    date_today: "Today", date_history: "History", trace_count: "{count} trace{plural}", empty_traces: "No traces yet. One sentence is enough.", legacy: "Legacy", lifelog: "LifeLog",
    extract_placeholder: "Observed signals appear here.", old_history_restored: "Old history restored: {days} days merged.", unlock_wrong: "Unlock code is not correct. Use the old history code, not the cloud sync passphrase.", unlock_hint: "Tip: this code is separate from Sync ID and Sync passphrase.", old_history_already: "Old history is already merged. You can restore again if you want to re-check it.", processing_device: "Processing on this device.", secure_unlock_unsupported: "Secure unlock is not supported in this browser.", history_load_failed: "History package could not be loaded.", unlock_failed: "Unlock failed.", saved_locally: "Saved locally: {dates} days, {traces} traces, {primings} primings.", local_only: "Local only", last_sync: "Last sync {time}", enter_sync_id: "Enter a Sync ID.", passphrase_rule: "Use a sync passphrase with at least 10 characters.", voice_unsupported: "Voice capture is not supported here. Use iPhone dictation in the keyboard.", ai_sensemake: "AI organize", refresh_local: "Local refresh", ai_status_local: "Local draft", ai_status_done: "AI organized", ai_status_working: "Organizing...", ai_missing_key: "AI key is not configured. Local draft is still available.", ai_invalid_key: "OpenAI key is invalid. In Cloudflare, OPENAI_API_KEY must be the sk-... key, not the model name. Local draft is still available.", ai_model_error: "The AI model setting needs attention. The app now uses gpt-5.6. Local draft is still available.", ai_rate_limited: "OpenAI quota or rate limit blocked the AI call. Local draft is still available.", ai_unavailable: "AI is unavailable. Local draft is still available.", ai_done_toast: "AI organized the trace. You can edit any field.", ai_empty: "Save one trace before AI organizing.", daily_brief_empty: "No compact observation yet. Save a trace or refresh.", key_points_title: "Key points", signals_title: "Signals", edit_extract_fields: "Edit extraction fields", extraction_method_local: "Local draft", extraction_method_ai: "AI organized", no_recent_signals: "Not enough recent traces yet. This priming will use the current text first.", no_matching_corpus: "No matching corpus item yet.", no_corpus: "No corpus to copy yet.", corpus_copied: "Corpus copied.", clipboard_unavailable: "Clipboard is unavailable. Use export instead.", entry_date: "Record date", backfill_hint: "Backfill any missed day anytime.", ai_generate_action_line: "AI orient", local_action_line: "Local action line", priming_method_ai: "AI oriented", priming_method_local: "Local draft", priming_ai_done_toast: "AI oriented the priming. You can edit any field.", priming_ai_fallback: "AI is unavailable. Local action line is ready.", priming_ai_missing_key: "AI key is not configured. Local action line is ready.", priming_empty: "Write or dictate a short priming first.", date_changed: "Date changed."
  },
  zh: {
    back_today: "回到今天", main_workspace: "主工作区", utilities: "工具", language: "语言",
    tab_observe: "看见", tab_orient: "定向", tab_lens: "趋势", tab_corpus: "语料", keep: "保存",
    observe_title: "记录此刻想被看见的东西", today: "今天", trace_label: "添加一条生命力记录",
    trace_placeholder: "一句话、一个场景、一个身体信号、一个念头。先放在这里就好。", optional_tags: "可选标签",
    save_trace: "保存记录", voice: "语音", stop: "停止", clear: "清空", today_section: "今天", neutral_extraction: "中性抽取",
    refresh: "刷新", protocol_note: "App 只观察和整理，不诊断、不打分、不贴标签。",
    orient_title: "把今天转成一条行动线", new: "新建", priming_label: "早晨或任务前 Priming",
    priming_placeholder: "把脑中的想法、计划和可能的阻力说出来或写下来。", generate_action_line: "生成行动线",
    save: "保存", recent_signals: "近期信号", action_line: "行动线", not_generated: "尚未生成", generated: "已生成",
    evening_check_label: "晚间两分钟回看", outcome_placeholder: "今天实际发生了什么？这条行动线有没有帮助？", save_check: "保存回看",
    lens_title: "看见一段时间里的模式", time_range: "时间范围", range_7: "7 天", range_30: "30 天", possible_observations: "可能的观察",
    recording_rhythm: "记录节奏", by_date: "按日期", corpus_title: "个人语料库", copy_corpus: "复制当前语料", export_corpus: "导出语料", search_corpus: "搜索语料",
    corpus_placeholder: "搜索原话、问题、身体信号、场景", backup_sync_title: "备份与同步", close: "关闭",
    dialog_copy: "你的记录默认保存在这台设备上。云同步只保存加密后的数据。", export_markdown: "导出 Markdown", backup_json: "备份 JSON", restore_json: "恢复 JSON",
    restore_old_history: "恢复旧历史", history_help_title: "旧历史口令", history_help_copy: "旧历史口令只用于恢复随 App 打包的历史记录；它和云同步的 Sync ID / 同步密语不是一回事。",
    encrypted_sync: "加密同步", sync_id: "Sync ID", sync_id_placeholder: "例如 lily-vitality", sync_passphrase: "同步密语", sync_passphrase_placeholder: "只在本设备用于加密/解密",
    save_settings: "保存设置", sync_now: "立即同步", pull: "拉取", push: "推送", sync_help: "手机和电脑使用同一个 Sync ID 与同步密语。",
    unlock_copy: "输入旧历史口令，把随 App 打包的加密历史恢复到这台设备。", unlock_code: "旧历史口令", later: "稍后", unlock: "解锁", unlocking: "解锁中",
    date_today: "今天", date_history: "历史", trace_count: "{count} 条记录", empty_traces: "还没有记录。一句话就够。", legacy: "旧历史", lifelog: "生命力日志",
    extract_placeholder: "观察到的信号会出现在这里。", old_history_restored: "旧历史已恢复：合并了 {days} 天记录。", unlock_wrong: "口令不正确。这里需要旧历史口令，不是云同步密语。", unlock_hint: "提示：这个口令和 Sync ID / 同步密语是分开的。", old_history_already: "旧历史已经合并过。你仍然可以再次恢复来重新检查。", processing_device: "正在本设备处理。", secure_unlock_unsupported: "这个浏览器不支持安全解锁。", history_load_failed: "无法加载历史包。", unlock_failed: "解锁失败。", saved_locally: "本地已保存：{dates} 天，{traces} 条记录，{primings} 条 Priming。", local_only: "仅本地", last_sync: "上次同步 {time}", enter_sync_id: "请输入 Sync ID。", passphrase_rule: "同步密语至少需要 10 个字符。", voice_unsupported: "这里不支持 App 内语音输入。iPhone 上可以用键盘自带听写。", ai_sensemake: "AI 整理", refresh_local: "本地刷新", ai_status_local: "本地草稿", ai_status_done: "AI 已整理", ai_status_working: "整理中...", ai_missing_key: "还没配置 AI key，已保留本地草稿。", ai_invalid_key: "OpenAI key 填错了：Cloudflare 里的 OPENAI_API_KEY 必须填 sk- 开头的真实 key，不是模型名。已保留本地草稿。", ai_model_error: "AI 模型配置需要更新。App 现在默认使用 gpt-5.6，已保留本地草稿。", ai_rate_limited: "OpenAI 额度或限速阻止了 AI 调用，已保留本地草稿。", ai_unavailable: "AI 暂时不可用，已保留本地草稿。", ai_done_toast: "AI 已整理，可以继续编辑。", ai_empty: "先保存一条记录，再做 AI 整理。", daily_brief_empty: "还没有压缩观察。保存记录或刷新即可生成。", key_points_title: "要点", signals_title: "信号", edit_extract_fields: "编辑抽取字段", extraction_method_local: "本地草稿", extraction_method_ai: "AI 已整理", no_recent_signals: "近期记录还不够。Priming 会先使用当前文字。", no_matching_corpus: "还没有匹配的语料。", no_corpus: "还没有可复制的语料。", corpus_copied: "语料已复制。", clipboard_unavailable: "剪贴板不可用，请使用导出。", entry_date: "记录日期", backfill_hint: "漏记的日子可以随时回溯补上。", ai_generate_action_line: "AI 定向", local_action_line: "本地行动线", priming_method_ai: "AI 已定向", priming_method_local: "本地草稿", priming_ai_done_toast: "AI 已整理 Priming，可以继续编辑。", priming_ai_fallback: "AI 暂时不可用，已生成本地行动线。", priming_ai_missing_key: "还没配置 AI key，已生成本地行动线。", priming_empty: "先写下或口述一小段 Priming。", date_changed: "日期已切换。"
  }
};
const BRIDGE_TEXT = {
  en: {
    title: "ChatGPT Pro Bridge",
    statusReady: "Ready",
    statusMissing: "Not connected",
    copy: "Use ChatGPT Pro for high-quality sensemaking, then pull the organized results back into this journal.",
    save: "Save bridge",
    pull: "Pull GPT results",
    prompt: "Copy GPT prompt",
    fallback: "Manual import fallback",
    fallbackCopy: "If Actions are not available, ask ChatGPT to return bridge JSON and paste it here.",
    importJson: "Import GPT JSON",
    enterId: "Enter a Bridge ID.",
    enterToken: "Enter the Bridge token.",
    saved: "Bridge settings saved on this device.",
    pulling: "Pulling GPT results...",
    pulled: "GPT results merged: {count} item(s).",
    empty: "No GPT results found yet.",
    failed: "GPT Bridge needs attention.",
    promptCopied: "Prompt copied for ChatGPT.",
    imported: "GPT JSON imported: {count} item(s).",
    badJson: "Could not read the GPT JSON."
  },
  zh: {
    title: "ChatGPT Pro Bridge",
    statusReady: "已连接",
    statusMissing: "未连接",
    copy: "用 ChatGPT Pro 做高质量整理，再把整理结果拉回这个 Journal 保存、查看和导出。",
    save: "保存桥接",
    pull: "拉取 GPT 结果",
    prompt: "复制给 GPT 的提示",
    fallback: "手动导入兜底",
    fallbackCopy: "如果 Actions 暂时不可用，让 ChatGPT 返回 bridge JSON，然后粘贴到这里。",
    importJson: "导入 GPT JSON",
    enterId: "请输入 Bridge ID。",
    enterToken: "请输入 Bridge token。",
    saved: "桥接设置已保存在本设备。",
    pulling: "正在拉取 GPT 结果...",
    pulled: "GPT 结果已合并：{count} 条。",
    empty: "还没有找到 GPT 结果。",
    failed: "GPT Bridge 需要检查。",
    promptCopied: "给 ChatGPT 的提示已复制。",
    imported: "GPT JSON 已导入：{count} 条。",
    badJson: "无法读取 GPT JSON。"
  }
};
function bt(key, values = {}) { const template = BRIDGE_TEXT[currentLanguage]?.[key] ?? BRIDGE_TEXT.en[key] ?? key; return template.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? ""); }
function preferredLanguage() { try { return localStorage.getItem(LANGUAGE_KEY) || ((navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en"); } catch { return "zh"; } }
function locale() { return currentLanguage === "zh" ? "zh-CN" : "en-US"; }
function t(key, values = {}) { const template = I18N[currentLanguage]?.[key] ?? I18N.en[key] ?? key; return template.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? ""); }
function aiFailureMessage(payload, kind = "extract") {
  const code = payload?.code || "";
  if (code === "missing_openai_key") return kind === "prime" ? t("priming_ai_missing_key") : t("ai_missing_key");
  if (code === "invalid_openai_key") return t("ai_invalid_key");
  if (code === "invalid_openai_model") return t("ai_model_error");
  if (code === "openai_rate_limited") return t("ai_rate_limited");
  return kind === "prime" ? t("priming_ai_fallback") : t("ai_unavailable");
}
function labelFor(item) { return currentLanguage === "zh" ? (item.zh || item.label) : item.label; }
function extractionSourceLabel(method) {
  if (method === "ai") return t("extraction_method_ai");
  if (method === "chatgpt") return currentLanguage === "zh" ? "ChatGPT 整理" : "ChatGPT";
  return currentLanguage === "zh" ? "本地整理" : "Local";
}
function actionMethodLabel(method) {
  if (method === "ai") return t("priming_method_ai");
  if (method === "chatgpt") return currentLanguage === "zh" ? "ChatGPT 定向" : "ChatGPT";
  if (method === "local") return t("priming_method_local");
  return t("generated");
}
function applyI18n() { document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en"; document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); }); document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); }); document.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); }); document.querySelectorAll("[data-lang]").forEach((button) => button.classList.toggle("active", button.dataset.lang === currentLanguage)); }
function setLanguage(language) { currentLanguage = language === "en" ? "en" : "zh"; try { localStorage.setItem(LANGUAGE_KEY, currentLanguage); } catch {} if (state?.settings) state.settings.language = currentLanguage; renderAll(); schedulePersist(); }
function normalizeUnlockCode(value) { const clean = String(value || "").trim().replace(/[－–—]/g, "-").replace(/\s+/g, "").toUpperCase(); const compact = clean.replace(/-/g, ""); return /^[A-Z0-9]{16}$/.test(compact) ? compact.match(/.{1,4}/g).join("-") : clean; }
function countHistoryDays(incoming) { const normalized = normalizeState(incoming); return Object.values(normalized.days || {}).filter((day) => day.traces?.length || day.primings?.length).length; }
const QUICK_TAGS = [
  { id: "body", label: "Body", zh: "身体" },
  { id: "work", label: "Work", zh: "工作" },
  { id: "relationship", label: "Relationship", zh: "关系" },
  { id: "faith", label: "Faith", zh: "信仰" },
  { id: "creation", label: "Creation", zh: "创作" },
  { id: "sleep", label: "Sleep", zh: "睡眠" },
  { id: "movement", label: "Movement", zh: "运动" },
  { id: "dream", label: "Dream", zh: "梦境" },
  { id: "media", label: "Books/Media", zh: "书影音" },
  { id: "idea", label: "Idea", zh: "灵感" },
];

const EXTRACTION_DEFS = [
  { id: "daily_brief", label: "Daily brief", zh: "今日观察" },
  { id: "key_points", label: "Key points", zh: "压缩要点" },
  { id: "contexts", label: "Contexts", zh: "场景" },
  { id: "events", label: "Events", zh: "事件" },
  { id: "body_signals", label: "Body signals", zh: "身体信号" },
  { id: "energy_signal", label: "Vitality signal", zh: "生命力信号" },
  { id: "emotion_words", label: "Emotion words", zh: "情绪词" },
  { id: "life_giving_moments", label: "Life-giving moments", zh: "让人展开的时刻" },
  { id: "draining_moments", label: "Draining moments", zh: "消耗或收缩的时刻" },
  { id: "questions", label: "Questions", zh: "留下的问题" },
  { id: "user_phrases", label: "Original phrases", zh: "值得保留的原话" },
];

const ACTION_DEFS = [
  { id: "mainline", label: "Main line", zh: "今日主线" },
  { id: "top_tasks", label: "Top 1-3 tasks", zh: "今天最重要的 1-3 件事" },
  { id: "first_action", label: "First action", zh: "第一步动作" },
  { id: "possible_resistance", label: "Possible resistance", zh: "可能出现的阻力" },
  { id: "if_resistance", label: "If resistance appears", zh: "如果阻力出现" },
  { id: "not_today", label: "Not today", zh: "今天不需要做" },
  { id: "finish_standard", label: "Finish standard", zh: "结束标准" },
];

const CONTEXT_KEYWORDS = {
  Work: ["work", "meeting", "project", "contract", "email", "task", "PPA", "SPA", "\u5de5\u4f5c", "\u4f1a\u8bae", "\u9879\u76ee", "\u90ae\u4ef6", "\u4efb\u52a1"],
  Relationship: ["relationship", "friend", "family", "mother", "father", "\u5173\u7cfb", "\u670b\u53cb", "\u7236\u6bcd", "\u5988\u5988", "\u7238\u7238"],
  Body: ["body", "stomach", "sleep", "tired", "pain", "\u8eab\u4f53", "\u80c3", "\u7761\u7720", "\u7d2f", "\u75bc", "\u5395\u6240"],
  Faith: ["faith", "pray", "God", "church", "\u4fe1\u4ef0", "\u7977\u544a", "\u795e", "\u6559\u4f1a"],
  Creation: ["write", "article", "create", "corpus", "\u5199", "\u6587\u7ae0", "\u521b\u4f5c", "\u8bed\u6599"],
  English: ["English", "class", "demo", "teaching", "\u82f1\u8bed", "\u8bfe\u5802", "\u8bd5\u8bb2", "\u6559\u5b66"],
  System: ["AI", "app", "system", "sync", "Priming", "LifeLog", "\u7cfb\u7edf", "\u540c\u6b65", "\u5206\u6790"],
};

const CONTEXT_LABELS = {
  Work: { en: "Work", zh: "工作" },
  Relationship: { en: "Relationship", zh: "关系" },
  Body: { en: "Body", zh: "身体" },
  Faith: { en: "Faith", zh: "信仰" },
  Creation: { en: "Creation", zh: "创作" },
  English: { en: "English", zh: "英语/教学" },
  System: { en: "System", zh: "系统/AI" }
};

const BODY_WORDS = ["stomach", "sleep", "tired", "pain", "tense", "body", "\u80c3", "\u80a0\u80c3", "\u5395\u6240", "\u7761\u7720", "\u5931\u7720", "\u7d2f", "\u75bc", "\u7d27\u7ef7", "\u8eab\u4f53"];
const EMOTION_WORDS = ["calm", "grateful", "clear", "anxious", "tense", "low", "stuck", "\u5e73\u5b89", "\u611f\u6069", "\u6e05\u695a", "\u7126\u8651", "\u7d27\u5f20", "\u4f4e\u843d", "\u5361"];
const LIFE_GIVING_WORDS = ["clear", "alive", "calm", "grateful", "walk", "finished", "\u6e05\u695a", "\u751f\u547d\u529b", "\u5e73\u5b89", "\u611f\u6069", "\u6563\u6b65", "\u5b8c\u6210", "\u770b\u89c1"];
const DRAINING_WORDS = ["tired", "anxious", "tense", "stuck", "delay", "resistance", "pressure", "\u7d2f", "\u7126\u8651", "\u7d27\u5f20", "\u5361", "\u62d6\u5ef6", "\u963b\u529b", "\u538b\u529b", "\u81ea\u8d23"];

const $ = (selector) => document.querySelector(selector);
let db = null;
let currentLanguage = preferredLanguage();
let state = createEmptyState();
let currentDate = todayKey();
let lastToday = currentDate;
let currentMode = "observe";
let selectedTags = new Set();
let editingTraceId = null;
let activePrimingId = null;
let lensRange = 7;
let toastTimer = null;
let saveTimer = null;
let recognition = null;
let recognizing = false;

function createEmptyState() {
  return { version: 7, days: {}, settings: { sync: {}, language: currentLanguage }, migrations: [], seed_ids: [] };
}
function emptyDay(date) {
  const now = new Date().toISOString();
  return { date, traces: [], extraction: null, primings: [], metadata: { created_at: now, updated_at: now } };
}
function makeId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function dateFromKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}
function formatDate(key, options) {
  return new Intl.DateTimeFormat(locale(), options).format(dateFromKey(key));
}
function formatDateTime(value) {
  try { return new Intl.DateTimeFormat(locale(), { hour: "2-digit", minute: "2-digit" }).format(new Date(value)); }
  catch { return "now"; }
}
function recordedDates() {
  return Object.keys(state.days).filter((date) => state.days[date]?.traces?.length || state.days[date]?.primings?.length).sort().reverse();
}
function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
function normalizeState(value = {}) {
  if (value.version === 7 && value.days) return normalizeV7(value);
  if (value.version === 6 && value.days) return normalizeV6(value);
  if (value.daily_logs_by_date) return migrateLegacyState(value);
  return createEmptyState();
}
function normalizeV7(value) {
  const next = { ...createEmptyState(), ...value, days: value.days || {}, settings: { sync: {}, ...(value.settings || {}) }, migrations: Array.isArray(value.migrations) ? value.migrations : [], seed_ids: Array.isArray(value.seed_ids) ? value.seed_ids : [] };
  Object.keys(next.days).forEach((date) => { next.days[date] = normalizeDay(next.days[date], date); });
  return next;
}
function normalizeV6(value) {
  const next = normalizeV7({ ...value, version: 7, settings: { sync: {}, ...(value.settings || {}) } });
  if (!next.migrations.includes("v6-to-v7")) next.migrations.push("v6-to-v7");
  return next;
}
function normalizeDay(day, date) {
  const base = emptyDay(date || day.date || todayKey());
  const next = { ...base, ...day, date: date || day.date || base.date };
  next.traces = Array.isArray(day.traces) ? day.traces.map(normalizeTrace).filter((item) => item.text.trim()) : [];
  next.primings = Array.isArray(day.primings) ? day.primings.map(normalizePriming) : [];
  next.extraction = day.extraction || null;
  next.metadata = day.metadata || base.metadata;
  return next;
}
function normalizeTrace(trace) {
  const now = new Date().toISOString();
  return { id: trace.id || makeId(), created_at: trace.created_at || trace.createdAt || now, updated_at: trace.updated_at || trace.updatedAt || trace.created_at || now, text: String(trace.text || trace.raw_input || ""), tags: Array.isArray(trace.tags) ? trace.tags : [], source: trace.source || "manual" };
}
function normalizePriming(session) {
  const now = new Date().toISOString();
  return { id: session.id || makeId(), created_at: session.created_at || session.createdAt || now, updated_at: session.updated_at || session.updatedAt || now, raw: session.raw || session.rawTranscript || "", action_line: session.action_line || cardsToActionLine(session.cards) || emptyActionLine(), action_method: session.action_method || session.method || "", outcome: session.outcome || "" };
}
function migrateLegacyState(value) {
  const next = createEmptyState();
  next.settings = { sync: {}, ...(value.settings || {}) };
  next.migrations = Array.isArray(value.migrations) ? value.migrations : [];
  next.seed_ids = Array.isArray(value.seed_ids) ? value.seed_ids : [];
  Object.entries(value.daily_logs_by_date || {}).forEach(([date, log]) => {
    const day = emptyDay(date);
    const text = String(log.raw_input || "").trim();
    if (text) {
      day.traces.push({ id: makeId(), created_at: log.metadata?.created_at || `${date}T12:00:00.000Z`, updated_at: log.metadata?.updated_at || log.metadata?.created_at || `${date}T12:00:00.000Z`, text, tags: [], source: "legacy-life-log" });
      day.extraction = buildExtraction(day);
    }
    next.days[date] = day;
  });
  if (!next.migrations.includes("legacy-v5-to-v7")) next.migrations.push("legacy-v5-to-v7");
  return next;
}
function cardsToActionLine(cards = []) {
  if (!Array.isArray(cards) || !cards.length) return null;
  const map = {};
  cards.forEach((card) => { map[card.id] = card.text || ""; });
  return { mainline: map.mainTask || "", top_tasks: map.processSteps || "", first_action: map.firstAction || "", possible_resistance: map.likelyResistance || "", if_resistance: map.ifThenPlan || "", not_today: map.supportPlan || "", finish_standard: map.doneDefinition || map.todayArtifact || "" };
}
function emptyActionLine() { return Object.fromEntries(ACTION_DEFS.map((def) => [def.id, ""])); }
function ensureDay(date = currentDate) {
  if (!state.days[date]) state.days[date] = emptyDay(date);
  return state.days[date];
}
function openDb(name = DB_NAME) {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) return reject(new Error("IndexedDB unavailable"));
    const request = indexedDB.open(name, 1);
    request.onupgradeneeded = () => {
      const next = request.result;
      if (!next.objectStoreNames.contains(DB_STORE)) next.createObjectStore(DB_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
function idbGet(database, key) {
  return new Promise((resolve, reject) => {
    const tx = database.transaction(DB_STORE, "readonly");
    const request = tx.objectStore(DB_STORE).get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}
function idbPut(database, key, value) {
  return new Promise((resolve, reject) => {
    const tx = database.transaction(DB_STORE, "readwrite");
    tx.objectStore(DB_STORE).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
async function loadState() {
  try {
    db = await openDb(DB_NAME);
    const saved = await idbGet(db, DB_KEY);
    if (saved) return normalizeState(saved);
  } catch { db = null; }
  try {
    const legacyDb = await openDb(LEGACY_DB_NAME);
    const legacySaved = await idbGet(legacyDb, DB_KEY);
    legacyDb.close();
    if (legacySaved) return normalizeState(legacySaved);
  } catch {}
  try {
    const fallback = JSON.parse(localStorage.getItem(FALLBACK_KEY) || "null") || JSON.parse(localStorage.getItem("life-log-v5-fallback") || "null");
    if (fallback) return normalizeState(fallback);
  } catch {}
  return createEmptyState();
}
async function persistState() {
  try {
    if (!db) db = await openDb(DB_NAME);
    await idbPut(db, DB_KEY, state);
  } catch {
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(state));
  }
  renderStorageSummary();
}
function schedulePersist() { clearTimeout(saveTimer); saveTimer = setTimeout(() => persistState(), 260); }
function showToast(message) {
  clearTimeout(toastTimer);
  const toast = $("#toast");
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2300);
}
function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll(".mode-tab").forEach((button) => button.classList.toggle("active", button.dataset.mode === mode));
  document.querySelectorAll(".mode-panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === mode));
  if (mode === "orient") renderOrient();
  if (mode === "lens") renderLens();
  if (mode === "corpus") renderCorpus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function renderAll() {
  renderDateControl(); renderQuickTags(); renderObserve(); renderOrient(); renderLens(); renderCorpus(); renderSyncSettings(); renderStorageSummary(); applyI18n();
}
function renderQuickTags() {
  $("#quick-tags").innerHTML = QUICK_TAGS.map((tag) => `<button class="tag-chip ${selectedTags.has(tag.id) ? "active" : ""}" type="button" data-tag="${tag.id}">${labelFor(tag)}</button>`).join("");
}
function renderDateControl() {
  const input = $("#entry-date");
  if (!input) return;
  input.max = todayKey();
  if (input.value !== currentDate) input.value = currentDate;
}
function renderObserve() {
  const day = ensureDay(currentDate);
  const isToday = currentDate === todayKey();
  $("#date-meta").textContent = `${isToday ? t("date_today") : t("date_history")} · ${formatDate(currentDate, { weekday: "long" })} · ${formatDate(currentDate, { month: "long", day: "numeric" })}`;
  $("#return-today").hidden = isToday;
  $("#trace-count").textContent = t("trace_count", { count: day.traces.length, plural: day.traces.length === 1 ? "" : "s" });
  renderTodayTraces(day);
  renderExtraction(day);
  document.title = `${formatDate(currentDate, { month: "numeric", day: "numeric" })} · Vitality Journal`;
}
function renderTodayTraces(day) {
  if (!day.traces.length) {
    $("#today-traces").innerHTML = `<p class="empty-state">${t("empty_traces")}</p>`;
    return;
  }
  $("#today-traces").innerHTML = [...day.traces].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((trace) => `
    <article class="trace-item" data-trace-id="${trace.id}">
      <div class="trace-main">
        <div class="trace-meta"><span>${formatDateTime(trace.created_at)}</span><span>${trace.source === "legacy-life-log" ? t("legacy") : t("lifelog")}</span></div>
        <p class="trace-text">${escapeHtml(trace.text)}</p>
        ${trace.tags?.length ? `<div class="trace-tags">${trace.tags.map((tag) => `<span>${tagLabel(tag)}</span>`).join("")}</div>` : ""}
      </div>
      <div class="trace-actions"><button type="button" data-action="edit">Edit</button><button type="button" data-action="delete">Delete</button></div>
    </article>`).join("");
}
function renderExtraction(day) {
  if (!day.extraction) day.extraction = buildExtraction(day);
  const fields = getExtractionFields(day);
  const method = day.extraction?.method === "ai" ? "ai" : "local";
  if ($("#ai-status")) $("#ai-status").textContent = method === "ai" ? t("ai_status_done") : t("ai_status_local");
  const brief = firstFieldValue(fields.daily_brief) || t("daily_brief_empty");
  const keyPoints = (fields.key_points || []).slice(0, 5);
  const signalChips = [
    ...(fields.contexts || []).slice(0, 4),
    ...(fields.body_signals || []).slice(0, 3),
    ...(fields.emotion_words || []).slice(0, 3)
  ];
  const detailDefs = EXTRACTION_DEFS.filter((def) => !["daily_brief", "key_points"].includes(def.id));
  $("#extraction-fields").innerHTML = `
    <section class="extraction-brief ${method === "ai" ? "ai" : "local"}">
      <div class="brief-meta"><span>${method === "ai" ? t("extraction_method_ai") : t("extraction_method_local")}</span><span>${day.extraction?.updated_at ? formatDateTime(day.extraction.updated_at) : ""}</span></div>
      <p class="brief-text">${escapeHtml(brief)}</p>
      ${keyPoints.length ? `<div class="brief-list"><h3>${t("key_points_title")}</h3><ul>${keyPoints.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>` : ""}
      ${signalChips.length ? `<div class="signal-chip-row" aria-label="${t("signals_title")}">${signalChips.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>` : ""}
    </section>
    <details class="extract-details">
      <summary>${t("edit_extract_fields")}</summary>
      <div class="extract-detail-grid">
        ${detailDefs.map((def) => `
          <div class="extract-field">
            <label for="extract-${def.id}">${labelFor(def)}</label>
            <textarea id="extract-${def.id}" data-extract-id="${def.id}" rows="3" placeholder="${t("extract_placeholder")}">${escapeHtml(formatFieldValue(fields[def.id]))}</textarea>
          </div>`).join("")}
      </div>
    </details>`;
}
function emptyExtractionFields() { return Object.fromEntries(EXTRACTION_DEFS.map((def) => [def.id, []])); }
function normalizeExtractionFields(fields = {}) {
  const next = emptyExtractionFields();
  EXTRACTION_DEFS.forEach((def) => {
    const value = fields?.[def.id];
    next[def.id] = Array.isArray(value) ? value.map((item) => String(item || "").trim()).filter(Boolean) : value ? [String(value).trim()].filter(Boolean) : [];
  });
  return next;
}
function normalizeExtractionRecord(extraction) {
  return { updated_at: extraction?.updated_at || new Date().toISOString(), method: extraction?.method || "local", language: extraction?.language || currentLanguage, model: extraction?.model || "", fields: normalizeExtractionFields(extraction?.fields || extraction || {}) };
}
function buildExtraction(day) { return { updated_at: new Date().toISOString(), method: "local", language: currentLanguage, fields: extractFieldsFromDay(day) }; }
function extractFieldsFromDay(day) {
  const traces = day.traces || [];
  const text = traces.map((trace) => trace.text).join("\n");
  const sentences = splitSentences(text);
  const contexts = new Set();
  traces.forEach((trace) => (trace.tags || []).forEach((tag) => contexts.add(tagLabel(tag))));
  Object.entries(CONTEXT_KEYWORDS).forEach(([context, words]) => { if (words.some((word) => text.toLowerCase().includes(word.toLowerCase()))) contexts.add(contextLabel(context)); });
  const contextList = [...contexts].slice(0, 8);
  const bodySignals = pickWords(text, BODY_WORDS).map(localSignalLabel);
  const emotionWords = pickWords(text, EMOTION_WORDS).map(localSignalLabel);
  const lifeGiving = compressLocalItems(sentences.filter((sentence) => hasAny(sentence, LIFE_GIVING_WORDS)), 3);
  const draining = compressLocalItems(sentences.filter((sentence) => hasAny(sentence, DRAINING_WORDS)), 3);
  const questions = compressLocalItems(sentences.filter((sentence) => /[?？]|how|why|whether|should|怎么办|如何|为什么|要不要/.test(sentence)), 3);
  const events = buildLocalEventSummaries(sentences, questions, contextList);
  const phrases = sentences.filter((sentence) => sentence.length >= 10 && sentence.length <= 120).slice(0, 5);
  const energySignal = describeEnergySignal({ lifeGiving, draining, bodySignals, text });
  const dailyBrief = buildLocalDailyBrief({ contextList, bodySignals, emotionWords, text });
  const keyPoints = buildLocalKeyPoints({ contextList, bodySignals, emotionWords, events, questions });
  return { daily_brief: dailyBrief ? [dailyBrief] : [], key_points: keyPoints, contexts: contextList, events, body_signals: bodySignals, energy_signal: energySignal ? [energySignal] : [], emotion_words: emotionWords, life_giving_moments: lifeGiving, draining_moments: draining, questions, user_phrases: phrases };
}
function contextLabel(context) { return CONTEXT_LABELS[context]?.[currentLanguage] || context; }
function localSignalLabel(value) { return currentLanguage === "zh" ? ({ calm: "平静", grateful: "感恩", clear: "清楚", anxious: "焦虑", tense: "紧张", low: "低落", stuck: "卡住", stomach: "胃/肠胃", sleep: "睡眠", tired: "疲惫", pain: "疼痛", body: "身体" }[value] || value) : value; }
function firstFieldValue(value) { return Array.isArray(value) ? (value[0] || "") : (value || ""); }
function compressLocalItems(items, limit) { return [...new Set(items.map((item) => trimSentence(item, currentLanguage === "zh" ? 88 : 150)).filter(Boolean))].slice(0, limit); }
function buildLocalEventSummaries(sentences, questions, contexts) {
  const questionSet = new Set(questions);
  const candidates = sentences.filter((sentence) => sentence.length >= 8 && !questionSet.has(sentence)).slice(0, 5);
  return candidates.map((sentence) => {
    const trimmed = trimSentence(sentence, currentLanguage === "zh" ? 82 : 140);
    if (trimmed.length < (currentLanguage === "zh" ? 64 : 110)) return trimmed;
    const anchor = contexts[0] || (currentLanguage === "zh" ? "当下经历" : "the current situation");
    return currentLanguage === "zh" ? `一段关于${anchor}的较长记录，原文已保留。` : `A longer note around ${anchor}; the original wording is preserved.`;
  });
}
function buildLocalDailyBrief({ contextList, bodySignals, emotionWords, text }) {
  if (!text.trim()) return "";
  const contexts = contextList.length ? contextList.slice(0, 3).join("、") : (currentLanguage === "zh" ? "当下经历" : "the current situation");
  const signals = [...bodySignals.slice(0, 2), ...emotionWords.slice(0, 2)];
  if (currentLanguage === "zh") return signals.length ? `本地整理显示：记录主要围绕${contexts}展开，同时出现了${signals.join("、")}等信号。原文已完整保留。` : `本地整理显示：记录主要围绕${contexts}展开。原文已完整保留。`;
  return signals.length ? `Local draft: the record mainly circles ${contexts}, with signals such as ${signals.join(", ")}. The original wording is preserved.` : `Local draft: the record mainly circles ${contexts}. The original wording is preserved.`;
}
function buildLocalKeyPoints({ contextList, bodySignals, emotionWords, events, questions }) {
  const points = [];
  if (contextList.length) points.push(currentLanguage === "zh" ? `出现的主要场景：${contextList.slice(0, 4).join("、")}。` : `Visible contexts: ${contextList.slice(0, 4).join(", ")}.`);
  if (events.length) points.push(currentLanguage === "zh" ? `记录里有 ${events.length} 条可继续整理的事件线索。` : `${events.length} event thread(s) are visible for later review.`);
  if (bodySignals.length) points.push(currentLanguage === "zh" ? `身体信号被明确提到：${bodySignals.slice(0, 3).join("、")}。` : `Body signals explicitly mentioned: ${bodySignals.slice(0, 3).join(", ")}.`);
  if (emotionWords.length) points.push(currentLanguage === "zh" ? `保留的情绪词：${emotionWords.slice(0, 3).join("、")}。` : `Emotion words kept as user's words: ${emotionWords.slice(0, 3).join(", ")}.`);
  if (questions.length) points.push(currentLanguage === "zh" ? `留下了 ${questions.length} 个可以回看的问题。` : `${questions.length} question(s) were left for later review.`);
  return points.slice(0, 5);
}
function describeEnergySignal({ lifeGiving, draining, bodySignals, text }) {
  if (!text.trim()) return "";
  const parts = [];
  if (lifeGiving.length) parts.push(currentLanguage === "zh" ? "记录中出现让人更清楚或展开的片段" : "records show moments that may feel clarifying or life-giving");
  if (draining.length) parts.push(currentLanguage === "zh" ? "也出现卡住、紧张或消耗性的片段" : "records also include stuck, tense, or draining fragments");
  if (bodySignals.length) parts.push(currentLanguage === "zh" ? "身体信号被明确提到" : "body signals were explicitly mentioned");
  return parts.length ? (currentLanguage === "zh" ? `记录显示：${parts.join("；")}。` : `Records show: ${parts.join("; ")}.`) : (currentLanguage === "zh" ? "记录主要保留事实和想法，暂时还看不出反复信号。" : "Records mainly preserve facts and thoughts; no repeated signal is visible yet.");
}
function saveTrace() {
  const input = $("#trace-input");
  const text = input.value.trim();
  if (!text) { showToast(currentLanguage === "zh" ? "一句话就可以保存。" : "One sentence is enough to save."); return; }
  const day = ensureDay(currentDate);
  const now = new Date().toISOString();
  if (editingTraceId) {
    const trace = day.traces.find((item) => item.id === editingTraceId);
    if (trace) { trace.text = text; trace.tags = [...selectedTags]; trace.updated_at = now; }
    editingTraceId = null;
    $("#save-trace").textContent = t("save_trace");
  } else {
    day.traces.push({ id: makeId(), created_at: now, updated_at: now, text, tags: [...selectedTags], source: "manual" });
  }
  day.metadata.updated_at = now;
  day.extraction = buildExtraction(day);
  input.value = "";
  selectedTags.clear();
  renderQuickTags(); renderObserve(); renderLens(); renderCorpus(); schedulePersist();
  showToast(currentLanguage === "zh" ? "记录已保存。原文会被保留。" : "Trace saved. Original text is preserved.");
}
function editTrace(traceId) {
  const trace = ensureDay(currentDate).traces.find((item) => item.id === traceId);
  if (!trace) return;
  editingTraceId = traceId;
  $("#trace-input").value = trace.text;
  selectedTags = new Set(trace.tags || []);
  $("#save-trace").textContent = currentLanguage === "zh" ? "更新记录" : "Update trace";
  renderQuickTags();
  $("#trace-input").focus();
}
function deleteTrace(traceId) {
  const day = ensureDay(currentDate);
  day.traces = day.traces.filter((trace) => trace.id !== traceId);
  day.extraction = buildExtraction(day);
  renderObserve(); renderLens(); renderCorpus(); schedulePersist();
  showToast(currentLanguage === "zh" ? "记录已删除。" : "Trace deleted.");
}
function recomputeExtraction() {
  const day = ensureDay(currentDate);
  day.extraction = buildExtraction(day);
  renderExtraction(day); renderLens(); renderCorpus(); schedulePersist();
  showToast(currentLanguage === "zh" ? "本地抽取已刷新，原始记录没有改变。" : "Local extraction refreshed. Original traces are unchanged.");
}
async function generateAiExtraction() {
  const day = ensureDay(currentDate);
  if (!day.traces.length) { showToast(t("ai_empty")); return; }
  const button = $("#ai-extract-button");
  const status = $("#ai-status");
  if (button) button.disabled = true;
  if (status) status.textContent = t("ai_status_working");
  try {
    const response = await fetch(AI_EXTRACT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: currentDate, language: currentLanguage, traces: day.traces.map((trace) => ({ created_at: trace.created_at, text: trace.text, tags: trace.tags || [] })) })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (!day.extraction) day.extraction = buildExtraction(day);
      renderExtraction(day);
      showToast(aiFailureMessage(payload, "extract"));
      return;
    }
    day.extraction = normalizeExtractionRecord(payload.extraction);
    day.metadata.updated_at = new Date().toISOString();
    renderExtraction(day); renderLens(); renderCorpus(); schedulePersist();
    showToast(t("ai_done_toast"));
  } catch (error) {
    if (!day.extraction) day.extraction = buildExtraction(day);
    renderExtraction(day);
    showToast(t("ai_unavailable"));
  } finally {
    if (button) button.disabled = false;
  }
}
function saveExtractionField(target) {
  const day = ensureDay(currentDate);
  if (!day.extraction) day.extraction = buildExtraction(day);
  day.extraction.fields[target.dataset.extractId] = parseFieldValue(target.value);
  day.extraction.updated_at = new Date().toISOString();
  schedulePersist();
}
function ensureActivePriming() {
  const day = ensureDay(currentDate);
  if (!day.primings.length) {
    const session = createPriming();
    day.primings.push(session);
    activePrimingId = session.id;
  }
  if (!activePrimingId || !day.primings.some((item) => item.id === activePrimingId)) activePrimingId = day.primings[day.primings.length - 1].id;
  return day.primings.find((item) => item.id === activePrimingId);
}
function createPriming() {
  const now = new Date().toISOString();
  return { id: makeId(), created_at: now, updated_at: now, raw: "", action_line: emptyActionLine(), action_method: "", outcome: "" };
}
function renderOrient() {
  const session = ensureActivePriming();
  $("#priming-input").value = session.raw || "";
  $("#outcome-input").value = session.outcome || "";
  const method = actionMethodLabel(session.action_method);
  $("#priming-status").textContent = session.action_line?.mainline ? `${method} · ${formatDateTime(session.updated_at)}` : t("not_generated");
  renderActionFields(session.action_line || emptyActionLine());
  renderRecentSignals();
}
function renderActionFields(actionLine) {
  $("#action-fields").innerHTML = ACTION_DEFS.map((def) => `
    <div class="action-field">
      <label for="action-${def.id}">${labelFor(def)}</label>
      <textarea id="action-${def.id}" data-action-id="${def.id}" rows="2" placeholder="${currentLanguage === "zh" ? "你可以编辑这里。" : "You can edit this."}">${escapeHtml(actionLine[def.id] || "")}</textarea>
    </div>`).join("");
}
function newPriming() {
  savePriming({ quiet: true });
  const session = createPriming();
  ensureDay(currentDate).primings.push(session);
  activePrimingId = session.id;
  renderOrient(); schedulePersist();
  showToast(currentLanguage === "zh" ? "新的 Priming 已创建。" : "New priming created.");
}
function readActionFields() {
  const result = emptyActionLine();
  ACTION_DEFS.forEach((def) => { result[def.id] = $(`[data-action-id="${def.id}"]`)?.value || ""; });
  return result;
}
function savePriming({ quiet = false } = {}) {
  const session = ensureActivePriming();
  session.raw = $("#priming-input").value;
  session.action_line = readActionFields();
  session.outcome = $("#outcome-input").value;
  session.updated_at = new Date().toISOString();
  ensureDay(currentDate).metadata.updated_at = session.updated_at;
  schedulePersist();
  if (!quiet) showToast(currentLanguage === "zh" ? "Priming 已保存。" : "Priming saved.");
}
async function generateActionLine() {
  const raw = $("#priming-input").value.trim();
  if (!raw) { showToast(t("priming_empty")); return; }
  const button = $("#generate-action-line");
  const recent = buildRecentSignals(7);
  const localActionLine = localGenerateActionLine(raw, recent);
  if (button) button.disabled = true;
  $("#priming-status").textContent = t("ai_status_working");
  try {
    const response = await fetch(AI_PRIME_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: currentDate, language: currentLanguage, raw, recent })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      applyActionLine(localActionLine, "local");
      showToast(aiFailureMessage(payload, "prime"));
      return;
    }
    applyActionLine(normalizeActionLineFields(payload.action_line), "ai", payload.updated_at);
    showToast(t("priming_ai_done_toast"));
  } catch (error) {
    applyActionLine(localActionLine, "local");
    showToast(t("priming_ai_fallback"));
  } finally {
    if (button) button.disabled = false;
  }
}
function applyActionLine(actionLine, method = "local", updatedAt = new Date().toISOString()) {
  const session = ensureActivePriming();
  session.raw = $("#priming-input").value.trim();
  session.action_line = normalizeActionLineFields(actionLine);
  session.action_method = method;
  session.updated_at = updatedAt || new Date().toISOString();
  ensureDay(currentDate).metadata.updated_at = session.updated_at;
  renderActionFields(session.action_line);
  $("#priming-status").textContent = `${actionMethodLabel(method)} · ${formatDateTime(session.updated_at)}`;
  renderLens(); renderCorpus(); schedulePersist();
}
function normalizeActionLineFields(actionLine = {}) {
  return Object.fromEntries(ACTION_DEFS.map((def) => [def.id, String(actionLine?.[def.id] || "").trim()]));
}
function saveOutcome() { savePriming({ quiet: true }); showToast(currentLanguage === "zh" ? "晚间回看已保存。" : "Evening check saved."); }
function localGenerateActionLine(raw, recent) {
  const sentences = splitSentences(raw);
  const taskSentences = sentences.filter((s) => /today|need|plan|finish|write|reply|do|complete|output|今天|需要|计划|完成|写|处理|推进|输出|复盘/.test(s)).slice(0, 5);
  const resistance = findSentence(sentences, /resistance|stuck|worry|delay|tired|anxious|阻力|卡|担心|拖延|累|焦虑|紧张/) || recent.resistanceHint;
  const firstAction = findSentence(sentences, /first|start|open|15|第一步|先|开始|打开/) || buildFirstAction(taskSentences[0]);
  const finish = findSentence(sentences, /finish|done|standard|complete|完成|结束|产出|做到/) || (currentLanguage === "zh" ? "留下一个可见结果，或写下今天实际走到了哪里。" : "Leave one saved result, or write where today actually landed.");
  const mainline = findSentence(sentences, /main|important|today|主线|最重要|重点|今天/) || taskSentences[0] || (currentLanguage === "zh" ? "把今天先收束到一条可以开始的主线。" : "Narrow today to one line that can be started.");
  const notToday = taskSentences.length > 3 ? (currentLanguage === "zh" ? "今天不需要同时打开所有分支，先保留最重要的 1-3 件。" : "Not all branches need to be opened today. Keep the top 1-3.") : (currentLanguage === "zh" ? "开始前不需要先解决所有后续问题。" : "No need to solve every later question before starting.");
  return {
    mainline: currentLanguage === "zh" ? `你提到的一条可能主线：${trimSentence(mainline, 90)}` : `You mentioned this possible main line: ${trimSentence(mainline, 90)}`,
    top_tasks: formatList(taskSentences.length ? taskSentences.slice(0, 3) : [currentLanguage === "zh" ? "选出今天最需要被推进的一件事" : "Choose the one thing that most needs movement today"]),
    first_action: firstAction,
    possible_resistance: resistance || (currentLanguage === "zh" ? "还没有看到明确阻力。可以补一句：我可能会在哪里停住？" : "No clear resistance word is visible yet. Add one sentence if helpful: where might I stop?"),
    if_resistance: resistance ? (currentLanguage === "zh" ? `如果这里出现阻力：${trimSentence(resistance, 60)}，把下一步缩到 15 分钟。` : `If this appears: ${trimSentence(resistance, 60)}, shrink the next step to 15 minutes.`) : (currentLanguage === "zh" ? "如果开始变模糊，就写一句：现在可见的下一步是什么？" : "If things get vague, write one sentence: what is the visible next step?"),
    not_today: notToday,
    finish_standard: finish
  };
}
function buildFirstAction(task) { return task ? (currentLanguage === "zh" ? `先做 15 分钟：${trimSentence(task, 70)}` : `Do 15 minutes first: ${trimSentence(task, 70)}`) : (currentLanguage === "zh" ? "先做一个 15 分钟版本。目标是开始，不是一次做完。" : "Do a 15-minute version. The goal is to start, not finish everything."); }
function renderRecentSignals() {
  const recent = buildRecentSignals(7);
  const items = [];
  if (recent.contexts.length) items.push(currentLanguage === "zh" ? `近期场景：${recent.contexts.slice(0, 4).join("、")}。` : `Recent contexts: ${recent.contexts.slice(0, 4).join(", ")}.`);
  if (recent.body.length) items.push(currentLanguage === "zh" ? `提到的身体信号：${recent.body.slice(0, 4).join("、")}。` : `Body signals mentioned: ${recent.body.slice(0, 4).join(", ")}.`);
  if (recent.resistanceHint) items.push(currentLanguage === "zh" ? `近期一个阻力片段：${trimSentence(recent.resistanceHint, 80)}。` : `A recent resistance fragment: ${trimSentence(recent.resistanceHint, 80)}.`);
  if (recent.lifeGiving.length) items.push(currentLanguage === "zh" ? `近期一个展开片段：${trimSentence(recent.lifeGiving[0], 80)}。` : `A recent life-giving fragment: ${trimSentence(recent.lifeGiving[0], 80)}.`);
  $("#recent-signals").innerHTML = items.length ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : `<p class="empty-state">${t("no_recent_signals")}</p>`;
}
function buildRecentSignals(daysBack) {
  const days = daysInRange(daysBack);
  return { contexts: topKeys(countValues(days.flatMap((day) => getExtractionFields(day).contexts || []))), body: topKeys(countValues(days.flatMap((day) => getExtractionFields(day).body_signals || []))), resistanceHint: days.flatMap((day) => getExtractionFields(day).draining_moments || [])[0] || "", lifeGiving: days.flatMap((day) => getExtractionFields(day).life_giving_moments || []) };
}
function renderLens() {
  const days = daysInRange(lensRange);
  const activeDays = days.filter((day) => day.traces.length || day.primings.length);
  const traceCount = activeDays.reduce((sum, day) => sum + day.traces.length, 0);
  const primingCount = activeDays.reduce((sum, day) => sum + day.primings.length, 0);
  const phraseCount = activeDays.reduce((sum, day) => sum + (getExtractionFields(day).user_phrases || []).length, 0);
  $("#lens-summary").innerHTML = [
    metric(currentLanguage === "zh" ? "记录天数" : "Recorded days", activeDays.length, currentLanguage === "zh" ? `${lensRange} 天窗口` : `${lensRange} day window`),
    metric(currentLanguage === "zh" ? "原始记录" : "Raw traces", traceCount, currentLanguage === "zh" ? "原文完整保留" : "original text preserved"),
    metric(currentLanguage === "zh" ? "行动线" : "Action lines", primingCount, currentLanguage === "zh" ? "已保存 Priming" : "saved priming sessions"),
    metric(currentLanguage === "zh" ? "语料条目" : "Corpus items", phraseCount, currentLanguage === "zh" ? "原话与问题" : "phrases and questions")
  ].join("");
  $("#lens-days").textContent = currentLanguage === "zh" ? `${lensRange} 天` : `${lensRange} days`;
  renderObservations(activeDays);
  renderTimeline(lensRange);
}
function metric(label, value, copy) { return `<div class="metric"><strong>${value}</strong><span>${escapeHtml(label)} · ${escapeHtml(copy)}</span></div>`; }
function renderObservations(days) {
  const fields = days.map(getExtractionFields);
  const contexts = topKeys(countValues(fields.flatMap((field) => field.contexts || []))).slice(0, 5);
  const body = topKeys(countValues(fields.flatMap((field) => field.body_signals || []))).slice(0, 5);
  const emotions = topKeys(countValues(fields.flatMap((field) => field.emotion_words || []))).slice(0, 5);
  const lifeGiving = fields.flatMap((field) => field.life_giving_moments || []);
  const draining = fields.flatMap((field) => field.draining_moments || []);
  const observations = [];
  if (contexts.length) observations.push(currentLanguage === "zh" ? `记录显示这些场景反复出现：${contexts.join("、")}。` : `Records show these recurring contexts: ${contexts.join(", ")}.`);
  if (body.length) observations.push(currentLanguage === "zh" ? `多次提到的身体信号包括：${body.join("、")}。` : `Body signals mentioned more than once include: ${body.join(", ")}.`);
  if (emotions.length) observations.push(currentLanguage === "zh" ? `你使用过的情绪词包括：${emotions.join("、")}。这些作为原词保留，不作为标签。` : `Emotion words you used include: ${emotions.join(", ")}. These are kept as your words, not labels.`);
  if (lifeGiving.length) observations.push(currentLanguage === "zh" ? `一个让人展开的片段：${trimSentence(lifeGiving[0], 100)}。` : `One life-giving fragment: ${trimSentence(lifeGiving[0], 100)}.`);
  if (draining.length) observations.push(currentLanguage === "zh" ? `一个消耗或卡住的片段：${trimSentence(draining[0], 100)}。` : `One draining or stuck fragment: ${trimSentence(draining[0], 100)}.`);
  if (!observations.length) observations.push(currentLanguage === "zh" ? "记录还不够多。继续留下一点点材料，模式会慢慢变得可见。" : "There are not enough traces yet. Keep recording; patterns will become visible over time.");
  $("#observations").innerHTML = `<ul>${observations.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}
function renderTimeline(daysBack) {
  const dates = [...Array(daysBack)].map((_, index) => { const date = new Date(); date.setDate(date.getDate() - (daysBack - index - 1)); return todayKey(date); });
  const max = Math.max(1, ...dates.map((date) => (state.days[date]?.traces?.length || 0) + (state.days[date]?.primings?.length || 0)));
  $("#timeline").innerHTML = dates.map((date) => { const day = state.days[date]; const count = (day?.traces?.length || 0) + (day?.primings?.length || 0); const width = count ? Math.max(6, Math.round((count / max) * 100)) : 0; return `<div class="timeline-row"><span>${formatDate(date, { month: "numeric", day: "numeric" })}</span><div class="timeline-bar"><span class="timeline-fill" style="width:${width}%"></span></div><span>${count}</span></div>`; }).join("");
}
function renderCorpus() {
  const allItems = buildCorpusItems();
  const items = filteredCorpusItems(allItems);
  const groups = groupCorpusItems(items);
  const query = $("#corpus-search")?.value?.trim() || "";
  const totalLabel = currentLanguage === "zh" ? "全部语料" : "All corpus";
  const shownLabel = currentLanguage === "zh" ? "当前显示" : "Shown";
  const searchLabel = query ? (currentLanguage === "zh" ? `筛选：${query}` : `Filter: ${query}`) : totalLabel;
  const overview = `
    <div class="corpus-overview" aria-label="${currentLanguage === "zh" ? "语料概览" : "Corpus overview"}">
      <div class="corpus-stat"><strong>${allItems.length}</strong><span>${totalLabel}</span></div>
      <div class="corpus-stat"><strong>${items.length}</strong><span>${shownLabel}</span></div>
      <div class="corpus-stat wide"><strong>${escapeHtml(searchLabel)}</strong><span>${currentLanguage === "zh" ? "复制和导出会使用当前筛选结果" : "Copy and export use the current filter"}</span></div>
    </div>`;
  if (!items.length) {
    $("#corpus-list").innerHTML = `${overview}<p class="empty-state">${t("no_matching_corpus")}</p>`;
    return;
  }
  $("#corpus-list").innerHTML = overview + groups.map((group) => `
    <details class="corpus-group" ${group.key === "raw" ? "" : "open"}>
      <summary><span>${escapeHtml(corpusGroupTitle(group.key))}</span><small>${group.items.length}</small></summary>
      <div class="corpus-stack">
        ${group.items.map((item) => `
          <article class="corpus-item corpus-${escapeHtml(group.key)}">
            <header><span>${escapeHtml(item.date)} · <span class="corpus-kind">${escapeHtml(item.kind)}</span></span><span>${escapeHtml(item.source)}</span></header>
            <p>${escapeHtml(item.text)}</p>
          </article>`).join("")}
      </div>
    </details>`).join("");
}
function filteredCorpusItems(items = buildCorpusItems()) {
  const query = $("#corpus-search")?.value?.trim().toLowerCase() || "";
  return items.filter((item) => !query || `${item.text} ${item.kind} ${item.source} ${item.date}`.toLowerCase().includes(query));
}
function groupCorpusItems(items) {
  const order = ["observation", "voice", "signal", "action", "raw"];
  const groups = new Map(order.map((key) => [key, []]));
  items.forEach((item) => {
    const key = groups.has(item.group) ? item.group : "raw";
    groups.get(key).push(item);
  });
  return order.map((key) => ({ key, items: groups.get(key) })).filter((group) => group.items.length);
}
function corpusGroupTitle(key) {
  const zh = { observation: "观察摘要", voice: "原话与问题", signal: "信号", action: "行动线", raw: "原始记录" };
  const en = { observation: "Observations", voice: "Original words and questions", signal: "Signals", action: "Action lines", raw: "Raw records" };
  return (currentLanguage === "zh" ? zh : en)[key] || key;
}
function buildCorpusItems() {
  const items = [];
  const add = (date, group, kind, source, text) => {
    const clean = String(text || "").trim();
    if (clean) items.push({ date, group, kind, source, text: clean });
  };
  recordedDates().forEach((date) => {
    const day = state.days[date];
    const fields = getExtractionFields(day);
    const extractionSource = extractionSourceLabel(day.extraction?.method);
    (fields.daily_brief || []).forEach((text) => add(date, "observation", currentLanguage === "zh" ? "今日观察" : "Daily brief", extractionSource, text));
    (fields.key_points || []).forEach((text) => add(date, "observation", currentLanguage === "zh" ? "压缩要点" : "Key point", extractionSource, text));
    (fields.events || []).forEach((text) => add(date, "observation", currentLanguage === "zh" ? "事件线索" : "Event signal", extractionSource, text));
    (fields.user_phrases || []).forEach((text) => add(date, "voice", currentLanguage === "zh" ? "原话" : "Original phrase", extractionSource, text));
    (fields.questions || []).forEach((text) => add(date, "voice", currentLanguage === "zh" ? "问题" : "Question", extractionSource, text));
    (fields.contexts || []).forEach((text) => add(date, "signal", currentLanguage === "zh" ? "场景" : "Context", extractionSource, text));
    (fields.body_signals || []).forEach((text) => add(date, "signal", currentLanguage === "zh" ? "身体信号" : "Body signal", extractionSource, text));
    (fields.energy_signal || []).forEach((text) => add(date, "signal", currentLanguage === "zh" ? "生命力信号" : "Vitality signal", extractionSource, text));
    (fields.emotion_words || []).forEach((text) => add(date, "signal", currentLanguage === "zh" ? "情绪词" : "Emotion word", extractionSource, text));
    (fields.life_giving_moments || []).forEach((text) => add(date, "signal", currentLanguage === "zh" ? "展开时刻" : "Life-giving moment", extractionSource, text));
    (fields.draining_moments || []).forEach((text) => add(date, "signal", currentLanguage === "zh" ? "消耗时刻" : "Draining moment", extractionSource, text));
    day.primings.forEach((session) => {
      if (session.raw?.trim()) add(date, "raw", "Priming", formatDateTime(session.created_at), session.raw);
      const line = session.action_line || {};
      ACTION_DEFS.forEach((def) => { if (line[def.id]?.trim()) add(date, "action", labelFor(def), actionMethodLabel(session.action_method), line[def.id]); });
      if (session.outcome?.trim()) add(date, "action", currentLanguage === "zh" ? "晚间回看" : "Evening check", currentLanguage === "zh" ? "回看" : "Outcome", session.outcome);
    });
    day.traces.forEach((trace) => add(date, "raw", currentLanguage === "zh" ? "原始记录" : "Raw trace", formatDateTime(trace.created_at), trace.text));
  });
  return items;
}
function formatCorpusMarkdown(items = filteredCorpusItems()) {
  const lines = ["# Vitality Journal Corpus", ""];
  groupCorpusItems(items).forEach((group) => {
    lines.push(`## ${corpusGroupTitle(group.key)}`, "");
    group.items.forEach((item) => {
      lines.push(`### ${item.date} · ${item.kind}`, `Source: ${item.source}`, "", item.text, "");
    });
  });
  return lines.join("\n").trim();
}
async function copyCorpus() {
  const items = filteredCorpusItems();
  const text = formatCorpusMarkdown(items);
  if (!text.trim()) { showToast(t("no_corpus")); return; }
  try {
    await copyText(text);
    showToast(t("corpus_copied"));
  } catch {
    download(`vitality-corpus-${todayKey()}.md`, text, "text/markdown;charset=utf-8");
    showToast(currentLanguage === "zh" ? "剪贴板被拦截，已改为导出 Markdown。" : "Clipboard was blocked, so Markdown was exported instead.");
  }
}
function exportCorpus() {
  const text = formatCorpusMarkdown(filteredCorpusItems());
  if (!text.trim()) { showToast(t("no_corpus")); return; }
  download(`vitality-corpus-${todayKey()}.md`, text, "text/markdown;charset=utf-8");
  showToast(currentLanguage === "zh" ? "语料 Markdown 已导出。" : "Corpus Markdown exported.");
}
async function copyText(text) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    try { await navigator.clipboard.writeText(text); return true; } catch {}
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.top = "0";
  area.style.left = "0";
  area.style.width = "1px";
  area.style.height = "1px";
  area.style.opacity = "0";
  area.style.fontSize = "16px";
  document.body.appendChild(area);
  area.focus();
  area.select();
  area.setSelectionRange(0, area.value.length);
  let ok = false;
  try { ok = document.execCommand("copy"); } finally { area.remove(); }
  if (!ok) throw new Error("Clipboard blocked.");
  return true;
}
function getExtractionFields(day) { if (!day.extraction) day.extraction = buildExtraction(day); day.extraction = normalizeExtractionRecord(day.extraction); return day.extraction.fields; }
function daysInRange(daysBack) { const start = new Date(); start.setDate(start.getDate() - daysBack + 1); start.setHours(0, 0, 0, 0); return recordedDates().map((date) => state.days[date]).filter((day) => dateFromKey(day.date) >= start).sort((a, b) => a.date.localeCompare(b.date)); }
function countValues(values) { const counts = new Map(); values.filter(Boolean).forEach((value) => counts.set(value, (counts.get(value) || 0) + 1)); return counts; }
function topKeys(map) { return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], locale())).map(([key]) => key); }
function pickWords(text, words) { const lower = text.toLowerCase(); return words.filter((word) => lower.includes(word.toLowerCase())).slice(0, 12); }
function hasAny(text, words) { const lower = text.toLowerCase(); return words.some((word) => lower.includes(word.toLowerCase())); }
function splitSentences(text) { return String(text || "").split(/[.!?;。！？；\n]/).map((item) => item.replace(/\s+/g, " ").trim()).filter(Boolean); }
function findSentence(sentences, pattern) { return sentences.find((sentence) => pattern.test(sentence)) || ""; }
function trimSentence(text, length) { const clean = String(text || "").replace(/\s+/g, " ").trim(); return clean.length > length ? `${clean.slice(0, length)}...` : clean; }
function formatList(items) { return items.map((item, index) => `${index + 1}. ${trimSentence(item, 100)}`).join("\n"); }
function formatFieldValue(value) { return Array.isArray(value) ? value.join("\n") : (value || ""); }
function parseFieldValue(value) { return String(value || "").split(/\n/).map((item) => item.trim()).filter(Boolean); }
function tagLabel(id) { const tag = QUICK_TAGS.find((item) => item.id === id); return tag ? labelFor(tag) : id; }
function renderSyncSettings() {
  const sync = state.settings.sync || {};
  if ($("#sync-id")) $("#sync-id").value = sync.sync_id || "";
  renderSyncStatus(sync.last_synced_at ? t("last_sync", { time: new Date(sync.last_synced_at).toLocaleString(locale()) }) : t("local_only"));
}
function renderSyncStatus(text) { if ($("#sync-status")) $("#sync-status").textContent = text; }
function getSyncCredentials() {
  const syncId = $("#sync-id")?.value.trim();
  const passphrase = $("#sync-passphrase")?.value;
  if (!syncId) throw new Error(t("enter_sync_id"));
  if (!/^[a-zA-Z0-9_-]{3,80}$/.test(syncId)) throw new Error("Sync ID can use letters, numbers, dash, and underscore only.");
  if (!passphrase || passphrase.length < 10) throw new Error(t("passphrase_rule"));
  return { syncId, passphrase };
}
function saveSyncSettings() {
  const syncId = $("#sync-id")?.value.trim();
  if (!syncId) { showToast(t("enter_sync_id")); return; }
  state.settings.sync = { ...(state.settings.sync || {}), sync_id: syncId };
  schedulePersist();
  renderSyncStatus(currentLanguage === "zh" ? "Sync ID 已保存" : "Sync ID saved");
  showToast(currentLanguage === "zh" ? "同步设置已保存在本设备。" : "Sync settings saved on this device.");
}
function cloneForSync() {
  const copy = JSON.parse(JSON.stringify(state));
  copy.settings = { ...(copy.settings || {}), sync: { ...(copy.settings?.sync || {}) } };
  delete copy.settings.sync.last_error;
  return copy;
}
async function deriveSyncKey(passphrase, saltB64) {
  const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(passphrase), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "PBKDF2", hash: "SHA-256", salt: bytesFromBase64(saltB64), iterations: SYNC_ITERATIONS }, material, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}
async function encryptState(syncId, passphrase, existingSalt) {
  const salt = existingSalt || randomBase64(16);
  const iv = randomBase64(12);
  const key = await deriveSyncKey(passphrase, salt);
  const plaintext = JSON.stringify({ exported_at: new Date().toISOString(), state: cloneForSync() });
  const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv: bytesFromBase64(iv), additionalData: new TextEncoder().encode(syncId) }, key, new TextEncoder().encode(plaintext));
  return { version: 1, app: "vitality-journal", sync_id: syncId, salt, iv, iterations: SYNC_ITERATIONS, ciphertext: base64FromBytes(new Uint8Array(cipher)), updated_at: new Date().toISOString() };
}
async function decryptEnvelope(envelope, passphrase) {
  if (!envelope?.salt || !envelope?.iv || !envelope?.ciphertext) throw new Error("Remote sync data is not recognized.");
  const syncId = envelope.sync_id || $("#sync-id")?.value.trim() || "";
  const key = await deriveSyncKey(passphrase, envelope.salt);
  const clear = await crypto.subtle.decrypt({ name: "AES-GCM", iv: bytesFromBase64(envelope.iv), additionalData: new TextEncoder().encode(syncId) }, key, bytesFromBase64(envelope.ciphertext));
  return JSON.parse(new TextDecoder().decode(clear));
}
async function fetchRemoteEnvelope(syncId) {
  const response = await fetch(`${SYNC_API_BASE}/${encodeURIComponent(syncId)}`, { cache: "no-store" });
  if (response.status === 404) return null;
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "Sync pull failed.");
  return payload.envelope || null;
}
async function putRemoteEnvelope(syncId, envelope) {
  const response = await fetch(`${SYNC_API_BASE}/${encodeURIComponent(syncId)}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ envelope }) });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "Sync push failed.");
  return payload;
}
async function pullSync({ quiet = false } = {}) {
  const { syncId, passphrase } = getSyncCredentials();
  renderSyncStatus(currentLanguage === "zh" ? "正在拉取..." : "Pulling...");
  const envelope = await fetchRemoteEnvelope(syncId);
  if (!envelope) {
    renderSyncStatus(currentLanguage === "zh" ? "云端还没有数据" : "No remote data yet");
    if (!quiet) showToast(currentLanguage === "zh" ? "云端还没有这个 Journal。请先在有数据的设备上 Push。" : "No remote journal found yet. Push this device first.");
    state.settings.sync = { ...(state.settings.sync || {}), sync_id: syncId };
    schedulePersist();
    return null;
  }
  const decrypted = await decryptEnvelope(envelope, passphrase);
  const incoming = normalizeState(decrypted.state || decrypted);
  mergeIncomingState(incoming);
  state.settings.sync = { ...(state.settings.sync || {}), sync_id: syncId, salt: envelope.salt, last_synced_at: new Date().toISOString() };
  await persistState();
  renderAll();
  if (!quiet) showToast(currentLanguage === "zh" ? "已拉取并合并加密 Journal。" : "Encrypted journal pulled and merged.");
  return envelope;
}
async function pushSync({ quiet = false } = {}) {
  const { syncId, passphrase } = getSyncCredentials();
  renderSyncStatus(currentLanguage === "zh" ? "正在加密..." : "Encrypting...");
  state.settings.sync = { ...(state.settings.sync || {}), sync_id: syncId };
  const envelope = await encryptState(syncId, passphrase, state.settings.sync.salt);
  renderSyncStatus(currentLanguage === "zh" ? "正在上传..." : "Uploading...");
  await putRemoteEnvelope(syncId, envelope);
  state.settings.sync = { ...(state.settings.sync || {}), sync_id: syncId, salt: envelope.salt, last_synced_at: envelope.updated_at };
  await persistState();
  renderSyncStatus(t("last_sync", { time: new Date(envelope.updated_at).toLocaleString(locale()) }));
  if (!quiet) showToast(currentLanguage === "zh" ? "已推送加密 Journal。" : "Encrypted journal pushed.");
  return envelope;
}
async function syncNow() {
  try {
    const syncId = $("#sync-id")?.value.trim();
    if (syncId) state.settings.sync = { ...(state.settings.sync || {}), sync_id: syncId };
    await pullSync({ quiet: true });
    await pushSync({ quiet: true });
    renderAll();
    showToast(currentLanguage === "zh" ? "同步完成。" : "Sync complete.");
  } catch (error) {
    renderSyncStatus("Sync needs attention");
    showToast(error.message || "Sync failed.");
  }
}
async function safePullSync() { try { await pullSync(); } catch (error) { renderSyncStatus("Pull failed"); showToast(error.message || "Pull failed."); } }
async function safePushSync() { try { await pushSync(); } catch (error) { renderSyncStatus("Push failed"); showToast(error.message || "Push failed."); } }
function randomBase64(length) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return base64FromBytes(bytes);
}
function base64FromBytes(bytes) {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}
function bytesFromBase64(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}
function mergeIncomingState(incoming) {
  Object.entries(incoming.days || {}).forEach(([date, incomingDay]) => {
    const day = ensureDay(date);
    mergeById(day.traces, incomingDay.traces || []);
    mergeById(day.primings, incomingDay.primings || []);
    day.extraction = newerExtraction(day.extraction, incomingDay.extraction) || buildExtraction(day);
    day.metadata.updated_at = new Date().toISOString();
  });
}
function newerExtraction(current, incoming) {
  if (!current && !incoming) return null;
  if (!current) return normalizeExtractionRecord(incoming);
  if (!incoming) return normalizeExtractionRecord(current);
  return new Date(incoming.updated_at || 0) > new Date(current.updated_at || 0) ? normalizeExtractionRecord(incoming) : normalizeExtractionRecord(current);
}
function mergeById(target, incoming) {
  const index = new Map(target.map((item, position) => [item.id, position]));
  incoming.forEach((item) => {
    if (!item?.id) return;
    if (!index.has(item.id)) {
      target.push(item);
      return;
    }
    const currentPosition = index.get(item.id);
    const current = target[currentPosition];
    if (new Date(item.updated_at || item.updatedAt || item.created_at || 0) > new Date(current.updated_at || current.updatedAt || current.created_at || 0)) target[currentPosition] = item;
  });
}
function markdownExport() {
  savePriming({ quiet: true });
  const dates = [...recordedDates()].reverse();
  const lines = ["# Vitality Journal", ""];
  dates.forEach((date) => {
    const day = state.days[date];
    lines.push(`## ${formatDate(date, { year: "numeric", month: "long", day: "numeric", weekday: "long" })}`, "");
    if (day.traces.length) {
      lines.push("### Raw traces", "");
      day.traces.forEach((trace) => lines.push(`- ${formatDateTime(trace.created_at)} ${trace.text.replace(/\n/g, " ")}`));
      lines.push("");
    }
    const fields = getExtractionFields(day);
    if (Object.values(fields).some((value) => value?.length)) {
      lines.push("### Neutral extraction", "");
      EXTRACTION_DEFS.forEach((def) => { if (fields[def.id]?.length) lines.push(`#### ${labelFor(def)}`, formatFieldValue(fields[def.id]), ""); });
    }
    if (day.primings.length) {
      lines.push("### Priming", "");
      day.primings.forEach((session, index) => {
        lines.push(`#### Session ${index + 1}`, "");
        if (session.raw?.trim()) lines.push("Raw priming:", session.raw.trim(), "");
        ACTION_DEFS.forEach((def) => { const value = session.action_line?.[def.id]; if (value?.trim()) lines.push(`- ${labelFor(def)}: ${value.replace(/\n/g, " ")}`); });
        if (session.outcome?.trim()) lines.push("", "Evening check:", session.outcome.trim(), "");
      });
    }
    lines.push("---", "");
  });
  download(`vitality-journal-${todayKey()}.md`, lines.join("\n"), "text/markdown;charset=utf-8");
  showToast("Markdown exported.");
}
function jsonExport() { savePriming({ quiet: true }); download(`vitality-journal-backup-${todayKey()}.json`, JSON.stringify({ exported_at: new Date().toISOString(), ...state }, null, 2), "application/json;charset=utf-8"); showToast("JSON backup exported."); }
function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = filename; document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function importBackup(file) {
  if (!file) return;
  try {
    const incoming = normalizeState(JSON.parse(await file.text()));
    mergeIncomingState(incoming);
    await persistState(); renderAll(); $("#export-dialog").close(); showToast("Backup merged.");
  } catch (error) { showToast(error.message || "Import failed."); }
  finally { $("#import-file").value = ""; }
}
function bridgeSettings() {
  if (!state.settings) state.settings = {};
  if (!state.settings.bridge) state.settings.bridge = {};
  return state.settings.bridge;
}
function renderBridgeSettings() {
  if (!$("#bridge-id")) return;
  const settings = bridgeSettings();
  if (document.activeElement !== $("#bridge-id")) $("#bridge-id").value = settings.id || state.settings?.sync?.sync_id || "";
  if (document.activeElement !== $("#bridge-token")) $("#bridge-token").value = settings.token || "";
  $("#bridge-title").textContent = bt("title");
  $(".bridge-copy").textContent = bt("copy");
  $("#save-bridge-settings").textContent = bt("save");
  $("#pull-gpt-inbox").textContent = bt("pull");
  $("#copy-gpt-prompt").textContent = bt("prompt");
  $(".manual-import summary").textContent = bt("fallback");
  $(".manual-import p").textContent = bt("fallbackCopy");
  $("#import-gpt-json").textContent = bt("importJson");
  $("#bridge-status").textContent = settings.id && settings.token ? bt("statusReady") : bt("statusMissing");
}
function saveBridgeSettings() {
  const id = $("#bridge-id")?.value.trim();
  const token = $("#bridge-token")?.value.trim();
  if (!id) { showToast(bt("enterId")); return; }
  if (!token) { showToast(bt("enterToken")); return; }
  state.settings.bridge = { id, token };
  schedulePersist();
  renderBridgeSettings();
  showToast(bt("saved"));
}
function getBridgeCredentials() {
  const settings = bridgeSettings();
  const id = $("#bridge-id")?.value.trim() || settings.id || state.settings?.sync?.sync_id || "";
  const token = $("#bridge-token")?.value.trim() || settings.token || "";
  if (!id) throw new Error(bt("enterId"));
  if (!token) throw new Error(bt("enterToken"));
  return { id, token };
}
function stableBridgeId(record) {
  if (record?.id) return String(record.id).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 90);
  const base = [record?.date, record?.kind || record?.type, record?.raw_text || record?.raw || record?.text || "", record?.action_line?.mainline || record?.extraction?.daily_brief || ""].join("|");
  let hash = 0;
  for (let index = 0; index < base.length; index += 1) hash = ((hash << 5) - hash + base.charCodeAt(index)) | 0;
  return `gpt_${Math.abs(hash).toString(36)}`;
}
function normalizeBridgeDate(value) { return /^\d{4}-\d{2}-\d{2}$/.test(value || "") ? value : currentDate; }
function bridgeRecordsFromPayload(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.records)) return payload.records;
  if (payload?.record) return [payload.record];
  return payload && typeof payload === "object" ? [payload] : [];
}
function bridgeExtraction(record, now) {
  const source = record.extraction?.fields ? record.extraction : (record.extraction || record.fields ? { fields: record.extraction?.fields || record.extraction || record.fields } : null);
  if (!source?.fields) return null;
  const normalized = normalizeExtractionRecord({
    updated_at: source.updated_at || record.updated_at || now,
    method: "chatgpt",
    language: source.language || record.language || currentLanguage,
    model: source.model || record.model || "ChatGPT Pro",
    fields: source.fields
  });
  return Object.values(normalized.fields).some((items) => items.length) ? normalized : null;
}
function mergeGptBridgeRecords(records) {
  let merged = 0;
  bridgeRecordsFromPayload({ records }).forEach((record) => {
    if (!record || typeof record !== "object") return;
    const now = new Date().toISOString();
    const id = stableBridgeId(record);
    const date = normalizeBridgeDate(record.date);
    const kind = (record.kind || record.type || "observe").toLowerCase() === "priming" ? "priming" : "observe";
    const day = ensureDay(date);
    const raw = String(record.raw_text || record.raw || record.text || "").trim();
    const updatedAt = record.updated_at || record.created_at || now;
    if (kind === "priming") {
      const session = normalizePriming({
        id: `${id}_priming`,
        created_at: record.created_at || now,
        updated_at: updatedAt,
        raw,
        action_line: normalizeActionLineFields(record.action_line || record.actionLine || record),
        action_method: "chatgpt",
        outcome: record.outcome || ""
      });
      mergeById(day.primings, [session]);
      merged += 1;
    } else {
      if (raw) {
        mergeById(day.traces, [{ id: `${id}_trace`, created_at: record.created_at || now, updated_at: updatedAt, text: raw, tags: Array.isArray(record.tags) ? record.tags.slice(0, 12) : [], source: "chatgpt" }]);
        merged += 1;
      }
      const extraction = bridgeExtraction(record, updatedAt);
      if (extraction) day.extraction = newerExtraction(day.extraction, extraction) || extraction;
    }
    day.metadata.updated_at = now;
  });
  return merged;
}
async function pullGptInbox() {
  try {
    const { id, token } = getBridgeCredentials();
    state.settings.bridge = { id, token };
    schedulePersist();
    $("#bridge-status").textContent = bt("pulling");
    const response = await fetch(`${GPT_BRIDGE_API}/${encodeURIComponent(id)}`, { cache: "no-store", headers: { Authorization: `Bearer ${token}` } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || bt("failed"));
    const records = bridgeRecordsFromPayload(payload);
    if (!records.length) { $("#bridge-status").textContent = bt("statusReady"); showToast(bt("empty")); return; }
    const count = mergeGptBridgeRecords(records);
    await persistState();
    renderAll();
    showToast(bt("pulled", { count }));
  } catch (error) {
    $("#bridge-status").textContent = bt("failed");
    showToast(error.message || bt("failed"));
  }
}
function buildGptBridgePrompt() {
  savePriming({ quiet: true });
  const id = $("#bridge-id")?.value.trim() || bridgeSettings().id || state.settings?.sync?.sync_id || "YOUR-BRIDGE-ID";
  const day = ensureDay(currentDate);
  const recent = buildRecentSignals(7);
  const traces = day.traces.map((trace, index) => `Trace ${index + 1} (${formatDateTime(trace.created_at)}):\n${trace.text}`).join("\n\n") || "No saved LifeLog trace yet.";
  const session = ensureActivePriming();
  const priming = session.raw?.trim() ? session.raw.trim() : "No priming transcript yet.";
  return [
    "You are my Vitality Journal Bridge.",
    `Bridge ID: ${id}`,
    `Date: ${currentDate}`,
    `UI language: ${currentLanguage}`,
    "",
    "Please organize the material neutrally. Observe, compress, and connect. Do not diagnose, evaluate, moralize, or label me.",
    "For LifeLog, keep my raw words but compress the analysis into daily_brief, key_points, contexts, events, body_signals, energy_signal, emotion_words, life_giving_moments, draining_moments, questions, user_phrases.",
    "For Priming, turn the transcript into: mainline, top_tasks, first_action, possible_resistance, if_resistance, not_today, finish_standard.",
    "If the Action is available, save the result with saveVitalityJournalItem. If not, return only JSON in this shape: {\"records\":[...]}.",
    "",
    "Recent signals:",
    JSON.stringify(recent, null, 2),
    "",
    "LifeLog traces:",
    traces,
    "",
    "Priming transcript:",
    priming
  ].join("\n");
}
async function copyGptPrompt() {
  try {
    await copyText(buildGptBridgePrompt());
    showToast(bt("promptCopied"));
  } catch {
    download(`vitality-gpt-prompt-${currentDate}.txt`, buildGptBridgePrompt(), "text/plain;charset=utf-8");
    showToast(bt("promptCopied"));
  }
}
function parseGptJsonText(text) {
  let candidate = String(text || "").trim();
  const fenced = candidate.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) candidate = fenced[1].trim();
  const first = candidate.indexOf("{");
  const last = candidate.lastIndexOf("}");
  if (first >= 0 && last > first) candidate = candidate.slice(first, last + 1);
  return JSON.parse(candidate);
}
async function importGptJson() {
  try {
    const payload = parseGptJsonText($("#gpt-import-json")?.value || "");
    const count = mergeGptBridgeRecords(bridgeRecordsFromPayload(payload));
    await persistState();
    $("#gpt-import-json").value = "";
    renderAll();
    showToast(bt("imported", { count }));
  } catch {
    showToast(bt("badJson"));
  }
}
function renderStorageSummary() {
  const target = $("#storage-summary");
  if (!target) return;
  const dates = recordedDates().length;
  const traces = recordedDates().reduce((sum, date) => sum + state.days[date].traces.length, 0);
  const primings = recordedDates().reduce((sum, date) => sum + state.days[date].primings.length, 0);
  target.textContent = t("saved_locally", { dates, traces, primings });
}
function checkDateRoll() {
  const today = todayKey();
  if (today === lastToday) return;
  const previous = lastToday;
  lastToday = today;
  if (currentDate === previous) { currentDate = today; activePrimingId = null; renderAll(); showToast("A new day has started."); }
}
async function decryptHistory(passphrase) {
  if (!crypto?.subtle) throw new Error(t("secure_unlock_unsupported"));
  const response = await fetch(HISTORY_URL, { cache: "no-store" });
  if (!response.ok) throw new Error(t("history_load_failed"));
  const envelope = await response.json();
  const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(passphrase), "PBKDF2", false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey({ name: "PBKDF2", hash: "SHA-256", salt: bytesFromBase64(envelope.salt), iterations: envelope.iterations }, material, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
  const clear = await crypto.subtle.decrypt({ name: "AES-GCM", iv: bytesFromBase64(envelope.iv), additionalData: HISTORY_AAD }, key, bytesFromBase64(envelope.ciphertext));
  return JSON.parse(new TextDecoder().decode(clear));
}
function mergeHistory(incoming) {
  mergeIncomingState(normalizeState(incoming));
  if (!state.migrations.includes(HISTORY_ID)) state.migrations.push(HISTORY_ID);
  if (!state.seed_ids.includes(HISTORY_ID)) state.seed_ids.push(HISTORY_ID);
}
async function handleUnlock(event) {
  event.preventDefault();
  const code = normalizeUnlockCode($("#unlock-code").value);
  const status = $("#unlock-status");
  const submit = event.submitter;
  if (!code) return;
  submit.disabled = true;
  submit.textContent = t("unlocking");
  status.textContent = t("processing_device");
  try {
    const incoming = await decryptHistory(code);
    const restoredDays = countHistoryDays(incoming);
    mergeHistory(incoming);
    await persistState();
    $("#unlock-code").value = "";
    $("#unlock-dialog").close();
    renderAll();
    showToast(t("old_history_restored", { days: restoredDays }));
  } catch (error) {
    status.textContent = error?.name === "OperationError" ? t("unlock_wrong") : (error.message || t("unlock_failed"));
  } finally {
    submit.disabled = false;
    submit.textContent = t("unlock");
  }
}
function openUnlockDialog() {
  if (!$("#unlock-dialog")?.showModal) return;
  const status = $("#unlock-status");
  if (status) status.textContent = state.migrations.includes(HISTORY_ID) ? t("old_history_already") : t("unlock_hint");
  $("#unlock-code").value = "";
  $("#export-dialog")?.close();
  requestAnimationFrame(() => $("#unlock-dialog").showModal());
}
function offerUnlock() {
  if (state.migrations.includes(HISTORY_ID) || state.settings.unlock_prompt_dismissed || !$("#unlock-dialog")?.showModal) return;
  requestAnimationFrame(() => openUnlockDialog());
}
function setupVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;
  recognition = new SpeechRecognition();
  recognition.lang = "zh-CN";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = (event) => {
    let finalText = "";
    for (let index = event.resultIndex; index < event.results.length; index += 1) if (event.results[index].isFinal) finalText += event.results[index][0].transcript;
    if (finalText.trim()) {
      const input = $("#trace-input");
      input.value = `${input.value}${input.value ? "\n" : ""}${finalText.trim()}`;
    }
  };
  recognition.onend = () => { recognizing = false; $("#voice-button").textContent = t("voice"); };
}
function toggleVoice() {
  if (!recognition) { showToast(t("voice_unsupported")); return; }
  if (recognizing) { recognition.stop(); return; }
  recognizing = true;
  $("#voice-button").textContent = t("stop");
  recognition.start();
}
function bindEvents() {
  document.querySelectorAll(".mode-tab").forEach((button) => button.addEventListener("click", () => switchMode(button.dataset.mode)));
  document.querySelectorAll("[data-lang]").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
  $("#today-button").addEventListener("click", () => { currentDate = todayKey(); activePrimingId = null; renderAll(); switchMode("observe"); });
  $("#return-today").addEventListener("click", () => { currentDate = todayKey(); activePrimingId = null; renderAll(); });
  $("#entry-date").addEventListener("change", () => { const value = $("#entry-date").value; if (/^\d{4}-\d{2}-\d{2}$/.test(value)) { currentDate = value; activePrimingId = null; ensureDay(currentDate); renderAll(); showToast(t("date_changed")); } });
  $("#quick-tags").addEventListener("click", (event) => { const button = event.target.closest("[data-tag]"); if (!button) return; const tag = button.dataset.tag; if (selectedTags.has(tag)) selectedTags.delete(tag); else selectedTags.add(tag); renderQuickTags(); });
  $("#save-trace").addEventListener("click", saveTrace);
  $("#clear-trace").addEventListener("click", () => { $("#trace-input").value = ""; selectedTags.clear(); editingTraceId = null; $("#save-trace").textContent = t("save_trace"); renderQuickTags(); });
  $("#voice-button").addEventListener("click", toggleVoice);
  $("#today-traces").addEventListener("click", (event) => { const article = event.target.closest("[data-trace-id]"); const action = event.target.closest("[data-action]")?.dataset.action; if (!article || !action) return; if (action === "edit") editTrace(article.dataset.traceId); if (action === "delete") deleteTrace(article.dataset.traceId); });
  $("#extract-button").addEventListener("click", recomputeExtraction);
  $("#ai-extract-button").addEventListener("click", generateAiExtraction);
  $("#extraction-fields").addEventListener("input", (event) => { if (event.target.matches("[data-extract-id]")) saveExtractionField(event.target); });
  $("#new-priming").addEventListener("click", newPriming);
  $("#generate-action-line").addEventListener("click", generateActionLine);
  $("#save-priming").addEventListener("click", () => savePriming({ quiet: false }));
  $("#save-outcome").addEventListener("click", saveOutcome);
  $("#action-fields").addEventListener("input", () => savePriming({ quiet: true }));
  $("#priming-input").addEventListener("input", () => savePriming({ quiet: true }));
  $("#outcome-input").addEventListener("input", () => savePriming({ quiet: true }));
  document.querySelectorAll(".range-button").forEach((button) => button.addEventListener("click", () => { lensRange = Number(button.dataset.range); document.querySelectorAll(".range-button").forEach((item) => item.classList.toggle("active", item === button)); renderLens(); }));
  $("#corpus-search").addEventListener("input", renderCorpus);
  $("#copy-corpus").addEventListener("click", copyCorpus);
  $("#export-corpus")?.addEventListener("click", exportCorpus);
  $("#export-button").addEventListener("click", () => { renderStorageSummary(); renderSyncSettings(); renderBridgeSettings(); $("#export-dialog").showModal(); });
  $("#export-markdown").addEventListener("click", markdownExport);
  $("#export-json").addEventListener("click", jsonExport);
  $("#import-file").addEventListener("change", (event) => importBackup(event.target.files[0]));
  $("#save-sync-settings").addEventListener("click", saveSyncSettings);
  $("#sync-now").addEventListener("click", syncNow);
  $("#pull-sync").addEventListener("click", safePullSync);
  $("#push-sync").addEventListener("click", safePushSync);
  $("#save-bridge-settings")?.addEventListener("click", saveBridgeSettings);
  $("#pull-gpt-inbox")?.addEventListener("click", pullGptInbox);
  $("#copy-gpt-prompt")?.addEventListener("click", copyGptPrompt);
  $("#import-gpt-json")?.addEventListener("click", importGptJson);
  $("#open-unlock").addEventListener("click", openUnlockDialog);
  document.addEventListener("click", (event) => { const close = event.target.closest("[data-close-dialog]"); if (close) close.closest("dialog").close(); });
  $("#unlock-form").addEventListener("submit", handleUnlock);
  $("#unlock-later").addEventListener("click", () => { state.settings.unlock_prompt_dismissed = true; schedulePersist(); $("#unlock-dialog").close(); });
  window.addEventListener("focus", checkDateRoll);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") checkDateRoll(); else persistState(); });
  window.addEventListener("pagehide", () => persistState());
}
function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" }).then((registration) => registration.update()).catch(() => {});
}
async function init() {
  state = await loadState();
  currentLanguage = state.settings.language || currentLanguage;
  ensureDay(currentDate);
  setupVoiceInput();
  bindEvents();
  renderAll();
  await persistState();
  registerServiceWorker();
  setInterval(checkDateRoll, 60000);
}
init();