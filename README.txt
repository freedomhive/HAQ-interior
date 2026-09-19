SETUP — 3 quick things to finish before publishing
====================================================

1. YOUR PHOTO
   Save your headshot as:  images/aniketimage.jpg
   (Exactly that name/extension. If your file is a .png or .jpeg instead,
   just open index.html, find the line with `src="images/aniketimage.jpg"`
   and change the extension to match.)
   Until a photo is added, the hero shows a clean "AP" placeholder — nothing
   will look broken.

2. YOUR RESUME
   Save your resume PDF as:  assets/Aniket-Paithankar-Resume.pdf
   (Exactly that name.) The three "Download Resume" buttons already point here.

3. YOUR GITHUB LINK
   Open script.js, find this line near the bottom:
      var githubURL = "https://github.com/"; // TODO: replace with actual GitHub username
   and replace it with your real GitHub profile URL.

Optional:
- Kumbh Snan already links to https://kumbh-snan.com in the Projects section.
- Fashion Hood and Freedom Studio don't have live links yet, so their
  "Visit Live Project" button is hidden. Add a URL for a project in
  script.js (search for `live:`) and it will appear automatically.

Files:
  index.html   — all content and structure
  style.css    — all styling/design
  script.js    — mobile menu, scroll animations, project pop-up, project data
  images/      — put aniketimage.jpg here
  assets/      — put your resume PDF here

To preview locally, just open index.html in a browser, or run a local server
(e.g. `python3 -m http.server`) from this folder. To publish, upload this
whole folder to any static host (Cloudflare Pages, GitHub Pages, Netlify, etc.).
