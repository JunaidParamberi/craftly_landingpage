  // Sticky nav scroll state
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 8) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ============ LIVE DASHBOARD ANIMATIONS ============
  (function liveDashboard() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    // ---- Icon library for toasts ----
    const icons = {
      send:    '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12.5 1.5L6 8M12.5 1.5L8 12.5L6 8M12.5 1.5L1.5 6L6 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      check:   '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      doc:     '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 1.5H9L11.5 4V12.5H4V1.5Z" stroke="currentColor" stroke-width="1.4"/><path d="M6 7H10M6 9.5H9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
      time:    '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="M7 4V7L9 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
      ai:      '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5L8.2 5L11.5 5.5L9 7.8L9.7 11.2L7 9.5L4.3 11.2L5 7.8L2.5 5.5L5.8 5L7 1.5Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
      bolt:    '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8 1L3 8H7L6 13L11 6H7L8 1Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>'
    };
    const colors = {
      blue:   { bg: 'rgba(45,91,255,.12)',   fg: '#1E44E0' },
      green:  { bg: 'rgba(22,163,74,.12)',   fg: '#16A34A' },
      amber:  { bg: 'rgba(245,158,11,.14)',  fg: '#B4730A' },
      navy:   { bg: 'rgba(11,18,32,.08)',    fg: '#0b1220' }
    };

    // ---- Toast cycles (one per floating card) ----
    const toastsA = [
      { icon: 'send',  color: 'blue',  title: 'Invoice sent',        sub: 'Acme Co · $4,200' },
      { icon: 'doc',   color: 'navy',  title: 'Proposal drafted',    sub: 'AI · 287 words' },
      { icon: 'ai',    color: 'blue',  title: 'Follow-up scheduled', sub: 'North Ridge · Tue 9am' },
      { icon: 'bolt',  color: 'amber', title: 'Rate suggestion',     sub: 'Raise to $95/hr' }
    ];
    const toastsB = [
      { icon: 'check', color: 'green', title: 'Payment received',    sub: 'Acme · $4,200 \u00b7 just now' },
      { icon: 'time',  color: 'blue',  title: 'Timer running',       sub: 'Fielder Labs \u00b7 01:24' },
      { icon: 'check', color: 'green', title: 'Contract signed',     sub: 'North Ridge \u00b7 e-sig' },
      { icon: 'ai',    color: 'blue',  title: 'Client health \u2191',     sub: 'North Ridge \u2192 Healthy' }
    ];

    function renderItem(item) {
      const c = colors[item.color] || colors.blue;
      return `<div class="fc-icon" style="width:30px;height:30px;border-radius:8px;background:${c.bg};color:${c.fg};display:grid;place-items:center;flex-shrink:0;">${icons[item.icon] || icons.check}</div>
              <div><div class="fc-title">${item.title}</div><div class="fc-sub">${item.sub}</div></div>`;
    }

    function bootStack(cardId, list) {
      const stack = document.querySelector(`#${cardId} .fc-stack`);
      if (!stack) return;
      let i = 0;

      function show(item) {
        stack.innerHTML = `<div class="fc-item active">${renderItem(item)}</div>`;
      }

      show(list[0]);
      return () => {
        i = (i + 1) % list.length;
        const el = stack.querySelector('.fc-item');
        if (!el) {
          show(list[i]);
          return;
        }
        el.classList.remove('active');
        el.classList.add('exiting');
        setTimeout(() => show(list[i]), 450);
      };
    }

    const tickA = bootStack('fc1', toastsA);

    // Toast cycle
    let started = false;
    function startCycle() {
      if (started) return; started = true;
      setTimeout(() => setInterval(() => tickA && tickA(), 4200), 3200);
    }

    // ---- Live timer on Acme row ----
    const timerEl = document.getElementById('live-timer');
    let baseSec = 1 * 3600 + 24 * 60 + 8;
    function fmt(s) {
      const h = String(Math.floor(s / 3600)).padStart(2,'0');
      const m = String(Math.floor((s % 3600) / 60)).padStart(2,'0');
      const sec = String(s % 60).padStart(2,'0');
      return `${h}:${m}:${sec}`;
    }
    if (timerEl) {
      setInterval(() => { baseSec += 1; timerEl.textContent = fmt(baseSec); }, 1000);
    }

    // ---- Ticking numbers ----
    const fmtMoney = n => '$' + Math.round(n).toLocaleString();
    const stats = {
      rev:   { el: document.getElementById('stat-rev'),   v: 12840, jitter: () => 30 + Math.random() * 90 },
      hrs:   { el: document.getElementById('stat-hrs'),   v: 62.5,  jitter: () => 0.1 + Math.random() * 0.2 },
      chart: { el: document.getElementById('chart-val'),  v: 18420, jitter: () => 40 + Math.random() * 140 }
    };

    function bump(key) {
      const s = stats[key]; if (!s || !s.el) return;
      const old = s.v;
      s.v = s.v + s.jitter();
      animateNumber(s.el, old, s.v, key === 'hrs' ? 'hrs' : 'money', 900);
    }
    function animateNumber(el, from, to, kind, dur) {
      const t0 = performance.now();
      el.classList.add('flash');
      function step(t) {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const cur = from + (to - from) * eased;
        el.textContent = kind === 'hrs' ? cur.toFixed(1) : fmtMoney(cur);
        if (p < 1) requestAnimationFrame(step);
        else setTimeout(() => el.classList.remove('flash'), 200);
      }
      requestAnimationFrame(step);
    }

    function startTickers() {
      // initial bumps with stagger
      setTimeout(() => bump('chart'), 2800);
      setTimeout(() => bump('rev'),   4600);
      setTimeout(() => bump('hrs'),   6800);
      setInterval(() => bump('chart'), 5200);
      setInterval(() => bump('rev'),   7400);
      setInterval(() => bump('hrs'),   9600);
    }

    // ---- North Ridge: AI fixes the relationship ----
    function nrFlow() {
      const row = document.querySelector('[data-row="north"]');
      const health = document.getElementById('nr-health');
      const text = document.getElementById('nr-text');
      if (!row || !health || !text) return;

      // After a delay: flash row, then transition to Healthy
      setTimeout(() => {
        row.classList.add('flash');
        setTimeout(() => {
          health.classList.remove('amber');
          text.textContent = 'Healthy';
        }, 700);
        setTimeout(() => row.classList.remove('flash'), 1800);
      }, 7800);

      // And after a longer beat, revert to Watch so the loop continues
      setTimeout(() => {
        health.classList.add('amber');
        text.textContent = 'Watch';
      }, 22000);
    }

    // ---- Start when hero mock is on screen ----
    const mock = document.querySelector('.mock-wrap');
    if (!mock) return;
    const mio = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) {
          startCycle();
          startTickers();
          nrFlow();
          startDemo();
          mio.disconnect();
          break;
        }
      }
    }, { threshold: 0.15 });
    mio.observe(mock);

    // ============ CMD+K + AI PANEL THEATRE ============
    const cmdkText = document.getElementById('cmdk-text');
    const cmdkStatus = document.getElementById('cmdk-status');
    const cmdkStatusText = document.getElementById('cmdk-status-text');
    const aiActions = document.getElementById('aiActions');
    const aiCount = document.getElementById('ai-count');

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    function setStatus(state, text) {
      if (!cmdkStatus) return;
      cmdkStatus.classList.remove('thinking', 'done');
      if (state) cmdkStatus.classList.add(state);
      cmdkStatusText.textContent = text;
    }
    async function typeInto(el, text, perChar = 32) {
      el.classList.remove('placeholder');
      el.textContent = '';
      for (let i = 0; i < text.length; i++) {
        el.textContent += text[i];
        await sleep(perChar + Math.random() * 30);
      }
    }
    async function clearInput() {
      cmdkText.textContent = 'Ask anything or type a command\u2026';
      cmdkText.classList.add('placeholder');
    }

    // Seed AI panel with prior completed actions
    function seedAiPanel() {
      const seed = [
        { ico: 'green', icon: icons.check, label: 'Reconciled payment',  ago: '2m',  draftStatic: 'Acme Co \u00b7 $4,200' },
        { ico: 'navy',  icon: icons.send,  label: 'Sent invoice',         ago: '8m',  draftStatic: 'Fielder Labs \u00b7 $5,840' },
        { ico: 'amber', icon: icons.bolt,  label: 'Flagged: rate too low', ago: '12m', draftStatic: 'Suggest raising to $95/hr' }
      ];
      aiActions.innerHTML = '';
      for (const a of seed) {
        const el = makeActionEl(a);
        const d = el.querySelector('.ai-action-draft');
        if (d && a.draftStatic) d.textContent = a.draftStatic;
        aiActions.appendChild(el);
      }
    }
    function makeActionEl({ ico = 'blue', icon = '', label = '', ago = 'now', draft, draftStatic, steps, running }) {
      const showDraft = draft !== undefined || draftStatic !== undefined;
      const el = document.createElement('div');
      el.className = 'ai-action enter' + (running ? ' running' : '');
      el.innerHTML = `
        <div class="ai-action-h">
          <span class="ico ${ico}">${icon}</span>
          <span class="label">${label}</span>
          <span class="ago">${ago}</span>
        </div>
        ${showDraft ? `<div class="ai-action-draft"></div>` : ''}
        ${steps ? `<div class="ai-steps">${steps.map(s => `<div class="ai-step"><span class="marker"></span><span>${s}</span></div>`).join('')}</div>` : ''}
      `;
      requestAnimationFrame(() => el.classList.remove('enter'));
      return el;
    }

    // Streaming text writer
    async function streamInto(el, text, perChar = 14) {
      el.innerHTML = '';
      const tail = document.createElement('span');
      tail.className = 'caret';
      el.appendChild(document.createTextNode(''));
      el.appendChild(tail);
      const tn = el.childNodes[0];
      for (let i = 0; i < text.length; i++) {
        tn.nodeValue = text.slice(0, i + 1);
        await sleep(perChar + (text[i] === ' ' ? 12 : 8));
      }
      tail.remove();
    }

    async function pushAction({ ico, icon, label, draft, draftText, steps }) {
      // Cap at 4 visible — drop oldest with exit animation
      while (aiActions.children.length >= 4) {
        const last = aiActions.children[aiActions.children.length - 1];
        last.classList.add('exit');
        await sleep(280);
        if (last.parentNode) last.remove();
      }
      const el = makeActionEl({ ico, icon, label, ago: 'now', draft: draft, steps, running: true });
      aiActions.insertBefore(el, aiActions.firstChild);
      await sleep(60);

      // Run steps if any
      if (steps && steps.length) {
        const stepEls = el.querySelectorAll('.ai-step');
        for (let i = 0; i < stepEls.length; i++) {
          stepEls[i].classList.add('in', 'now');
          await sleep(700 + Math.random() * 300);
          stepEls[i].classList.remove('now');
          stepEls[i].classList.add('done');
        }
      }
      // Stream draft text if any
      if (draftText) {
        const draftEl = el.querySelector('.ai-action-draft');
        await streamInto(draftEl, draftText);
      }
      // Mark as complete
      await sleep(400);
      el.classList.remove('running');
      // Bump ago timestamps
      bumpAgo();
      return el;
    }

    function bumpAgo() {
      const els = aiActions.querySelectorAll('.ai-action');
      const labels = ['now', '1m', '3m', '8m', '12m', '18m'];
      els.forEach((e, i) => {
        const a = e.querySelector('.ago');
        if (a) a.textContent = labels[i] || (i * 4) + 'm';
      });
    }

    // ---- Scripted queries ----
    const queries = [
      {
        text: 'Send Acme the May invoice',
        action: {
          ico: 'blue', icon: icons.send, label: 'Sending invoice to Acme Co',
          steps: ['Locating May invoice draft', 'Verifying line items \u00b7 $4,200', 'Sending to billing@acme.co'],
          draft: '', draftText: 'Done. Invoice INV-0431 delivered to Acme Co.'
        }
      },
      {
        text: 'Draft a follow-up to North Ridge',
        action: {
          ico: 'navy', icon: icons.doc, label: 'Drafting follow-up \u00b7 North Ridge',
          steps: ['Reading last 3 messages', 'Matching your tone of voice'],
          draft: '',
          draftText: '\u201cHi Sam \u2014 circling back on the brand sprint. Happy to lock Tue 10am EST if that still works?\u201d'
        }
      },
      {
        text: 'Forecast cashflow for next 30 days',
        action: {
          ico: 'blue', icon: icons.ai, label: 'Forecasting next 30 days',
          steps: ['Pulling pipeline \u00b7 8 invoices', 'Modeling seasonality', 'Running scenarios'],
          draft: '',
          draftText: 'Projecting +$18,420 inflow \u00b7 net runway: 4.2 months.'
        }
      },
      {
        text: 'Raise Fielder Labs rate by 20%',
        action: {
          ico: 'amber', icon: icons.bolt, label: 'Updating rate \u00b7 Fielder Labs',
          steps: ['Reviewing contract', 'Generating notice email'],
          draft: '',
          draftText: 'New rate $114/hr effective next cycle. Ready to send notice?'
        }
      }
    ];

    let queryIndex = 0;
    async function runQuery() {
      const q = queries[queryIndex % queries.length];
      queryIndex++;
      // 1. Show typing
      setStatus(null, 'AI ready');
      await sleep(400);
      await typeInto(cmdkText, q.text);
      await sleep(450);
      // 2. Thinking
      setStatus('thinking', 'Thinking\u2026');
      await sleep(700);
      // 3. Push action + animate steps + stream draft
      setStatus(null, 'Executing');
      await pushAction(q.action);
      // 4. Done
      setStatus('done', 'Done');
      await sleep(1500);
      // 5. Reset bar
      await clearInput();
      setStatus(null, 'AI ready');
      await sleep(1500);
    }

    async function startDemo() {
      seedAiPanel();
      await sleep(1600);
      // Loop
      while (true) {
        await runQuery();
      }
    }
  })();
