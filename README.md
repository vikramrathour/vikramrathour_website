# vikramrathour.com

Personal site for Vikram Rathour, forward-deployed AI consultant: embedded in a
client's team from strategy through production, then growing the solution with
richer context and evals after go-live.

Static HTML. No build step, no framework, no package manager. The only external
request is the Google Fonts stylesheet for Newsreader and Plus Jakarta Sans.

## Design system

The look is "Executive Editorial": warm stone paper (`#F7F6F2`), slate ink
(`#121A24`), a terracotta accent (`#C2633E`, darkened to `#9A4522` for small
text) and a sage secondary (`#2B5C57`). Newsreader carries headlines, quotes
and essay body text; Plus Jakarta Sans carries everything else.

| File | What it holds |
|------|---------------|
| `assets/site.css` | Tokens, type scale, nav, footer, buttons, cards, chips, reveal animation. Every page except the three papers loads it. |
| `assets/article.css` | Long-form reading styles for the blog index and the essays. |
| `assets/site.js` | Mobile menu, scroll reveal, active nav link, the 3D card tilt on the details page, filter chips. The book and the growth chart have their own script inside `index.html`. |
| `assets/brand/vr-logo.png` | The full VR logo (monogram, name, "Ideas · Insights · Experience · Impact"). Master file; the files below are cut from it. |
| `assets/logo-mark.png` | The VR monogram on a transparent background. Header on every page, and the "Back to site" pill on the papers. |
| `assets/logo-mark-light.png` | The same monogram in cream, for dark backgrounds: footer, essay bylines, portrait fallback. |
| `assets/favicon.png`, `assets/apple-touch-icon.png` | Browser tab and phone home-screen icons: the monogram on a cream tile. |
| `assets/icons/` | One 3D clay object per home page (3dicons, CC0, no attribution required; see `LICENSE.txt` there). To swap one, replace the PNG with a transparent 400px or larger render of the same name. |
| `assets/portrait.jpg` | Your portrait (3:4). Shown in an arched frame on the book cover (beside the title on desktop, above it on phones), as the round avatar on the "Let's talk" page and the details page contact card, and as the social share image. To replace it, overwrite this file; a 3:4 crop at least 900px wide works best. |

The header and footer are plain HTML repeated in each page, so a nav change
means editing each file. The three technical papers keep their own design and
only carry a small "Back to site" pill.

## Contents

| File | What it is |
|------|------------|
| `index.html` | The home page: a nine-page book you turn like a leaf (see **The home page book** below). The only page meant to be shared as the primary link. |
| `details.html` | The full 3D experience behind the home page's book: floating realm cards that tilt toward the cursor, parallax orbs, and the guided chapter reader (pivots, nine engagements, six outcomes, point of view, builds, CKDTracker), then working together and contact. Its hero and contact card use the same forward-deployed wording as the book. The book's "Read the detail" links open the matching chapter (`#work`, `#impact`, `#builds`) or section (`#working-together`, `#contact`); `#thesis` and `#point-of-view` also still work. |
| `blueprint.html` | The consolidated report. Seven decisions between a pilot and a business result, phased pre-pilot, pilot-to-production and in-production. Every statistic carries a source and a date. Links out to the three papers as deep dives. |
| `judgment-room.html` | Interactive. Five anonymised enterprise dilemmas. The visitor picks, then sees what actually happened. |
| `wisdom-loop.html` | Interactive. The architecture as a six-stage cycle: Data, Information, Knowledge, Wisdom, Inference, Decision, looping back. |
| `architecture.jpg` | The reference architecture diagram. Shown at the top of `blueprint.html` under "Reference architecture"; selecting it opens the full-size image. |
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

## The home page book

`index.html` shows one full-screen page at a time. A turn swings the page
around its left edge. Visitors turn pages with the arrow and Page keys, the
mouse wheel (one turn per gesture), a sideways swipe, the arrow buttons at the
bottom right, or the menu. Without JavaScript the pages stack as an ordinary
scrolling page, and with reduced motion a turn is a short fade.

