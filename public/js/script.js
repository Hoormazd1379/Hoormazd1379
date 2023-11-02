document.addEventListener("DOMContentLoaded", function () {
    const spoilerButton = document.getElementById("spoiler-button");
    const socialsDiv = document.querySelector(".socials");

    const qrButton = document.getElementById("qr-button");
    const logo = document.querySelector("#logoimage");

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

    var logoLink = "img/sig.png";
    logo.src=logoLink;
    logo.height = "200";
    qrButton.innerHTML = 'Show QR Code';

    qrButton.addEventListener("click", function () {
        if (logoLink === "img/sig.png") {
            logoLink = "img/coolqr.png";
            logo.src= logoLink;
            logo.height = "200";
            qrButton.innerHTML = 'Hide QR Code';
        } else {
            logoLink = "img/sig.png";
            logo.src= logoLink;
            logo.height = "200";
            qrButton.innerHTML = 'Show QR Code';
        }
    });
});