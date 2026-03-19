# NovaMint — Content Editing Guide

All site content lives in **`src/data/`**.  Edit the TypeScript files below, save, and the site rebuilds automatically.

---

## File Map

| File | What It Controls |
|------|-----------------|
| `homepage.ts` | Hero stats, trusted platforms, impact stats, featured services, "Why Us" features & benefits |
| `services.ts` | Service categories & items on `/services` |
| `pricing.ts` | Plans, automation pricing, pricing-page FAQs |
| `faq.ts` | FAQ categories & questions on `/faq` |
| `contact.ts` | Contact methods & service-type dropdown on `/contact` |
| `automations.ts` | One-time & subscription automations on `/ai-automations` |
| `testimonials.ts` | Testimonials (used on homepage + `/testimonials`) |

---

## How to Edit

### 1. Change a price

Open `src/data/pricing.ts`, find the plan, and update the `price` field:

```ts
// Before
price: '₹599',
// After
price: '₹799',
```

### 2. Add a new service

Open `src/data/services.ts`, pick a category, and add to its `items` array:

```ts
{
  icon: 'Sparkles',       // any Lucide icon name
  title: 'AI Voice Cloning',
  description: 'Clone your voice for content repurposing.',
  features: ['Natural voice', '10 languages', '24h delivery'],
  price: '₹1,499',
},
```

### 3. Add an FAQ

Open `src/data/faq.ts` and append to the `faqs` array:

```ts
{
  id: 'new-q',
  question: 'Do you offer refunds?',
  answer: 'Yes, within 48 hours of purchase.',
  category: 'billing',
},
```

### 4. Add a testimonial

Open `src/data/testimonials.ts`:

```ts
{
  id: 9,                       // next available ID
  name: 'Anita Desai',
  role: 'Brand Manager',
  company: 'StartupX',
  avatar: '/avatars/anita.jpg',
  content: 'NovaMint doubled our traffic in 3 months.',
  rating: 5,
  metrics: '200% traffic growth',
  featured: true,              // shows on homepage
},
```

### 5. Update hero stats

Open `src/data/homepage.ts` and edit `heroStats`:

```ts
{ value: 75, suffix: '+', label: 'Digital Products' },
```

---

## Icon Names

Icons are strings matching [Lucide icon names](https://lucide.dev/icons):
`Video`, `Bot`, `TrendingUp`, `Globe`, `Shield`, `Zap`, `Award`, `Users`, `Briefcase`, `Clock`, etc.

If you use a name not in the icon map, the site falls back to a `HelpCircle` icon.

---

## After Editing

1. Save the file
2. The dev server (`npm run dev`) hot-reloads automatically
3. Run `npm run build` before deploying to catch any errors
