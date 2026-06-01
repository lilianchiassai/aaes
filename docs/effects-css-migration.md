# effects.css → Tailwind / shared components — migration plan

> **Status: COMPLETE — `src/styles/effects.css` has been deleted.** The earlier
> plan (below) kept a "Bucket 3" residue of awkward motifs in CSS. That residue
> has since been inlined into its owning components as Tailwind arbitrary
> utilities/variants, with no component-scoped CSS file remaining:
> - `.hero__art` → `pages/Home.tsx` (`[mask-image:…]`, `mix-blend-screen`)
> - `.joint`/`.pbanner*`/`.ptape*`/`.pstripe*` → `components/home/ParallaxBanner.tsx`
> - `.crowd`/`.fig*`/`.tl4*` → `components/home/NightTimeline.tsx`
> - `.gate__scroll` → `pages/Inscription.tsx` (`[&_h4]:…`, `[scrollbar-width:thin]`)
>
> The four DOM-query JS hooks (`.hero__art`, `.pbanner`, `.pbanner__parallax`,
> `.tl4__card`) became `data-*` attributes (`data-parallax-hero`,
> `data-parallax-banner`, `data-factor`, `data-tl-card`).
>
> **Gotcha for future arbitrary-variant work:** Tailwind v4 does **not** emit
> `max-*` (max-width) media rules after the unprefixed rules — they land *before*
> them. Relying on source order + specificity-matched `:nth-child` overrides (as
> the original media query did) silently breaks. The timeline's responsive reflow
> instead splits desktop vs mobile across **non-overlapping** `zmd:` (min-width)
> and `max-zmd:` (max-width) queries, so cascade order can't matter.

---

Goal: shrink `src/styles/effects.css` to the minimum — only the rules that genuinely
can't (or shouldn't) be expressed as Tailwind utilities. Everything else moves either
**inline into its single owning component** or into a **small shared component / `@utility`**.

## Key finding: every block is already single-owner

Each `.foo__bar` cluster in effects.css is consumed by exactly **one** component or page.
Nothing is shared at the CSS level — the BEM names just emulate scoping that React already
gives us. So for most blocks the move is simply: *delete the CSS, write the same declarations
as Tailwind utilities in the one `.tsx` that uses them.*

| effects.css block | sole consumer |
|---|---|
| `.hero__*` | `pages/Home.tsx` |
| `.joint`, `.pbanner*`, `.ptape*`, `.pstripe*` | `components/home/ParallaxBanner.tsx` |
| `.crowd`, `.fig*`, `.tl4*` | `components/home/NightTimeline.tsx` |
| `.loc*` | `components/shared/LocationBlock.tsx` |
| `.events`, `.ecard*` | `components/events/EventCard.tsx` |
| `.pcards2`, `.pcard2*` | `components/events/EventCard2.tsx` |
| `.yeargroup*`, `.feat*`, `.recap*` | `pages/Events.tsx` |
| `.edhero*`, `.edstats`, `.edquotes`, `.qcard*`, `.egallery*` | `pages/EventDetail.tsx` |
| `.rules-*` | `pages/Rules.tsx` |
| `.insc`, `.gate*`, `.formwrap`, `.formlock` | `pages/Inscription.tsx` |
| `.lb*` | `components/ui/Lightbox.tsx` |
| `.pagehead*`, `.lead` | several pages |

## Strategy — three buckets

1. **Inline as Tailwind** — static property bags, single-use, no exotic selectors. Just rewrite
   in `className`. (Most of the file.)
2. **Promote to a shared component or `@utility`** — visual motifs that repeat across blocks
   (and in two cases already duplicate an existing component). Do these *first*: they delete the
   most CSS and remove copy-paste.
3. **Keep in CSS** — pseudo-element geometry, masks, `nth-child` timeline math, scrollbar styling,
   runtime CSS vars. Small residue.

---

## Bucket 2 — extract shared pieces first (highest payoff)

