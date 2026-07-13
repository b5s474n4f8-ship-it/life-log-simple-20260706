const json = (body, init = {}) => new Response(JSON.stringify(body), {
  ...init,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    ...(init.headers || {})
  }
});

const SYNC_BINDING_NAME = "VITALITY_SYNC";

function getStore(env) {
  return env[SYNC_BINDING_NAME] || env.vitality_sync || null;
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

async function handleHealth(env) {
  return json({
    ok: true,
    mode: "simple-local-organizer",
    sync_configured: Boolean(getStore(env))
  });
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

    const syncId = getSyncId(url.pathname);
    if (syncId) return handleSync(request, env, syncId);

    return env.ASSETS.fetch(request);
  }
};