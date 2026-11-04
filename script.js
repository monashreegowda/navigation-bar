/* ─────────────────────────────────────────
   1. HAMBURGER TOGGLE
   ───────────────────────────────────────── */
const hamburger = document.getElementById("hamburger");
const navMenu   = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  hamburger.classList.toggle("active", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
});

/* ─────────────────────────────────────────
   2. CLOSE MENU ON LINK CLICK
   ───────────────────────────────────────── */
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

/* ─────────────────────────────────────────
   3. CLOSE MENU ON OUTSIDE CLICK
   ───────────────────────────────────────── */
document.addEventListener("click", (e) => {
  const insideNav = e.target.closest(".nav-container");
  if (!insideNav && navMenu.classList.contains("open")) {
    navMenu.classList.remove("open");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  }
});

/* ─────────────────────────────────────────
   4. KEYBOARD ACCESSIBILITY (ESC to close)
   ───────────────────────────────────────── */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("open")) {
    navMenu.classList.remove("open");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.focus(); // Return focus to the button
  }
});

/* ─────────────────────────────────────────
   5. ACTIVE LINK HIGHLIGHT ON SCROLL
   ───────────────────────────────────────── */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });
      }
    });
  },
  { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
);

sections.forEach((section) => observer.observe(section));

/* ─────────────────────────────────────────
   6. THEME TOGGLE
   ───────────────────────────────────────── */
const themeToggle = document.getElementById("themeToggle");
const themeIcon   = themeToggle.querySelector("i");

// Check local storage on load
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeIcon.className = "fa-solid fa-sun";
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});