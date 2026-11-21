import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowUpRight, ArrowUp, Menu, X, Copy, Check, Asterisk } from 'lucide-react';
import { allProjects, contactProfiles, projectPath, projects, services, siteConfig, softwareProjects } from './data/siteConfig';
import PortfolioHome, { AboutCopy, Education, ProjectShowcase, SkillsTools, ZeroGhee } from './components/PortfolioHome';
import ProjectDetail from './components/ProjectDetail';

const emailHref = `mailto:${siteConfig.email}`;
const scrollBehavior = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
const pageMeta = {
  '/': [`${siteConfig.name} — ${siteConfig.title}`, siteConfig.introduction],
  '/work': ['Projects — Labib Hasan', 'Explore software, interactive experiences, and independent website concepts by LowkeyLabib.'],
  '/about': ['About — Labib Hasan', siteConfig.introduction],
  '/services': ['Services — Labib Hasan', 'Ecommerce experiences, brand websites, creative portfolios, and frontend development by Labib Hasan.'],
  '/contact': ['Contact — Labib Hasan', 'Contact Labib Hasan to discuss a software, interactive experience, or web project.'],
};

function PageEffects() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    const pagePath = pathname.replace(/\/+$/, '') || '/';
    const project = allProjects.find(item => projectPath(item) === pagePath);
    const [title, description] = project
      ? [`${project.name} — Project | ${siteConfig.name}`, project.showcaseDescription ?? project.description]
      : pageMeta[pagePath] ?? ['Page not found — Labib Hasan', 'Find your way back to the work of Labib Hasan.'];
    document.title = title;
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content = title;
    document.querySelector('meta[property="og:description"]').content = description;
    const focusDestination = !first.current;
    first.current = false;
    const frame = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : null;
      if (focusDestination) {
        const destination = target ?? document.getElementById('main-content');
        if (destination && !destination.hasAttribute('tabindex')) destination.tabIndex = -1;
        destination?.focus({ preventScroll: true });
      }
      if (target) target.scrollIntoView({ behavior: scrollBehavior() });
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
    <Link className="wordmark" to="/" aria-label="LowkeyLabib home">{siteConfig.handle}<span>.</span></Link>

    <button id="menu-toggle" className="menu-toggle icon-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="site-nav" className={`navigation ${open ? 'is-open' : ''}`} aria-label="Main navigation">
      {['Work', 'About', 'Services', 'Contact'].map(label => <NavLink key={label} to={`/${label.toLowerCase()}`} onClick={() => setOpen(false)}>{label}</NavLink>)}
    </nav>
  </header>;
}

function ContactCTA() {
  return (
    <section className="contact-cta shell" id="contact" aria-labelledby="contact-heading" data-reveal>
      <div>
        <h2 id="contact-heading">Contact</h2>
        <p>Have a project in mind? Let’s talk.</p>
      </div>
      <div className="contact-cta-actions">
        <a className="text-link" href={emailHref}>{siteConfig.email}</a>
        <Link className="button button-accent" to="/contact">Send an inquiry</Link>
      </div>
    </section>
  );
}


function Footer() {
  const socialLinks = [...contactProfiles, ...siteConfig.socialLinks];
  return <footer className="footer shell"><div className="footer-top"><div><Link className="wordmark" to="/">{siteConfig.handle}<span>.</span></Link><p>{siteConfig.title}</p></div><a className="footer-email" href={emailHref}>{siteConfig.email}<ArrowUpRight size={17} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}</span><div className="socials">{socialLinks.map(s => <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.label} <ArrowUpRight size={13} /></a>)}</div><button className="text-link" onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}>Back to top <ArrowUp size={15} /></button></div></footer>;
}

function Home() {
  return <PortfolioHome contact={<ContactCTA />} />;
}


function PageIntro({ label, children, text }) {
  return <div className="page-intro shell"><span className="eyebrow">{label}</span><h1>{children}</h1>{text && <p>{text}</p>}</div>;
}

