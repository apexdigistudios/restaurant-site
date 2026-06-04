import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { AppProvider } from './context/AppContext';
import MenuShowcase from './components/MenuShowcase';
import GalleryReviewsTrust from './components/GalleryReviewsTrust';
import ContactFooter from './components/ContactFooter';
import CartPanel from './components/CartPanel';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

/* ── Cart Icon Button ── */
function CartIconButton() {
  const { itemCount, openCart } = useCart();
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (itemCount === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [itemCount]);

  return (
    <button
      onClick={openCart}
      className={`relative p-2.5 rounded-full bg-white/[0.05] border border-white/10 text-white hover:bg-red-600/30 hover:border-red-500/50 transition-all duration-300 ${bump ? 'scale-110' : 'scale-100'}`}
      aria-label={`Cart with ${itemCount} items`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-black flex items-center justify-center shadow-lg shadow-red-600/40 ring-2 ring-black">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
}

/* ── Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  const navLinks = ['Home', 'Menu', 'Gallery', 'Contact'];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (isHome) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-[max(0px,env(safe-area-inset-top))] ${
      scrolled || !isHome
        ? 'bg-black/60 backdrop-blur-md shadow-lg shadow-red-900/10'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-20">

          {/* LEFT — Nav links (desktop) / Hamburger (mobile) */}
          <div className="flex items-center">
            {/* Mobile hamburger */}
            <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const id = link.toLowerCase();
                if (id === 'home') {
                  return (
                    <button
                      key={link}
                      onClick={() => {
                        if (isHome) {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          navigate('/');
                        }
                      }}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium relative group"
                    >
                      {link}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  );
                }
                return (
                  <button key={link} onClick={() => scrollToSection(id)} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium relative group">
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CENTER — Logo */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                if (isHome) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  navigate('/');
                }
              }}
              className="focus:outline-none"
            >
              <img src="/logo.png" alt="Daddy's Pizza" className="h-10 sm:h-12 w-auto object-contain" />
            </button>
          </div>

          {/* RIGHT — Cart + Order Now (desktop) / Cart (mobile) */}
          <div className="flex items-center justify-end gap-3">
            <CartIconButton />
            <button
              onClick={() => scrollToSection('menu')}
              className="hidden md:inline-flex bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_35px_rgba(220,38,38,0.7)]"
            >
              Order Now
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-black/95 backdrop-blur-lg border-t border-red-900/20 px-4 py-4 space-y-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (isHome) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                navigate('/');
              }
            }}
            className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2 w-full text-left"
          >
            Home
          </button>
          <button onClick={() => scrollToSection('menu')} className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2 w-full text-left">Menu</button>
          <button onClick={() => scrollToSection('gallery')} className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2 w-full text-left">Gallery</button>
          <button onClick={() => scrollToSection('contact')} className="block text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium py-2 w-full text-left">Contact</button>
          <button
            onClick={() => { scrollToSection('menu'); }}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-full font-bold transition-all duration-300"
          >
            Order Now
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ── Hero Section ── */
function HeroSection() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/images/hero-bg.jpg" alt="Premium pizza background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
      </div>

      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-fadeInUp leading-tight">
            Freshly Baked.
            <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent animate-fadeInUp-delay-1">
              Delivered Fast.
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto animate-fadeInUp-delay-2 leading-relaxed">
            Daddy's Pizza Kasoa delivers handcrafted pizzas made fresh daily with fast delivery, drive-through convenience, and no-contact ordering.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fadeInUp-delay-3">
            <a
              href="#menu"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-600/50 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Order Now</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#menu"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 border-2 border-white/30 hover:border-white/50 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Browse Menu</span>
              <svg className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 animate-fadeInUp-delay-4">
            <div className="glass px-4 py-2 rounded-full flex items-center space-x-2">
              <span className="text-yellow-400">⭐</span>
              <span className="text-gray-200 text-sm font-medium">4.2 Rated</span>
            </div>
            <div className="glass px-4 py-2 rounded-full flex items-center space-x-2">
              <span className="text-green-400">🚚</span>
              <span className="text-gray-200 text-sm font-medium">Fast Delivery</span>
            </div>
            <div className="glass px-4 py-2 rounded-full flex items-center space-x-2">
              <span className="text-blue-400">🚗</span>
              <span className="text-gray-200 text-sm font-medium">Drive-through</span>
            </div>
            <div className="glass px-4 py-2 rounded-full flex items-center space-x-2">
              <span className="text-yellow-400">📱</span>
              <span className="text-gray-200 text-sm font-medium">MTN MoMo Ready</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 animate-fadeInUp-delay-4">
            <div className="flex items-center space-x-2 text-gray-400">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-base font-medium">Kasoa, Ghana</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-700"></div>
            <div className="flex items-center space-x-2 text-gray-400">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-base font-medium text-green-400">Open Daily</span>
            </div>
          </div>
        </div>
      </section>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-[10px] tracking-[3px] text-gray-400 mb-1 font-light">SCROLL</span>
        <svg className="w-5 h-5 text-gray-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7" />
        </svg>
      </div>
    </div>
  );
}

/* ── Home Page ── */
function HomePage() {
  return (
    <>
      <HeroSection />
      <MenuShowcase />
      <GalleryReviewsTrust />
      <ContactFooter />
    </>
  );
}

/* ── App Shell (inside Router so we can use useLocation) ── */
function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isHome = location.pathname === '/';

  return (
    <div className="bg-black">
      {!isAdminRoute && isHome && <Navbar />}
      {!isAdminRoute && <CartPanel />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu/:categoryId" element={<CategoryPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

/* ── Root App ── */
export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <CartProvider>
          <AppShell />
        </CartProvider>
      </AppProvider>
    </BrowserRouter>
  );
}
