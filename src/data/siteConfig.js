export const siteConfig = {
  name: 'Labib Hasan',
  title: 'Independent Web Designer & Developer',
  email: 'lowkeylabib@gmail.com',
  github: '',
  socialLinks: [], // { label: 'Platform', url: 'https://...' }
  introduction: "I'm Labib, an independent developer who enjoys turning creative ideas into polished, functional websites. My work combines visual design, thoughtful interactions, and modern frontend technology.",
  technologies: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Vite', 'Git', 'GitHub', 'Vercel', 'AI-assisted development tools'],
};

export const projects = [
  {
    slug: 'noir', number: '01', name: 'NOIR', category: 'Fashion Ecommerce', year: '2026',
    liveUrl: 'https://noir-ecommerce-showcase.vercel.app/', repositoryUrl: '',
    description: 'A premium streetwear ecommerce concept featuring bold editorial design, interactive product discovery, product variants, collection filtering, wishlist functionality, and a persistent shopping cart.',
    technologies: ['React', 'Vite', 'Tailwind CSS'],
    desktopImage: '/projects/noir-desktop.webp', mobileImage: '/projects/noir-mobile.webp',
    objective: 'Give a streetwear storefront a confident editorial identity while keeping product discovery and shopping decisions clear.',
    approach: 'Bold typography, a restrained palette, and a collection-led hierarchy put the clothing first. Product controls support exploration without competing with the visual identity.',
    features: ['Interactive product discovery', 'Product variants', 'Collection filtering', 'Wishlist functionality', 'Persistent shopping cart'],
    outcome: 'A completed, publicly deployed independent fashion ecommerce concept that brings editorial presentation and an interactive shopping interface together.',
  },
  {
    slug: 'aura', number: '02', name: 'AURA', category: 'Beauty Ecommerce', year: '2026',
    liveUrl: 'https://aura-skincare-showcase.vercel.app/', repositoryUrl: '',
    description: 'An elegant skincare ecommerce concept with refined visual merchandising, product categories, search, filtering, sorting, variants, wishlist, and persistent cart functionality.',
    technologies: ['React', 'Vite', 'Tailwind CSS'],
    desktopImage: '/projects/aura-desktop.webp', mobileImage: '/projects/aura-mobile.webp',
    objective: 'Create a calm, considered skincare shopping experience with clear paths from browsing to product selection.',
    approach: 'Refined product presentation and a gentle visual rhythm give the catalog room to breathe. Search, categories, and filtering help visitors navigate the collection.',
    features: ['Product categories and search', 'Filtering and sorting', 'Product variants', 'Wishlist functionality', 'Persistent shopping cart'],
    outcome: 'A completed, publicly deployed independent beauty ecommerce concept pairing refined visual merchandising with practical shopping features.',
  },
  {
    slug: 'framework', number: '03', name: 'FRAMEWORK', category: 'Creative Studio Website', year: '2026',
    liveUrl: 'https://framework-creative-studio.vercel.app/', repositoryUrl: '',
    description: 'A cinematic creative agency concept showcasing brand strategy, creative direction, film production, photography, and campaign services through editorial layouts and dynamic case studies.',
    technologies: ['React', 'Vite', 'Tailwind CSS'],
    desktopImage: '/projects/framework-desktop.webp', mobileImage: '/projects/framework-mobile.webp',
    objective: 'Give a multidisciplinary creative studio a distinctive presence that makes its work and services easy to explore.',
    approach: 'Cinematic pacing, oversized type, and editorial compositions establish the visual direction. Dynamic case studies connect the studio’s creative disciplines to its work.',
    features: ['Editorial layouts', 'Dynamic case studies', 'Brand strategy presentation', 'Creative direction and campaign services', 'Film production and photography presentation'],
    outcome: 'A completed, publicly deployed independent creative agency concept with an editorial presentation of work, services, and creative direction.',
  },
];

export const services = [
  { title: 'Ecommerce Experiences', preview: 'Ecommerce Website Design', text: 'Custom storefront interfaces, product presentation, responsive shopping journeys, and ecommerce frontend development.', detail: 'From the first collection view to the product details, every screen should feel like part of the same brand.' },
  { title: 'Business & Brand Websites', preview: 'Business & Brand Websites', text: 'Modern websites that communicate brand identity and services.', detail: 'A clear structure, expressive design, and thoughtful calls to action help visitors understand what you do.' },
  { title: 'Creative Portfolios', preview: 'Creative Portfolio Websites', text: 'Distinctive portfolios for artists, photographers, studios, and independent professionals.', detail: 'A considered setting for your work, with editorial layouts that let your creative point of view come through.' },
  { title: 'Frontend Development & Redesign', preview: 'Frontend Development & Redesign', text: 'Improving websites through modern layouts, usability, responsiveness, and polished interactions.', detail: 'Bring a new design to life or give an existing interface a clearer, more cohesive experience across screen sizes.' },
];
