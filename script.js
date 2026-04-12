document.addEventListener("DOMContentLoaded", function () {

// ===== SMOOTH SCROLL (NAV LINKS) =====
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// ===== SCROLL TEXT CHANGE (OPTIMIZED + FADE EFFECT) =====
const text = document.getElementById("scrollText");
const sub = document.getElementById("scrollSub");

let lastState = "";

function updateScrollText(scroll) {
    let state = "";

    if (scroll < 300) {
        state = "1";
    } else if (scroll < 700) {
        state = "2";
    } else if (scroll < 1200) {
        state = "3";
    } else {
        state = "4";
    }

    if (state !== lastState && text && sub) {
        lastState = state;

        // fade out
        text.style.opacity = 0;
        sub.style.opacity = 0;

        setTimeout(() => {
            if (state === "1") {
                text.innerText = "Learn Smarter";
                sub.innerText = "Start your MBBS journey the right way";
            } else if (state === "2") {
                text.innerText = "Understand Concepts";
                sub.innerText = "Build strong fundamentals";
            } else if (state === "3") {
                text.innerText = "Revise Faster";
                sub.innerText = "Save time during exams";
            } else {
                text.innerText = "Ace Your Exams";
                sub.innerText = "Score with confidence";
            }

            // fade in
            text.style.opacity = 1;
            sub.style.opacity = 1;

        }, 200);
    }
}


// ===== SCROLL FADE-IN ANIMATION =====
const elements = document.querySelectorAll(".fade-in, .note-card, .card");

function revealOnScroll() {
    let trigger = window.innerHeight * 0.85;

    elements.forEach(function (el) {
        let top = el.getBoundingClientRect().top;

        if (top < trigger) {
            el.classList.add("show");
        }
    });
}


// ===== OPTIMIZED SCROLL HANDLER =====
let ticking = false;

window.addEventListener("scroll", function () {
    let scroll = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(function () {
            updateScrollText(scroll);
            revealOnScroll();
            ticking = false;
        });

        ticking = true;
    }
});

// RUN ON LOAD
revealOnScroll();


// ===== DARK MODE TOGGLE =====
const toggle = document.getElementById("darkToggle");

if (toggle) {

    // Load saved mode
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark");
        toggle.innerText = "☀️";
    }

    toggle.addEventListener("click", function () {
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

});
