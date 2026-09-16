# Vikram Rathour — Personal Site

A four-page site built around one thesis: intelligence is abundant, sensibility
is the scarce resource. Vikram architects the judgment layer that decides what
data means, what a model's output should be trusted to do, and when to
override it.

## What's in this folder

| File                  | What it is                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| `index.html`          | The main site. Hero, thesis, approach, impact, work, leadership, builds, signature project, writing, contact. |
| `judgment-room.html`  | An interactive piece. Five real, anonymized enterprise dilemmas across the practice areas. The visitor picks an answer, then sees what actually happened and why. |
| `wisdom-loop.html`    | An interactive visualization of the underlying architecture, drawn as a six-stage cycle: Data, Information, Knowledge, Wisdom, Inference, Decision, looping back to Data. Shows the three real stores (Record, Reasoning, Trust) and the compute actions that move information between them. |
| `architecture.svg`    | A standalone, printable technical diagram of the same architecture — concentric rings, judgment gates, governed feedback loop. Drop this into a slide deck or document as-is. |

## How the pages connect

`index.html` is the entry point and the only page meant to be shared as the
primary link. It has two internal invitations:

- After the Work section's case studies, a "Go deeper" link into
  `judgment-room.html` and `architecture.svg`.
- After the Thesis section's four cards, a full-width panel inviting the
  visitor into `wisdom-loop.html`, framed as "see the argument, not just
  read it."

Both `judgment-room.html` and `wisdom-loop.html` carry a link back to
`index.html` at the top, so the visitor is never stranded on a sub-page.

**These links are relative filenames.** All four files need to sit in the
same folder (or the same repo root) for them to resolve. If you only ever
deploy `index.html` on its own, the "go deeper" links will 404.

## Design system

- **Typography:** IBM Plex Sans (body/display) and IBM Plex Mono (labels,
  code-like accents) throughout all four files. Chosen deliberately over
  more decorative serif pairings to avoid the "generated" look common to
  AI-assisted design tools.
- **Palette:** silver-grey background with ODI-blue and orange accents on
  the main site and Judgment Room; a separate calm Mist & Sage palette on
  the Wisdom Loop, since that page is meant to feel contemplative rather
  than corporate.
- **Accessibility:** every text/background pairing has been checked against
  WCAG contrast minimums. All animation respects
  `prefers-reduced-motion`. Touch devices get the system cursor back
  (the custom cursor is desktop-only).
- **No external dependencies** beyond Google Fonts. No build step, no
  package manager, no JavaScript framework. Every file is a single,
  self-contained HTML (or SVG) document.

## Deploying to Netlify

**Fastest path — Netlify Drop (no account needed to preview):**

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag this entire folder (all four files, plus this README if you like —
   it won't affect the site) onto the page
3. Netlify gives you a live URL immediately

**Proper path — connected to a Netlify account (recommended for a real
launch):**

1. Log in at [app.netlify.com](https://app.netlify.com)
2. "Add new site" → "Deploy manually"
3. Drag the folder in, same as above
4. Once live, go to Site settings → Domain management to add a custom
   domain if you have one (e.g. `vikramrathour.com`)
5. Netlify auto-detects `index.html` as the root page — no configuration
   needed for that part

**If you'd rather deploy from a Git repo** (GitHub, GitLab), push these four
files to a repo root, then in Netlify choose "Import an existing project"
and point it at that repo. No build command is needed — leave the build
command blank and set the publish directory to `/` (the repo root).

## Updating content later

Every file is plain HTML/CSS/JS with inline `<style>` and `<script>` blocks,
readable top to bottom. There's no compilation step — edit the file, save,
re-upload (or `git push` if using the Git-connected route) and the change is
live.

A few landmarks if you're editing by hand:

- Main site sections are `<section class="slide" id="s1">` through `id="s9"`,
  in order: Hero, Thesis, Approach, Impact, Work, Leadership, Builds,
  Signature, Writing, Contact.
- Case studies in the Work section are grouped by tab (`tab-bfs`, `tab-ai`,
  `tab-plat`) inside `#s5`.
- The Judgment Room's five scenarios are `<div class="scenario" id="sc0">`
  through `id="sc4"`.
- The Wisdom Loop's six stages and their architecture-layer tags live in
  the `<svg class="loop-svg">` block; the compute-action labels that travel
  between them are defined in the `segments` array near the bottom of the
  file, in a `<script>` tag.
