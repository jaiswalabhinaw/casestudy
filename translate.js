// Define the callback for Google Translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,hi',
    autoDisplay: false
  }, 'google_translate_element');
}

// Toggle script: switches between English and Hindi
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById('lang-btn');
  let current = 'en';

  function changeLanguage(lang) {
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event('change'));
    } else {
      const domain = location.hostname;
      const cookieVal = '/en/' + lang;
      document.cookie = 'googtrans=' + cookieVal + '; path=/';
      if (domain && domain.indexOf('.') !== -1) {
        document.cookie = 'googtrans=' + cookieVal + '; domain=.' + domain + '; path=/';
      }
      location.reload();
    }
  }

  function toggleLanguage() {
    const next = current === 'en' ? 'hi' : 'en';
    changeLanguage(next);
    current = next;
  }

  if (btn) {
    btn.addEventListener('click', toggleLanguage);
  }
});
