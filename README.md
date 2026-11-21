# LowkeyLabib — Personal Portfolio

A responsive portfolio for Labib Hasan, built with React, Vite, JavaScript, Tailwind CSS, React Router, and Lucide. Includes seven project pages, about, services, contact, and a custom 404 page.

## Local development

```sh
npm install
npm run dev
```

Production: `npm run build`. Preview the build: `npm run preview`.

## Configuration

Edit `src/data/siteConfig.js` for identity, projects, and contact links. Set `siteConfig.linkedin` to a verified LinkedIn profile URL when available. The three website projects are independent concepts.

To replace a project's preview, put a real screenshot in `public/projects/` and set its `screenshot` to `{ src: '/projects/example.webp', alt: 'Describe the screen' }`. Add up to two additional screenshots in its `gallery` array using the same format. Empty slots and failed images show a placeholder.

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