These motifs recur across many blocks; centralizing them lets the per-block inlining in Bucket 1
drop to almost nothing.

### A. `Kicker` — already exists as `SectionKick`, just duplicated
`font-cond` + `font-semibold` + `uppercase` + wide tracking + `text-hazard`/`text-cyan` appears as:
`.hero__kicker`, `.feat__date`, `.edhero__date`, `.ecard__k`, `.pcard2__k`, `.recap__l`, `.gate__title`,
`.rules-hero` kicker. `components/ui/Section.tsx` **already has `SectionKick`** doing exactly this.
→ Use `<SectionKick>` (or extract a tiny `Kicker` with a `tracking`/`tone` variant) everywhere.
Deletes ~8 near-identical declarations.

### B. `Stat` — big impact number + small label
`font-impact` hazard number over a `font-cond` micro label: `.recap__n`/`.recap__l`,
`.pcard2__stat .n`/`.l`, `.hero__cd-cell .n`/`.l`, `.ecard__stat`, `.edstats` cells.
→ `components/ui/Stat.tsx` with `{ n, label, tone }`. Replaces 4–5 stat blocks; `.edstats` /
`.pcard2__stats` keep only their grid wrapper.

### C. `Ribbon` — corner tag
`.ecard__ribbon` and `.pcard2__ribbon` are identical bar (hazard bg, black text, offset shadow,
`left:-3px`). → `components/ui/Ribbon.tsx`.

### D. `HardCard` / `@utility hard-box` — bordered hard-shadow panel
`border:2px solid #000; box-shadow: var(--shadow-hard); background:#0c0c0c` (and the offset
`5px 5px 0` hover-lift variant) recurs in `.loc`, `.gate`, `.formwrap`, `.rules-callout`, `.feat`
(cyan), `.ecard`, `.pcard2`, `.qcard`, `.tl4__card`.
→ Either a `@utility hard-box { … }` in `index.css`, or a `HardCard` component with a `lift`
(hover translate + shadow grow) and `tone` (black/cyan/hazard border) variant. The hover-lift
pair on `.ecard`/`.pcard2` becomes `transition + hover:` utilities or one variant.

### E. Grayscale media image — `@utility film-img` (or `LazyImage` variant)
`filter: grayscale(1) contrast(1.1–1.25); object-fit:cover` with hover de-saturate appears in
`.hero__art`, `.ecard__media img`, `.pcard2__hero`, `.pcard2__thumb img`, `.edhero__bg img`,
`.egallery img`, `.lb img`. `components/ui/LazyImage.tsx` already exists.
→ Add a `film`/`grayscale` variant to `LazyImage`, or an `@utility film-img`. The per-block hover
(`group-hover:scale-105 group-hover:grayscale-[.3]`) becomes utilities.

### F. `Lead` + `PageHead` — shared page intro
`.lead` (body, 19px, grey-100, `max-w-[80ch]`) is used on every page; `.pagehead` + `.pagehead h1`
is the generic page header (Events, Inscription). The Rules/EventDetail heroes are bespoke and
stay bespoke, but the plain ones should share one component.
→ `components/ui/PageHead.tsx` ({ title, lead }) emitting Tailwind directly. Replaces `.pagehead`,
`.pagehead h1`, and most `.lead` uses.

### G. `QuoteCard`
`.qcard` (EventDetail) and `.pcard2__quote` (EventCard2) are the same italic-body + hazard-left-border
quote with a `cite`. → `components/ui/QuoteCard.tsx`.

---

## Bucket 1 — inline directly as Tailwind (delete from CSS)

All single-use static blocks. Representative mappings (token utilities resolve from `@theme`:
`font-cond`, `font-impact`, `font-display`, `font-body`, `text-hazard`, `text-cyan`, `text-grey-100`,
`text-fg2`, `border-hairline`, `shadow-hard`, `text-display`…):

