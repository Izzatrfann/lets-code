// Language switch (English / Bahasa Malaysia). No cookies, no tracking.
// The language choice is kept in this browser only (localStorage), and the page works without it.
(function () {
  var D = window.LC_DICT || { en: {}, ms: {} };
  var lang = 'en';

  function initial() {
    try {
      var p = new URLSearchParams(location.search).get('lang');
      if (p === 'ms' || p === 'en') return p;
    } catch (e) {}
    try {
      var s = localStorage.getItem('lc-lang');
      if (s === 'ms' || s === 'en') return s;
    } catch (e) {}
    return 'en';
  }

  function t(key) {
    return (D[lang] && D[lang][key]) || (D.en && D.en[key]) || key;
  }

  function apply(l) {
    lang = l;
    document.documentElement.lang = l === 'ms' ? 'ms' : 'en';
    var list = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < list.length; i++) {
      var k = list[i].getAttribute('data-i18n');
      if (D[l] && D[l][k] !== undefined) list[i].innerHTML = D[l][k];
    }
    var alts = document.querySelectorAll('[data-i18n-alt]');
    for (var j = 0; j < alts.length; j++) {
      var ka = alts[j].getAttribute('data-i18n-alt');
      if (D[l] && D[l][ka] !== undefined) alts[j].setAttribute('alt', D[l][ka].replace(/&amp;/g, '&').replace(/&quot;/g, '"'));
    }
    var labels = document.querySelectorAll('[data-i18n-label]');
    for (var m = 0; m < labels.length; m++) {
      var kl = labels[m].getAttribute('data-i18n-label');
      if (D[l] && D[l][kl] !== undefined) labels[m].setAttribute('aria-label', D[l][kl].replace(/&amp;/g, '&').replace(/&quot;/g, '"'));
    }
    var btns = document.querySelectorAll('.lang button[data-lang]');
    for (var b = 0; b < btns.length; b++) {
      btns[b].setAttribute('aria-pressed', btns[b].getAttribute('data-lang') === l ? 'true' : 'false');
    }
    try { localStorage.setItem('lc-lang', l); } catch (e) {}
    document.dispatchEvent(new CustomEvent('lc-lang', { detail: l }));
  }

  window.LC = { t: t, lang: function () { return lang; } };

  var btns = document.querySelectorAll('.lang button[data-lang]');
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function (ev) { apply(ev.currentTarget.getAttribute('data-lang')); });
  }
  var start = initial();
  if (start === 'ms') apply('ms');
  else { lang = 'en'; }
})();
