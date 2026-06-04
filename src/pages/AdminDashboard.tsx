import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

type ActiveTab =
  | 'dashboard'
  | 'menu'
  | 'pricing'
  | 'orders'
  | 'promotions'
  | 'gallery'
  | 'business'
  | 'reviews'
  | 'settings';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const {
    categories,
    updateMenuPrice,
    updateMenuItemAvailability,
    addMenuItem,
    deleteMenuItem,
    businessInfo,
    updateBusinessInfo,
    promotions,
    addPromotion,
    reviews,
    updateReviewStatus,
    orders,
    updateOrderStatus,
    galleryImages,
    deleteGalleryImage,
    setFeaturedGalleryImage,
  } = useApp();

  // Auth guard — redirect to /admin login if not authenticated
  useEffect(() => {
    if (localStorage.getItem('daddys-admin-auth') !== 'true') {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  // Tab State
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Forms / Dialog State
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    categoryId: 'pizzas',
    image: '',
    tag: '',
  });

  const [promoForm, setPromoForm] = useState({
    title: '',
    discount: 10,
    startDate: '',
    endDate: '',
    image: '',
  });

  const [reviewResponse, setReviewResponse] = useState<Record<number, string>>({});

  const handleLogout = () => {
    localStorage.removeItem('daddys-admin-auth');
    navigate('/admin', { replace: true });
  };

  // Pricing state
  const [pricingFields, setPricingFields] = useState<Record<string, any>>({});

  useEffect(() => {
    // Populate pricing control states
    const initialPricing: Record<string, any> = {};
    categories.forEach(cat => {
      cat.items.forEach(item => {
        if (item.hasSizes && item.prices) {
          initialPricing[item.id] = { ...item.prices };
        } else if (item.price) {
          initialPricing[item.id] = item.price;
        }
      });
    });
    setPricingFields(initialPricing);
  }, [categories]);

  // Analytics Helpers
  const analytics = useMemo(() => {
    const today = new Date().toDateString();
    const todayOrders = orders.filter(
      (o) => new Date(o.timestamp).toDateString() === today
    );
    const revenue = todayOrders.reduce((sum, o) => sum + o.total, 0);
    const pending = orders.filter((o) => o.status === 'pending').length;

    // Find top selling item
    const itemCounts: Record<string, number> = {};
    orders.forEach((o) => {
      o.items.forEach((i) => {
        itemCounts[i.name] = (itemCounts[i.name] || 0) + i.quantity;
      });
    });
    let topItem = 'N/A';
    let maxQty = 0;
    Object.entries(itemCounts).forEach(([name, qty]) => {
      if (qty > maxQty) {
        maxQty = qty;
        topItem = name;
      }
    });

    return {
      todayCount: todayOrders.length,
      revenue,
      pending,
      topItem,
    };
  }, [orders]);

  // Handle price update submit
  const handleSavePrices = () => {
    Object.entries(pricingFields).forEach(([itemId, val]) => {
      updateMenuPrice(itemId, val);
    });
    alert('Prices updated successfully and synchronized to public menu!');
  };

  // Add Product Submit
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.description) return;
    addMenuItem(newProduct.categoryId, {
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      image: newProduct.image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
      tag: newProduct.tag || undefined,
    });
    setShowAddProduct(false);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      categoryId: 'pizzas',
      image: '',
      tag: '',
    });
  };

  // Add Promo Submit
  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoForm.title) return;
    addPromotion({
      title: promoForm.title,
      discount: promoForm.discount,
      startDate: promoForm.startDate || new Date().toISOString().split('T')[0],
      endDate: promoForm.endDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      image: promoForm.image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
    });
    alert('Promotion published successfully!');
    setPromoForm({ title: '', discount: 10, startDate: '', endDate: '', image: '' });
  };

  // Guard: if auth was cleared mid-session
  if (localStorage.getItem('daddys-admin-auth') !== 'true') {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-950/80 border-b md:border-b-0 md:border-r border-white/5 flex-shrink-0 flex flex-col z-20">
        {/* Header */}
        <div className="h-20 border-b border-white/5 flex items-center justify-center px-6">
          <img src="/logo.png" alt="Daddy's Pizza" className="h-10 w-auto object-contain" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {([
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'menu', label: 'Menu Management', icon: '🍔' },
            { id: 'pricing', label: 'Pricing Control', icon: '💳' },
            { id: 'orders', label: 'Orders', icon: '📦' },
            { id: 'promotions', label: 'Promotions', icon: '🔥' },
            { id: 'gallery', label: 'Gallery', icon: '🖼️' },
            { id: 'business', label: 'Business Info', icon: '📍' },
            { id: 'reviews', label: 'Reviews', icon: '⭐' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
          ] as const).map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-r from-red-600/20 to-red-950/10 border border-red-500/30 text-white shadow-lg shadow-red-600/5'
                    : 'text-gray-400 border border-transparent hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-white/5 space-y-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium text-gray-400 hover:text-white hover:bg-red-950/30 transition-all duration-200"
          >
            <span>🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-gradient-to-b from-gray-950 via-black to-black">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 sm:px-8">
          <div>
            <h1 className="text-xl font-bold capitalize">{activeTab} Control</h1>
            <p className="text-xs text-gray-500 mt-0.5">Control panel for Kasoa branch</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Update Alert */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-[11px] font-semibold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              Changes made here update the public website instantly
            </div>
            <Link
              to="/"
              className="text-gray-300 hover:text-white bg-white/[0.05] border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
            >
              👁️ View Site
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Mobile Live Update Alert */}
          <div className="lg:hidden flex items-center gap-2 p-3 rounded-xl bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0"></span>
            Changes here update public website instantly
          </div>

          {/* ══════════ Tab 1: Dashboard Home ══════════ */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Today's Orders", val: analytics.todayCount, icon: '📦', color: 'from-blue-500/10' },
                  { label: 'Revenue Today', val: `GH₵ ${analytics.revenue}`, icon: '💰', color: 'from-green-500/10' },
                  { label: 'Pending Orders', val: analytics.pending, icon: '⏳', color: 'from-yellow-500/10' },
                  { label: 'Top Selling Item', val: analytics.topItem, icon: '🏆', color: 'from-orange-500/10' },
                ].map((s) => (
                  <div key={s.label} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                    <div>
                      <div className="text-gray-500 text-xs font-semibold mb-1 uppercase tracking-wider">{s.label}</div>
                      <div className="text-2xl sm:text-3xl font-black text-white">{s.val}</div>
                    </div>
                    <div className="text-3xl p-3 rounded-xl bg-white/[0.03]">{s.icon}</div>
                  </div>
                ))}
              </div>

              {/* Recent Orders Overview */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <h3 className="text-lg font-bold text-white mb-4">Pending Orders Dispatch</h3>
                <div className="space-y-3">
                  {orders.filter(o => o.status === 'pending' || o.status === 'preparing').map((order) => (
                    <div key={order.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold">#{order.id}</span>
                          <span className="text-xs text-gray-500">{new Date(order.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{order.customerName} · {order.items.length} items</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-400 font-bold">GH₵ {order.total}</span>
                        <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold uppercase ${
                          order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-blue-500/10 text-blue-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {orders.filter(o => o.status === 'pending' || o.status === 'preparing').length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-6">No pending or preparing orders.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══════════ Tab 2: Menu Management ══════════ */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">All Menu Items</h2>
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm transition-all duration-200 flex items-center gap-1.5 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                >
                  <span>+</span> Add New Product
                </button>
              </div>

              {/* Add Product Modal Overlay */}
              {showAddProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
                  <div className="w-full max-w-lg rounded-2xl bg-gray-950 border border-white/10 p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Add New Product</h3>
                    <form onSubmit={handleAddProductSubmit} className="space-y-4">
                      <div>
                        <label className="text-xs text-gray-400 font-medium mb-1 block">Product Name *</label>
                        <input
                          type="text"
                          required
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 font-medium mb-1 block">Description *</label>
                        <textarea
                          required
                          rows={2}
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-400 font-medium mb-1 block">Price (GH₵) *</label>
                          <input
                            type="number"
                            required
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 font-medium mb-1 block">Category *</label>
                          <select
                            value={newProduct.categoryId}
                            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none"
                          >
                            {categories.map((c) => (
                              <option key={c.id} value={c.id} className="bg-gray-950 text-white">
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 font-medium mb-1 block">Image URL</label>
                        <input
                          type="text"
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                          placeholder="Leave empty for generic placeholder"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none"
                        />
                      </div>
                      <div className="flex gap-3 justify-end pt-4">
                        <button
                          type="button"
                          onClick={() => setShowAddProduct(false)}
                          className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white font-bold text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold text-xs"
                        >
                          Create Product
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Table */}
              <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="p-4 text-gray-400 font-semibold">Image</th>
                      <th className="p-4 text-gray-400 font-semibold">Product Name</th>
                      <th className="p-4 text-gray-400 font-semibold">Category</th>
                      <th className="p-4 text-gray-400 font-semibold">Price</th>
                      <th className="p-4 text-gray-400 font-semibold">Availability</th>
                      <th className="p-4 text-gray-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.flatMap(cat => cat.items.map(item => (
                      <tr key={item.id} className="border-b border-white/[0.03] hover:bg-white/[0.01] transition-colors">
                        <td className="p-4">
                          <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg bg-white/[0.05]" />
                        </td>
                        <td className="p-4 font-bold text-white">{item.name}</td>
                        <td className="p-4 text-gray-400 capitalize">{cat.name}</td>
                        <td className="p-4 font-bold text-orange-400">
                          {item.hasSizes && item.prices
                            ? `S: ${item.prices.small} / M: ${item.prices.medium}`
                            : `GH₵ ${item.price}`}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => updateMenuItemAvailability(item.id, item.tag === 'Sold Out')}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                              item.tag === 'Sold Out'
                                ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                                : 'bg-green-500/10 border border-green-500/20 text-green-400'
                            }`}
                          >
                            {item.tag === 'Sold Out' ? 'Sold Out' : 'Available'}
                          </button>
                        </td>
                        <td className="p-4 space-x-2">
                          <button
                            onClick={() => deleteMenuItem(item.id)}
                            className="text-red-400 hover:text-red-300 text-xs font-semibold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══════════ Tab 3: Pricing Control ══════════ */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Menu Pricing Control</h2>
                <button
                  onClick={handleSavePrices}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm transition-all duration-200 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                >
                  Save Changes
                </button>
              </div>

              {/* Grid of pricing cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-4">
                    <h3 className="text-white font-bold text-base flex items-center gap-2 pb-3 border-b border-white/5">
                      <span>{cat.icon}</span> {cat.name}
                    </h3>
                    <div className="space-y-3">
                      {cat.items.map((item) => (
                        <div key={item.id} className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-semibold text-gray-300">{item.name}</span>
                          </div>
                          {item.hasSizes && item.prices ? (
                            <div className="grid grid-cols-4 gap-2">
                              {(['small', 'medium', 'large', 'family'] as const).map((sz) => (
                                <div key={sz}>
                                  <label className="text-[10px] text-gray-500 capitalize block mb-0.5">{sz}</label>
                                  <input
                                    type="number"
                                    value={pricingFields[item.id]?.[sz] || ''}
                                    onChange={(e) =>
                                      setPricingFields((prev) => ({
                                        ...prev,
                                        [item.id]: {
                                          ...prev[item.id],
                                          [sz]: parseFloat(e.target.value) || 0,
                                        },
                                      }))
                                    }
                                    className="w-full px-2 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs text-center focus:outline-none focus:border-red-500/50"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">Price (GH₵)</span>
                              <input
                                type="number"
                                value={pricingFields[item.id] || ''}
                                onChange={(e) =>
                                  setPricingFields((prev) => ({
                                    ...prev,
                                    [item.id]: parseFloat(e.target.value) || 0,
                                  }))
                                }
                                className="w-24 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500/50"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════ Tab 4: Order Management ══════════ */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Live Orders Control</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-white font-bold text-base">Order #{order.id}</h3>
                          <span className="text-xs text-gray-500">
                            {new Date(order.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          {order.customerName} · {order.phone}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-orange-400 font-bold text-lg">GH₵ {order.total}</span>
                        <div className="flex gap-1.5">
                          {(['pending', 'preparing', 'ready', 'delivered'] as const).map((status) => (
                            <button
                              key={status}
                              onClick={() => updateOrderStatus(order.id, status)}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                                order.status === status
                                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                                  : 'bg-white/[0.03] border border-white/10 text-gray-500 hover:text-white'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Delivery Details</div>
                        <div className="space-y-1">
                          <p className="text-gray-300">Method: <span className="capitalize text-white font-semibold">{order.deliveryMethod}</span></p>
                          <p className="text-gray-300">Payment: <span className="capitalize text-white font-semibold">{order.paymentMethod}</span></p>
                          {order.deliveryMethod === 'delivery' && (
                            <>
                              <p className="text-gray-300">Address: <span className="text-white">{order.address}</span></p>
                              <p className="text-gray-300">Landmark: <span className="text-white">{order.landmark}</span></p>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Items</div>
                        <div className="space-y-1">
                          {order.items.map((i, idx) => (
                            <p key={idx} className="text-gray-300">
                              {i.quantity}× <span className="text-white font-medium">{i.name}</span>
                              {i.size && <span className="text-gray-500 text-xs ml-1">({i.size})</span>}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && (
                  <p className="text-gray-500 text-center py-12">No orders placed yet.</p>
                )}
              </div>
            </div>
          )}

          {/* ══════════ Tab 5: Promotions ══════════ */}
          {activeTab === 'promotions' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Add New Promotion</h2>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
                {/* Form */}
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <form onSubmit={handlePromoSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 font-medium mb-1 block">Promotion Title *</label>
                      <input
                        type="text"
                        required
                        value={promoForm.title}
                        onChange={(e) => setPromoForm({ ...promoForm, title: e.target.value })}
                        placeholder="Weekend Special Deals"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-600 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 font-medium mb-1 block">Discount Percentage (%)</label>
                        <input
                          type="number"
                          value={promoForm.discount}
                          onChange={(e) => setPromoForm({ ...promoForm, discount: parseInt(e.target.value) || 0 })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 font-medium mb-1 block">Banner Image URL</label>
                        <input
                          type="text"
                          value={promoForm.image}
                          onChange={(e) => setPromoForm({ ...promoForm, image: e.target.value })}
                          placeholder="Optional banner image URL"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 font-medium mb-1 block">Start Date</label>
                        <input
                          type="date"
                          value={promoForm.startDate}
                          onChange={(e) => setPromoForm({ ...promoForm, startDate: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 font-medium mb-1 block">End Date</label>
                        <input
                          type="date"
                          value={promoForm.endDate}
                          onChange={(e) => setPromoForm({ ...promoForm, endDate: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all duration-200"
                    >
                      Publish Promotion
                    </button>
                  </form>
                </div>

                {/* List */}
                <div className="space-y-4">
                  <h3 className="text-white font-bold text-base">Active Promotions</h3>
                  {promotions.map((promo) => (
                    <div key={promo.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                      <h4 className="text-white font-bold text-sm">{promo.title}</h4>
                      <p className="text-orange-400 text-xs font-bold">{promo.discount}% Off Discount</p>
                      <p className="text-gray-500 text-[10px]">
                        Active: {promo.startDate} to {promo.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══════════ Tab 6: Gallery ══════════ */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Gallery Showcase</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryImages.map((img) => (
                  <div key={img.id} className="relative rounded-xl overflow-hidden border border-white/10 group aspect-video">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <button
                        onClick={() => setFeaturedGalleryImage(img.id)}
                        className={`p-2 rounded-lg text-xs font-bold ${
                          img.featured ? 'bg-yellow-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {img.featured ? '★ Featured' : 'Feature'}
                      </button>
                      <button
                        onClick={() => deleteGalleryImage(img.id)}
                        className="p-2 rounded-lg bg-red-600/80 text-white text-xs font-bold hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════ Tab 7: Business Info ══════════ */}
          {activeTab === 'business' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Business Info Configuration</h2>
              <div className="max-w-2xl p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-4">
                <div>
                  <label className="text-xs text-gray-400 font-semibold mb-1.5 block">Phone Number</label>
                  <input
                    type="text"
                    value={businessInfo.phone}
                    onChange={(e) => updateBusinessInfo({ ...businessInfo, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-semibold mb-1.5 block">Digital Address</label>
                  <input
                    type="text"
                    value={businessInfo.digitalAddress}
                    onChange={(e) => updateBusinessInfo({ ...businessInfo, digitalAddress: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-semibold mb-3 block">Opening Hours</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Weekday</label>
                      <input
                        type="text"
                        value={businessInfo.openingHours.weekday}
                        onChange={(e) =>
                          updateBusinessInfo({
                            ...businessInfo,
                            openingHours: { ...businessInfo.openingHours, weekday: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Saturday</label>
                      <input
                        type="text"
                        value={businessInfo.openingHours.saturday}
                        onChange={(e) =>
                          updateBusinessInfo({
                            ...businessInfo,
                            openingHours: { ...businessInfo.openingHours, saturday: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Sunday</label>
                      <input
                        type="text"
                        value={businessInfo.openingHours.sunday}
                        onChange={(e) =>
                          updateBusinessInfo({
                            ...businessInfo,
                            openingHours: { ...businessInfo.openingHours, sunday: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => alert('Business info updated successfully!')}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all duration-200"
                >
                  Save Business Info
                </button>
              </div>
            </div>
          )}

          {/* ══════════ Tab 8: Reviews ══════════ */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Review Moderation</h2>
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-bold text-sm">{r.name}</h4>
                          <span className="text-[10px] text-gray-500">{r.location}</span>
                        </div>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span key={s} className={`text-xs ${s <= r.rating ? 'text-yellow-400' : 'text-gray-600'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateReviewStatus(r.id, 'feature')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            r.featured ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-white/[0.04] text-gray-400 hover:text-white'
                          }`}
                        >
                          {r.featured ? 'Featured' : 'Feature'}
                        </button>
                        <button
                          onClick={() => updateReviewStatus(r.id, 'hide')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                            r.hidden ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-white/[0.04] text-gray-400 hover:text-white'
                          }`}
                        >
                          {r.hidden ? 'Hidden' : 'Hide'}
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm italic">"{r.text}"</p>

                    {/* Response Area */}
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-500 uppercase font-bold block">Response</label>
                      {r.response ? (
                        <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/10 text-gray-400 text-xs">
                          <span className="font-bold text-white block mb-1">Daddy's Response:</span>
                          {r.response}
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Type response..."
                            value={reviewResponse[r.id] || ''}
                            onChange={(e) => setReviewResponse({ ...reviewResponse, [r.id]: e.target.value })}
                            className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none"
                          />
                          <button
                            onClick={() => {
                              if (!reviewResponse[r.id]) return;
                              updateReviewStatus(r.id, 'respond', reviewResponse[r.id]);
                              setReviewResponse({ ...reviewResponse, [r.id]: '' });
                            }}
                            className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs"
                          >
                            Send
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════ Tab 9: Settings ══════════ */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">System Settings</h2>
              <div className="max-w-md p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-4">
                <div>
                  <h3 className="text-white font-bold text-sm mb-3">Admin Password</h3>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none"
                    />
                    <button
                      onClick={() => alert('Password updated successfully!')}
                      className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
