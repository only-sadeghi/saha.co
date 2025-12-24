document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. SMART NAVIGATION & SCROLL UX
       ========================================= */
    const nav = document.getElementById('mainNav');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        // --- Hide/Show Navbar on Scroll ---
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        // --- Active Menu Highlighting ---
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Offset of 250px helps trigger the active state slightly before full scroll
            if (scrollTop >= (sectionTop - 250)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSectionId && link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    });

    /* =========================================
       2. SMOOTH SCROLL & HASH REMOVAL
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Prevents # from appearing in URL

            const targetId = this.getAttribute('href');

            // Scroll to Top
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            // Scroll to Section
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Height of fixed header + padding
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
       3. INFINITE MARQUEE (Content Duplication)
       ========================================= */
    const track = document.getElementById('marqueeTrack');
    if (track) {
        const content = track.innerHTML;
        // Duplicate content 4 times to ensure smooth infinite loop
        track.innerHTML = content.repeat(4);
    }
});

/* =========================================
   4. PROCESS TABS (Auto-Rotation & Click)
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
let autoRotateInterval; // Variable to store the timer

// Function to update the UI
function updateTabUI(index) {
    const tabs = document.querySelectorAll('.p-tab');
    const contentBox = document.getElementById('process-desc');

    // Update Active Class
    tabs.forEach((tab, i) => {
        if (i === index) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Fade out/in Text
    if (contentBox) {
        contentBox.style.opacity = 0;
        setTimeout(() => {
            contentBox.textContent = steps[index].desc;
            contentBox.style.opacity = 1;
        }, 300);
    }
}

// Function called by HTML onclick="..."
window.setStep = function(index) {
    currentStep = index;
    updateTabUI(index);

    // Reset timer on manual click to avoid immediate auto-jump
    clearInterval(autoRotateInterval);
    startAutoRotation();
};

// Initialize Auto-Rotation
function startAutoRotation() {
    autoRotateInterval = setInterval(() => {
        let next = (currentStep + 1) % steps.length;
        currentStep = next;
        updateTabUI(next);
    }, 10000); // 10 Seconds
}

// Start on Load
document.addEventListener('DOMContentLoaded', () => {
    updateTabUI(0);
    startAutoRotation();
});
