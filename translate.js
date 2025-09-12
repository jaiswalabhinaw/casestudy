// Initialize Google Translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      includedLanguages: 'en,hi',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    },
    'google_translate_element'
  );
}

// Toggle translation with button
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("lang-btn");
  if (btn) {
    btn.addEventListener("click", function () {
      var select = document.querySelector(".goog-te-combo");
      if (select) {
        if (select.value === "hi") {
          select.value = "en"; // back to English
        } else {
          select.value = "hi"; // switch to Hindi
        }
        select.dispatchEvent(new Event("change"));
      }
    });
  }
});
