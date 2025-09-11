import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
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
  { id: "papasfritas", label: "Papas" },
  { id: "alitas", label: "Alitas" },
  //{ id: "papas", label: "Papas con tocino" },
  { id: "extras", label: "Extras" },
];

const PRODUCTS = [
  {
    id: "Clasica",
    name: "Hamburguesa Clasica",
    desc: "Pan de finas hierbas + Carne + queso cheddar + salsa de tomate + mayonesa + lechuga + tomate + porción de papas.",
    price: 3,
    category: "hamburguesas",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1400&auto=format&fit=crop",
    badges: [],
  },
  {
    id: "Bacon",
    name: "Hamburguesa Bacon",
    desc: "Pan de queso con orégano + carne + tocino + lechuga + tomate + mayonesa + salsa de tomate + lamina de mozzarella + huevo + porción de papas.",
    price: 4,
    category: "hamburguesas",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1400&auto=format&fit=crop",
    badges: [],
  },
  {
    id: "Completa",
    name: "Hamburguesa Completa",
    desc: "Pan de queso con orégano + doble carne + doble tocino + cheddar liquido + dos laminas de mozzarella + huevo + porción de papas.",
    price: 5,
    category: "hamburguesas",
    img: "/i/hamburguesa completa.png",
    badges: ["Más vendido"],
  },
  {
    id: "salchipapa",
    name: "Salchipapa",
    desc: "Papas fritas + paprika + salchichas + salsa de tomate + mayonesa y queso cheddar.",
    price: 3,
    category: "papasfritas",
    img: "/i/salchipapa.jpg",
    badges: [],
  },
  {
    id: "papas cheddar",
    name: "Papas cheddar",
    desc: "Papas fritas + paprika + queso cheddar y papitas trituradas",
    price: 2.5,
    category: "papasfritas",
    img: "/i/papascheddar.jpg",
    badges: [],
  },
  {
    id: "salchipapa con tocino",
    name: "Salchipapa con Tocino",
    desc: "Papas fritas + paprika + salchichas + tocino + salsa de tomate + mayonesa y queso cheddar",
    price: 3.5,
    category: "papasfritas",
    img: "/i/salchipapatocino.jpg",
    badges: [],
  },
  {
    id: "papaschili",
    name: "Papas chili",
    desc: "Papas fritas + paprika + chili + jalapeño + cheddar",
    price: 3.5,
    category: "papasfritas",
    img: "/i/papas chili.jpg",
    badges: [],
  },
  {
    id: "papasmix",
    name: "Papas mix",
    desc: "Papas fritas + paprika + salchichas + chili + jalapeño + mayonesa + salsa de tomate + cheddar",
    price: 4,
    category: "papasfritas",
    img: "/i/papas mix1.jpg",
    badges: [],
  },
  {
    id: "hotdog",
    name: "Hot Dog",
    desc: "Pan de hot dog + Salchicha + Tocino + Queso mozzarella + cheddar + Porción de papas",
    price: 2.5,
    category: "extras",
    img: "/i/hotdog.jpg",
    badges: [],
  },
  {
    id: "nachos",
    name: "Nachos con chili ",
    desc: "Nachos + Chili + Jalapeños + cheddar",
    price: 4,
    category: "extras",
    img: "/i/nachos con chili.jpg",
    badges: [],
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
    id: "alitas6",
    name: "Alitas x 6",
    desc: "6 alitas con salsa BBQ o Honey mustard",
    price: 5,
    category: "alitas",
    img: "/i/alitasx6.jpg",
    badges: [],
  },
  {
    id: "alitas12",
    name: "Alitas x 12",
    desc: "12 alitas con salsa BBQ o Honey mustard",
    price: 8,
    category: "alitas",
    img: "/i/alitasx12.jpg",
    badges: [],
  },
  {
    id: "alitas24",
    name: "Alitas x 24",
    desc: "24 alitas con salsa BBQ o Honey mustard",
    price: 15,
    category: "alitas",
    img: "/i/alitasx24.jpg",
    badges: [],
  },
];

// ==========================
// Utilidades
// ==========================
const currency = (n) => `$${n.toFixed(2)}`;

// ==========================
// Componentes UI
// ==========================
function Badge({ children }) {
  return (
    <motion.span
      whileHover={{ scale: 1.1 }}
      className="text-xs rounded-full bg-black/10 px-2 py-1 backdrop-blur border border-black/10"
    >
      {children}
    </motion.span>
  );
}

