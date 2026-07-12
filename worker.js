const json = (body, init = {}) => new Response(JSON.stringify(body), {
  ...init,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    ...(init.headers || {})
  }
});

const DEFAULT_MODEL = "gpt-5.6";
const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const MAX_TRACE_CHARS = 14000;
const FIELD_LIMITS = {
  daily_brief: 1,
  key_points: 5,
  contexts: 8,
  events: 5,
  body_signals: 8,
  energy_signal: 2,
  emotion_words: 8,
  life_giving_moments: 3,
  draining_moments: 3,
  questions: 3,
  user_phrases: 5
};
const ACTION_FIELDS = ["mainline", "top_tasks", "first_action", "possible_resistance", "if_resistance", "not_today", "finish_standard"];

const EXTRACTION_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "daily_brief",
    "key_points",
    "contexts",
    "events",
    "body_signals",
    "energy_signal",
    "emotion_words",
    "life_giving_moments",
    "draining_moments",
    "questions",
    "user_phrases"
  ],
  properties: {
    daily_brief: { type: "string" },
    key_points: { type: "array", items: { type: "string" } },
    contexts: { type: "array", items: { type: "string" } },
    events: { type: "array", items: { type: "string" } },
    body_signals: { type: "array", items: { type: "string" } },
    energy_signal: { type: "array", items: { type: "string" } },
    emotion_words: { type: "array", items: { type: "string" } },
    life_giving_moments: { type: "array", items: { type: "string" } },
    draining_moments: { type: "array", items: { type: "string" } },
    questions: { type: "array", items: { type: "string" } },
    user_phrases: { type: "array", items: { type: "string" } }
  }
};

const PRIMING_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ACTION_FIELDS,
  properties: Object.fromEntries(ACTION_FIELDS.map((key) => [key, { type: "string" }]))
};

const BANNED_PATTERNS = [
  /你总是/g,
  /你其实是/g,
  /你应该/g,
  /说明你是/g,
  /人格[^，。,.]*/g,
  /[^，。,.]*障碍/g,
  /[^，。,.]*症/g,
  /you always/gi,
  /you are actually/gi,
  /you should/gi,
  /personality[^,.]*/gi,
  /disorder/gi,
  /diagnos\w*/gi
];

function getStore(env) {
  return env.VITALITY_SYNC || env.vitality_sync || null;
}

class OpenAiRequestError extends Error {
  constructor(code, message, status = 502) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

function getApiKey(env) {
  return String(env.OPENAI_API_KEY || "").trim();
}

function getConfiguredModel(env) {
  return String(env.OPENAI_MODEL || "").trim();
}

function getModel(env) {
  const configured = getConfiguredModel(env);
  return configured === "gpt-5.6" || configured === "gpt-5.6-sol" ? configured : DEFAULT_MODEL;
}

function getKeyIssue(env) {
  const key = getApiKey(env);
  if (!key) return { code: "missing_openai_key", error: "Missing OPENAI_API_KEY.", status: 501 };
  if (/^(OPENAI_MODEL\s*=|gpt-|OPENAI_)/i.test(key)) {
    return {
      code: "invalid_openai_key",
      error: "OPENAI_API_KEY appears to contain a model setting. Put the real sk-... OpenAI API key in OPENAI_API_KEY.",
      status: 401
    };
  }
  if (!/^sk-[A-Za-z0-9_-]+$/.test(key)) {
    return { code: "invalid_openai_key", error: "OPENAI_API_KEY must be an OpenAI API key that starts with sk-.", status: 401 };
  }
  return null;
}

function normalizeOpenAiError(status, result) {
  const message = String(result?.error?.message || "AI request failed.");
  const type = String(result?.error?.type || "");
  const code = String(result?.error?.code || "");
  if (status === 401 || /incorrect api key|invalid api key|authentication|unauthorized/i.test(`${message} ${type} ${code}`)) {
    return { code: "invalid_openai_key", error: "OPENAI_API_KEY is invalid. Create a fresh OpenAI API key and save it as the Cloudflare Secret value.", status: 401 };
  }
  if (/model|does not exist|not found|unsupported/i.test(`${message} ${type} ${code}`)) {
    return { code: "invalid_openai_model", error: "The configured AI model is not available. This app is set to use gpt-5.6.", status: 400 };
  }
  if (status === 429 || /rate limit|quota/i.test(message)) {
    return { code: "openai_rate_limited", error: "OpenAI rate limit or quota needs attention.", status: 429 };
  }
  return { code: "openai_error", error: "OpenAI request failed.", status: status >= 400 ? status : 502 };
}

function validId(id) {
  return /^[a-zA-Z0-9_-]{3,80}$/.test(id || "");
}

function getSyncId(pathname) {
  const prefix = "/api/sync/";
  if (!pathname.startsWith(prefix)) return null;
  const id = decodeURIComponent(pathname.slice(prefix.length));
  return id && !id.includes("/") ? id : null;
}

function trimText(value, limit = 180) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > limit ? `${text.slice(0, limit).trim()}...` : text;
}

