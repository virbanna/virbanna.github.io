# Vikas Singh Rathore — portfolio

A responsive portfolio featuring Power BI analytics, JavaScript workflow apps, and business automation. All photos, dashboard images, fonts, and code are included locally. No package installation is needed.

GitHub repository: https://github.com/virbanna/virbanna.github.io

Website address: https://virbanna.github.io/ (available after GitHub Pages finishes publishing).

## Preview

Open `index.html` in a browser, or run this command from the portfolio folder:

```text
node server.mjs
```

Then open http://127.0.0.1:4173. The server listens on your computer only.

## Customize

- `index.html` contains the main page, career timeline, skills, and contact links.
- `content.js` contains the project case studies and contact email used by the copy button.
- `styles.css` controls the design and responsive layouts.
- `app.js` handles navigation, filters, project dialogs, and email copying.
- `assets/` contains the profile photo, original dashboard images, favicon, and locally bundled Manrope font with its license.

Update both the page and `content.js` when changing shared details such as an email or project name.

## Publish

This is a static site. Upload `index.html`, `styles.css`, `app.js`, `content.js`, and the `assets` folder to a static host such as GitHub Pages or Netlify. No build command is required. The bundled server is for local previews.

The portfolio itself makes no requests to operational Google Sheets or Apps Script endpoints. Project source links point to your public repositories.

Project and experience references are documented in `CONTENT-SOURCES.md`. The ecommerce dashboard uses a demonstration dataset; its report figures are not presented as business results or personal impact metrics.

## Validation

Checked desktop and mobile layouts at 12 widths from 320px to 1920px. Verified project filters, all three case study dialogs, keyboard focus restoration, career details, mobile navigation, email copy and its fallback, image loading, and internal/source links. No browser errors or failed asset requests were observed.
