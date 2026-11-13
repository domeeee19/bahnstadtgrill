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
    $$('[data-status-dot]').forEach(el => el.classList.toggle('is-closed', !s.open));
    const { day } = local();
    $$('[data-hours] .hours__row').forEach(r => r.classList.toggle('is-today', r.dataset.days.split(',').includes(String(day))));
  }

  /* ---------------------------------------------------------- Fallblatt */
  const DIGITS = '0123456789';
  function buildFlaps(el, text) {
    el.textContent = '';
    for (const ch of text) {
      const f = document.createElement('span');
      f.className = ch === ':' ? 'flap flap--sep' : 'flap';
      f.textContent = ch === ':' ? ':' : '0';
      el.append(f);
    }
    el.setAttribute('aria-label', text);
  }
  function flipTo(el, text, delay = 0) {
    if (el.children.length !== text.length) buildFlaps(el, text);
    el.setAttribute('aria-label', text);
    [...el.children].forEach((f, i) => {
      const target = text[i];
      if (target === ':' || reduce) { f.textContent = target; return; }
      if (f.textContent === target) return;
      let n = 6 + i * 3 + Math.floor(Math.random() * 4);
      const tick = () => {
        f.classList.remove('is-flipping');
        void f.offsetWidth;
        f.classList.add('is-flipping');
        f.textContent = n <= 0 ? target : DIGITS[Math.floor(Math.random() * DIGITS.length)];
        if (n-- > 0) setTimeout(tick, 70);
      };
      setTimeout(tick, delay + i * 60);
    });
  }
  $$('[data-flap]').forEach((el, i) => {
    buildFlaps(el, '00:00');
    setTimeout(() => flipTo(el, el.dataset.flap), 700 + i * 260);
  });
  const clock = $('[data-clock]');
  if (clock) {
    clock.classList.add('flaps');
    buildFlaps(clock, '00:00');
    const tickClock = () => flipTo(clock, local().clock);
    setTimeout(tickClock, 500);
    setInterval(() => { tickClock(); paintStatus(); }, 15000);
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

  /* ---------------------------------------------------------- Bild folgt dem Zeiger */
  const peek = $('[data-peek-box]');
  if (peek && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const img = $('img', peek);
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
    const loop = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18;
      peek.style.left = x + 'px'; peek.style.top = y + 'px';
      raf = requestAnimationFrame(loop);
    };
    $$('[data-peek]').forEach(d => {
      d.addEventListener('mouseenter', e => {
        img.src = d.dataset.peek;
        tx = x = e.clientX + 150; ty = y = e.clientY;
        peek.classList.add('is-on');
        cancelAnimationFrame(raf); loop();
      });
      d.addEventListener('mousemove', e => { tx = e.clientX + 150; ty = e.clientY; });
      d.addEventListener('mouseleave', () => { peek.classList.remove('is-on'); setTimeout(() => cancelAnimationFrame(raf), 400); });
    });
  }

  /* ---------------------------------------------------------- Zitat leuchtet Wort für Wort auf */
  const quote = $('[data-words]');
  if (quote) {
    const wrapWords = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(part); return; }
            const s = document.createElement('span');
            s.className = 'w'; s.textContent = part; frag.append(s);
          });
          n.replaceWith(frag);
        } else wrapWords(n);
      });
    };
    wrapWords(quote);
    const words = $$('.w', quote);
    words[0].textContent = '„' + words[0].textContent;
    words[words.length - 1].textContent += '“';
    const light = () => {
      const r = quote.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35)));
      const n = reduce ? words.length : Math.round(p * words.length * 1.15);
      words.forEach((w, i) => w.classList.toggle('is-lit', i < n));
    };
    addEventListener('scroll', light, { passive: true });
    light();
  }

  /* ---------------------------------------------------------- Das Gleis zeichnet sich */
  const track = $('[data-track]');
  if (track) {
    const stops = $$('[data-stop]', track);
    const draw = () => {
      const r = track.getBoundingClientRect();
      const p = reduce ? 1 : Math.min(1, Math.max(0, (innerHeight * 0.8 - r.top) / (r.height * 0.9)));
      track.style.setProperty('--p', p.toFixed(3));
      track.style.setProperty('--track-w', r.width + 'px');
      stops.forEach((s, i) => s.classList.toggle('is-reached', p >= i / stops.length + 0.02));
    };
    addEventListener('scroll', draw, { passive: true });
    addEventListener('resize', draw);
    draw();
  }

  /* ---------------------------------------------------------- Parallax im Bogen */
  const arch = $('[data-parallax] img');
  if (arch && !reduce) {
    addEventListener('scroll', () => {
      const y = Math.min(scrollY, 900);
      arch.style.transform = `scale(1.12) translateY(${y * 0.06}px)`;
    }, { passive: true });
  }

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
    box.append(f);
    $('[data-map-consent]').remove();
  });

  /* ---------------------------------------------------------- Laufband nahtlos */
  const ticker = $('[data-ticker]');
  if (ticker) ticker.append(ticker.firstElementChild.cloneNode(true));
})();
