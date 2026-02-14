function applyLanguage() {
  const lang = localStorage.getItem("lang") || "en";

  document.querySelectorAll(".lang-en").forEach(el => {
    el.style.display = (lang === "en") ? "block" : "none";
  });

  document.querySelectorAll(".lang-si").forEach(el => {
    el.style.display = (lang === "si") ? "block" : "none";
  });
}

document.addEventListener("DOMContentLoaded", applyLanguage);

// ✅ runs also when user returns via back button
window.addEventListener("pageshow", applyLanguage);
