// ========================================
// PORTFOLIO JAVASCRIPT
// Evangelin Blessy RS
// ========================================


// ========================================
// MOBILE MENU
// ========================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("open");
    });

    // Close mobile menu after clicking a link
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("open");
        });
    });
}

// Close menu on outside click
document.addEventListener("click", function (e) {
    if (!menuToggle || !navLinks) return;
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("open");
    }
});


// ========================================
// STICKY HEADER STYLE
// ========================================

const header = document.getElementById("header");

function handleScroll() {
    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
    updateActiveNavLink();
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();


// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function updateActiveNavLink() {
    const scrollY = window.scrollY;

    sections.forEach(function (section) {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
            navItems.forEach(function (link) {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + section.getAttribute("id")) {
                    link.classList.add("active");
                }
            });
        }
    });
}


// ========================================
// SMOOTH SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: "smooth" });
        }
    });
});


// ========================================
// TYPED TEXT ANIMATION
// ========================================

const typedText = document.getElementById("typed-text");

const phrases = [
    "MCA Graduate",
    "Python Developer",
    "Django Developer",
    "Web Developer",
    "ML Enthusiast"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
    if (!typedText) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typedText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
    } else {
        typedText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1800; // pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400; // pause before typing next
    }

    setTimeout(typeEffect, typingSpeed);
}

setTimeout(typeEffect, 600);


// ========================================
// PARTICLE CANVAS
// ========================================

(function () {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    window.addEventListener("resize", function () {
        resize();
        initParticles();
    });

    resize();

    function randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    function initParticles() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 14000);

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: randomBetween(1, 2.8),
                dx: randomBetween(-0.25, 0.25),
                dy: randomBetween(-0.25, 0.25),
                alpha: randomBetween(0.2, 0.7)
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(function (p) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(147, 197, 253, " + p.alpha + ")";
            ctx.fill();

            // Move
            p.x += p.dx;
            p.y += p.dy;

            // Wrap around
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = "rgba(147, 197, 253, " + (0.12 * (1 - dist / 110)) + ")";
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        animationId = requestAnimationFrame(drawParticles);
    }

    initParticles();
    drawParticles();
})();


// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

const revealElements = document.querySelectorAll(
    ".skill-card, .project-card, .education-card, " +
    ".timeline-content, .research-card, .certificate-card, " +
    ".contact-card, .stat-item, .about-content, .hero-badge"
);

const revealObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

revealElements.forEach(function (el) {
    el.classList.add("reveal");
    revealObserver.observe(el);
});


// ========================================
// CURRENT YEAR
// ========================================

const currentYear = document.getElementById("current-year");
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// ========================================
// CONSOLE MESSAGE
// ========================================

console.log(
    "%c👩‍💻 Evangelin Blessy RS — Portfolio",
    "color: #2563eb; font-size: 16px; font-weight: bold;"
);
console.log(
    "%cMCA Graduate | Python & Django Developer",
    "color: #06b6d4; font-size: 13px;"
);
