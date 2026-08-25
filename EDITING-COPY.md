# Editing the copy yourself

You don't need to go through Claude for text changes. Everything on the site is plain
text sitting inside HTML files, and GitHub has a built-in editor. **Edit → commit →
the site rebuilds itself in about 30 seconds.**

> **Read this first:** there are currently three designs live (A at `/`, B at `/b/`,
> C at `/c/`). The same sentence can exist in all three, so a copy change today may
> need making three times. **Pick a design and let the other two go, and this gets
> three times easier.** Everything below assumes you may need to repeat an edit per
> design until then.

---

## The fastest way: the browser editor

1. Go to <https://github.com/coltonbowshier-maker/tylerswebsite>
2. **Press the `.` key** (just a period). A full VS Code editor opens in your browser.
3. Hit **Ctrl+Shift+F** (Cmd+Shift+F on Mac) and search for the sentence you want to change.
4. Edit it. Repeat for as many changes as you like — this is the part that saves you.
5. Click the **Source Control** icon in the left bar (the branch symbol), type a short
   note like `copy tweaks`, and hit **✓ Commit & Push**.
6. Wait ~30 seconds. Refresh the site.

This is the one to use when you have a batch of changes. Search-and-replace across
every file at once, commit them all together.

### Or, for a single quick change
Open the file on GitHub, click the **pencil icon**, edit, then **Commit changes** at
the bottom. Fine for one-offs; clumsy for many.

---

## Where the copy lives

| What you want to change | File |
|---|---|
| **Design A** (the main site, `/`) | `index.html` |
| **Design B** (`/b/`) | `b/index.html` |
| **Design C** (`/c/`) | `c/index.html` |
| **Testimonial page** (`/testimonials/`) | `testimonials/index.html` |
| **Project names & locations** (Design C) | `c/projects.js` |
| **Project names** (Design A) | `index.html` — the tab buttons and the script near the bottom |

Each page is laid out top-to-bottom in the same order you see on screen, with comment
banners marking each section:

```
<!-- ============ HERO ============ -->
<!-- ============ PLACES ============ -->
<!-- ============ CONTACT ============ -->
```

Search for those banners to jump straight to a section. The middle ones differ
slightly between designs:

| Section | Design A (`index.html`) | Design C (`c/index.html`) |
|---|---|---|
| Opening statement | `MANIFESTO` | `STATEMENT` |
| The projects | `FEATURED WORK` | `WORK` |
| The four steps | `APPROACH` | `PROCESS` |
| Testimonials | `TESTIMONIALS` | `VOICES` |

Design A also has `PARTNERS` and `ABOUT` sections that C doesn't.

---

## The one rule

**Only change words. Never change anything inside angle brackets `< >`.**

```html
<p class="hero-sub">We take on older houses in Portland.</p>
 ↑ leave this alone        ↑ change anything here          ↑ leave this alone
```

That's genuinely the whole skill. If you only ever retype the words *between* the
brackets, you can't break the site.

Two small things that look like typos but aren't:
- `&nbsp;` glues two words together so they never split across lines. Leave it, or
  replace it with a normal space if you don't care.
- `&amp;` is how you write `&`. If you need an ampersand, type `&amp;`.

---

## Common edits

**Email address** — appears twice per page, in the contact section and the footer.
Search `TylerWillisPro@gmail.com` and replace all. It's in `index.html`, `b/index.html`,
`c/index.html`, and `testimonials/index.html`.

**Phone number** — currently the test number. It appears in two forms and you need to
change both:
- `+15032011336` — the clickable link. Digits only, keep the leading `+1`.
- `(503) 201-1336` — the visible text. Format it however you like.

**A project name** — Design C reads names from `c/projects.js`:
```js
stallion: { name: "The Stallion House", place: "Portland, OR", photos: [...] },
```
Change `name` and `place`. Don't touch `photos` or the key before the colon.

**A testimonial** — search `PLACEHOLDER testimonials` to find the block. Each one is:
```html
<blockquote>“Their words here.”</blockquote>
<figcaption><span class="v-name">Their name</span><span class="v-role">Homeowner · Portland</span></figcaption>
```
Replace the quote, the name, and the role. Delete the whole `<figure>…</figure>` block
to remove a testimonial.

---

## If something breaks

Nothing is ever lost — every change is saved as a separate version.

1. Go to the repo → **Commits**
2. Find the change that broke it
3. Click it, then **Revert**

The site goes back to how it was, and redeploys in ~30 seconds.

---

## When to just ask Claude instead

Do it yourself for: wording, names, numbers, swapping a testimonial, fixing a typo.

Ask Claude for: anything that changes **layout, colors, spacing, images, or how
something behaves** — and for bulk rewrites where you'd rather describe the goal
("make the process section warmer") than write the sentences yourself.

You can also batch your requests: paste a list of ten changes in one message rather
than ten separate ones.
