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


    // ================= AUTO HERO TEXT (FIXED) =================
    const text = document.getElementById("scrollText");
    const sub = document.getElementById("scrollSub");

    const heroTexts = [
        { title: "Learn Smarter", sub: "Start your MBBS journey the right way" },
        { title: "Understand Concepts", sub: "Build strong fundamentals" },
        { title: "Revise Faster", sub: "Save time during exams" },
        { title: "Ace Your Exams", sub: "Score with confidence" }
    ];

    let index = 0;

    function changeHeroText() {
        if (!text || !sub) return;

        text.style.opacity = 0;
        sub.style.opacity = 0;

        setTimeout(() => {
            index = (index + 1) % heroTexts.length;

            text.innerText = heroTexts[index].title;
            sub.innerText = heroTexts[index].sub;

            text.style.opacity = 1;
            sub.style.opacity = 1;
        }, 300);
    }

    // Run every 3 sec
    setInterval(changeHeroText, 3000);


    // ================= PREMIUM FADE ANIMATION =================
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


    // ================= SCROLL TO TOP =================
    const scrollTopBtn = document.getElementById("scrollTop");

    if (scrollTopBtn) {

        window.addEventListener("scroll", () => {
            scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
        });

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});
