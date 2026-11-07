import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, ArrowUp, ArrowRight, Menu, X, Copy, Check, Asterisk, Github } from 'lucide-react';
import { projects, services, siteConfig } from './data/siteConfig';

const imageAssets = import.meta.glob('/public/projects/*.webp', { eager: true, query: '?url', import: 'default' });
const emailHref = `mailto:${siteConfig.email}`;
const scrollBehavior = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
const pageMeta = {
  '/': ['Labib Hasan — Independent Web Designer & Developer', 'Independent web designer and developer crafting distinctive websites for brands, businesses, and creative minds.'],
  '/work': ['Selected Work — Labib Hasan', 'Explore NOIR, AURA, and FRAMEWORK: three independent design and frontend development concepts.'],
  '/about': ['About — Labib Hasan', 'The person behind the pixels. Meet independent web designer and developer Labib Hasan.'],
  '/services': ['Services — Labib Hasan', 'Ecommerce experiences, brand websites, creative portfolios, and frontend development by Labib Hasan.'],
  '/contact': ['Contact — Labib Hasan', 'Have a website in mind? Contact Labib Hasan to discuss your design and development project.'],
};

function PageEffects() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    const project = projects.find(p => pathname === `/work/${p.slug}`);
    const [title, description] = project ? [`${project.name} — Case Study | Labib Hasan`, project.description] : pageMeta[pathname] || ['Page not found — Labib Hasan', 'Find your way back to the work of Labib Hasan.'];
    document.title = title;
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content = title;
    document.querySelector('meta[property="og:description"]').content = description;
    if (!first.current) document.getElementById('main-content')?.focus({ preventScroll: true });
    first.current = false;
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: scrollBehavior() });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => cancelAnimationFrame(frame);
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(el => { el.classList.add('reveal-ready'); observer.observe(el); });
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [pathname, hash]);
  return null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const escape = e => { if (e.key === 'Escape' && open) { setOpen(false); document.getElementById('menu-toggle')?.focus(); } };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);
  return <header className="site-header shell">
    <Link className="wordmark" to="/" aria-label="Labib home">LABIB<span>.</span></Link>
    <span className="header-caption">INDEPENDENT BY DESIGN.</span>
    <button id="menu-toggle" className="menu-toggle icon-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="site-nav" className={`navigation ${open ? 'is-open' : ''}`} aria-label="Main navigation">
      {['Work', 'About', 'Services', 'Contact'].map(label => <NavLink key={label} to={`/${label.toLowerCase()}`} onClick={() => setOpen(false)}>{label}{label === 'Contact' && <ArrowUpRight size={15} />}</NavLink>)}
    </nav>
  </header>;
}

function ExternalLink({ project, children = 'Visit Live Website', className = 'text-link' }) {
  return <a className={className} href={project.liveUrl} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={18} /></a>;
}

