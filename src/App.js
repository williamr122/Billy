import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Moon,
  Sun,
  Sparkles,
  Phone,
  MapPin,
  Clock,
  Filter,
  Minus,
  Plus,
  Trash2,
  ChevronRight,
  X,
} from "lucide-react";

// ==========================
// Datos del restaurante
// ==========================
const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "hamburguesas", label: "Hamburguesas" },
  { id: "salchipapas", label: "Salchipapas" },
  { id: "papas", label: "Papas con tocino" },
  //  { id: "combos", label: "Combos" },
  //  { id: "bebidas", label: "Bebidas" },
  { id: "extras", label: "Extras" },
];

const PRODUCTS = [
  {
    id: "Clasica",
    name: "Hamburguesa Clasica",
    desc: "Pan de finas hierbas, Carne 100g, queso cheddar, salsa de tomate, mayonesa, lechuga, tomate, y porción de papas.",
    price: 3,
    category: "hamburguesas",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1400&auto=format&fit=crop",
    badges: ["TOP", "Salsa secreta"],
  },
  {
    id: "Bacon",
    name: "Hamburguesa Bacon",
    desc: "Pan de oregano con queso, Doble queso, tocino crujiente y mayonesa ahumada en pan brioche.",
    price: 4,
    category: "hamburguesas",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1400&auto=format&fit=crop",
    badges: ["Más vendido"],
  },
  {
    id: "Completa",
    name: "Hamburguesa Completa",
    desc: "Pan de finas hierbas + carne + lechuga + tomate + mayonesa + salsa de tomate + lamina de cheddar y porción de papas.",
    price: 5,
    category: "hamburguesas",
    img: "/i/hamburguesa completa.png",
    badges: ["Picante"],
  },
  {
    id: "salchipapa",
    name: "Salchipapa",
    desc: "Papas fritas + paprika + salchichas + salsa de tomate + mayonesa y queso cheddar.",
    price: 4.5,
    category: "salchipapas",
    img: "https://images.unsplash.com/photo-1616486886892-8de9a54b322c?q=80&w=1400&auto=format&fit=crop",
    badges: ["Porción generosa"],
  },
  {
    id: "papas cheddar",
    name: "Papas cheddar",
    desc: "Papas fritas + paprika + queso cheddar y papitas trituradas",
    price: 2.5,
    category: "salchipapas",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1400&auto=format&fit=crop",
    badges: ["Recomendado"],
  },
  {
    id: "salchipapa con tocino",
    name: "Salchipapa con Tocino",
    desc: "Papas fritas + paprika + salchichas + tocino + salsa de tomate + mayonesa y queso cheddar",
    price: 3.5,
    category: "papas",
    img: "https://images.unsplash.com/photo-1550547660-1f62116f7a14?q=80&w=1400&auto=format&fit=crop",
    badges: ["Crocantes"],
  },
  {
    id: "bb-combo-1",
    name: "Combo Billy #1",
    desc: "Classic Burger + Papas + Bebida 12oz.",
    price: 8.9,
    category: "combos",
    img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1400&auto=format&fit=crop",
    badges: ["Ahorra"],
  },
  {
    id: "bb-combo-2",
    name: "Combo Bacon",
    desc: "Bacon Lover + Papas con tocino + Bebida 16oz.",
    price: 10.9,
    category: "combos",
    img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1400&auto=format&fit=crop",
    badges: ["Popular"],
  },
  {
    id: "bb-soda",
    name: "Soda 12oz",
    desc: "Coca-Cola | Sprite | Fanta",
    price: 1.5,
    category: "bebidas",
    img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1400&auto=format&fit=crop",
    badges: [],
  },
  {
    id: "bb-limonada",
    name: "Limonada Frost",
    desc: "Limonada natural con un toque de menta.",
    price: 2.2,
    category: "bebidas",
    img: "https://images.unsplash.com/photo-1582456891925-7c8b1ae5cda3?q=80&w=1400&auto=format&fit=crop",
    badges: ["Refrescante"],
  },
  {
    id: "aros cebolla",
    name: "Aros de cebolla",
    desc: "8 Aros de cebolla + salsa BBQ + porcion de papas.",
    price: 2.5,
    category: "extras",
    img: "/i/Aros de cebolla.jpg",
    badges: [],
  },
  {
    id: "bb-nuggets",
    name: "Chicken Nuggets (6)",
    desc: "Bocados de pollo con salsa BBQ.",
    price: 3.6,
    category: "extras",
    img: "https://images.unsplash.com/photo-1608039829572-78524f93b4e7?q=80&w=1400&auto=format&fit=crop",
    badges: [],
  },
];

