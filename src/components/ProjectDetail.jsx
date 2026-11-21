import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { allProjects, projectPath } from '../data/siteConfig';
import { ShowcasePreview, TechnologyList } from './PortfolioHome';

export default function ProjectDetail({ project }) {
  const isConcept = project.group === 'web';
  const related = allProjects.filter(item => item.group === project.group && item.slug !== project.slug);
  const backTo = isConcept ? '/work#web-projects' : '/work#software-list';

  return (
    <article className="project-detail shell">
      <header className="project-detail-header">
        <Link className="text-link portfolio-section-link" to={backTo}>
          <ArrowLeft size={16} aria-hidden="true" /> Back to Projects
        </Link>
        <div className="showcase-badges">
          <span className="showcase-category">{project.category}</span>
          {isConcept && <span className="showcase-concept">Independent concept website</span>}
          {project.year && <span className="showcase-concept">{project.year}</span>}
        </div>
        <h1>{project.name}</h1>
        <p className="large-copy">{project.showcaseDescription ?? project.description}</p>
        {project.links?.length > 0 && (
          <div className="portfolio-actions">
            {project.links.map(({ label, href }) => (
              <a className="button button-accent" key={href} href={href} target="_blank" rel="noopener noreferrer">
                {label}<ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        )}
      </header>

      <ShowcasePreview screenshot={project.screenshot} />

      <div className="project-detail-grid">
        <section>
          <h2>Overview</h2>
          <p>{project.overview}</p>
          {project.objective && <p>{project.objective}</p>}
          {project.approach && <p>{project.approach}</p>}
        </section>
        <section>
          <h2>My role</h2>
          {project.collaboration && <p>{project.collaboration}</p>}
          <p>{project.role ?? 'Contribution details are forthcoming.'}</p>
          {project.technologies?.length > 0 && (
            <div className="project-detail-stack">
              <h3>Technologies</h3>
              <TechnologyList items={project.technologies} />
            </div>
          )}
        </section>
      </div>
      <section className="project-detail-section">
        <h2>Key features</h2>
        <ul className="project-detail-features">
          {project.features.map(feature => <li key={feature}>{feature}</li>)}
        </ul>
        {project.outcome && <p>{project.outcome}</p>}
      </section>

      <section className="project-detail-section">
        <h2>Project gallery</h2>
        <div className="showcase-grid">
          {[0, 1].map(index => <ShowcasePreview key={index} screenshot={project.gallery?.[index]} />)}
        </div>
      </section>

      <section className="project-detail-section">
        <h2>Related projects</h2>
        <ul className="project-related">
          {related.map(item => (
            <li key={item.slug}>
              <Link to={projectPath(item)}>
                <div><strong>{item.name}</strong><span>{item.category}</span></div>
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
