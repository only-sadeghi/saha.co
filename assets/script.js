document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. SCROLL REVEAL ANIMATION
       ========================================= */
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15
    });
    revealElements.forEach(el => revealObserver.observe(el));

    /* =========================================
       2. SMART NAVIGATION (Sticky on Up Scroll)
       ========================================= */
    const nav = document.getElementById('mainNav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;

        // Add Glass effect on scroll
        if (scrollTop > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Hide on Down, Show on Up
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling Down
            nav.classList.remove('nav-up');
            nav.classList.add('nav-down');
        } else {
            // Scrolling Up
            nav.classList.remove('nav-down');
            nav.classList.add('nav-up');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    /* =========================================
       3. SMOOTH SCROLL
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =========================================
       4. INFINITE MARQUEE
       ========================================= */
    const track = document.getElementById('marqueeTrack');
    if (track) {
        const content = track.innerHTML;
        track.innerHTML = content.repeat(4);
    }
});

/* =========================================
   5. PROCESS TABS LOGIC
   ========================================= */
const steps = [{
        title: "۱. مشاوره",
        desc: "پروژه شما نیازسنجی شده و بهترین راهکارهای فنی همراه قیمت‌های اقتصادی توسط کارشناسان ما پیشنهاد می‌شود. ما به شما کمک می‌کنیم تا بهترین تصمیم را برای زیرساخت برق خود بگیرید."
    },
    {
        title: "۲. بازدید",
        desc: "تیم فنی به محل پروژه اعزام شده و پس از بررسی دقیق، سیستم نیرورسانی برق شما را مطابق با استانداردهای وزارت نیرو و مقررات ملی انجام می‌دهد."
    },
    {
        title: "۳. اجرا",
        desc: "پس از تایید نقشه‌ها، تیم اجرایی ما با استفاده از تجهیزات استاندارد و با رعایت کامل نکات ایمنی (HSE)، فرآیند اجرای پروژه را آغاز کرده و پس از تست‌های نهایی پروژه شما تحویل داده می‌شود."
    }
];

let currentStep = 0;
let autoRotateInterval;

function updateTabUI(index) {
    const tabs = document.querySelectorAll('.p-tab');
    const lines = document.querySelectorAll('.p-line');
    const contentBox = document.getElementById('process-desc');

    tabs.forEach((tab, i) => {
        if (i <= index) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    lines.forEach((line, i) => {
        if (i < index) {
            line.classList.add('active');
        } else {
            line.classList.remove('active');
        }
    });

    if (contentBox) {
        contentBox.style.opacity = 0;
        contentBox.style.transform = 'translateY(10px)';

        setTimeout(() => {
            contentBox.textContent = steps[index].desc;
            contentBox.style.opacity = 1;
            contentBox.style.transform = 'translateY(0)';
        }, 300);
    }
}

window.setStep = function(index) {
    currentStep = index;
    updateTabUI(index);
    clearInterval(autoRotateInterval);
    startAutoRotation();
};

function startAutoRotation() {
    autoRotateInterval = setInterval(() => {
        let next = (currentStep + 1) % steps.length;
        currentStep = next;
        updateTabUI(next);
    }, 8000);
}

document.addEventListener('DOMContentLoaded', () => {
    updateTabUI(0);
    startAutoRotation();
});

// --- Active Menu Highlighting Logic ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 150; // Offset for better accuracy

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current) && current !== '') {
            link.classList.add('active');
        }
    });
});