- **`.lead`** → `font-body text-[19px] text-grey-100 leading-[1.6] max-w-[80ch]`
- **`.pagehead`** → `pt-[60px] pb-[10px]`; **`.pagehead h1`** → `font-display text-[clamp(46px,8vw,104px)] uppercase text-white leading-[0.84] mt-[10px] mb-[14px]`
- **`.hero__kicker`** → `font-cond font-semibold tracking-[0.24em] text-[13px] uppercase text-hazard mb-4` (→ use `Kicker`)
- **`.hero__sub`** → `font-body text-[21px] text-grey-100 max-w-[64ch] my-[20px_0_16px] leading-[1.5]`
- **`.hero__cta`** → `flex gap-4 flex-wrap items-center mt-[14px]`
- **`.hero__meta`** → `flex gap-[10px] mt-7 flex-wrap`
- **`.hero__date`** → `font-impact text-[clamp(28px,3.8vw,52px)] text-hazard uppercase tracking-[0.01em] leading-none my-[8px_0_6px]`
- **`.events`** → `grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[22px]`
- **`.pcards2`** → `grid grid-cols-2 gap-6 max-md:grid-cols-1`
- **`.yeargroup`** → `mb-[60px]`; **`.yeargroup__head`** → `flex items-center gap-[18px] mb-6`; **`.yeargroup__yr`** → `font-display text-[clamp(48px,8vw,96px)] text-white leading-[0.8]`; **`.yeargroup__rule`** → `flex-1 h-[3px] bg-[repeating-linear-gradient(-45deg,var(--color-hazard)_0_9px,#000_9px_18px)]`
- **`.feat__txt`/`__name`/`__blurb`/`__date`** → straight utility bags (date → `Kicker tone=cyan`)
- **`.recap__row`** → `flex items-baseline gap-3` (numbers → `Stat`)
- **`.edhero__back`/`__date`/`__name`** → utility bags (name → `font-display text-[clamp(46px,8vw,104px)]…`)
- **`.edstats`/`.edquotes`/`.egallery`** → grid wrappers (`grid grid-cols-[repeat(auto-fit,minmax(…,1fr))] gap-…`); cells → `Stat`/`QuoteCard`
- **`.qcard p`/`cite`** → utility bags (→ `QuoteCard`)
- **`.rules-block`** → `mb-10`; **`.rules-callout`** → `bg-hazard text-black px-[26px] py-[22px] border-2 border-black shadow-hard font-cond font-semibold uppercase tracking-[0.04em] text-[19px] leading-[1.4]`
- **`.gate`** → `bg-[#0c0c0c] border-2 border-black shadow-hard mb-6`; **`.gate__head`** → `flex items-center gap-[14px] px-6 py-[18px] bg-[repeating-linear-gradient(-45deg,#141414_0_14px,#0c0c0c_14px_28px)] border-b-2 border-black`; **`.gate__num`/`__title`** → utility bags
- **`.gate__agree`** → `px-[26px] py-[18px] flex items-start gap-[14px] bg-black`; **`.armed`** → `[box-shadow:inset_0_0_0_2px_var(--color-cyan)]` (or a `data-armed:` variant)
- **`.formwrap`** → `relative border-2 border-black shadow-hard bg-[#0c0c0c] p-2`; **`.formlock`** → `absolute inset-0 z-[5] bg-[rgba(6,6,6,.93)] flex flex-col items-center justify-center text-center p-10 gap-[14px] backdrop-blur-[3px]`; `.unlocked .formlock` → conditional render / `hidden`
- **`.loc`** → `grid grid-cols-2 gap-0 border-2 border-black shadow-hard bg-[#0c0c0c] max-[860px]:grid-cols-1`; **`.loc__info`** → `p-[30px]` (→ `HardCard`)
- **`.lb`** → `fixed inset-0 z-[200] bg-[rgba(0,0,0,.93)] hidden items-center justify-center p-10` + `open:flex` via state (`open` already toggled in React, so use conditional class); **`.lb img`** → `max-w-[92vw] max-h-[88vh] border-[3px] border-hazard …`; **`.lb__x`** → utility bag
- **`.ecard__body`/`__k`/`__t`/`__row`/`__loc`/`__stat`** and **`.pcard2__body`/`__k`/`__t`/`__more`** → utility bags (k → `Kicker`, stat → `Stat`)

