# Testimonial form — backend setup (free, ~5 minutes)

This wires the testimonial page to a **Google Sheet you own**. Submissions land as
rows; you filter/sort and mark which ones go on the homepage. No cost, no monthly cap,
no new accounts beyond the Google login you already have.

You do this once. I wrote all the code — you just deploy it and paste one URL back.

---

## Step 1 — Make the sheet
1. Go to <https://sheets.google.com> and create a blank spreadsheet.
2. Name it e.g. **"Tyler Willis — Testimonials"**.
3. In row 1, paste these headers across columns A–H:

   `Received | Name | Relationship | Location | Testimonial | Email | Consent | Feature?`

   (The **Feature?** column is yours — mark "yes" on the ones you want on the homepage.)

## Step 2 — Add the script
1. In that sheet: **Extensions → Apps Script**.
2. Delete whatever's in the editor and paste this in:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000); // avoid two submissions colliding
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var p = e.parameter;

    // honeypot: real people never fill "website" — bots do. Silently drop them.
    if (p.website) { return json({ ok: true }); }

    sheet.appendRow([
      new Date(),
      p.name || '',
      p.relationship || '',
      p.location || '',
      p.testimonial || '',
      p.email || '',
      p.consent ? 'Yes' : 'No',
      '' // Feature? — you fill this in
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Save** (the disk icon).

## Step 3 — Deploy it as a web app
1. Top right: **Deploy → New deployment**.
2. Click the gear ⚙ next to "Select type" → choose **Web app**.
3. Set:
   - **Description:** anything (e.g. "Testimonials")
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**  ← important, so the public form can post
4. Click **Deploy**, then **Authorize access** and approve the Google permission prompt
   (it's your own script writing to your own sheet).
5. Copy the **Web app URL** it gives you — it looks like
   `https://script.google.com/macros/s/AKfyc…/exec`.

## Step 4 — Hand me the URL
Paste that URL back to me and I'll drop it into the page (the `ENDPOINT` line in
`testimonials/index.html`) and push. From then on, every submission appears as a new
row in your sheet within a second or two.

---

### Testing it
After I wire in the URL, submit a test testimonial from the live page and confirm a row
shows up in the sheet. Delete the test row afterward.

### If you ever want to change it
Edit the script and **Deploy → Manage deployments → (edit) → New version**. The URL
stays the same, so nothing on the site needs to change.

### Prefer a real database instead of a sheet?
Say the word and I'll write a Cloudflare Worker + free D1 database version instead —
same page, different backend, still free and owned by you.
