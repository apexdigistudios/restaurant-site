import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* ─────────────────── helpers ─────────────────── */
function useReveal(threshold = 0.12) {
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

/* ─────────────────── data ─────────────────── */
const HOURS = [
  { day: 'Monday – Friday', open: '10:30 AM', close: '11:30 PM' },
  { day: 'Saturday', open: '10:30 AM', close: '10:30 PM' },
  { day: 'Sunday', open: '12:00 PM', close: '11:30 PM' },
];

const QUICK_LINKS = ['Home', 'Menu', 'Special Offers', 'Gallery', 'Contact'];
const SERVICES = ['Dine-in', 'Drive-through', 'No-contact Delivery'];

const PHONE = '0241583165';
const PHONE_DISPLAY = '024 158 3165';
const WA_MESSAGE = encodeURIComponent("Hi Daddy's Pizza! I'd like to place an order. Please assist.");
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Daddy%27s+Pizza+Kasoa+Ghana';
const MAPS_EMBED = 'https://maps.google.com/maps?q=Kasoa,Ghana&t=&z=15&ie=UTF8&iwloc=&output=embed';

/* ─────────────────── sub-components ─────────────────── */

/* action buttons */
function ActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Call */}
      <a
        href={`tel:+233${PHONE.slice(1)}`}
        className="group flex-1 flex items-center justify-center gap-3 py-4 px-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-red-500/40 hover:bg-red-950/20 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(220,38,38,0.15)] transition-all duration-300"
      >
        <span className="w-10 h-10 rounded-xl bg-red-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600/40 transition-colors duration-300">
          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </span>
        <span>
          <span className="block text-xs text-gray-500 font-medium mb-0.5 uppercase tracking-wider">Phone</span>
          <span className="text-white font-bold text-sm">Call Now</span>
        </span>
      </a>

      {/* WhatsApp – most prominent */}
      <a
        href={`https://wa.me/233${PHONE.slice(1)}?text=${WA_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex-1 flex items-center justify-center gap-3 py-4 px-5 rounded-2xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 border border-green-500/30 hover:-translate-y-1 shadow-[0_0_20px_rgba(34,197,94,0.25)] hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] transition-all duration-300"
      >
        <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </span>
        <span>
          <span className="block text-xs text-green-200 font-medium mb-0.5 uppercase tracking-wider">Fastest</span>
          <span className="text-white font-bold text-sm">Order on WhatsApp</span>
        </span>
      </a>

      {/* Directions */}
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex-1 flex items-center justify-center gap-3 py-4 px-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-orange-500/40 hover:bg-orange-950/20 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(249,115,22,0.15)] transition-all duration-300"
      >
        <span className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/40 transition-colors duration-300">
          <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </span>
        <span>
          <span className="block text-xs text-gray-500 font-medium mb-0.5 uppercase tracking-wider">Location</span>
          <span className="text-white font-bold text-sm">Get Directions</span>
        </span>
      </a>
    </div>
  );
}

/* business info pills */
function BusinessInfo() {
  const details = [
    { icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ), label: 'Kasoa, Ghana', color: 'text-red-400' },
    { icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
      </svg>
    ), label: 'Digital Address: GH4J+CJ', color: 'text-orange-400' },
    { icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
    ), label: PHONE_DISPLAY, color: 'text-red-400' },
    { icon: (
      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ), label: '4.2 Rated', color: 'text-yellow-400' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {details.map((d, i) => (
        <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] ${d.color}`}>
          <span className="flex-shrink-0">{d.icon}</span>
          <span className="text-gray-300 text-sm font-medium">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

/* hours card */
function HoursCard() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun…6=Sat
  const todayLabel = day === 0 ? 'Sunday' : day === 6 ? 'Saturday' : 'Monday – Friday';

  return (
    <div className="rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.07] p-6">
      {/* header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-bold text-lg">Opening Hours</h3>
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          Open Daily
        </span>
      </div>

      <div className="space-y-3">
        {HOURS.map((h) => {
          const isToday = h.day === todayLabel;
          return (
            <div
              key={h.day}
              className={`flex items-center justify-between py-3 px-4 rounded-xl transition-colors duration-200 ${
                isToday
                  ? 'bg-gradient-to-r from-red-600/15 to-orange-500/5 border border-red-500/20'
                  : 'border border-transparent hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-2">
                {isToday && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                )}
                <span className={`text-sm font-medium ${isToday ? 'text-white' : 'text-gray-400'}`}>
                  {h.day}
                </span>
                {isToday && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-600/30 text-red-300 font-semibold">Today</span>
                )}
              </div>
              <span className={`text-sm font-semibold tabular-nums ${isToday ? 'text-orange-400' : 'text-gray-500'}`}>
                {h.open} – {h.close}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* map embed */
function MapEmbed() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] shadow-2xl shadow-red-900/10 h-64 sm:h-80">
      <iframe
        src={MAPS_EMBED}
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.85)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Daddy's Pizza Kasoa Location"
        className="absolute inset-0 w-full h-full"
      />
      {/* Pin overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div className="absolute -inset-3 rounded-full bg-red-500/30 animate-ping-slow"></div>
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-xl shadow-red-600/60 border-2 border-white/20">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        </div>
      </div>
      {/* View on Google Maps link */}
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 text-white text-xs font-semibold hover:bg-black/90 transition-all duration-200"
      >
        <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
        Open in Google Maps
      </a>
    </div>
  );
}

