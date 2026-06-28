(function () {
    var navbar = document.getElementById('navbar');
    var navLinks = document.querySelector('.nav-links');
    var mobileMenuBtn = document.getElementById('mobile-menu-btn');
    var themeToggle = document.getElementById('theme-toggle');
    var langToggle = document.getElementById('lang-toggle');
    var backToTop = document.getElementById('back-to-top');
    var contactForm = document.getElementById('contact-form');

    var translations = {
        zh: {
            logo: 'Personal Home Page',
            nav_home: '首页',
            nav_about: '关于',
            nav_skills: '技能',
            nav_projects: '项目',
            nav_contact: '联系',
            hero_greeting: '你好，我是',
            hero_title: '贵州民族大学图书情报硕士在读',
            hero_desc: '专注于信息资源管理 & 数字人文研究',
            hero_btn_projects: '查看项目',
            hero_btn_contact: '联系我',
            about_title: '关于我',
            about_p1: '这里是一段关于你的介绍。你可以描述你的背景、兴趣和职业方向。',
            about_p2: '例如：我是一名热爱技术的研究者，专注于自然语言处理和深度学习领域。在学术研究和工程实践中积累了丰富的经验，善于将理论转化为实际应用。',
            info_name_label: '姓名',
            info_email_label: '邮箱',
            info_location_label: '所在地',
            info_location_value: '中国',
            info_status_label: '状态',
            info_status_value: '开放合作',
            about_btn: '了解更多',
            skills_title: '技能',
            skill_python_desc: '深度学习、数据处理、自动化脚本',
            skill_js_desc: '前端开发、Node.js、交互设计',
            skill_dl_name: '深度学习',
            skill_html_desc: '响应式布局、现代设计',
            skill_db_name: '数据库',
            skill_git_desc: '版本控制、团队协作',
            projects_title: '项目',
            proj1_name: 'BERT-CRF 命名实体识别',
            proj1_desc: '基于 BERT 和 CRF 的中文命名实体识别模型，支持多源语料训练与评估。',
            proj2_name: '数据分析平台',
            proj2_desc: '交互式数据可视化平台，支持多维度数据探索与实时图表展示。',
            proj3_name: '个人主页',
            proj3_desc: '你正在浏览的这个网站，纯 HTML/CSS/JS 构建，支持暗色主题与中英双语。',
            contact_title: '联系我',
            contact_desc: '如果你对我的工作感兴趣，或者有任何合作想法，欢迎随时联系我！',
            contact_location: '中国',
            form_name: '你的姓名',
            form_email: '你的邮箱',
            form_subject: '主题',
            form_message: '你的消息',
            form_submit: '发送消息',
            form_sending: '发送中...',
            form_success: '发送成功！'
        },
        en: {
            logo: 'Personal Home Page',
            nav_home: 'Home',
            nav_about: 'About',
            nav_skills: 'Skills',
            nav_projects: 'Projects',
            nav_contact: 'Contact',
            hero_greeting: "Hi, I'm",
            hero_title: 'MLIS Student at Guizhou Minzu University',
            hero_desc: 'Focusing on Information Resource Management & Digital Humanities',
            hero_btn_projects: 'View Projects',
            hero_btn_contact: 'Contact Me',
            about_title: 'About Me',
            about_p1: 'Here is a brief introduction about yourself. You can describe your background, interests, and career direction.',
            about_p2: 'For example: I am a researcher passionate about technology, focusing on NLP and deep learning. I have rich experience in academic research and engineering practice, and I am good at turning theory into practical applications.',
            info_name_label: 'Name',
            info_email_label: 'Email',
            info_location_label: 'Location',
            info_location_value: 'China',
            info_status_label: 'Status',
            info_status_value: 'Open to Collaboration',
            about_btn: 'Learn More',
            skills_title: 'Skills',
            skill_python_desc: 'Deep Learning, Data Processing, Automation',
            skill_js_desc: 'Frontend, Node.js, Interaction Design',
            skill_dl_name: 'Deep Learning',
            skill_html_desc: 'Responsive Layout, Modern Design',
            skill_db_name: 'Database',
            skill_git_desc: 'Version Control, Team Collaboration',
            projects_title: 'Projects',
            proj1_name: 'BERT-CRF Named Entity Recognition',
            proj1_desc: 'A Chinese NER model based on BERT and CRF, supporting multi-source corpus training and evaluation.',
            proj2_name: 'Data Analysis Platform',
            proj2_desc: 'Interactive data visualization platform with multi-dimensional exploration and real-time charts.',
            proj3_name: 'Personal Home Page',
            proj3_desc: 'The website you are browsing now, built with pure HTML/CSS/JS, supporting dark theme and bilingual (ZH/EN).',
            contact_title: 'Contact Me',
            contact_desc: "If you're interested in my work or have any collaboration ideas, feel free to reach out!",
            contact_location: 'China',
            form_name: 'Your Name',
            form_email: 'Your Email',
            form_subject: 'Subject',
            form_message: 'Your Message',
            form_submit: 'Send Message',
            form_sending: 'Sending...',
            form_success: 'Sent Successfully!'
        }
    };

    var currentLang = localStorage.getItem('lang') || 'en';

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

        var langText = langToggle.querySelector('.lang-text');
        langText.textContent = lang === 'zh' ? 'EN' : '中';

        var elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        var placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
    }

    applyLanguage(currentLang);

    langToggle.addEventListener('click', function () {
        var newLang = currentLang === 'zh' ? 'en' : 'zh';
        applyLanguage(newLang);
    });

    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', function () {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
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
        var icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            var icon = mobileMenuBtn.querySelector('i');
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
        var sections = document.querySelectorAll('section[id]');
        var current = '';
        sections.forEach(function (section) {
            var top = section.offsetTop - 100;
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

    var fadeElements = document.querySelectorAll(
        '.skill-card, .project-card, .about-grid, .contact-grid'
    );
    fadeElements.forEach(function (el) {
        el.classList.add('fade-in');
    });

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    var skillFills = entry.target.querySelectorAll('.skill-fill');
                    skillFills.forEach(function (fill) {
                        var width = fill.getAttribute('data-width');
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
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var subject = document.getElementById('subject').value;
        var message = document.getElementById('message').value;

        if (!name || !email || !subject || !message) {
            return;
        }

        var btn = contactForm.querySelector('button[type="submit"]');
        var originalText = btn.textContent;
        btn.textContent = translations[currentLang].form_sending;
        btn.disabled = true;

        setTimeout(function () {
            btn.textContent = translations[currentLang].form_success;
            btn.style.background = '#27ae60';
            btn.style.borderColor = '#27ae60';
            contactForm.reset();

            setTimeout(function () {
                btn.textContent = translations[currentLang].form_submit;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.disabled = false;
            }, 2000);
        }, 1000);
    });

    var heroName = document.querySelector('.hero-name');
    if (heroName) {
        var text = heroName.textContent;
        heroName.textContent = '';
        var i = 0;
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