// ==========================
// Utilidades
// ==========================
const currency = (n) => `$${n.toFixed(2)}`;

const useDarkMode = () => {
  const [dark, setDark] = useState(true);
  React.useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return { dark, setDark };
};

// ==========================
// Componentes UI
// ==========================
function Badge({ children }) {
  return (
    <span className="text-xs rounded-full bg-black/10 dark:bg-white/10 px-2 py-1 backdrop-blur border border-black/10 dark:border-white/10">
      {children}
    </span>
  );
}

function CategoryPill({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm transition-all border flex items-center gap-2 ${
          active
            ? "bg-black text-white dark:bg-white dark:text-black border-transparent shadow"
            : "bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border-black/10 dark:border-white/10"
        }
      `}
    >
      <Filter className="w-4 h-4" /> {label}
    </button>
  );
}

function Qty({ value, inc, dec }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={dec}
        className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:scale-105 transition"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-6 text-center font-semibold">{value}</span>
      <button
        onClick={inc}
        className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:scale-105 transition"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

// ==========================
// Nuevo componente para el modal de detalles
// ==========================
function ProductDetailsModal({ product, onClose, onAdd }) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-white dark:bg-neutral-950 shadow-2xl border border-black/10 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-3xl font-black">{product.name}</h2>
          <p className="mt-2 text-lg opacity-80">{product.desc}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-2xl font-black text-orange-600 dark:text-amber-400">
              {currency(product.price)}
            </div>
            <button
              onClick={() => {
                onAdd(product);
                onClose();
              }}
              className="px-6 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center gap-2 shadow hover:translate-y-[-1px] transition"
            >
              <ShoppingCart className="w-5 h-5" /> Añadir al carrito
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ==========================
// App principal
// ==========================
export default function App() {
  const { dark, setDark } = useDarkMode();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("todos");
  const [cart, setCart] = useState({}); // {id: {qty, product}}
  const [openCart, setOpenCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Nuevo estado para el modal de detalles

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (cat === "todos" || p.category === cat) &&
        (!q || `${p.name} ${p.desc}`.toLowerCase().includes(q))
    );
  }, [query, cat]);

  const add = (p) =>
    setCart((prev) => {
      const cur = prev[p.id]?.qty || 0;
      return { ...prev, [p.id]: { qty: cur + 1, product: p } };
    });
  const inc = (id) =>
    setCart((prev) => ({
      ...prev,
      [id]: { ...prev[id], qty: prev[id].qty + 1 },
    }));
  const dec = (id) =>
    setCart((prev) => {
      const nxt = { ...prev };
      if (!nxt[id]) return prev;
      if (nxt[id].qty <= 1) delete nxt[id];
      else nxt[id].qty -= 1;
      return nxt;
    });
  const remove = (id) =>
    setCart((prev) => {
      const n = { ...prev };
      delete n[id];
      return n;
    });

  const items = Object.values(cart);
  const subtotal = items.reduce((s, it) => s + it.qty * it.product.price, 0);
  const delivery = subtotal > 0 ? 1.2 : 0;
  const total = subtotal + delivery;

  const whatsappText = encodeURIComponent(
    `Hola Billy Burgers! Quiero hacer este pedido:\n\n${items
      .map(
        (i) => `• ${i.qty} x ${i.product.name} (${currency(i.product.price)})`
      )
      .join("\n")}\n\nTotal: ${currency(total)}`
  );
  const whatsappLink = `https://wa.me/593984097456?text=${whatsappText}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-100 font-sans">
      {/* Barra superior */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <Sparkles className="w-6 h-6" />
          <h1 className="text-xl font-extrabold tracking-tight">
            Billy Burger
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-xl border border-black/10 dark:border-white/10 hover:scale-105 transition"
              aria-label="Cambiar tema"
            >
              {dark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setOpenCart(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black shadow"
            >
              <ShoppingCart className="w-5 h-5" /> Carrito ({items.length})
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-black leading-tight"
            >
              <span className="text-orange-600 dark:text-amber-400">
                La combinación perfecta: Hamburguesa con papas.
              </span>
            </motion.h2>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#menu"
                className="px-5 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black shadow"
              >
                Ver menú
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl border border-black/10 dark:border-white/10 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> Ordenar por WhatsApp
              </a>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Guayaquil · Pancho Jacome
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> 18:30 – 22:00
              </div>
            </div>
          </div>
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-sm mx-auto"
          >
            <img
              src="/logo_billy_burgers.png"
              alt="Logo de Billy Burger"
              lassName="rounded-full shadow-2xl border border-black/10 dark:border-white/100 w-full aspect-square object-fill"
            />
          </motion.div>
        </div>
      </section>

      {/* Buscador y categorías */}
      <section id="menu" className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="flex items-center gap-2 flex-1 px-4 py-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5">
            <Search className="w-5 h-5 opacity-70" />
            <input
              placeholder="Buscar en el menú..."
              className="bg-transparent outline-none flex-1"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((c) => (
              <CategoryPill
                key={c.id}
                active={cat === c.id}
                label={c.label}
                onClick={() => setCat(c.id)}
              />
            ))}
          </div>
        </div>

        {/* Grid de productos */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((p) => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur shadow hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                onClick={() => setSelectedProduct(p)}
              >
                <div className="relative">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-52 w-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {p.badges.map((b, i) => (
                      <Badge key={i}>{b}</Badge>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-extrabold leading-snug">
                        {p.name}
                      </h3>
                      <p className="text-sm opacity-80 mt-1">{p.desc}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black">
                        {currency(p.price)}
                      </div>
                      <div className="text-xs opacity-60">IVA incl.</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        add(p);
                      }}
                      className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center gap-2 shadow hover:translate-y-[-1px] transition"
                    >
                      <ShoppingCart className="w-4 h-4" /> Añadir
                    </button>
                    <button
                      href="#"
                      className="text-sm opacity-70 inline-flex items-center gap-1"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedProduct(p);
                      }}
                    >
                      Detalles <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-8 text-center text-sm opacity-70">
        © 2024 Billy Burger. Todos los derechos reservados.
      </footer>

      {/* Modal de detalles */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAdd={add}
          />
        )}
      </AnimatePresence>

      {/* Carrito */}
      <AnimatePresence>
        {openCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 overflow-hidden flex"
            onClick={() => setOpenCart(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="ml-auto w-full max-w-md bg-white dark:bg-neutral-950 h-full shadow-2xl p-6 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">Tu carrito</h2>
                <button
                  onClick={() => setOpenCart(false)}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition"
                  aria-label="Cerrar carrito"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingCart className="w-16 h-16 mb-4" />
                  <p>Tu carrito está vacío.</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-4">
                  {items.map(({ product, qty }) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 border border-black/10 dark:border-white/10 rounded-2xl p-3 bg-white dark:bg-neutral-900"
                    >
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm opacity-70">
                          {currency(product.price * qty)}
                        </p>
                      </div>
                      <Qty
                        value={qty}
                        inc={() => inc(product.id)}
                        dec={() => dec(product.id)}
                      />
                      <button
                        onClick={() => remove(product.id)}
                        className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:scale-105 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-black/10 dark:border-white/10 pt-4 space-y-2 text-sm mt-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{currency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>{currency(delivery)}</span>
                </div>
                <div className="flex justify-between font-black text-lg mt-2">
                  <span>Total</span>
                  <span>{currency(total)}</span>
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-4 block text-center px-4 py-3 rounded-xl ${
                    items.length === 0 ? "opacity-50 pointer-events-none" : ""
                  } bg-black text-white dark:bg-white dark:text-black shadow`}
                >
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
