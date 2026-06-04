import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function AdminPreview() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref, visible } = useReveal(0.1);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  const features = [
    {
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      title: 'Update Menu Instantly',
      desc: 'Change pricing, tag items as "Sold Out", and update product listings anytime.',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Manage Orders Live',
      desc: 'Track order statuses from pending to prepared to delivered in real time.',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 8h.01M12 12h.01M12 9h.01" />
        </svg>
      ),
      title: 'Launch Promotions Quickly',
      desc: 'Create discount codes, set campaign dates, and publish banners directly.',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Control Business Information',
      desc: 'Edit opening hours, contact details, and location maps instantly.',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'No Developer Needed',
      desc: 'Your restaurant team manages everything through a simple interactive UI.',
    },
  ];

  return (
    <section className="bg-black py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/[0.04]">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-red-600/[0.03] rounded-full blur-[110px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-orange-500/[0.02] rounded-full blur-[90px] pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-red-400 text-xs font-semibold tracking-[3px] uppercase">Control Panel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Take Control of Your
            <span className="block bg-gradient-to-r from-red-500 via-orange-400 to-red-500 bg-clip-text text-transparent">
              Business
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Manage pricing, menu updates, promotions, and daily operations in real time.
          </p>
        </div>

        {/* Split Screen Layout */}
        <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Left: Mockup Dashboard Visual */}
          <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
            {/* outer glowing ring */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-red-600/30 to-orange-500/20 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>

            {/* Dashboard Mockup Container */}
            <div className="relative rounded-2xl bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 border border-white/10 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col">
              {/* Header */}
              <div className="h-12 border-b border-white/5 bg-black/40 flex items-center justify-between px-4 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
                  <span className="text-[10px] text-gray-500 ml-2 font-mono">daddys-pizza.com/admin</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center text-xs">🍕</div>
                  <span className="text-[10px] text-gray-400 font-semibold">Admin Panel</span>
                </div>
              </div>

              {/* Main Area */}
              <div className="flex-1 flex min-h-0">
                {/* Mini Sidebar */}
                <div className="w-16 sm:w-20 border-r border-white/5 bg-black/20 flex-shrink-0 flex flex-col p-2 space-y-1.5">
                  {[
                    { icon: '📊', active: true },
                    { icon: '🍔', active: false },
                    { icon: '💳', active: false },
                    { icon: '📦', active: false },
                    { icon: '🔥', active: false },
                  ].map((btn, i) => (
                    <div
                      key={i}
                      className={`h-9 rounded-lg flex items-center justify-center text-sm ${
                        btn.active ? 'bg-gradient-to-r from-red-600/20 to-red-950/10 border border-red-500/30' : 'opacity-40'
                      }`}
                    >
                      {btn.icon}
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="flex-1 p-4 space-y-4 overflow-hidden">
                  {/* Title & Stats */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Real-Time Revenue</span>
                    <span className="text-[10px] text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">Live</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Today's Orders", val: '32', color: 'text-white' },
                      { label: 'Revenue Today', val: 'GH₵ 2,450', color: 'text-orange-400' },
                      { label: 'Pending', val: '4', color: 'text-red-400 font-bold animate-pulse' },
                    ].map((s) => (
                      <div key={s.label} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        <div className="text-[8px] text-gray-500 truncate">{s.label}</div>
                        <div className={`text-xs sm:text-sm font-bold ${s.color} mt-1`}>{s.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Menu Pricing Mockup Card */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-gray-300">Pizzas: Pepperoni Supreme</span>
                      <span className="text-orange-400 font-bold">Medium Size</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <span className="text-[8px] text-gray-500 uppercase font-semibold">Current Price</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[10px] text-gray-400">GH₵</span>
                          <span className="text-sm font-black text-white">85.00</span>
                        </div>
                      </div>
                      <div className="flex-1 flex justify-end">
                        <span className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-[10px] text-white font-bold transition-all flex items-center gap-1">
                          Edit Price ✏️
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Orders Pipeline Mockup */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-gray-300">Live Order Status</span>
                      <span className="text-gray-500 text-[9px]">Just now</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-white font-bold">Order #DP847291</div>
                        <p className="text-[8px] text-gray-500 mt-0.5">2× Pepperoni Pizza · Kwame A.</p>
                      </div>
                      <div className="flex gap-1">
                        {['Pending', 'Preparing', 'Ready'].map((st) => (
                          <span
                            key={st}
                            className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                              st === 'Preparing' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-white/[0.03] text-gray-500'
                            }`}
                          >
                            {st}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover overlay teaser */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
              <span className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold shadow-lg shadow-red-600/30 flex items-center gap-1.5">
                🔍 Click to Expand Demo
              </span>
            </div>
          </div>

          {/* Right: Feature Bullet List */}
          <div className="space-y-8">
            <div className="space-y-4">
              {features.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm sm:text-base mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_35px_rgba(220,38,38,0.7)] flex items-center justify-center gap-2"
                >
                  View Admin Dashboard Demo
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>

                <button
                  onClick={() => navigate('/admin')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/[0.05] border border-white/15 text-white hover:bg-white/[0.1] hover:border-white/25 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Staff Login Portal
                </button>
              </div>

              {/* Trust Text */}
              <p className="text-gray-500 text-xs mt-3 text-center sm:text-left">
                Private secure management portal for Daddy’s Pizza staff.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enlarged Dashboard Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-red-600/80 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal mock wrapper */}
          <div
            className="relative w-full max-w-5xl rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border border-red-500/20 shadow-2xl shadow-red-900/30 overflow-hidden animate-modalIn max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="h-14 border-b border-white/10 bg-black/50 flex items-center justify-between px-6 flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-xl">🍕</span>
                <span className="text-white font-bold text-sm">Daddy's Pizza Control Center</span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-[10px] font-semibold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  Real-time synchronization active
                </span>
              </div>
            </div>

            {/* Layout */}
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar */}
              <div className="w-48 border-r border-white/5 bg-black/40 hidden md:block p-4 space-y-1.5">
                {[
                  { icon: '📊', label: 'Dashboard', active: true },
                  { icon: '🍔', label: 'Menu Items', active: false },
                  { icon: '💳', label: 'Pricing Edit', active: false },
                  { icon: '📦', label: 'Live Orders', active: false },
                  { icon: '🔥', label: 'Promotions', active: false },
                  { icon: '🖼️', label: 'Gallery', active: false },
                  { icon: '📍', label: 'Business Info', active: false },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
                      s.active ? 'bg-red-600/10 border border-red-500/20 text-white' : 'text-gray-500'
                    }`}
                  >
                    <span>{s.icon}</span> {s.label}
                  </div>
                ))}
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Today's Orders", val: '32 Orders', icon: '📦', desc: '+12% from yesterday' },
                    { label: 'Revenue Today', val: 'GH₵ 2,450', icon: '💰', desc: 'MTN MoMo & Cash' },
                    { label: 'Pending Dispatch', val: '4 Orders', icon: '⏳', desc: 'Preparing in kitchen' },
                    { label: 'Top Seller', val: 'Pepperoni Pizza', icon: '🏆', desc: '14 orders today' },
                  ].map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="flex items-center justify-between text-gray-500 text-xs mb-1 uppercase font-semibold tracking-wider">
                        <span>{stat.label}</span>
                        <span>{stat.icon}</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white mt-1">{stat.val}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{stat.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Edit Demo Mockup Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Menu Pricing List */}
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-4">
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider">Menu Pricing Controls</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Margherita Pizza (Medium)', price: '75' },
                        { name: 'Pepperoni Supreme (Medium)', price: '85' },
                        { name: 'Classic Cheeseburger', price: '45' },
                        { name: 'Loaded Cheese Fries', price: '38' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/[0.04] text-xs">
                          <span className="text-gray-300 font-medium">{item.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-orange-400 font-bold">GH₵ {item.price}</span>
                            <span className="px-2.5 py-1 rounded bg-red-600 text-white font-bold text-[10px] tracking-wide">
                              Change
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Live order tracker */}
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-4">
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider">Live Order Dispatches</h4>
                    <div className="space-y-3">
                      {[
                        { id: '#DP847291', items: '2× Pepperoni Pizza', method: 'Delivery', status: 'Preparing', col: 'text-orange-400 bg-orange-500/10' },
                        { id: '#DP847292', items: '1× Loaded Fries', method: 'Pickup', status: 'Ready', col: 'text-green-400 bg-green-500/10' },
                        { id: '#DP847293', items: '3× Cocktails', method: 'Drive-through', status: 'Delivered', col: 'text-gray-500 bg-white/[0.03]' },
                      ].map((ord) => (
                        <div key={ord.id} className="p-3 rounded-lg bg-black/40 border border-white/[0.04] flex items-center justify-between text-xs">
                          <div>
                            <span className="text-white font-bold block">{ord.id}</span>
                            <span className="text-[10px] text-gray-500">{ord.items}</span>
                          </div>
                          <span className={`px-2.5 py-1 rounded font-bold text-[10px] uppercase ${ord.col}`}>
                            {ord.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
