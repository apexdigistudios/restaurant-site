import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { menuData as initialMenuData, type MenuCategory, type MenuItem } from '../data/menuData';

export interface Promotion {
  id: string;
  title: string;
  discount: number;
  startDate: string;
  endDate: string;
  image: string;
}

export interface BusinessInfo {
  phone: string;
  digitalAddress: string;
  openingHours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
  deliveryAvailable: boolean;
  serviceOptions: string[];
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  location: string;
  featured: boolean;
  hidden: boolean;
  response?: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  landmark: string;
  deliveryMethod: 'delivery' | 'pickup' | 'drive-through';
  paymentMethod: 'momo' | 'cash';
  items: {
    name: string;
    quantity: number;
    size?: string;
    unitPrice: number;
  }[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  timestamp: string;
}

interface AppContextType {
  categories: MenuCategory[];
  updateMenuPrice: (itemId: string, newPrice: number | { small: number; medium: number; large: number; family: number }) => void;
  updateMenuItemAvailability: (itemId: string, available: boolean) => void;
  addMenuItem: (categoryId: string, item: Omit<MenuItem, 'id'>) => void;
  deleteMenuItem: (itemId: string) => void;
  
  businessInfo: BusinessInfo;
  updateBusinessInfo: (info: BusinessInfo) => void;
  
  promotions: Promotion[];
  addPromotion: (promo: Omit<Promotion, 'id'>) => void;
  
