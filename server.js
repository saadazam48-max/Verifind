require("dotenv").config();
// ─────────────────────────────────────────────────────────────────────────────
// Verifind Backend Server — Vita Industries
// Proxies Google Places API so the key stays server-side
// Run: node server.js
// ─────────────────────────────────────────────────────────────────────────────

const https = require("https");
const http  = require("http");
const url   = require("url");

const GOOGLE_KEY = process.env.GOOGLE_KEY || "";
const PORT       = 3001;

// ── Cuisine emoji map ─────────────────────────────────────────────────────────
function getEmoji(types = [], name = "") {
  const n = name.toLowerCase();
  if (n.includes("burger"))                        return "🍔";
  if (n.includes("pizza"))                         return "🍕";
  if (n.includes("sushi") || n.includes("japan"))  return "🍣";
  if (n.includes("kebab") || n.includes("turkish"))return "🌮";
  if (n.includes("indian") || n.includes("curry")) return "🍛";
  if (n.includes("lebanese") || n.includes("shawarma")) return "🥙";
  if (n.includes("moroccan") || n.includes("tagine"))   return "🫖";
  if (n.includes("chicken") || n.includes("wings"))     return "🍗";
  if (n.includes("steak") || n.includes("grill"))       return "🥩";
  if (n.includes("pasta") || n.includes("italian"))     return "🍝";
  if (n.includes("thai") || n.includes("noodle"))       return "🍜";
  if (n.includes("seafood") || n.includes("fish"))      return "🦞";
  if (n.includes("african") || n.includes("jollof"))    return "🌍";
  if (n.includes("persian") || n.includes("iranian"))   return "🌸";
  if (n.includes("chinese") || n.includes("dim sum"))   return "🥟";
  if (n.includes("korean"))                             return "🍱";
  if (n.includes("mexican") || n.includes("taco"))      return "🌮";
  if (n.includes("dessert") || n.includes("sweet"))     return "🍫";
  if (types.includes("bakery"))                         return "🥐";
  return "🍽️";
}

// ── Guess cuisine from types/name ─────────────────────────────────────────────
function getCuisine(types = [], name = "") {
  const n = name.toLowerCase();
  if (n.includes("burger"))    return "Burgers";
  if (n.includes("pizza"))     return "Pizza";
  if (n.includes("sushi"))     return "Japanese";
  if (n.includes("kebab") || n.includes("turkish")) return "Turkish";
  if (n.includes("indian") || n.includes("curry"))  return "Indian";
  if (n.includes("pakistani")) return "Pakistani";
  if (n.includes("lebanese"))  return "Lebanese";
  if (n.includes("moroccan"))  return "Moroccan";
  if (n.includes("chicken") || n.includes("wings")) return "Chicken";
  if (n.includes("steak"))     return "Steakhouse";
  if (n.includes("pasta") || n.includes("italian")) return "Italian";
  if (n.includes("thai"))      return "Thai";
  if (n.includes("seafood") || n.includes("fish"))  return "Seafood";
  if (n.includes("african") || n.includes("jollof"))return "West African";
  if (n.includes("persian") || n.includes("iranian"))return "Persian";
  if (n.includes("chinese"))   return "Chinese";
  if (n.includes("korean"))    return "Korean";
  if (n.includes("mexican") || n.includes("taco"))  return "Mexican";
  if (types.includes("bakery")) return "Bakery";
  return "Restaurant";
}

