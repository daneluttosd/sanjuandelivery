import { useState } from "react";

const B = {
  green:      "#1B5E20",
  greenLight: "#388E3C",
  yellow:     "#F9C00E",
  yellowDim:  "#C49B0A",
  bg:         "#0A1A0B",
  card:       "#111E12",
  cardAlt:    "#162418",
  border:     "#1E2E1F",
  borderG:    "#2E5030",
  cream:      "#F5F0E8",
  muted:      "#7A9B7C",
};

const ALIAS      = "sanjuandelivery.mp";
const WA_NUMBER  = "542645858767";
const DIRECCION  = "Rodríguez Pinto 2500 Oeste, San Juan";
const MAPS_URL   = "https://maps.google.com/?q=Rodríguez+Pinto+2500+Oeste+San+Juan+Argentina";
const HORARIOS   = [
  { dias: "Lunes a Domingo", hs: "20:00 — 02:00" },
];
const TELEFONOS  = ["4233773", "4389332", "2645858767"];

const fmt = (p) => p ? `$${p.toLocaleString("es-AR")}` : null;

// ── HORA LOCAL para mostrar si está abierto ───────────────────
function isOpen() {
  const now = new Date();
  const h = now.getHours();
  return h >= 20 || h < 2;
}

// ── MENÚ ──────────────────────────────────────────────────────
const PROMOS = [
  { id: "p1", name: "Superlomo + Papas",            price: 44000 },
  { id: "p2", name: "Superpachata + Papas",          price: 39000 },
  { id: "p3", name: "2 Pachatas + Papas",            price: 43000 },
  { id: "p4", name: "2 Pachatas Especiales",         price: 36500 },
  { id: "p5", name: "2 Hamb. Completas o Provolone", price: 18000 },
  { id: "p6", name: "1 Lomo o Pachata + Papas",      price: null  },
  { id: "p7", name: "Superchori + Papas",            price: 28000 },
  { id: "p8", name: "Superlomo",                     price: 39000 },
  { id: "p9", name: "Superpachata",                  price: 36000 },
];

