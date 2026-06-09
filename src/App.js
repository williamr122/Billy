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
// NOTA PARA EDITAR CATEGORÍAS: Puedes cambiar los nombres o añadir nuevas categorías aquí.
const CATEGORIES = [
  { id: "todos", label: "Todo" },
  { id: "hamburguesas", label: "Burgers" },
  { id: "papasfritas", label: "Papas" },
  { id: "alitas", label: "Alitas" },
  { id: "bebidas", label: "Bebidas" }, // <-- NUEVA CATEGORÍA DE BEBIDAS
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
  // ── SECCIÓN DE BEBIDAS AGREGADAS ───────────────────────────
  // NOTA PARA EDITAR PRECIOS O IMÁGENES:
  // - Para cambiar el precio: modifica el número en "price" (ej. 0.50 o 1.25)
  // - Para cambiar el nombre o la descripción: edita los campos "name" y "desc"
  // - Para optimizar la carga del móvil, se usan URLs optimizadas de Unsplash para las bebidas.
  { id: "cocacolapersonal", name: "Coca-Cola Personal", desc: "Coca-Cola clásica bien helada, presentación personal de 300ml.", price: 0.50, category: "bebidas", img: "i/Coca_cola_personal.jpg", badges: [] },
  { id: "cocacola1l", name: "Coca-Cola 1 Litro", desc: "Coca-Cola clásica de 1 litro helada, ideal para acompañar tu combo favorito.", price: 1.25, category: "bebidas", img: "i/Coca_cola_1l.jpg", badges: [] },
];

// ── PERSONALIZACIÓN DE INGREDIENTES ────────────────────────
// NOTA PARA EDITAR: Aquí puedes cambiar los precios de los ingredientes adicionales o añadir/quitar opciones.
const EXTRAS_LIST = [
  { id: "queso", name: "Queso Cheddar", price: 0.30 },
  { id: "tocino", name: "Tocino Crujiente", price: 0.30 },
  { id: "huevo", name: "Huevo Frito", price: 0.40 },
  { id: "carne", name: "Carne", price: 1.00 },
];

const REMOVALS_LIST = [
  { id: "cebolla", name: "Sin Cebolla Caramelizada" },
  { id: "salsas", name: "Sin Salsas" },
  { id: "vegetales", name: "Sin Vegetales" },
];

const fmt = (n) => `$${n.toFixed(2)}`;

