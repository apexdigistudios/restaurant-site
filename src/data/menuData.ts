export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price?: number;
  prices?: { small: number; medium: number; large: number; family: number };
  hasSizes?: boolean;
  image: string;
  tag?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  teaserText: string;
  teaserImage: string;
  accent: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    icon: '🍳',
    description: 'Start your morning with a hearty breakfast crafted fresh daily.',
    teaserText: 'Hearty morning meals to fuel your day',
    teaserImage: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop',
    accent: 'from-yellow-500 to-orange-500',
    items: [
      { id: 'b1', name: 'English Breakfast Platter', description: 'Eggs, sausages, baked beans, toast, grilled tomatoes, and hash browns.', price: 45, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop' },
      { id: 'b2', name: 'Pancake Stack', description: 'Fluffy pancakes drizzled with maple syrup and topped with butter.', price: 30, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop' },
      { id: 'b3', name: 'Omelette Royale', description: 'Three-egg omelette with cheese, mushrooms, peppers, and onions.', price: 35, image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&h=300&fit=crop' },
      { id: 'b4', name: 'Avocado Toast', description: 'Toasted sourdough with smashed avocado, cherry tomatoes, and poached eggs.', price: 28, image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop' },
      { id: 'b5', name: 'Waffle Deluxe', description: 'Golden Belgian waffles with fresh berries, cream, and chocolate drizzle.', price: 35, image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400&h=300&fit=crop' },
      { id: 'b6', name: 'Breakfast Burrito', description: 'Scrambled eggs, cheese, sausage, peppers wrapped in a warm tortilla.', price: 32, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop' },
    ],
  },
  {
    id: 'cocktails',
    name: 'Cocktails',
    icon: '🍹',
    description: 'Refreshing handcrafted cocktails and mocktails to complement your meal.',
    teaserText: 'Refreshing drinks crafted to perfection',
    teaserImage: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&h=400&fit=crop',
    accent: 'from-pink-500 to-purple-500',
    items: [
      { id: 'ck1', name: 'Mango Sunset', description: 'Fresh mango puree with lime, soda, and a tropical twist.', price: 28, image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&h=300&fit=crop' },
      { id: 'ck2', name: 'Berry Bliss Mocktail', description: 'Mixed berries muddled with mint and sparkling water.', price: 25, image: 'https://images.unsplash.com/photo-1587223962217-f4f9d4c3f6e8?w=400&h=300&fit=crop' },
      { id: 'ck3', name: 'Tropical Punch', description: 'Pineapple, coconut, and passion fruit blended over ice.', price: 30, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop' },
      { id: 'ck4', name: 'Virgin Mojito', description: 'Fresh mint, lime juice, sugar, and soda water — classic and refreshing.', price: 22, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop' },
      { id: 'ck5', name: 'Watermelon Cooler', description: 'Chilled watermelon juice with a hint of ginger and lime.', price: 20, image: 'https://images.unsplash.com/photo-1560508530-cad0bc297037?w=400&h=300&fit=crop' },
      { id: 'ck6', name: 'Pineapple Ginger Fizz', description: 'Sparkling pineapple juice with fresh ginger and a squeeze of lemon.', price: 25, image: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=400&h=300&fit=crop' },
    ],
  },
  {
    id: 'pizzas',
    name: 'Pizzas',
    icon: '🍕',
    description: 'Handcrafted pizzas baked fresh in our stone oven with premium toppings.',
    teaserText: 'Stone-baked pizzas with premium toppings',
    teaserImage: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop',
    accent: 'from-red-600 to-orange-500',
    items: [
      { id: 'p1', name: 'Margherita Classic', description: 'Fresh mozzarella, tomato sauce, and basil on a crispy hand-tossed crust.', hasSizes: true, prices: { small: 55, medium: 75, large: 100, family: 130 }, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop' },
      { id: 'p2', name: 'Pepperoni Supreme', description: 'Double pepperoni, mozzarella, and our signature tomato sauce.', hasSizes: true, prices: { small: 65, medium: 85, large: 115, family: 150 }, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop', tag: 'Best Seller' },
      { id: 'p3', name: 'BBQ Chicken Ranch', description: 'Grilled chicken, BBQ sauce, red onions, ranch drizzle, and cilantro.', hasSizes: true, prices: { small: 70, medium: 95, large: 125, family: 160 }, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop' },
      { id: 'p4', name: 'Meat Lovers', description: 'Pepperoni, sausage, ham, bacon, and ground beef with extra cheese.', hasSizes: true, prices: { small: 75, medium: 100, large: 135, family: 170 }, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop', tag: 'Popular' },
      { id: 'p5', name: 'Veggie Delight', description: 'Bell peppers, mushrooms, olives, onions, tomatoes, and spinach.', hasSizes: true, prices: { small: 55, medium: 75, large: 100, family: 130 }, image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=400&h=300&fit=crop' },
      { id: 'p6', name: 'Hawaiian Paradise', description: 'Ham, pineapple chunks, mozzarella, and tomato sauce.', hasSizes: true, prices: { small: 60, medium: 80, large: 110, family: 140 }, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop' },
    ],
  },
  {
    id: 'sauce-rice',
    name: 'Sauce & Rice',
    icon: '🍛',
    description: 'Rich stews and sauces paired perfectly with fluffy steamed rice.',
    teaserText: 'Rich stews and sauces over fluffy rice',
    teaserImage: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=400&fit=crop',
    accent: 'from-amber-500 to-yellow-500',
    items: [
      { id: 'sr1', name: 'Jollof Rice with Chicken', description: 'Smoky party-style jollof rice served with crispy fried chicken.', price: 40, image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=300&fit=crop', tag: 'Popular' },
      { id: 'sr2', name: 'Beef Stew with White Rice', description: 'Slow-cooked beef stew in rich tomato gravy over fluffy white rice.', price: 38, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop' },
      { id: 'sr3', name: 'Shrimp Sauce with Rice', description: 'Savory shrimp sauce with vegetables served over aromatic rice.', price: 48, image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop' },
      { id: 'sr4', name: 'Palava Sauce with Rice', description: 'Creamy cocoyam leaf stew with smoked fish and steamed rice.', price: 35, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop' },
      { id: 'sr5', name: 'Groundnut Soup with Rice', description: 'Rich peanut-based soup with tender chicken pieces over rice.', price: 40, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop' },
    ],
  },
  {
    id: 'noodles',
    name: 'Noodles',
    icon: '🍜',
    description: 'Asian-inspired noodle dishes tossed with fresh ingredients and bold flavors.',
    teaserText: 'Bold Asian-inspired noodle dishes',
    teaserImage: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&h=400&fit=crop',
    accent: 'from-green-500 to-teal-500',
    items: [
      { id: 'n1', name: 'Chicken Chow Mein', description: 'Stir-fried egg noodles with chicken, vegetables, and soy glaze.', price: 35, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop' },
      { id: 'n2', name: 'Spicy Beef Noodles', description: 'Thick noodles in spicy broth with tender beef slices and bok choy.', price: 40, image: 'https://images.unsplash.com/photo-1552611052-33e04de1b100?w=400&h=300&fit=crop' },
      { id: 'n3', name: 'Shrimp Pad Thai', description: 'Rice noodles with shrimp, egg, bean sprouts, and crushed peanuts.', price: 45, image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop', tag: "Chef's Pick" },
      { id: 'n4', name: 'Vegetable Lo Mein', description: 'Soft noodles with mixed vegetables in a savory garlic soy sauce.', price: 30, image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop' },
      { id: 'n5', name: 'Singapore Noodles', description: 'Curry-spiced vermicelli with shrimp, chicken, and vegetables.', price: 42, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop' },
    ],
  },
  {
    id: 'burgers',
    name: 'Burgers',
    icon: '🍔',
    description: 'Juicy hand-pressed burgers loaded with fresh toppings and signature sauces.',
    teaserText: 'Juicy hand-pressed burgers with bold flavors',
    teaserImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
    accent: 'from-orange-500 to-red-500',
    items: [
      { id: 'bg1', name: 'Classic Cheeseburger', description: 'Beef patty, cheddar cheese, lettuce, tomato, onion, and house sauce.', price: 45, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' },
      { id: 'bg2', name: 'Double Smash Burger', description: 'Two smashed beef patties with American cheese, pickles, and mustard.', price: 60, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop', tag: 'Popular' },
      { id: 'bg3', name: 'BBQ Bacon Burger', description: 'Beef patty, crispy bacon, BBQ sauce, onion rings, and pepper jack cheese.', price: 55, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop' },
      { id: 'bg4', name: 'Spicy Chicken Burger', description: 'Crispy chicken fillet, spicy mayo, jalapeños, and coleslaw.', price: 42, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop' },
      { id: 'bg5', name: 'Veggie Stack', description: 'Grilled plant-based patty with avocado, sprouts, and herb mayo.', price: 40, image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400&h=300&fit=crop' },
      { id: 'bg6', name: 'Mushroom Swiss Burger', description: 'Beef patty topped with sautéed mushrooms and melted Swiss cheese.', price: 52, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop' },
    ],
  },
  {
    id: 'sandwich',
    name: 'Sandwich',
    icon: '🥪',
    description: 'Freshly stacked sandwiches with premium fillings on artisan bread.',
    teaserText: 'Freshly stacked with premium fillings',
    teaserImage: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop',
    accent: 'from-lime-500 to-green-500',
    items: [
      { id: 'sw1', name: 'Club Sandwich', description: 'Triple-decker with chicken, bacon, egg, lettuce, tomato, and mayo.', price: 38, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop' },
      { id: 'sw2', name: 'Steak & Cheese Sub', description: 'Sliced steak, melted provolone, grilled onions, peppers, and mustard.', price: 45, image: 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=400&h=300&fit=crop' },
      { id: 'sw3', name: 'Chicken Caesar Wrap', description: 'Grilled chicken, romaine, parmesan, croutons, and Caesar dressing.', price: 35, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop' },
      { id: 'sw4', name: 'Tuna Melt', description: 'Tuna salad with melted cheddar on toasted sourdough bread.', price: 32, image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop' },
      { id: 'sw5', name: 'Grilled Veggie Panini', description: 'Zucchini, eggplant, peppers, and mozzarella pressed in ciabatta.', price: 30, image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&h=300&fit=crop' },
    ],
  },
  {
    id: 'rice-dishes',
    name: 'Rice Dishes',
    icon: '🍚',
    description: 'Local and continental rice favorites cooked to perfection.',
    teaserText: 'Local and continental rice favorites',
    teaserImage: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=600&h=400&fit=crop',
    accent: 'from-sky-500 to-blue-500',
    items: [
      { id: 'rd1', name: 'Waakye Special', description: 'Rice and beans with shito, spaghetti, boiled egg, and gari.', price: 30, image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&h=300&fit=crop', tag: 'Local Favorite' },
      { id: 'rd2', name: 'Fried Rice with Chicken', description: 'Wok-fried jasmine rice with vegetables and crispy fried chicken.', price: 40, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop' },
      { id: 'rd3', name: 'Coconut Rice & Stew', description: 'Fragrant coconut-infused rice served with rich tomato stew.', price: 35, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&h=300&fit=crop' },
      { id: 'rd4', name: 'Jollof Rice Platter', description: 'Smoky jollof rice with grilled chicken, salad, and fried plantain.', price: 45, image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=300&fit=crop', tag: 'Must Try' },
      { id: 'rd5', name: 'Plain Rice & Light Soup', description: 'Steamed white rice paired with light soup and goat meat.', price: 38, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop' },
    ],
  },
  {
    id: 'fries',
    name: 'Fries',
    icon: '🍟',
    description: 'Crispy golden fries seasoned to perfection.',
    teaserText: 'Crispy golden fries, perfectly seasoned',
    teaserImage: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=400&fit=crop',
    accent: 'from-yellow-400 to-amber-500',
    items: [
      { id: 'f1', name: 'Classic Fries', description: 'Crispy golden fries with a light salt seasoning.', price: 18, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop' },
      { id: 'f2', name: 'Seasoned Wedges', description: 'Thick-cut potato wedges with herbs and smoked paprika.', price: 22, image: 'https://images.unsplash.com/photo-1576107232684-12797d158b6c?w=400&h=300&fit=crop' },
      { id: 'f3', name: 'Curly Fries', description: 'Spiral-cut fries tossed in a zesty seasoning blend.', price: 22, image: 'https://images.unsplash.com/photo-1630384060421-cb20aeb5148f?w=400&h=300&fit=crop' },
      { id: 'f4', name: 'Garlic Parmesan Fries', description: 'Fries tossed with garlic butter and grated parmesan cheese.', price: 28, image: 'https://images.unsplash.com/photo-1585109649979-45e0c56182bd?w=400&h=300&fit=crop' },
    ],
  },
  {
    id: 'loaded-fries',
    name: 'Loaded Fries',
    icon: '🧀',
    description: 'Generous fries loaded with cheese, meats, and signature sauces.',
    teaserText: 'Fries loaded with cheese, meat & sauce',
    teaserImage: '/images/loaded-fries.jpeg',
    accent: 'from-orange-400 to-red-500',
    items: [
      { id: 'lf1', name: 'Cheesy Bacon Loaded Fries', description: 'Fries smothered in nacho cheese, crispy bacon, and sour cream.', price: 38, image: 'https://static.vecteezy.com/system/resources/previews/069/756/897/non_2x/loaded-fries-topped-with-bacon-cheese-jalapenos-and-ranch-dressing-create-delicious-treat-free-photo.jpg', tag: 'Fan Favorite' },
      { id: 'lf2', name: 'BBQ Pulled Pork Fries', description: 'Fries topped with pulled pork, BBQ sauce, coleslaw, and pickles.', price: 42, image: 'https://images.unsplash.com/photo-1619860135414-44089e887077?w=400&h=300&fit=crop' },
      { id: 'lf3', name: 'Spicy Chicken Loaded Fries', description: 'Fries with spicy chicken, jalapeños, cheese sauce, and hot sauce.', price: 40, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop' },
      { id: 'lf4', name: 'Shawarma Loaded Fries', description: 'Fries topped with shawarma meat, garlic sauce, and pickled veggies.', price: 42, image: 'https://images.unsplash.com/photo-1585109649979-45e0c56182bd?w=400&h=300&fit=crop', tag: 'New' },
    ],
  },
  {
    id: 'yam-chips',
    name: 'Yam Chips',
    icon: '🍠',
    description: 'Crispy fried local yam chips — a beloved Ghanaian classic.',
    teaserText: 'A beloved Ghanaian crispy classic',
    teaserImage: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&h=400&fit=crop',
    accent: 'from-yellow-500 to-orange-400',
    items: [
      { id: 'yc1', name: 'Plain Yam Chips', description: 'Thick-cut fried yam chips, golden and crispy outside, soft inside.', price: 18, image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=400&h=300&fit=crop' },
      { id: 'yc2', name: 'Yam Chips with Pepper Sauce', description: 'Crispy yam chips served with spicy tomato and pepper dipping sauce.', price: 22, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop' },
      { id: 'yc3', name: 'Yam Chips & Coleslaw', description: 'Fried yam chips with creamy coleslaw and ketchup.', price: 22, image: 'https://images.unsplash.com/photo-1625944525533-472f3a2e4902?w=400&h=300&fit=crop' },
      { id: 'yc4', name: 'Loaded Yam Chips', description: 'Yam chips topped with shito, gari, and fried egg.', price: 28, image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=300&fit=crop' },
    ],
  },
  {
    id: 'shawarma',
    name: 'Shawarma',
    icon: '🌯',
    description: 'Authentic shawarma wraps made with fresh ingredients and bold spices.',
    teaserText: 'Authentic wraps with bold spices',
    teaserImage: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=400&fit=crop',
    accent: 'from-emerald-500 to-teal-500',
    items: [
      { id: 'sh1', name: 'Chicken Shawarma', description: 'Marinated chicken, garlic sauce, pickles, and veggies in warm pita.', price: 32, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop', tag: 'Best Seller' },
      { id: 'sh2', name: 'Beef Shawarma', description: 'Spiced beef slices with tahini, onions, and fresh tomatoes.', price: 38, image: 'https://images.unsplash.com/photo-1638416910272-93418f8923bf?w=400&h=300&fit=crop' },
      { id: 'sh3', name: 'Mixed Shawarma', description: 'Combination of chicken and beef with all the classic toppings.', price: 42, image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400&h=300&fit=crop' },
      { id: 'sh4', name: 'Shawarma Plate', description: 'Deconstructed shawarma with rice, salad, hummus, and garlic sauce.', price: 45, image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop' },
      { id: 'sh5', name: 'Falafel Shawarma', description: 'Crispy falal with hummus, tahini, pickles, and fresh veggies.', price: 28, image: 'https://images.unsplash.com/photo-1593001872095-7d5b3868dd20?w=400&h=300&fit=crop' },
    ],
  },
  {
    id: 'salad',
    name: 'Salad',
    icon: '🥗',
    description: 'Fresh garden salads with house-made dressings for a healthy bite.',
    teaserText: 'Fresh garden salads with house dressings',
    teaserImage: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&h=400&fit=crop',
    accent: 'from-green-400 to-emerald-500',
    items: [
      { id: 'sa1', name: 'Caesar Salad', description: 'Romaine lettuce, parmesan, croutons, and creamy Caesar dressing.', price: 28, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop' },
      { id: 'sa2', name: 'Greek Salad', description: 'Tomatoes, cucumbers, olives, red onion, and feta with olive oil.', price: 25, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop' },
      { id: 'sa3', name: 'Garden Fresh Salad', description: 'Mixed greens, cherry tomatoes, carrots, corn, and balsamic vinaigrette.', price: 22, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop' },
      { id: 'sa4', name: 'Chicken Avocado Salad', description: 'Grilled chicken, avocado, mixed greens, cherry tomatoes, and lime dressing.', price: 35, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop' },
      { id: 'sa5', name: 'Coleslaw', description: 'Creamy cabbage and carrot slaw with a tangy mayo dressing.', price: 15, image: 'https://images.unsplash.com/photo-1625944525533-472f3a2e4902?w=400&h=300&fit=crop' },
    ],
  },
];

export function getCategoryById(id: string): MenuCategory | undefined {
  return menuData.find((c) => c.id === id);
}
