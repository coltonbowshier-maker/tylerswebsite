# Tyler's Website

Custom static website hosted **free** on GitHub Pages, using a domain registered
through Squarespace. Updates are made by editing files in this repo (by hand or by
asking Claude) — every push to `main` redeploys the live site automatically.

## How hosting works here

- **Host:** GitHub Pages — $0/month, free HTTPS.
- **Domain:** registered at Squarespace, pointed at GitHub Pages via DNS.
- **Deploy:** the workflow in `.github/workflows/deploy.yml` publishes the repo
  root on every push to `main`. No build step — it serves the HTML/CSS/JS as-is.

## Updating the site

1. Change the files (or ask Claude to).
2. Commit and push to `main`.
3. Wait ~30 seconds. The live site updates itself.

That's it. There is no Squarespace editor to log into and no manual file upload.

## One-time setup checklist

- [ ] Add the real website files to this repo (replace `index.html`).
- [ ] In **Settings → Pages**, set **Source** to **GitHub Actions**.
- [ ] Add your custom domain under **Settings → Pages → Custom domain** (this
      creates a `CNAME` file automatically) and enable **Enforce HTTPS**.
- [ ] In **Squarespace → your domain → DNS settings**, add the records GitHub
      shows you:
  - Four `A` records for the apex domain (`@`) pointing to GitHub Pages:
    `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - One `CNAME` record for `www` pointing to `coltonbowshier-maker.github.io`
- [ ] Wait for DNS to propagate (minutes to a few hours), then confirm HTTPS.

## Cost summary

| Item      | Cost                         |
|-----------|------------------------------|
| Hosting   | $0 / month (GitHub Pages)    |
| Domain    | Existing Squarespace renewal |
| Updates   | $0 — done via this repo      |
