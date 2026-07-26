// Back to top button
var backToTopButton = document.getElementById("back-to-top-btn");

backToTopButton.addEventListener("click", function () {
  window.scrollTo(0, 0);
});

// Media protection — deter casual copying
function protectMedia() {
  var mediaElements = document.querySelectorAll("img, video");

  for (var i = 0; i < mediaElements.length; i++) {
    var media = mediaElements[i];

    // Skip SVGs, already-wrapped, and positioned elements
    if (media.closest(".media-container")) continue;
    if (media.tagName === "IMG" && /\.svg$/i.test(media.src)) continue;
    var pos = getComputedStyle(media).position;
    if (pos === "absolute" || pos === "fixed") {
      media.addEventListener("dragstart", function (e) { e.preventDefault(); });
      continue;
    }

    // Wrap in container
    var container = document.createElement("div");
    container.className = "media-container";
    media.parentNode.insertBefore(container, media);
    container.appendChild(media);

    // Add overlay
    var overlay = document.createElement("div");
    overlay.className = "media-overlay";
    container.appendChild(overlay);

    // Match border radius for rounded media
    var br = getComputedStyle(media).borderRadius;
    if (br && br !== "0px") {
      container.style.borderRadius = br;
      container.style.overflow = "hidden";
    }

    // Block right-click on media
    container.addEventListener("contextmenu", function (e) { e.preventDefault(); });

    // Block drag
    media.addEventListener("dragstart", function (e) { e.preventDefault(); });
  }
}

document.addEventListener("DOMContentLoaded", protectMedia);

// Hamburger menu
(function () {
  var hamburger = document.getElementById("hamburger-btn");
  var navList = document.getElementById("nav-list");
  var header = document.querySelector("header");
  var isOpen = false;

  function openMenu() {
    navList.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close navigation menu");
    isOpen = true;
  }

  function closeMenu() {
    navList.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open navigation menu");
    isOpen = false;
    hamburger.focus();
  }

  hamburger.addEventListener("click", function () {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on nav item click
  var navLinks = navList.querySelectorAll("a");
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", closeMenu);
  }

  // Close on outside click
  document.addEventListener("click", function (e) {
    if (isOpen && !header.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen) {
      closeMenu();
    }
  });

  // Trap focus within menu when open
  navList.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var focusable = navLinks;
    if (focusable.length === 0) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();
