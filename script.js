/* =====================================
   Smooth Scroll (Home Page Only)
===================================== */

const exploreBtn = document.getElementById("exploreBtn");

if (exploreBtn) {
    exploreBtn.addEventListener("click", function () {

        const menuSection = document.getElementById("menu");

        if (menuSection) {
            menuSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}


/* =====================================
   Hamburger Menu (All Pages)
===================================== */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links"); // FIXED ID

if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {

        if (navLinks.style.display === "flex") {
            navLinks.style.display = "none";
        } else {
            navLinks.style.display = "flex";
        }

    });
}


/* =====================================
   Coffee Brew Ratio Calculator Logic
===================================== */

/* =====================================
   Coffee Brew Ratio Calculator Logic
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const calculateBtn = document.getElementById("calculateBtn");
    const waterAmountInput = document.getElementById("waterAmount");
    const ratioInput = document.getElementById("ratio");
    const resultDiv = document.getElementById("result");

    if (!calculateBtn || !waterAmountInput || !ratioInput || !resultDiv) return;

    function calculateCoffee() {

        const waterAmount = parseFloat(waterAmountInput.value);
        const ratio = parseFloat(ratioInput.value);

        if (isNaN(waterAmount) || isNaN(ratio) || waterAmount <= 0 || ratio <= 0) {
            resultDiv.textContent = "Please enter valid positive numbers.";
            return;
        }

        const coffeeNeeded = waterAmount / ratio;

        resultDiv.innerHTML =
            `☕ <strong>${coffeeNeeded.toFixed(1)}g</strong> coffee needed for 
             <strong>${waterAmount}ml</strong> water (1:${ratio})`;
    }

    // Button click
    calculateBtn.addEventListener("click", calculateCoffee);

    // Press Enter to calculate
    waterAmountInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") calculateCoffee();
    });

    ratioInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") calculateCoffee();
    });

    // Clear result when typing
    waterAmountInput.addEventListener("input", () => resultDiv.textContent = "");
    ratioInput.addEventListener("input", () => resultDiv.textContent = "");

});
/* =====================================
   Coffee Types Search Functionality
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("coffeeSearch");
    const cards = document.querySelectorAll(".type-card");
    const noResultsMessage = document.getElementById("noResultsMessage");

    if (!searchInput || cards.length === 0) return;

    searchInput.addEventListener("input", function () {

        const searchValue = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        cards.forEach(function (card) {

            const title = card.querySelector("h3").textContent.toLowerCase();
            const description = card.querySelector("p").textContent.toLowerCase();

            if (searchValue === "" || title.includes(searchValue) || description.includes(searchValue)) {

                card.style.display = "";
                card.style.opacity = "1";
                card.style.transform = "scale(1)";
                visibleCount++;

            } else {

                card.style.display = "none";
            }

        });

        // Show message only if search is NOT empty AND nothing matched
        if (noResultsMessage) {
            if (searchValue !== "" && visibleCount === 0) {
                noResultsMessage.style.display = "block";
            } else {
                noResultsMessage.style.display = "none";
            }
        }

    });

});
