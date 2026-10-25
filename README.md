# Unit 1 — The British Constitution (Complete Study Portal)

An interactive, mobile-friendly academic study portal for **Unit 1: The British Constitution**, featuring the complete 6-part syllabus, verbatim topic-wise study notes, **966 practice MCQs**, 3D flipping flashcards, a condensed revision sheet with master answer keys, and an interactive constitutional glossary.

---

## Features

- **Full Syllabus (Parts 1 to 6 · 38 Topics)**
  - **Part 1**: Nature and Content of the Constitution (Topics `1.1` – `1.6`)
  - **Part 2**: Component Parts / Sources of the Constitution (Topics `2.1` – `2.8`)
  - **Part 3**: Conventions of the Constitution (Topics `3.1` – `3.7`)
  - **Part 4**: Salient Features of the British Constitution (Topics `4.1` – `4.10`)
  - **Part 5**: Development of the Constitution (Topics `5.1` – `5.7`)
  - **Part 6**: Suggested Readings & Authoritative Works (Topic `6.1`)
- **Complete Verbatim Study Notes**
  - Structured topic-by-topic notes with comparison tables, key exam points, search filtering, revision status tracking, and personal study notes saved locally in your browser.
- **966 Topic-Wise Practice MCQs**
  - **Exam Mode** & **Instant Key Mode** with explanations.
  - Click any option `(a)`, `(b)`, `(c)`, or `(d)` to select it, and **click the same option again to deselect** (leave blank).
  - Filter by *All*, *Unanswered*, *Correct*, *Incorrect*, or *Bookmarked* questions.
- **3D Interactive Flipping Flashcards**
  - Single-card 3D flip mode (with keyboard shortcuts `Space`/`Enter` to flip, `←`/`→` to navigate) and Grid 3D flip mode across all 6 parts.
- **Condensed Revision Sheet & Master Answer Key**
  - Quick one-line revisions, Key Quotes, Key Cases, Key Statutes, Key Constitutional Dates, and the complete 966-question Answer Key.
- **Interactive Word Meaning Tooltip & Glossary**
  - Hover (on desktop) or tap (on mobile) any dotted-underlined constitutional or Latin term (*ultra vires*, *prerogative*, *convention*, *magna carta*, etc.) to view its definition and context.
- **3 Custom Themes**
  - **Light Mode**: Clean academic paper palette.
  - **Dark Mode**: Multi-shade charcoal and zinc dark palette.
  - **3-Color Theme**: Custom palette using `#f5ecc2` (Cream), `#437742` (Forest Green), and `#97acc8` (Slate Blue).

---

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## Publishing to GitHub Pages

This project is pre-configured with `base: './'` in `vite.config.ts`, so it works automatically on any GitHub repository name (`https://<your-username>.github.io/<your-repo-name>/`).

### Option 1: Automatic Deployment via GitHub Actions (Recommended)

A workflow file is already included at `.github/workflows/deploy.yml`.

1. Push this project to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: British Constitution Study Portal"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. On GitHub, open your repository and go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. The **Deploy to GitHub Pages** workflow will automatically build and publish your site on every push to `main`.

### Option 2: Manual CLI Deployment using `gh-pages`

You can also deploy directly from your terminal onto the `gh-pages` branch:

1. Run the deploy script:
   ```bash
   npm run deploy
   ```
2. On GitHub, go to **Settings → Pages**, set **Source** to **Deploy from a branch**, and select the `gh-pages` branch (`/ (root)`).
