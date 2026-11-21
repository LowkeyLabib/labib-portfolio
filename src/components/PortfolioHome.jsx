import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'lucide-react';
import { projectPath, projects, siteConfig, softwareProjects } from '../data/siteConfig';

function PortfolioSection({ id, title, description, action, children }) {
  return (
    <section className="portfolio-section shell" id={id} aria-labelledby={`${id}-title`}>
      <header className="portfolio-section-heading" data-reveal>
        <div>
          <h2 id={`${id}-title`}>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

export function Education() {
  const { degree, university, expectedGraduation } = siteConfig.education;
  return (
    <div className="education-panel">
      <p className="portfolio-label">Education</p>
      <p className="education-degree">{degree}</p>
      <p>{university}</p>
      <p>Expected {expectedGraduation}</p>
    </div>
  );
}

export function TechnologyList({ items }) {
  return (
    <ul className="technology-list">
      {items.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}

export function AboutCopy() {
  return <div className="portfolio-bio">{siteConfig.about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>;
}

export function SkillsTools() {
  return (
    <div className="skills-groups" data-reveal>
      <div>
        <h3>Programming technologies</h3>
        <TechnologyList items={siteConfig.technologies} />
      </div>
      <div>
        <h3>Development tools</h3>
        <TechnologyList items={siteConfig.developerTools} />
      </div>
      <div>
        <h3>AI-assisted development</h3>
        <p>AI-assisted tools for exploring approaches, prototyping, and debugging.</p>
      </div>
    </div>
  );
}

export function ZeroGhee() {
  const psySim = softwareProjects.find(project => project.slug === 'psysim');

  return (
    <div className="team-panel" data-reveal>
      <div>
        <p className="portfolio-label">Independent development team</p>
        <h3>ZeroGhee</h3>
        <Link className="text-link portfolio-section-link" to={projectPath(psySim)}>Collaborative project: PsySim</Link>
      </div>
      <dl>
        <div><dt>Labib Hasan <span>(LowkeyLabib)</span></dt><dd>Frontend, UI/UX, Integration</dd></div>
        <div><dt>Faiaz Ul Islam <span>(FaiazEnd)</span></dt><dd>Backend, AI, Systems</dd></div>
      </dl>
    </div>
  );
}

export function ShowcasePreview({ screenshot }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="showcase-preview">
      {screenshot && !failed ? (
        <img src={screenshot.src} alt={screenshot.alt} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <div className="showcase-placeholder">
          <Image size={23} strokeWidth={1.4} aria-hidden="true" />
          <span>Project Preview Coming Soon</span>
        </div>
      )}
    </div>
  );
}

function ShowcaseCard({ project, concept = false }) {
  const links = concept ? [{ label: 'Live Demo', href: project.liveUrl }] : project.links;
  const tags = project.technologies ?? project.techniques;

  return (
    <article className="showcase-card" data-reveal>
      <ShowcasePreview screenshot={project.screenshot} />
      <div className="showcase-card-body">
        <div className="showcase-badges">
          <span className="showcase-category">{project.category}</span>
          {concept && <span className="showcase-concept">Concept website</span>}
        </div>
        <h3>{project.name}</h3>
        <p className="showcase-description">{concept ? project.showcaseDescription : project.description}</p>
        {project.collaboration && (
          <div className="showcase-credit">
            <p>{project.collaboration}</p>
            {project.role && <p><strong>My role:</strong> {project.role}</p>}
          </div>
        )}
        {!concept && tags?.length > 0 && (
          <TechnologyList items={tags} />
        )}
        <div className="showcase-links">
            {links?.map(({ label, href }) => (
              <a key={href} className="text-link portfolio-section-link" href={href} target="_blank" rel="noopener noreferrer">
                {label}<span className="sr-only"> for {project.name} (opens in a new tab)</span>
              </a>
            ))}
          <Link className="text-link" to={projectPath(project)}>
            {concept ? 'Case study' : 'Project details'}<span className="sr-only"> for {project.name}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProjectShowcase({ items, concept = false }) {
  return (
    <div className={`showcase-grid${concept ? ' showcase-grid-web' : ''}`}>
      {items.map(project => <ShowcaseCard key={project.slug} project={project} concept={concept} />)}
    </div>
  );
}

export default function PortfolioHome({ contact }) {
  return (
    <div className="portfolio-home">
      <section className="portfolio-hero shell" aria-labelledby="hero-heading">
        <div className="portfolio-hero-copy">
          <p className="portfolio-label hero-role">{siteConfig.title}</p>
          <h1 id="hero-heading">Hey, I'm Labib.</h1>
          <p className="hero-statement">I turn ideas into working software.</p>
          <p className="hero-description">{siteConfig.introduction}</p>
          <div className="portfolio-actions">
            <Link className="button button-accent" to="/#software-projects">Explore my work</Link>
            <Link className="button button-outline" to="/contact">Get in touch</Link>
          </div>
        </div>
        <div className="identity-plate" aria-hidden="true">
          <div className="plate-grid"><span className="plate-initials">LH<span className="plate-dot">.</span></span></div>
          <div className="plate-caption"><span>{siteConfig.handle}</span><span>Portfolio</span></div>
        </div>
      </section>

      <PortfolioSection id="software-projects" title="Featured Software Projects">
        <ProjectShowcase items={softwareProjects} />
      </PortfolioSection>

      <PortfolioSection
        id="selected-work"
        title="Web Design & Development"
        description="Three independent concept websites created for this portfolio without a client commission."
        action={<Link className="text-link portfolio-section-link" to="/work#web-projects">All web projects</Link>}
      >
        <ProjectShowcase items={projects} concept />
        <Link className="text-link portfolio-section-link web-services-link" to="/services">Explore web services</Link>
      </PortfolioSection>

      <PortfolioSection id="about-me" title="About Me">
        <div className="portfolio-about" data-reveal>
          <div>
            <AboutCopy />
            <Link className="text-link portfolio-section-link" to="/about">More about me</Link>
          </div>
          <Education />
        </div>
        <ZeroGhee />
      </PortfolioSection>

      <PortfolioSection id="skills-tools" title="Skills & Tools">
        <SkillsTools />
      </PortfolioSection>

      {contact}
    </div>
  );
}
