# vikramrathour.com

Personal site for Vikram Rathour. Enterprise data and AI architecture.

Static HTML. No build step, no framework, no package manager. Every page is a
single self-contained file. The only external request is the Google Fonts
stylesheet for IBM Plex Sans and IBM Plex Mono.

## Contents

| File | What it is |
|------|------------|
| `index.html` | The main site. Hero, thesis, approach, **engagements**, impact, work, point of view, builds, signature project, writing, contact. The only page meant to be shared as the primary link. |
| `blueprint.html` | The consolidated report. Seven decisions between a pilot and a business result, phased pre-pilot, pilot-to-production and in-production. Every statistic carries a source and a date. Links out to the three papers as deep dives. |
| `judgment-room.html` | Interactive. Five anonymised enterprise dilemmas. The visitor picks, then sees what actually happened. |
| `wisdom-loop.html` | Interactive. The architecture as a six-stage cycle: Data, Information, Knowledge, Wisdom, Inference, Decision, looping back. |
| `architecture.svg` | Standalone printable diagram of the same architecture. Drop into a deck as is. |
| `enterprise-model-stack.html` | Technical paper. How a model is built and how a system stays loosely coupled to one that changes underneath it. |
| `model-architecture.html` | Technical paper. Eighteen open models and eight closed, compared on the same axis, with a monthly cost model. |
| `multi-agent-enterprise.html` | Technical paper. What happens when three tiers of the enterprise stack go agentic at once. |
| `vercel.json` | Vercel config. Security headers, clean URLs. |
| `netlify.toml` | Netlify config. Kept so either host works. Harmless on Vercel. |
| `robots.txt` | Search engine directives. **Read the note at the top of this file before going live.** |
| `sitemap.xml` | Page list for search engines. Needs your domain filled in. |
| `blog/index.html` | The Writing landing page. All seven essays, newest first, with the latest as a lead card. |
| `blog/*.html` | Seven essays migrated from the WordPress blog as static pages, in the same design system as the rest of the site. |
| `.gitignore` | Editor, OS and deployment noise. |

## Before you deploy: three placeholders to replace

Search the whole folder for `REPLACE-WITH-YOUR-DOMAIN` and substitute your real
domain, without a trailing slash. It appears in:

1. `robots.txt`, one occurrence, in the sitemap line.
2. `sitemap.xml`, seven occurrences.
3. Every `.html` file, in the `og:url` and `canonical` tags.

On macOS or Linux, from inside the folder:

```
grep -rl "REPLACE-WITH-YOUR-DOMAIN" . | xargs sed -i '' 's|REPLACE-WITH-YOUR-DOMAIN|yourdomain.com|g'
```

Drop the `''` after `-i` on Linux. Leaving the placeholder in does not break the
site, but link previews on LinkedIn will point nowhere.

## Do you want this indexed yet?

`robots.txt` currently allows all search engines. If you are still deciding how
to present availability, open `robots.txt` and swap `Allow: /` for
`Disallow: /`. That keeps the site reachable by anyone you send the link to
while keeping it out of search results. Change it back when you are ready.

## Putting it on GitHub

```
cd path/to/this/folder
git init
git add .
git commit -m "Personal site"
git branch -M main
git remote add origin https://github.com/vikramrathour/YOUR-REPO-NAME.git
git push -u origin main
```

Create the empty repository on github.com first, without a README or a
`.gitignore`, since this folder already has both.

If you prefer not to use the command line: create the repository on github.com,
click **uploading an existing file**, and drag every file in. Include the
hidden `.gitignore`; on macOS press Cmd, Shift and full stop in Finder to see it.

## Deploying from GitHub to Vercel

1. Sign in at vercel.com with your GitHub account.
2. **Add New**, then **Project**, then import the repository.
3. Framework preset: **Other**. Leave the build command empty. Leave the output
   directory empty. `vercel.json` handles the rest.
4. Deploy. Every push to `main` now redeploys automatically.

To attach your domain: **Settings**, then **Domains**, add the bare domain and
the `www` version, redirect `www` to the bare domain, and add the two DNS
records Vercel shows you at your registrar.

## How the pages link together

`index.html` is the entry point, with four internal routes:

- The Point of View section leads with `blueprint.html`, the three papers below
  it as deep dives, tagged by buyer decision.
- The Work section links into `judgment-room.html` and `architecture.svg`.
- The Thesis section links into `wisdom-loop.html`.
- Blueprint sits in the top navigation.

`blueprint.html` links out to all five other pages from whichever section is
relevant, so a reader who wants depth on data readiness lands on the wisdom
loop and one who wants architecture lands on the model stack.

All pages link back to `index.html` in the top-left corner.

**Links are relative filenames.** Every content file must sit at the repository
root, with the single exception of the `blog/` folder, which must be kept as a
folder called exactly `blog` at the root. The essays link back out with `../`,
so renaming or nesting it will break them.

## About the blog

The seven essays under `blog/` were migrated from `rathourvikram.wordpress.com`.
Two things to know:

- **Images are still hosted on WordPress.com.** Each essay references images at
  `rathourvikram.wordpress.com/wp-content/uploads/...`. That account has to keep
  existing for those images to load, even on the free plan. Do not delete it. To
  cut the dependency, download the sixteen images, put them in `blog/img/`, and
  update the `src` attributes.
- **Old links still point at WordPress.** Anything shared on LinkedIn previously
  goes to the WordPress URLs. Each essay carries a link back to its original at
  the bottom. If you want the old links to land here instead, set up redirects on
  the WordPress side, which works on the free plan.
- Adding a new essay means writing an HTML file by hand and pushing it. There is
  no CMS. Copy an existing essay, replace the body, and add a card to
  `blog/index.html` and to the Writing section of `index.html`.

## Maintenance notes

- The evidence in `blueprint.html` is dated to September 2026. The regulatory
  dates in section 04 will move; the EU AI Act Chapter III deadlines were
  already deferred once, in July 2026. Every figure carries a source and a date
  in the page, so replace the figure and the date together.
- Accessibility: all text meets WCAG AA contrast. The site respects
  `prefers-reduced-motion`, which disables reveal animations, tilt and smooth
  scrolling. Interactive elements are keyboard reachable.
- The Engagements section uses a horizontal swipe row on phones, because the
  slides are a fixed one screen tall and three stacked cards would clip.
- En dashes appear in numeric ranges inside the technical papers, such as
  `4–8×` and `$5–6M`. That is correct typography for a range and is deliberate.
  There are no em dashes anywhere in the site.

## Rights

No licence file is included, so default copyright applies and all rights are
reserved. That is intentional. The technical papers are the author's work and
are published for reading, not reuse.
