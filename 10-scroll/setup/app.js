// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();
// ********** close links ************
/**
 *  This section of code is responsible for toggling the visibility of the navigation links.
 *  It achieves this by:
 *  1. Selecting the navigation toggle button (`.nav-toggle`) and storing it in a constant `btn`.
 *  2. Selecting the container that holds the navigation links (`.links-container`) and storing it in a constant `linksContainer`.
 *  3. Selecting the navigation links element itself (`.links`) and storing it in a constant `links`.
 *  4. Attaching a click event listener to the navigation toggle button (`btn`).
 *  5. Inside the click event listener:
 *     - Getting the height of the links container using `getBoundingClientRect().height` and storing it in `containerHeight`.
 *     - Getting the height of the navigation links element using `getBoundingClientRect().height` and storing it in `linksHeight`.
 *     - Checking the current height of the links container (`containerHeight`):
 *       - If it's zero (hidden), set the height of the links container to the height of the navigation links (`linksHeight`).
 *       - Otherwise (visible), set the height of the links container back to zero (hidden).
 */
// Get the navigation toggle button element
const btn = document.querySelector(".nav-toggle");
// Get the container element for the navigation links
const linksContainer = document.querySelector(".links-container");
// Get the list of navigation links
const links = document.querySelector(".links");

// Add a click event listener to the navigation toggle button
btn.addEventListener("click", () => {
  // links.classList.toggle("show-links");
  // Get the height of the links container
  const containerHeight = linksContainer.getBoundingClientRect().height;
  // Get the total height of the navigation links
  const linksHeight = links.getBoundingClientRect().height;
  // If the container height is 0 (links are hidden)
  if (containerHeight === 0) {
    // Set the container height to the total height of the links
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    // Otherwise, set the container height to 0 to hide the links
    linksContainer.style.height = 0;
  }
});
// ********** fixed navbar ************
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
    topLink.classList.add("show-link");
  } else {
    navbar.classList.remove("fixed-nav");
    topLink.classList.remove("show-link");
  }
});

// ********** smooth scroll ************
// select links
// Select all elements with the class "scroll-link"
const scrollLinks = document.querySelectorAll(".scroll-link");

// Loop through each scroll link
scrollLinks.forEach((link) => {
  // Add a click event listener to each link
  link.addEventListener("click", (e) => {
    // Prevent the default link behavior
    e.preventDefault();

    // Get the ID of the target element from the link's href attribute
    const id = e.currentTarget.getAttribute("href").slice(1);

    // Select the target element using the ID
    const element = document.getElementById(id);

    // Get the height of the navigation bar
    const navHeight = navbar.getBoundingClientRect().height;

    // Get the height of the links container
    const containerHeight = linksContainer.getBoundingClientRect().height;

    // Check if the navigation bar has the "fixed-nav" class
    const fixedNav = navbar.classList.contains("fixed-nav");

    // Calculate the scroll position based on the target element's offset and navigation bar height
    let position = element.offsetTop - navHeight;

    // If the navigation bar is not fixed, adjust the scroll position
    if (!fixedNav) {
      position = position - navHeight;
    }

    // If the navigation bar height is greater than 82 pixels, adjust the scroll position
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    // Scroll to the calculated position
    window.scrollTo({
      left: 0,
      top: position,
    });

    // Reset the height of the links container
    linksContainer.style.height = 0;
  });
});