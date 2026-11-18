# Kwadwo Agyei — Static Portfolio

Plain HTML, CSS and vanilla JavaScript. No build step.

## Run locally
Open `index.html` in a browser (or use VS Code Live Server). All paths are relative.

## Before publishing
1. **Contact form:** create a form at https://formspree.io and paste its endpoint link (or just the ID after `/f/`) into `data-form-id=""` on the `<form class="contact-form">` in `index.html`. While empty, the form opens the visitor's email app.
2. **Images:** the thesis comparison map, Colouring Ghana and Coordinate Setout screenshots, and `og-image.jpg` (social preview) are already in `assets/images/`. Compress any other photos you add.
3. **Social preview:** add `og:url` and `og:image` (absolute URLs) in the `<head>` once you know your live address.
4. **LULC thesis:** accuracy table and 2018/2024 maps are in the research card. If you re-run validation on independent areas, update the table and the note in `data-details`.
5. Remove unused files (`Kwadwo.jpeg`, `TopImagesbackground.jpeg`, the Finnish Air Force photo, the `.docx` template).

## GitHub Pages
Settings → Pages → Deploy from a branch → `main` / `(root)`.

## Structure
```text
index.html
css/style.css
js/script.js
assets/images/
documents/Kwadwo_Agyei_CV.pdf
images/frozen.jpg   (page background)
```
