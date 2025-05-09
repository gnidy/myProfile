

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("list")) {
        // Toggle the menu visibility
        document.querySelector("header nav ul").classList.toggle("visible");
    } else {
        // Hide the menu if clicking outside
        document.querySelector("header nav ul").classList.remove("visible");
    }
});



