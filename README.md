# LABIB. — Personal Portfolio

A responsive editorial portfolio for Labib Hasan, built with React, Vite, JavaScript, Tailwind CSS, React Router, and Lucide. Includes work, three concept case studies, about, services, contact, and a custom 404 page.

## Local development

```sh
npm install
npm run dev
```

Production: `npm run build`. Preview the build: `npm run preview`.

## Configuration

Edit `src/data/siteConfig.js` for identity, email, projects, live links, and optional social/repository URLs. Unconfigured GitHub links stay hidden. All projects are explicitly independent portfolio concepts.

Project visuals are labeled CSS illustrations. To use real screenshots, add `noir-desktop.webp`, `noir-mobile.webp`, `aura-desktop.webp`, `aura-mobile.webp`, `framework-desktop.webp`, and `framework-mobile.webp` to `public/projects/`, then rebuild. Available assets are detected at build time; missing or failed images use the illustrations.

The contact form opens an encoded email draft using `mailto:`. Visitors must send it in their email app. No submissions are stored; there is no backend or environment configuration.

## Vercel

Import the `labib-portfolio` repository into Vercel. Select Vite, build command `npm run build`, output `dist`, and deploy. `vercel.json` handles SPA routes on refresh. No environment variables are needed.

## GitHub

Create an empty public repository named `labib-portfolio`, without a README or license. If no remote is configured, substitute your actual GitHub username and run:

```sh
git remote add origin https://github.com/YOUR_USERNAME/labib-portfolio.git
git push -u origin HEAD
```

If Git reports dubious ownership on this Windows checkout, prefix a Git command with `git -c safe.directory=C:/Users/labib.LABIB-DESKTOP/Documents/ChatGPT/Portfolio` in place of `git`.
