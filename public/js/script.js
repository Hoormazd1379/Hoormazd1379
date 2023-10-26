document.addEventListener("DOMContentLoaded", function () {
    const spoilerButton = document.getElementById("spoiler-button");
    const socialsDiv = document.querySelector(".socials");

    socialsDiv.style.display = "none";
    spoilerButton.innerHTML = 'Show Links <i class="fa-solid fa-caret-down"></i>';

    spoilerButton.addEventListener("click", function () {
        if (socialsDiv.style.display === "none") {
            socialsDiv.style.display = "flex";
            spoilerButton.innerHTML = 'Hide Links <i class="fa-solid fa-caret-up"></i>';
        } else {
            socialsDiv.style.display = "none";
            spoilerButton.innerHTML = 'Show Links <i class="fa-solid fa-caret-down"></i>';
        }
    });
});