(function () {
  var STORAGE_KEY = "aila-blog-lang";
  var SUPPORTED = Object.keys(window.I18N);
  var PAGE = window.PAGE_I18N || {};
  var root = document.documentElement;
  var main = document.querySelector("main");
  var buttons = document.querySelectorAll(".lang-switch button");

  function savedLang() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function saveLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage unavailable */ }
  }

  function initialLang() {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (SUPPORTED.indexOf(fromUrl) !== -1) return fromUrl;
    var stored = savedLang();
    if (SUPPORTED.indexOf(stored) !== -1) return stored;
    return "en";
  }

  function render(lang) {
    var t = Object.assign({}, window.I18N[lang], PAGE[lang]);
    root.lang = lang;
    root.dir = t.dir;
    document.title = t.title;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
  }

  function switchTo(lang) {
    if (lang === root.lang) return;
    saveLang(lang);
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { render(lang); return; }
    main.classList.add("is-switching");
    setTimeout(function () {
      render(lang);
      main.classList.remove("is-switching");
    }, 220);
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { switchTo(b.dataset.lang); });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  render(initialLang());
})();
