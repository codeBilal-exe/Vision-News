/* ─── Global Vision News Script ─────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

    // ── Dynamic Navigation Date ───────────────────────────
    const navDateEl = document.querySelector('.nav-date');
    if (navDateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        // Simulated loading delay to display the loading indicator
        setTimeout(() => {
            navDateEl.textContent = new Date().toLocaleDateString('en-US', options);
        }, 800);
    }

    // ── Scroll-reveal (IntersectionObserver) ──────────────
    const revealEls = document.querySelectorAll(
        '.card, .sidebar-widget, .pricing-card, .download-card, .team-card, .timeline-box, .faq-item, .contact-form, .stat-item'
    );
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealEls.forEach(el => observer.observe(el));

    // ── Animated stat counter ─────────────────────────────
    function animateCount(el) {
        const raw = el.textContent.trim();
        const num = parseFloat(raw.replace(/[^\d.]/g, ''));
        const suffix = raw.replace(/[\d.]/g, '');
        if (isNaN(num)) return;
        let start = null;
        const duration = 1400;
        const step = timestamp => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const val = num % 1 === 0
                ? Math.round(num * eased)
                : (num * eased).toFixed(1);
            el.textContent = val + suffix;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));

    // ── Global Language Persistence & Translation ─────────
    const langMap = { 'EN': 'en', 'FR': 'fr', 'DE': 'de', 'CN': 'zh-CN' };
    const revLangMap = { 'en': 'EN', 'fr': 'FR', 'de': 'DE', 'zh-CN': 'CN' };

    let currentLang = 'en';
    const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (match) {
        currentLang = match[1];
    }

    document.querySelectorAll('.lang-selector span').forEach(s => {
        s.classList.remove('active');
        if (s.textContent.trim() === revLangMap[currentLang]) {
            s.classList.add('active');
        }
    });

    document.querySelectorAll('.lang-selector span').forEach(span => {
        span.addEventListener('click', (e) => {
            const targetLang = langMap[e.target.textContent.trim()];
            if (targetLang && targetLang !== currentLang) {
                e.preventDefault();
                document.cookie = "googtrans=/en/" + targetLang + "; path=/;";
                document.cookie = "googtrans=/en/" + targetLang + "; domain=" + window.location.hostname + "; path=/;";
                window.location.reload();
            }
        });
    });

    // ── Search functionality ──────────────────────────────
    const searchForms = document.querySelectorAll('.search-form');
    searchForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="search"]');
            if (input) {
                const query = input.value.trim();
                const path = window.location.pathname;

                // If on Home page
                if (path.endsWith('index.html') || path.endsWith('/') || path.includes('index.html')) {
                    performSearch(query);
                    // Update URL without reloading
                    const newUrl = query ? `?search=${encodeURIComponent(query)}` : window.location.pathname;
                    window.history.pushState({ path: newUrl }, '', newUrl);
                } else if (query) {
                    // Redirect to index.html
                    const isRoot = !path.includes('/pages/');
                    const homePath = isRoot ? 'index.html' : '../index.html';
                    window.location.href = `${homePath}?search=${encodeURIComponent(query)}`;
                }
            }
        });
    });

    // Check URL parameters on load for Home page
    const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.includes('index.html');
    if (isHome) {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('search');
        if (query) {
            const input = document.querySelector('.search-form input[type="search"]');
            if (input) input.value = query;
            performSearch(query);
        }
    }

    function performSearch(query) {
        query = query.toLowerCase();
        // Elements to filter (main articles, hero banner, sidebar trending)
        const cards = document.querySelectorAll('.card, .hero-content, .trending-list li');
        let found = false;

        cards.forEach(card => {
            let targetEl = card;
            if (card.classList.contains('hero-content')) {
                // Determine if we need to hide the entire hero banner container
                targetEl = card.closest('.hero-banner');
            }

            if (!query || card.textContent.toLowerCase().includes(query)) {
                if (targetEl) targetEl.style.display = '';
                if (!query || card.textContent.toLowerCase().includes(query)) found = true;
            } else {
                if (targetEl) targetEl.style.display = 'none';
            }
        });

        // Always 'found' if no query
        if (!query) found = true;

        const articleGrid = document.querySelector('.article-grid');
        let msgEl = document.getElementById('search-message');

        if (!msgEl && articleGrid) {
            msgEl = document.createElement('div');
            msgEl.id = 'search-message';
            msgEl.style.textAlign = 'center';
            msgEl.style.padding = '40px 20px';
            msgEl.style.fontSize = '1.2rem';
            msgEl.style.gridColumn = '1 / -1';
            msgEl.style.color = 'var(--gray-2)';
            articleGrid.appendChild(msgEl);
        }

        if (msgEl) {
            if (!found) {
                msgEl.innerHTML = `<i class="fa fa-search" style="font-size: 2rem; margin-bottom: 12px; display: block;"></i> No results found for "<strong>${query}</strong>".`;
                msgEl.style.display = 'block';
            } else {
                msgEl.style.display = 'none';
            }
        }

        // Auto-scroll to content view if active search
        if (query) {
            const mainContent = document.querySelector('.container') || document.querySelector('.hero-banner');
            if (mainContent) {
                mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    // ── Paywall Modal Functionality ───────────────────────
    function initPaywall() {
        // Create the modal HTML dynamically if it doesn't exist
        if (!document.getElementById('paywall-modal-overlay')) {
            const isRoot = !window.location.pathname.includes('/pages/');
            const buyNowLink = isRoot ? 'pages/BuyNow.html' : 'BuyNow.html';

            const overlay = document.createElement('div');
            overlay.id = 'paywall-modal-overlay';
            overlay.className = 'paywall-overlay';
            overlay.innerHTML = `
                <div class="paywall-modal">
                    <button class="paywall-modal-close" id="paywall-close" aria-label="Close modal">&times;</button>
                    <i class="fa fa-lock paywall-icon"></i>
                    <h3 class="paywall-title">Unlock Full Access</h3>
                    <p class="paywall-desc">You've reached the end of your free preview. Subscribe to Vision Pro today to read the full story and get unlimited access to all our journalism.</p>
                    <a href="${buyNowLink}" class="btn btn-primary btn-lg" style="width: 100%; justify-content: center; margin-bottom: 12px;">Subscribe Now</a>
                    <a href="#" id="paywall-login" style="font-size: .875rem; color: var(--gray-2); text-decoration: underline;">Already a subscriber? Log in</a>
                </div>
            `;
            document.body.appendChild(overlay);

            // Bind close events
            const closeBtn = document.getElementById('paywall-close');
            closeBtn.addEventListener('click', closePaywall);

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    closePaywall();
                }
            });
        }

        // Hook up to all article links that go to "#"
        const readLinks = document.querySelectorAll('.card a, .hero-content a, .trending-list a, .btn');
        readLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href.startsWith('#') || href.includes('javascript'))) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    openPaywall();
                });
            }
        });
    }

    function openPaywall() {
        document.body.classList.add('paywall-active');
        document.getElementById('paywall-modal-overlay').classList.add('active');
    }

    function closePaywall() {
        document.body.classList.remove('paywall-active');
        document.getElementById('paywall-modal-overlay').classList.remove('active');
    }

    // Run initialization
    initPaywall();

});
