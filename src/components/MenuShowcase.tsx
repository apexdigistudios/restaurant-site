import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

import type { MenuCategory } from '../data/menuData';

function CategoryCard({ category, index }: { category: MenuCategory; index: number }) {
  const { ref, visible } = useReveal(0.1);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 60}ms` }}
      className={`group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent transition-all duration-700 hover:border-red-500/40 hover:shadow-[0_0_40px_rgba(220,38,38,0.12)] hover:-translate-y-2 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={category.teaserImage}
          alt={category.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/600x400/1a1a1a/dc2626?text=${encodeURIComponent(category.name)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

        {/* Icon Badge */}
        <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-2xl shadow-lg">
          {category.icon}
        </div>

        {/* Item Count */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
          <span className="text-white text-xs font-semibold">{category.items.length} items</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <h3 className="text-white font-bold text-xl sm:text-2xl mb-2 group-hover:text-orange-300 transition-colors duration-300">
          {category.name}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2">
          {category.teaserText}
        </p>

        <Link
          to={`/menu/${category.id}`}
          className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:scale-105"
        >
          <span>Explore Menu</span>
          <svg
            className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
    </div>
  );
}

export default function MenuShowcase() {
  const { categories } = useApp();
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); obs.unobserve(el); } },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="menu" className="relative bg-black py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-[5%] -left-40 w-[500px] h-[500px] bg-red-600/[0.04] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] -right-40 w-[400px] h-[400px] bg-orange-500/[0.04] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[5%] left-1/3 w-[300px] h-[300px] bg-red-700/[0.03] rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-red-400 text-xs font-semibold tracking-[3px] uppercase">Our Menu</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Explore Our
            <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Menu
            </span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg max-w-md mx-auto">
            Browse Daddy's Pizza favorites and order instantly.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-red-600/60"></div>
            <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-red-600/60"></div>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categories.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