function hasBannedLanguage(value) {
  return BANNED_PATTERNS.some((pattern) => {
    pattern.lastIndex = 0;
    return pattern.test(String(value || ""));
  });
}

function neutralize(value, limit = 180) {
  let text = trimText(value, limit);
  BANNED_PATTERNS.forEach((pattern) => {
    pattern.lastIndex = 0;
    text = text.replace(pattern, "");
  });
  return trimText(text, limit);
}

function normalizeList(value, limit, { keepOriginal = false, maxLength = 180 } = {}) {
  const items = Array.isArray(value) ? value : value ? [value] : [];
  const seen = new Set();
  const result = [];
  items.forEach((item) => {
    const text = keepOriginal ? trimText(item, maxLength) : neutralize(item, maxLength);
    if (!text || (!keepOriginal && hasBannedLanguage(text))) return;
    const key = text.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    result.push(trimText(text, maxLength));
  });
  return result.slice(0, limit);
}

function normalizeAiFields(fields, language) {
  const normalized = {};
  Object.entries(FIELD_LIMITS).forEach(([key, limit]) => {
    if (key === "daily_brief") {
      normalized.daily_brief = normalizeList(fields?.daily_brief, 1, { maxLength: language === "zh" ? 140 : 260 });
      return;
    }
    normalized[key] = normalizeList(fields?.[key], limit, {
      keepOriginal: key === "user_phrases",
      maxLength: key === "contexts" || key === "body_signals" || key === "emotion_words" ? 36 : 180
    });
  });
  return normalized;
}

function normalizeActionLine(value, language) {
  const limits = {
    mainline: language === "zh" ? 90 : 160,
    top_tasks: language === "zh" ? 240 : 380,
    first_action: language === "zh" ? 90 : 160,
    possible_resistance: language === "zh" ? 120 : 200,
    if_resistance: language === "zh" ? 160 : 260,
    not_today: language === "zh" ? 120 : 200,
    finish_standard: language === "zh" ? 120 : 200
  };
  return Object.fromEntries(ACTION_FIELDS.map((key) => [key, neutralize(value?.[key], limits[key] || 180)]));
}

function outputTextFromResponse(payload) {
  if (payload?.output_text) return payload.output_text;
  const parts = [];
  (payload?.output || []).forEach((item) => {
    (item.content || []).forEach((content) => {
      if (content.type === "output_text" && content.text) parts.push(content.text);
      if (content.type === "text" && content.text) parts.push(content.text);
    });
  });
  return parts.join("\n").trim();
}

