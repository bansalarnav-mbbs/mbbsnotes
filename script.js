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
                    behavior: "smooth"
                });
            }
        });
    });


    // ================= HERO TEXT ANIMATION =================
    const text = document.getElementById("scrollText");
    const sub = document.getElementById("scrollSub");

    let lastState = "";

    function updateScrollText(scroll) {
        let state = "";

        if (scroll < 300) state = "1";
        else if (scroll < 700) state = "2";
        else if (scroll < 1200) state = "3";
        else state = "4";

        if (state !== lastState && text && sub) {
            lastState = state;

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

                text.style.opacity = 1;
                sub.style.opacity = 1;

            }, 200);
        }
    }


    // ================= PREMIUM SCROLL ANIMATION =================
    const faders = document.querySelectorAll(".fade-up");

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.2 });

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });


    // ================= FALLBACK FADE (OLD ELEMENTS) =================
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


    // ================= OPTIMIZED SCROLL HANDLER =================
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

    // Run on load
    revealOnScroll();


    // ================= DARK MODE =================
    const toggle = document.getElementById("darkToggle");

    if (toggle) {

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


    // ================= HAMBURGER MENU =================
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {

        hamburger.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("active");

            hamburger.innerText = hamburger.classList.contains("active") ? "✖" : "☰";
        });

        document.querySelectorAll("#navLinks a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                hamburger.classList.remove("active");
                hamburger.innerText = "☰";
            });
        });
    }


    // ================= SCROLL TO TOP BUTTON =================
    const scrollTopBtn = document.getElementById("scrollTop");

    if (scrollTopBtn) {

        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
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
