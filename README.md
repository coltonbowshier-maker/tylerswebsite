# Tyler Willis — Website

Custom static website hosted **free** on GitHub Pages, using the domain
`tylerwillispro.com` (registered through Squarespace). Updates are made by editing
files in this repo (by hand or by asking Claude) — every push to the live branch
redeploys the site automatically.

## How hosting works here

- **Host:** GitHub Pages — $0/month, free HTTPS.
- **Domain:** `tylerwillispro.com`, registered at Squarespace, pointed at GitHub
  Pages via DNS.
- **Site files:** live in the `Website/` folder.
- **Deploy:** `.github/workflows/deploy.yml` publishes the **`Website/`** folder on
  every push. No build step — it serves the HTML/CSS/JS as-is.

## Updating the site

1. Change the files in `Website/` (or ask Claude to).
2. Commit and push.
3. Wait ~30 seconds. The live site updates itself.

There is no Squarespace editor to log into and no manual file upload.

## One-time setup checklist

- [ ] In **Settings → Pages**, set **Source** to **GitHub Actions**.
- [ ] Confirm the custom domain `tylerwillispro.com` is set and **Enforce HTTPS**
      is enabled (the `Website/CNAME` file holds the domain).
- [ ] In **Squarespace → tylerwillispro.com → DNS settings**, add:
  - Four `A` records for the apex domain (`@`) pointing to GitHub Pages:
    `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - One `CNAME` record for `www` pointing to `coltonbowshier-maker.github.io`
- [ ] Wait for DNS to propagate (minutes to a few hours), then confirm HTTPS.

## Still to swap before launch (from the site's own notes)

- Replace the placeholder email `hello@tylerwillis.homes` in `Website/index.html`.
- Swap in real St. Petersburg photography (currently a Portland stand-in).
- Replace the before/after slider's stand-in "before" image when available.

## Cost summary

| Item      | Cost                         |
|-----------|------------------------------|
| Hosting   | $0 / month (GitHub Pages)    |
| Domain    | Existing Squarespace renewal |
| Updates   | $0 — done via this repo      |
