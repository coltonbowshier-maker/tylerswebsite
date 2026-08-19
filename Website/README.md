# Tyler Willis — Residential Design & Development

A single-page portfolio site for Tyler Willis: design-led home redevelopment in
Portland, OR and St. Petersburg, FL. Built as plain HTML/CSS/JS — no build step,
no dependencies — so it can be hosted anywhere (Netlify, Vercel, GitHub Pages,
or any static host) and maintained for years.

## Preview locally

```sh
python3 -m http.server 4173
# then open http://localhost:4173
```

(Or use any static file server from this folder.)

## Structure

```
index.html          — the whole site (hero, work, approach, places, partners, about, contact)
css/styles.css      — design system + layout (colors/typography in :root variables)
js/main.js          — nav state, scroll-reveal, gallery lightbox
assets/img/web/     — curated, web-sized photos (semantic names, 800px + 1600px each)
assets/img/source/  — full downloaded archive of the Lake Oswego gallery (106 photos)
assets/favicon.svg
```

## Things to swap before going live

- **Email**: `hello@tylerwillis.homes` is a placeholder (appears in the Contact
  section, footer, and `mailto:` links in `index.html`). Replace with the real
  address once the domain is chosen.
- **St. Petersburg imagery**: the St. Pete "Places" card currently uses a
  Lake Oswego patio photo as a stand-in. Swap in Florida project photography
  when available.
- **Before/after slider**: the "before" frame currently shows the after photo
  with an archival CSS treatment, clearly captioned as a stand-in. When real
  before photography arrives: point the `.ba-before img` at the new file and
  remove the `ba-placeholder` class from the `<figure class="ba …">` in
  `index.html` (that class is what applies the desaturation filter).
- **About photo**: currently an interior shot — swap in a portrait of Tyler if
  he wants one there.
- **Domain + OG tags**: update `og:image` to an absolute URL after deploy.

## Adding a new project

Each project gallery is a `<section class="work">` block. Duplicate the existing
"Lake Oswego House" section in `index.html`, update the title/meta/copy, and
drop new images into `assets/img/web/` following the same naming pattern
(`name-800.jpg` + `name-1600.jpg`, generated with `sips -Z 800` / `-Z 1600`).
Any figure with a `data-full="…"` attribute is automatically part of the
lightbox.

## Image pipeline

Originals live in `assets/img/source/`. To produce web derivatives on macOS:

```sh
sips -Z 800  -s format jpeg -s formatOptions 70 source/PHOTO.jpg --out web/name-800.jpg
cp source/PHOTO.jpg web/name-1600.jpg   # originals are already ≤1600px
```
