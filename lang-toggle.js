const translations = {
  en: {
    title: "Welcome to My Website",
    desc: "This is a demo page for language toggle.",
    btn: "Switch to Hindi"
  },
  hi: {
    title: "मेरी वेबसाइट पर आपका स्वागत है",
    desc: "यह भाषा बदलने का एक डेमो पेज है।",
    btn: "अंग्रेज़ी में बदलें"
  }
};

let currentLang = localStorage.getItem("lang") || "en";

function applyLang(lang) {
  const title = document.getElementById("title");
  const desc = document.getElementById("desc");
  const btn = document.getElementById("lang-btn");

  if (title) title.innerText = translations[lang].title;
  if (desc) desc.innerText = translations[lang].desc;
  if (btn) btn.innerText = translations[lang].btn;

  localStorage.setItem("lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("lang-btn");

  if (btn) {
    btn.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "hi" : "en";
      applyLang(currentLang);
    });
  }

  applyLang(currentLang);
});