function Mockup({ project, mobile = false }) {
  return <div className={`mock-browser ${project.slug} ${mobile ? 'mobile-browser' : ''}`} role="img" aria-label={`Illustrative ${mobile ? 'mobile' : 'desktop'} layout concept for ${project.name}; not an actual website screenshot`}>
    <div className="browser-bar"><span><i /><i /><i /></span><span>{project.name.toLowerCase()} / concept preview</span><span>↗</span></div>
    <div className="mock-page" aria-hidden="true">
      <div className="mock-nav"><b>{project.name}{project.slug === 'framework' ? '®' : ''}</b><span>{project.slug === 'aura' ? 'THE DAILY RITUAL' : project.slug === 'noir' ? 'NEW SEASON / 2026' : 'INDEPENDENT CREATIVE STUDIO'}</span><span>MENU +</span></div>
      {project.slug === 'noir' && <><div className="noir-heading">NOT FOR<br /><em>EVERYONE.</em></div><div className="noir-collection"><div className="noir-art"><div className="garment" /><span>01 — THE EVERYDAY UNIFORM</span></div><div className="noir-side"><span>LESS NOISE.<br />MORE PRESENCE.</span><div className="noir-orbit" /><span>EXPLORE THE COLLECTION ↗</span></div></div></>}
      {project.slug === 'aura' && <div className="aura-composition"><div className="aura-copy"><span>SKINCARE, SIMPLIFIED.</span><h3>A little care.<br /><em>A natural glow.</em></h3><p>Make room for your daily ritual.</p><span className="mock-link">DISCOVER AURA ↗</span></div><div className="bottle-scene"><div className="bottle bottle-small"><span>AURA<br /><small>DAILY CARE</small></span></div><div className="bottle bottle-large"><span>AURA<br /><small>THE DAILY RITUAL<br />50 ml</small></span></div><div className="aura-disc" /></div></div>}
      {project.slug === 'framework' && <><div className="framework-heading">IDEAS INTO<br /><span>IMPACT.</span></div><div className="framework-stage"><div className="frame-shape" /><div className="framework-label">STRATEGY.<br />CULTURE.<br />CREATIVE.<ArrowUpRight /></div></div><div className="mock-bottom"><span>A DIFFERENT FRAME OF MIND.</span><span>SELECTED WORK ↗</span></div></>}
    </div>
  </div>;
}

function ProjectPreview({ project, mobile = false }) {
  const path = mobile ? project.mobileImage : project.desktopImage;
  const source = imageAssets[`/public${path}`];
  const [failed, setFailed] = useState(false);
  return <figure className={`project-preview preview-${project.slug} ${mobile ? 'is-mobile' : ''}`}>
    <div className="preview-stage">{source && !failed ? <img src={source} alt={`${project.name} ${mobile ? 'mobile' : 'desktop'} website preview`} loading="lazy" onError={() => setFailed(true)} /> : <Mockup project={project} mobile={mobile} />}</div>
    <figcaption><span>{source && !failed ? 'PROJECT PREVIEW' : 'ILLUSTRATIVE LAYOUT CONCEPT'}</span><span>{mobile ? 'MOBILE' : 'DESKTOP'} <ArrowUpRight size={12} /></span></figcaption>
  </figure>;
}

function ProjectCard({ project }) {
  return <article className={`project-card card-${project.slug}`} data-reveal>
    <Link className="preview-link" to={`/work/${project.slug}`} aria-label={`View ${project.name} case study`}><ProjectPreview project={project} /><span className="preview-open"><ArrowUpRight /><span>VIEW PROJECT</span></span></Link>
    <div className="project-title-row"><div><span className="eyebrow muted">{project.number} / {project.category}</span><h3><Link to={`/work/${project.slug}`}>{project.name}</Link></h3></div><span className="project-year">2026</span></div>
    <p className="project-description">{project.description}</p>
    <div className="tags">{project.technologies.map(t => <span key={t}>{t}</span>)}</div>
    <div className="project-actions"><Link className="text-link" to={`/work/${project.slug}`}>View Case Study <ArrowRight size={17} /></Link><ExternalLink project={project} /></div>
    <p className="concept-note">Independent portfolio concept</p>
  </article>;
}

function ContactCTA() {
  return <section className="contact-cta shell" data-reveal><div className="eyebrow"><span className="status-dot" /> YOUR NEXT CHAPTER</div><Link to="/contact" className="contact-heading"><h2>HAVE SOMETHING<br />IN MIND<span>?</span></h2><span className="cta-circle"><ArrowUpRight /></span></Link><div className="contact-cta-bottom"><p>Let's build something worth remembering.</p><Link className="text-link" to="/contact">Start a conversation <ArrowUpRight size={18} /></Link></div></section>;
}

function Footer() {
  const socialLinks = [...(siteConfig.github ? [{ label: 'GitHub', url: siteConfig.github }] : []), ...siteConfig.socialLinks];
  return <footer className="footer shell"><div className="footer-top"><div><Link className="wordmark" to="/">LABIB<span>.</span></Link><p>{siteConfig.title}</p></div><a className="footer-email" href={emailHref}>{siteConfig.email}<ArrowUpRight size={17} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}</span><div className="socials">{socialLinks.map(s => <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.label} <ArrowUpRight size={13} /></a>)}</div><button className="text-link" onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}>Back to top <ArrowUp size={15} /></button></div></footer>;
}