async function callOpenAiJson(env, { input, schema, name }) {
  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${getApiKey(env)}`
    },
    body: JSON.stringify({
      model: getModel(env),
      input,
      store: false,
      text: {
        format: {
          type: "json_schema",
          name,
          strict: true,
          schema
        }
      }
    })
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const issue = normalizeOpenAiError(response.status, result);
    throw new OpenAiRequestError(issue.code, issue.error, issue.status);
  }
  try {
    return JSON.parse(outputTextFromResponse(result));
  } catch {
    throw new OpenAiRequestError("openai_bad_response", "AI returned an unexpected response format.", 502);
  }
}

function buildPrompt({ date, language, traces }) {
  const languageName = language === "zh" ? "Chinese" : "English";
  const note = language === "zh"
    ? "系统整理请使用中文；只有引用用户原话时可以保留原来的中英混杂。"
    : "Use English for the system summary; preserve code-switching only when quoting the user's original phrases.";
  const traceText = traces.map((trace, index) => {
    const tags = Array.isArray(trace.tags) && trace.tags.length ? ` tags=${trace.tags.join(",")}` : "";
    return `Trace ${index + 1} ${trace.created_at || ""}${tags}\n${trace.text || ""}`;
  }).join("\n\n").slice(0, MAX_TRACE_CHARS);

  return [
    {
      role: "system",
      content: [
        "You organize LifeLog entries for one private personal journal.",
        "Your job is observation, compression, and sensemaking. Do not diagnose, rate, moralize, advise, or label the person.",
        "Keep raw facts separate from possible observations. Do not infer identity traits.",
        "Do not copy long passages into events. Compress long input into short observations.",
        "Prefer neutral wording such as 'records show', 'you mentioned', 'these appeared together'.",
        "For user_phrases, preserve the user's original wording and natural code-switching.",
        `Return ${languageName} except preserved original phrases. ${note}`
      ].join("\n")
    },
    {
      role: "user",
      content: [
        `Date: ${date || "unknown"}`,
        `Language: ${language}`,
        "Extract a compact LifeLog sensemaking structure from these traces.",
        "daily_brief: one concise paragraph.",
        "key_points: 3-5 compressed observations.",
        "contexts/events/body_signals/emotion_words: short, countable signals.",
        "life_giving_moments/draining_moments/questions: at most a few concise items.",
        "",
        traceText
      ].join("\n")
    }
  ];
}

function buildPrimePrompt({ date, language, raw, recent }) {
  const languageName = language === "zh" ? "Chinese" : "English";
  const note = language === "zh"
    ? "请用中文整理；如果用户原话自然中英混杂，只在必要引用时保留。"
    : "Use English, preserving code-switching only when quoting the user's own words.";
  return [
    {
      role: "system",
      content: [
        "You turn a messy pre-task or morning priming transcript into one clear action line.",
        "The goal is to increase the probability of starting, not to produce a perfect plan.",
        "Compress aggressively. Do not copy long passages. Do not diagnose, judge, moralize, or label the person.",
        "Use recent LifeLog signals only when they help today's action. Keep suggestions small and concrete.",
        "first_action should be a visible 10-30 minute action. top_tasks should contain 1-3 numbered tasks in one string.",
        "not_today should remove load, not add a new assignment.",
        `Return ${languageName}. ${note}`
      ].join("\n")
    },
    {
      role: "user",
      content: [
        `Date: ${date || "unknown"}`,
        `Language: ${language}`,
        "Recent signals:",
        JSON.stringify(recent || {}, null, 2).slice(0, 5000),
        "",
        "Raw priming transcript:",
        String(raw || "").slice(0, 12000)
      ].join("\n")
    }
  ];
}

async function handleHealth(env) {
  const keyIssue = getKeyIssue(env);
  const configuredModel = getConfiguredModel(env);
  return json({
    ok: true,
    ai_configured: !keyIssue,
    ai_key_status: keyIssue ? keyIssue.code : "ok",
    model: getModel(env),
    configured_model: configuredModel || null,
    configured_model_used: !configuredModel || configuredModel === getModel(env),
    sync_configured: Boolean(getStore(env))
  });
}

async function handleExtract(request, env) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204 });
  if (request.method !== "POST") return json({ error: "Method not allowed." }, { status: 405, headers: { allow: "POST, OPTIONS" } });
  const keyIssue = getKeyIssue(env);
  if (keyIssue) return json({ code: keyIssue.code, error: keyIssue.error }, { status: keyIssue.status });

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON." }, { status: 400 });
  }

  const language = payload?.language === "en" ? "en" : "zh";
  const traces = Array.isArray(payload?.traces)
    ? payload.traces.map((trace) => ({
      created_at: trace?.created_at || "",
      text: trimText(trace?.text, MAX_TRACE_CHARS),
      tags: Array.isArray(trace?.tags) ? trace.tags.slice(0, 12) : []
    })).filter((trace) => trace.text)
    : [];
  if (!traces.length) return json({ error: "No traces to extract." }, { status: 400 });

  try {
    const fields = await callOpenAiJson(env, { input: buildPrompt({ date: payload?.date, language, traces }), schema: EXTRACTION_SCHEMA, name: "lifelog_extraction" });
    return json({
      ok: true,
      extraction: {
        updated_at: new Date().toISOString(),
        method: "ai",
        language,
        model: getModel(env),
        fields: normalizeAiFields(fields, language)
      }
    });
  } catch (error) {
    return json({ code: error.code || "openai_error", error: error.message || "AI extraction failed." }, { status: error.status || 502 });
  }
}

async function handlePrime(request, env) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204 });
  if (request.method !== "POST") return json({ error: "Method not allowed." }, { status: 405, headers: { allow: "POST, OPTIONS" } });
  const keyIssue = getKeyIssue(env);
  if (keyIssue) return json({ code: keyIssue.code, error: keyIssue.error }, { status: keyIssue.status });

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON." }, { status: 400 });
  }

  const language = payload?.language === "en" ? "en" : "zh";
  const raw = trimText(payload?.raw, 12000);
  if (!raw) return json({ error: "No priming text to orient." }, { status: 400 });

  try {
    const actionLine = await callOpenAiJson(env, { input: buildPrimePrompt({ date: payload?.date, language, raw, recent: payload?.recent || {} }), schema: PRIMING_SCHEMA, name: "priming_action_line" });
    return json({
      ok: true,
      action_line: normalizeActionLine(actionLine, language),
      method: "ai",
      model: getModel(env),
      updated_at: new Date().toISOString()
    });
  } catch (error) {
    return json({ code: error.code || "openai_error", error: error.message || "AI priming failed." }, { status: error.status || 502 });
  }
}

async function handleSync(request, env, id) {
  const store = getStore(env);
  if (!store) return json({ error: "Missing KV binding VITALITY_SYNC." }, { status: 500 });
  if (!validId(id)) return json({ error: "Invalid sync id." }, { status: 400 });

  if (request.method === "OPTIONS") return new Response(null, { status: 204 });

  if (request.method === "GET") {
    const envelope = await store.get(id, "json");
    if (!envelope) return json({ error: "Not found." }, { status: 404 });
    return json({ envelope });
  }

  if (request.method === "PUT") {
    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ error: "Invalid JSON." }, { status: 400 });
    }

    const envelope = payload?.envelope;
    if (!envelope || envelope.app !== "vitality-journal" || !envelope.ciphertext || !envelope.salt || !envelope.iv) {
      return json({ error: "Invalid encrypted envelope." }, { status: 400 });
    }
    if (envelope.sync_id !== id) return json({ error: "Sync id mismatch." }, { status: 400 });

    await store.put(id, JSON.stringify(envelope), {
      metadata: { updated_at: envelope.updated_at || new Date().toISOString() }
    });
    return json({ ok: true, updated_at: envelope.updated_at || null });
  }

  return json({ error: "Method not allowed." }, { status: 405, headers: { allow: "GET, PUT, OPTIONS" } });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/health") return handleHealth(env);
    if (url.pathname === "/api/extract") return handleExtract(request, env);
    if (url.pathname === "/api/prime") return handlePrime(request, env);
    const syncId = getSyncId(url.pathname);
    if (syncId) return handleSync(request, env, syncId);
    return env.ASSETS.fetch(request);
  }
};