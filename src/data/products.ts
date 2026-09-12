export type StorefrontCategory = 'Bags' | 'Clothing' | 'Household Appliances' | 'Jewelry'
export type ProductCategory = StorefrontCategory | 'Cutlery'

export type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: ProductCategory
  subcategory: string
  inStock: boolean
  featured: boolean
  newArrival: boolean
  bestSeller: boolean
  discount: number
  stockQuantity: number
  createdAt: string
}

const images = {
  tote: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
  handbag: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1200&q=85',
  backpack: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85',
  brownBag: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85',
  fashion: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85',
  kids: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=85',
  skirt: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1200&q=85',
  blouse: 'https://images.unsplash.com/photo-1564257577054-70735f3b8d85?auto=format&fit=crop&w=1200&q=85',
  jeans: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=85',
  cutlery: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=1200&q=85',
  plates: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=1200&q=85',
  jug: 'https://images.unsplash.com/photo-1575377427642-087cf684f29d?auto=format&fit=crop&w=1200&q=85',
  necklace: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
  beads: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=85',
  earrings: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
}

const products: Product[] = [
  { id: 1, name: 'Adunni Signature Tote', description: 'A structured everyday tote with refined gold-tone hardware and a roomy, softly lined interior.', price: 28500, image: images.tote, category: 'Bags', subcategory: 'Tote Bags', inStock: true, featured: true, newArrival: false, bestSeller: true, discount: 0, stockQuantity: 12, createdAt: '2026-07-10' },
  { id: 2, name: 'Ife Luxe Carryall', description: 'An elegant carryall designed for polished workdays, weekend plans, and effortless organization.', price: 34500, image: images.handbag, category: 'Bags', subcategory: 'Women Bags', inStock: true, featured: true, newArrival: true, bestSeller: false, discount: 10, stockQuantity: 8, createdAt: '2026-08-22' },
  { id: 3, name: 'Smart Scholar Backpack', description: 'A durable, comfortable school backpack with padded straps and multiple practical compartments.', price: 18500, image: images.backpack, category: 'Bags', subcategory: 'School Bags', inStock: true, featured: false, newArrival: true, bestSeller: true, discount: 0, stockQuantity: 20, createdAt: '2026-08-18' },
  { id: 4, name: 'Zina Mini Lady Bag', description: 'A compact statement bag in rich brown, finished with an adjustable strap and premium detailing.', price: 22000, image: images.brownBag, category: 'Bags', subcategory: 'Ladies Bags', inStock: false, featured: false, newArrival: false, bestSeller: false, discount: 0, stockQuantity: 0, createdAt: '2026-05-12' },
  { id: 5, name: 'Navy Grace Two-Piece', description: 'A flattering coordinated set cut for comfort, confidence, and versatile day-to-evening styling.', price: 32000, image: images.fashion, category: 'Clothing', subcategory: 'Up & Down', inStock: true, featured: true, newArrival: true, bestSeller: true, discount: 5, stockQuantity: 10, createdAt: '2026-09-01' },
  { id: 6, name: 'Little Star Sunday Set', description: 'A charming children’s outfit made with soft, breathable fabric and neat occasion-ready tailoring.', price: 16500, image: images.kids, category: 'Clothing', subcategory: 'Kids Wears', inStock: true, featured: false, newArrival: true, bestSeller: false, discount: 0, stockQuantity: 14, createdAt: '2026-08-29' },
  { id: 7, name: 'Amara Pleated Midi Skirt', description: 'A graceful pleated skirt with elegant movement and an easy, beautifully shaped waistband.', price: 19500, image: images.skirt, category: 'Clothing', subcategory: 'Skirts', inStock: true, featured: true, newArrival: false, bestSeller: false, discount: 0, stockQuantity: 7, createdAt: '2026-06-03' },
  { id: 8, name: 'Pearl Button Blouse', description: 'A refined cream blouse with delicate statement buttons and a polished drape.', price: 14500, image: images.blouse, category: 'Clothing', subcategory: 'Blouses', inStock: false, featured: false, newArrival: false, bestSeller: true, discount: 0, stockQuantity: 0, createdAt: '2026-04-19' },
  { id: 9, name: 'Sculpt High-Rise Jeans', description: 'Premium high-rise denim with a clean silhouette, gentle stretch, and lasting shape.', price: 24500, image: images.jeans, category: 'Clothing', subcategory: 'Jeans', inStock: true, featured: false, newArrival: true, bestSeller: true, discount: 15, stockQuantity: 9, createdAt: '2026-08-30' },
  { id: 10, name: 'Chef’s Precision Knife Set', description: 'A balanced stainless-steel knife set created for confident everyday preparation.', price: 27500, image: images.cutlery, category: 'Cutlery', subcategory: 'Knives', inStock: true, featured: true, newArrival: false, bestSeller: true, discount: 0, stockQuantity: 11, createdAt: '2026-05-24' },
  { id: 11, name: 'Golden Table Spoon Set', description: 'Six elegant polished spoons that bring a warm premium accent to every place setting.', price: 12500, image: images.cutlery, category: 'Cutlery', subcategory: 'Spoons', inStock: true, featured: false, newArrival: true, bestSeller: false, discount: 0, stockQuantity: 18, createdAt: '2026-08-17' },
  { id: 12, name: 'Ivory Dinner Plate Set', description: 'A timeless set of six dinner plates with a subtle gold rim and durable glazed finish.', price: 29500, image: images.plates, category: 'Cutlery', subcategory: 'Plates', inStock: true, featured: true, newArrival: true, bestSeller: true, discount: 8, stockQuantity: 6, createdAt: '2026-08-25' },
  { id: 13, name: 'Crystal Pour Jug', description: 'A sculptural glass jug with a comfortable handle, ideal for dining and entertaining.', price: 15500, image: images.jug, category: 'Cutlery', subcategory: 'Jugs', inStock: false, featured: false, newArrival: false, bestSeller: false, discount: 0, stockQuantity: 0, createdAt: '2026-03-22' },
  { id: 14, name: 'Regal Dining Fork Set', description: 'A weighty set of six stainless-steel forks with a modern, mirror-polished profile.', price: 13500, image: images.cutlery, category: 'Cutlery', subcategory: 'Forks', inStock: true, featured: false, newArrival: false, bestSeller: false, discount: 0, stockQuantity: 15, createdAt: '2026-05-09' },
  { id: 15, name: 'Abeni Layered Necklace', description: 'A graceful layered necklace designed to add light, movement, and elegance to every look.', price: 18500, image: images.necklace, category: 'Jewelry', subcategory: 'Necklaces', inStock: true, featured: true, newArrival: true, bestSeller: true, discount: 0, stockQuantity: 13, createdAt: '2026-09-03' },
  { id: 16, name: 'Olori Hand Bead Stack', description: 'A rich, handcrafted bead stack inspired by timeless Nigerian colour and celebration.', price: 9500, image: images.beads, category: 'Jewelry', subcategory: 'Hand Beads', inStock: true, featured: false, newArrival: true, bestSeller: true, discount: 0, stockQuantity: 25, createdAt: '2026-08-26' },
  { id: 17, name: 'Halo Drop Earrings', description: 'Light-catching drop earrings with a refined silhouette for special and everyday moments.', price: 11500, image: images.earrings, category: 'Jewelry', subcategory: 'Earrings', inStock: true, featured: true, newArrival: false, bestSeller: false, discount: 12, stockQuantity: 5, createdAt: '2026-06-28' },
  { id: 18, name: 'Dainty Gold Studs', description: 'Minimal gold-tone studs with a polished finish and comfortable all-day wear.', price: 7500, image: images.earrings, category: 'Jewelry', subcategory: 'Earrings', inStock: false, featured: false, newArrival: false, bestSeller: false, discount: 0, stockQuantity: 0, createdAt: '2026-02-11' },
]

export const storefrontProducts = products.filter((product) => product.category !== 'Cutlery')

export const categories: Record<StorefrontCategory, string[]> = {
  Bags: ['Tote Bags', 'Women Bags', 'School Bags', 'Ladies Bags'],
  Clothing: ['Up & Down', 'Kids Wears', 'Skirts', 'Blouses', 'Jeans'],
  'Household Appliances': [],
  Jewelry: ['Necklaces', 'Hand Beads', 'Earrings'],
}

export const categoryMeta = {
  Bags: { slug: '/bags', description: 'Statement companions for every chapter of your day.', image: images.handbag },
  Clothing: { slug: '/clothing', description: 'Confident silhouettes, effortless elegance, beautiful living.', image: images.fashion },
  'Household Appliances': { slug: '/household-appliances', description: 'Practical appliances for a beautifully considered home.', image: images.plates },
  Jewelry: { slug: '/jewelry', description: 'Finishing touches that make every moment feel special.', image: images.necklace },
} satisfies Record<StorefrontCategory, { slug: string; description: string; image: string }>

export default products