function Home() {
  return <><section className="hero shell"><div className="hero-kicker eyebrow"><span>LABIB HASAN — DESIGNER & DEVELOPER</span><span className="hero-index">PORTFOLIO / 2026</span></div><div className="hero-title-wrap"><h1 className="hero-title">DESIGNING<br />DIGITAL<br /><span>EXPERIENCES</span><br /><span className="last-line">THAT STAND OUT.</span></h1><Asterisk className="hero-asterisk" strokeWidth={1.2} aria-hidden="true" /></div><div className="hero-bottom"><a href="#selected-work" className="scroll-indicator" aria-label="Scroll to selected work"><ArrowDown size={22} /><span>SCROLL TO EXPLORE</span></a><div className="hero-intro"><p>Independent web designer and developer crafting distinctive websites for brands, businesses, and creative minds.</p><div className="flex flex-wrap gap-6 items-center"><Link to="/work" className="button button-accent">View My Work <ArrowUpRight size={18} /></Link><Link to="/contact" className="text-link">Let's Talk <ArrowUpRight size={18} /></Link></div></div></div></section>
    <section id="selected-work" className="work-section light-section"><div className="shell"><div className="section-heading" data-reveal><div><span className="eyebrow">01 / SELECTED WORK</span><h2>Ideas made<br /><span className="serif">tangible.</span></h2></div><p>Three independent concepts.<br />Three distinct points of view.</p></div><div className="project-grid">{projects.map(project => <ProjectCard key={project.slug} project={project} />)}</div><Link to="/work" className="text-link all-work">Explore all work <ArrowUpRight size={18} /></Link></div></section>
    <section className="about-preview shell" data-reveal><div className="eyebrow">02 / A LITTLE ABOUT ME</div><div className="about-preview-grid"><div><h2>THE PERSON<br />BEHIND THE<br /><span className="accent">PIXELS.</span></h2><div className="pixel-motif" aria-hidden="true"><span /><span /><span /><span /><span /></div></div><div className="about-copy"><p>{siteConfig.introduction}</p><p className="muted">A thoughtful balance of how it looks, how it feels, and how it works.</p><Link to="/about" className="text-link">More about me <ArrowUpRight size={18} /></Link></div></div></section>
    <section className="services-preview shell"><div className="section-heading" data-reveal><div><span className="eyebrow">03 / WHAT I CAN HELP WITH</span><h2>Good design.<br /><span className="serif">Built right.</span></h2></div><Link className="text-link" to="/services">Explore services <ArrowUpRight size={18} /></Link></div><div>{services.map((service, i) => <Link to="/services" className="service-row" key={service.title} data-reveal><span className="eyebrow muted">0{i + 1}</span><h3>{service.preview}</h3><ArrowUpRight /></Link>)}</div></section><ContactCTA /></>;
}

function PageIntro({ label, children, text }) {
  return <div className="page-intro shell"><span className="eyebrow">{label}</span><h1>{children}</h1>{text && <p>{text}</p>}</div>;
}

function Work() {
  return <><PageIntro label="THE PORTFOLIO / 2026" text="Independent concepts exploring the intersection of distinctive design and thoughtful frontend development.">SELECTED<br /><span className="accent">WORK.</span></PageIntro><section className="light-section work-section"><div className="shell"><p className="work-disclosure">All three projects are independent portfolio concepts, not commissioned client work.</p><div className="project-grid">{projects.map(project => <ProjectCard key={project.slug} project={project} />)}</div></div></section><ContactCTA /></>;
}