// ── Fetch helper ──────────────────────────────────────────────────────────────
function fetchJson(apiUrl) {
  return new Promise((resolve, reject) => {
    https.get(apiUrl, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on("error", reject);
  });
}

// ── Transform Google Places result → Verifind format ─────────────────────────
function transformPlace(place, index) {
  const name    = place.name || "Unknown";
  const types   = place.types || [];
  const loc     = place.geometry?.location || { lat: 51.5, lng: -0.12 };

  // Map lat/lng to SVG x/y (rough London bounding box)
  const x = Math.round(((loc.lng - (-0.25)) / (0.05 - (-0.25))) * 90 + 5);
  const y = Math.round(((51.54 - loc.lat) / (51.54 - 51.47)) * 85 + 5);

  return {
    id:          place.place_id || index,
    name,
    cuisine:     getCuisine(types, name),
    rating:      place.rating || 4.0,
    price:       place.price_level || 2,
    reviews:     place.user_ratings_total || 0,
    address:     place.vicinity || "",
    certified:   true, // all results are from halal keyword search
    tags:        types.slice(0, 5).map(t => t.replace(/_/g, " ")),
    dishes:      [],   // requires Places Details call (extra cost) — left for v2
    emoji:       getEmoji(types, name),
    x:           Math.min(95, Math.max(5, x)),
    y:           Math.min(95, Math.max(5, y)),
    instagram:   "",
    igFollowers: "",
    lat:         loc.lat,
    lng:         loc.lng,
    place_id:    place.place_id,
    open_now:    place.opening_hours?.open_now ?? null,
    photo_ref:   place.photos?.[0]?.photo_reference || null,
  };
}

// ── CORS headers ──────────────────────────────────────────────────────────────
function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin",  "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// ── Server ────────────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204); res.end(); return;
  }

  const parsed   = url.parse(req.url, true);
  const pathname = parsed.pathname;
  const query    = parsed.query;

  // ── GET /restaurants?lat=51.5&lng=-0.12&radius=5000 ──────────────────────
  if (pathname === "/restaurants") {
    const lat    = query.lat    || "51.5074";
    const lng    = query.lng    || "-0.1278";
    const radius = query.radius || "5000";

    try {
      // Page 1
      const apiUrl1 = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`
        + `?location=${lat},${lng}`
        + `&radius=${radius}`
        + `&keyword=halal+restaurant`
        + `&type=restaurant`
        + `&key=${GOOGLE_KEY}`;

      const data1 = await fetchJson(apiUrl1);

      if (data1.status !== "OK" && data1.status !== "ZERO_RESULTS") {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: data1.status, message: data1.error_message }));
        return;
      }

      let results = data1.results || [];

      // Page 2 (if available — each page = 20 results, max 60 total)
      if (data1.next_page_token) {
        await new Promise(r => setTimeout(r, 2000)); // Google requires a delay
        const apiUrl2 = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`
          + `?pagetoken=${data1.next_page_token}`
          + `&key=${GOOGLE_KEY}`;
        const data2 = await fetchJson(apiUrl2);
        results = results.concat(data2.results || []);
      }

      const restaurants = results.map((p, i) => transformPlace(p, i + 1));

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ restaurants, total: restaurants.length }));

    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Server error", message: err.message }));
    }
    return;
  }

  // ── GET /place?id=ChIJ... (get photo + details for a single place) ─────────
  if (pathname === "/place") {
    const placeId = query.id;
    if (!placeId) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing id param" }));
      return;
    }

    try {
      const detailUrl = `https://maps.googleapis.com/maps/api/place/details/json`
        + `?place_id=${placeId}`
        + `&fields=name,rating,formatted_phone_number,website,opening_hours,price_level,reviews,photos`
        + `&key=${GOOGLE_KEY}`;

      const data = await fetchJson(detailUrl);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data.result || {}));

    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // ── GET /photo?ref=... ────────────────────────────────────────────────────
  if (pathname === "/photo") {
    const ref = query.ref;
    if (!ref) { res.writeHead(400); res.end(); return; }

    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo`
      + `?maxwidth=400&photo_reference=${ref}&key=${GOOGLE_KEY}`;

    https.get(photoUrl, (photoRes) => {
      res.writeHead(photoRes.statusCode, {
        "Content-Type":  photoRes.headers["content-type"] || "image/jpeg",
        "Cache-Control": "public, max-age=86400",
        ...Object.fromEntries(Object.entries(photoRes.headers).filter(([k]) => k.startsWith("access-control"))),
        "Access-Control-Allow-Origin": "*",
      });
      photoRes.pipe(res);
    }).on("error", () => { res.writeHead(500); res.end(); });
    return;
  }

  // ── POST /ai — proxy Anthropic API (avoids CORS) ────────────────────────
  if (pathname === "/ai" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      try {
        const payload = JSON.parse(body);
        const anthropicReq = https.request({
          hostname: "api.anthropic.com",
          path: "/v1/messages",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.ANTHROPIC_KEY || "",
            "anthropic-version": "2023-06-01",
          }
        }, (anthropicRes) => {
          let data = "";
          anthropicRes.on("data", chunk => data += chunk);
          anthropicRes.on("end", () => {
            setCors(res);
            res.writeHead(anthropicRes.statusCode, { "Content-Type": "application/json" });
            res.end(data);
          });
        });
        anthropicReq.on("error", (e) => {
          setCors(res);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: e.message }));
        });
        anthropicReq.write(JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: payload.system,
          messages: payload.messages,
        }));
        anthropicReq.end();
      } catch(e) {
        setCors(res);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // ── Health check ──────────────────────────────────────────────────────────
  if (pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", service: "Verifind API", by: "Vita Industries" }));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`\n🌙 Verifind Server — Vita Industries`);
  console.log(`✅ Running at http://localhost:${PORT}`);
  console.log(`📍 Endpoints:`);
  console.log(`   GET /restaurants?lat=51.5&lng=-0.12&radius=5000`);
  console.log(`   GET /place?id=<place_id>`);
  console.log(`   GET /photo?ref=<photo_reference>`);
  console.log(`   GET /health\n`);
});