const MENU = [
  {
    id: 1, category: "Lomos y Pachatas", emoji: "🥩",
    subtitle: "Pan de miga con todos los gustos", hasSize: false,
    items: [
      { id: 101, name: "Especial",  desc: "Lomo, lechuga, tomate, jamón, queso tybo, mayo",                 price: 21000, tag: null },
      { id: 102, name: "Completo",  desc: "Lomo, lechuga, tomate, huevo, jamón, queso tybo, mayo",           price: 21500, tag: "⭐ Popular" },
      { id: 103, name: "Provolone", desc: "Lomo, lechuga, tomate, huevo, queso provolone, queso tybo, mayo", price: 23000, tag: null },
      { id: 104, name: "Roquefort", desc: "Lomo, lechuga, tomate, huevo, queso roquefort, queso tybo, mayo", price: 23000, tag: null },
      { id: 105, name: "Panceta",   desc: "Lomo, lechuga, tomate, huevo, panceta ahumada, queso tybo, mayo", price: 23000, tag: "🔥 Estrella" },
    ],
  },
  {
    id: 2, category: "Hamburguesas", emoji: "🍔",
    subtitle: "Medallón de carne artesanal", hasSize: false,
    items: [
      { id: 201, name: "Común",     desc: "Medallón de carne, lechuga, tomate, mayo",                                        price: 8000,  tag: null },
      { id: 202, name: "Especial",  desc: "Medallón de carne, lechuga, tomate, jamón, queso tybo, mayo",                    price: 9000,  tag: null },
      { id: 203, name: "Completa",  desc: "Medallón de carne, lechuga, tomate, jamón, bacon, queso cheddar, mayo",          price: 10000, tag: "⭐ Popular" },
      { id: 204, name: "Provolone", desc: "Medallón de carne, lechuga, tomate, jamón, queso provolone, mayo",               price: 10000, tag: null },
      { id: 205, name: "Roquefort", desc: "Medallón de carne, lechuga, tomate, jamón, queso roquefort, mayo",               price: 10000, tag: null },
      { id: 206, name: "4 Quesos",  desc: "Medallón, lechuga, tomate, jamón, tybo, provolone, roquefort, parmesano, mayo",  price: 10000, tag: "🧀 Premium" },
    ],
  },
  {
    id: 3, category: "Pizzas", emoji: "🍕",
    subtitle: "8 porciones o 4 porciones", hasSize: true,
    sizeLabels: ["8 Porciones", "4 Porciones"],
    items: [
      { id: 301, name: "Muzzarella", desc: "Muzzarella, aceitunas verdes, toque de orégano",                      price: 15000, price2: 8000,  tag: null },
      { id: 302, name: "Especial",   desc: "Muzzarella, jamón cocido, huevo, morrón, aceitunas verdes",           price: 21000, price2: 10600, tag: "⭐ Popular" },
      { id: 303, name: "Napolitana", desc: "Muzzarella, rodajas de tomate, aceitunas negras, provenzal",          price: 18500, price2: 9300,  tag: null },
      { id: 304, name: "Champignon", desc: "Muzzarella, champignones, aceitunas negras, provenzal",               price: 19500, price2: 9800,  tag: null },
      { id: 305, name: "Calabresa",  desc: "Muzzarella, calabresa, aceitunas negras",                             price: 20000, price2: 10200, tag: null },
      { id: 306, name: "Roquefort",  desc: "Muzzarella, queso azul, aceitunas negras",                            price: 21000, price2: 10200, tag: null },
      { id: 307, name: "Ananá",      desc: "Muzzarella, jamón cocido, ananá, azúcar negra, aceitunas negras",     price: 22000, price2: 11200, tag: "🍍 Especial" },
      { id: 308, name: "Palmitos",   desc: "Muzzarella, jamón cocido, palmitos, salsa golf",                      price: 22100, price2: 11300, tag: null },
      { id: 309, name: "Panceta",    desc: "Muzzarella, panceta ahumada, aceitunas negras",                       price: 23200, price2: 11600, tag: null },
      { id: 310, name: "4 Quesos",   desc: "Muzzarella, provolone, queso azul, parmesano, aceitunas negras",      price: 23200, price2: 11600, tag: "🧀 Premium" },
      { id: 311, name: "Provolone",  desc: "Muzzarella, provolone, aceitunas negras",                             price: 23700, price2: 12200, tag: null },
    ],
  },
  {
    id: 4, category: "Tartas", emoji: "🥧",
    subtitle: "Caseras — entera o media", hasSize: true,
    sizeLabels: ["Entera", "Media"],
    items: [
      { id: 401, name: "Verdura",       desc: "Tarta casera de verdura, receta de siempre", price: 17000, price2: 9000, tag: null },
      { id: 402, name: "Jamón y Queso", desc: "Tarta casera de jamón cocido y queso",       price: 17000, price2: 9000, tag: null },
    ],
  },
  {
    id: 5, category: "Empanadas", emoji: "🥟",
    subtitle: "Por docena o media docena", hasSize: true,
    sizeLabels: ["Docena", "Media docena"],
    items: [
      { id: 501, name: "Criolla",       desc: "Empanadas criollas caseras", price: 19000, price2: 9800, tag: "⭐ Clásica" },
      { id: 502, name: "Jamón y Queso", desc: "Empanadas de jamón y queso", price: 19000, price2: 9500, tag: null },
    ],
  },
  {
    id: 6, category: "Sandwiches", emoji: "🥪",
    subtitle: "Calientes y bien cargados", hasSize: false,
    items: [
      { id: 601, name: "Carlitos",           desc: "Pan de miga, jamón cocido, queso tybo, mayo",                         price: 7300,  tag: null },
      { id: 602, name: "Triple Americano",   desc: "Pan de miga, jamón cocido, queso tybo, lechuga, tomate, mayo",       price: 7500,  tag: null },
      { id: 603, name: "Barroluco",          desc: "Pan de miga, carne, jamón cocido, queso tybo, lechuga, tomate, mayo",price: 36000, price2: 18000, tag: "🔥 Estrella", hasHalf: true },
      { id: 604, name: "Panini Americano",   desc: "Pan francés, jamón cocido, queso tybo, lechuga, tomate, mayo",       price: 7500,  tag: null },
      { id: 605, name: "Panini Vegetariano", desc: "Pan francés, queso tybo, huevo, morrón, lechuga, tomate, mayo",      price: 7500,  tag: "🌿 Veggie" },
    ],
  },
  {
    id: 7, category: "Papas Fritas", emoji: "🍟",
    subtitle: "Crocantes y recién hechas", hasSize: true,
    sizeLabels: ["Grandes", "Medianas"],
    items: [
      { id: 701, name: "Papas Fritas", desc: "Crocantes, recién hechas", price: null, price2: null, tag: null },
    ],
  },
  {
    id: 8, category: "Bebidas", emoji: "🥤",
    subtitle: "Frías y bien servidas", hasSize: false,
    items: [
      { id: 801, name: "Coca / Sprite 1/2 L",               desc: "Botella 500ml",           price: 1900, tag: null },
      { id: 802, name: "Coca / Sprite 1 L",                 desc: "Botella 1 litro",         price: 3100, tag: null },
      { id: 803, name: "Coca / Sprite / Fanta / Schweppes 1.5L", desc: "Botella familiar",  price: 4200, tag: null },
      { id: 804, name: "Aquarius",                          desc: "Agua saborizada",         price: 3900, tag: null },
      { id: 805, name: "Coca 2 L",                          desc: "Botella 2 litros",        price: 5800, tag: null },
      { id: 806, name: "Corona / Patagonia",                desc: "Cerveza importada 330ml", price: 5400, tag: null },
      { id: 807, name: "Latón",                             desc: "Cerveza lata 473ml",      price: 5400, tag: null },
      { id: 808, name: "Lata",                              desc: "Cerveza lata 354ml",      price: 3500, tag: null },
    ],
  },
];