function CaseStudy({ project }) {
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return <><section className={`case-hero shell case-${project.slug}`}><Link to="/work" className="text-link back-link"><ArrowRight className="rotate-180" size={16} /> All work</Link><div className="eyebrow">{project.number} / INDEPENDENT PORTFOLIO CONCEPT</div><h1>{project.name}</h1><div className="case-meta"><span>{project.category}</span><span>{project.year}</span><ExternalLink project={project} /></div><ProjectPreview project={project} /></section><section className="case-body shell"><div className="case-overview" data-reveal><h2>THE OVERVIEW</h2><div><p className="large-copy">{project.description}</p><p className="muted">An independent concept project, created for this portfolio. Not paid client work.</p><div className="tags">{project.technologies.map(t => <span key={t}>{t}</span>)}</div>{project.repositoryUrl && <a className="text-link" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer"><Github size={18} /> View repository <ArrowUpRight size={17} /></a>}</div></div><div className="case-columns"><div data-reveal><span className="eyebrow muted">01 / THE INTENTION</span><h2>Design objectives</h2><p>{project.objective}</p></div><div data-reveal><span className="eyebrow muted">02 / THE DIRECTION</span><h2>Creative approach</h2><p>{project.approach}</p></div></div><div className="case-feature-grid"><div data-reveal><span className="eyebrow muted">03 / THE EXPERIENCE</span><h2>Designed to be used.</h2><ul className="feature-list">{project.features.map((feature, i) => <li key={feature}><span>0{i + 1}</span>{feature}<ArrowUpRight size={17} /></li>)}</ul></div><ProjectPreview project={project} mobile /></div><div className="case-overview outcome" data-reveal><h2>THE OUTCOME</h2><div><p className="large-copy">{project.outcome}</p><ExternalLink project={project} className="button button-accent" /></div></div></section><Link className="next-project shell" to={`/work/${next.slug}`}><div><span className="eyebrow">UP NEXT / {next.category}</span><h2>{next.name}</h2></div><ArrowUpRight /></Link></>;
}

function About() {
  return <><PageIntro label="THE PERSON BEHIND THE PIXELS" text={siteConfig.introduction}>CREATIVE MIND.<br /><span className="accent">DEVELOPER</span><br />AT HEART.</PageIntro><section className="about-detail shell"><div className="type-portrait" aria-label="Typographic artwork: Labib, design and development"><span className="eyebrow">DESIGN × DEVELOPMENT</span><span className="type-initials">L<span>H</span><i>.</i></span><span className="eyebrow">LABIB HASAN / INDEPENDENT</span></div><div className="philosophy"><div data-reveal><span className="eyebrow muted">01 / MY PHILOSOPHY</span><h2>Make it distinctive.<br />Keep it useful.</h2><p>I'm interested in the space where visual design meets everyday interaction. A website should have a point of view, and it should make finding information and taking the next step feel natural.</p></div><div data-reveal><span className="eyebrow muted">02 / MY APPROACH</span><h2>Thoughtful from<br />layout to last detail.</h2><p>I approach a website as a connected experience: structure first, then typography, visual direction, and responsive development. Small details—spacing, navigation, and interaction—help bring the whole experience together.</p></div></div></section><section className="technology-section shell" data-reveal><span className="eyebrow">03 / TECHNOLOGIES I USE</span><h2>A modern toolkit.<br /><span className="serif">A considered approach.</span></h2><div className="technology-list">{siteConfig.technologies.map(t => <span key={t}>{t}</span>)}</div></section><ContactCTA /></>;
}

function Services() {
  return <><PageIntro label="DESIGN & DEVELOPMENT" text="Distinctive websites, shaped around your brand, your work, and the people you want to reach.">YOUR VISION.<br /><span className="accent">BROUGHT TO LIFE.</span></PageIntro><section className="service-details shell">{services.map((service, i) => <article className="service-detail" key={service.title} data-reveal><span className="eyebrow muted">0{i + 1} / SERVICE</span><div><h2>{service.title}</h2><p className="large-copy">{service.text}</p><p className="muted">{service.detail}</p><Link className="text-link" to={`/contact?type=${encodeURIComponent(service.title)}`}>Let's discuss your project <ArrowUpRight size={18} /></Link></div></article>)}</section><ContactCTA /></>;
}

function Contact() {
  const location = useLocation();
  const [copyStatus, setCopyStatus] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const selectedType = new URLSearchParams(location.search).get('type');
  const initialType = services.some(s => s.title === selectedType) ? selectedType : '';
  async function copyEmail() {
    try { await navigator.clipboard.writeText(siteConfig.email); setCopyStatus('Email copied.'); }
    catch { setCopyStatus(`Copy this address: ${siteConfig.email}`); }
  }
  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Project inquiry: ${form.get('type')} — ${form.get('name').trim()}`;
    const body = `Hi Labib,\n\nName: ${form.get('name').trim()}\nEmail: ${form.get('email').trim()}\nProject type: ${form.get('type')}\nBudget: ${form.get('budget') || 'Not specified'}\n\nProject description:\n${form.get('description').trim()}\n\nThanks,\n${form.get('name').trim()}`;
    window.location.href = `${emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormStatus('Your email app has been requested. Review and send the draft there. If it did not open, copy the email address and send your inquiry directly.');
  }
  return <><PageIntro label="GOOD THINGS START WITH A CONVERSATION">LET'S CREATE<br />SOMETHING<br /><span className="accent">GREAT.</span></PageIntro><section className="contact-grid shell"><div className="contact-details"><h2>Have a project in mind?</h2><p>Tell me a little about what you're planning. A fresh idea, a website redesign, or something you haven't quite figured out yet.</p><a className="contact-email" href={emailHref}>{siteConfig.email}<ArrowUpRight size={20} /></a><button className="text-link" onClick={copyEmail}>{copyStatus === 'Email copied.' ? <Check size={16} /> : <Copy size={16} />} Copy email address</button><p className="form-status" role="status">{copyStatus}</p><div className="contact-note"><Asterisk size={34} /><p>A thoughtful website starts<br />with understanding your idea.</p></div></div><form onSubmit={submit} className="inquiry-form"><div className="form-pair"><label>Your name <span>*</span><input name="name" autoComplete="name" placeholder="Your name" required maxLength={100} /></label><label>Email address <span>*</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label></div><div className="form-pair"><label>Project type <span>*</span><select name="type" defaultValue={initialType} required><option value="" disabled>Select a service</option>{services.map(s => <option key={s.title}>{s.title}</option>)}<option>Something else</option></select></label><label>Budget range <span className="optional">(optional)</span><select name="budget" defaultValue=""><option value="">Select a range (USD)</option><option>Under $500</option><option>$500–$1,500</option><option>$1,500–$3,000</option><option>$3,000+</option><option>Let's discuss</option></select></label></div><label>A little about your project <span>*</span><textarea name="description" placeholder="What are you looking to create? Share your goals, ideas, and timeline." rows={5} required maxLength={3000} /></label><div className="form-bottom"><p>Opens your email app with a draft.<br />You review and send it from there.</p><button type="submit" className="button button-accent">Send Inquiry <ArrowUpRight size={18} /></button></div><p className="form-status" role="status">{formStatus}</p></form></section></>;
}

function NotFound() {
  return <section className="not-found shell"><span className="eyebrow">404 / A WRONG TURN</span><h1>OFF THE<br /><span className="accent">GRID.</span></h1><p>This page doesn't exist. Let's get you back to something worth exploring.</p><Link className="button button-accent" to="/">Back to home <ArrowUpRight size={18} /></Link></section>;
}

export default function App() {
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content" tabIndex={-1}><Routes><Route path="/" element={<Home />} /><Route path="/work" element={<Work />} />{projects.map(project => <Route key={project.slug} path={`/work/${project.slug}`} element={<CaseStudy key={project.slug} project={project} />} />)}<Route path="/about" element={<About />} /><Route path="/services" element={<Services />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /><PageEffects /></>;
}
