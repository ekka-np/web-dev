// Show the current year in the footer
var yearSpan = document.getElementById("current-year");
var thisYear = new Date().getFullYear();
yearSpan.textContent = thisYear;

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
