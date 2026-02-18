document.getElementById("exploreBtn").addEventListener("click", function () {
    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });
});
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "flex";
    }
});
