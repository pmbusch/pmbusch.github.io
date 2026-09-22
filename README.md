# pmbusch.github.io

Pablo Busch's academic website. A plain, custom-built Jekyll site (no theme gem),
built to run on GitHub Pages with no custom build pipeline — only the
`github-pages` gem and the plugins it whitelists (`jekyll-seo-tag`,
`jekyll-sitemap`, `jekyll-feed`).

## Structure

- `_config.yml` — site settings.
- `_data/` — all content: `profile.yml`, `research_lines.yml`, `publications.yml`, `courses.yml`.
- `_layouts/default.html`, `_includes/` — the single layout and its header/footer/head/publication-row partials.
- `assets/css/main.css`, `assets/js/main.js` — one stylesheet (CSS variables, dark mode via `prefers-color-scheme`), vanilla JS (nav toggle + publications filter).
- `index.html`, `research.html`, `publications.html`, `teaching.html`, `cv.html`, `contact.html` — the pages.
- `images/research/` — figures/photos for each research line (see TODOs in `_data/research_lines.yml`).
- `files/Resume_Busch.pdf` — the CV; update by replacing this file, keeping the same name.

## Adding content

- **Publications**: add an entry to `_data/publications.yml` (see the schema comment at the top of the file).
- **Courses**: add an entry to `_data/courses.yml`.
- **Research line images**: drop a WebP file (max width 1600px) into `images/research/` and fill in the corresponding `image`, `image_alt`, `image_caption`, `image_credit` fields in `_data/research_lines.yml`.
- **Custom domain**: add a `CNAME` file at the repo root with the domain name — no URLs are hard-coded elsewhere (everything uses `site.url` / Jekyll's `relative_url`/`absolute_url` filters).

## Running locally

### Using Docker

```bash
docker compose up
```

Then visit `http://localhost:4000`.

### Using the VS Code Dev Container

Reopen the repository in the provided Dev Container (`.devcontainer/`); it forwards port 4000 automatically.

### Without Docker

Requires Ruby, Bundler, and Node (for native gem extensions):

```bash
bundle install
bundle exec jekyll serve -l -H localhost
```
