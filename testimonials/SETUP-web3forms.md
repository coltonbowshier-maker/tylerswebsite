# Testimonial form — backend setup (Web3Forms, free)

The testimonial page sends submissions through **Web3Forms**. No Google login, no
"unverified app" prompts, no server to run. Free tier is ~250 submissions/month, and
each submission is emailed to you.

## Get connected (about 1 minute)

1. Go to <https://web3forms.com>.
2. In the **"Create your Access Key"** box, enter the email where you want
   testimonials to arrive (e.g. `coltonbowshier@gmail.com`) and submit.
3. Check that inbox — Web3Forms emails you an **Access Key** (a code that looks like
   `a1b2c3d4-5678-90ab-cdef-1234567890ab`).
4. Send that key to Claude, or paste it yourself into `testimonials/index.html`:

   ```html
   <input type="hidden" name="access_key" value="PASTE_YOUR_WEB3FORMS_ACCESS_KEY">
   ```

   Replace `PASTE_YOUR_WEB3FORMS_ACCESS_KEY` with your key, then commit + push.

That's it. The "Preview mode" note disappears once a real key is in place, and every
submission is emailed to you within seconds.

## What you'll receive

Each email includes: name, how they worked with Tyler, location, the testimonial,
their email (if given), and the consent confirmation. Filter/label them in your inbox,
or star the ones you want to feature on the homepage.

## Optional upgrades (later, if you want)

- **Send to a Google Sheet or Slack instead of email:** Web3Forms supports this from
  its dashboard (create an account with the same email) — no site change needed.
- **Custom spam protection / reCAPTCHA:** also configurable in the dashboard. The page
  already includes two honeypot fields, which stop most bots on their own.

## Testing

After the key is in, submit a test testimonial from the live page and confirm the email
arrives. (Web3Forms may send a one-time confirmation the very first time.)