  reviews: Review[];
  updateReviewStatus: (id: number, action: 'feature' | 'hide' | 'respond', responseText?: string) => void;
  
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'timestamp' | 'status'>) => string;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  
  galleryImages: { id: number; src: string; alt: string; featured: boolean }[];
  addGalleryImage: (src: string, alt: string) => void;
  deleteGalleryImage: (id: number) => void;
  setFeaturedGalleryImage: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial mock reviews
const initialReviews: Review[] = [
  { id: 1, name: 'Kwame A.', rating: 5, text: 'Best pizza in Kasoa. Fast delivery and amazing taste. The family size is perfect for our household.', location: 'Kasoa', featured: true, hidden: false },
  { id: 2, name: 'Ama D.', rating: 5, text: 'Very smooth ordering experience and fresh food every time. My go-to spot for weekend treats!', location: 'Sakumono', featured: true, hidden: false },
  { id: 3, name: 'Nana K.', rating: 4, text: 'Their drive-through service is super convenient. I love that I can grab my order without leaving my car.', location: 'Awutu', featured: true, hidden: false },
  { id: 4, name: 'Abena M.', rating: 5, text: "The loaded fries are absolutely fire 🔥 Great portions, great prices. Daddy's never disappoints!", location: 'Kasoa', featured: false, hidden: false },
  { id: 5, name: 'Kojo B.', rating: 4, text: 'Best shawarma in the area. The garlic sauce is amazing. Ordering via WhatsApp is so convenient.', location: 'Weija', featured: false, hidden: false },
  { id: 6, name: 'Efua S.', rating: 5, text: 'Ordered for a birthday party. Everything was hot, fresh, and delicious. Will definitely order again!', location: 'Kasoa', featured: false, hidden: false },
];

// Initial mock orders
const initialOrders: Order[] = [
  {
    id: 'DP847291',
    customerName: 'Kojo Mensah',
    phone: '0244 555 123',
    address: 'Millennium City, Block B',
    landmark: 'Behind the filling station',
    deliveryMethod: 'delivery',
    paymentMethod: 'momo',
    items: [
      { name: 'Pepperoni Supreme', quantity: 2, size: 'medium', unitPrice: 85 },
      { name: 'Cheesy Bacon Loaded Fries', quantity: 1, unitPrice: 38 },
    ],
    total: 208,
    status: 'preparing',
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
  },
  {
    id: 'DP847292',
    customerName: 'Esi Boateng',
    phone: '0552 111 222',
    address: 'Kasoa Galleria',
    landmark: 'First floor shop',
    deliveryMethod: 'pickup',
    paymentMethod: 'cash',
    items: [
      { name: 'Club Sandwich', quantity: 1, unitPrice: 38 },
      { name: 'Mango Sunset', quantity: 2, unitPrice: 28 },
    ],
    total: 94,
    status: 'pending',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<MenuCategory[]>(() => {
    const stored = localStorage.getItem('daddys-menu-categories');
    return stored ? JSON.parse(stored) : initialMenuData;
  });

  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(() => {
    const stored = localStorage.getItem('daddys-business-info');
    return stored ? JSON.parse(stored) : {
      phone: '024 158 3165',
      digitalAddress: 'GH4J+CJ',
      openingHours: {
        weekday: '10:30 AM – 11:30 PM',
        saturday: '10:30 AM – 10:30 PM',
        sunday: '12:00 PM – 11:30 PM',
      },
      deliveryAvailable: true,
      serviceOptions: ['Dine-in', 'Drive-through', 'No-contact Delivery'],
    };
  });

  const [promotions, setPromotions] = useState<Promotion[]>(() => {
    const stored = localStorage.getItem('daddys-promotions');
    return stored ? JSON.parse(stored) : [
      {
        id: 'promo-1',
        title: 'Weekend Special Deals',
        discount: 15,
        startDate: '2026-03-01',
        endDate: '2026-03-31',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&fit=crop',
      }
    ];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const stored = localStorage.getItem('daddys-reviews');
    return stored ? JSON.parse(stored) : initialReviews;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = localStorage.getItem('daddys-orders');
    return stored ? JSON.parse(stored) : initialOrders;
  });

  const [galleryImages, setGalleryImages] = useState(() => {
    const stored = localStorage.getItem('daddys-gallery');
    return stored ? JSON.parse(stored) : [
      { id: 1, src: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop', alt: 'Margherita Pizza', featured: true },
      { id: 2, src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop', alt: 'Beef Burger', featured: false },
      { id: 3, src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop', alt: 'BBQ Chicken Pizza', featured: false },
      { id: 4, src: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&h=600&fit=crop', alt: 'Jollof Rice', featured: false },
    ];
  });

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('daddys-menu-categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('daddys-business-info', JSON.stringify(businessInfo)); }, [businessInfo]);
  useEffect(() => { localStorage.setItem('daddys-promotions', JSON.stringify(promotions)); }, [promotions]);
  useEffect(() => { localStorage.setItem('daddys-reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('daddys-orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('daddys-gallery', JSON.stringify(galleryImages)); }, [galleryImages]);

  // Pricing & Menu Operations
  const updateMenuPrice = (itemId: string, newPrice: number | { small: number; medium: number; large: number; family: number }) => {
    setCategories(prev => prev.map(cat => ({
      ...cat,
      items: cat.items.map(item => {
        if (item.id === itemId) {
          if (typeof newPrice === 'number') {
            return { ...item, price: newPrice };
          } else {
            return { ...item, prices: newPrice };
          }
        }
        return item;
      })
    })));
  };

  const updateMenuItemAvailability = (itemId: string, available: boolean) => {
    setCategories(prev => prev.map(cat => ({
      ...cat,
      items: cat.items.map(item => {
        if (item.id === itemId) {
          return { ...item, tag: available ? undefined : 'Sold Out' };
        }
        return item;
      })
    })));
  };

  const addMenuItem = (categoryId: string, item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}`,
    };
    setCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, items: [...cat.items, newItem] };
      }
      return cat;
    }));
  };

  const deleteMenuItem = (itemId: string) => {
    setCategories(prev => prev.map(cat => ({
      ...cat,
      items: cat.items.filter(item => item.id !== itemId)
    })));
  };

  // Business Info Operations
  const updateBusinessInfo = (info: BusinessInfo) => {
    setBusinessInfo(info);
  };

  // Promotion Operations
  const addPromotion = (promo: Omit<Promotion, 'id'>) => {
    const newPromo = { ...promo, id: `promo-${Date.now()}` };
    setPromotions(prev => [newPromo, ...prev]);
  };

  // Review Operations
  const updateReviewStatus = (id: number, action: 'feature' | 'hide' | 'respond', responseText?: string) => {
    setReviews(prev => prev.map(r => {
      if (r.id === id) {
        if (action === 'feature') return { ...r, featured: !r.featured };
        if (action === 'hide') return { ...r, hidden: !r.hidden };
        if (action === 'respond') return { ...r, response: responseText };
      }
      return r;
    }));
  };

  // Order Operations
  const addOrder = (order: Omit<Order, 'id' | 'timestamp' | 'status'>) => {
    const orderId = 'DP' + Date.now().toString().slice(-6);
    const newOrder: Order = {
      ...order,
      id: orderId,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    return orderId;
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  // Gallery Operations
  const addGalleryImage = (src: string, alt: string) => {
    const newImg = { id: Date.now(), src, alt, featured: false };
    setGalleryImages((prev: any[]) => [...prev, newImg]);
  };

  const deleteGalleryImage = (id: number) => {
    setGalleryImages((prev: any[]) => prev.filter((img: any) => img.id !== id));
  };

  const setFeaturedGalleryImage = (id: number) => {
    setGalleryImages((prev: any[]) => prev.map((img: any) => ({
      ...img,
      featured: img.id === id
    })));
  };

  return (
    <AppContext.Provider value={{
      categories, updateMenuPrice, updateMenuItemAvailability, addMenuItem, deleteMenuItem,
      businessInfo, updateBusinessInfo,
      promotions, addPromotion,
      reviews, updateReviewStatus,
      orders, addOrder, updateOrderStatus,
      galleryImages, addGalleryImage, deleteGalleryImage, setFeaturedGalleryImage,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
