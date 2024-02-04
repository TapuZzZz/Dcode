
document.addEventListener("DOMContentLoaded", function () {
    const isDarkMode = localStorage.getItem("darkMode") === "true";

    if (isDarkMode) {
        activateDarkMode();
    }
});

function activateDarkMode() {
    document.body.classList.add("dark-mode");
    darkModeIcon.classList.toggle('bx-sun');

}
