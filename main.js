document.addEventListener("DOMContentLoaded", function() {

    /**
     * Loads an HTML component from a file and injects it into a selector.
     * @param {string} selector - The CSS selector for the target element.
     * @param {string} url - The URL of the HTML file to load.
     * @param {function} [callback] - An optional callback function to run after loading.
     */
    const loadComponent = (selector, url, callback) => {
        const element = document.querySelector(selector);
        if (!element) return;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                element.innerHTML = data;
                if (callback) callback();
            })
            .catch(error => console.error(`Error loading component for ${selector} from ${url}:`, error));
    };

    /**
     * Initializes the mobile navigation toggle functionality.
     */
    const initMobileNav = () => {
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const mainNav = document.querySelector('.main-nav');
        if (mobileNavToggle && mainNav) {
            mobileNavToggle.addEventListener('click', () => {
                mainNav.classList.toggle('active');
            });
        }
    };

    /**
     * Generates the header for sub-pages based on data attributes on the body tag.
     */
    const generatePageHeader = () => {
        const pageHeader = document.querySelector('header.page-header');
        if (!pageHeader) return;

        const { pageTitle, backLink, backText } = document.body.dataset;

        if (pageTitle && backLink && backText) {
            pageHeader.innerHTML = `
                <h1>${pageTitle}</h1>
                <a href="${backLink}">${backText}</a>
            `;
        }
    };

    // --- Component Loading ---

    // Load main header and initialize its scripts
    loadComponent('header.sticky-header', '_header.html', initMobileNav);

    // Load the shared footer
    loadComponent('footer', '_footer.html');

    // Generate the page-specific header for sub-pages
    generatePageHeader();
});