function CategoryPill({ active, label, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm transition-all border flex items-center gap-2 ${
          active
            ? "bg-black text-white border-transparent shadow"
            : "bg-white/70 hover:bg-white border-black/10"
        }
      `}
    >
      <Filter className="w-4 h-4" /> {label}
    </motion.button>
  );
}

function Qty({ value, inc, dec }) {
  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={dec}
        className="p-2 rounded-full bg-black/5 transition"
      >
        <Minus className="w-4 h-4" />
      </motion.button>
      <span className="w-6 text-center font-semibold">{value}</span>
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={inc}
        className="p-2 rounded-full bg-black/5 transition"
      >
        <Plus className="w-4 h-4" />
      </motion.button>
    </div>
  );
}

// ==========================
// Modal de detalles
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
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-white shadow-2xl border border-black/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-red-800 hover:text-red-400"
          onClick={onClose}
        >
          <X size={35} />
        </button>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={product.img}
          alt={product.name}
          className="w-full h-80 object-cover"
        />
        <div className="p-5">
          <h2 className="text-3xl font-black">{product.name}</h2>
          <p className="mt-2 text-lg opacity-100">{product.desc}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-2xl font-black text-orange-600">
              {currency(product.price)}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                onAdd(product);
                onClose();
              }}
              className="px-6 py-3 rounded-xl bg-black text-white flex items-center gap-2 shadow hover:translate-y-[-1px] transition"
            >
              <ShoppingCart className="w-5 h-5" /> Añadir al carrito
            </motion.button>
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
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("todos");
  const [cart, setCart] = useState({});
  const [openCart, setOpenCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ==========================
  // Funciones carrito
  // ==========================
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
      if (!prev[id]) return prev;
      if (prev[id].qty <= 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      } else {
        return {
          ...prev,
          [id]: { ...prev[id], qty: prev[id].qty - 1 },
        };
      }
    });

  const remove = (id) =>
    setCart((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });

  // ==========================
  // Filtros
  // ==========================
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (cat === "todos" || p.category === cat) &&
        (!q || `${p.name} ${p.desc}`.toLowerCase().includes(q))
    );
  }, [query, cat]);

  const items = Object.values(cart);
  const subtotal = items.reduce((s, it) => s + it.qty * it.product.price, 0);
  const totalItems = items.reduce((sum, it) => sum + it.qty, 0);
  const delivery = subtotal > 0 ? 0 : 0;
  const total = subtotal + delivery;

  const whatsappText = encodeURIComponent(
    `Hola Billy Burgers! Quiero hacer este pedido:\n\n${items
      .map(
        (i) => `• ${i.qty} x ${i.product.name} (${currency(i.product.price)})`
      )
      .join("\n")}\n\nTotal: ${currency(total)}`
  );
  const whatsappLink = `https://wa.me/593984097456?text=${whatsappText}`;

  // ==========================
  // Render
  // ==========================
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 text-neutral-900 font-sans">
      {/* Barra superior */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <Sparkles className="w-7 h-7" />
          <h1 className="text-xl font-extrabold tracking-tight">
            Billy Burger
          </h1>

          {/* Enlace a TikTok */}
          <motion.a
            whileHover={{ scale: 1.1, rotate: -5 }}
            href="https://www.tiktok.com/@burgerlovers_12?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noreferrer"
            className="ml-4 px-3 py-2 rounded-xl bg-red-500 text-white shadow font-semibold"
          >
            Síguenos en TikTok
          </motion.a>

          <div className="ml-auto flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setOpenCart(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black text-white shadow"
            >
              <ShoppingCart className="w-7 h-7" /> Carrito ({totalItems})
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-7 grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              <span className="text-orange-600">
                La combinación perfecta: Hamburguesa con papas.
              </span>
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#menu"
                className="px-5 py-3 rounded-xl bg-black text-white shadow"
              >
                Ver menú
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl border border-black/10 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> Ordenar por WhatsApp
              </motion.a>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Guayaquil - Pancho Jacome
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> Jueves a Domingo de 18:30 – 22:00
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-sm mx-auto"
          >
            <img
              src="/logo_billy_burgerss.png"
              alt="Logo de Billy Burger"
              lassName="rounded-full shadow-2xl border border-black/10 dark:border-white/100 w-full aspect-square object-fill"
            />
          </motion.div>
        </div>
      </section>

      {/* Buscador y categorías */}
      <section id="menu" className="max-w-7xl mx-auto px-4 py-0.10">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="flex items-center gap-2 flex-1 px-4 py-3 rounded-2xl border border-black/10 bg-white/70">
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-3xl overflow-hidden border border-black/10 bg-white/70 backdrop-blur shadow hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] cursor-pointer"
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
                <div className="p-5 ">
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
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        add(p);
                      }}
                      className="px-5 py-3 rounded-xl bg-black text-white flex items-center gap-2 shadow hover:translate-y-[-1px] transition"
                    >
                      <ShoppingCart className="w-4 h-4" /> Añadir
                    </motion.button>
                    <button
                      href="#"
                      className="text-sm opacity-70 inline-flex items-center gap-1"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedProduct(p);
                      }}
                    >
                      Detalles <ChevronRight className="w-9 h-9" />
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
              className="ml-auto w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">Tu carrito</h2>
                <button
                  onClick={() => setOpenCart(false)}
                  className="p-2 rounded-full hover:bg-black/5 transition"
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
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex items-center gap-4 border border-black/10 rounded-2xl p-3 bg-white"
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
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => remove(product.id)}
                        className="p-2 rounded-full bg-black/5 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="border-t border-black/10 pt-4 space-y-2 text-sm mt-6">
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
                  } bg-black text-white shadow`}
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
