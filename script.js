const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#navMenu");
const navLinks = document.querySelectorAll(".nav-links a");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  const isOpen = navMenu.classList.contains("active");

  hamburger.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';

  hamburger.setAttribute("aria-expanded", isOpen);
  hamburger.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
});

// Close menu after clicking a navigation link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");

    hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open navigation menu");
  });
});

const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}

// Set the correct icon
function updateThemeIcon() {
  if (document.body.classList.contains("light-mode")) {
    themeIcon.classList.replace("fa-sun", "fa-moon");
  } else {
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }
}

updateThemeIcon();

// Toggle theme on click
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  const isLight = document.body.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");

  updateThemeIcon();
});

const contactForm = document.querySelector("#contactForm");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.querySelector("#contactName").value.trim();
  const email = document.querySelector("#contactEmail").value.trim();
  const subject = document.querySelector("#contactSubject").value.trim();
  const message = document.querySelector("#contactMessage").value.trim();

  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.");
    return;
  }

  alert(`Thank you, ${name}! Your form has been submitted successfully.`);

  contactForm.reset();
});

function setupActiveNavbar() {
  const navLinks = document.querySelectorAll(".nav-links a");

  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter((section) => section !== null);

  function updateActiveLink() {
    let currentSection = sections[0]?.id || "";

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= 160) {
        currentSection = section.id;
      }
    });

    // Highlight the last section at the bottom of the page
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 5
    ) {
      currentSection = sections[sections.length - 1]?.id || currentSection;
    }

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentSection}`;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  window.addEventListener("resize", updateActiveLink);
  updateActiveLink();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupActiveNavbar);
} else {
  setupActiveNavbar();
}
