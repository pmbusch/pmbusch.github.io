# pmbusch.github.io

Pablo Busch's academic website. A plain, custom-built Jekyll site (no theme gem),
built to run on GitHub Pages with no custom build pipeline — only the
`github-pages` gem and the plugins it whitelists (`jekyll-seo-tag`,
`jekyll-sitemap`, `jekyll-feed`).

## Structure

- `_config.yml` — site settings (title, description, Google Analytics ID, plugins).
- `_data/` — all content: `profile.yml`, `research_lines.yml`, `publications.yml`, `courses.yml`.
- `_layouts/default.html`, `_includes/` — the single layout and its header/footer/head/publication-row partials.
- `assets/css/main.css`, `assets/js/main.js` — one stylesheet (CSS variables, dark mode via `prefers-color-scheme`), vanilla JS (nav toggle + publications filter).
- `index.html`, `research.html`, `publications.html`, `teaching.html`, `cv.html`, `contact.html` — the pages.
- `images/research/` — figures/photos for each research line (see TODOs in `_data/research_lines.yml`).
- `files/Resume_Busch.pdf` — the CV; update by replacing this file, keeping the same name.

## Which file to edit, per page

Most day-to-day edits are content changes in `_data/*.yml`, not the `.html` page
files — those mostly just control layout and rarely need to change.

| I want to change... | Edit this |
|---|---|
| My bio, title, photo, or social links (Home) | `_data/profile.yml` (and `index.html` if you want to reword the bio paragraph itself — it's written directly in that file, not pulled from data) |
| The 4 research-line names/descriptions/colors, or their images | `_data/research_lines.yml` |
| The long-form write-up on the Research page | `research.html` (the prose for each line lives directly in that file, inside a `{% case line.id %}` block) |
| A publication (add/edit/remove, mark as "selected" for the homepage) | `_data/publications.yml` |
| A course (add/edit/remove) | `_data/courses.yml` |
| The CV file itself | replace `files/Resume_Busch.pdf`, same filename — no other file needs to change |
| The CV page's summary bullets | `cv.html` |
| The Join & Contact page text | `contact.html` |
| The header/nav links | `_includes/nav.html` |
| The footer | `_includes/footer.html` |
| Colors, spacing, fonts, layout | `assets/css/main.css` |
| Page `<title>`/meta description for SEO | the `description:` line in that page's front matter (top of each `.html` file) |
| Google Analytics ID (or turning it off) | `google_analytics:` in `_config.yml` — delete the line to disable |

## Adding content

- **Publications**: add an entry to `_data/publications.yml` (see the schema comment at the top of the file).
- **Courses**: add an entry to `_data/courses.yml`.
- **Research line images**: drop a WebP file (max width 1600px) into `images/research/` and fill in the corresponding `image`, `image_alt`, `image_caption`, `image_credit` fields in `_data/research_lines.yml`.
- **Custom domain**: add a `CNAME` file at the repo root with the domain name — no URLs are hard-coded elsewhere (everything uses `site.url` / Jekyll's `relative_url`/`absolute_url` filters).

## Running locally

This repo ships everything needed to preview the site with Docker — nothing else
to install. (Ruby/Jekyll and WSL are not currently set up on this machine, so
Docker is the path of least friction here.)

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows: requires WSL2, which the installer offers to set up for you — a reboot is typically needed the first time).
2. From the repo root, run:
   ```bash
   docker compose up
   ```
3. Visit `http://localhost:4000`. Editing any file triggers an automatic rebuild (a few seconds), just refresh the browser.

### Using the VS Code Dev Container

With Docker Desktop installed, reopen the repository in the provided Dev
Container (`.devcontainer/`) — VS Code will prompt automatically, or use
**F1 → Dev Containers: Reopen in Container**. Port 4000 is forwarded automatically.

### Without Docker

Requires Ruby, Bundler, and Node (for native gem extensions) installed directly:

```bash
bundle install
bundle exec jekyll serve -l -H localhost
```