The positioning runs through every page: the header under the name reads
"Forward-deployed AI consultant", and each page's top line ends with "Forward
deployed".

| # | Anchor | Page | What it carries |
|---|--------|------|-----------------|
| 1 | `#s1` | Cover | Portrait, name, the role line, one sentence on how I work |
| 2 | `#s2` | What I bring | Strategy, production, maturity: what I do in an engagement |
| 3 | `#grow` | How I run it | "Production-ready at launch. Better every month after." The growth chart |
| 4 | `#s5` | Work: AI systems | Three stories: the brief, who I was deployed with, the real problem, the result |
| 5 | `#s5b` | Work: data platforms | Three more stories in the same shape |
| 6 | `#s4` | Impact | Three results that lasted after I left |
| 7 | `#s6b` | Builds | The three public repositories |
| 8 | `#s3b` | Why me | Availability, independence from vendors, honesty about fit |
| 9 | `#s9` | Let's talk | Email, LinkedIn, the 45-minute first call |

The address follows the page, so `index.html#grow` opens straight on the chart.
Older links still land on the page that now holds that content: `#s3` goes to
page 2, `#s6` and `#s8` to page 8, `#s7` to page 7, `#contact` to page 9. That
mapping is the `alias` line in the book script.

**The growth chart** (page 3) is an illustration, labelled as one, of how a
live solution earns more responsibility over its first year: Suggests, Drafts,
Decides, Acts, against a dashed "Shipped and left" line. Each step lists the
context it has, the evals that prove it and what it's trusted to do. When the
page opens the steps rise and the story plays through once. Clicking a step,
or using the arrow keys on it, takes over without turning the page.

**Editing the book.** Every page is a `<section class="page">` inside
`<main class="book">`. To add or remove a page, also update the `aria-label`
"Page n of 9" on each section and the `/ 09` in the page counter. Keep each
page short: every page has been checked to fit without scrolling on screens
from 1280×720 to 4K. On phones a long page scrolls a little before the next
turn.

**Scaling to the screen.** The book scales with the display instead of
sitting in a fixed-width column. The base text size is 16px at 1440×900 and
grows with whichever of the screen's width or height runs out first, so a
1920×1080 or 2560×1440 screen shows the same layout, larger, filling the width
and still fitting top to bottom. Widths in the book's styles are in `rem` so
they scale with it; use `rem` rather than `px` for new sizes. Very wide
screens (21:9) keep some margin at the sides so lines stay readable. This
scaling applies to the home page only; the other pages keep their fixed
width.

## How the pages link together

`index.html` is the entry point:

- Blueprint and Writing sit in the top navigation.
- Each book page's "Read the detail" link opens the matching part of
  `details.html`.
- The "No vendor to sell" line on the Why me page links to `blueprint.html`.
- `details.html` links into `judgment-room.html` from the stories chapter and
  into `wisdom-loop.html` from the thesis chapter.
- `blueprint.html` opens with the reference architecture (`architecture.jpg`).

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
  `prefers-reduced-motion`, which disables reveal animations, turns page turns
  into a short fade and shows the growth chart already complete. Interactive
  elements are keyboard reachable, including the chart steps (arrow keys move
  between them).
- The stories on the book's Work pages are condensed from the nine case
  stories on `details.html`. If a fact changes, change it in both places.
- Files in `assets/` are cached for a day. After changing `site.css`, visitors
  may see the old styles for up to 24 hours unless they hard refresh.
- En dashes appear in numeric ranges inside the technical papers, such as
  `4–8×` and `$5–6M`. That is correct typography for a range and is deliberate.
  There are no em dashes anywhere in the site.

## Rights

No licence file is included, so default copyright applies and all rights are
reserved. That is intentional. The technical papers are the author's work and
are published for reading, not reuse.
