document.addEventListener("DOMContentLoaded", function () {

    // ================= NAVBAR =================
    const navbar = document.querySelector(".navbar");

    // ================= PAGE NAVIGATION =================
    window.openPage = function (page) {
        window.location.href = page;
    };

    // ================= SMOOTH SCROLL =================
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const id = this.getAttribute("href");
            if (!id || id === "#") return;

            const target = document.querySelector(id);
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // ================= HERO AUTO TEXT =================
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

        text.style.transition = "opacity 0.4s ease";
        sub.style.transition = "opacity 0.4s ease";

        text.style.opacity = 0;
        sub.style.opacity = 0;

        setTimeout(() => {
            index = (index + 1) % heroContent.length;

            text.innerText = heroContent[index].t;
            sub.innerText = heroContent[index].s;

            requestAnimationFrame(() => {
                text.style.opacity = 1;
                sub.style.opacity = 1;
            });

            setTimeout(() => {
                isAnimating = false;
            }, 400);

        }, 400);
    }

    function loopHeroText() {
        changeHeroText();
        setTimeout(loopHeroText, 3200);
    }
    loopHeroText();

    // ================= FADE ANIMATION =================
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

    // ================= DARK MODE =================
    const toggle = document.getElementById("darkToggle");

    if (toggle) {

        // Load saved mode
        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark");
            toggle.innerText = "☀️";
        }

        toggle.addEventListener("click", function () {

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

    // ================= HAMBURGER MENU =================
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    let menuOpen = false;

    if (hamburger && navLinks) {

        hamburger.addEventListener("click", function () {

            menuOpen = !menuOpen;
            navLinks.classList.toggle("active");

            hamburger.style.transition = "transform 0.3s ease";
            hamburger.style.transform = menuOpen ? "rotate(180deg)" : "rotate(0deg)";

            setTimeout(() => {
                hamburger.innerText = menuOpen ? "✖" : "☰";
            }, 150);
        });

        document.querySelectorAll("#navLinks a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuOpen = false;
                hamburger.innerText = "☰";
                hamburger.style.transform = "rotate(0deg)";
            });
        });
    }

    // ================= SCROLL EVENTS (MERGED) =================
    const scrollTopBtn = document.getElementById("scrollTop");

    window.addEventListener("scroll", () => {

        const scrollY = window.scrollY;

        // NAVBAR EFFECT
        if (navbar) {
            if (scrollY > 20) navbar.classList.add("scrolled");
            else navbar.classList.remove("scrolled");
        }

        // SCROLL TOP BUTTON
        if (scrollTopBtn) {
            if (scrollY > 300) scrollTopBtn.classList.add("show");
            else scrollTopBtn.classList.remove("show");
        }

        // DARK MODE LIGHT EFFECT
        if (!document.body.classList.contains("dark")) return;

        const home = document.querySelector(".home");
        if (!home) return;

        let opacity = Math.min(scrollY / 500, 0.3);

        home.style.background = `
            radial-gradient(circle at 50% 20%, rgba(255,232,163,${0.12 - opacity}), transparent 40%),
            linear-gradient(135deg, #0a0a0a, #181818, #222222)
        `;
    });

    // ================= RIPPLE EFFECT =================
    document.querySelectorAll(".note-card").forEach(card => {

        ["click", "touchstart"].forEach(evt => {

            card.addEventListener(evt, function (e) {

                const ripple = document.createElement("span");
                ripple.classList.add("ripple");

                const rect = card.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);

                ripple.style.width = ripple.style.height = size + "px";

                const x = e.touches ? e.touches[0].clientX : e.clientX;
                const y = e.touches ? e.touches[0].clientY : e.clientY;

                ripple.style.left = (x - rect.left - size / 2) + "px";
                ripple.style.top = (y - rect.top - size / 2) + "px";

                card.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });

        });

    });

});