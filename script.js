// Show the current year in the footer
var yearSpan = document.getElementById("current-year");
var thisYear = new Date().getFullYear();
yearSpan.textContent = thisYear;

// Get all the "Show Details" buttons on the page
var detailButtons = document.querySelectorAll(".details-btn");

// Loop through each button and add a click event listener
for (var i = 0; i < detailButtons.length; i++) {
  detailButtons[i].addEventListener("click", function () {
    // Find the details text that comes right after this button
    var detailsText = this.nextElementSibling;

    // Toggle the hidden class to show or hide the text
    if (detailsText.classList.contains("hidden")) {
      detailsText.classList.remove("hidden");
      this.textContent = "Hide Details";
    } else {
      detailsText.classList.add("hidden");
      this.textContent = "Show Details";
    }
  });
}

// Back to top button
var backToTopButton = document.getElementById("back-to-top-btn");

backToTopButton.addEventListener("click", function () {
  window.scrollTo(0, 0);
});
