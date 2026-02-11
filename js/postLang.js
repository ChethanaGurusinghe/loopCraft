document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("lang") || "en";

    const en = document.querySelectorAll(".lang-en");
    const si = document.querySelectorAll(".lang-si");

    if (lang === "si") {
        en.forEach(el => el.style.display = "none");
        si.forEach(el => el.style.display = "block");
    } else {
        en.forEach(el => el.style.display = "block");
        si.forEach(el => el.style.display = "none");
    }
});