function Modal({ product, onClose, onAdd }) {
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedRemovals, setSelectedRemovals] = useState([]);

  if (!product) return null;

  const toggleExtra = (extra) => {
    setSelectedExtras(prev => 
      prev.some(e => e.id === extra.id) 
        ? prev.filter(e => e.id !== extra.id) 
        : [...prev, extra]
    );
  };

  const toggleRemoval = (removalName) => {
    setSelectedRemovals(prev => 
      prev.includes(removalName)
        ? prev.filter(r => r !== removalName)
        : [...prev, removalName]
    );
  };

  const calculatedPrice = product.price + selectedExtras.reduce((sum, e) => sum + e.price, 0);

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
        <div style={{ height: 280, background: "rgba(10, 6, 0, 0.4)", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
          {/* NOTA DE RENDIMIENTO Y DISEÑO: Se removió la clase bb-card-img-wrap para quitar el degradado oscuro y se usa objectFit: "contain"
              para mostrar la imagen completa y sin recortes (ideal para botellas y productos verticales) */}
          <img src={product.img} alt={product.name} loading="lazy" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 900, margin: 0, lineHeight: 1.2 }}>{product.name}</h2>
            <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,248,238,0.5)", cursor: "pointer" }}><X size={22} /></button>
          </div>
          <p style={{ marginTop: 12, color: "rgba(255,248,238,0.65)", lineHeight: 1.65 }}>{product.desc}</p>
          
          {/* PERSONALIZADOR DE INGREDIENTES INTERACTIVO - AGREGADO SEGÚN SOLICITUD */}
          {/* NOTA PARA EDITAR: Este bloque permite añadir extras o quitar ingredientes solo a las hamburguesas */}
          {product.category === "hamburguesas" && (
            <div style={{ marginTop: 16, borderTop: "1px solid rgba(255,107,0,0.15)", paddingTop: 16 }}>
              <p style={{ margin: "0 0 10px", fontSize: "0.85rem", fontWeight: 700, color: "var(--bb-orange)" }}>Personaliza tu Burger 🍔➕</p>
              
              {/* Extras */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
                <span style={{ fontSize: "0.72rem", color: "rgba(255,248,238,0.45)", fontWeight: 600 }}>Adicionales:</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {EXTRAS_LIST.map(ext => {
                    const isSelected = selectedExtras.some(e => e.id === ext.id);
                    return (
                      <button
                        key={ext.id}
                        onClick={() => toggleExtra(ext)}
                        style={{
                          background: isSelected ? "rgba(255,107,0,0.15)" : "rgba(255,248,238,0.03)",
                          border: isSelected ? "1px solid var(--bb-orange)" : "1px solid rgba(255,248,238,0.1)",
                          borderRadius: 8,
                          padding: "5px 10px",
                          fontSize: "0.72rem",
                          color: isSelected ? "#fff" : "rgba(255,248,238,0.7)",
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                      >
                        + {ext.name} (+${ext.price.toFixed(2)})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Removals */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: "0.72rem", color: "rgba(255,248,238,0.45)", fontWeight: 600 }}>Quitar ingredientes:</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {REMOVALS_LIST.map(rem => {
                    const isSelected = selectedRemovals.includes(rem.name);
                    return (
                      <button
                        key={rem.id}
                        onClick={() => toggleRemoval(rem.name)}
                        style={{
                          background: isSelected ? "rgba(255,61,0,0.12)" : "rgba(255,248,238,0.03)",
                          border: isSelected ? "1px solid #ff3d00" : "1px solid rgba(255,248,238,0.1)",
                          borderRadius: 8,
                          padding: "5px 10px",
                          fontSize: "0.72rem",
                          color: isSelected ? "#ff8f8f" : "rgba(255,248,238,0.7)",
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                      >
                        {rem.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
            <span className="bb-price">{fmt(calculatedPrice)}</span>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="bb-btn bb-btn-primary"
              onClick={() => { onAdd(product, 1, selectedExtras, selectedRemovals); onClose(); }}>
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

// ── WIDGET MASCOTA FLOTANTE INTERACTIVA ────────────────────────
// NOTA PARA EDITAR: Este componente crea el emoji de hamburguesa flotante.
// - Puedes cambiar el emoji '🍔' por cualquier otro (ej. '🍟', '🥤', o un avatar).
// - Puedes cambiar los mensajes que aparecen en la burbuja en la lista 'messages'.
// - Puedes cambiar la posición modificando 'bottom' y 'left' o 'right' en el estilo CSS en línea.
function FloatingMascot({ onSelectSpecial }) {
  const [bubbleText, setBubbleText] = useState("¿Con hambre? 🍔 ¡Toca aquí para ver nuestra burger especial!");
  const [showBubble, setShowBubble] = useState(true);

  // Mensajes que rotan automáticamente en la burbuja de diálogo
  useEffect(() => {
    const messages = [
      "¿Con hambre? 🍔 ¡Toca aquí para ver nuestra burger especial!",
      "⚡ ¡Doble tocino, doble sabor! Pruébala hoy.",
      "🥤 ¡Elige una Coca-Cola bien helada para acompañar!",
      "✨ ¡El combo perfecto sí existe! ¿Qué esperas?",
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % messages.length;
      setBubbleText(messages[idx]);
    }, 7000); // Cambia el mensaje cada 7 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        bottom: 24,
        left: 24, // Ubicación en la esquina inferior izquierda (para no tapar otros botones)
        zIndex: 99,
        display: "flex",
        alignItems: "center",
        gap: 12,
        cursor: "pointer",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      onClick={onSelectSpecial}
    >
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, x: -15, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -15, scale: 0.8 }}
            style={{
              background: "rgba(30, 20, 5, 0.95)",
              border: "1px solid var(--bb-orange)",
              padding: "10px 16px",
              borderRadius: "16px 16px 16px 4px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.5), 0 0 15px rgba(255,107,0,0.25)",
              maxWidth: 200,
              fontSize: "0.82rem",
              color: "#fff8ee",
              lineHeight: 1.4,
              fontWeight: 600,
              position: "relative",
            }}
          >
            {bubbleText}
            {/* Pequeño indicador para cerrar la burbuja si molesta */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
              }}
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                background: "none",
                border: "none",
                color: "rgba(255,248,238,0.4)",
                fontSize: "0.7rem",
                cursor: "pointer",
                padding: 2,
              }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emoji con animación de flotación y sombra pulsante de color naranja */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          boxShadow: [
            "0 8px 24px rgba(255,107,0,0.4), 0 0 15px rgba(255,107,0,0.3)",
            "0 8px 28px rgba(255,107,0,0.6), 0 0 25px rgba(255,107,0,0.5)",
            "0 8px 24px rgba(255,107,0,0.4), 0 0 15px rgba(255,107,0,0.3)"
          ]
        }}
        transition={{
          y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
          boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.15, rotate: 8 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #ff6b00, #ffa726)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          position: "relative",
        }}
      >
        🍔
        {/* Anillo de brillo decorativo */}
        <span style={{
          position: "absolute",
          inset: -3,
          borderRadius: "50%",
          border: "2px dashed rgba(255,255,255,0.4)",
          opacity: 0.7,
        }} />
      </motion.div>
    </motion.div>
  );
}

// ── RULETA DEL HAMBRE (WHEEL OF HUNGER) ──────────────────────
// NOTA PARA EDITAR: Este componente crea la ruleta de la suerte.
// - Modifica WHEEL_PRODUCTS si deseas sugerir otros productos.
// - Puedes ajustar el número de vueltas o la animación en spinWheel.
function WheelModal({ onClose, onAdd, triggerConfetti }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelWinner, setWheelWinner] = useState(null);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [accumRotation, setAccumRotation] = useState(0);

  // Seleccionamos 8 productos variados y populares para mostrar en la ruleta
  const WHEEL_PRODUCTS = PRODUCTS.filter(p => ["Clasica", "Bacon", "Completa", "salchipapa", "papascheddar", "hotdog", "alitas6", "arosCebolla"].includes(p.id));

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWheelWinner(null);

    const randomIndex = Math.floor(Math.random() * WHEEL_PRODUCTS.length);
    const sliceAngle = 360 / WHEEL_PRODUCTS.length;

    // Acumulador de rotación para evitar efectos extraños al girar varias veces
    const baseRotation = accumRotation - (accumRotation % 360);
    const newRotation = baseRotation + 360 * 5 + (360 - (randomIndex * sliceAngle + sliceAngle / 2));
    
    setAccumRotation(newRotation);
    setWheelRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWheelWinner(WHEEL_PRODUCTS[randomIndex]);
      triggerConfetti();
    }, 4100); // Duración de la animación en milisegundos
  };

  const gradientSegments = WHEEL_PRODUCTS.map((p, idx) => {
    const angle = 360 / WHEEL_PRODUCTS.length;
    const start = idx * angle;
    const end = (idx + 1) * angle;
    // Intercalamos dos colores temáticos en las rebanadas
    const color = idx % 2 === 0 ? "rgba(255,107,0,0.85)" : "rgba(255,179,0,0.85)";
    return `${color} ${start}deg ${end}deg`;
  }).join(", ");

  return (
    <div className="bb-modal-overlay" onClick={onClose}>
      <motion.div
        className="bb-modal"
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 420, padding: 24, display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 900, margin: 0 }}>🎡 Ruleta del Hambre</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,248,238,0.5)", cursor: "pointer" }}><X size={22} /></button>
        </div>

        <p style={{ fontSize: "0.85rem", color: "rgba(255,248,238,0.6)", textAlign: "center", marginBottom: 24 }}>
          ¿No sabes qué comer hoy? Deja que el destino elija tu menú favorito.
        </p>

        {/* Indicador de flecha en la parte superior */}
        <div style={{ fontSize: "2rem", color: "var(--bb-orange)", transform: "translateY(12px)", zIndex: 10, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>
          ▼
        </div>

        {/* Círculo de la Ruleta */}
        <div style={{ position: "relative", width: 260, height: 260, marginBottom: 24 }}>
          <div
            style={{
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: `conic-gradient(${gradientSegments})`,
              position: "relative",
              border: "6px solid rgba(255,107,0,0.3)",
              boxShadow: "0 0 35px rgba(255,107,0,0.25), inset 0 0 20px rgba(0,0,0,0.5)",
              transform: `rotate(${wheelRotation}deg)`,
              transition: isSpinning ? "transform 4s cubic-bezier(0.1, 0.8, 0.2, 1)" : "none",
            }}
          >
            {WHEEL_PRODUCTS.map((wp, idx) => {
              const angle = 360 / WHEEL_PRODUCTS.length;
              const rotateAngle = idx * angle + angle / 2;
              return (
                <div
                  key={wp.id}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transform: `rotate(${rotateAngle}deg)`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    paddingTop: 22,
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: "0.68rem",
                    textShadow: "0 2px 4px rgba(0,0,0,0.9)",
                    pointerEvents: "none",
                  }}
                >
                  <span style={{ transform: "rotate(90deg) translateX(5px)", display: "inline-block", whiteSpace: "nowrap" }}>
                    {wp.name.replace("Hamburguesa ", "")}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Pin central de la ruleta */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "radial-gradient(circle, #ffd54f, #ff6b00)",
              border: "3px solid #1e1400",
              boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "0.9rem",
              zIndex: 5,
            }}
          >
            🔥
          </div>
        </div>

        {/* Sección de acciones e información del ganador */}
        <div style={{ width: "100%", textAlign: "center" }}>
          {!wheelWinner && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSpinning}
              onClick={spinWheel}
              className="bb-btn bb-btn-primary"
              style={{ width: "80%", padding: "12px", justifyContent: "center" }}
            >
              {isSpinning ? "Girando la suerte..." : "¡GIRAR RULETA! 🎡"}
            </motion.button>
          )}

          {wheelWinner && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: "rgba(255,107,0,0.08)",
                border: "1px solid rgba(255,107,0,0.25)",
                borderRadius: 18,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ fontSize: "0.8rem", color: "var(--bb-orange)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                🎉 ¡Tu menú ideal de hoy!
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", justifyContent: "center" }}>
                <img src={wheelWinner.img} alt={wheelWinner.name} style={{ width: 64, height: 64, borderRadius: 12, objectFit: "cover" }} />
                <div style={{ textAlign: "left" }}>
                  <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 800 }}>{wheelWinner.name}</h4>
                  <span style={{ fontSize: "1rem", fontWeight: 900, color: "var(--bb-orange)", display: "block", marginTop: 2 }}>{fmt(wheelWinner.price)}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, width: "100%", marginTop: 4 }}>
                <button
                  className="bb-btn bb-btn-ghost"
                  onClick={spinWheel}
                  style={{ flex: 1, padding: "10px", fontSize: "0.85rem", justifyContent: "center" }}
                >
                  Girar de nuevo
                </button>
                <button
                  className="bb-btn bb-btn-primary"
                  onClick={() => {
                    onAdd(wheelWinner);
                    onClose();
                  }}
                  style={{ flex: 1, padding: "10px", fontSize: "0.85rem", justifyContent: "center" }}
                >
                  Agregar combo
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
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

  // NUEVAS VARIABLES DE ESTADO PARA RULETA, MÉTODO DE PAGO Y CONFETTI
  const [openWheel, setOpenWheel] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [cashAmount, setCashAmount] = useState("");
  const [confettis, setConfettis] = useState([]);

  // NOTA PARA EDITAR: Callback que se ejecuta al presionar el emoji de hamburguesa flotante.
  // Abre los detalles del producto estrella (id: "Completa", que es la Hamburguesa Completa).
  const handleSelectSpecial = () => {
    const special = PRODUCTS.find(p => p.id === "Completa");
    if (special) {
      setSelected(special);
    }
  };

  // EFECTO DE CONFETI CELEBRATORIO (CONFETTI POP)
  const triggerConfetti = () => {
    const colors = ["#ff6b00", "#ffa726", "#ffd54f", "#ff3d00", "#4caf50", "#00e676", "#29b6f6"];
    const newConfettis = Array.from({ length: 45 }).map((_, i) => ({
      id: Math.random() + "-" + i,
      x: Math.random() * 300 - 150, // dispersión horizontal
      y: Math.random() * -200 - 100, // altura inicial del estallido
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 6,
      rotate: Math.random() * 360,
    }));
    setConfettis(prev => [...prev, ...newConfettis]);
    setTimeout(() => {
      setConfettis(prev => prev.filter(c => !newConfettis.find(nc => nc.id === c.id)));
    }, 2000);
  };

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => { try { const s = localStorage.getItem("bb_cart"); if (s) setCart(JSON.parse(s)); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem("bb_cart", JSON.stringify(cart)); } catch {} }, [cart]);

  // NOTA PARA EDITAR: Función unificada de añadir productos al carrito.
  // Admite cantidad, adicionales (extras) y exclusiones (removals).
  // Genera una clave única en base a las opciones seleccionadas para agruparlas de forma independiente.
  const add = (p, qty = 1, extras = [], removals = []) => {
    const extrasKey = extras.map(e => e.name).sort().join(",");
    const removalsKey = removals.sort().join(",");
    const key = `${p.id}-${extrasKey}-${removalsKey}`;
    const calculatedPrice = p.price + extras.reduce((sum, e) => sum + e.price, 0);

    setCart(prev => {
      const existing = prev[key];
      return {
        ...prev,
        [key]: {
          qty: (existing?.qty || 0) + qty,
          product: {
            ...p,
            baseId: p.id,
            price: calculatedPrice,
            customExtras: extras,
            customRemovals: removals,
          }
        }
      };
    });
    // Dispara el confeti al agregar
    triggerConfetti();
  };

  const inc = (key) => setCart(prev => ({ ...prev, [key]: { ...prev[key], qty: prev[key].qty + 1 } }));
  const dec = (key) => setCart(prev => {
    if (!prev[key]) return prev;
    if (prev[key].qty <= 1) { const { [key]: _, ...rest } = prev; return rest; }
    return { ...prev, [key]: { ...prev[key], qty: prev[key].qty - 1 } };
  });
  const remove = (key) => setCart(prev => { const { [key]: _, ...rest } = prev; return rest; });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(p => (cat === "todos" || p.category === cat) && (!q || `${p.name} ${p.desc}`.toLowerCase().includes(q)));
  }, [query, cat]);

  // Se mapea la clave del objeto para facilitar el manejo en bucles
  const items = useMemo(() => Object.entries(cart).map(([k, val]) => ({ key: k, ...val })), [cart]);
  const subtotal = useMemo(() => items.reduce((s, it) => s + it.qty * it.product.price, 0), [items]);
  const totalItems = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);

  // Mensaje final dinámico de WhatsApp configurado según el total de la orden, método de pago y vuelto
  const waText = useMemo(() => {
    const itemsText = items.map(i => {
      let details = "";
      if (i.product.customExtras?.length > 0) {
        details += ` (+ ${i.product.customExtras.map(e => e.name).join(", ")})`;
      }
      if (i.product.customRemovals?.length > 0) {
        details += ` (${i.product.customRemovals.join(", ")})`;
      }
      return `- ${i.qty}x ${i.product.name}${details} (${fmt(i.product.price)})`;
    }).join("\n");

    let paymentText = `\n- Método de Pago: `;
    if (paymentMethod === "efectivo") {
      paymentText += "Efectivo 💵";
      const paid = parseFloat(cashAmount);
      if (!isNaN(paid) && paid > subtotal) {
        paymentText += ` (Paga con: ${fmt(paid)} - Vuelto: ${fmt(paid - subtotal)})`;
      }
    } else {
      paymentText += "Transferencia 📱 (Se adjuntará comprobante)";
    }

    return encodeURIComponent(`Hola Billy Burgers! Quiero hacer este pedido:\n\n${itemsText}\n${paymentText}\n\nTotal: ${fmt(subtotal)}`);
  }, [items, subtotal, paymentMethod, cashAmount]);

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
            {/* TÍTULO HERO - MODIFICADO SEGÚN SOLICITUD DEL USUARIO */}
            {/* NOTA PARA EDITAR: Aquí se muestra el título principal de la página */}
            <h1 className="bb-hero-title">
              Tu hamburguesa favorita,<br />
              <span className="bb-hero-gradient">siempre con papas.</span>
            </h1>
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

        {/* STATS ELIMINADOS SEGÚN SOLICITUD */}
        {/* NOTA PARA EDITAR: Si en el futuro deseas recuperar las estadísticas (14+ Productos, 4.9 Calidad, etc.), puedes reinsertar aquí la sección div de stats */}

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

          {/* BOTÓN LANZADOR DE LA RULETA DEL HAMBRE - AGREGADO SEGÚN SOLICITUD */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenWheel(true)}
              style={{
                background: "linear-gradient(135deg, rgba(255,107,0,0.15), rgba(255,213,79,0.08))",
                border: "1px solid rgba(255,107,0,0.45)",
                borderRadius: 999,
                padding: "10px 24px",
                color: "#ffd54f",
                fontSize: "0.88rem",
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 4px 20px rgba(255,107,0,0.15)"
              }}
            >
              <span>🎡</span> ¿No sabes qué pedir? ¡Gira la Ruleta del Hambre!
            </motion.button>
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
                    {/* NOTA DE RENDIMIENTO: loading="lazy" es crucial para móviles, hace que las imágenes carguen conforme el usuario baja en el menú */}
                    <img src={p.img} alt={p.name} loading="lazy" style={{ height: 210, objectFit: "cover", width: "100%" }} />
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
                    {items.map(({ key, product, qty }) => (
                      <motion.div key={key} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} className="bb-cart-item">
                        {/* loading="lazy" para las imágenes pequeñas del carrito */}
                        <img src={product.img} alt={product.name} loading="lazy" style={{ width: 60, height: 60, borderRadius: 12, objectFit: "cover" }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.9rem" }}>{product.name}</p>
                          {/* Muestra los adicionales seleccionados */}
                          {product.customExtras?.length > 0 && (
                            <div style={{ fontSize: "0.72rem", color: "var(--bb-orange)", marginTop: 2, lineHeight: 1.2 }}>
                              + {product.customExtras.map(e => e.name).join(", ")}
                            </div>
                          )}
                          {/* Muestra las exclusiones seleccionadas */}
                          {product.customRemovals?.length > 0 && (
                            <div style={{ fontSize: "0.72rem", color: "rgba(255,248,238,0.4)", marginTop: 2, lineHeight: 1.2 }}>
                              {product.customRemovals.join(", ")}
                            </div>
                          )}
                          <p style={{ margin: "3px 0 0", fontSize: "0.8rem", color: "rgba(255,248,238,0.5)" }}>{fmt(product.price * qty)}</p>
                        </div>
                        <QtyCtrl value={qty} onInc={() => inc(key)} onDec={() => dec(key)} />
                        <motion.button whileHover={{ scale: 1.1 }} onClick={() => remove(key)}
                          style={{ background: "rgba(255,61,0,0.12)", border: "1px solid rgba(255,61,0,0.25)", borderRadius: 8, padding: 7, color: "#ff6b6b", cursor: "pointer" }}>
                          <Trash2 size={14} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              <div style={{ borderTop: "1px solid rgba(255,107,0,0.15)", paddingTop: 16, marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                {/* MÉTODO DE PAGO Y VUELTO - AGREGADO SEGÚN SOLICITUD */}
                {items.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "rgba(255,248,238,0.85)" }}>Método de Pago:</span>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button 
                        onClick={() => setPaymentMethod("efectivo")}
                        style={{
                          flex: 1,
                          padding: "8px 10px",
                          borderRadius: 10,
                          border: paymentMethod === "efectivo" ? "1px solid var(--bb-orange)" : "1px solid rgba(255,248,238,0.1)",
                          background: paymentMethod === "efectivo" ? "rgba(255,107,0,0.12)" : "rgba(0,0,0,0.2)",
                          color: paymentMethod === "efectivo" ? "#fff" : "rgba(255,248,238,0.6)",
                          cursor: "pointer",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          transition: "all 0.2s"
                        }}
                      >
                        💵 Efectivo
                      </button>
                      <button 
                        onClick={() => setPaymentMethod("transferencia")}
                        style={{
                          flex: 1,
                          padding: "8px 10px",
                          borderRadius: 10,
                          border: paymentMethod === "transferencia" ? "1px solid var(--bb-orange)" : "1px solid rgba(255,248,238,0.1)",
                          background: paymentMethod === "transferencia" ? "rgba(255,107,0,0.12)" : "rgba(0,0,0,0.2)",
                          color: paymentMethod === "transferencia" ? "#fff" : "rgba(255,248,238,0.6)",
                          cursor: "pointer",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          transition: "all 0.2s"
                        }}
                      >
                        📱 Transferencia
                      </button>
                    </div>

                    {paymentMethod === "efectivo" && (
                      <div style={{ marginTop: 4, background: "rgba(255,107,0,0.05)", border: "1px solid rgba(255,107,0,0.15)", borderRadius: 12, padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                        <label style={{ fontSize: "0.72rem", color: "rgba(255,248,238,0.65)", fontWeight: 600 }}>¿Con cuánto vas a pagar?</label>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ color: "var(--bb-orange)", fontWeight: 700, fontSize: "0.85rem" }}>$</span>
                          <input 
                            type="number" 
                            step="0.01"
                            placeholder="Ej: 10.00"
                            value={cashAmount} 
                            onChange={(e) => setCashAmount(e.target.value)}
                            style={{
                              background: "rgba(0,0,0,0.35)",
                              border: "1px solid rgba(255,107,0,0.25)",
                              borderRadius: 6,
                              padding: "5px 8px",
                              color: "#fff",
                              fontSize: "0.8rem",
                              width: "90px",
                              outline: "none",
                            }}
                          />
                        </div>
                        {parseFloat(cashAmount) > subtotal && (
                          <div style={{ fontSize: "0.78rem", color: "#4caf50", fontWeight: 700 }}>
                            Su vuelto: {fmt(parseFloat(cashAmount) - subtotal)}
                          </div>
                        )}
                        {parseFloat(cashAmount) <= subtotal && cashAmount !== "" && (
                          <div style={{ fontSize: "0.7rem", color: "#ff6b6b", fontWeight: 700 }}>
                            Debe ser mayor al total ({fmt(subtotal)}).
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "rgba(255,248,238,0.6)", borderTop: "1px solid rgba(255,248,238,0.08)", paddingTop: 8 }}>
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

      {/* RULETA DEL HAMBRE MODAL */}
      <AnimatePresence>
        {openWheel && (
          <WheelModal 
            onClose={() => setOpenWheel(false)} 
            onAdd={add} 
            triggerConfetti={triggerConfetti} 
          />
        )}
      </AnimatePresence>

      {/* MASCOTA FLOTANTE INTERACTIVA - AGREGADO SEGÚN SOLICITUD */}
      <FloatingMascot onSelectSpecial={handleSelectSpecial} />

      {/* EFECTO DE CONFETI CELEBRATORIO (CONFETTI POP) - AGREGADO SEGÚN SOLICITUD */}
      {confettis.map(c => (
        <motion.div
          key={c.id}
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            width: c.size,
            height: c.size,
            background: c.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            zIndex: 9999,
            pointerEvents: "none"
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: c.x * 2.5,
            y: [c.y, c.y * 1.5, window.innerHeight * 0.75],
            opacity: [1, 1, 0],
            rotate: c.rotate + 720
          }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
