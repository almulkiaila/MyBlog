# Blog

Personal blog of Aila Al Mulki. A plain static site — no build step.

- `index.html` – page structure
- `styles.css` – beige & pink, minimalist styling
- `i18n.js` – all page text in English, Spanish and Syrian Arabic
- `main.js` – language switcher (remembers your choice; also supports `?lang=es|ar`)

Open `index.html` in a browser to preview.

## Posts

Each post lives in `posts/`: an HTML page plus a `.js` file with its text per language.
Then add its date, title and excerpt at the top of `posts.js`. The homepage shows the latest two; `writing.html` lists them all.
