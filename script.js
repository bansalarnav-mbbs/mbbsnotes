document.addEventListener("DOMContentLoaded", function () {

    // ===== SCROLL TEXT CHANGE =====
    const text = document.getElementById("scrollText");
    const sub = document.getElementById("scrollSub");

    window.addEventListener("scroll", function () {
        let scroll = window.scrollY;

        if (text && sub) {
            if (scroll < 300) {
                text.innerText = "Learn Smarter";
                sub.innerText = "Start your MBBS journey the right way";
            } 
            else if (scroll < 700) {
                text.innerText = "Understand Concepts";
                sub.innerText = "Build strong fundamentals";
            } 
            else if (scroll < 1200) {
                text.innerText = "Revise Faster";
                sub.innerText = "Save time during exams";
            } 
            else {
                text.innerText = "Ace Your Exams";
                sub.innerText = "Score with confidence";
            }
        }
    });


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

    window.addEventListener("scroll", revealOnScroll);

    // RUN ON LOAD ALSO
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

            // Save preference
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
