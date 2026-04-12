document.addEventListener("DOMContentLoaded", function () {

// ================= PAGE NAVIGATION =================
window.openPage = function (page) {
    window.location.href = page;
};

// ================= SMOOTH SCROLL =================
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// ================= HERO AUTO TEXT (SMOOTH APPLE STYLE) =================
const text = document.getElementById("scrollText");
const sub = document.getElementById("scrollSub");

const heroContent = [
    { t: "Learn Smarter", s: "Start your MBBS journey the right way" },
    { t: "Understand Concepts", s: "Build strong fundamentals" },
    { t: "Revise Faster", s: "Save time during exams" },
    { t: "Ace Your Exams", s: "Score with confidence" }
];

let index = 0;
let isAnimating = false;

function changeHeroText() {
    if (!text || !sub || isAnimating) return;

    isAnimating = true;

    // fade out
    text.style.transition = "opacity 0.4s ease";
    sub.style.transition = "opacity 0.4s ease";

    text.style.opacity = 0;
    sub.style.opacity = 0;

    setTimeout(() => {
        index = (index + 1) % heroContent.length;

        text.innerText = heroContent[index].t;
        sub.innerText = heroContent[index].s;

        // fade in using RAF (smoother)
        requestAnimationFrame(() => {
            text.style.opacity = 1;
            sub.style.opacity = 1;
        });

        setTimeout(() => {
            isAnimating = false;
        }, 400);

    }, 400);
}

setInterval(changeHeroText, 3200); // slightly slower = smoother

// ================= FADE ANIMATION (APPLE SMOOTH) =================
const faders = document.querySelectorAll(".fade-up");

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.style.transition = "all 0.6s ease";
        entry.target.classList.add("show");

        observer.unobserve(entry.target);
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
});

faders.forEach(fader => appearOnScroll.observe(fader));

// ================= DARK MODE (NO FLICKER + SMOOTH) =================
const toggle = document.getElementById("darkToggle");

if (toggle) {

    // Apply instantly before render feel
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark");
        toggle.innerText = "☀️";
    }

    toggle.addEventListener("click", function () {

        // smooth transition class
        document.body.style.transition = "background 0.4s ease, color 0.4s ease";

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("darkMode", "enabled");
            toggle.innerText = "☀️";
        } else {
            localStorage.setItem("darkMode", "disabled");
            toggle.innerText = "🌙";
        }

    });
}

// ================= HAMBURGER MENU (CENTERED + CLEAN) =================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

let menuOpen = false;

if (hamburger && navLinks) {

    hamburger.addEventListener("click", function () {

        menuOpen = !menuOpen;

        navLinks.classList.toggle("active");

        // smooth icon change
        hamburger.style.transition = "transform 0.3s ease";
        hamburger.style.transform = "rotate(180deg)";

        setTimeout(() => {
            hamburger.innerText = menuOpen ? "✖" : "☰";
            hamburger.style.transform = "rotate(0deg)";
        }, 150);
    });

    document.querySelectorAll("#navLinks a").forEach(link => {
        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            menuOpen = false;

            hamburger.innerText = "☰";
        });
    });

}

// ================= SCROLL TO TOP =================
const scrollTopBtn = document.getElementById("scrollTop");

if (scrollTopBtn) {

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

}

});