const ALL_TABS = ["🔥 Promos", ...MENU.map(c => c.category), "ℹ️ Info"];

function buildMsg(cart, extras, delivery, pago) {
  const lines = cart.map((i) => {
    const sizeLabel = i.sizeKey === "half" ? ` (${i.sizeLabel2 || "Mitad"})` : i.sizeLabel1 ? ` (${i.sizeLabel1})` : "";
    const price = i.sizeKey === "half" ? i.price2 : i.price;
    return `• ${i.name}${sizeLabel} x${i.qty}${price ? ` — ${fmt(price * i.qty)}` : ""}`;
  });
  const total = cart.reduce((s, i) => {
    const p = i.sizeKey === "half" ? (i.price2 || 0) : (i.price || 0);
    return s + p * i.qty;
  }, 0);
  const extrasLine  = extras.length > 0 ? `\n🧄 Extras: ${extras.join(", ")}` : "";
  const deliveryLine = `\n🛵 Entrega: ${delivery}`;
  const pagoLine    = `\n💳 Pago: ${pago}`;
  const totalLine   = total > 0 ? `\n\n*Total estimado: ${fmt(total)}*` : "";
  return encodeURIComponent(
    `¡Hola San Juan Delivery! 🍕\nQuiero hacer este pedido:\n\n${lines.join("\n")}${extrasLine}${deliveryLine}${pagoLine}${totalLine}`
  );
}

// ── COMPONENTES ───────────────────────────────────────────────

