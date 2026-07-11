# Kwadwo Agyei — Static Portfolio

A responsive, single-page portfolio made with plain HTML, CSS and vanilla JavaScript. No package manager, framework, or build tool is needed.

## Run locally

Open `index.html` in a current browser, or use a simple static server such as VS Code Live Server. The project uses relative paths and is ready for static hosting.

## Personalise before publishing

Search for `[FILL IN]` in `index.html` to complete the details that only you can verify:

- The CV PDF URL (place your PDF in `assets/cv/` and set its path).
- GitHub and LinkedIn URLs.
- The Formspree endpoint: create a form at [Formspree](https://formspree.io/), then replace `[FILL IN: ADD FORMSPREE FORM ID]` in the contact form action with its form ID.
- The final-year LULC project’s imagery source, classification method, study area and findings.

Existing supplied images have been copied to `assets/images/`. Use compressed WebP/AVIF copies before production if possible. Inline SVGs are used for interface icons, so no icon library is required.

## GitHub Pages deployment

1. Push this folder to a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select your publishing branch (usually `main`) and the `/ (root)` folder, then save.
5. GitHub will provide your public site URL after deployment.

Because this is plain static HTML, it works directly on GitHub Pages without a build step.

## Structure

```text
index.html
css/style.css
js/script.js
assets/
  images/
  cv/          # Add your CV PDF here
  icons/       # Reserved for any additional local icons
```
