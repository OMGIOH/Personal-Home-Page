(function () {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTop = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contact-form');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', function () {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });

    mobileMenuBtn.addEventListener('click', function () {
        navLinks.classList.toggle('open');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        updateActiveNav();
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(function (section) {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    const fadeElements = document.querySelectorAll(
        '.skill-card, .project-card, .about-grid, .contact-grid'
    );
    fadeElements.forEach(function (el) {
        el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    const skillFills = entry.target.querySelectorAll('.skill-fill');
                    skillFills.forEach(function (fill) {
                        const width = fill.getAttribute('data-width');
                        fill.style.width = width + '%';
                    });
                }
            });
        },
        { threshold: 0.1 }
    );

    fadeElements.forEach(function (el) {
        observer.observe(el);
    });

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !subject || !message) {
            return;
        }

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = '发送中...';
        btn.disabled = true;

        setTimeout(function () {
            btn.textContent = '发送成功！';
            btn.style.background = '#27ae60';
            btn.style.borderColor = '#27ae60';
            contactForm.reset();

            setTimeout(function () {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.disabled = false;
            }, 2000);
        }, 1000);
    });

    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const text = heroName.textContent;
        heroName.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroName.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 500);
    }
})();
