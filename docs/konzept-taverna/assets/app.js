/* Bahnstadt Grill – Interaktion. Kein Framework, keine Abhängigkeiten. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------------------------------------------------------- Zeit vor Ort */
  const TZ = 'Europe/Berlin';
  const local = () => {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: TZ, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map(x => [x.type, x.value]));
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
    return { day, min: +p.hour * 60 + +p.minute, clock: `${p.hour}:${p.minute}` };
  };
  const OPEN = 11 * 60 + 30, CLOSE = 21 * 60, GARDEN_OPEN = 17 * 60, GARDEN_CLOSE = 22 * 60;
  const DAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  function status() {
    const { day, min } = local();
    const workday = day !== 0;
    if (workday && min >= OPEN && min < CLOSE) {
      const garden = min >= GARDEN_OPEN ? ' · Biergarten bis 22 Uhr' : '';
      return { open: true, text: `Jetzt geöffnet bis 21:00 Uhr${garden}` };
    }
    if (workday && min >= GARDEN_OPEN && min < GARDEN_CLOSE) return { open: true, text: 'Küche zu – der Biergarten hat bis 22 Uhr offen' };
    if (workday && min < OPEN) return { open: false, text: 'Geschlossen · öffnet heute um 11:30 Uhr' };
    let next = (day + 1) % 7;
    if (next === 0) next = 1;
    const when = next === (day + 1) % 7 ? 'morgen' : `am ${DAYS[next]}`;
    return { open: false, text: `Geschlossen · öffnet ${when} um 11:30 Uhr` };
  }
  function paintStatus() {
    const s = status();
    $$('[data-status]').forEach(el => { el.textContent = s.text; });
    $$('[data-status-pill]').forEach(el => el.classList.toggle('is-open', s.open));
    $$('[data-status-dot]').forEach(el => el.classList.toggle('is-closed', !s.open));
    const { day } = local();
    $$('[data-hours] .hours__row').forEach(r => r.classList.toggle('is-today', r.dataset.days.split(',').includes(String(day))));
  }

  paintStatus();

  /* ---------------------------------------------------------- Header und Aktionsleiste */
  const header = $('[data-header]');
  const bar = $('[data-actionbar]');
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    if (header) {
      header.classList.toggle('is-solid', y > 40);
      header.classList.toggle('is-hidden', y > 500 && y > lastY && !document.body.classList.contains('menu-open'));
    }
    if (bar) bar.classList.toggle('is-on', y > innerHeight * 0.8);
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------- Menü (Handy) */
  const toggle = $('[data-menu-toggle]');
  const menu = $('[data-mobile-menu]');
  const setMenu = open => {
    if (!toggle) return;
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    document.documentElement.style.overflow = open ? 'hidden' : '';
  };
  if (toggle) toggle.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  if (menu) $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ---------------------------------------------------------- Einblenden beim Scrollen */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { threshold: 0.15, rootMargin: '0px 0px -40px' });
    $$('.reveal').forEach(el => io.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('is-in'));
  }

  /* ---------------------------------------------------------- Tabs der Speisekarte */
  const tabs = $$('[data-tab]');
  const select = tab => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !on;
      if (on) $$('.dish', panel).forEach(d => { d.style.animation = 'none'; void d.offsetWidth; d.style.animation = ''; });
    });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', e => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!step) return;
      const next = tabs[(i + step + tabs.length) % tabs.length];
      next.focus();
      select(next);
    });
  });


  /* ---------------------------------------------------------- Nur vegetarisch */
  const veg = $('[data-veg]');
  const menuBox = $('[data-menu]');
  if (veg && menuBox) veg.addEventListener('change', () => menuBox.classList.toggle('veg-only', veg.checked));

  /* ---------------------------------------------------------- Google Maps nach Klick */
  const mapLoad = $('[data-map-load]');
  if (mapLoad) mapLoad.addEventListener('click', () => {
    const box = $('[data-map]');
    const f = document.createElement('iframe');
    f.title = 'Google Maps: Bahnstadt Grill, Lützenkirchener Straße 12, Leverkusen';
    f.src = 'https://www.google.com/maps?q=Bahnstadt%20Grill%2C%20L%C3%BCtzenkirchener%20Stra%C3%9Fe%2012%2C%2051379%20Leverkusen&hl=de&z=16&output=embed';
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    f.allowFullscreen = true;
    f.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox');
    box.append(f);
    $('[data-map-consent]').remove();
  });

  /* ---------------------------------------------------------- Tischreservierung Biergarten */
  const booking = $('[data-booking]');
  if (booking) {
    const dateInput = $('#b-date', booking);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    dateInput.min = iso(today);
    const status = $('[data-booking-status]', booking);
    const fail = (el, bad) => {
      const err = el.parentElement.querySelector('.field__error');
      el.toggleAttribute('aria-invalid', bad);
      if (bad) el.setAttribute('aria-invalid', 'true');
      if (err) { err.hidden = !bad; if (!err.id) err.id = el.id + '-err'; el.setAttribute('aria-describedby', err.id); }
      return bad;
    };
    const check = () => {
      const f = booking.elements;
      const errors = [];
      if (fail(f.name, f.name.value.trim().length < 2)) errors.push(f.name);
      let badDate = !f.datum.value;
      if (!badDate) {
        const d = new Date(f.datum.value + 'T12:00');
        badDate = d < today || d.getDay() === 0;
      }
      if (fail(f.datum, badDate)) errors.push(f.datum);
      if (fail(f.uhrzeit, !f.uhrzeit.value)) errors.push(f.uhrzeit);
      if (fail(f.personen, !f.personen.value)) errors.push(f.personen);
      if (fail(f.telefon, !/^[0-9+()\/\s-]{6,}$/.test(f.telefon.value.trim()))) errors.push(f.telefon);
      const mail = f.email.value.trim();
      if (fail(f.email, mail !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail))) errors.push(f.email);
      return errors;
    };
    booking.addEventListener('input', e => { if (e.target.hasAttribute('aria-invalid')) check(); });
    booking.addEventListener('submit', async e => {
      e.preventDefault();
      const errors = check();
      if (errors.length) {
        status.textContent = errors.length === 1 ? 'Bitte prüfen Sie das markierte Feld.' : `Bitte prüfen Sie die ${errors.length} markierten Felder.`;
        errors[0].focus();
        return;
      }
      const f = booking.elements;
      const [y, m, d] = f.datum.value.split('-');
      const day = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][new Date(f.datum.value + 'T12:00').getDay()];
      const lines = [
        'Hallo Stavros,', '',
        'ich möchte gern einen Tisch im Biergarten reservieren:', '',
        `Datum: ${day}, ${d}.${m}.${y}`,
        `Uhrzeit: ${f.uhrzeit.value} Uhr`,
        `Personen: ${f.personen.value}`,
        `Name: ${f.name.value.trim()}`,
        `Telefon: ${f.telefon.value.trim()}`,
        f.email.value.trim() ? `E-Mail: ${f.email.value.trim()}` : '',
        f.nachricht.value.trim() ? `\nNachricht: ${f.nachricht.value.trim()}` : '',
        '', 'Vielen Dank!'
      ].filter((l, i, a) => !(l === '' && a[i - 1] === ''));
      const subject = `Tischreservierung Biergarten: ${d}.${m}. um ${f.uhrzeit.value} Uhr, ${f.personen.value} Pers.`;
      const endpoint = booking.dataset.endpoint;
      if (endpoint) {
        status.textContent = 'Wird gesendet …';
        try {
          const r = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(booking) });
          if (!r.ok) throw new Error(r.status);
          booking.reset();
          status.textContent = 'Danke! Ihre Anfrage ist angekommen. Wir melden uns zur Bestätigung.';
        } catch {
          status.textContent = 'Das hat leider nicht geklappt. Bitte rufen Sie uns an: 02171 80154.';
        }
        return;
      }
      location.href = `mailto:bahnstadtgrill@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      status.textContent = 'Ihr E-Mail-Programm öffnet sich mit der fertigen Anfrage – bitte dort nur noch auf „Senden“ tippen. Öffnet sich nichts? Rufen Sie uns an: 02171 80154.';
    });
  }

})();