function Work() {
  return (
    <>
      <PageIntro label={siteConfig.handle} text="Selected software, interactive experiences, and websites.">
        Projects<span className="accent">.</span>
      </PageIntro>
      <section className="portfolio-section shell" id="software-list" aria-labelledby="software-list-title">
        <header className="portfolio-section-heading"><h2 id="software-list-title">Software Projects</h2></header>
        <ProjectShowcase items={softwareProjects} />
      </section>
      <section className="portfolio-section shell" id="web-projects" aria-labelledby="web-projects-title">
        <header className="portfolio-section-heading">
          <div>
            <h2 id="web-projects-title">Web Design &amp; Development</h2>
            <p>Independent concept websites created for this portfolio.</p>
          </div>
        </header>
        <ProjectShowcase items={projects} concept />
      </section>
      <ContactCTA />
    </>
  );
}

function About() {
  return (
    <>
      <PageIntro label={siteConfig.handle}>About <span className="accent">Labib.</span></PageIntro>
      <section className="about-detail shell"><AboutCopy /><Education /></section>
      <section className="portfolio-section shell" aria-label="ZeroGhee"><ZeroGhee /></section>
      <section className="portfolio-section shell" aria-labelledby="about-skills-title">
        <header className="portfolio-section-heading"><h2 id="about-skills-title">Skills &amp; Tools</h2></header>
        <SkillsTools />
      </section>
      <ContactCTA />
    </>
  );
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
  return <><PageIntro label="GOOD THINGS START WITH A CONVERSATION">LET'S CREATE<br />SOMETHING<br /><span className="accent">GREAT.</span></PageIntro><section className="contact-grid shell"><div className="contact-details"><h2>Have a project in mind?</h2><p>Tell me a little about what you're planning. A fresh idea, a website redesign, or something you haven't quite figured out yet.</p><a className="contact-email" href={emailHref}>{siteConfig.email}<ArrowUpRight size={20} /></a><button className="text-link" onClick={copyEmail}>{copyStatus === 'Email copied.' ? <Check size={16} /> : <Copy size={16} />} Copy email address</button><p className="form-status" role="status">{copyStatus}</p><div className="contact-profiles">{contactProfiles.map(profile => <a className="text-link portfolio-section-link" key={profile.label} href={profile.url} target="_blank" rel="noopener noreferrer">{profile.label}<span className="sr-only"> (opens in a new tab)</span></a>)}</div><div className="contact-note"><Asterisk size={34} /><p>A thoughtful website starts<br />with understanding your idea.</p></div></div><form onSubmit={submit} className="inquiry-form"><div className="form-pair"><label>Your name <span>*</span><input name="name" autoComplete="name" placeholder="Your name" required maxLength={100} /></label><label>Email address <span>*</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label></div><div className="form-pair"><label>Project type <span>*</span><select name="type" defaultValue={initialType} required><option value="" disabled>Select a service</option>{services.map(s => <option key={s.title}>{s.title}</option>)}<option>Something else</option></select></label><label>Budget range <span className="optional">(optional)</span><select name="budget" defaultValue=""><option value="">Select a range (USD)</option><option>Under $500</option><option>$500–$1,500</option><option>$1,500–$3,000</option><option>$3,000+</option><option>Let's discuss</option></select></label></div><label>A little about your project <span>*</span><textarea name="description" placeholder="What are you looking to create? Share your goals, ideas, and timeline." rows={5} required maxLength={3000} /></label><div className="form-bottom"><p>Opens your email app with a draft.<br />You review and send it from there.</p><button type="submit" className="button button-accent">Send Inquiry <ArrowUpRight size={18} /></button></div><p className="form-status" role="status">{formStatus}</p></form></section></>;
}

function NotFound() {
  return <section className="not-found shell"><span className="eyebrow">404 / A WRONG TURN</span><h1>OFF THE<br /><span className="accent">GRID.</span></h1><p>This page doesn't exist. Let's get you back to something worth exploring.</p><Link className="button button-accent" to="/">Back to home <ArrowUpRight size={18} /></Link></section>;
}

export default function App() {
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content" tabIndex={-1}><Routes><Route path="/" element={<Home />} /><Route path="/work" element={<Work />} />{allProjects.map(project => <Route key={project.slug} path={projectPath(project)} element={<ProjectDetail key={project.slug} project={project} />} />)}<Route path="/about" element={<About />} /><Route path="/services" element={<Services />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /><PageEffects /></>;
}