function SizeModal({ item, category, onSelect, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 400, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)" }} />
      <div style={{ position: "relative", background: B.card, borderRadius: "20px 20px 0 0", padding: "28px 20px 44px", width: "100%", maxWidth: 480, border: `1px solid ${B.borderG}`, boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h3 style={{ margin: 0, fontSize: 16, color: B.cream, textTransform: "uppercase", fontFamily: "'Arial Black',sans-serif" }}>{item.name}</h3>
          <button onClick={onClose} style={{ background: "#1e2e1f", border: "none", color: "#aaa", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 18 }}>×</button>
        </div>
        <p style={{ fontSize: 12, color: B.muted, marginBottom: 24 }}>¿Qué tamaño querés?</p>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => onSelect("full")} style={{ flex: 1, background: B.green, border: `2px solid ${B.yellow}`, borderRadius: 12, padding: "16px 10px", color: B.yellow, fontWeight: 800, fontSize: 13, cursor: "pointer", textAlign: "center" }}>
            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, color: "#fff" }}>{category.sizeLabels[0]}</div>
            <div style={{ fontFamily: "'Arial Black',sans-serif", fontSize: 18 }}>{fmt(item.price) || "Consultar"}</div>
          </button>
          {item.price2 !== null && item.price2 !== undefined && (
            <button onClick={() => onSelect("half")} style={{ flex: 1, background: B.cardAlt, border: `2px solid ${B.borderG}`, borderRadius: 12, padding: "16px 10px", color: B.cream, fontWeight: 800, fontSize: 13, cursor: "pointer", textAlign: "center" }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, color: B.muted }}>{category.sizeLabels[1]}</div>
              <div style={{ fontFamily: "'Arial Black',sans-serif", fontSize: 18, color: "#B8E6B8" }}>{fmt(item.price2)}</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ cart, onRemove, onAddOne, onClose }) {
  const [extras, setExtras]     = useState([]);
  const [delivery, setDelivery] = useState("Retiro en el local");
  const [pago, setPago]         = useState("Efectivo");
  const [copied, setCopied]     = useState(false);

  const total = cart.reduce((s, i) => {
    const p = i.sizeKey === "half" ? (i.price2 || 0) : (i.price || 0);
    return s + p * i.qty;
  }, 0);

  const toggleExtra = (e) => setExtras(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e]);

  const copyAlias = () => {
    navigator.clipboard.writeText(ALIAS).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${buildMsg(cart, extras, delivery, pago)}`;

  const secStyle = { marginTop: 12, padding: 14, background: B.cardAlt, borderRadius: 12, border: `1px solid ${B.borderG}` };
  const secTitle = { margin: "0 0 10px", fontSize: 12, color: B.yellow, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 };
  const btnBase  = (active) => ({ flex: 1, background: active ? B.green : "transparent", border: `1.5px solid ${active ? B.yellow : B.borderG}`, borderRadius: 10, padding: "11px 8px", color: active ? B.yellow : B.muted, fontWeight: 800, fontSize: 12, cursor: "pointer", transition: "all .15s", textAlign: "center" });

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)" }} />
      <div style={{ position: "relative", background: B.card, borderRadius: "22px 22px 0 0", padding: "22px 18px 40px", maxHeight: "90vh", overflowY: "auto", maxWidth: 480, width: "100%", margin: "0 auto", boxSizing: "border-box", border: `1px solid ${B.borderG}` }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 16, color: B.cream, fontFamily: "'Arial Black',sans-serif", textTransform: "uppercase" }}>Tu pedido 🧾</h3>
          <button onClick={onClose} style={{ background: "#1e2e1f", border: `1px solid ${B.border}`, color: "#aaa", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 18 }}>×</button>
        </div>

        {cart.map((item) => {
          const price  = item.sizeKey === "half" ? item.price2 : item.price;
          const sizeTag = item.sizeKey === "half" ? item.sizeLabel2 : item.sizeLabel1;
          return (
            <div key={item.cartId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${B.border}` }}>
              <div style={{ flex: 1, marginRight: 8 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: B.cream, textTransform: "uppercase" }}>{item.name}</p>
                <p style={{ margin: "2px 0 0", fontSize: 11, color: B.muted }}>{sizeTag && `${sizeTag} · `}{price ? fmt(price) + " c/u" : "Consultar"}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button onClick={() => onRemove(item.cartId)} style={{ background: "#1a2e1b", border: `1px solid ${B.border}`, borderRadius: "50%", width: 28, height: 28, color: "#ccc", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                <span style={{ fontWeight: 800, color: "#fff", minWidth: 18, textAlign: "center" }}>{item.qty}</span>
                <button onClick={() => onAddOne(item.cartId)} style={{ background: "#1a2e1b", border: `1px solid ${B.border}`, borderRadius: "50%", width: 28, height: 28, color: "#ccc", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                {price && <span style={{ color: B.yellow, fontWeight: 800, fontSize: 13, minWidth: 72, textAlign: "right" }}>{fmt(price * item.qty)}</span>}
              </div>
            </div>
          );
        })}

        {total > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: `1px solid ${B.borderG}`, marginTop: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: B.cream, textTransform: "uppercase" }}>Total estimado</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: B.yellow, fontFamily: "'Arial Black',sans-serif" }}>{fmt(total)}</span>
          </div>
        )}

        {/* Extras */}
        <div style={secStyle}>
          <p style={secTitle}>🧄 Extras sin cargo</p>
          <div style={{ display: "flex", gap: 10 }}>
            {["Mayonesa de ajo", "Picante"].map(e => (
              <button key={e} onClick={() => toggleExtra(e)} style={btnBase(extras.includes(e))}>
                {e === "Mayonesa de ajo" ? "🧄 Mayo ajo" : "🌶️ Picante"}
              </button>
            ))}
          </div>
        </div>

        {/* Entrega */}
        <div style={secStyle}>
          <p style={secTitle}>🛵 Tipo de entrega</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setDelivery("Retiro en el local")} style={btnBase(delivery === "Retiro en el local")}>
              <div>🥡 Retiro</div>
              <div style={{ fontSize: 9, color: delivery === "Retiro en el local" ? "#B8E6B8" : B.muted, marginTop: 2 }}>en el local</div>
            </button>
            <button onClick={() => setDelivery("Delivery")} style={btnBase(delivery === "Delivery")}>
              <div>🛵 Delivery</div>
              <div style={{ fontSize: 9, color: delivery === "Delivery" ? "#B8E6B8" : B.muted, marginTop: 2 }}>costo a consultar</div>
            </button>
          </div>
        </div>

        {/* Pago */}
        <div style={secStyle}>
          <p style={secTitle}>💳 Forma de pago</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setPago("Efectivo")}      style={btnBase(pago === "Efectivo")}>💵 Efectivo</button>
            <button onClick={() => setPago("Transferencia")} style={btnBase(pago === "Transferencia")}>📲 Transferencia</button>
          </div>
          {pago === "Transferencia" && (
            <div style={{ marginTop: 12, background: "#060f07", borderRadius: 10, padding: "12px 14px", border: `1px dashed ${B.yellow}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div>
                <p style={{ margin: 0, fontSize: 10, color: B.muted, textTransform: "uppercase", letterSpacing: 1 }}>Alias CVU</p>
                <p style={{ margin: "4px 0 0", fontSize: 17, fontWeight: 800, color: B.yellow, fontFamily: "'Arial Black',sans-serif" }}>{ALIAS}</p>
              </div>
              <button onClick={copyAlias} style={{ background: copied ? B.green : "transparent", border: `1px solid ${copied ? B.green : B.borderG}`, borderRadius: 8, padding: "8px 14px", color: copied ? "#fff" : B.muted, fontSize: 12, cursor: "pointer", fontWeight: 700, transition: "all .2s", whiteSpace: "nowrap" }}>
                {copied ? "✓ Copiado" : "Copiar"}
              </button>
            </div>
          )}
        </div>

        <a href={waUrl} target="_blank" rel="noreferrer"
          style={{ display: "block", background: "#22c55e", borderRadius: 14, padding: "15px 0", color: "#fff", fontWeight: 800, fontSize: 15, textAlign: "center", textDecoration: "none", marginTop: 16, textTransform: "uppercase", fontFamily: "'Arial Black',sans-serif" }}>
          📲 Enviar pedido por WhatsApp
        </a>
        <p style={{ textAlign: "center", fontSize: 10, color: "#2e4e2f", marginTop: 10, marginBottom: 0 }}>
          📍 {DIRECCION}
        </p>
      </div>
    </div>
  );
}

function InfoTab() {
  const abierto = isOpen();
  return (
    <div style={{ padding: "14px 14px" }}>

      {/* Estado abierto/cerrado */}
      <div style={{ background: abierto ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", border: `1.5px solid ${abierto ? "#22c55e" : "#ef4444"}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: abierto ? "#22c55e" : "#ef4444", flexShrink: 0, boxShadow: `0 0 8px ${abierto ? "#22c55e" : "#ef4444"}` }} />
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: abierto ? "#22c55e" : "#ef4444", textTransform: "uppercase" }}>
            {abierto ? "Abierto ahora" : "Cerrado ahora"}
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 11, color: B.muted }}>
            {abierto ? "Podés hacer tu pedido 🙌" : "Abrimos a las 20:00 hs"}
          </p>
        </div>
      </div>

      {/* Horarios */}
      <div style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: 14, padding: "16px", marginBottom: 14 }}>
        <p style={{ margin: "0 0 12px", fontSize: 12, color: B.yellow, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>🕗 Horarios</p>
        {HORARIOS.map((h, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < HORARIOS.length - 1 ? `1px solid ${B.border}` : "none" }}>
            <span style={{ fontSize: 13, color: B.cream }}>{h.dias}</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: B.yellow, fontFamily: "'Arial Black',sans-serif" }}>{h.hs}</span>
          </div>
        ))}
      </div>

      {/* Ubicación */}
      <div style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: 14, padding: "16px", marginBottom: 14 }}>
        <p style={{ margin: "0 0 12px", fontSize: 12, color: B.yellow, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>📍 Ubicación</p>
        <p style={{ margin: "0 0 12px", fontSize: 13, color: B.cream, lineHeight: 1.5 }}>{DIRECCION}</p>
        <a href={MAPS_URL} target="_blank" rel="noreferrer"
          style={{ display: "block", background: "transparent", border: `1.5px solid ${B.borderG}`, borderRadius: 10, padding: "10px 0", color: B.muted, fontSize: 13, fontWeight: 700, textAlign: "center", textDecoration: "none", textTransform: "uppercase", letterSpacing: 0.5 }}>
          🗺️ Abrir en Google Maps
        </a>
      </div>

      {/* Teléfonos */}
      <div style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: 14, padding: "16px", marginBottom: 14 }}>
        <p style={{ margin: "0 0 12px", fontSize: 12, color: B.yellow, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>📞 Teléfonos</p>
        {TELEFONOS.map((tel, i) => (
          <a key={i} href={`tel:${tel}`}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < TELEFONOS.length - 1 ? `1px solid ${B.border}` : "none", textDecoration: "none" }}>
            <span style={{ fontSize: 14, color: B.cream, fontWeight: 600 }}>{tel}</span>
            <span style={{ fontSize: 11, color: B.yellow, fontWeight: 700, textTransform: "uppercase" }}>Llamar →</span>
          </a>
        ))}
      </div>

      {/* Entrega */}
      <div style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: 14, padding: "16px" }}>
        <p style={{ margin: "0 0 12px", fontSize: 12, color: B.yellow, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>🛵 Entrega</p>
        <div style={{ display: "flex", gap: 10 }}>
          {[{ icon: "🥡", label: "Takeaway", sub: "Retiro en el local" }, { icon: "🛵", label: "Delivery", sub: "Costo según zona" }].map(d => (
            <div key={d.label} style={{ flex: 1, background: B.cardAlt, border: `1px solid ${B.borderG}`, borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{d.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: B.cream, textTransform: "uppercase" }}>{d.label}</div>
              <div style={{ fontSize: 10, color: B.muted, marginTop: 2 }}>{d.sub}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ── APP PRINCIPAL ─────────────────────────────────────────────
export default function App() {
  const [cart, setCart]         = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [sizeModal, setSizeModal] = useState(null);

  const activeTabName  = ALL_TABS[activeTab];
  const isPromos       = activeTabName === "🔥 Promos";
  const isInfo         = activeTabName === "ℹ️ Info";
  const activeCategory = (!isPromos && !isInfo) ? MENU.find(c => c.category === activeTabName) : null;

  const addToCart = (item, sizeKey, category) => {
    const cartId    = `${item.id}-${sizeKey}`;
    const sizeLabel1 = category?.sizeLabels?.[0] || null;
    const sizeLabel2 = category?.sizeLabels?.[1] || null;
    setCart(prev => {
      const exists = prev.find(i => i.cartId === cartId);
      if (exists) return prev.map(i => i.cartId === cartId ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, cartId, sizeKey, sizeLabel1, sizeLabel2, qty: 1 }];
    });
  };

  const handleAdd = (item, category) => {
    const hasDouble = category?.hasSize && item.price2 !== null && item.price2 !== undefined;
    if (hasDouble) setSizeModal({ item, category });
    else addToCart(item, "full", category);
  };

  const removeFromCart = (cartId) => setCart(prev => {
    const item = prev.find(i => i.cartId === cartId);
    if (!item) return prev;
    if (item.qty === 1) return prev.filter(i => i.cartId !== cartId);
    return prev.map(i => i.cartId === cartId ? { ...i, qty: i.qty - 1 } : i);
  });

  const addOneToCart = (cartId) => setCart(prev => prev.map(i => i.cartId === cartId ? { ...i, qty: i.qty + 1 } : i));

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => {
    const p = i.sizeKey === "half" ? (i.price2 || 0) : (i.price || 0);
    return s + p * i.qty;
  }, 0);

  return (
    <div style={{ fontFamily: "'Arial',sans-serif", background: B.bg, minHeight: "100vh", color: B.cream, maxWidth: 480, margin: "0 auto", position: "relative", paddingBottom: 120 }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(160deg, #060f07 0%, ${B.green} 55%, #060f07 100%)`, padding: "26px 20px 20px", textAlign: "center", borderBottom: `2px solid ${B.yellow}` }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ width: 68, height: 68, borderRadius: "50%", background: `radial-gradient(circle at 40% 40%, ${B.greenLight}, ${B.green})`, border: `3px solid ${B.yellow}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, boxShadow: `0 0 24px rgba(249,192,14,0.35)` }}>🧑‍🍳</div>
          <div>
            <div style={{ fontFamily: "'Impact','Arial Black',sans-serif", fontSize: 13, color: B.yellow, letterSpacing: 4, textTransform: "uppercase", fontWeight: 900 }}>San Juan</div>
            <div style={{ fontFamily: "'Impact','Arial Black',sans-serif", fontSize: 20, color: "#fff", letterSpacing: 2, textTransform: "uppercase", fontWeight: 900, marginTop: -2 }}>Delivery</div>
          </div>
        </div>
        <p style={{ margin: "10px 0 0", fontSize: 11, color: B.yellow, letterSpacing: 2, textTransform: "uppercase" }}>{DIRECCION}</p>
        <p style={{ margin: "6px auto 0", fontSize: 12, color: B.muted, fontStyle: "italic" }}>Comida hecha con amor, pura y artesanal 😍</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
          <span style={{ background: isOpen() ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.1)", border: `1px solid ${isOpen() ? "#22c55e" : "#ef4444"}`, borderRadius: 20, padding: "4px 14px", fontSize: 11, color: isOpen() ? "#22c55e" : "#ef4444", fontWeight: 700 }}>
            {isOpen() ? "● Abierto" : "● Cerrado"}
          </span>
          <span style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${B.borderG}`, borderRadius: 20, padding: "4px 14px", fontSize: 11, color: B.muted }}>🕗 20:00 — 02:00</span>
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: B.muted }}>📞 {TELEFONOS.join(" · ")}</div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", overflowX: "auto", background: B.green, borderBottom: `2px solid ${B.yellow}`, scrollbarWidth: "none" }}>
        {ALL_TABS.map((tab, i) => {
          const cat   = MENU.find(c => c.category === tab);
          const emoji = tab === "🔥 Promos" ? "🔥" : tab === "ℹ️ Info" ? "ℹ️" : cat?.emoji || "";
          const label = tab === "🔥 Promos" ? "Promos" : tab === "ℹ️ Info" ? "Info" : tab;
          return (
            <button key={tab} onClick={() => setActiveTab(i)}
              style={{ flexShrink: 0, background: "none", border: "none", borderBottom: activeTab === i ? `3px solid ${B.yellow}` : "3px solid transparent", color: activeTab === i ? B.yellow : "rgba(255,255,255,0.6)", padding: "12px 11px", fontSize: 10, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap", letterSpacing: 0.8, textTransform: "uppercase", transition: "color .15s" }}>
              {emoji} {label}
            </button>
          );
        })}
      </div>

      {/* PROMOS */}
      {isPromos && (
        <div style={{ padding: "12px" }}>
          <div style={{ background: "linear-gradient(135deg,#1A3A1C,#0A2010)", border: `1.5px solid ${B.yellow}`, borderRadius: 14, padding: "14px 14px 6px" }}>
            <p style={{ margin: "0 0 12px", fontSize: 13, color: B.yellow, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>🔥 Promos del día</p>
            {PROMOS.map(promo => (
              <div key={promo.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(249,192,14,0.12)" }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: B.cream, flex: 1, marginRight: 10 }}>{promo.name}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: B.yellow, fontFamily: "'Arial Black',sans-serif" }}>{promo.price ? fmt(promo.price) : "Consultar"}</span>
                  <button onClick={() => addToCart({ ...promo, desc: promo.name }, "full", null)}
                    style={{ background: B.yellow, border: "none", borderRadius: 18, padding: "6px 14px", color: B.green, fontWeight: 800, fontSize: 11, cursor: "pointer", textTransform: "uppercase" }}>
                    + Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INFO */}
      {isInfo && <InfoTab />}

      {/* CATEGORÍA */}
      {activeCategory && (
        <div>
          <div style={{ padding: "10px 16px 6px", background: B.cardAlt, borderBottom: `1px solid ${B.border}` }}>
            <p style={{ margin: 0, fontSize: 11, color: B.muted, fontStyle: "italic" }}>{activeCategory.emoji} {activeCategory.subtitle}</p>
            {activeCategory.hasSize && activeCategory.sizeLabels?.length === 2 && (
              <p style={{ margin: "4px 0 0", fontSize: 10, color: B.yellowDim, letterSpacing: 1 }}>💡 Al agregar podés elegir tamaño</p>
            )}
          </div>
          <div style={{ padding: "10px 12px" }}>
            {activeCategory.items.map((item) => {
              const qtyInCart = cart.filter(i => i.id === item.id).reduce((s, i) => s + i.qty, 0);
              const hasDouble = activeCategory.hasSize && item.price2 !== null && item.price2 !== undefined;
              return (
                <div key={item.id} style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: 14, marginBottom: 10, overflow: "hidden", display: "flex" }}>
                  <div style={{ flex: 1, padding: "13px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 800, fontSize: 14, color: B.cream, textTransform: "uppercase", letterSpacing: 0.3 }}>{item.name}</span>
                      {item.tag && <span style={{ background: "rgba(249,192,14,0.1)", border: `1px solid ${B.yellowDim}`, borderRadius: 10, padding: "2px 8px", fontSize: 9, color: B.yellow, fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase" }}>{item.tag}</span>}
                    </div>
                    <p style={{ margin: "0 0 10px", fontSize: 11, color: B.muted, lineHeight: 1.5 }}>{item.desc}</p>
                    <div style={{ display: "flex", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                      {item.price ? (
                        <div>
                          {hasDouble && <div style={{ fontSize: 9, color: B.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 1 }}>{activeCategory.sizeLabels[0]}</div>}
                          <div style={{ fontSize: 17, fontWeight: 800, color: B.yellow, fontFamily: "'Arial Black',sans-serif" }}>{fmt(item.price)}</div>
                        </div>
                      ) : null}
                      {item.price2 ? (
                        <div>
                          <div style={{ fontSize: 9, color: B.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 1 }}>{activeCategory.sizeLabels[1]}</div>
                          <div style={{ fontSize: 17, fontWeight: 800, color: "#B8E6B8", fontFamily: "'Arial Black',sans-serif" }}>{fmt(item.price2)}</div>
                        </div>
                      ) : null}
                      {!item.price && !item.price2 && <span style={{ fontSize: 11, color: B.muted, fontStyle: "italic" }}>Consultá precio</span>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      {qtyInCart > 0 && <span style={{ fontSize: 11, color: B.muted }}>{qtyInCart} en el carrito</span>}
                      <button onClick={() => handleAdd(item, activeCategory)}
                        style={{ background: B.yellow, border: "none", borderRadius: 20, padding: "8px 16px", color: B.green, fontWeight: 800, fontSize: 12, cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase", marginLeft: "auto" }}>
                        + Agregar
                      </button>
                    </div>
                  </div>
                  <div style={{ width: 6, background: `linear-gradient(to bottom,${B.yellow},${B.green})`, flexShrink: 0 }} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SIZE MODAL */}
      {sizeModal && (
        <SizeModal
          item={sizeModal.item}
          category={sizeModal.category}
          onSelect={(sizeKey) => { addToCart(sizeModal.item, sizeKey, sizeModal.category); setSizeModal(null); }}
          onClose={() => setSizeModal(null)}
        />
      )}

      {/* FLOATING CART */}
      {totalItems > 0 && !showCart && (
        <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 100, width: "calc(min(480px,100vw) - 28px)" }}>
          <button onClick={() => setShowCart(true)}
            style={{ width: "100%", background: B.yellow, border: "none", borderRadius: 14, padding: "15px 18px", color: B.green, fontWeight: 800, fontSize: 14, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 8px 28px rgba(249,192,14,0.5)", boxSizing: "border-box", fontFamily: "'Arial Black',sans-serif", textTransform: "uppercase" }}>
            <span style={{ background: "rgba(0,0,0,0.15)", borderRadius: 20, padding: "3px 12px", fontSize: 12, fontFamily: "Arial,sans-serif", fontWeight: 700, textTransform: "none" }}>{totalItems} {totalItems === 1 ? "ítem" : "ítems"}</span>
            <span>Ver pedido →</span>
            <span>{totalPrice > 0 ? fmt(totalPrice) : ""}</span>
          </button>
        </div>
      )}

      {/* CART DRAWER */}
      {showCart && <CartDrawer cart={cart} onRemove={removeFromCart} onAddOne={addOneToCart} onClose={() => setShowCart(false)} />}
    </div>
  );
}
