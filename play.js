// Play page: runs the finished Catch and Avoid game on this site (TurboWarp Scaffolding),
// and loads the other Scratch games only when a button is pressed.
(function () {
  var LC = window.LC;
  var stage = document.getElementById('stage');
  var cover = document.getElementById('stage-cover');
  var startBtn = document.getElementById('start-game');
  var pad = document.getElementById('pad');
  var ctrl = document.getElementById('ctrl');
  var statusEl = document.getElementById('status');
  var flagBtn = document.getElementById('flag');
  var stopBtn = document.getElementById('stop');
  var sc = null, loading = false, statusKey = '';

  function say(key) {
    statusKey = key;
    statusEl.textContent = key ? LC.t(key) : '';
  }
  document.addEventListener('lc-lang', function () { if (statusKey) statusEl.textContent = LC.t(statusKey); });

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src; s.onload = resolve;
      s.onerror = function () { reject(new Error('script')); };
      document.head.appendChild(s);
    });
  }

  function start() {
    if (loading || sc) return;
    loading = true; startBtn.disabled = true; say('play.loading');
    loadScript('vendor/scaffolding-min.js').then(function () {
      var S = new Scaffolding.Scaffolding();
      S.width = 480; S.height = 360; S.setup();
      S.appendTo(stage);
      return fetch('downloads/catch-final.sb3').then(function (r) {
        if (!r.ok) throw new Error('http ' + r.status);
        return r.arrayBuffer();
      }).then(function (buf) { return S.loadProject(buf); }).then(function () {
        sc = S;
        cover.hidden = true;
        S.relayout();
        S.greenFlag();
        ctrl.hidden = false; pad.classList.add('on');
        say('play.running');
        if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
      });
    }).catch(function () {
      say('play.error'); startBtn.disabled = false;
    }).then(function () { loading = false; });
  }
  startBtn.addEventListener('click', start);

  flagBtn.addEventListener('click', function () { if (sc) { sc.stopAll(); sc.greenFlag(); } flagBtn.blur(); });
  stopBtn.addEventListener('click', function () { if (sc) sc.stopAll(); stopBtn.blur(); });

  // On-screen left and right buttons for phones and tablets.
  var codes = { ArrowLeft: 37, ArrowRight: 39 };
  function send(key, down) {
    if (sc) sc.vm.postIOData('keyboard', { key: key, keyCode: codes[key], isDown: down });
  }
  Array.prototype.forEach.call(document.querySelectorAll('#pad [data-hold]'), function (btn) {
    var key = btn.getAttribute('data-hold'), timer = null;
    function down(ev) {
      ev.preventDefault();
      if (timer) return;
      send(key, true);
      timer = setInterval(function () { send(key, true); }, 60);
    }
    function up() {
      if (timer) { clearInterval(timer); timer = null; }
      send(key, false); btn.blur();
    }
    btn.addEventListener('pointerdown', down);
    btn.addEventListener('pointerup', up);
    btn.addEventListener('pointerleave', up);
    btn.addEventListener('pointercancel', up);
    btn.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  });

  // Other Scratch games: loaded only after a click.
  Array.prototype.forEach.call(document.querySelectorAll('[data-embed]'), function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-embed');
      var box = document.getElementById('embed-' + id);
      if (!box || box.querySelector('iframe')) return;
      var f = document.createElement('iframe');
      f.src = 'https://scratch.mit.edu/projects/' + id + '/embed';
      f.title = 'Scratch project ' + id;
      f.setAttribute('allowtransparency', 'true');
      f.setAttribute('allowfullscreen', '');
      f.setAttribute('scrolling', 'no');
      box.appendChild(f);
      btn.hidden = true;
    });
  });
})();
