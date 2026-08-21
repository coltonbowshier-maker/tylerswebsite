# Launch Checklist — tylerwillispro.com

A living to-do list for taking the Tyler Willis site from **work-in-progress preview**
to **fully functional, public launch**. Grounded in what's actually built today.

Legend: 🔴 blocker · 🟡 should-do · 🟢 nice-to-have · ✅ done

---

## ✅ Already done
- [x] Site hosted free on GitHub Pages, auto-deploying on every push
- [x] Custom domain `tylerwillispro.com` connected via Squarespace DNS
- [x] Search engines blocked while in progress (`robots.txt` + `noindex` tags)
- [x] Work-in-progress ribbon on the site
- [x] Full single-page design built: hero, manifesto, featured work, before/after
      slider, lightbox gallery, approach, places, partners, about, contact, footer

---

## 🔴 Must do before launch (content & correctness)

- [ ] **Real contact email.** Placeholder `hello@tylerwillis.homes` appears in 4 spots
      (`index.html` lines ~269 & ~283; `b/index.html` lines ~254 & ~271). Replace with
      the real address (e.g. `tyler@tylerwillispro.com`) everywhere.
- [ ] **Before/after "before" photo.** The slider currently shows the *after* image with
      a fake-aged CSS filter as a stand-in (`ba-placeholder` class + `.ba-before img` in
      `index.html` ~line 100). Swap in the real original-condition photo, then remove the
      `ba-placeholder` class so the filter turns off.
- [ ] **St. Petersburg photography.** The "St. Petersburg, Florida" card in the *Places*
      section uses a Portland/Lake Oswego patio photo as a stand-in. Swap in real Florida
      imagery when available.
- [ ] **Confirm all body copy is final**, not lorem/placeholder — read through hero,
      manifesto, approach steps, partners, and about with Tyler.

## 🔴 Must do before launch (the "turn it on" switches)

- [ ] Remove the **work-in-progress ribbon** (the `.wip-bar` `<div>` in `index.html`
      and the `.wip-bar` CSS block at the bottom of `css/styles.css`).
- [ ] Remove **`noindex, nofollow`** meta tags from `index.html` and `b/index.html`.
- [ ] Open **`robots.txt`** back up (change `Disallow: /` to `Allow: /`, or delete the file).
- [ ] Confirm **Enforce HTTPS** is enabled in GitHub → Settings → Pages.
- [ ] Remove the **preview password gate** (`js/preview-gate.js` + the snippet in
      `index.html` and `b/index.html`) — unless you want to keep it during a soft launch.

*(All of these are one request away — just say "launch it" and I'll flip them together.)*

## 🔴 Testimonials — before sharing the link widely

- [ ] **Connect the form backend.** Add your Web3Forms access key
      (`testimonials/SETUP-web3forms.md`) so submissions are captured.
- [ ] Add a **real photo of Tyler** to the testimonials page (drop it at
      `/assets/img/web/tyler-portrait.jpg`).

---

## 🟡 Should do (SEO & sharing polish, before or at launch)

- [ ] **Fix the social-share image.** `og:image` (`index.html` line 12) is a relative path;
      social platforms need an absolute URL — `https://tylerwillispro.com/assets/img/web/living-skylights-1600.jpg`.
- [ ] Add **`og:url`, `og:type`, and `twitter:card`** tags so links preview nicely on
      iMessage, WhatsApp, LinkedIn, X, etc.
- [ ] Add a **`<link rel="canonical">`** tag pointing at the apex domain.
- [ ] Add a **`sitemap.xml`** (once indexing is allowed) to help Google.
- [ ] Confirm **`www.tylerwillispro.com`** resolves and redirects to the apex (or vice
      versa) — the DNS `CNAME` for `www` is set; worth a real-world test.

## 🟡 Should do (quality assurance)

- [ ] **Mobile pass** — test hero, nav, gallery, and the before/after touch-drag on a phone.
- [ ] **Cross-browser** — Safari, Chrome, Firefox (backdrop-blur nav + slider behave differently).
- [ ] **Verify every image loads**, including the full-size lightbox versions (`data-full`).
- [ ] **Decide the fate of the `/b` page** — it's an alternate layout, currently `noindex`.
      Finish it, link to it, or remove it before launch.

---

## 🟢 Nice to have (future / optional)

- [ ] **Real contact form** instead of just a `mailto:` link. GitHub Pages is static, so
      this needs a free form backend (Formspree, Web3Forms, or moving to a host with forms).
      A form captures leads even when someone doesn't have email set up.
- [ ] **Custom `404.html`** page (right now visitors hitting a bad URL see GitHub's default).
- [ ] **Image optimization** — the photos are large (1600px JPEGs). Compressing / serving
      WebP would speed up load, especially on mobile.
- [ ] **More projects** — the work section is labelled "№ 01"; add projects as they complete.
- [ ] **Analytics** (privacy-friendly, e.g. Plausible/Cloudflare) if you want visitor stats.
- [ ] **Password/private gate** (Cloudflare Access) if you ever want it truly private rather
      than just unindexed.

---

## How to knock these out
Most of these are a single message to Claude away — e.g. *"replace the email with
tyler@tylerwillispro.com"*, *"fix the og:image and add the twitter tags"*, or *"launch it."*
Each change is committed and auto-deployed in about 30 seconds.
