import { useState, useEffect, useRef } from 'react';

/* ─────────────── GALLERY DATA ─────────────── */
const GALLERY_ITEMS = [
  { id: 1, src: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop', alt: 'Margherita Pizza', featured: true },
  { id: 2, src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', alt: 'Beef Burger' },
  { id: 3, src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop', alt: 'BBQ Chicken Pizza' },
  { id: 4, src: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=300&fit=crop', alt: 'Jollof Rice' },
  { id: 5, src: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop', alt: 'Club Sandwich' },
  { id: 6, src: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop', alt: 'Pepperoni Supreme' },
  { id: 7, src: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop', alt: 'Chicken Shawarma' },
  { id: 8, src: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&h=300&fit=crop', alt: 'Mango Sunset Mocktail' },
  { id: 9, src: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&h=300&fit=crop', alt: 'Belgian Waffles' },
  { id: 10, src: 'https://images.unsplash.com/photo-1585109649979-45e0c56182bd?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1585109649979-45e0c56182bd?w=400&h=300&fit=crop', alt: 'Loaded Cheese Fries' },
  { id: 11, src: 'https://images.unsplash.com/photo-1552611052-33e04de1b100?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1552611052-33e04de1b100?w=400&h=300&fit=crop', alt: 'Spicy Beef Noodles' },
  { id: 12, src: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&h=300&fit=crop', alt: 'Waakye Special' },
];

/* ─────────────── REVIEWS DATA ─────────────── */
const REVIEWS = [
  {
    id: 1,
    name: 'Kwame A.',
    rating: 5,
    text: 'Best pizza in Kasoa. Fast delivery and amazing taste. The family size is perfect for our household.',
    location: 'Kasoa',
  },
  {
    id: 2,
    name: 'Ama D.',
    rating: 5,
    text: 'Very smooth ordering experience and fresh food every time. My go-to spot for weekend treats!',
    location: 'Sakumono',
  },
  {
    id: 3,
    name: 'Nana K.',
    rating: 4,
    text: 'Their drive-through service is super convenient. I love that I can grab my order without leaving my car.',
    location: 'Awutu',
  },
  {
    id: 4,
    name: 'Abena M.',
    rating: 5,
    text: "The loaded fries are absolutely fire 🔥 Great portions, great prices. Daddy's never disappoints!",
    location: 'Kasoa',
  },
  {
    id: 5,
    name: 'Kojo B.',
    rating: 4,
    text: 'Best shawarma in the area. The garlic sauce is amazing. Ordering via WhatsApp is so convenient.',
    location: 'Weija',
  },
  {
    id: 6,
    name: 'Efua S.',
    rating: 5,
    text: 'Ordered for a birthday party. Everything was hot, fresh, and delicious. Will definitely order again!',
    location: 'Kasoa',
  },
];

/* ─────────────── TRUST BADGES DATA ─────────────── */
const TRUST_BADGES = [
  { icon: '⭐', label: '4.2★ Rated', sub: 'Across 2,000+ reviews' },
  { icon: '🚚', label: 'Fast Delivery', sub: 'Across Kasoa' },
  { icon: '🚗', label: 'Drive-through', sub: 'Quick collection' },
  { icon: '📦', label: 'No-contact', sub: 'Safe delivery' },
  { icon: '📱', label: 'MTN MoMo Ready', sub: 'Pay instantly' },
  { icon: '🍕', label: 'Fresh Daily', sub: 'Made to order' },
];

/* ─────────────── COUNTER DATA ─────────────── */
const COUNTERS = [
  { value: 5000, suffix: '+', label: 'Orders Served', icon: '🍕' },
  { value: 4.2, suffix: '★', label: 'Customer Rating', icon: '⭐' },
  { value: 15, suffix: 'min', label: 'Avg. Delivery', icon: '🚚' },
];

/* ─────────────── HOOKS ─────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCounter(target: number, duration = 2000, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

/* ─────────────── CAROUSEL ─────────────── */
function FeaturedCarousel() {
  const [current, setCurrent] = useState(0);
  const featured = GALLERY_ITEMS.filter((i) => i.featured).concat(GALLERY_ITEMS.slice(0, 4));

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % featured.length), 4000);
    return () => clearInterval(t);
  }, [featured.length]);

  return (
    <div className="relative mb-12">
      <div className="relative h-[300px] sm:h-[380px] md:h-[450px] rounded-2xl overflow-hidden">
        {featured.map((item, i) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-orange-400 text-sm font-semibold tracking-wider uppercase mb-1">Featured</p>
              <h3 className="text-white text-2xl sm:text-3xl font-bold">{item.alt}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-8 bg-red-500' : 'w-1.5 bg-white/20'}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── GALLERY GRID ─────────────── */
function GalleryGrid() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { ref, visible } = useReveal(0.05);

  return (
    <>
      <div
        ref={ref}
        className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {GALLERY_ITEMS.map((item, i) => (
          <div
            key={item.id}
            onClick={() => setLightbox(i)}
            className={`relative overflow-hidden rounded-xl cursor-pointer group transition-all duration-500 hover:-translate-y-1 ${
              i === 0 ? 'col-span-2 row-span-2' : ''
            } ${i === 3 ? 'col-span-2' : ''} ${i === 8 ? 'col-span-2 sm:col-span-1' : ''}`}
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <img
              src={item.thumb}
              alt={item.alt}
              loading="lazy"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/400x300/1a1a1a/dc2626?text=${encodeURIComponent(item.alt)}`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3">
              <span className="text-white text-sm font-semibold">{item.alt}</span>
            </div>
            <div className="absolute inset-0 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-shadow duration-500 rounded-xl"></div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-red-600/80 transition-all duration-300"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            className="absolute left-4 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-red-600/80 transition-all duration-300 hidden sm:flex"
            onClick={(e) => { e.stopPropagation(); setLightbox((prev) => (prev! - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length); }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <img
            src={GALLERY_ITEMS[lightbox].src}
            alt={GALLERY_ITEMS[lightbox].alt}
            className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-red-600/80 transition-all duration-300 hidden sm:flex"
            onClick={(e) => { e.stopPropagation(); setLightbox((prev) => (prev! + 1) % GALLERY_ITEMS.length); }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-semibold text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
            {GALLERY_ITEMS[lightbox].alt}
          </p>
        </div>
      )}
    </>
  );
}

/* ─────────────── REVIEWS SLIDER ─────────────── */
function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const { ref, visible } = useReveal(0.1);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, [REVIEWS.length]);

  return (
    <div ref={ref} className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-1">
            Loved Across <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Kasoa</span>
          </h3>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className={`w-5 h-5 ${s <= 4 ? 'text-yellow-400' : 'text-yellow-700'}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-2xl font-bold text-white">4.2</span>
            <span className="text-gray-400 text-sm">/ 5.0</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length)}
            className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-600/30 hover:border-red-500/40 hover:text-white transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % REVIEWS.length)}
            className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-600/30 hover:border-red-500/40 hover:text-white transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Review Cards */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {REVIEWS.map((review) => (
            <div key={review.id} className="w-full flex-shrink-0 pr-4 sm:pr-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.07] h-full">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className={`w-4 h-4 ${s <= review.rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <svg className="w-8 h-8 text-red-500/30 mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{review.name}</p>
                    <p className="text-gray-500 text-xs">{review.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-6">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-6 bg-red-500' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── TRUST BADGES ─────────────── */
function TrustBadges() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {TRUST_BADGES.map((badge, i) => (
        <div
          key={badge.label}
          className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-red-500/30 hover:bg-red-950/10 transition-all duration-500 text-center group hover:-translate-y-1"
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <div className="text-3xl mb-2">{badge.icon}</div>
          <p className="text-white font-semibold text-xs sm:text-sm mb-0.5">{badge.label}</p>
          <p className="text-gray-500 text-[10px]">{badge.sub}</p>
        </div>
      ))}
    </div>
  );
}

/* ─────────────── PROMOTIONAL BANNER ─────────────── */
function PromoBanner() {
  const { ref, visible } = useReveal(0.2);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl p-8 sm:p-10 bg-gradient-to-r from-red-950/60 via-gray-950/80 to-orange-950/40 border border-red-500/20 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl blur-xl opacity-20 animate-pulse-glow"></div>

      <div className="relative flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-red-400 text-xs font-semibold tracking-wider uppercase">Limited Time</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Weekend <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Special Deals</span>
          </h3>
          <p className="text-gray-400 text-sm sm:text-base">
            Order your favorites and enjoy exclusive savings this weekend.
          </p>
        </div>
        <button className="group flex-shrink-0 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-300 transform hover:scale-105 shadow-[0_0_25px_rgba(220,38,38,0.5)] hover:shadow-[0_0_40px_rgba(220,38,38,0.8)] flex items-center gap-2 whitespace-nowrap">
          Order Now
          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─────────────── COUNTERS ─────────────── */
function CounterItem({ value, suffix, label, icon }: { value: number; suffix: string; label: string; icon: string }) {
  const { ref, visible } = useReveal(0.3);
  const count = useCounter(value, 2000, visible);

  return (
    <div
      ref={ref}
      className={`text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-red-500/20 hover:bg-red-950/10 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="text-3xl mb-1">{icon}</div>
      <div className="text-2xl sm:text-3xl font-black text-white mb-0.5">
        {value % 1 !== 0 ? count.toFixed(1) : count.toLocaleString()}{suffix}
      </div>
      <p className="text-gray-400 text-xs sm:text-sm font-medium">{label}</p>
    </div>
  );
}

/* ─────────────── MAIN SECTION EXPORT ─────────────── */
export default function GalleryReviewsTrust() {
  return (
    <section id="gallery" className="bg-black py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-600/[0.04] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-0 w-[400px] h-[400px] bg-orange-500/[0.04] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto space-y-24 sm:space-y-32">
        {/* 1. Food Gallery */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-red-400 text-xs font-semibold tracking-[3px] uppercase">Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              A Taste of <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Daddy's</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
              Freshly prepared favorites crafted for every craving.
            </p>
          </div>

          <FeaturedCarousel />
          <GalleryGrid />
        </div>

        {/* 2. Reviews */}
        <div>
          <ReviewsSection />
        </div>

        {/* 3. Trust Badges */}
        <div>
          <TrustBadges />
        </div>

        {/* 4. Promotional Banner */}
        <div>
          <PromoBanner />
        </div>

        {/* 5. Social Proof Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {COUNTERS.map((c) => (
            <CounterItem key={c.label} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}