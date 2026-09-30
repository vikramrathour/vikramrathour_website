# Minimal book home page: design

Date: 2026-09-30 · Branch: `feature/minimal-book-home`

## Intent
The 3D realm-card home page reads as noisy. Replace its core content with a
minimal, page-turning "story book" that keeps the impact. The top menu, every
other page and the design tokens stay as they are.

## Content: eight pages, one idea each
One headline, one short line, at most three items per page. Existing copy only.

| # | id | Menu item | Headline | Items |
|---|----|-----------|----------|-------|
| 1 | `s1` | (cover) | Vikram Rathour | Role line, availability |
| 2 | `s2` | Thesis | Three pivots. | The three pivots |
| 3 | `s5` | Work | Nine times through these pivots. | Three one-line stories, Judgment Room link |
| 4 | `s4` | Impact | What changed after I left the room. | 2x · Zero downtime · 40% to 0 |
| 5 | `s6` | Point of View | I do the homework before I give you advice. | Blueprint, papers, essays |
| 6 | `s6b` | Builds | I don't just architect it. I build it. | Three repositories |
| 7 | `s3b` | Working together | Three ways we can work together. | Foundations, Reliability, Direction |
| 8 | `s9` | Let's talk | Which pivot feels hardest right now? | Email, LinkedIn, portrait |

Old anchors map onto pages: `s3` to 2, `s8` to 5, `s7` to 6, `contact` to 8.
Removed from the home page: realm cards, orbs, grid, chapter reader, impact
grid, nine case cards, engagement cards, site footer (a copyright line moves to
page 8).

## Interaction
- The home page does not scroll; the book fills the viewport below the menu.
- A turn swings the current page around its left edge (rotateY, ~0.7s, soft
  shading), revealing the next page beneath. Backward reverses it.
- Input: arrow and Page keys, Home/End, one turn per wheel or trackpad
  gesture, horizontal swipe, prev/next buttons with a `02 / 08` counter, and
  menu links. If a page's content overflows on a small screen it scrolls
  internally before the next turn.
- The address hash follows the page (`replaceState`), so deep links work.

## Accessibility and fallbacks
- Reduced motion: short cross-fade instead of the swing.
- Live region announces "Page n of 8: Title"; hidden pages are `inert`.
- Without JavaScript the pages stack as a normal scrolling document.

## Verification
Headless Chrome over CDP: each input turns exactly one page, menu links land on
the right page, deep links open the right page, no console errors, and no
horizontal overflow at 390px.
