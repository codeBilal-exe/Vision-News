# Vision News

A modern, responsive, and fully-featured static news portal website.

## 🚀 Features

### 1. **Robust UI & Responsive Design**
- Built with modern HTML5 and vanilla CSS3 utilizing CSS Grid and Flexbox for complex alignments.
- Dynamic layouts rigorously optimized for Desktop, Tablet, and Mobile screens.
- Smooth scroll animations, interactive hover states, and dynamic number counters using JavaScript's `IntersectionObserver`.
- Clean, typography-first news aesthetic prioritizing readability and structural hierarchy.

### 2. **Global Language Translation**
- Persistent multi-language support (English, French, German, Chinese) via an integrated Google Translate API overlay.
- Custom dropdown/selector UI that intelligently overrides the default Google styling and preserves the language state across page navigation using browser cookies.

### 3. **Dynamic Client-Side Search**
- Intelligent cross-page search functionality. Searching from any sub-page automatically redirects the user to the homepage and applies the parsed query string.
- Real-time DOM filtering on the Homepage to instantly display relevant articles, hero banners, and sidebars without triggering a full page reload.

### 4. **Premium Subscription Paywall**
- Built-in `Read More` interception. Attempting to access full articles on the home page smoothly triggers a blurred-background modal overlay (`paywall-modal`).
- Seamlessly directs users to the `BuyNow.html` checkout flow, gracefully simulating a premium journalism SaaS model.

### 5. **Performance Optimized**
- Near-zero runtime overhead with highly optimized, vanilla JavaScript routines.
- `loading="lazy"` attributes implemented aggressively on below-the-fold media to drastically conserve initial bandwidth payload.
- Consolidated CSS rules into a single elegant `Webstyle.css` stylesheet, minimizing HTTP requests and reducing inline bloat.

### 6. **Production-Ready SEO & Accessibility (A11Y)**
- Fully tagged with `meta` descriptions, `viewport` constraints, and Open Graph (`og:tags`) for flawless social media sharing.
- Contextual `Schema.org` JSON-LD structured data (`NewsArticle` schema) injected to maximize search engine indexing.
- Robust ARIA-labels implemented across navigation icons, menus, and forms to ensure pristine screen-reader accessibility.
- Semantic HTML tags (`<header>`, `<main>`, `<footer>`, `<aside>`, `<article>`) enforce strict semantic logic.

## 📁 File Structure

```text
Vision-News/
├── index.html            # The primary News feed and landing page
├── README.md            # Project documentation (You are here)
├── css/
│   └── Webstyle.css     # The single global stylesheet powering the entire site
├── js/
│   └── WebScript.js     # Global JavaScript powering search, paywall, translation, and animations
├── pages/               
│   ├── About.html       # Corporate identity & metrics
│   ├── BuyNow.html      # Subscription checkout flow
│   ├── Categories.html  # Dedicated category routing page
│   ├── Download.html    # App download landing page
│   ├── Products.html    # Subscription tiers overview
│   └── Support.html     # Knowledgebase FAQ and contact forms
└── Resources/
    ├── images/          # All graphical assets (WebP, JPG, PNG)
    └── policies/        # Legal documents (Privacy, Terms, Cookies)
```

## 🛠️ Usage & Setup
Vision News is an entirely static, frontend-only application. There is absolutely no external build step, bundler (Webpack/Vite), or package installation required. 

1. **Viewing the site**: Simply double-click `index.html` in your file explorer. However, for the most authentic experience, it is highly recommended to serve the directory via a local development server like VS Code Live Server (`http://localhost:5500`).
2. **Editing Styles**: Essential CSS variables (colors, fonts, sizing, constraints) are exposed in the `:root` scope at the top of `css/Webstyle.css`. Edit these globally to rapidly reskin the site's aesthetic.
3. **Modifying JavaScript**: All core logic (Search filtering, Paywall triggers, Animations, i18n Translations) is centralized securely within `js/WebScript.js`.

> **Note**: Interacting across pages with the translation functionality locally via standard `file:///` protocols might occasionally run into security restrictions limiting cookie persistence depending on your specific web browser. For optimal localized testing, serve the root directory locally using a lightweight HTTP server.
