// ================================================================
// App.js — Billy Burgers · Menú Digital
// ================================================================
// GUÍA PARA EDITAR FÁCILMENTE:
//   • Agregar/quitar productos  → busca la sección PRODUCTS
//   • Agregar/quitar categorías → busca la sección CATEGORIES
//   • Cambiar número WhatsApp   → busca "wa.me/" y edita el número
//   • Cambiar horario de atención → busca "Abierto Jue-Dom"
//   • Cambiar link de TikTok    → busca "tiktok.com/@"
//   • Cambiar precios           → edita el campo "price" de cada producto
// ================================================================
﻿import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search, Phone, MapPin, Clock, Minus, Plus, Trash2, ChevronRight, X, Flame, Star } from "lucide-react";
import "./App.css";

// ── CATEGORÍAS ─────────────────────────────────────────────
// El campo "id" debe coincidir exactamente con "category" de cada producto.
const CATEGORIES = [
  { id: "todos", label: "Todo" },
  { id: "hamburguesas", label: "Burgers" },
  { id: "papasfritas", label: "Papas" },
  { id: "alitas", label: "Alitas" },
  { id: "extras", label: "Extras" },
];

// ── PRODUCTOS ──────────────────────────────────────────────
// Cada entrada: { id, name, desc, price, category, img, badges }
// badges: etiqueta especial, ej ["Más vendido"]. Usa [] si no aplica.
const PRODUCTS = [
  { id: "Clasica", name: "Hamburguesa Clasica", desc: "Pan de finas hierbas + Carne + queso cheddar + salsa de tomate + mayonesa + lechuga + tomate + porcion de papas.", price: 3, category: "hamburguesas", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop", badges: [] },
  { id: "Bacon", name: "Hamburguesa Bacon", desc: "Pan de queso con oregano + carne + tocino + lechuga + tomate + mayonesa + salsa de tomate + lamina de mozzarella + huevo + porcion de papas.", price: 4, category: "hamburguesas", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop", badges: [] },
  { id: "Completa", name: "Hamburguesa Completa", desc: "Pan de queso con oregano + doble carne + doble tocino + cheddar liquido + dos laminas de mozzarella + huevo + porcion de papas.", price: 5, category: "hamburguesas", img: "/i/hamburguesa completa.png", badges: ["Mas vendido"] },
  { id: "salchipapa", name: "Salchipapa", desc: "Papas fritas + paprika + salchichas + salsa de tomate + mayonesa y queso cheddar.", price: 3, category: "papasfritas", img: "/i/salchipapa.jpg", badges: [] },
  { id: "papascheddar", name: "Papas Cheddar", desc: "Papas fritas + paprika + queso cheddar y papitas trituradas.", price: 2.5, category: "papasfritas", img: "/i/papascheddar.jpg", badges: [] },
  { id: "salchipapatocino", name: "Salchipapa con Tocino", desc: "Papas fritas + paprika + salchichas + tocino + salsa de tomate + mayonesa y queso cheddar.", price: 3.5, category: "papasfritas", img: "/i/salchipapatocino.jpg", badges: [] },
  { id: "papaschili", name: "Papas Chili", desc: "Papas fritas + paprika + chili + jalapeno + cheddar.", price: 3.5, category: "papasfritas", img: "/i/papas chili.jpg", badges: [] },
  { id: "papasmix", name: "Papas Mix", desc: "Papas fritas + paprika + salchichas + chili + jalapeno + mayonesa + salsa de tomate + cheddar.", price: 4, category: "papasfritas", img: "/i/papas mix1.jpg", badges: [] },
  { id: "hotdog", name: "Hot Dog", desc: "Pan de hot dog + Salchicha + Tocino + Queso mozzarella + cheddar + Porcion de papas.", price: 2.5, category: "extras", img: "/i/hotdog.jpg", badges: [] },
  { id: "arosCebolla", name: "Aros de Cebolla", desc: "8 Aros de cebolla + salsa BBQ + porcion de papas.", price: 2.5, category: "extras", img: "/i/Aros de cebolla.jpg", badges: [] },
  { id: "alitas6", name: "Alitas x 6", desc: "6 alitas con salsa BBQ o Honey mustard.", price: 5, category: "alitas", img: "/i/alitasx6.jpg", badges: [] },
  { id: "alitas12", name: "Alitas x 12", desc: "12 alitas con salsa BBQ o Honey mustard.", price: 8, category: "alitas", img: "/i/alitasx12.jpg", badges: [] },
  { id: "alitas24", name: "Alitas x 24", desc: "24 alitas con salsa BBQ o Honey mustard.", price: 15, category: "alitas", img: "/i/alitasx24.jpg", badges: [] },
];

const fmt = (n) => `$${n.toFixed(2)}`;

function Modal({ product, onClose, onAdd }) {
  if (!product) return null;
  return (
    <div className="bb-modal-overlay" onClick={onClose}>
      <motion.div
        className="bb-modal"
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 20 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bb-card-img-wrap" style={{ height: 280 }}>
          <img src={product.img} alt={product.name} style={{ height: 280, objectFit: "cover", width: "100%" }} />
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 900, margin: 0, lineHeight: 1.2 }}>{product.name}</h2>
            <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,248,238,0.5)", cursor: "pointer" }}><X size={22} /></button>
          </div>
          <p style={{ marginTop: 12, color: "rgba(255,248,238,0.65)", lineHeight: 1.65 }}>{product.desc}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
            <span className="bb-price">{fmt(product.price)}</span>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="bb-btn bb-btn-primary"
              onClick={() => { onAdd(product); onClose(); }}>
              <ShoppingCart size={18} /> Anadir al carrito
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function QtyCtrl({ value, onInc, onDec }) {
  return (
    <div className="bb-qty">
      <button className="bb-qty-btn" onClick={onDec}><Minus size={13} /></button>
      <span style={{ minWidth: 22, textAlign: "center", fontWeight: 700 }}>{value}</span>
      <button className="bb-qty-btn" onClick={onInc}><Plus size={13} /></button>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("todos");
  const [cart, setCart] = useState({});
  const [openCart, setOpenCart] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => { try { const s = localStorage.getItem("bb_cart"); if (s) setCart(JSON.parse(s)); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem("bb_cart", JSON.stringify(cart)); } catch {} }, [cart]);

  const add = (p) => setCart(prev => ({ ...prev, [p.id]: { qty: (prev[p.id]?.qty || 0) + 1, product: p } }));
  const inc = (id) => setCart(prev => ({ ...prev, [id]: { ...prev[id], qty: prev[id].qty + 1 } }));
  const dec = (id) => setCart(prev => {
    if (!prev[id]) return prev;
    if (prev[id].qty <= 1) { const { [id]: _, ...rest } = prev; return rest; }
    return { ...prev, [id]: { ...prev[id], qty: prev[id].qty - 1 } };
  });
  const remove = (id) => setCart(prev => { const { [id]: _, ...rest } = prev; return rest; });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(p => (cat === "todos" || p.category === cat) && (!q || `${p.name} ${p.desc}`.toLowerCase().includes(q)));
  }, [query, cat]);

  const items = useMemo(() => Object.values(cart), [cart]);
  const subtotal = useMemo(() => items.reduce((s, it) => s + it.qty * it.product.price, 0), [items]);
  const totalItems = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);
  const waText = encodeURIComponent(`Hola Billy Burgers! Quiero hacer este pedido:\n\n${items.map(i => `- ${i.qty}x ${i.product.name} (${fmt(i.product.price)})`).join("\n")}\n\nTotal: ${fmt(subtotal)}`);
  // ⚠ Cambia el número de abajo si cambia el WhatsApp del negocio:
  const waLink = `https://wa.me/593984097456?text=${waText}`;

  const S = { position: "relative", zIndex: 1 };
  const maxW = { maxWidth: 1280, margin: "0 auto", padding: "0 20px" };

  return (
    <div className="bb-noise" style={{ minHeight: "100vh", background: "var(--bb-bg)", color: "var(--bb-text)", fontFamily: "var(--bb-font)" }}>
      <div className="bb-bg-blobs" aria-hidden="true">
        <div className="bb-blob bb-blob-1" /><div className="bb-blob bb-blob-2" /><div className="bb-blob bb-blob-3" />
      </div>
      <div style={S}>
        {/* HEADER */}
        <header className="bb-header">
          <div style={{ ...maxW, height: 64, display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/logo_billy_burgerss.png" alt="Billy Burgers" style={{ height: 42, width: 42, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,107,0,0.5)" }} />
            <span style={{ fontWeight: 900, fontSize: "1.2rem", letterSpacing: "-0.02em" }}>Billy <span style={{ color: "var(--bb-orange)" }}>Burgers</span></span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
              <a href={waLink} target="_blank" rel="noreferrer" className="bb-btn bb-btn-ghost" style={{ padding: "8px 16px", textDecoration: "none", fontSize: "0.85rem" }}>
                <Phone size={15} /> WhatsApp
              </a>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setOpenCart(true)}
                className={`bb-btn bb-btn-primary ${totalItems > 0 ? "bb-cart-pulse" : ""}`}
                style={{ position: "relative", padding: "10px 20px" }}
                aria-label={`Carrito con ${totalItems} articulos`}>
                <ShoppingCart size={18} />
                {!isMobile && <span>Carrito</span>}
                {totalItems > 0 && (
                  <span style={{ position: "absolute", top: -8, right: -8, background: "#ff3d00", color: "#fff", fontSize: "0.7rem", fontWeight: 800, width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{totalItems}</span>
                )}
              </motion.button>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section style={{ ...maxW, padding: "60px 20px 40px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto", gap: 40, alignItems: "center" }}>
          <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,107,0,0.12)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: 999, padding: "6px 14px", fontSize: "0.8rem", fontWeight: 700, color: "var(--bb-orange)", marginBottom: 20 }}>
              <Flame size={14} /> Abierto Jue-Dom — 18:30-22:00
            </div>
            <h1 className="bb-hero-title">La <span className="bb-hero-gradient">hamburguesa</span><br />que mereces.</h1>
            <p style={{ marginTop: 16, fontSize: "1.05rem", color: "rgba(255,248,238,0.6)", maxWidth: 480, lineHeight: 1.7 }}>
              Hecha con ingredientes frescos, sabor autentico y mucho amor desde Guayaquil.
            </p>
            <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <motion.a whileHover={{ scale: 1.05 }} href="#menu" className="bb-btn bb-btn-primary" style={{ textDecoration: "none" }}>
                <Star size={16} /> Ver menu completo
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} href={waLink} target="_blank" rel="noreferrer" className="bb-btn bb-btn-ghost" style={{ textDecoration: "none" }}>
                <Phone size={16} /> Ordenar por WhatsApp
              </motion.a>
            </div>
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 16, fontSize: "0.85rem", color: "rgba(255,248,238,0.45)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={14} style={{ color: "var(--bb-orange)" }} /> Guayaquil - Pancho Jacome</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Clock size={14} style={{ color: "var(--bb-orange)" }} /> Jue a Dom 18:30-22:00</span>
            </div>
          </motion.div>
          {!isMobile && (
            <motion.img initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.15 }}
              src="/logo_billy_burgerss.png" alt="Billy Burgers logo"
              style={{ width: 280, height: 280, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(255,107,0,0.35)", boxShadow: "0 0 80px rgba(255,107,0,0.22)" }}
            />
          )}
        </section>

        {/* STATS */}
        <div style={{ ...maxW, padding: "0 20px 40px" }}>
          <div style={{ display: "flex", background: "rgba(255,107,0,0.06)", border: "1px solid rgba(255,107,0,0.14)", borderRadius: 20, overflow: "hidden", flexWrap: "wrap" }}>
            {[["14+", "Productos"], ["4.9 ★", "Calidad"], ["A consultar", "Delivery"], ["~30min", "Espera"]].map(([v, l]) => (
              <div key={l} className="bb-stat"><span className="bb-stat-value">{v}</span><span className="bb-stat-label">{l}</span></div>
            ))}
          </div>
        </div>

        {/* MENU */}
        <section id="menu" style={{ ...maxW, padding: "0 20px 60px" }}>
          <h2 className="bb-section-title" style={{ marginBottom: 28 }}>Nuestro Menu</h2>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, marginBottom: 32 }}>
            <div className="bb-search" style={{ flex: 1 }}>
              <Search size={18} style={{ color: "var(--bb-orange)", flexShrink: 0 }} />
              <input placeholder="Buscar en el menu..." value={query} onChange={e => setQuery(e.target.value)} aria-label="Buscar productos" />
            </div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
              {CATEGORIES.map(c => (
                <button key={c.id} className={`bb-pill ${cat === c.id ? "active" : ""}`} onClick={() => setCat(c.id)}>{c.label}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            <AnimatePresence>
              {filtered.map(p => (
                <motion.div key={p.id} layout
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="bb-card" style={{ borderRadius: 24, overflow: "hidden", cursor: "pointer" }}
                  onClick={() => setSelected(p)}>
                  <div className="bb-card-img-wrap" style={{ height: 210 }}>
                    <img src={p.img} alt={p.name} style={{ height: 210, objectFit: "cover", width: "100%" }} />
                    {p.badges.map(b => (
                      <span key={b} className="bb-badge-hot" style={{ position: "absolute", top: 12, left: 12, zIndex: 2 }}>?? {b}</span>
                    ))}
                  </div>
                  <div style={{ padding: "18px 20px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, lineHeight: 1.3 }}>{p.name}</h3>
                        <p style={{ margin: "6px 0 0", fontSize: "0.8rem", color: "rgba(255,248,238,0.55)", lineHeight: 1.5 }}>{p.desc}</p>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div className="bb-price">{fmt(p.price)}</div>
                        <div style={{ fontSize: "0.68rem", color: "rgba(255,248,238,0.3)", marginTop: 2 }}>IVA incl.</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        className="bb-btn bb-btn-primary" style={{ padding: "9px 18px", fontSize: "0.85rem" }}
                        onClick={e => { e.stopPropagation(); add(p); }}>
                        <ShoppingCart size={15} /> Anadir
                      </motion.button>
                      <button style={{ background: "none", border: "none", color: "rgba(255,248,238,0.45)", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: "0.82rem" }}
                        onClick={e => { e.stopPropagation(); setSelected(p); }}>
                        Detalles <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filtered.length === 0 && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 20px", color: "rgba(255,248,238,0.3)" }}>
                <Search size={48} style={{ marginBottom: 12, opacity: 0.4 }} />
                <p>No se encontraron productos para "{query}"</p>
              </div>
            )}
          </div>
        </section>

        {/* TIKTOK CTA */}
        <div style={{ ...maxW, padding: "0 20px 60px" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.1), rgba(255,213,79,0.05))", border: "1px solid rgba(255,107,0,0.18)", borderRadius: 24, padding: 32, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
            <div>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--bb-orange)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Siguenos</p>
              <h3 style={{ margin: "8px 0 4px", fontSize: "1.4rem", fontWeight: 900 }}>Estamos en TikTok</h3>
              <p style={{ margin: 0, color: "rgba(255,248,238,0.55)", fontSize: "0.9rem" }}>Mira lo que preparamos cada dia.</p>
            </div>
            <motion.a whileHover={{ scale: 1.05 }} href="https://www.tiktok.com/@burgerlovers_12" target="_blank" rel="noreferrer"
              className="bb-btn bb-btn-primary" style={{ textDecoration: "none" }}>
              @burgerlovers_12 🎵
            </motion.a>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="bb-footer">
          <img src="/logo_billy_burgerss.png" alt="Billy Burgers" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", marginBottom: 12, border: "2px solid rgba(255,107,0,0.3)" }} />
          <p style={{ margin: "0 0 4px" }}>2025 Billy Burgers © Guayaquil, Ecuador</p>
          <p style={{ margin: 0 }}>Hecho con amor para los amantes de las burgers</p>
        </footer>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && <Modal product={selected} onClose={() => setSelected(null)} onAdd={add} />}
      </AnimatePresence>

      {/* CART DRAWER */}
      <AnimatePresence>
        {openCart && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 150, display: "flex" }}
            onClick={() => setOpenCart(false)}>
            <motion.aside className="bb-cart"
              initial={isMobile ? { y: "100%" } : { x: "100%" }}
              animate={isMobile ? { y: 0 } : { x: 0 }}
              exit={isMobile ? { y: "100%" } : { x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              style={{ marginLeft: "auto", width: "100%", maxWidth: 420, height: isMobile ? "78vh" : "100%", padding: 24, display: "flex", flexDirection: "column", borderRadius: isMobile ? "24px 24px 0 0" : 0 }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 900 }}>Tu pedido</h2>
                  <p style={{ margin: "2px 0 0", fontSize: "0.8rem", color: "rgba(255,248,238,0.45)" }}>{totalItems} articulo{totalItems !== 1 ? "s" : ""}</p>
                </div>
                <button onClick={() => setOpenCart(false)} style={{ background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.25)", borderRadius: 10, padding: 8, color: "var(--bb-text)", cursor: "pointer" }}><X size={18} /></button>
              </div>

              {items.length === 0 ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "rgba(255,248,238,0.28)" }}>
                  <ShoppingCart size={56} style={{ marginBottom: 12 }} />
                  <p>Tu carrito esta vacio</p>
                  <button onClick={() => setOpenCart(false)} className="bb-btn bb-btn-ghost" style={{ marginTop: 12, fontSize: "0.85rem" }}>Ver el menu</button>
                </div>
              ) : (
                <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
                  <AnimatePresence>
                    {items.map(({ product, qty }) => (
                      <motion.div key={product.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} className="bb-cart-item">
                        <img src={product.img} alt={product.name} style={{ width: 60, height: 60, borderRadius: 12, objectFit: "cover" }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.9rem" }}>{product.name}</p>
                          <p style={{ margin: "3px 0 0", fontSize: "0.8rem", color: "rgba(255,248,238,0.5)" }}>{fmt(product.price * qty)}</p>
                        </div>
                        <QtyCtrl value={qty} onInc={() => inc(product.id)} onDec={() => dec(product.id)} />
                        <motion.button whileHover={{ scale: 1.1 }} onClick={() => remove(product.id)}
                          style={{ background: "rgba(255,61,0,0.12)", border: "1px solid rgba(255,61,0,0.25)", borderRadius: 8, padding: 7, color: "#ff6b6b", cursor: "pointer" }}>
                          <Trash2 size={14} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              <div style={{ borderTop: "1px solid rgba(255,107,0,0.15)", paddingTop: 16, marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "rgba(255,248,238,0.6)" }}>
                  <span>Subtotal</span><span>{fmt(subtotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "rgba(255,248,238,0.45)", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ whiteSpace: "nowrap", fontStyle: "italic" }}>Delivery</span>
                  <span style={{ textAlign: "right", lineHeight: 1.45, maxWidth: 180 }}>
                    Varía según la zona de entrega.<br/>Se coordina al confirmar el pedido.
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "1.15rem", marginTop: 4 }}>
                  <span>Total</span><span style={{ color: "var(--bb-orange)" }}>{fmt(subtotal)}</span>
                </div>
                <a href={waLink} target="_blank" rel="noreferrer"
                  className={`bb-wa-btn ${items.length === 0 ? "disabled" : ""}`}
                  style={{ marginTop: 8 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.522 5.855L0 24l6.335-1.493A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.804 9.804 0 01-5.032-1.385l-.361-.214-3.736.88.936-3.635-.235-.374A9.793 9.793 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
                  Confirmar por WhatsApp
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
