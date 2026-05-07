document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Dark Mode Toggle
    const themeToggleBtns = document.querySelectorAll('#theme-toggle, .theme-toggle-btn');
    const htmlEl = document.documentElement;
    
    // Check local storage for theme
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlEl.classList.add('dark');
    } else {
        htmlEl.classList.remove('dark');
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            htmlEl.classList.toggle('dark');
            if (htmlEl.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    });

    // RTL Toggle
    const rtlToggleBtns = document.querySelectorAll('#rtl-toggle, .rtl-toggle-btn');
    
    // Check local storage for direction
    if (localStorage.getItem('dir') === 'rtl') {
        htmlEl.setAttribute('dir', 'rtl');
        htmlEl.classList.add('dir-rtl');
    } else {
        htmlEl.setAttribute('dir', 'ltr');
        htmlEl.classList.remove('dir-rtl');
    }

    rtlToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (htmlEl.getAttribute('dir') === 'rtl') {
                htmlEl.setAttribute('dir', 'ltr');
                htmlEl.classList.remove('dir-rtl');
                localStorage.setItem('dir', 'ltr');
            } else {
                htmlEl.setAttribute('dir', 'rtl');
                htmlEl.classList.add('dir-rtl');
                localStorage.setItem('dir', 'rtl');
            }
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Navbar Scroll Effect (Glassmorphism & Color Swap)
    const header = document.getElementById('main-header');
    if (header) {
        const brandName = header.querySelector('.font-display');
        const navLinks = header.querySelectorAll('.nav-link:not(.text-primary)');
        const actionIcons = header.querySelectorAll('#rtl-toggle, #theme-toggle, .rtl-toggle-btn, .theme-toggle-btn, #mobile-menu-btn');
        const isTransparentPage = header.getAttribute('data-transparent') === 'true';

        const updateHeaderStyle = () => {
            if (window.scrollY > 50) {
                header.classList.add('glass', 'shadow-sm', 'bg-white/90', 'dark:bg-dark/90');
                header.classList.remove('bg-transparent', 'text-white');
                
                if (brandName) {
                    brandName.classList.add('text-slate-900', 'dark:text-white');
                    brandName.classList.remove('text-white');
                }
                
                navLinks.forEach(link => {
                    link.classList.add('text-slate-700', 'dark:text-slate-300');
                    link.classList.remove('text-white/90', 'text-white/80', 'text-white');
                });

                actionIcons.forEach(btn => {
                    btn.classList.add('text-slate-600', 'dark:text-slate-400');
                    btn.classList.remove('text-white/80', 'text-white');
                });
            } else if (isTransparentPage) {
                header.classList.remove('glass', 'shadow-sm', 'bg-white/90', 'dark:bg-dark/90');
                header.classList.add('bg-transparent', 'text-white');
                
                if (brandName) {
                    brandName.classList.remove('text-slate-900', 'dark:text-white');
                    brandName.classList.add('text-white');
                }

                navLinks.forEach(link => {
                    link.classList.remove('text-slate-700', 'dark:text-slate-300');
                    link.classList.add('text-white/90');
                });

                actionIcons.forEach(btn => {
                    btn.classList.remove('text-slate-600', 'dark:text-slate-400');
                    btn.classList.add('text-white/80');
                });
            }
        };

        window.addEventListener('scroll', updateHeaderStyle);
        updateHeaderStyle(); // Initial check
    }

    // Floating Brush (Scroll to Top) Logic
    const scrollBtn = document.getElementById('scroll-top-brush');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.pointerEvents = 'auto';
                scrollBtn.style.transform = 'scale(1)';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.pointerEvents = 'none';
                scrollBtn.style.transform = 'scale(0.5)';
            }
        });
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        if (question && answer && icon) {
            question.addEventListener('click', () => {
                const isOpen = !answer.classList.contains('hidden');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.faq-answer').classList.add('hidden');
                        otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
                    }
                });

                // Toggle current item
                if (isOpen) {
                    answer.classList.add('hidden');
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    answer.classList.remove('hidden');
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        }
    });

    // Final icon refresh to catch any late elements
    lucide.createIcons();
});