/* final CTA banner */
function FinalCTABanner() {
  const { ref, visible } = useReveal(0.2);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-3xl transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/80 via-gray-950/90 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(220,38,38,0.15),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(249,115,22,0.10),transparent_60%)]"></div>
      {/* border glow */}
      <div className="absolute inset-0 rounded-3xl border border-red-500/20"></div>
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-red-600/20 via-transparent to-orange-500/20 blur-sm"></div>

      <div className="relative px-8 sm:px-12 py-12 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
            Craving Something
            <span className="block bg-gradient-to-r from-red-500 via-orange-400 to-red-500 bg-clip-text text-transparent">
              Delicious?
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-md">
            Order your Daddy's Pizza favorites now and enjoy fast delivery across Kasoa.
          </p>
        </div>

        <div className="flex flex-col gap-3 flex-shrink-0">
          <a
            href={`https://wa.me/233${PHONE.slice(1)}?text=${WA_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-base transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:shadow-[0_0_50px_rgba(220,38,38,0.8)]"
          >
            Order Now
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </a>
          <a
            href={`tel:+233${PHONE.slice(1)}`}
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white/[0.05] border border-white/15 hover:bg-white/[0.1] hover:border-white/25 text-white font-semibold text-sm transition-all duration-300"
          >
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </div>
  );
}

/* social icons */
const SOCIALS = [
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: `https://wa.me/233${PHONE.slice(1)}?text=${WA_MESSAGE}`,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
  },
];

/* ─────────────────── MAIN EXPORT ─────────────────── */
export default function ContactFooter() {
  const { ref: contactRef, visible: contactVisible } = useReveal(0.07);

  return (
    <>
      {/* ══════════ CONTACT SECTION ══════════ */}
      <section id="contact" className="relative bg-black py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/[0.05] rounded-full blur-[130px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/[0.04] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative max-w-6xl mx-auto">
          {/* Section header */}
          <div
            ref={contactRef}
            className={`text-center mb-14 transition-all duration-1000 ${
              contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-red-400 text-xs font-semibold tracking-[3px] uppercase">Find Us</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Visit Daddy's Pizza
              <span className="block bg-gradient-to-r from-red-500 via-orange-400 to-red-500 bg-clip-text text-transparent">
                Kasoa
              </span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Freshly baked favorites, fast delivery, and convenient service across Kasoa.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-10 h-px bg-gradient-to-r from-transparent to-red-600/60"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/60"></div>
              <div className="w-10 h-px bg-gradient-to-l from-transparent to-red-600/60"></div>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
            {/* LEFT: Info + Actions */}
            <div className="space-y-5">
              {/* Business info */}
              <BusinessInfo />

              {/* CTA Buttons */}
              <ActionButtons />

              {/* Hours */}
              <HoursCard />
            </div>

            {/* RIGHT: Map */}
            <div className="space-y-5">
              <MapEmbed />

              {/* Tip card */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-xl flex-shrink-0">💡</span>
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-0.5">Pro Tip</p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Use our drive-through for the fastest collection. Just call ahead and your order will be ready on arrival.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA Banner */}
          <FinalCTABanner />
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="relative bg-gradient-to-b from-black via-gray-950 to-black border-t border-white/[0.04] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-red-600/40 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(220,38,38,0.04),transparent_60%)] pointer-events-none"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
          {/* Main footer grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12">
            {/* Brand Column */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-1">
              {/* Logo */}
              <div className="mb-4">
                <img src="/logo.png" alt="Daddy's Pizza" className="h-12 w-auto object-contain" />
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Handcrafted pizzas baked fresh daily. Fast delivery, drive-through convenience, and premium taste across Kasoa.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/30 hover:border-red-500/40 hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(220,38,38,0.3)] transition-all duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link}>
                    <Link
                      to={link === 'Menu' ? '/menu/pizzas' : link === 'Home' ? '/' : '#'}
                      className="group text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="w-3 h-px bg-gray-700 group-hover:w-4 group-hover:bg-red-500 transition-all duration-300"></span>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
                Services
              </h4>
              <ul className="space-y-3">
                {SERVICES.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-gray-400 text-sm">
                    <span className="w-3 h-px bg-gray-700"></span>
                    {s}
                  </li>
                ))}
              </ul>

              {/* Rating */}
              <div className="mt-6 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4].map((s) => (
                    <svg key={s} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                  <svg className="w-3.5 h-3.5 text-yellow-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <p className="text-white font-bold text-sm">4.2 / 5.0</p>
                <p className="text-gray-500 text-[10px] mt-0.5">Based on customer reviews</p>
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
                Contact
              </h4>
              <ul className="space-y-4">
                <li>
                  <a href={`tel:+233${PHONE.slice(1)}`} className="group flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-200">
                    <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <span className="text-sm">{PHONE_DISPLAY}</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span className="text-sm">Kasoa, Ghana</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <svg className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                  </svg>
                  <span className="text-sm">GH4J+CJ</span>
                </li>
                <li>
                  <a
                    href={`https://wa.me/233${PHONE.slice(1)}?text=${WA_MESSAGE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600/20 border border-green-500/20 text-green-400 hover:bg-green-600/30 hover:border-green-500/40 hover:text-white text-xs font-semibold transition-all duration-300"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-6"></div>

          {/* Footer bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-xs text-center sm:text-left">
              © 2026 Daddy's Pizza Kasoa. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs text-center sm:text-right italic">
              Designed for fast ordering and premium customer experience.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