These are mechanical: copy the declarations, translate units to arbitrary values, swap `var(--x)`
for the matching token utility.

---

## Bucket 3 — keep in CSS (genuinely awkward in Tailwind)

Leaving these in keeps the file small *and* readable. Candidates to retain:

- **`.tl4*` timeline** — `nth-child(odd/even)` alternating columns, `::before`/`::after` connector
  dots and stubs, the gradient spine, the `-58px` overlap, and the `max-md` reflow. Expressible
  with `[&:nth-child(odd)]:` + `before:`/`after:` arbitrary variants, but it would be far less
  legible than the CSS. **Keep** (optionally move into the component via a CSS module).
- **`.crowd` / `.fig*`** — `fill: currentColor`, `--fig` sizing var, `drop-shadow`. Small; keep
  or inline as arbitrary props.
- **`.hero__art` mask** — `-webkit-mask-image`/`mask-image` linear-gradient + `mix-blend-mode`.
  Doable as `[mask-image:…]` but verbose; keep.
- **`.pbanner*` / `.ptape*` / `.pstripe*`** — rotated overlapping tape strips with per-strip
  `z-index`/rotation/`box-shadow` and `:last-child` border reset. Keep the structural rules;
  colors can use token utilities.
- **`.gate__scroll`** — `scrollbar-width: thin`, the scroll-to-unlock container, and descendant
  typography (`h4`, `p`, `li`, `ul`). `scrollbar-width` has no utility; keep at least that.
- **`.rules-block h2::before`** and **`.rules-list li::before`** (`\261E` glyph, hazard chevron) —
  `before:content-['\261E']` works but the geometry reads better as CSS. Judgment call.
- **`.loc__map iframe` filter** (dark-mode the Google embed) — keep; it's a one-off descendant.

---

## Token alias cleanup (`:root` block, lines 16–43)

The legacy `--ink`/`--blood`/`--hazard`/`--fg2`/… aliases exist **only** so the raw `var(--x)`
calls inside effects.css resolve. Tailwind utilities reference `--color-*` / `--font-*` / `--text-*`
directly, so every declaration moved out of effects.css removes alias dependents. Current in-file
alias usage: `--hazard` ×35, `--grey-100` ×10, `--hairline` ×9, `--glitch-cyan` ×8, `--fg2` ×5,
`--hazard-dim` ×2, `--blood-bright` ×1.
→ As blocks migrate, delete each now-unused alias. If effects.css is fully drained, **delete the
entire `:root` alias block (16–43)** — ~28 lines gone for free.

---

## Suggested order of work

1. Add shared pieces: `Kicker` (or reuse `SectionKick`), `Stat`, `Ribbon`, `HardCard`/`@utility hard-box`,
   `film-img`, `PageHead`, `QuoteCard`. *(Bucket 2 — biggest deletions.)*
2. Inline the static blocks page-by-page, deleting each CSS block as its component is converted.
   Order: Inscription → Rules → Events → EventDetail → Home (hero) → LocationBlock → Lightbox.
3. Prune now-dead `:root` aliases after each page.
4. Leave Bucket 3 (timeline, tape banner, hero mask, gate scroll, pseudo-element chevrons) in
   effects.css — that's the intended minimal residue.

## Expected end state

effects.css drops from ~314 lines to roughly the timeline + tape-banner + hero-mask + gate-scroll +
chevron pseudo-elements (~80–100 lines), with the token-alias block and all primitive/card/typography
rules gone — replaced by `@theme` utilities and a handful of `components/ui` primitives.
