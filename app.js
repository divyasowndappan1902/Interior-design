/* ==========================================================================
   INTERIAR MULTI-PAGE ENGINE - CORE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// Global state
const AppState = {
    theme: 'dark',
    sliderInterval: null,
    currentSlide: 0
};

// Database Mocking for Blog modal population
const BlogDatabase = [
    {
        id: 'natural-materials',
        title: 'Natural Materials & Brass Accent Trends',
        date: 'June 18, 2026',
        author: 'Marcus Vance',
        readTime: '5 min read',
        image: 'assets/project_res1.webp',
        content: `
            <p>In the realm of contemporary architecture and luxury interior design, the juxtaposition of raw, organic materials and refined metallic profiles is redefining luxury. Today, we are seeing a shift away from hyper-polished, synthetic surfaces in favor of highly tactile and honest materials that tell a story.</p>
            <h3>The Beauty of Limestone & Marble</h3>
            <p>Natural stones like travertine, tactile limestone, and deeply veined marble serve as the grounding elements of the modern home. When applied as large-format wall claddings or monolithic fireplace surrounds, they introduce an earthy weight and architectural presence to a room.</p>
            <blockquote>"True luxury is found in the honesty of materials and the details of their connections."</blockquote>
            <h3>Incorporating Brass & Bronze</h3>
            <p>To prevent raw stone and rustic timber from feeling too primitive, designers introduce precision-engineered metal profiles. Brushed brass, oil-rubbed bronze, and satin gold details are being integrated into joinery details, baseboards, and light fixtures. These metallic lines act as jewelry for a space, catching light and guiding the eye along architectural thresholds.</p>
            <p>When selecting brass elements, the key is consistency. Maintain matching metal tones across architectural hardware, plumbing fixtures, and lighting accents to ensure a cohesive, unified design narrative throughout the home.</p>
        `
    },
    {
        id: 'minimalist-philosophy',
        title: 'The Narrative of Minimalist Luxury',
        date: 'May 28, 2026',
        author: 'Elena Rostova',
        readTime: '7 min read',
        image: 'assets/hero_kitchen.webp',
        content: `
            <p>Minimalism is often misunderstood as the subtraction of comfort. In reality, architectural minimalism is the careful curation of space, light, and shadow. It is about creating a sanctuary that eliminates visual noise, allowing the mind to rest and focus on the qualities of the surrounding environment.</p>
            <h3>Active Space and Proportion</h3>
            <p>In high-end architectural design, empty space is not a vacuum waiting to be filled—it is an active design element. By leaving walls unadorned and layouts uncluttered, we create breathing room. This heightens the significance of the few curated objects that remain, such as a sculptural chair or an organic ceramic vessel.</p>
            <h3>Shadows as Architectural Art</h3>
            <p>The play of sunlight and shadow through deep window recesses and slatted screens creates dynamic artwork that shifts throughout the day. By designing spaces with attention to solar paths, we allow nature to paint temporary patterns on neutral concrete, plaster, and timber floorboards.</p>
            <blockquote>"Space, light, and order. Those are the things that men need just as much as they need bread or a place to sleep."</blockquote>
            <p>To implement this philosophy in your own space, begin by decluttering. Group functional items inside concealed cabinetry, select a unified, warm cream or charcoal color palette, and prioritize a single, high-quality focal piece over multiple decorative objects.</p>
        `
    },
    {
        id: 'workplace-evolution',
        title: 'Biophilia in the Executive Workspace',
        date: 'April 14, 2026',
        author: 'Julian Thorne',
        readTime: '6 min read',
        image: 'assets/hero_office.webp',
        content: `
            <p>The corporate workspace is undergoing a rapid evolution. The sterile, fluorescent-lit cubicles of the past are being replaced by biophilic executive lounges and organic co-working spaces designed to foster health, collaboration, and high-performance focus.</p>
            <h3>Introducing the Outdoor World Inside</h3>
            <p>Biophilic design is the practice of connecting building occupants to nature. In corporate interiors, this involves the strategic integration of living walls, indoor olive trees, water features, and air-purifying plant installations. These elements not only clean the air but also reduce cognitive fatigue and stress levels.</p>
            <h3>Curved Geometries & Soft Lighting</h3>
            <p>Sharp corners and rigid grid systems can evoke structural tension. Modern workspaces utilize curved drywall partitions, rounded sofa islands, and flowing acoustic screens. This matches the irregular geometries found in natural landscapes, creating a sense of ease.</p>
            <blockquote>"Integrating natural geometries and green foliage inside workspaces improves productivity by up to 15% and boosts overall creative output."</blockquote>
            <p>Combined with circadian lighting systems that mimic the temperature and intensity of natural daylight from sunrise to dusk, biophilic design builds workspaces where people feel energized, inspired, and connected to the natural world.</p>
        `
    }
];

// ==========================================================================
// CORE APP INITIALIZATION
// ==========================================================================
function initApp() {
    initLoader();
    initTheme();
    initNavigation();
    
    // Page Component Detection & Initialization
    if (document.querySelector('.hero-slider-container')) {
        initHomeSlider();
    }
    if (document.querySelector('.filter-tab')) {
        initProjectGallery();
    }
    if (document.querySelector('.accordion-container')) {
        initServicesAccordions();
    }
    if (document.querySelectorAll('.blog-card').length > 0) {
        initBlogCards();
    }
    if (document.getElementById('contact-form')) {
        initContactForm();
    }
    if (document.querySelector('.login-glass-wrapper')) {
        initLoginForm();
    }
    if (document.querySelector('.dashboard-main')) {
        initDashboardNavigation();
    }
    
    initDummyButtons();
}

// ==========================================================================
// DUMMY BUTTON REDIRECTION LOGIC
// ==========================================================================
function initDummyButtons() {
    const buttons = document.querySelectorAll('button, .icon-btn');
    buttons.forEach(btn => {
        // Exclude specific functionality buttons
        if (btn.classList.contains('filter-tab') || 
            btn.classList.contains('hero-slider-btn') || 
            btn.classList.contains('burger-menu') ||
            btn.classList.contains('accordion-trigger') ||
            btn.hasAttribute('data-filter') ||
            btn.hasAttribute('data-slide') ||
            btn.hasAttribute('onclick') ||
            btn.getAttribute('aria-label') === 'Logout' ||
            btn.id === 'burger-menu' || 
            btn.id === 'mobile-sidebar-toggle-btn' ||
            btn.closest('#contact-form') ||
            btn.closest('#footer-newsletter-form') ||
            btn.closest('#blog-newsletter-form') ||
            btn.closest('#sign-in-form') ||
            btn.closest('#register-form')) {
            return;
        }

        // Attach 404 redirection to visual mock buttons
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '404.html';
        });
    });
}

// Loader Screen
function initLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
}

// Theme Engine State Management
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('interiar-theme') || 'dark';
    
    AppState.theme = savedTheme;
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (document.body.classList.contains('dark-theme')) {
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
                AppState.theme = 'light';
            } else {
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
                AppState.theme = 'dark';
            }
            localStorage.setItem('interiar-theme', AppState.theme);
        });
    }
}

// Common Layout Handlers (Header shrink, Mobile Hamburger, Footer newsletter)
function initNavigation() {
    const header = document.querySelector('.main-header');
    const burgerMenu = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    // Scroll shrink header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Hamburger
    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Highlight active link by parsing URL Pathname
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if ((pageName === '' || pageName === 'index.html') && href === 'index.html') {
            link.classList.add('active');
        } else if (href === pageName) {
            link.classList.add('active');
        }
    });

    // Footer Newsletter Form
    const newsletterForm = document.getElementById('footer-newsletter-form');
    const newsletterToast = document.getElementById('newsletter-toast');
    if (newsletterForm && newsletterToast) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Redirect to 404 page on submission as requested
            window.location.href = '404.html';
        });
    }

    // Blog Newsletter Form
    const blogNewsletterForm = document.getElementById('blog-newsletter-form');
    if (blogNewsletterForm) {
        blogNewsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = '404.html';
        });
    }
}

// --- Home Slider Script ---
function initHomeSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slideCount = slides.length;
    
    if (slides.length === 0) return;

    AppState.currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        AppState.currentSlide = index;
    }

    function nextSlide() {
        let newIndex = (AppState.currentSlide + 1) % slideCount;
        showSlide(newIndex);
    }

    function prevSlide() {
        let newIndex = (AppState.currentSlide - 1 + slideCount) % slideCount;
        showSlide(newIndex);
    }

    // Bind arrows
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Bind dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIdx = parseInt(dot.getAttribute('data-slide'));
            showSlide(slideIdx);
        });
    });

    // Start auto-advance
    AppState.sliderInterval = setInterval(nextSlide, 5000);
}

// --- Home Gallery Filtering ---
function initProjectGallery() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('.project-card, .blog-card');

    if (filterTabs.length === 0) return;

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// --- Services Accordion Script ---
function initServicesAccordions() {
    const triggers = document.querySelectorAll('.accordion-trigger');
    if (triggers.length === 0) return;

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const currentItem = trigger.parentElement;
            const content = currentItem.querySelector('.accordion-content');
            const icon = trigger.querySelector('.accordion-icon');
            const isOpen = currentItem.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = '0px';
                const itemIcon = item.querySelector('.accordion-icon');
                if (itemIcon) {
                    itemIcon.className = 'fa-solid fa-plus accordion-icon';
                    itemIcon.style.transform = 'rotate(0deg)';
                }
            });

            // If it wasn't open, open it
            if (!isOpen) {
                currentItem.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) {
                    icon.className = 'fa-solid fa-minus accordion-icon';
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });
}

// --- Blog Lightbox Modal Script ---
function initBlogCards() {
    const cards = document.querySelectorAll('.blog-card');
    const modal = document.getElementById('blog-modal');
    const closeBtn = document.getElementById('blog-modal-close');
    const modalImg = document.getElementById('blog-modal-img');
    const modalBody = document.getElementById('blog-modal-body');

    if (cards.length === 0) return;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Redirect to 404 page on click as requested
            window.location.href = '404.html';
        });
    });

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// --- Contact Form Validator ---
function initContactForm() {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('toast-success');
    
    if (!form) return;

    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        if (input.value !== '') {
            input.placeholder = ' ';
        }
        
        input.addEventListener('input', () => {
            const group = input.parentElement;
            if (input.checkValidity()) {
                group.classList.remove('invalid');
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        inputs.forEach(input => {
            const group = input.parentElement;
            
            if (!input.checkValidity()) {
                group.classList.add('invalid');
                isFormValid = false;
            } else {
                group.classList.remove('invalid');
            }
        });

        // Email address format regex validation
        const emailInput = document.getElementById('contact-email');
        if (emailInput && emailInput.value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const group = emailInput.parentElement;
            if (!emailRegex.test(emailInput.value)) {
                group.classList.add('invalid');
                group.querySelector('.form-error').textContent = 'Please enter a valid email format (e.g. name@domain.com)';
                isFormValid = false;
            } else {
                group.querySelector('.form-error').textContent = 'Please enter a valid email';
            }
        }

        if (isFormValid) {
            // Redirect to 404 page upon successful submission as requested
            window.location.href = '404.html';
        }
    });
}

// --- Login / Register Form Logic ---
function initLoginForm() {
    const tabButtons = document.querySelectorAll('.login-tab-btn');
    const panels = document.querySelectorAll('.login-form-panel');
    const togglePasswordIcons = document.querySelectorAll('.password-toggle');
    const signInForm = document.getElementById('sign-in-form');
    const registerForm = document.getElementById('register-form');
    const toast = document.getElementById('toast-login');
    const toastTitle = document.getElementById('login-toast-title');
    const toastDesc = document.getElementById('login-toast-desc');

    if (!signInForm && !registerForm) return;

    // Tabs Switcher
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPanel = btn.getAttribute('data-tab');
            const panel = document.getElementById(targetPanel);
            if (panel) panel.classList.add('active');
        });
    });

    // Password Visibility toggler
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const passwordInput = icon.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.className = 'fa-regular fa-eye password-toggle';
            } else {
                passwordInput.type = 'password';
                icon.className = 'fa-regular fa-eye-slash password-toggle';
            }
        });
    });

    const inputs = document.querySelectorAll('.glass-input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const group = input.parentElement;
            if (input.checkValidity()) {
                group.classList.remove('invalid');
            }
        });
    });

    // Sign In Submission
    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const email = document.getElementById('login-email');
            const pass = document.getElementById('login-password');

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.checkValidity() || !emailRegex.test(email.value)) {
                email.parentElement.classList.add('invalid');
                const errorSpan = email.parentElement.querySelector('.form-error');
                if (errorSpan) errorSpan.textContent = 'Please enter a valid email address';
                isValid = false;
            } else {
                email.parentElement.classList.remove('invalid');
            }
            
            if (pass.value.length < 8) {
                pass.parentElement.classList.add('invalid');
                const errorSpan = pass.parentElement.querySelector('.form-error');
                if (errorSpan) errorSpan.textContent = 'Password must be at least 8 characters long';
                isValid = false;
            } else {
                pass.parentElement.classList.remove('invalid');
            }

            if (isValid) {
                if (toast && toastTitle && toastDesc) {
                    const roleInput = document.querySelector('input[name="login_role"]:checked');
                    const selectedRole = roleInput ? roleInput.value : 'customer';
                    const destination = selectedRole === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';

                    toastTitle.textContent = 'Access Approved';
                    toastDesc.textContent = 'Redirecting to your dashboard...';
                    toast.classList.add('active');
                    localStorage.setItem('userEmail', email.value);
                    setTimeout(() => {
                        toast.classList.remove('active');
                        // Redirect to dashboard
                        window.location.href = destination;
                    }, 2000);
                }
                signInForm.reset();
            }
        });
    }

    // Register Submission
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const name = document.getElementById('reg-name');
            const email = document.getElementById('reg-email');
            const pass = document.getElementById('reg-password');
            const confirmPass = document.getElementById('reg-confirm-password');

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!name.checkValidity()) {
                name.parentElement.classList.add('invalid');
                const err = name.parentElement.querySelector('.form-error');
                if (err) err.textContent = 'Please enter your full name';
                isValid = false;
            } else {
                name.parentElement.classList.remove('invalid');
            }
            
            if (!email.checkValidity() || !emailRegex.test(email.value)) {
                email.parentElement.classList.add('invalid');
                const err = email.parentElement.querySelector('.form-error');
                if (err) err.textContent = 'Please enter a valid email address';
                isValid = false;
            } else {
                email.parentElement.classList.remove('invalid');
            }
            
            if (pass.value.length < 8) {
                pass.parentElement.classList.add('invalid');
                const err = pass.parentElement.querySelector('.form-error');
                if (err) err.textContent = 'Password must be at least 8 characters long';
                isValid = false;
            } else {
                pass.parentElement.classList.remove('invalid');
            }

            if (confirmPass && pass.value !== confirmPass.value) {
                confirmPass.parentElement.classList.add('invalid');
                const err = confirmPass.parentElement.querySelector('.form-error');
                if (err) err.textContent = 'Passwords do not match';
                isValid = false;
            } else if (confirmPass) {
                confirmPass.parentElement.classList.remove('invalid');
            }

            if (isValid) {
                if (toast && toastTitle && toastDesc) {
                    toastTitle.textContent = 'Account Created';
                    toastDesc.textContent = 'Redirecting to sign in page...';
                    toast.classList.add('active');
                    localStorage.setItem('userEmail', email.value);
                    setTimeout(() => {
                        toast.classList.remove('active');
                        window.location.href = 'login.html';
                    }, 2500);
                }
                registerForm.reset();
            }
        });
    }
}

// --- Dashboard Navigation Logic ---
function initDashboardNavigation() {
    const emailDisplay = document.getElementById('user-display-email');
    if (emailDisplay) {
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            emailDisplay.textContent = savedEmail;
            emailDisplay.title = savedEmail;
        }

    // Sidebar Toggle Logic (Desktop)
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const dashboardSidebar = document.querySelector('.dashboard-sidebar');
    if (sidebarToggleBtn && dashboardSidebar) {
        sidebarToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dashboardSidebar.classList.toggle('collapsed');
        });
    }

    // Sidebar Toggle Logic (Mobile)
    const mobileSidebarToggleBtn = document.getElementById('mobile-sidebar-toggle-btn');
    
    if (mobileSidebarToggleBtn && dashboardSidebar) {
        mobileSidebarToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dashboardSidebar.classList.toggle('mobile-open');
        });
    }
    }

    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-panel]');
    const panels = document.querySelectorAll('.dashboard-panel');

    if (sidebarLinks.length === 0 || panels.length === 0) return;

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Toggle submenu if it exists
            const hasSubmenu = link.querySelector('.submenu-icon');
            if (hasSubmenu) {
                const parentItem = link.closest('.sidebar-item');
                if (parentItem) {
                    parentItem.classList.toggle('open');
                }
            }
            
            // Remove active class from all top-level links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            
            // Hide all panels
            panels.forEach(p => {
                p.style.display = 'none';
                p.classList.remove('active');
            });
            
            // Show target panel
            const targetPanelId = link.getAttribute('data-panel');
            const targetPanel = document.getElementById(targetPanelId);
            
            if (targetPanel) {
                targetPanel.style.display = 'block';
                // Trigger reflow for animation
                void targetPanel.offsetWidth;
                targetPanel.classList.add('active');
            }

            // Auto-close sidebar on mobile
            const dashboardSidebar = document.querySelector('.dashboard-sidebar');
            if (dashboardSidebar && dashboardSidebar.classList.contains('mobile-open')) {
                dashboardSidebar.classList.remove('mobile-open');
            }
        });
    });

    // Handle submenu links
    const submenuLinks = document.querySelectorAll('.submenu-link');
    submenuLinks.forEach(subLink => {
        subLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Optional logic if submenu links point to different views inside a panel
            submenuLinks.forEach(l => l.classList.remove('active'));
            subLink.classList.add('active');
        });
    });
}
