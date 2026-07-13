const DB_NAME = "vitality-journal-db";
const DB_STORE = "state";
const DB_KEY = "app";
const FALLBACK_KEY = "vitality-journal-fallback";
const LEGACY_DB_NAME = "life-log-v5";
const HISTORY_URL = "./history-v1.enc.json";
const HISTORY_ID = "encrypted-history-v1";
const HISTORY_AAD = new TextEncoder().encode("life-log-history-v1");
const SYNC_API_BASE = "./api/sync";
const SYNC_ITERATIONS = 250000;

const LANGUAGE_KEY = "vitality-journal-language";
const I18N = {
  en: {
    back_today: "Back to today", main_workspace: "Main workspace", utilities: "Utilities", language: "Language",
    tab_observe: "Observe", tab_orient: "Orient", tab_lens: "Lens", tab_corpus: "Corpus", keep: "Keep",
    observe_title: "Record what wants to be seen", today: "Today", trace_label: "Add a LifeLog trace",
    trace_placeholder: "One sentence, one scene, one body signal, one thought. Leave it here first.", optional_tags: "Optional tags",
    save_trace: "Save trace", companion_trace: "Companion", companion_priming: "Companion start", companion_today: "Today experiment", companion_next_step: "Next connection", companion_low_energy: "Low energy", companion_outcome: "Companion review", voice: "Voice", stop: "Stop", clear: "Clear", today_section: "Today", neutral_extraction: "Neutral extraction",
    refresh: "Refresh", protocol_note: "The app observes and organizes. It does not diagnose, rate, or label you.",
    orient_title: "Turn today into an action line", new: "New", priming_label: "Morning or pre-task priming",
    priming_placeholder: "Say the thoughts, plans, and possible resistance in your head.", generate_action_line: "Generate action line",
    save: "Save", recent_signals: "Recent signals", companion_inventory: "Real entries", companion_inventory_placeholder: "Core support:\n-\nWarm acquaintances:\n-\nLocal life companions:\n-\nCommunity:\n-\nBoundary / do not choose:\n-", companion_inventory_hint: "Use real people, roles, or settings. Boundary / do not choose is only a reminder, not an action candidate.", companion_inventory_defaults: "Load defaults", action_line: "Action line", not_generated: "Not generated", generated: "Generated",
    evening_check_label: "Two-minute evening check", outcome_placeholder: "What actually happened today? Did the action line help?", save_check: "Save check", save_companion_outcome_trace: "Save as Companion trace",
    lens_title: "Patterns over time", time_range: "Time range", range_7: "7 days", range_30: "30 days", companion_evidence: "Connection evidence", possible_observations: "Possible observations", companion_map: "Companion map", save_companion_map: "Save map", companion_weekly_review: "Companion week", save_companion_weekly: "Save week",
    recording_rhythm: "Recording rhythm", by_date: "by date", corpus_title: "Personal corpus", copy_corpus: "Copy shown", export_corpus: "Export corpus", search_corpus: "Search corpus",
    corpus_placeholder: "Search original words, questions, body signals, contexts", backup_sync_title: "Backup and sync", close: "Close",
    dialog_copy: "Your journal stays on this device by default. Cloud sync stores only encrypted data.", export_markdown: "Export Markdown", backup_json: "Backup JSON", restore_json: "Restore JSON",
    restore_old_history: "Restore old history", history_help_title: "Old history code", history_help_copy: "Use the old unlock code only for the bundled history package. It is different from cloud Sync ID and Sync passphrase.",
    encrypted_sync: "Encrypted sync", sync_id: "Sync ID", sync_id_placeholder: "for example lily-vitality", sync_passphrase: "Sync passphrase", sync_passphrase_placeholder: "Used only on this device",
    save_settings: "Save settings", sync_now: "Sync now", pull: "Pull", push: "Push", sync_help: "Use the same Sync ID and passphrase on iPhone and computer.",
    unlock_copy: "Enter the old unlock code to restore the bundled encrypted history on this device.", unlock_code: "Unlock code", later: "Later", unlock: "Unlock", unlocking: "Unlocking",
    date_today: "Today", date_history: "History", trace_count: "{count} trace{plural}", empty_traces: "No traces yet. One sentence is enough.", legacy: "Legacy", lifelog: "LifeLog",
    extract_placeholder: "Observed signals appear here.", old_history_restored: "Old history restored: {days} days merged.", unlock_wrong: "Unlock code is not correct. Use the old history code, not the cloud sync passphrase.", unlock_hint: "Tip: this code is separate from Sync ID and Sync passphrase.", old_history_already: "Old history is already merged. You can restore again if you want to re-check it.", processing_device: "Processing on this device.", secure_unlock_unsupported: "Secure unlock is not supported in this browser.", history_load_failed: "History package could not be loaded.", unlock_failed: "Unlock failed.", saved_locally: "Saved locally: {dates} days, {traces} traces, {primings} primings.", local_only: "Local only", last_sync: "Last sync {time}", enter_sync_id: "Enter a Sync ID.", passphrase_rule: "Use a sync passphrase with at least 10 characters.", voice_unsupported: "Voice capture is not supported here. Use iPhone dictation in the keyboard.", ai_sensemake: "Organize", refresh_local: "Local refresh", ai_status_local: "Local draft", ai_status_done: "Organized", ai_status_working: "Organizing...", ai_missing_key: "Local draft is available.", ai_invalid_key: "Local draft is available.", ai_model_error: "Local draft is available.", ai_rate_limited: "Local draft is available.", ai_unavailable: "Local draft is available.", ai_done_toast: "Organized the trace. You can edit any field.", ai_empty: "Save one trace before organizing.", daily_brief_empty: "No compact observation yet. Save a trace or refresh.", key_points_title: "Key points", signals_title: "Signals", edit_extract_fields: "Edit extraction fields", extraction_method_local: "Local draft", extraction_method_ai: "Organized", no_recent_signals: "Not enough recent traces yet. This priming will use the current text first.", no_matching_corpus: "No matching corpus item yet.", no_corpus: "No corpus to copy yet.", corpus_copied: "Corpus copied.", clipboard_unavailable: "Clipboard is unavailable. Use export instead.", entry_date: "Record date", backfill_hint: "Backfill any missed day anytime.", ai_generate_action_line: "Orient", local_action_line: "Local action line", priming_method_ai: "Oriented", priming_method_local: "Local draft", priming_ai_done_toast: "Oriented the priming. You can edit any field.", priming_ai_fallback: "Local action line is ready.", priming_ai_missing_key: "Local action line is ready.", priming_empty: "Write or dictate a short priming first.", date_changed: "Date changed."
  },
  zh: {
    back_today: "回到今天", main_workspace: "主工作区", utilities: "工具", language: "语言",
    tab_observe: "看见", tab_orient: "定向", tab_lens: "趋势", tab_corpus: "语料", keep: "保存",
    observe_title: "记录此刻想被看见的东西", today: "今天", trace_label: "添加一条生命力记录",
    trace_placeholder: "一句话、一个场景、一个身体信号、一个念头。先放在这里就好。", optional_tags: "可选标签",
    save_trace: "保存记录", companion_trace: "陪伴记录", companion_priming: "陪伴启动", companion_today: "今日实验", companion_next_step: "连接下一步", companion_low_energy: "低能量", companion_outcome: "陪伴回看", voice: "语音", stop: "停止", clear: "清空", today_section: "今天", neutral_extraction: "中性抽取",
    refresh: "刷新", protocol_note: "App 只观察和整理，不诊断、不打分、不贴标签。",
    orient_title: "把今天转成一条行动线", new: "新建", priming_label: "早晨或任务前 Priming",
    priming_placeholder: "把脑中的想法、计划和可能的阻力说出来或写下来。", generate_action_line: "生成行动线",
    save: "保存", recent_signals: "近期信号", companion_inventory: "真实入口清单", companion_inventory_placeholder: "核心支持：\n-\n温暖熟人：\n-\n本地生活同伴：\n-\n共同体：\n-\n需要边界 / 不选择：\n-", companion_inventory_hint: "写真实人、真实角色或真实场景；需要边界 / 不选择只作提醒，不作为行动候选。", companion_inventory_defaults: "加载默认入口", action_line: "行动线", not_generated: "尚未生成", generated: "已生成",
    evening_check_label: "晚间两分钟回看", outcome_placeholder: "今天实际发生了什么？这条行动线有没有帮助？", save_check: "保存回看", save_companion_outcome_trace: "保存为陪伴记录",
    lens_title: "看见一段时间里的模式", time_range: "时间范围", range_7: "7 天", range_30: "30 天", companion_evidence: "连接证据", possible_observations: "可能的观察", companion_map: "陪伴地图", save_companion_map: "保存地图", companion_weekly_review: "陪伴周复盘", save_companion_weekly: "保存周复盘",
    recording_rhythm: "记录节奏", by_date: "按日期", corpus_title: "个人语料库", copy_corpus: "复制当前语料", export_corpus: "导出语料", search_corpus: "搜索语料",
    corpus_placeholder: "搜索原话、问题、身体信号、场景", backup_sync_title: "备份与同步", close: "关闭",
    dialog_copy: "你的记录默认保存在这台设备上。云同步只保存加密后的数据。", export_markdown: "导出 Markdown", backup_json: "备份 JSON", restore_json: "恢复 JSON",
    restore_old_history: "恢复旧历史", history_help_title: "旧历史口令", history_help_copy: "旧历史口令只用于恢复随 App 打包的历史记录；它和云同步的 Sync ID / 同步密语不是一回事。",
    encrypted_sync: "加密同步", sync_id: "Sync ID", sync_id_placeholder: "例如 lily-vitality", sync_passphrase: "同步密语", sync_passphrase_placeholder: "只在本设备用于加密/解密",
    save_settings: "保存设置", sync_now: "立即同步", pull: "拉取", push: "推送", sync_help: "手机和电脑使用同一个 Sync ID 与同步密语。",
    unlock_copy: "输入旧历史口令，把随 App 打包的加密历史恢复到这台设备。", unlock_code: "旧历史口令", later: "稍后", unlock: "解锁", unlocking: "解锁中",
    date_today: "今天", date_history: "历史", trace_count: "{count} 条记录", empty_traces: "还没有记录。一句话就够。", legacy: "旧历史", lifelog: "生命力日志",
    extract_placeholder: "观察到的信号会出现在这里。", old_history_restored: "旧历史已恢复：合并了 {days} 天记录。", unlock_wrong: "口令不正确。这里需要旧历史口令，不是云同步密语。", unlock_hint: "提示：这个口令和 Sync ID / 同步密语是分开的。", old_history_already: "旧历史已经合并过。你仍然可以再次恢复来重新检查。", processing_device: "正在本设备处理。", secure_unlock_unsupported: "这个浏览器不支持安全解锁。", history_load_failed: "无法加载历史包。", unlock_failed: "解锁失败。", saved_locally: "本地已保存：{dates} 天，{traces} 条记录，{primings} 条 Priming。", local_only: "仅本地", last_sync: "上次同步 {time}", enter_sync_id: "请输入 Sync ID。", passphrase_rule: "同步密语至少需要 10 个字符。", voice_unsupported: "这里不支持 App 内语音输入。iPhone 上可以用键盘自带听写。", ai_sensemake: "整理", refresh_local: "本地刷新", ai_status_local: "本地草稿", ai_status_done: "已整理", ai_status_working: "整理中...", ai_missing_key: "已保留本地草稿。", ai_invalid_key: "已保留本地草稿。", ai_model_error: "已保留本地草稿。", ai_rate_limited: "已保留本地草稿。", ai_unavailable: "已保留本地草稿。", ai_done_toast: "已完成本地整理，可以继续编辑。", ai_empty: "先保存一条记录，再做 整理。", daily_brief_empty: "还没有压缩观察。保存记录或刷新即可生成。", key_points_title: "要点", signals_title: "信号", edit_extract_fields: "编辑抽取字段", extraction_method_local: "本地草稿", extraction_method_ai: "本地整理", no_recent_signals: "近期记录还不够。Priming 会先使用当前文字。", no_matching_corpus: "还没有匹配的语料。", no_corpus: "还没有可复制的语料。", corpus_copied: "语料已复制。", clipboard_unavailable: "剪贴板不可用，请使用导出。", entry_date: "记录日期", backfill_hint: "漏记的日子可以随时回溯补上。", ai_generate_action_line: "生成行动线", local_action_line: "本地行动线", priming_method_ai: "本地定向", priming_method_local: "本地草稿", priming_ai_done_toast: "已整理 Priming，可以继续编辑。", priming_ai_fallback: "已生成本地行动线。", priming_ai_missing_key: "已生成本地行动线。", priming_empty: "先写下或口述一小段 Priming。", date_changed: "日期已切换。"
  }
};
function preferredLanguage() { try { return localStorage.getItem(LANGUAGE_KEY) || ((navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en"); } catch { return "zh"; } }
function locale() { return currentLanguage === "zh" ? "zh-CN" : "en-US"; }
function t(key, values = {}) { const template = I18N[currentLanguage]?.[key] ?? I18N.en[key] ?? key; return template.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? ""); }
function labelFor(item) { return currentLanguage === "zh" ? (item.zh || item.label) : item.label; }
function extractionSourceLabel(method) {
  if (method === "ai") return t("extraction_method_ai");
  return currentLanguage === "zh" ? "本地整理" : "Local";
}
function actionMethodLabel(method) {
  if (method === "ai") return t("priming_method_ai");
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
  { id: "companion", label: "Companion", zh: "陪伴" },
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
  { id: "target_setting", label: "Person / setting", zh: "真实对象/场景" },
  { id: "message_to_send", label: "Message to send", zh: "可发送的话" },
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
  return { version: 7, days: {}, settings: { sync: {}, language: currentLanguage, companion_inventory: "" }, migrations: [], seed_ids: [] };
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
  const next = { ...createEmptyState(), ...value, days: value.days || {}, settings: { sync: {}, companion_inventory: "", ...(value.settings || {}) }, migrations: Array.isArray(value.migrations) ? value.migrations : [], seed_ids: Array.isArray(value.seed_ids) ? value.seed_ids : [] };
  Object.keys(next.days).forEach((date) => { next.days[date] = normalizeDay(next.days[date], date); });
  return next;
}
function normalizeV6(value) {
  const next = normalizeV7({ ...value, version: 7, settings: { sync: {}, companion_inventory: "", ...(value.settings || {}) } });
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
function extractFieldsFromText(text, tags = []) { return extractFieldsFromDay({ traces: [{ text, tags }] }); }
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
function companionTraceTemplate() {
  return currentLanguage === "zh"
    ? [
        "Companion Trace",
        "",
        "我做了什么：",
        "对方/现实怎么回应：",
        "我身体怎么反应：",
        "下一步是什么：",
      ].join("\n")
    : [
        "Companion Trace",
        "",
        "What I did:",
        "How the person/reality responded:",
        "How my body responded:",
        "Next step:",
      ].join("\n");
}
function fillCompanionTrace() {
  const input = $("#trace-input");
  const current = input.value.trim();
  input.value = current ? `${current}\n\n${companionTraceTemplate()}` : companionTraceTemplate();
  selectedTags.add("relationship");
  selectedTags.add("companion");
  renderQuickTags();
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
  showToast(currentLanguage === "zh" ? "已放入陪伴记录模板。" : "Companion trace template inserted.");
}
function recomputeExtraction() {
  const day = ensureDay(currentDate);
  day.extraction = buildExtraction(day);
  renderExtraction(day); renderLens(); renderCorpus(); schedulePersist();
  showToast(currentLanguage === "zh" ? "本地抽取已刷新，原始记录没有改变。" : "Local extraction refreshed. Original traces are unchanged.");
}
function generateAiExtraction() {
  const day = ensureDay(currentDate);
  if (!day.traces.length) { showToast(t("ai_empty")); return; }
  const status = $("#ai-status");
  if (status) status.textContent = t("ai_status_working");
  day.extraction = buildExtraction(day);
  day.metadata.updated_at = new Date().toISOString();
  renderExtraction(day); renderLens(); renderCorpus(); schedulePersist();
  if (status) status.textContent = t("ai_status_done");
  showToast(currentLanguage === "zh" ? "已完成本地整理。" : "Local organization is ready.");
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
function companionInventoryText() {
  return String(state.settings?.companion_inventory || "").trim();
}
function companionInventorySummaryItems(items, limit = 8) {
  return items.slice(0, limit).join("; ");
}
function companionInventoryBuckets() {
  const buckets = { selectable: [], boundary: [] };
  const text = companionInventoryText();
  if (!text) return buckets;
  const selectableHeading = /^(核心支持|温暖熟人|本地生活同伴|共同体|Core support|Warm acquaintances|Local life companions|Community)\s*[：:]?\s*$/i;
  const boundaryHeading = /^(需要边界\s*\/?\s*不选择|边界提醒|Boundary\s*\/?\s*do not choose|Boundary reminders?)\s*[：:]?\s*$/i;
  const boundaryClue = /(已婚|暧昧|不适合|主情绪出口|不要单独|不单独|边界|married|ambiguous|unavailable|not my main emotional outlet|no private)/i;
  let bucket = "selectable";
  text.split(/\n+/).forEach((rawLine) => {
    const line = rawLine.replace(/^[\s\-*•·]+/, "").trim();
    if (!line) return;
    if (boundaryHeading.test(line)) {
      bucket = "boundary";
      return;
    }
    if (selectableHeading.test(line)) {
      bucket = "selectable";
      return;
    }
    const target = bucket === "boundary" || boundaryClue.test(line) ? "boundary" : "selectable";
    if (!buckets[target].includes(line)) buckets[target].push(line);
  });
  return buckets;
}
function companionInventorySummary() {
  return companionInventorySummaryItems(companionInventoryBuckets().selectable);
}
function companionBoundarySummary() {
  return companionInventorySummaryItems(companionInventoryBuckets().boundary, 4);
}
function companionDefaultInventory() {
  return currentLanguage === "zh"
    ? [
        "核心支持：",
        "- 女性朋友 / mentor / 属灵长辈 / Dream Group 中可以继续接触的人（待补具体人名）",
        "温暖熟人：",
        "- 项目营地中日常能遇到、互动压力较小的人",
        "- 食堂、办公室或路上能自然遇到的人",
        "本地生活同伴：",
        "- 可能愿意散步一小段的同事",
        "- 可能知道球场空档或愿意 10 分钟陪练的人",
        "共同体：",
        "- Dream Group",
        "- 教会 / 主日后的自然交流",
        "需要边界 / 不选择：",
        "- 已婚男同事：不作为主要情绪出口，不单独制造暧昧场景"
      ].join("\n")
    : [
        "Core support:",
        "- Female friend / mentor / trusted faith elder / someone from Dream Group (add real names later)",
        "Warm acquaintances:",
        "- Low-pressure people I naturally meet in project camp",
        "- People I naturally meet in the dining hall, office, or on the road",
        "Local life companions:",
        "- A coworker who may walk a short stretch",
        "- Someone who may know empty court slots or help with 10 minutes of practice",
        "Community:",
        "- Dream Group",
        "- Church / natural conversation after Sunday service",
        "Boundary / do not choose:",
        "- Married male coworker: not my main emotional outlet; no private ambiguous setting"
      ].join("\n");
}
function loadCompanionInventoryDefaults() {
  const input = $("#companion-inventory");
  if (!input) return;
  const defaults = companionDefaultInventory();
  const current = input.value.trim();
  if (/尼泊尔项目营地|项目营地|Dream Group|Project camp|project camp/.test(current)) {
    showToast(currentLanguage === "zh" ? "默认入口已经在清单里，可以直接编辑。" : "Default entries are already in the list. You can edit them directly.");
    return;
  }
  input.value = current ? `${current}\n\n${defaults}` : defaults;
  saveCompanionInventory();
  showToast(currentLanguage === "zh" ? "已加载默认真实入口，请按现实删改。" : "Default real entries loaded. Edit them to match reality.");
}function renderCompanionInventory() {
  const input = $("#companion-inventory");
  if (input && input.value !== (state.settings.companion_inventory || "")) input.value = state.settings.companion_inventory || "";
}
function saveCompanionInventory() {
  const input = $("#companion-inventory");
  if (!input) return;
  state.settings.companion_inventory = input.value;
  schedulePersist();
}
function inventoryInstructionLine(zh) {
  const selectableSummary = companionInventorySummary();
  const boundarySummary = companionBoundarySummary();
  if (!selectableSummary && !boundarySummary) return zh ? "真实入口清单：暂未填写；先从营地、散步路线、球场、Dream Group、教会、女性朋友/mentor 中选一个真实入口。" : "Real-entry list: not filled yet; choose one real entry from camp, walking route, court, Dream Group, church, female friend/mentor.";
  const selectableLine = selectableSummary
    ? (zh ? `真实入口清单（可选择）：${selectableSummary}` : `Real-entry list (selectable): ${selectableSummary}`)
    : (zh ? "真实入口清单（可选择）：暂缺可选择入口；先补 1 个低风险真实人/场景。" : "Real-entry list (selectable): no selectable entry yet; add one low-risk real person or setting first.");
  if (!boundarySummary) return selectableLine;
  const boundaryLine = zh ? `边界提醒（不作为候选）：${boundarySummary}` : `Boundary reminders (not candidates): ${boundarySummary}`;
  return `${selectableLine}\n${boundaryLine}`;
}
function renderOrient() {
  const session = ensureActivePriming();
  $("#priming-input").value = session.raw || "";
  $("#outcome-input").value = session.outcome || "";
  const method = actionMethodLabel(session.action_method);
  $("#priming-status").textContent = session.action_line?.mainline ? `${method} · ${formatDateTime(session.updated_at)}` : t("not_generated");
  renderActionFields(session.action_line || emptyActionLine());
  renderRecentSignals();
  renderCompanionInventory();
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
function companionPrimingTemplate() {
  const inventory = inventoryInstructionLine(currentLanguage === "zh");
  return currentLanguage === "zh"
    ? [
        "我想建立真实连接，但现在卡住了。",
        inventory,
        "我现在的状态是：[A/B/C/D/E/F]。",
        "请先判断这次更适合：首触 / 复约 / 深谈 / 边界转移 / 自我陪伴。",
        "请帮我生成一个 10 分钟内能执行的连接动作。",
        "要求：不要诊断我；不要泛泛鼓励；优先从真实入口清单里选一个对象或场景；如果已有上次舒服互动，优先给复约句；给我一句可以直接发送的话；再给我一个被拒绝后的托底动作。",
      ].join("\n")
    : [
        "I want to build real connection, but I am stuck right now.",
        inventory,
        "My current state is: [A/B/C/D/E/F].",
        "First decide whether this should be: first touch / follow-up / deep talk / boundary redirect / self-companionship.",
        "Please generate one connection action I can do within 10 minutes.",
        "Requirements: do not diagnose me; do not give generic encouragement; prioritize one person or setting from the real-entry list; if there was already one comfortable interaction, prioritize a follow-up invitation; give me one message I can send directly; give me one fallback action if I am refused.",
      ].join("\n");
}function fillCompanionPriming() {
  const input = $("#priming-input");
  const current = input.value.trim();
  input.value = current ? `${current}\n\n${companionPrimingTemplate()}` : companionPrimingTemplate();
  savePriming({ quiet: true });
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
  showToast(currentLanguage === "zh" ? "已放入陪伴启动提示。" : "Companion starter inserted.");
}
function companionSelectableEntries(limit = 8) {
  return companionInventoryBuckets().selectable.slice(0, limit);
}
function companionPreferredEntry(entries = companionSelectableEntries()) {
  return entries.find((entry) => /食堂|办公室|路上|散步|球场|Dream Group|教会|camp|dining|office|road|walk|court|church/i.test(entry)) || entries[0] || "";
}
function companionModeForEntry(entry) {
  if (/球|陪练|发球|court|practice|badminton|basketball/i.test(entry)) return "practice";
  if (/Dream Group|教会|属灵|mentor|女性朋友|female friend|church|faith|elder/i.test(entry)) return "deep";
  if (/散步|走|walk|route/i.test(entry)) return "walk";
  return "light";
}
function companionMessageForEntry(entry, zh) {
  const mode = companionModeForEntry(entry);
  if (mode === "practice") return zh ? "我想先自己练 20 分钟，不进正式局。你知道什么时候球场比较空吗？" : "I want to practice alone for 20 minutes first, not join the formal game. Do you know when the court is usually empty?";
  if (mode === "deep") return zh ? "我最近在整理真实连接这件事，想找一个比较轻松的时间聊 30-40 分钟。你这周方便吗？不方便也没关系。" : "I am sorting through real connection lately and would like a relaxed 30-40 minute talk. Are you available this week? No pressure if not.";
  if (mode === "walk") return zh ? "我准备出去走 20-30 分钟，你要不要一起走一小段？不方便也没关系。" : "I am going for a 20-30 minute walk. Want to join for a short stretch? No pressure if not.";
  return zh ? "我刚好想起你，想轻轻问候一下。你最近怎么样？" : "I thought of you and wanted to say a light hello. How have you been lately?";
}
function buildCompanionNextStepActionLine() {
  const zh = currentLanguage === "zh";
  const entries = companionSelectableEntries();
  const entry = companionPreferredEntry(entries);
  if (!entry) {
    return zh ? {
      mainline: "今天的连接下一步：先补出一个可行动的真实入口，而不是继续停留在孤独分析里。",
      target_setting: "真实入口清单目前没有可选择项；先写 1 个真实人、真实角色或真实场景。",
      message_to_send: "今天可以先不发送。先补一个入口：食堂/办公室能自然遇到的人、熟悉散步路线、球场空档、Dream Group、教会、女性朋友/mentor。",
      top_tasks: formatList(["打开真实入口清单", "写下 1 个低风险真实入口", "如果身体允许，进入这个场景 5-10 分钟"]),
      first_action: "现在先在真实入口清单里写一个可行动入口；如果想不到，就写‘熟悉散步路线’。",
      possible_resistance: "可能会因为没有完美对象而继续分析，或把空缺解释成自己没有连接能力。",
      if_resistance: "把入口缩小成场景，不先选人：食堂坐 5 分钟、走到门外、去球场看 10 分钟。",
      not_today: "今天不要求立刻联系到一个懂我的人。",
      finish_standard: "真实入口清单新增 1 个可行动入口，或身体进入一个真实场景一次。"
    } : {
      mainline: "Today's next connection step: name one actionable real entry instead of staying in loneliness analysis.",
      target_setting: "The real-entry list has no selectable entry yet; add one real person, role, or setting first.",
      message_to_send: "You may send nothing today. First add one entry: dining hall/office person, familiar walking route, empty court slot, Dream Group, church, female friend/mentor.",
      top_tasks: formatList(["Open the real-entry list", "Write one low-risk real entry", "If the body can, enter that setting for 5-10 minutes"]),
      first_action: "Add one actionable entry now; if unsure, write 'familiar walking route'.",
      possible_resistance: "You may keep analyzing because there is no perfect person, or treat the gap as proof you cannot connect.",
      if_resistance: "Shrink the entry to a setting, not a person: sit in the dining hall for 5 minutes, step outside, or observe the court for 10 minutes.",
      not_today: "No need to immediately find someone who deeply understands you today.",
      finish_standard: "One actionable real entry is added, or your body enters one real setting."
    };
  }
  return zh ? {
    mainline: "今天的连接下一步：从真实入口清单里只推进一个入口，目标是拿到现实反馈。",
    target_setting: entry,
    message_to_send: companionMessageForEntry(entry, zh),
    top_tasks: formatList(["确认这个入口今天是否真实可接触", "发出一句可拒绝的话，或进入这个场景 5-20 分钟", "行动后保存一条 Companion 回看"]),
    first_action: "先把这个入口落到一个具体人或具体场景；如果已经具体，就发送下面这句话，或直接进入场景。",
    possible_resistance: "可能会想等别人先邀请，或担心一次回应证明自己有没有位置。",
    if_resistance: "把动作降到 3 分钟：站起来、离开屏幕、走到这个场景附近；不发送也要记录现实反馈。",
    not_today: "今天不同时打开多条关系线，也不把一次回应当成人生结论。",
    finish_standard: "出现一个现实反馈：已发送、对方回应、对方没空、我进入场景、或发现需要换入口；随后保存陪伴回看。"
  } : {
    mainline: "Today's next connection step: move one real entry toward real feedback.",
    target_setting: entry,
    message_to_send: companionMessageForEntry(entry, zh),
    top_tasks: formatList(["Confirm this entry is reachable today", "Send one declinable line or enter the setting for 5-20 minutes", "Save one Companion review afterward"]),
    first_action: "Ground this entry in one concrete person or setting. If it is already concrete, send the message below or enter the setting.",
    possible_resistance: "You may wait for others to invite you first, or treat one response as proof of whether you have a place.",
    if_resistance: "Shrink it to 3 minutes: stand up, leave the screen, move near the setting; even without sending, record the real feedback.",
    not_today: "Do not open many relationship lines today, and do not turn one response into a life verdict.",
    finish_standard: "One real feedback appears: sent, response, unavailable, you entered the setting, or this entry needs to change; then save a Companion review."
  };
}
function companionNextStepTemplate(actionLine) {
  const inventory = inventoryInstructionLine(currentLanguage === "zh");
  return currentLanguage === "zh"
    ? [
        "连接下一步：从真实入口到现实反馈",
        inventory,
        `今天只推进：${actionLine.target_setting}`,
        `可发送的话：${actionLine.message_to_send}`,
        "完成后：定向 -> 陪伴回看 -> 保存为陪伴记录。",
        "判断标准：不是我立刻不孤独，而是现实给了一个可记录的反馈。"
      ].join("\n")
    : [
        "Next connection: from real entry to real feedback",
        inventory,
        `Move only this today: ${actionLine.target_setting}`,
        `Message to send: ${actionLine.message_to_send}`,
        "Afterward: Orient -> Companion review -> Save as Companion trace.",
        "Success means real feedback is recorded, not instantly feeling less lonely."
      ].join("\n");
}
function fillCompanionNextStep() {
  const actionLine = buildCompanionNextStepActionLine();
  const input = $("#priming-input");
  const current = input.value.trim();
  const template = companionNextStepTemplate(actionLine);
  input.value = current ? `${current}\n\n${template}` : template;
  applyActionLine(actionLine, "local");
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
  showToast(currentLanguage === "zh" ? "已生成连接下一步。" : "Next connection step is ready.");
}
function companionTodayExperimentForDate(date, zh) {
  const experiments = {
    "2026-07-12": zh ? {
      mainline: "Day 1：把痛点转成系统起点。今天只验证：我能否发出一个低压散步邀请，或自己进入现实世界。",
      target_setting: "熟悉散步路线；可选一个低风险同事，不选边界复杂对象。",
      message_to_send: "我今天 4:30 准备走昨天那条路，大概 30 分钟。你要不要一起走一小段？不方便也没关系。",
      top_tasks: formatList(["只发一次散步邀请", "如果没有发送或对方没空，自己走 20-30 分钟", "回来写一条 Companion Trace"]),
      first_action: "先确定 4:30 或另一个具体时间；只选一个对象，发送上面的话。",
      possible_resistance: "可能会担心被拒绝、打扰别人，或又回到等待被邀请。",
      if_resistance: "如果发不出去，直接自己走 20 分钟；回来记录：今天即使没人陪，我也进入了现实世界。",
      not_today: "今天不证明我有没有位置，也不强行融入集体。",
      finish_standard: "邀请发出，或身体真实进入熟悉路线 20 分钟。"
    } : {
      mainline: "Day 1: turn the pain point into a system starting point. Test only whether I can send one low-pressure walking invitation or enter the real world alone.",
      target_setting: "Familiar walking route; optionally one low-risk coworker, not a boundary-complicated person.",
      message_to_send: "I am planning to walk that route around 4:30 for about 30 minutes. Want to join for a short stretch? No pressure if not.",
      top_tasks: formatList(["Send one walking invitation", "If it is not sent or they are unavailable, walk alone for 20-30 minutes", "Write one Companion Trace afterward"]),
      first_action: "Choose 4:30 or one specific time; pick one person and send the sentence above.",
      possible_resistance: "You may fear rejection, bothering someone, or waiting to be invited again.",
      if_resistance: "If sending is too much, walk alone for 20 minutes and record: I entered the real world even without company today.",
      not_today: "Do not prove whether I have a place or force group belonging today.",
      finish_standard: "The invitation is sent, or the body enters the familiar route for 20 minutes."
    },
    "2026-07-13": zh ? {
      mainline: "Day 2：恢复轻连接肌肉。今天只做一次 1-3 分钟轻问候。",
      target_setting: "食堂、办公室或营地里的一个低风险对象；不选边界复杂对象。",
      message_to_send: "我这两天开始走营地附近那条路，发现还挺好走的。你周末一般会怎么安排？",
      top_tasks: formatList(["选一个低风险对象", "只说一句真实但不沉重的话", "互动后记录现实反馈和身体反应"]),
      first_action: "下一次在食堂、办公室或路上遇到低风险对象时，说上面这句话中的一句；不追求聊久。",
      possible_resistance: "可能会觉得自己在表演、怕尴尬，或担心对方反应平淡。",
      if_resistance: "如果说不出口，就只在有人的场景里停留 5 分钟；或自己走 10 分钟，回来写一句现实细节。",
      not_today: "今天不验证我受不受欢迎，不把轻问候升级成深关系判断。",
      finish_standard: "我主动制造了一次微小真实接触，或至少让身体进入有人的现实场景。"
    } : {
      mainline: "Day 2: rebuild the light-connection muscle. Do only one 1-3 minute light greeting today.",
      target_setting: "One low-risk person in the dining hall, office, or camp; not a boundary-complicated person.",
      message_to_send: "I started walking that route near camp these two days and found it pretty nice. What do you usually do on weekends?",
      top_tasks: formatList(["Choose one low-risk person", "Say one true but light sentence", "Record the real response and body reaction afterward"]),
      first_action: "The next time you meet a low-risk person in the dining hall, office, or on the road, say one sentence above; do not try to extend it.",
      possible_resistance: "It may feel like performing, awkward, or risky if their response is flat.",
      if_resistance: "If speaking is too much, stay in a people-containing setting for 5 minutes, or walk alone for 10 minutes and record one real-world detail.",
      not_today: "Do not test whether you are popular today; do not upgrade a light greeting into a deep relationship verdict.",
      finish_standard: "You initiate one tiny real contact, or at least bring the body into a real setting with people."
    },
    "2026-07-14": zh ? {
      mainline: "Day 3：验证新手入口，而不是验证我是否被接纳。",
      target_setting: "球场空档，或一个知道球场安排的人；不加入正式局。",
      message_to_send: "我想自己先练 20 分钟，不加入正式局。你知道什么时候球场比较空吗？",
      top_tasks: formatList(["问球场空档", "或去球场观察 10 分钟", "把反馈记录成场景信息"]),
      first_action: "问一个熟悉球场安排的人，或直接去球场看 10 分钟。",
      possible_resistance: "害怕打不好、出丑、重新进入被评价体系。",
      if_resistance: "如果不敢问，就只去球场附近走一圈；目标是获得场景信息。",
      not_today: "今天不进入正式局，不证明我适不适合集体活动。",
      finish_standard: "得到一个现实信号：可进入 / 暂不可进入 / 需要换场景。"
    } : {
      mainline: "Day 3: test beginner entry, not whether I am accepted.",
      target_setting: "An empty court slot, or one person who knows the court rhythm; do not join the formal game.",
      message_to_send: "I want to practice alone for 20 minutes first, not join the formal game. Do you know when the court is usually empty?",
      top_tasks: formatList(["Ask about an empty court slot", "Or observe the court for 10 minutes", "Record feedback as setting information"]),
      first_action: "Ask someone who knows the court rhythm, or visit the court for 10 minutes.",
      possible_resistance: "Fear of being bad, embarrassing yourself, or re-entering an evaluation system.",
      if_resistance: "If asking is too much, just walk near the court once; the goal is setting information.",
      not_today: "Do not join the formal game or prove whether you belong in group activities today.",
      finish_standard: "Get one real signal: enterable / not yet enterable / needs another setting."
    },
    "2026-07-15": zh ? {
      mainline: "Day 4：启动深连接层，把深需要交给更合适的人或共同体。",
      target_setting: "女性朋友、mentor、Dream Group 成员或可信任属灵长辈。",
      message_to_send: "我最近在面对孤独和连接感的问题，想找一个人认真聊 40 分钟。你这周有时间吗？不用解决我，我只是想被听见，也想听听你的真实经验。",
      top_tasks: formatList(["选一个能承载深谈的人", "发出 30-40 分钟请求", "不把对方是否立刻有空当作成败"]),
      first_action: "只选一个合适对象，把上面这句话改得更像自己后发送。",
      possible_resistance: "可能觉得请求太重，或转向边界复杂对象。",
      if_resistance: "改短：我最近有一点关于关系和孤独的思考，想找你聊聊。你这周有没有比较轻松的时间？",
      not_today: "今天不把深层需要交给随机同事或边界复杂的人。",
      finish_standard: "深谈请求发出即可。"
    } : {
      mainline: "Day 4: start the deep-connection layer and bring deep needs to a suitable person or community.",
      target_setting: "Female friend, mentor, Dream Group member, or trusted faith elder.",
      message_to_send: "I am facing loneliness and connection lately, and I would like to talk seriously for 40 minutes. Do you have time this week? You do not need to solve it; I just want to be heard and hear your real experience too.",
      top_tasks: formatList(["Choose one person who can hold depth", "Ask for 30-40 minutes", "Do not use immediate availability as success or failure"]),
      first_action: "Choose one suitable person, make the sentence sound like you, and send it.",
      possible_resistance: "The request may feel too heavy, or you may shift toward a boundary-complicated person.",
      if_resistance: "Make it shorter: I have been thinking about relationships and loneliness. Do you have a relaxed time this week to talk?",
      not_today: "Do not hand deep needs to random coworkers or boundary-complicated people today.",
      finish_standard: "The deep-talk request is sent."
    },
    "2026-07-16": zh ? {
      mainline: "Day 5：共同生活片段。今天邀请一个人做一件很小的生活事。",
      target_setting: "营地、食堂、小卖部、熟悉散步路线；低风险对象即可。",
      message_to_send: "我准备去买点东西，你要不要一起走一趟？不方便也没关系。",
      top_tasks: formatList(["选一个很小的生活动作", "只邀请一个人", "对方拒绝也记录为现实反馈"]),
      first_action: "把要做的小事定下来：买东西、吃饭、散步或取东西；发出一次低压邀请。",
      possible_resistance: "可能会觉得这种小事不值得邀请，或怕被拒绝后更孤单。",
      if_resistance: "如果发不出去，就自己完成这件小事，并记录路上看到的三个细节。",
      not_today: "今天不制造重大约会感，不把共同生活片段包装成关系考试。",
      finish_standard: "至少制造一个共同生活机会，哪怕对方拒绝。"
    } : {
      mainline: "Day 5: shared-life fragment. Invite one person into one very small life errand today.",
      target_setting: "Camp, dining hall, small shop, familiar walking route; one low-risk person is enough.",
      message_to_send: "I am going to buy a few things. Want to walk there together? No pressure if not.",
      top_tasks: formatList(["Choose one small life action", "Invite one person only", "Record refusal as real feedback too"]),
      first_action: "Choose the small errand: buying something, eating, walking, or picking something up; send one low-pressure invitation.",
      possible_resistance: "It may feel too small to invite someone, or refusal may feel lonelier.",
      if_resistance: "If sending is too much, do the errand alone and record three details seen on the way.",
      not_today: "Do not turn this into a major date or a relationship exam.",
      finish_standard: "Create at least one shared-life opportunity, even if they decline."
    },
    "2026-07-17": zh ? {
      mainline: "Day 6：关系地图初版。今天不必发新请求，先整理真实人和真实场景。",
      target_setting: "Connection Log 的关系地图；只写真实人、真实角色或真实场景。",
      message_to_send: "今天可以不发送。若想轻触一个人：我这周在整理自己真实连接的入口，想到你，想问问你最近怎么样？",
      top_tasks: formatList(["核心支持写 0-3 个真实候选", "温暖熟人/本地生活同伴/共同体各写真实线索", "边界复杂对象单独放入边界栏"]),
      first_action: "打开 Connection Log 的关系地图，只填真实条目；空缺就写空缺。",
      possible_resistance: "可能会想用理想型填空，或因为空缺而自责。",
      if_resistance: "如果难受，就只填两栏：已有真实入口、当前空缺。",
      not_today: "今天不把空缺解释成个人失败。",
      finish_standard: "关系地图至少更新一栏。"
    } : {
      mainline: "Day 6: first relationship map. No new request is required; organize real people and real settings first.",
      target_setting: "Relationship map in Connection Log; write only real people, real roles, or real settings.",
      message_to_send: "You may send nothing today. If you want one light touch: I am mapping real connection points this week and thought of you. How have you been lately?",
      top_tasks: formatList(["Write 0-3 real candidates for core support", "Add real clues under warm acquaintances / local life companions / community", "Put boundary-complicated people in the boundary column"]),
      first_action: "Open the relationship map in Connection Log and fill only real entries; write empty if empty.",
      possible_resistance: "You may want to fill with ideals or blame yourself for gaps.",
      if_resistance: "If it hurts, fill only two columns: existing real entry, current gap.",
      not_today: "Do not interpret gaps as personal failure today.",
      finish_standard: "Update at least one relationship-map column."
    },
    "2026-07-18": zh ? {
      mainline: "Day 7：周复盘和下一轮实验。选择一个最有希望复现的连接场景，轻轻复约。",
      target_setting: "本周最不消耗、最能让我进入现实生活的人或场景。",
      message_to_send: "上次一起走那一段我觉得挺舒服的。下周如果你也想散步，我们可以再约一次；不方便也没关系。",
      top_tasks: formatList(["先做 App 陪伴周复盘", "从可复约/继续观察里只选一个", "发出一次具体但轻的复约"]),
      first_action: "打开趋势 -> 7 天 -> 陪伴周复盘；看四个草稿后，只选一个可复现入口。",
      possible_resistance: "可能想一次修复所有关系，或因为本周反馈少而否定系统。",
      if_resistance: "如果没有可复约对象，就保留下周一个实验：轻问候、散步或新手入口。",
      not_today: "今天不追求总结人生，只保留一个下周继续实验。",
      finish_standard: "选出下周一个继续实验的真实场景。"
    } : {
      mainline: "Day 7: weekly review and the next experiment. Choose one connection setting most likely to repeat and make a gentle follow-up.",
      target_setting: "The least draining person or setting this week that helped you enter real life.",
      message_to_send: "I liked that short walk last time. If you feel like walking next week, we could do it again. No pressure if not.",
      top_tasks: formatList(["Run the App Companion weekly review first", "Choose only one follow-up / keep-observing clue", "Send one concrete but light follow-up"]),
      first_action: "Open Lens -> 7 days -> Companion week; after the four draft decisions, choose one repeatable entry.",
      possible_resistance: "You may want to repair every relationship at once, or dismiss the system if feedback is sparse.",
      if_resistance: "If there is no follow-up candidate, keep one next-week experiment: light greeting, walk, or beginner entry.",
      not_today: "Do not summarize your whole life today; keep one experiment for next week.",
      finish_standard: "Choose one real setting to continue experimenting with next week."
    }
  };
  const fallback = zh ? {
    mainline: "今日连接实验：选一个真实对象或真实场景，做一个 10 分钟内能完成的低压动作。",
    target_setting: "从营地轻问候、熟悉散步路线、球场新手入口、Dream Group、教会、女性朋友/mentor 中选一个。",
    message_to_send: "我准备出去走 20-30 分钟，你要不要一起走一小段？不方便也没关系。",
    top_tasks: formatList(["只选一个入口", "发出一个可拒绝的小请求，或让身体进入真实场景", "行动后写四行 Companion Trace"]),
    first_action: "现在选一个真实入口；如果不知道选什么，就选熟悉散步路线。",
    possible_resistance: "可能会想继续分析，或等待别人先邀请。",
    if_resistance: "把动作降到 3 分钟：喝水、穿鞋、站到门外。",
    not_today: "今天不做身份判断。",
    finish_standard: "出现一个现实反馈，或身体进入现实世界一次。"
  } : {
    mainline: "Today's connection experiment: choose one real person or setting and do one low-pressure action within 10 minutes.",
    target_setting: "Choose one: camp light greeting, familiar walking route, beginner court entry, Dream Group, church, female friend/mentor.",
    message_to_send: "I am going for a 20-30 minute walk. Want to join for a short stretch? No pressure if not.",
    top_tasks: formatList(["Choose one entry only", "Send one declinable small request or enter a real setting", "Write a four-line Companion Trace afterward"]),
    first_action: "Choose one real entry now; if unsure, choose the familiar walking route.",
    possible_resistance: "You may keep analyzing or wait for someone else to invite you first.",
    if_resistance: "Shrink the action to 3 minutes: drink water, put shoes on, stand outside.",
    not_today: "No identity verdict today.",
    finish_standard: "One real feedback appears, or the body enters the real world once."
  };
  return experiments[date] || fallback;
}
function companionTodayTemplate(actionLine) {
  const inventory = inventoryInstructionLine(currentLanguage === "zh");
  return currentLanguage === "zh"
    ? [
        `今日连接实验：${currentDate}`,
        actionLine.mainline,
        inventory,
        `真实对象/场景：${actionLine.target_setting}`,
        `可发送的话：${actionLine.message_to_send}`,
        "要求：只做今天这一件；完成标准是出现现实反馈，不是心情立刻变好。"
      ].join("\n")
    : [
        `Today's connection experiment: ${currentDate}`,
        actionLine.mainline,
        inventory,
        `Person / setting: ${actionLine.target_setting}`,
        `Message to send: ${actionLine.message_to_send}`,
        "Rule: do only this one thing today; the finish standard is real feedback, not instantly feeling better."
      ].join("\n");
}function fillCompanionTodayExperiment() {
  const actionLine = companionTodayExperimentForDate(currentDate, currentLanguage === "zh");
  const input = $("#priming-input");
  const current = input.value.trim();
  const template = companionTodayTemplate(actionLine);
  input.value = current ? `${current}\n\n${template}` : template;
  applyActionLine(actionLine, "local");
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
  showToast(currentLanguage === "zh" ? "已生成今日连接实验。" : "Today\'s connection experiment is ready.");
}
function companionOutcomeTemplate() {
  return currentLanguage === "zh"
    ? [
        "Companion Review",
        "",
        "今天执行的是：首触 / 复约 / 深谈 / 新手入口 / 边界转移 / 自我陪伴",
        "现实反馈：",
        "我身体怎么反应：",
        "这个人/场景目前能承载：轻连接 / 共同活动 / 深谈 / 暂不能承载 / 需要边界",
        "下一步：复约 / 降级为温暖熟人 / 换请求 / 换场景 / 停止 / 自我陪伴",
      ].join("\n")
    : [
        "Companion Review",
        "",
        "Today I practiced: first touch / follow-up / deep talk / beginner entry / boundary redirect / self-companionship",
        "Reality response:",
        "How my body responded:",
        "This person/setting can currently hold: light connection / shared activity / deep talk / not yet / needs boundary",
        "Next step: follow up / downgrade to warm acquaintance / change request / change setting / stop / self-companionship",
      ].join("\n");
}
function fillCompanionOutcome() {
  const input = $("#outcome-input");
  const current = input.value.trim();
  input.value = current ? `${current}\n\n${companionOutcomeTemplate()}` : companionOutcomeTemplate();
  savePriming({ quiet: true });
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
  showToast(currentLanguage === "zh" ? "已放入陪伴回看模板。" : "Companion review inserted.");
}
function companionLowEnergyTemplate() {
  return currentLanguage === "zh"
    ? [
        "我现在很孤独或很低能量，不想分析。",
        "请给我一个最低摩擦版本：先离开屏幕、进入现实世界，再决定是否发一个低压连接请求。",
        "要求：不要诊断我；不要泛泛鼓励；只给 3 分钟第一步、10-20 分钟可选动作、一句可发送的话、一个不发送时的托底动作。",
      ].join("\n")
    : [
        "I feel lonely or low-energy right now and do not want to analyze.",
        "Give me the lowest-friction version: leave the screen, enter the real world, then decide whether to send one low-pressure connection request.",
        "Requirements: do not diagnose me; do not give generic encouragement; give one 3-minute first step, one optional 10-20 minute action, one message I can send, and one fallback if I do not send it.",
      ].join("\n");
}
function buildCompanionLowEnergyActionLine() {
  return currentLanguage === "zh" ? {
    mainline: "低能量版本：先让身体进入现实世界，不在床上或屏幕前继续推演身份结论。",
    target_setting: "熟悉散步路线、门外、窗边或营地里安全的现实空间；先不联系人。",
    message_to_send: "低能量时可以先不发送。若还有一点力气：我准备出去走 10-20 分钟，你要不要一起走一小段？不方便也没关系。",
    top_tasks: formatList(["喝水、洗脸、穿鞋", "站到门外或窗边 3 分钟", "如果身体允许，走熟悉路线 10-20 分钟"]),
    first_action: "现在做：把手机放到一边，喝水，洗脸，穿鞋，站到门外 3 分钟。",
    possible_resistance: "可能会觉得没人陪就没有意义，或想继续刷手机麻痹孤独。",
    if_resistance: "如果不想联系任何人，就只走 10 分钟；回来写一句：今天即使没人陪，我也进入了现实世界。",
    not_today: "今天不判断我有没有魅力，不判断我有没有朋友，不追问某个人在不在乎我。",
    finish_standard: "身体离开屏幕一次；看到现实里的 3 个细节；如果还有一点力气，再发一个低压请求。"
  } : {
    mainline: "Low-energy version: bring the body into the real world before deriving identity conclusions from bed or screen.",
    target_setting: "Familiar walking route, doorway, window, or a safe real-world space in camp; do not contact anyone first.",
    message_to_send: "When energy is low, you may send nothing first. If there is a little capacity: I am going for a 10-20 minute walk. Want to join for a short stretch? No pressure if not.",
    top_tasks: formatList(["Drink water, wash face, put shoes on", "Stand outside or by a window for 3 minutes", "If possible, walk the familiar route for 10-20 minutes"]),
    first_action: "Do now: put the phone aside, drink water, wash your face, put shoes on, stand outside for 3 minutes.",
    possible_resistance: "It may feel meaningless without company, or scrolling may keep numbing the loneliness.",
    if_resistance: "If contacting anyone is too much, walk for 10 minutes and record: I entered the real world even without company today.",
    not_today: "Do not decide whether you are attractive, whether you have friends, or whether one person cares today.",
    finish_standard: "Leave the screen once; notice 3 real-world details; if there is a little capacity left, send one low-pressure request."
  };
}
function fillCompanionLowEnergy() {
  const input = $("#priming-input");
  const current = input.value.trim();
  input.value = current ? `${current}\n\n${companionLowEnergyTemplate()}` : companionLowEnergyTemplate();
  applyActionLine(buildCompanionLowEnergyActionLine(), "local");
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
  showToast(currentLanguage === "zh" ? "已生成低能量陪伴行动线。" : "Low-energy Companion action line is ready.");
}
function generateActionLine() {
  const raw = $("#priming-input").value.trim();
  if (!raw) { showToast(t("priming_empty")); return; }
  const recent = buildRecentSignals(7);
  applyActionLine(localGenerateActionLine(raw, recent), "local");
  showToast(currentLanguage === "zh" ? "已生成本地行动线，可以继续编辑。" : "Local action line is ready. You can edit it.");
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
function companionOutcomeTraceText(session) {
  const zh = currentLanguage === "zh";
  const actionLine = readActionFields();
  const actionLines = ACTION_DEFS.map((def) => {
    const value = String(actionLine[def.id] || "").trim();
    return value ? `${labelFor(def)}：${value}` : "";
  }).filter(Boolean);
  const outcome = String($("#outcome-input")?.value || session?.outcome || "").trim();
  const raw = String($("#priming-input")?.value || session?.raw || "").trim();
  const parts = [
    zh ? "Companion Outcome Trace" : "Companion Outcome Trace",
    "",
    zh ? `日期：${currentDate}` : `Date: ${currentDate}`,
    "",
    zh ? "行动线：" : "Action line:",
    actionLines.length ? actionLines.join("\n") : (zh ? "未生成行动线。" : "No action line generated."),
    "",
    zh ? "现实反馈 / 回看：" : "Real feedback / review:",
    outcome || (zh ? "待补：实际发生了什么、对方如何回应、我的身体怎么反应、下一步是什么。" : "To fill: what happened, how the other person responded, how my body reacted, and what the next step is."),
  ];
  if (raw && /今日连接实验|Today's connection experiment|我想建立真实连接|Companion/.test(raw)) {
    parts.push("", zh ? "启动原文：" : "Starter text:", trimSentence(raw.replace(/\s+/g, " "), 220));
  }
  return parts.join("\n");
}
function saveCompanionOutcomeTrace() {
  const session = ensureActivePriming();
  savePriming({ quiet: true });
  const text = companionOutcomeTraceText(session);
  if (!text.trim()) {
    showToast(currentLanguage === "zh" ? "先写一点现实反馈再保存。" : "Write a little real feedback before saving.");
    return;
  }
  const day = ensureDay(currentDate);
  const now = new Date().toISOString();
  const source = `companion-outcome-${session.id}`;
  const existing = day.traces.find((trace) => trace.source === source);
  if (existing) {
    existing.text = text;
    existing.tags = ["relationship", "companion"];
    existing.updated_at = now;
  } else {
    day.traces.push({ id: makeId(), created_at: now, updated_at: now, text, tags: ["relationship", "companion"], source });
  }
  day.metadata.updated_at = now;
  day.extraction = buildExtraction(day);
  renderObserve(); renderLens(); renderCorpus(); schedulePersist();
  showToast(currentLanguage === "zh" ? "陪伴回看已保存为记录。" : "Companion review saved as a trace.");
}
function isCompanionPriming(raw) {
  return /companion|connection|follow-up|first touch|deep talk|boundary redirect|self-companionship|陪伴|真实连接|连接感|首触|复约|深谈|边界转移|自我陪伴|孤独|散步|球场|新手|Dream Group|mentor|属灵|教会/.test(raw || "");
}
function detectCompanionMode(raw) {
  const text = raw || "";
  if (/边界|boundary|已婚|不适合|吸引|暧昧|牵动/.test(text)) return "boundary";
  if (/复约|follow-up|again|上次|再约|舒服互动|延续/.test(text)) return "followup";
  if (/深谈|deep|mentor|Dream Group|属灵|教会|女性朋友|被听见|40 分钟|40分钟/.test(text)) return "deep";
  if (/球|新手|练|发球|正式局|运动|badminton|basketball/.test(text)) return "practice";
  if (/自我陪伴|没有力气|很低落|刷手机|走出去|没人陪|alone/.test(text)) return "self";
  return "first_touch";
}
function companionTargetSetting(mode, zh) {
  const targets = {
    first_touch: zh ? "从真实入口里只选一个：项目营地轻问候 / 食堂或办公室低风险对象 / 熟悉散步路线。" : "Choose one real entry only: camp light greeting / low-risk person in dining hall or office / familiar walking route.",
    followup: zh ? "选上次互动后让我更展开的一个人或场景；只复约一次，不同时打开多条线。" : "Choose one person or setting that left me more open last time; follow up once, not across many lines.",
    deep: zh ? "选女性朋友 / mentor / Dream Group / 属灵长辈，不把深层需要压到随机同事或边界复杂的人身上。" : "Choose a female friend / mentor / Dream Group / trusted faith elder; do not place deep needs on random coworkers or boundary-complicated people.",
    practice: zh ? "选球场空档或一个可能愿意 10 分钟陪练的人；不进入正式局。" : "Choose an empty court slot or one person who may help with 10 minutes of practice; do not enter the formal game.",
    boundary: zh ? "不选边界复杂对象；把需要转向女性朋友、Dream Group、教会、散步或可发展关系场域。" : "Do not choose the boundary-complicated person; redirect the need to a female friend, Dream Group, church, a walk, or a viable relationship setting.",
    self: zh ? "选熟悉散步路线、门外、窗边或营地里安全的现实空间；先不联系人。" : "Choose the familiar walking route, doorway, window, or a safe real-world space in camp; do not contact anyone first."
  };
  return targets[mode] || targets.first_touch;
}
function companionMessageToSend(mode, zh) {
  const messages = {
    first_touch: zh ? "我准备出去走 20-30 分钟，你要不要一起走一小段？不方便也没关系。" : "I am going for a 20-30 minute walk. Want to join for a short stretch? No pressure if not.",
    followup: zh ? "上次一起走那一段我觉得挺舒服的。你这周如果也想散步，我们可以再约 20 分钟；不方便也没关系。" : "I liked that short walk last time. If you feel like walking this week, we could do another 20 minutes. No pressure if not.",
    deep: zh ? "我最近在面对孤独和真实连接的问题，想找一个人认真聊 40 分钟。你这周有时间吗？不用解决我，我只是想被听见，也想听听你的真实经验。" : "I am facing loneliness and real connection lately, and I would like to talk seriously for 40 minutes. Do you have time this week? You do not need to solve it; I just want to be heard and hear your real experience too.",
    practice: zh ? "我不加入正式局，想自己先练 20 分钟。你知道什么时候球场比较空吗？" : "I will not join the formal game; I want to practice alone for 20 minutes first. Do you know when the court is usually empty?",
    boundary: zh ? "不发送给边界复杂对象。改发给女性朋友/mentor：我最近有一点关于关系和孤独的思考，想找你聊聊。你这周有没有比较轻松的时间？" : "Do not send this to the boundary-complicated person. Redirect to a female friend/mentor: I have been thinking about loneliness and relationships. Do you have a relaxed time this week to talk?",
    self: zh ? "今天先不发送。托底记录：今天即使没人陪，我也进入了现实世界。" : "Send nothing first today. Fallback record: I entered the real world even without company today."
  };
  return messages[mode] || messages.first_touch;
}
function buildCompanionActionLine(raw, recent) {
  const mode = detectCompanionMode(raw);
  const zh = currentLanguage === "zh";
  const lines = {
    first_touch: zh ? {
      mainline: "今天的连接动作是首触：先让自己和一个真实人或真实场景发生低压接触。",
      top_tasks: formatList(["选一个低风险对象或场景", "发出一个可拒绝的小邀请", "行动后写四行 Companion Trace"]),
      first_action: "现在选择一个低风险对象，把下面这句话发出去；如果不适合发，就自己走 20 分钟。",
      possible_resistance: "可能会担心被拒绝、打扰别人，或又回到等待被邀请。",
      if_resistance: "如果发不出去，就先自己走 20 分钟；回来记录：今天即使没人陪，我也进入了现实世界。",
      not_today: "今天不需要证明我有没有魅力，也不需要一次融入一个群体。",
      finish_standard: "请求发出，或我真实出现在一个场景里，并完成一条 4 行记录。"
    } : {
      mainline: "Today's companion action is first touch: create one low-pressure contact with a real person or setting.",
      top_tasks: formatList(["Choose one low-risk person or setting", "Send one small request that can be declined", "Write a four-line Companion Trace afterward"]),
      first_action: "Choose one low-risk person and send the sentence below. If sending does not fit, walk alone for 20 minutes.",
      possible_resistance: "You may worry about rejection, bothering someone, or waiting to be invited again.",
      if_resistance: "If sending is too much, walk alone for 20 minutes and record: I entered the real world even without company.",
      not_today: "No need to prove attractiveness or belong to a whole group today.",
      finish_standard: "A request is sent, or you show up in one real setting, then save a four-line record."
    },
    followup: zh ? {
      mainline: "今天的连接动作是复约：把一次还不错的互动轻轻延续一次。",
      top_tasks: formatList(["选一个上次互动后更展开的人或场景", "只发一个具体小邀请", "不把对方回应解释成身份判断"]),
      first_action: "现在选择上次互动后更展开的对象，把下面这句话发出去；只复约一次。",
      possible_resistance: "可能会想把复约看得很重，或担心对方拒绝就说明关系没有希望。",
      if_resistance: "如果紧张，把邀请缩到 10-20 分钟；如果对方没空，只换时间一次，不连续追问。",
      not_today: "今天不需要定义这段关系，只验证它能不能重复出现一次。",
      finish_standard: "复约请求发出，并记录对方现实反馈。"
    } : {
      mainline: "Today's companion action is follow-up: gently repeat one interaction that felt workable or good.",
      top_tasks: formatList(["Choose one person or setting that left you more open", "Send one specific small invitation", "Do not turn the reply into an identity verdict"]),
      first_action: "Choose the person or setting that left you more open and send the sentence below once.",
      possible_resistance: "You may make the follow-up feel too heavy, or read refusal as proof the relationship has no hope.",
      if_resistance: "Shrink it to 10-20 minutes. If they are unavailable, offer one alternate time only.",
      not_today: "No need to define the relationship today; only test whether it can repeat once.",
      finish_standard: "A follow-up request is sent and the real response is recorded."
    },
    deep: zh ? {
      mainline: "今天的连接动作是深谈：把深连接需要交给更合适的人或共同体。",
      top_tasks: formatList(["选择女性朋友、mentor、Dream Group 或属灵长辈", "发出 30-40 分钟深谈请求", "说明不需要对方解决我，只想被听见"]),
      first_action: "现在选择一个能承载深谈的人，把下面这句话发出去。",
      possible_resistance: "可能会觉得这个请求太重，或转而把需要压到不适合发展的人身上。",
      if_resistance: "如果太重，改成：我最近有一点关于关系和孤独的思考，想找你聊聊。你这周有没有比较轻松的时间？",
      not_today: "今天不把深层需要交给随机同事或边界复杂的人。",
      finish_standard: "深谈请求发出；不以对方是否立刻有空作为成败。"
    } : {
      mainline: "Today's companion action is deep talk: bring the need for depth to a suitable person or community.",
      top_tasks: formatList(["Choose a female friend, mentor, Dream Group member, or trusted faith elder", "Ask for 30-40 minutes", "Say you do not need fixing, only being heard"]),
      first_action: "Choose one person who can hold depth and send the sentence below.",
      possible_resistance: "The request may feel too heavy, or you may shift the need onto someone with complicated boundaries.",
      if_resistance: "Make it lighter: I have been thinking about loneliness and relationships. Do you have a relaxed time this week to talk?",
      not_today: "Do not hand deep needs to random coworkers or boundary-complicated people today.",
      finish_standard: "The deep-talk request is sent; immediate availability is not the measure of success."
    },
    practice: zh ? {
      mainline: "今天的连接动作是新手入口：不冲正式局，只验证这个场景能不能容纳练习。",
      top_tasks: formatList(["问球场空档", "或请求 10 分钟发球练习", "把反馈记录成场景信息，不记录成人格结论"]),
      first_action: "现在问一个熟悉球场安排的人，或直接去空场观察 10 分钟。",
      possible_resistance: "可能会害怕打不好、出丑、重新进入被评价体系。",
      if_resistance: "如果不敢问，就自己去球场看 10 分钟，或改走熟悉路线 20 分钟。",
      not_today: "今天不验证我适不适合集体活动，只验证有没有新手入口。",
      finish_standard: "得到一个现实信号：可进入 / 暂不可进入 / 需要换场景。"
    } : {
      mainline: "Today's companion action is beginner entry: do not join the formal game; test whether practice is possible.",
      top_tasks: formatList(["Ask when the court is empty", "Or ask for 10 minutes of serve practice", "Record the feedback as setting data, not a personality conclusion"]),
      first_action: "Ask someone who knows the court rhythm, or visit the empty court for 10 minutes.",
      possible_resistance: "You may fear being bad, embarrassing yourself, or re-entering an evaluation system.",
      if_resistance: "If asking is too much, visit the court for 10 minutes or walk the familiar route for 20 minutes.",
      not_today: "Do not test whether you belong in group activities today; only test whether there is a beginner entry.",
      finish_standard: "Get one real signal: enterable / not yet enterable / needs another setting."
    },
    boundary: zh ? {
      mainline: "今天的连接动作是边界转移：承认吸引，但不把连接需要压到不适合发展的人身上。",
      top_tasks: formatList(["写下这份吸引指向的需要", "不制造单独暧昧场景", "把需要转向女性朋友、Dream Group、教会或散步"]),
      first_action: "先写，不发送：这份吸引让我看见的需要是____；现实边界是____；今天我不会做的是____；我可以把这个需要带到____。",
      possible_resistance: "可能会想用‘只是聊聊’靠近对方，或把最快乐的记忆误当作行动许可。",
      if_resistance: "如果很想联系对方，先延迟 24 小时；改给女性朋友/mentor 发一个 40 分钟深谈请求，或出门走 20 分钟。",
      not_today: "今天不单独制造暧昧，不让一个边界复杂的人成为主要情绪出口。",
      finish_standard: "需要被写清楚，并被分流到更合适的人或场景。"
    } : {
      mainline: "Today's companion action is boundary redirect: acknowledge attraction without placing connection needs on an unavailable person.",
      top_tasks: formatList(["Write what need the attraction reveals", "Do not create a private ambiguous setting", "Redirect the need to a female friend, Dream Group, church, or a walk"]),
      first_action: "Write, do not send: This attraction shows I need ____; the real boundary is ____; today I will not ____; I can bring this need to ____.",
      possible_resistance: "You may want to move closer through 'just talking', or treat a joyful memory as permission to act.",
      if_resistance: "If you want to contact them, wait 24 hours. Send a deep-talk request to a female friend/mentor or walk for 20 minutes instead.",
      not_today: "No private ambiguity today; no boundary-complicated person as the main emotional outlet.",
      finish_standard: "The need is named and redirected to a more suitable person or setting."
    },
    self: zh ? {
      mainline: "今天的连接动作是自我陪伴：先离开屏幕，让身体重新进入现实世界。",
      top_tasks: formatList(["离开床或屏幕", "喝水、洗脸、站到门外", "走 20 分钟后写四行记录"]),
      first_action: "现在做：喝水，洗脸，穿鞋，走熟悉路线 20 分钟。不要边走边刷手机。",
      possible_resistance: "可能会觉得没人陪就没有意义，或继续用屏幕麻痹孤独。",
      if_resistance: "如果 20 分钟太多，就只站到门外 3 分钟；目标是进入现实，不是状态立刻变好。",
      not_today: "今天不在床上继续推演人生结论。",
      finish_standard: "身体离开屏幕一次，并记录现实里看到的三个细节。"
    } : {
      mainline: "Today's companion action is self-companionship: leave the screen and bring the body back into the real world.",
      top_tasks: formatList(["Leave bed or screen", "Drink water, wash face, stand outside", "Walk 20 minutes and save a four-line record"]),
      first_action: "Do now: drink water, wash your face, put shoes on, walk the familiar route for 20 minutes. Do not scroll while walking.",
      possible_resistance: "It may feel meaningless without company, or the screen may keep numbing the loneliness.",
      if_resistance: "If 20 minutes is too much, stand outside for 3 minutes. The goal is entering reality, not instantly feeling better.",
      not_today: "Do not keep deriving life conclusions from bed today.",
      finish_standard: "Leave the screen once and record three details you saw in the real world."
    }
  };
  return { target_setting: companionTargetSetting(mode, zh), message_to_send: companionMessageToSend(mode, zh), ...(lines[mode] || lines.first_touch) };
}
function localGenerateActionLine(raw, recent) {
  if (isCompanionPriming(raw)) return buildCompanionActionLine(raw, recent);
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
  const corpusCount = activeDays.reduce((sum, day) => sum + day.traces.length + day.primings.length, 0);
  $("#lens-summary").innerHTML = [
    metric(currentLanguage === "zh" ? "记录天数" : "Recorded days", activeDays.length, currentLanguage === "zh" ? `${lensRange} 天窗口` : `${lensRange} day window`),
    metric(currentLanguage === "zh" ? "原始记录" : "Raw traces", traceCount, currentLanguage === "zh" ? "原文完整保留" : "original text preserved"),
    metric(currentLanguage === "zh" ? "行动线" : "Action lines", primingCount, currentLanguage === "zh" ? "已保存 Priming" : "saved priming sessions"),
    metric(currentLanguage === "zh" ? "语料条目" : "Corpus items", corpusCount, currentLanguage === "zh" ? "一次输入对应一条" : "one item per input")
  ].join("");
  $("#lens-days").textContent = currentLanguage === "zh" ? `${lensRange} 天` : `${lensRange} days`;
  renderCompanionEvidence(activeDays);
  renderObservations(activeDays);
  clearCompanionRelationshipMap();
  clearCompanionWeeklyReview();
  renderTimeline(lensRange);
}
function metric(label, value, copy) { return `<div class="metric"><strong>${value}</strong><span>${escapeHtml(label)} · ${escapeHtml(copy)}</span></div>`; }
function evidenceStatus(count, target) {
  return count >= target ? (currentLanguage === "zh" ? "已出现" : "present") : (currentLanguage === "zh" ? "待补" : "missing");
}
function evidenceLine(label, count, target, copy) {
  const status = evidenceStatus(count, target);
  const text = currentLanguage === "zh" ? `${label}：${count}/${target} · ${status}。${copy}` : `${label}: ${count}/${target} · ${status}. ${copy}`;
  return `<li>${escapeHtml(text)}</li>`;
}
function renderCompanionEvidence(days) {
  const target = $("#companion-evidence");
  if (!target) return;
  const allEntries = companionEntryTexts(days);
  const items = companionSignalItems(days);
  const requestCount = companionCount(items, /邀请|请求|问|约|散步|聊|练|发出|send|ask|invite|walk|talk|practice/i);
  const feedbackCount = allEntries.filter((item) => String(item.source || "").startsWith("companion-outcome") || /Companion Outcome Trace|现实反馈|Real feedback|对方\/现实怎么回应|How the person\/reality responded/i.test(item.text)).length;
  const followupCount = companionCount(items, /复约|再约|延续|舒服|更展开|follow-up|again|liked|repeat/i);
  const boundaryCount = companionCount(items, /边界|已婚|吸引|暧昧|牵动|不适合|降级|停止|boundary|attraction|downgrade|stop|unavailable/i);
  const mapCount = allEntries.filter((item) => String(item.source || "").startsWith("companion-map")).length;
  const zh = currentLanguage === "zh";
  const missing = [];
  if (requestCount < 3) missing.push(zh ? "发一个低成本请求" : "send one low-cost request");
  else if (feedbackCount < 3) missing.push(zh ? "行动后保存为陪伴记录" : "save the post-action review as a Companion trace");
  else if (followupCount < 1) missing.push(zh ? "观察是否有可复约线索" : "look for one follow-up signal");
  else if (boundaryCount < 1) missing.push(zh ? "记录一个需要边界或降级的线索" : "record one boundary or downgrade signal");
  else if (mapCount < 1) missing.push(zh ? "保存一次陪伴地图" : "save one Companion map");
  const next = missing[0] || (zh ? "本周证据已比较完整；下一步是按关系地图复约或保留一个下周实验。" : "This week has a workable evidence set; next step is to follow up from the relationship map or keep one next-week experiment.");
  target.innerHTML = `<ul>${[
    evidenceLine(zh ? "低成本连接请求" : "Low-cost requests", requestCount, 3, zh ? "目标不是被答应，而是让现实反馈回来。" : "The goal is not being accepted; it is getting real feedback."),
    evidenceLine(zh ? "现实反馈记录" : "Real-feedback records", feedbackCount, 3, zh ? "用“保存为陪伴记录”把行动后回看留进系统。" : "Use Save as Companion trace to keep post-action review in the system."),
    evidenceLine(zh ? "可复约/可重复信号" : "Follow-up / repeat signal", followupCount, 1, zh ? "只需要一个值得继续观察的人或场景。" : "Only one person or setting worth observing further is enough."),
    evidenceLine(zh ? "边界/降级信号" : "Boundary / downgrade signal", boundaryCount, 1, zh ? "这保护连接需要，不让它压到不合适的人身上。" : "This protects connection needs from being placed on an unsuitable person."),
    evidenceLine(zh ? "关系地图保存" : "Relationship map saved", mapCount, 1, zh ? "保存一次地图，让线索进入下周实验。" : "Save one map so the clues can shape next week’s experiment."),
    `<li>${escapeHtml(zh ? `下一步：${next}` : `Next step: ${next}`)}</li>`
  ].join("")}</ul>`;
  const windowLabel = $("#companion-evidence-window");
  if (windowLabel) windowLabel.textContent = zh ? `${lensRange} 天窗口` : `${lensRange} day window`;
}function renderObservations(days) {
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
function companionEntryTexts(days) {
  return days.flatMap((day) => {
    const traces = (day.traces || []).map((trace) => ({
      kind: "trace",
      text: `${trace.text || ""}\n${(trace.tags || []).join(" ")}`.trim(),
      created_at: trace.created_at
    }));
    const primings = (day.primings || []).map((session) => ({
      kind: "priming",
      text: `${session.raw || ""}\n${Object.values(session.action_line || {}).join("\n")}\n${session.outcome || ""}`.trim(),
      created_at: session.created_at
    }));
    return [...traces, ...primings];
  }).filter((item) => item.text);
}
function companionSignalItems(days) {
  return companionEntryTexts(days).filter((item) => {
    const source = String(item.source || "");
    if (source.startsWith("companion-weekly") || source.startsWith("companion-map")) return false;
    return /Companion|companion|陪伴|真实连接|连接感|首触|复约|深谈|新手入口|边界转移|自我陪伴|散步|Dream Group|球场|发球|共同活动/.test(item.text);
  });
}
function firstSignal(items, pattern) {
  const found = items.find((item) => pattern.test(item.text));
  return found ? trimSentence(found.text.replace(/\s+/g, " "), 110) : "";
}
function companionCount(items, pattern) {
  return items.filter((item) => pattern.test(item.text)).length;
}
function companionSignalSnippets(items, pattern, limit = 3) {
  return items.filter((item) => pattern.test(item.text)).slice(0, limit).map((item) => `${item.date}: ${trimSentence(item.text.replace(/\s+/g, " "), 130)}`);
}
function buildCompanionRelationshipMap() {
  const days = daysInRange(lensRange).filter((day) => day.traces.length || day.primings.length);
  const items = companionSignalItems(days);
  const zh = currentLanguage === "zh";
  const categories = [
    { key: "followup", title: zh ? "可复约 / 继续观察" : "Follow-up / keep observing", pattern: /复约|再约|延续|舒服|更展开|follow-up|again|liked|repeat/i, empty: zh ? "暂缺。先不要强行升级关系；继续制造低压真实接触。" : "Not clear yet. Do not force escalation; keep creating low-pressure real contact." },
    { key: "light", title: zh ? "轻连接入口" : "Light-connection entries", pattern: /轻问候|食堂|办公室|营地|低风险|问候|light greeting|dining hall|office|camp|low-risk/i, empty: zh ? "暂缺。今天优先做 1-3 分钟轻问候。" : "Not clear yet. Prioritize a 1-3 minute light greeting today." },
    { key: "shared", title: zh ? "共同活动 / 共同生活" : "Shared activity / shared life", pattern: /共同生活|共同活动|散步|走路|吃饭|买|球场|练|发球|walk|meal|errand|court|practice|shared/i, empty: zh ? "暂缺。用散步、买东西、吃饭或 10 分钟练习测试。" : "Not clear yet. Test walks, errands, meals, or 10-minute practice." },
    { key: "deep", title: zh ? "深连接 / 共同体" : "Deep connection / community", pattern: /深谈|Dream Group|mentor|属灵|教会|女性朋友|被听见|deep talk|church|community|mentor/i, empty: zh ? "暂缺。下一个实验可以是向女性朋友、mentor、Dream Group 或属灵长辈发出 30-40 分钟深谈请求。" : "Not clear yet. Next experiment can be asking a female friend, mentor, Dream Group member, or trusted faith elder for 30-40 minutes." },
    { key: "boundary", title: zh ? "需要边界 / 降级" : "Boundary / downgrade", pattern: /边界|已婚|吸引|暧昧|牵动|不适合|boundary|attraction|unavailable/i, empty: zh ? "暂无新增。继续不要把全部连接需要压到一个人身上。" : "No strong new signal. Keep distributing connection needs instead of placing them on one person." },
    { key: "gap", title: zh ? "当前空缺" : "Current gaps", pattern: /空缺|没有|没人|缺少|想不到|孤单|lonely|no one|lack|gap/i, empty: zh ? "如果没有明显空缺记录，暂不补理想型；只保留真实入口。" : "If no gap is visible, do not fill with ideals; keep only real entries." }
  ];
  const sections = categories.map((category) => {
    const lines = companionSignalSnippets(items, category.pattern, 3);
    return { ...category, lines: lines.length ? lines : [category.empty] };
  });
  const followupLines = sections.find((section) => section.key === "followup")?.lines || [];
  const deepLines = sections.find((section) => section.key === "deep")?.lines || [];
  const boundaryLines = sections.find((section) => section.key === "boundary")?.lines || [];
  const next = zh
    ? (followupLines[0] && !followupLines[0].startsWith("暂缺") ? "优先把可复约线索转成一次 20-30 分钟具体小邀请。" : deepLines[0] && deepLines[0].startsWith("暂缺") ? "优先补一个深连接请求。" : "保留一个低压、可重复的真实场景继续实验。")
    : (followupLines[0] && !followupLines[0].startsWith("Not clear") ? "Prioritize turning the follow-up clue into one concrete 20-30 minute invitation." : deepLines[0] && deepLines[0].startsWith("Not clear") ? "Prioritize one deep-connection request." : "Keep one low-pressure, repeatable real setting as the next experiment.");
  const boundary = boundaryLines[0] || (zh ? "暂无新增边界线索。" : "No new boundary signal.");
  return { items, sections, next, boundary };
}
function renderCompanionRelationshipMap() {
  const target = $("#companion-map-output");
  if (!target) return;
  const map = buildCompanionRelationshipMap();
  if (!map.items.length) {
    target.innerHTML = `<p class="empty-state">${currentLanguage === "zh" ? "还没有足够的陪伴记录来生成关系地图。先完成一次：今日实验 -> 陪伴回看 -> 保存为陪伴记录。" : "Not enough Companion records to build a map yet. Do one loop first: Today experiment -> Companion review -> Save as Companion trace."}</p>`;
    return;
  }
  target.innerHTML = map.sections.map((section) => `
    <section class="relationship-map-section">
      <h3>${escapeHtml(section.title)}</h3>
      <ul>${section.lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
    </section>`).join("") + `<section class="relationship-map-section"><h3>${currentLanguage === "zh" ? "下一步" : "Next step"}</h3><ul><li>${escapeHtml(map.next)}</li></ul></section>`;
}
function companionRelationshipMapText(map = buildCompanionRelationshipMap()) {
  const zh = currentLanguage === "zh";
  return [
    "Companion Relationship Map",
    "",
    zh ? `窗口：最近 ${lensRange} 天` : `Window: last ${lensRange} days`,
    "",
    ...map.sections.flatMap((section) => [section.title, ...section.lines.map((line) => `- ${line}`), ""]),
    zh ? "下一步：" : "Next step:",
    map.next,
    "",
    zh ? "边界提醒：" : "Boundary reminder:",
    map.boundary
  ].join("\n");
}
function saveCompanionRelationshipMap() {
  const map = buildCompanionRelationshipMap();
  renderCompanionRelationshipMap();
  if (!map.items.length) {
    showToast(currentLanguage === "zh" ? "还没有足够的陪伴记录可保存为地图。" : "Not enough Companion records to save as a map.");
    return;
  }
  const day = ensureDay(currentDate);
  const now = new Date().toISOString();
  const source = `companion-map-${lensRange}`;
  const text = companionRelationshipMapText(map);
  const existing = day.traces.find((trace) => trace.source === source);
  if (existing) {
    existing.text = text;
    existing.tags = ["relationship", "companion"];
    existing.updated_at = now;
  } else {
    day.traces.push({ id: makeId(), created_at: now, updated_at: now, text, tags: ["relationship", "companion"], source });
  }
  day.metadata.updated_at = now;
  day.extraction = buildExtraction(day);
  renderObserve(); renderLens(); renderCompanionRelationshipMap(); renderCorpus(); schedulePersist();
  showToast(currentLanguage === "zh" ? "陪伴地图已保存为今日记录。" : "Companion map saved as today\'s trace.");
}
function clearCompanionRelationshipMap() {
  const target = $("#companion-map-output");
  if (target) target.innerHTML = "";
}function companionDecisionPlan({ zh, requestCount, reviewCount, followupCount, boundaryCount, selfCount, deepCount, practiceCount, followupSignal, boundarySignal, practiceSignal, deepSignal }) {
  const followup = followupSignal
    ? trimSentence(followupSignal, 120)
    : (zh ? "暂不强行复约；先制造一次新的低压接触，再观察是否能重复出现。" : "Do not force a follow-up yet; create one new low-pressure contact first, then see whether it can repeat.");
  const boundary = boundarySignal
    ? trimSentence(boundarySignal, 120)
    : (zh ? "暂无强边界新增；继续不要把全部连接需要压到一个人身上。" : "No strong new boundary signal; keep distributing connection needs instead of placing them on one person.");
  let keepExperiment;
  if (followupSignal) {
    keepExperiment = zh ? "把可复约线索转成一次具体小邀请：20-30 分钟散步、吃饭、练习或短聊。" : "Turn the follow-up clue into one concrete small invitation: a 20-30 minute walk, meal, practice, or short talk.";
  } else if (deepCount === 0) {
    keepExperiment = zh ? "向女性朋友、mentor、Dream Group 或可信任属灵长辈发出一次 30-40 分钟深谈请求。" : "Ask a female friend, mentor, Dream Group member, or trusted faith elder for one 30-40 minute deeper conversation.";
  } else if (practiceSignal || practiceCount) {
    keepExperiment = zh ? "继续测试新手入口：只问球场空档或 10-20 分钟练习，不进入正式局。" : "Keep testing beginner entry: ask only about an empty court slot or 10-20 minutes of practice; do not enter the formal game.";
  } else if (selfCount > requestCount) {
    keepExperiment = zh ? "保留熟悉散步路线作为托底，并在身体稳定后发一次轻问候或散步邀请。" : "Keep the familiar walking route as fallback, then send one light greeting or walking invitation once the body is steadier.";
  } else {
    keepExperiment = zh ? "在营地、散步路线或共同体里发一次可拒绝的 20-30 分钟低压邀请。" : "Send one declinable 20-30 minute low-pressure invitation in camp, on the walking route, or in community.";
  }
  let stopExpectation;
  if (boundarySignal || boundaryCount) {
    stopExpectation = zh ? "停止把边界复杂对象当作主要情绪出口；把需要分流到女性朋友、共同体、散步或可发展关系。" : "Stop using the boundary-complicated person as the main emotional outlet; redirect the need to female friends, community, walks, or viable relationships.";
  } else if (practiceSignal || practiceCount) {
    stopExpectation = zh ? "停止用正式球局是否接纳我来判断我有没有位置；只把它记录成场景入口信息。" : "Stop using acceptance into the formal game as the test of whether I have a place; record it only as setting-entry information.";
  } else if (requestCount === 0) {
    stopExpectation = zh ? "停止等待别人先邀请我；本周目标是发出一个小请求，不是证明我受欢迎。" : "Stop waiting for someone else to invite me first; the goal is one small request, not proving popularity.";
  } else {
    stopExpectation = zh ? "停止用一次回应判断关系成败；只判断下一步是复约、降级、换场景还是停止。" : "Stop using one response to judge the whole relationship; decide only whether to follow up, downgrade, change setting, or stop.";
  }
  return { followup, boundary, keepExperiment, stopExpectation };
}
function buildCompanionWeeklyReview() {
  const days = daysInRange(lensRange).filter((day) => day.traces.length || day.primings.length);
  const items = companionSignalItems(days);
  const zh = currentLanguage === "zh";
  if (!items.length) {
    return {
      items,
      decisions: null,
      lines: [zh ? "这个时间窗口里还没有足够的 Companion 记录。先完成一次：定向 -> 陪伴启动 -> 生成行动线；行动后 -> 陪伴回看。" : "There are not enough Companion records in this window yet. Do one loop first: Orient -> Companion start -> Generate action line; afterward -> Companion review."]
    };
  }
  const requestCount = companionCount(items, /邀请|请求|问|约|散步|聊|练|发出|send|ask|invite|walk|talk|practice/i);
  const reviewCount = companionCount(items, /Companion Review|现实反馈|Reality response|这个人\/场景目前能承载|can currently hold/i);
  const followupCount = companionCount(items, /复约|再约|延续|follow-up|again/i);
  const boundaryCount = companionCount(items, /边界|已婚|吸引|暧昧|牵动|boundary|attraction/i);
  const selfCount = companionCount(items, /自我陪伴|没人陪|现实世界|自己走|self-companionship|alone|real world/i);
  const deepCount = companionCount(items, /深谈|Dream Group|mentor|属灵|教会|女性朋友|deep talk|church/i);
  const practiceCount = companionCount(items, /新手|球场|发球|正式局|练|beginner|court|practice/i);
  const followupSignal = firstSignal(items, /复约|再约|延续|follow-up|again/i);
  const boundarySignal = firstSignal(items, /边界|已婚|吸引|暧昧|牵动|boundary|attraction/i);
  const practiceSignal = firstSignal(items, /新手|球场|发球|正式局|练|beginner|court|practice/i);
  const deepSignal = firstSignal(items, /深谈|Dream Group|mentor|属灵|教会|女性朋友|deep talk|church/i);
  const decisions = companionDecisionPlan({ zh, requestCount, reviewCount, followupCount, boundaryCount, selfCount, deepCount, practiceCount, followupSignal, boundarySignal, practiceSignal, deepSignal });
  const lines = zh ? [
    `陪伴信号：${items.length} 条；低成本请求线索：${requestCount}；行动后回看：${reviewCount}。`,
    `关系节奏：复约线索 ${followupCount}，深谈/共同体线索 ${deepCount}，新手入口线索 ${practiceCount}，边界线索 ${boundaryCount}，自我陪伴线索 ${selfCount}。`,
    followupSignal ? `可复约候选：${followupSignal}` : "可复约候选：还不明显；本周先不要强行升级关系。",
    boundarySignal ? `需要边界或降级的线索：${boundarySignal}` : "边界线索：暂无明显新增；继续避免把全部需要压到一个人身上。",
    practiceSignal ? `共同活动/新手入口线索：${practiceSignal}` : "共同活动线索：暂无明显新增；可继续用散步或 10 分钟练习测试。",
    deepSignal ? `深连接线索：${deepSignal}` : "深连接线索：还需要主动约一个合适的人或共同体。",
    `本周决策 - 可复约/继续观察：${decisions.followup}`,
    `本周决策 - 需要边界/降级：${decisions.boundary}`,
    `下周保留的一个实验：${decisions.keepExperiment}`,
    `下周停止的一个消耗性期待：${decisions.stopExpectation}`
  ] : [
    `Companion signals: ${items.length}; low-cost request clues: ${requestCount}; action reviews: ${reviewCount}.`,
    `Relational cadence: follow-up clues ${followupCount}, deep/community clues ${deepCount}, beginner-entry clues ${practiceCount}, boundary clues ${boundaryCount}, self-companionship clues ${selfCount}.`,
    followupSignal ? `Possible follow-up: ${followupSignal}` : "Possible follow-up: not clear yet; do not force the relationship upward this week.",
    boundarySignal ? `Boundary or downgrade clue: ${boundarySignal}` : "Boundary clue: no strong new signal; keep distributing needs instead of placing them on one person.",
    practiceSignal ? `Shared activity / beginner-entry clue: ${practiceSignal}` : "Shared activity clue: not clear yet; keep testing walks or 10-minute practice.",
    deepSignal ? `Deep-connection clue: ${deepSignal}` : "Deep-connection clue: ask one suitable person or community for a deeper conversation.",
    `Decision - follow up / keep observing: ${decisions.followup}`,
    `Decision - boundary / downgrade: ${decisions.boundary}`,
    `One experiment to keep next week: ${decisions.keepExperiment}`,
    `One draining expectation to stop next week: ${decisions.stopExpectation}`
  ];
  return { items, lines, decisions };
}
function companionWeeklyReviewText(review = buildCompanionWeeklyReview()) {
  const zh = currentLanguage === "zh";
  const decisions = review.decisions || {};
  return [
    "Companion Weekly Review",
    "",
    zh ? `窗口：最近 ${lensRange} 天` : `Window: last ${lensRange} days`,
    "",
    ...review.lines.map((line) => `- ${line}`),
    "",
    zh ? "关系地图更新：" : "Relationship map update:",
    zh ? `可复约：${decisions.followup || ""}` : `Follow-up candidates: ${decisions.followup || ""}`,
    zh ? `需要降级/停止/边界：${decisions.boundary || ""}` : `Downgrade / stop / boundary: ${decisions.boundary || ""}`,
    zh ? `下周实验：${decisions.keepExperiment || ""}` : `Next week experiments: ${decisions.keepExperiment || ""}`,
    zh ? `下周停止的消耗性期待：${decisions.stopExpectation || ""}` : `Draining expectation to stop next week: ${decisions.stopExpectation || ""}`
  ].join("\n");
}
function renderCompanionWeeklyReview() {
  const target = $("#companion-weekly-review-output");
  if (!target) return;
  const review = buildCompanionWeeklyReview();
  target.innerHTML = `<ul>${review.lines.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}
function saveCompanionWeeklyReview() {
  const review = buildCompanionWeeklyReview();
  renderCompanionWeeklyReview();
  if (!review.items.length) {
    showToast(currentLanguage === "zh" ? "还没有足够的陪伴记录可保存。" : "Not enough Companion records to save yet.");
    return;
  }
  const day = ensureDay(currentDate);
  const now = new Date().toISOString();
  const source = `companion-weekly-${lensRange}`;
  const text = companionWeeklyReviewText(review);
  const existing = day.traces.find((trace) => trace.source === source);
  if (existing) {
    existing.text = text;
    existing.tags = ["relationship", "companion"];
    existing.updated_at = now;
  } else {
    day.traces.push({ id: makeId(), created_at: now, updated_at: now, text, tags: ["relationship", "companion"], source });
  }
  day.metadata.updated_at = now;
  day.extraction = buildExtraction(day);
  renderObserve(); renderLens(); renderCompanionWeeklyReview(); renderCorpus(); schedulePersist();
  showToast(currentLanguage === "zh" ? "陪伴周复盘已保存为今日记录。" : "Companion weekly review saved as today\'s trace.");
}
function clearCompanionWeeklyReview() {
  const target = $("#companion-weekly-review-output");
  if (target) target.innerHTML = "";
}
function renderTimeline(daysBack) {
  const dates = [...Array(daysBack)].map((_, index) => { const date = new Date(); date.setDate(date.getDate() - (daysBack - index - 1)); return todayKey(date); });
  const max = Math.max(1, ...dates.map((date) => (state.days[date]?.traces?.length || 0) + (state.days[date]?.primings?.length || 0)));
  $("#timeline").innerHTML = dates.map((date) => { const day = state.days[date]; const count = (day?.traces?.length || 0) + (day?.primings?.length || 0); const width = count ? Math.max(6, Math.round((count / max) * 100)) : 0; return `<div class="timeline-row"><span>${formatDate(date, { month: "numeric", day: "numeric" })}</span><div class="timeline-bar"><span class="timeline-fill" style="width:${width}%"></span></div><span>${count}</span></div>`; }).join("");
}
function renderCorpus() {
  const allItems = buildCorpusItems();
  const items = filteredCorpusItems(allItems);
  const target = $("#corpus-list");
  const query = $("#corpus-search")?.value.trim() || "";
  const overview = `
    <div class="corpus-overview" aria-label="${currentLanguage === "zh" ? "语料概览" : "Corpus overview"}">
      <div class="corpus-stat"><strong>${allItems.length}</strong><span>${currentLanguage === "zh" ? "全部语料" : "All items"}</span></div>
      <div class="corpus-stat"><strong>${items.length}</strong><span>${currentLanguage === "zh" ? "当前显示" : "Shown"}</span></div>
      <div class="corpus-stat wide"><strong>${escapeHtml(query || (currentLanguage === "zh" ? "完整记录" : "Complete records"))}</strong><span>${currentLanguage === "zh" ? "一次输入保留为一条完整语料" : "One input stays one complete corpus item"}</span></div>
    </div>`;
  if (!items.length) {
    target.innerHTML = `${overview}<p class="empty-state">${t("no_matching_corpus")}</p>`;
    return;
  }
  const byDate = new Map();
  items.forEach((item) => { if (!byDate.has(item.date)) byDate.set(item.date, []); byDate.get(item.date).push(item); });
  target.innerHTML = overview + [...byDate.entries()].map(([date, list], index) => `
    <details class="corpus-group" ${index < 3 ? "open" : ""}>
      <summary><span>${escapeHtml(formatDate(date, { year: "numeric", month: "long", day: "numeric", weekday: "long" }))}</span><small>${list.length}</small></summary>
      <div class="corpus-stack">${list.map(renderCorpusCard).join("")}</div>
    </details>`).join("");
}
function renderCorpusCard(item) {
  return `<article class="corpus-card" data-corpus-id="${escapeHtml(item.id)}">
    <header><div><span class="corpus-kind">${escapeHtml(item.kind)}</span><span>${escapeHtml(formatDateTime(item.created_at))}</span></div><button type="button" class="small-button" data-copy-corpus-item="${escapeHtml(item.id)}">Copy</button></header>
    <h3>${escapeHtml(item.title)}</h3>
    ${item.text ? `<p class="corpus-full-text">${escapeHtml(item.text)}</p>` : ""}
    ${item.tags?.length ? `<div class="signal-chip-row">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
    <details class="corpus-detail"><summary>${currentLanguage === "zh" ? "整理内容" : "Organized view"}</summary>${corpusDetailHtml(item)}</details>
  </article>`;
}
function corpusDetailHtml(item) {
  const lines = [];
  if (item.summary) lines.push(`<p><strong>${currentLanguage === "zh" ? "摘要" : "Summary"}</strong><br>${escapeHtml(item.summary)}</p>`);
  if (item.body?.length) lines.push(`<p><strong>${currentLanguage === "zh" ? "身体信号" : "Body signals"}</strong><br>${escapeHtml(item.body.join("、"))}</p>`);
  if (item.emotions?.length) lines.push(`<p><strong>${currentLanguage === "zh" ? "情绪词" : "Emotion words"}</strong><br>${escapeHtml(item.emotions.join("、"))}</p>`);
  if (item.questions?.length) lines.push(`<p><strong>${currentLanguage === "zh" ? "问题" : "Questions"}</strong><br>${escapeHtml(item.questions.join("\n"))}</p>`);
  if (item.action) lines.push(`<pre>${escapeHtml(item.action)}</pre>`);
  if (item.outcome) lines.push(`<p><strong>${currentLanguage === "zh" ? "回看" : "Outcome"}</strong><br>${escapeHtml(item.outcome)}</p>`);
  return lines.join("") || `<p>${escapeHtml(currentLanguage === "zh" ? "原文已完整保留。" : "The original text is preserved.")}</p>`;
}
function filteredCorpusItems(items = buildCorpusItems()) {
  const query = $("#corpus-search")?.value?.trim().toLowerCase() || "";
  if (!query) return items;
  return items.filter((item) => [item.date, item.kind, item.title, item.text, item.summary, item.action, item.outcome, ...(item.tags || [])].join(" ").toLowerCase().includes(query));
}
function buildCorpusItems() {
  const items = [];
  recordedDates().forEach((date) => {
    const day = state.days[date];
    [...day.traces].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).forEach((trace) => {
      const fields = extractFieldsFromText(trace.text, trace.tags || []);
      const title = trimSentence(splitSentences(trace.text)[0] || trace.text, 110);
      items.push({
        id: `trace:${trace.id}`,
        date,
        created_at: trace.created_at,
        kind: currentLanguage === "zh" ? "完整记录" : "Complete record",
        title: title || (currentLanguage === "zh" ? "完整记录" : "Complete record"),
        text: trace.text,
        tags: fields.contexts || [],
        summary: currentLanguage === "zh" ? `这条记录作为完整语料保留；本地识别出 ${fields.contexts?.length || 0} 个场景信号。` : `This input is preserved as one complete corpus item; ${fields.contexts?.length || 0} context signal(s) were locally detected.`,
        body: fields.body_signals || [],
        emotions: fields.emotion_words || [],
        questions: fields.questions || []
      });
    });
    [...day.primings].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).forEach((session) => {
      const line = session.action_line || {};
      const action = ACTION_DEFS.map((def) => line[def.id]?.trim() ? `${labelFor(def)}: ${line[def.id].trim()}` : "").filter(Boolean).join("\n");
      const title = line.mainline || trimSentence(splitSentences(session.raw || session.outcome)[0] || session.raw || session.outcome || "Priming", 110);
      items.push({
        id: `priming:${session.id}`,
        date,
        created_at: session.created_at,
        kind: "Priming",
        title,
        text: session.raw || "",
        tags: [],
        summary: currentLanguage === "zh" ? "这条 Priming 作为完整行动记录保留。" : "This priming is preserved as one complete action record.",
        action,
        outcome: session.outcome || ""
      });
    });
  });
  return items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}
function corpusItemMarkdown(item) {
  const lines = [`## ${item.date} · ${item.kind}`, "", `Time: ${formatDateTime(item.created_at)}`, `Title: ${item.title}`, ""];
  if (item.text) lines.push("Original:", item.text.trim(), "");
  if (item.tags?.length) lines.push(`Signals: ${item.tags.join(", ")}`, "");
  if (item.summary) lines.push("Local organization:", item.summary, "");
  if (item.action) lines.push("Action line:", item.action, "");
  if (item.outcome) lines.push("Outcome:", item.outcome, "");
  return lines.join("\n");
}
function formatCorpusMarkdown(items = filteredCorpusItems()) {
  return ["# Vitality Journal Corpus", "", ...items.map(corpusItemMarkdown)].join("\n").trim();
}
async function copyCorpus() {
  const text = formatCorpusMarkdown(filteredCorpusItems());
  if (!text.trim()) { showToast(t("no_corpus")); return; }
  try { await copyText(text); showToast(t("corpus_copied")); }
  catch { download(`vitality-corpus-${todayKey()}.md`, text, "text/markdown;charset=utf-8"); showToast(currentLanguage === "zh" ? "剪贴板被拦截，已改为导出 Markdown。" : "Clipboard was blocked, so Markdown was exported instead."); }
}
function exportCorpus() {
  const text = formatCorpusMarkdown(filteredCorpusItems());
  if (!text.trim()) { showToast(t("no_corpus")); return; }
  download(`vitality-corpus-${todayKey()}.md`, text, "text/markdown;charset=utf-8");
  showToast(currentLanguage === "zh" ? "语料 Markdown 已导出。" : "Corpus Markdown exported.");
}
async function copyCorpusItem(id) {
  const item = buildCorpusItems().find((entry) => entry.id === id);
  if (!item) return;
  const text = corpusItemMarkdown(item);
  try { await copyText(text); showToast(currentLanguage === "zh" ? "这条语料已复制。" : "Record copied."); }
  catch { download(`vitality-record-${todayKey()}.md`, text, "text/markdown;charset=utf-8"); showToast(currentLanguage === "zh" ? "剪贴板被拦截，已改为导出。" : "Clipboard was blocked, so the record was exported."); }
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
  $("#companion-template")?.addEventListener("click", fillCompanionTrace);
  $("#clear-trace").addEventListener("click", () => { $("#trace-input").value = ""; selectedTags.clear(); editingTraceId = null; $("#save-trace").textContent = t("save_trace"); renderQuickTags(); });
  $("#voice-button").addEventListener("click", toggleVoice);
  $("#today-traces").addEventListener("click", (event) => { const article = event.target.closest("[data-trace-id]"); const action = event.target.closest("[data-action]")?.dataset.action; if (!article || !action) return; if (action === "edit") editTrace(article.dataset.traceId); if (action === "delete") deleteTrace(article.dataset.traceId); });
  $("#extract-button").addEventListener("click", recomputeExtraction);
  $("#ai-extract-button").addEventListener("click", generateAiExtraction);
  $("#extraction-fields").addEventListener("input", (event) => { if (event.target.matches("[data-extract-id]")) saveExtractionField(event.target); });
  $("#new-priming").addEventListener("click", newPriming);
  $("#generate-action-line").addEventListener("click", generateActionLine);
  $("#companion-priming")?.addEventListener("click", fillCompanionPriming);
  $("#companion-today")?.addEventListener("click", fillCompanionTodayExperiment);
  $("#companion-low-energy")?.addEventListener("click", fillCompanionLowEnergy);
  $("#save-priming").addEventListener("click", () => savePriming({ quiet: false }));
  $("#companion-outcome")?.addEventListener("click", fillCompanionOutcome);
  $("#save-outcome").addEventListener("click", saveOutcome);
  $("#save-companion-outcome-trace")?.addEventListener("click", saveCompanionOutcomeTrace);
  $("#action-fields").addEventListener("input", () => savePriming({ quiet: true }));
  $("#load-companion-inventory-defaults")?.addEventListener("click", loadCompanionInventoryDefaults);
  $("#companion-inventory")?.addEventListener("input", saveCompanionInventory);
  $("#priming-input").addEventListener("input", () => savePriming({ quiet: true }));
  $("#outcome-input").addEventListener("input", () => savePriming({ quiet: true }));
  $("#companion-map")?.addEventListener("click", renderCompanionRelationshipMap);
  $("#save-companion-map")?.addEventListener("click", saveCompanionRelationshipMap);
  $("#companion-weekly-review")?.addEventListener("click", renderCompanionWeeklyReview);
  $("#save-companion-weekly-review")?.addEventListener("click", saveCompanionWeeklyReview);
  document.querySelectorAll(".range-button").forEach((button) => button.addEventListener("click", () => { lensRange = Number(button.dataset.range); document.querySelectorAll(".range-button").forEach((item) => item.classList.toggle("active", item === button)); renderLens(); }));
  $("#corpus-search").addEventListener("input", renderCorpus);
  $("#corpus-list").addEventListener("click", (event) => { const button = event.target.closest("[data-copy-corpus-item]"); if (button) copyCorpusItem(button.dataset.copyCorpusItem); });
  $("#copy-corpus").addEventListener("click", copyCorpus);
  $("#export-corpus")?.addEventListener("click", exportCorpus);
  $("#export-button").addEventListener("click", () => { renderStorageSummary(); renderSyncSettings(); $("#export-dialog").showModal(); });
  $("#export-markdown").addEventListener("click", markdownExport);
  $("#export-json").addEventListener("click", jsonExport);
  $("#import-file").addEventListener("change", (event) => importBackup(event.target.files[0]));
  $("#save-sync-settings").addEventListener("click", saveSyncSettings);
  $("#sync-now").addEventListener("click", syncNow);
  $("#pull-sync").addEventListener("click", safePullSync);
  $("#push-sync").addEventListener("click", safePushSync);
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








