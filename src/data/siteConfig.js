export const siteConfig = {
  name: 'Labib Hasan',
  handle: 'LowkeyLabib',
  title: 'Software Developer & AI-Assisted Builder',
  education: {
    university: 'Daffodil International University',
    degree: 'BSc Software Engineering',
    expectedGraduation: 2029,
  },
  email: 'lowkeylabib@gmail.com',
  github: 'https://github.com/LowkeyLabib',
  linkedin: '', // Set to a verified LinkedIn profile URL to display the link.
  socialLinks: [], // { label: 'Platform', url: 'https://...' }
  introduction: "I'm a software engineering student building applications, interactive experiences and websites using modern tools and AI-assisted workflows.",
  about: [
    "I’m Labib Hasan, also known as LowkeyLabib. I study software engineering at Daffodil International University and enjoy taking an idea far enough that someone can actually use it.",
    "I’m drawn to interactive projects where small design and engineering decisions shape how the whole thing feels. I use AI-assisted tools to explore options, prototype, and debug faster, then review and test what goes into the project.",
  ],
  technologies: ['JavaScript', 'HTML', 'CSS', 'React', 'Tailwind CSS', 'React Native', 'Expo', 'SQLite'],
  developerTools: ['Vite', 'Git', 'GitHub', 'Vercel'],
};

export const contactProfiles = [
  { label: 'GitHub', url: siteConfig.github },
  { label: 'LinkedIn', url: siteConfig.linkedin },
].filter(profile => profile.url);

export const softwareProjects = [
  {
    slug: 'psysim',
    name: 'PsySim',
    category: 'Clinical Education',
    description: 'AI-powered psychiatric patient simulation for practicing clinical interviews and diagnostic reasoning.',
    collaboration: 'Built under ZeroGhee with Faiaz Ul Islam.',
    role: 'Frontend, UI/UX, Integration',
    overview: 'PsySim gives learners a simulated patient to interview and use as a basis for practicing diagnostic reasoning.',
    features: ['AI-powered psychiatric patient simulation', 'Clinical interview practice', 'Diagnostic reasoning practice'],
    techniques: ['AI simulation'],
  },
  {
    slug: 'ironclad',
    name: 'IRONCLAD',
    category: 'Fitness App',
    description: 'Android fitness tracking with preset and custom workout routines, weight logging, rest timers, and progress tracking.',
    overview: 'IRONCLAD brings workout planning, session logging, and progress history together in an Android training app.',
    role: 'App development',
    features: ['Preset and custom routines', 'Workout and weight logging', 'Rest timers', 'Progress history'],
    technologies: ['Android', 'React Native', 'Expo', 'SQLite'],
    links: [{ label: 'GitHub', href: 'https://github.com/LowkeyLabib/IRONCLAD' }],
  },
  {
    slug: 'lovegarden',
    name: 'LoveGarden',
    category: 'Interactive Game',
    description: 'An interactive pixel-art garden with planting, watering, character customization, fashion, gifts, and day/night cycles.',
    overview: 'LoveGarden is a pixel-art experience where players can tend a garden and customize their character as the scene cycles through day and night.',
    features: ['Planting and watering', 'Character customization and fashion', 'Gifts', 'Day and night cycles'],
    techniques: ['Pixel art'],
  },
  {
    slug: 'anubicide',
    name: 'Anubicide',
    category: 'Desktop Automation',
    description: 'Desktop software with visual detection, configurable automation, and account and session management.',
    overview: 'Anubicide brings visual detection, automation settings, and account and session controls into a desktop application.',
    features: ['Visual detection', 'Configurable automation', 'Account and session management'],
    techniques: ['Visual detection'],
  },
];

export const projects = [
  {
    slug: 'noir', number: '01', name: 'NOIR', category: 'Fashion Ecommerce', year: '2026',
    showcaseDescription: 'A modern ecommerce concept for a streetwear brand.',
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
    showcaseDescription: 'A minimal skincare brand concept with a product-led storefront.',
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
    showcaseDescription: 'A creative agency concept with an editorial approach to showcasing studio work.',
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

export const allProjects = [
  ...softwareProjects.map(project => ({ ...project, group: 'software' })),
  ...projects.map(project => ({
    ...project,
    group: 'web',
    overview: project.description,
    role: 'Web design and frontend development',
    links: [{ label: 'Live Demo', href: project.liveUrl }],
  })),
];

export const projectPath = project => `/work/${project.slug}`;

export const services = [
  { title: 'Ecommerce Experiences', preview: 'Ecommerce Website Design', text: 'Custom storefront interfaces, product presentation, responsive shopping journeys, and ecommerce frontend development.', detail: 'From the first collection view to the product details, every screen should feel like part of the same brand.' },
  { title: 'Business & Brand Websites', preview: 'Business & Brand Websites', text: 'Modern websites that communicate brand identity and services.', detail: 'A clear structure, expressive design, and thoughtful calls to action help visitors understand what you do.' },
  { title: 'Creative Portfolios', preview: 'Creative Portfolio Websites', text: 'Distinctive portfolios for artists, photographers, studios, and independent professionals.', detail: 'A considered setting for your work, with editorial layouts that let your creative point of view come through.' },
  { title: 'Frontend Development & Redesign', preview: 'Frontend Development & Redesign', text: 'Improving websites through modern layouts, usability, responsiveness, and polished interactions.', detail: 'Bring a new design to life or give an existing interface a clearer, more cohesive experience across screen sizes.' },
];
