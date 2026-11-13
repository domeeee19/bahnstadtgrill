/* "Jetzt geöffnet" auf Deutsch: liest die erste dl.hours[data-tz] in der Zeitzone des Lokals
   (nie die Uhr des Besuchers) und füllt jedes [data-jetzt]. */
(function () {
  var DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  var NAMES = { sun: 'Sonntag', mon: 'Montag', tue: 'Dienstag', wed: 'Mittwoch', thu: 'Donnerstag', fri: 'Freitag', sat: 'Samstag' };
  function days(spec) {
    var set = {};
    String(spec || '').split(',').forEach(function (part) {
      var r = part.trim().split('-');
      var a = DAYS.indexOf(r[0]), b = DAYS.indexOf(r[1] || r[0]);
      if (a < 0 || b < 0) return;
      for (var d = a; ; d = (d + 1) % 7) { set[DAYS[d]] = true; if (d === b) break; }
    });
    return set;
  }
  function run() {
    var outs = document.querySelectorAll('[data-jetzt]');
    var dl = document.querySelector('dl.hours[data-tz]');
    if (!outs.length || !dl) return;
    var p = {};
    new Intl.DateTimeFormat('en-US', { weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: dl.dataset.tz })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    var today = DAYS.indexOf(p.weekday.slice(0, 3).toLowerCase());
    var now = (+p.hour % 24) * 60 + +p.minute;
    function span(d) {
      var dts = dl.querySelectorAll('dt');
      for (var i = 0; i < dts.length; i++) {
        if (!days(dts[i].dataset.days)[DAYS[d]]) continue;
        var m = dts[i].nextElementSibling.textContent.match(/(\d{1,2})[:.](\d{2})\s*[–-]\s*(\d{1,2})[:.](\d{2})/);
        return m ? { open: +m[1] * 60 + +m[2], close: +m[3] * 60 + +m[4], from: m[1] + ':' + m[2], to: m[3] + ':' + m[4] } : null;
      }
      return null;
    }
    var t = span(today), text = '';
    if (t && now >= t.open && now < t.close) text = 'Jetzt geöffnet, bis ' + t.to + ' Uhr';
    else for (var k = 0; k < 8 && !text; k++) {
      var d = (today + k) % 7, s = span(d);
      if (!s || (k === 0 && now >= s.open)) continue;
      text = 'Geschlossen, öffnet ' + (k === 0 ? 'heute' : k === 1 ? 'morgen' : 'am ' + NAMES[DAYS[d]]) + ' um ' + s.from + ' Uhr';
    }
    outs.forEach(function (o) { o.textContent = text; });
  }
  run();
  setInterval(run, 60000);
})();
