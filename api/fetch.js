// api/fetch.js — server kecil di Vercel untuk mengambil isi web lain.
// Browser tidak boleh mengambil web orang lain langsung (diblokir CORS),
// jadi permintaan lewat sini dulu.

const dns = require('dns').promises;

const MAX_BYTES = 1500000; // batas ukuran teks yang diambil (1,5 MB)
const TEXT_TYPES = /text\/|json|javascript|xml|svg|manifest/i;

function isPrivate(ip) {
  return (
    /^(0|10|127)\./.test(ip) ||
    /^169\.254\./.test(ip) ||
    /^192\.168\./.test(ip) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
    /^(::1|fc|fd|fe80)/i.test(ip) ||
    ip === '::'
  );
}

async function assertPublic(u) {
  if (!/^https?:$/.test(u.protocol)) throw new Error('Hanya link http/https');
  const list = await dns.lookup(u.hostname, { all: true });
  if (list.some((a) => isPrivate(a.address))) throw new Error('Alamat ini tidak boleh diakses');
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const send = (code, obj) => res.status(code).send(JSON.stringify(obj));

  let u;
  try {
    u = new URL(req.query.url);
  } catch (e) {
    return send(400, { error: 'Link tidak valid' });
  }

  try {
    let r;
    for (let i = 0; i < 5; i++) {
      await assertPublic(u);
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), 9000);
      r = await fetch(u, {
        redirect: 'manual',
        signal: ctl.signal,
        headers: { 'User-Agent': 'BongkarWeb/1.0', Accept: '*/*' },
      });
      clearTimeout(t);
      if (r.status >= 300 && r.status < 400 && r.headers.get('location')) {
        u = new URL(r.headers.get('location'), u);
        continue;
      }
      break;
    }

    const type = r.headers.get('content-type') || '';
    const out = { ok: r.ok, status: r.status, finalUrl: u.href, type };

    if (!TEXT_TYPES.test(type)) {
      out.size = Number(r.headers.get('content-length')) || null;
      try { await r.body.cancel(); } catch (e) {}
      return send(200, out);
    }

    const buf = Buffer.from(await r.arrayBuffer());
    out.size = buf.length;
    out.truncated = buf.length > MAX_BYTES;
    out.text = buf.subarray(0, MAX_BYTES).toString('utf8');
    return send(200, out);
  } catch (e) {
    return send(200, { error: 'Gagal mengambil: ' + (e.message || 'tidak diketahui') });
  }
};
