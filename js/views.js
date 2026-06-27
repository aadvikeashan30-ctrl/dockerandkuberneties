/* =========================================================
   Code Origin.AI — View templates (enriched)
   Each function returns an HTML string for a view.
   Interactivity is wired up by app.js after injection.
   ========================================================= */
window.VIEWS = (function () {
  const D = window.DATA;

  /* ---------- helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function head(eyebrow, title, sub) {
    return `<div class="page-head reveal">
      <span class="eyebrow">${eyebrow}</span>
      <h1 class="page-title shimmer">${title}</h1>
      <p class="page-sub">${sub}</p>
    </div>`;
  }

  function sectionTitle(num, title, note) {
    return `<h2 class="section-title reveal"><span class="st-num">${num}</span> ${title}
      ${note ? `<span class="muted" style="font-size:13px;font-weight:400">${note}</span>` : ""}</h2>`;
  }

  // Build a horizontal animated flow diagram from a node list
  function flowDiagram(nodes, idAttr) {
    const parts = nodes.map((n, i) => {
      const node = `<div class="flow-node" data-${idAttr}="${n.id}" role="button" tabindex="0" style="--d:${i * 0.08}s">
        <div class="fn-ico float-y">${n.ico}</div>
        <div class="fn-title">${n.title}</div>
        <div class="fn-sub">${n.sub}</div>
      </div>`;
      const arrow = i < nodes.length - 1
        ? `<div class="flow-arrow"><span class="pulse" style="animation-delay:${i * 0.3}s"></span></div>`
        : "";
      return node + arrow;
    }).join("");
    return `<div class="flow-wrap reveal"><div class="flow">${parts}</div></div>`;
  }

  // Simple YAML syntax coloring for static code blocks
  function colorYaml(line) {
    let s = esc(line);
    s = s.replace(/(#.*)$/, '<span class="tok-cmt">$1</span>');
    s = s.replace(/^(\s*-?\s*)([\w.\-\/]+)(:)/, (m, pre, key, colon) => `${pre}<span class="tok-prop">${key}</span>${colon}`);
    s = s.replace(/(["'].*?["'])/g, '<span class="tok-str">$1</span>');
    s = s.replace(/(:\s*)(\d+)(\s*$)/, (m, a, n, b) => `${a}<span class="tok-num">${n}</span>${b}`);
    return s;
  }

  // Deep concept card: plain words + analogy + expandable technical + points
  function deepCard(c, idx) {
    return `<div class="card deep-card reveal" style="--d:${(idx || 0) * 0.07}s">
      <div class="dc-head">
        <div class="card-ico float-y">${c.ico}</div>
        <div>
          <span class="tagline">${c.tag}</span>
          <h3>${c.title}</h3>
        </div>
      </div>
      <p class="dc-simple"><span class="dc-badge">In simple words</span> ${c.simple}</p>
      <div class="analogy-box">
        <span class="analogy-emoji float-y">${c.analogy.emoji}</span>
        <div>
          <div class="analogy-title">${c.analogy.title}</div>
          <div class="analogy-text">${c.analogy.text}</div>
        </div>
      </div>
      <ul class="point-list">
        ${c.points.map((p) => `<li>${p}</li>`).join("")}
      </ul>
      <button class="tech-toggle" data-techtoggle>🔬 Show the technical detail</button>
      <div class="tech-detail" hidden><p>${c.technical}</p></div>
    </div>`;
  }

  // Animated "How it works" player: a stage strip with a moving glow,
  // a big caption, and play/pause/step controls. Wired in app.js.
  function stepShow(spec, kind) {
    const stages = spec.stages.map((s, i) => `
      <div class="ss-stage" data-ss-stage="${i}">
        <div class="ss-ico">${s.ico}</div>
        <div class="ss-title">${esc(s.title)}</div>
      </div>
      ${i < spec.stages.length - 1 ? `<div class="ss-link"><span class="ss-spark"></span></div>` : ""}
    `).join("");
    return `<div class="stepshow reveal" data-stepshow="${kind}">
      <div class="ss-head">
        <div>
          <div class="ss-title-main">${esc(spec.title)}</div>
          <div class="ss-sub">${esc(spec.subtitle)}</div>
        </div>
        <div class="ss-controls">
          <button class="btn btn-primary ss-play" data-ss-play>▶ Play</button>
          <button class="btn ss-step" data-ss-next>⏭ Step</button>
          <button class="btn btn-ghost ss-reset" data-ss-reset>↺</button>
        </div>
      </div>
      <div class="ss-track">${stages}</div>
      <div class="ss-progress"><span class="ss-bar" data-ss-bar></span></div>
      <div class="ss-caption" data-ss-caption>
        <span class="ss-num" data-ss-cnum>1</span>
        <span data-ss-ctext>${esc(spec.stages[0].caption)}</span>
      </div>
    </div>`;
  }

  /* =====================================================
     START HERE — beginner guided story
     ===================================================== */
  function guide() {
    return `<div class="view">
      ${head("👋 Start Here · No experience needed", `Docker &amp; Kubernetes, <span class="gradient-text">explained like a story</span>`,
        D.guideIntro)}

      <div class="guide-hint reveal">
        <span class="float-y" style="font-size:22px">🧭</span>
        <div>Read these 8 tiny steps in order. By the end you'll understand what Docker and Kubernetes <em>actually do</em> — using just a food-truck story. Then explore the modules for the real diagrams.</div>
      </div>

      <div class="guide-steps">
        ${D.guideSteps.map((s, i) => `<div class="guide-step reveal" style="--d:${i * 0.05}s">
          <div class="gs-side">
            <div class="gs-num">${s.n}</div>
            <div class="gs-emoji float-y">${s.ico}</div>
          </div>
          <div class="gs-body">
            <h3>${esc(s.title)}</h3>
            <p class="gs-story">${esc(s.story)}</p>
            <div class="gs-tech"><span class="gs-tech-badge">In tech terms</span> ${esc(s.tech)}</div>
            <div class="gs-takeaway">💡 <strong>Remember:</strong> ${esc(s.takeaway)}</div>
          </div>
        </div>`).join("")}
      </div>

      ${sectionTitle("▶", "Now watch it happen", "— press Play")}
      <p class="muted reveal">Same idea, now animated. Watch your app travel through Docker, then through Kubernetes.</p>
      ${stepShow(D.dockerHowItWorks, "guide-docker")}
      <div class="mt-3">${stepShow(D.k8sHowItWorks, "guide-k8s")}</div>

      ${sectionTitle("📝", "Your first code — explained like you're 5")}
      <p class="muted reveal">Code looks scary until someone reads it out loud in plain words. Here are the two files you'll meet most — every line translated.</p>
      ${D.codeWalkthroughs.map((w) => `<h3 class="cw-label reveal">${esc(w.label)}</h3>${codeWalk(w)}`).join("")}

      <div class="callout mt-3 reveal">
        <span class="ca-emoji float-y">🚀</span>
        <div><strong>Ready for more?</strong> Jump into <a class="link-inline" href="#docker">🐳 Docker Fundamentals</a> or <a class="link-inline" href="#kubernetes">☸️ Kubernetes Architecture</a> for the full interactive diagrams — or open the <a class="link-inline" href="#yaml">📄 YAML Explorer</a> to decode real config files line by line.</div>
      </div>
    </div>`;
  }

  // Beginner code walkthrough: code on the left, plain meaning per line
  function codeWalk(w) {
    return `<div class="codewalk reveal">
      <div class="cw-what">${esc(w.what)}</div>
      <div class="cw-grid">
        ${w.lines.map((l, i) => `<div class="cw-row" style="--d:${i * 0.05}s">
          <code class="cw-code">${esc(l.code)}</code>
          <div class="cw-plain"><span class="cw-arrow">→</span> ${esc(l.plain)}</div>
        </div>`).join("")}
      </div>
    </div>`;
  }

  /* =====================================================
     AWS CLOUD LAB — animated course player (Workshop Day 1)
     ===================================================== */
  function awsLab() {
    const A = D.aws;
    const first = A.order[0];
    return `<div class="view">
      ${head("🎓 Workshop · Day 1 · AWS Cloud Foundations", `AWS <span class="gradient-text">Cloud Lab</span>`,
        "Every Day-1 topic as an animated mini-lesson: a one-line idea, a real-life analogy, an easy explanation, key points, a live example you can replay, and a moving diagram of how it works. Pick a topic or use Next to go in order.")}

      <div class="awslab-grid">
        <aside class="awslab-rail reveal">
          ${A.sessions.map((s) => `<div class="alr-session">
            <div class="alr-sesshead">${s.ico} ${esc(s.label)} <small>${esc(s.time)}</small></div>
            ${s.ids.map((id) => `<button class="alr-item" data-awsid="${id}">
              <span class="alr-ico">${A.lessons[id].ico}</span><span>${esc(A.lessons[id].title)}</span>
            </button>`).join("")}
          </div>`).join("")}
        </aside>
        <section class="awslab-stage reveal" id="awsStage" style="--d:.08s">
          ${renderAwsLesson(first)}
        </section>
      </div>
    </div>`;
  }

  function renderAwsLesson(id) {
    const A = D.aws;
    const l = A.lessons[id];
    if (!l) return "<div class='card'>Lesson not found.</div>";
    const idx = A.order.indexOf(id);
    const prev = A.order[idx - 1], next = A.order[idx + 1];
    // find session label for badge
    let sess = "";
    A.sessions.forEach((s) => { if (s.ids.includes(id)) sess = s.label + " · " + s.time; });

    return `<div class="lesson" data-lesson="${id}">
      <div class="lesson-head">
        <div class="lesson-ico float-y">${l.ico}</div>
        <div>
          <div class="lesson-badges"><span class="lb-num">${idx + 1}/${A.order.length}</span><span class="lb-sess">${esc(sess)}</span></div>
          <h2 class="lesson-title">${esc(l.title)}</h2>
        </div>
      </div>

      <p class="lesson-oneline"><span class="dc-badge">In one line</span> ${esc(l.oneLine)}</p>

      <div class="lesson-body">
        <div class="lesson-left">
          <div class="analogy-box"><span class="analogy-emoji float-y">💭</span>
            <div><div class="analogy-title">Think of it like…</div><div class="analogy-text">${esc(l.analogy)}</div></div>
          </div>
          <p class="lesson-explain">${esc(l.explain)}</p>
          <ul class="point-list">${l.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        </div>
        <div class="lesson-right">
          <div class="graphic-card">
            <div class="graphic-label">▶ Live visual — how it works</div>
            ${awsGraphic(l.graphic, l.focus)}
          </div>
        </div>
      </div>

      <div class="lesson-example">
        <div class="code-block">
          <div class="code-head">
            <span class="code-dots"><span class="r"></span><span class="y"></span><span class="g"></span></span>
            <span class="code-title">live example — ${esc(l.example.label)}</span>
            <button class="code-copy" data-awsreplay>↻ Replay</button>
          </div>
          <pre class="code-body" id="awsExampleBody">${l.example.lines.map((x) => `<span class="ln">${esc(x)}</span>`).join("")}</pre>
        </div>
      </div>

      <div class="lesson-nav">
        <button class="btn ${prev ? "" : "is-disabled"}" data-awsnav="prev" ${prev ? "" : "disabled"}>← ${prev ? esc(A.lessons[prev].title) : "Start"}</button>
        <button class="btn btn-primary ${next ? "" : "is-disabled"}" data-awsnav="next" ${next ? "" : "disabled"}>${next ? esc(A.lessons[next].title) : "Finished 🎉"} →</button>
      </div>
    </div>`;
  }

  /* ---------- Animated AWS graphics library (CSS-driven) ---------- */
  function awsGraphic(kind, focus) {
    switch (kind) {
      case "cloud": return `<div class="g g-cloud">
        <div class="gc-side"><span class="float-y">💻</span><span class="float-y" style="animation-delay:.4s">📱</span><span class="float-y" style="animation-delay:.8s">🖥️</span><div class="g-cap">Your devices</div></div>
        <div class="gc-wire"><span class="gc-pkt"></span><span class="gc-pkt" style="animation-delay:1s"></span><span class="gc-pkt" style="animation-delay:2s"></span></div>
        <div class="gc-cloud"><div class="gc-cloud-emoji">☁️</div><div class="gc-mini">⚙️ 🗄️ ⚡</div><div class="g-cap">AWS Cloud</div></div>
      </div>`;

      case "globe": return `<div class="g g-globe">
        <div class="gg-sphere"><span class="gg-ring"></span><span class="gg-ring r2"></span></div>
        ${[["18%","26%","Mumbai"],["70%","20%","Virginia"],["44%","64%","Ireland"],["80%","60%","Tokyo"]].map((r, i) => `<span class="gg-region" style="left:${r[0]};top:${r[1]};animation-delay:${i * .5}s"><b>📍</b><i>${r[2]}</i><em class="gg-az"></em><em class="gg-az a2"></em></span>`).join("")}
        <div class="g-cap">Regions · each with isolated Availability Zones</div>
      </div>`;

      case "iam": return `<div class="g g-iam">
        <div class="gi-user"><div class="gi-card">🪪<small>User</small></div></div>
        <div class="gi-gate"><div class="gi-gate-bar"></div><div class="g-cap">Policy gate</div></div>
        <div class="gi-tokens"><span class="gi-token allow">✓ allow s3:Read</span><span class="gi-token deny">✗ deny s3:Delete</span></div>
        <div class="gi-res"><span>🪣 S3</span><span>🖥️ EC2</span></div>
      </div>`;

      case "cli": return `<div class="g g-cli">
        <div class="gcli-win"><div class="gcli-bar"><span></span><span></span><span></span></div>
          <div class="gcli-body"><span class="gcli-line"><b>$</b> aws s3 ls<span class="gcli-cursor"></span></span>
          <span class="gcli-out">2026-06-29 10:14  my-bucket</span>
          <span class="gcli-out">2026-06-29 10:15  my-app-assets</span></div>
        </div>
      </div>`;

      case "vpc": return `<div class="g g-vpc focus-${focus || "all"}">
        <div class="gv-net">🌍<small>Internet</small></div>
        <div class="gv-flow"><span class="gv-pkt"></span></div>
        <div class="gv-igw">🚪<small>IGW</small></div>
        <div class="gv-box"><div class="gv-boxlabel">VPC 10.0.0.0/16</div>
          <div class="gv-rt">🪧 Route Table<small>0.0.0.0/0 → IGW</small></div>
          <div class="gv-subnets">
            <div class="gv-subnet pub"><div class="gv-sublabel">Public Subnet</div><div class="gv-node">🖥️<span class="gv-sg"></span><small>web · SG</small></div></div>
            <div class="gv-subnet priv"><div class="gv-sublabel">Private Subnet</div><div class="gv-node">🗄️<small>database</small></div></div>
          </div>
          <div class="gv-nacl-tag">NACL — subnet firewall</div>
        </div>
      </div>`;

      case "ec2": return `<div class="g g-ec2 ${focus === "os" ? "show-os" : ""}">
        <div class="ge-rack"><div class="ge-server"><span class="ge-led"></span>🖥️<small>${focus === "os" ? "AMI: Linux / Windows" : "t3.micro"}</small></div></div>
        <div class="ge-boot"><span class="ge-state">power on</span><span class="ge-arrow">→</span><span class="ge-state run">running ✅</span></div>
        ${focus === "os" ? `<div class="ge-os"><span>🐧 Linux · SSH :22</span><span>🪟 Windows · RDP :3389</span></div>` : `<div class="g-cap">Connect via SSH and your app is live</div>`}
      </div>`;

      case "ec2life": return `<div class="g g-ec2life">
        ${["pending", "running", "stopping", "stopped", "terminated"].map((s, i) => `<div class="gl-state s-${s}" style="--i:${i}"><span class="gl-dot"></span>${s}</div>${i < 4 ? '<span class="gl-arr">→</span>' : ""}`).join("")}
        <div class="g-cap">A highlight cycles through the instance states</div>
      </div>`;

      case "s3": return `<div class="g g-s3">
        <div class="gs3-drop"><span class="gs3-file">📄</span><span class="gs3-file f2">🖼️</span><span class="gs3-file f3">🎞️</span></div>
        <div class="gs3-bucket">🪣<div class="gs3-bname">my-bucket</div></div>
        <div class="g-cap">Objects (files) drop into a bucket — unlimited & durable</div>
      </div>`;

      case "storage": return `<div class="g g-storage">
        <div class="gst-tier t1"><b>Standard</b><small>hot · $$$</small></div>
        <div class="gst-tier t2"><b>Standard-IA</b><small>rare · $$</small></div>
        <div class="gst-tier t3"><b>Glacier</b><small>archive · $</small></div>
        <span class="gst-file">📦</span>
        <div class="g-cap">A file slides to a cheaper tier as it cools down</div>
      </div>`;

      case "staticsite": return `<div class="g g-static">
        <div class="gss-bucket">🪣<small>index.html</small></div>
        <span class="gss-arrow">→</span>
        <div class="gss-browser"><div class="gss-bar"><span></span><span></span><span></span><i>my-site.s3-website…</i></div><div class="gss-page"><span class="gss-hero"></span><span class="gss-row"></span><span class="gss-row short"></span></div></div>
      </div>`;

      case "rds": return `<div class="g g-rds focus-${focus || "ha"}">
        ${focus === "conn" ? `<div class="grd-app">🖥️<small>app</small></div><span class="grd-link"><span class="grd-pkt"></span></span>` : ""}
        <div class="grd-primary">🗄️<small>Primary</small></div>
        <div class="grd-sync"><span class="grd-syncpkt"></span></div>
        <div class="grd-standby">🗄️<small>${focus === "backup" ? "Snapshot" : "Standby (Multi-AZ)"}</small></div>
        ${focus === "backup" ? `<div class="grd-snaps">📦 📦 📦<small>automated backups</small></div>` : `<div class="g-cap">Managed DB with an automatic standby copy</div>`}
      </div>`;

      case "peering": return focus === "hub"
        ? `<div class="g g-hub">
            <div class="gh-center">✈️<small>Transit GW</small></div>
            ${[0, 1, 2, 3].map((i) => `<div class="gh-vpc v${i}">🏗️<small>VPC</small><span class="gh-spoke"></span></div>`).join("")}
            <div class="g-cap">One hub connects many VPCs</div>
          </div>`
        : `<div class="g g-peer">
            <div class="gp-vpc">🏗️<small>VPC A</small></div>
            <div class="gp-bridge"><span class="gp-pkt"></span><span class="gp-pkt back"></span></div>
            <div class="gp-vpc">🏗️<small>VPC B</small></div>
            <div class="g-cap">A private bridge between two VPCs</div>
          </div>`;

      case "alb": return `<div class="g g-alb">
        <div class="ga-user">👥<small>users</small></div>
        <span class="ga-in"><span class="ga-pkt"></span></span>
        <div class="ga-lb">⚖️<small>ALB</small></div>
        <div class="ga-targets">
          <div class="ga-t"><span class="ga-out"></span>🖥️ ✅</div>
          <div class="ga-t"><span class="ga-out" style="animation-delay:.6s"></span>🖥️ ✅</div>
          <div class="ga-t down">🖥️ ✖</div>
        </div>
        <div class="g-cap">${focus === "targets" ? "The Target Group = the list of servers behind the ALB" : "Traffic is spread across healthy servers"}</div>
      </div>`;

      case "asg": return `<div class="g g-asg">
        <div class="gasg-meter"><span class="gasg-fill"></span><small>load</small></div>
        <div class="gasg-servers"><span>🖥️</span><span>🖥️</span><span class="gasg-extra">🖥️</span><span class="gasg-extra e2">🖥️</span></div>
        <div class="g-cap">Servers appear when load rises, leave when it drops</div>
      </div>`;

      case "lambda": return `<div class="g g-lambda">
        <div class="gla-event">📩<small>event</small></div>
        <span class="gla-arrow">→</span>
        <div class="gla-fn">λ<span class="gla-spark"></span><small>function</small></div>
        <span class="gla-arrow">→</span>
        <div class="gla-res">✅<small>response</small></div>
        <div class="g-cap">Runs only when triggered — pay per millisecond</div>
      </div>`;

      case "dynamo": return `<div class="g g-dynamo">
        <div class="gd-grid">${Array.from({ length: 12 }).map((_, i) => `<span class="gd-cell c${i}"></span>`).join("")}</div>
        <div class="g-cap">Key → value lockers, returned in milliseconds ⚡</div>
      </div>`;

      default: return `<div class="g g-generic"><div class="float-y" style="font-size:46px">☁️</div><div class="g-cap">AWS hands-on concept</div></div>`;
    }
  }

  /* =====================================================
     WORKSHOP — Cambridge Institute 5-Day DevOps schedule
     ===================================================== */
  function workshop() {
    const w = D.workshop;
    const m = w.meta;
    const totalTopics = Object.keys(w.topics).length;
    return `<div class="view">
      <div class="ws-banner reveal">
        <div class="ws-crest float-y">${m.crest}</div>
        <div class="ws-banner-text">
          <div class="ws-institute">${esc(m.institute)}</div>
          <div class="ws-loc">${esc(m.location)} · ${esc(m.dept)}</div>
          <div class="ws-title gradient-text">${esc(m.title)}</div>
        </div>
        <div class="ws-badge-5d"><span class="b-num">5</span><span>DAYS</span></div>
      </div>

      <div class="stats reveal mt-2">
        <div class="stat"><div class="s-num a" data-count="5">0</div><div class="s-lbl">Days</div></div>
        <div class="stat"><div class="s-num b" data-count="3">0</div><div class="s-lbl">Sessions / day</div></div>
        <div class="stat"><div class="s-num c" data-count="${totalTopics}">0</div><div class="s-lbl">Topics explained</div></div>
        <div class="stat"><div class="s-num d" data-count="2">0</div><div class="s-lbl">Mock Interview days</div></div>
      </div>

      <p class="page-sub reveal" style="margin-top:18px">Here's the full agenda from the workshop. <strong>Click any topic chip</strong> to get a plain-words explanation, a real-life analogy and a deeper note — for every single item.</p>

      <div class="ws-tabs reveal" id="wsTabs">
        ${w.days.map((d, i) => `<button class="ws-tab ${i === 0 ? "active" : ""}" data-wsday="${i}">
          <span class="ws-tab-ico">${d.ico}</span>
          <span class="ws-tab-meta"><strong>Day ${d.n}</strong><small>${esc(d.date)}</small></span>
        </button>`).join("")}
      </div>

      <div class="ws-grid">
        <div id="wsDayPanel" class="reveal"><!-- day sessions injected --></div>
        <div class="reveal" style="--d:.1s">
          <div class="card explain-card ws-explain" id="wsExplain">
            <span class="ex-key">👆 Click a topic</span>
            <div class="ex-body explain-empty">Pick any topic chip on the left to learn what it means — in simple words first, then an analogy, then a bit deeper.</div>
          </div>
        </div>
      </div>
    </div>`;
  }

  // Render one day's sessions (called by app.js on tab switch)
  function workshopDayPanel(dayIndex) {
    const d = window.DATA.workshop.days[dayIndex];
    const breakChip = (ico, label, time) => `<div class="ws-break"><span>${ico}</span> ${label} <small>${esc(time)}</small></div>`;
    const m = window.DATA.workshop.meta;
    let html = `<div class="ws-day-head">
      <div class="ws-day-ico float-y">${d.ico}</div>
      <div><h3>Day ${d.n} — ${esc(d.theme)}</h3><div class="muted">${esc(d.date)}</div>
      ${d.note ? `<div class="ws-note">ℹ️ ${esc(d.note)}</div>` : ""}</div>
    </div>`;

    d.sessions.forEach((s, si) => {
      html += `<div class="ws-session reveal in" style="--d:${si * 0.08}s">
        <div class="ws-session-head"><span class="ws-stag">${esc(s.label)}</span><span class="ws-time">🕒 ${esc(s.time)}</span></div>
        <div class="ws-chips">
          ${s.topics.map((t) => `<button class="ws-chip" data-wstopic="${esc(t)}">${esc(t)}</button>`).join("")}
        </div>
      </div>`;
      // insert breaks between sessions (only on multi-session days)
      if (!d.fullDay) {
        if (si === 0) html += breakChip("☕", "Tea Break", m.times.tea);
        if (si === 1) html += breakChip("🍽️", "Lunch Break", m.times.lunch);
      }
    });
    return html;
  }

  /* =====================================================
     HOME / OVERVIEW
     ===================================================== */
  function home() {
    const cards = [
      { ico: "👋", title: "Start Here (Beginners)", body: "Never coded? Learn both tools through a simple food-truck story, step by step.", view: "guide" },
      { ico: "🎓", title: "5-Day DevOps Workshop", body: "The full Cambridge Institute workshop agenda — every AWS, Docker, K8s & AI topic explained.", view: "workshop" },
      { ico: "☁️", title: "AWS Cloud Lab", body: "Day-1 AWS topics as animated mini-lessons with live examples — VPC, EC2, S3, ALB, Lambda & more.", view: "awslab" },
      { ico: "🐳", title: "Docker Fundamentals", body: "Images, containers, Dockerfile, commands & ports — explained with everyday analogies.", view: "docker" },
      { ico: "☸️", title: "Kubernetes Architecture", body: "The control plane, worker nodes and Pods — told as a busy restaurant story.", view: "kubernetes" },
      { ico: "📄", title: "YAML Explorer", body: "Click any line of Pod, Deployment & Service YAML to see plain-English meaning.", view: "yaml" },
      { ico: "🗺️", title: "Architecture View", body: "The full journey from a developer's laptop to users on the internet.", view: "architecture" },
      { ico: "🎯", title: "Interview Q&A", body: "Curated DevOps interview questions with clear, analogy-backed answers.", view: "interview" },
    ];
    return `<div class="view">
      ${head("Interactive DevOps Trainer", `Learn <span class="gradient-text">Docker &amp; Kubernetes</span> the easy way`,
        "No jargon overload. Every idea here comes with a real-life analogy, a plain-words explanation and an animated diagram — so anyone, technical or not, can truly get it.")}

      <div class="hero-cta reveal">
        <a class="btn btn-primary btn-lg" href="#guide">👋 Start Here — total beginner? Begin the story →</a>
        <a class="btn btn-lg" href="#docker">🐳 Jump to Docker</a>
        <a class="btn btn-lg btn-ghost" href="#kubernetes">☸️ Jump to Kubernetes</a>
      </div>

      <div class="stats reveal">
        <div class="stat"><div class="s-num a" data-count="2">0</div><div class="s-lbl">Core Modules</div></div>
        <div class="stat"><div class="s-num b" data-count="9">0</div><div class="s-lbl">Concepts + Analogies</div></div>
        <div class="stat"><div class="s-num c" data-count="8">0</div><div class="s-lbl">Beginner Story Steps</div></div>
        <div class="stat"><div class="s-num d" data-count="12">0</div><div class="s-lbl">Interview Q&amp;A</div></div>
      </div>

      <div class="grid cols-3">
        ${cards.map((c, i) => `<div class="card lift-3d reveal" style="--d:${i * 0.06}s" data-goto="${c.view}" role="button" tabindex="0">
          <div class="card-ico float-y">${c.ico}</div>
          <h3>${c.title}</h3>
          <p>${c.body}</p>
          <div class="pill-row"><span class="pill">Explore →</span></div>
        </div>`).join("")}
      </div>

      ${sectionTitle("✨", "Tech term → everyday meaning")}
      <p class="muted reveal">The whole course in one table. Every scary word has a friendly twin.</p>
      ${glossaryTable()}

      <div class="callout mt-3 reveal">
        <span class="ca-emoji float-y">💡</span>
        <div><strong>How to use this trainer:</strong> hover code lines for tooltips, click any diagram block for its role + analogy, tap “Show the technical detail” on a card when you're ready to go deeper, and run commands in the simulator. Your progress ring (bottom-left) fills as you explore.</div>
      </div>
    </div>`;
  }

  function glossaryTable() {
    return `<div class="glossary reveal">
      <div class="gl-row gl-head">
        <div>Term</div><div>In plain words</div><div>It's like…</div>
      </div>
      ${D.glossary.map((g, i) => `<div class="gl-row" style="--d:${i * 0.04}s">
        <div class="gl-term">${esc(g.term)}</div>
        <div class="muted">${esc(g.plain)}</div>
        <div class="gl-like">${g.like}</div>
      </div>`).join("")}
    </div>`;
  }

  /* =====================================================
     DOCKER
     ===================================================== */
  function docker() {
    return `<div class="view">
      ${head("🐳 Module 01", `Docker <span class="gradient-text">Fundamentals</span>`,
        "Docker packs an app and everything it needs into one portable box. Let's build the mental model with simple analogies first, then the architecture, then real commands.")}

      ${stepShow(D.dockerHowItWorks, "docker")}

      ${sectionTitle("01", "The 4 core ideas", "— each with a real-life analogy")}
      <div class="grid cols-2">
        ${D.dockerConcepts.map((c, i) => deepCard(c, i)).join("")}
      </div>

      ${sectionTitle("02", "Docker Architecture", "— click any block")}
      <p class="muted reveal">This is the path your code travels, from your keyboard to a running app. Think of it as a kitchen: you order, the kitchen cooks, a dish is served.</p>
      ${flowDiagram(D.dockerArch, "dnode")}
      <div class="detail-panel reveal" id="dockerDetail">
        <h4>👆 Click a block above</h4>
        <p>Each block reveals its job <em>and</em> its restaurant-kitchen analogy.</p>
      </div>

      ${sectionTitle("03", "The 3 building blocks")}
      <div class="grid cols-3">
        ${D.dockerBlocks.map((b, i) => `<div class="card reveal" style="--d:${i * 0.07}s">
          <div class="card-ico float-y">${b.ico}</div>
          <h3>${b.name}</h3>
          <p>${b.role}</p>
          <div class="mini-analogy">🔎 Like: ${b.analogy}</div>
        </div>`).join("")}
      </div>

      ${sectionTitle("04", "Containers vs Virtual Machines", "— the #1 confusion, cleared up")}
      <p class="muted reveal">${D.dockerVsVm.intro}</p>
      <div class="callout reveal">
        <span class="ca-emoji float-y">${D.dockerVsVm.analogy.emoji}</span>
        <div><strong>${D.dockerVsVm.analogy.title}:</strong> ${D.dockerVsVm.analogy.text}</div>
      </div>
      <div class="vs-table reveal mt-2">
        <div class="vs-row vs-head"><div></div><div>🖥️ Virtual Machine</div><div>🐳 Container</div></div>
        ${D.dockerVsVm.rows.map((r, i) => `<div class="vs-row" style="--d:${i * 0.05}s">
          <div class="vs-label">${esc(r.label)}</div>
          <div class="vs-vm">${esc(r.vm)}</div>
          <div class="vs-cont">${esc(r.cont)}</div>
        </div>`).join("")}
      </div>

      ${sectionTitle("05", "Popular images", "— ready-made recipes 🖼️")}
      <div class="grid cols-4">
        ${D.dockerImages.map((im, i) => `<div class="card center reveal" style="--d:${i * 0.06}s">
          <div class="card-ico float-y" style="margin:0 auto 12px">${im.ico}</div>
          <h3 style="font-family:var(--mono)">${im.name}</h3>
          <p>${im.role}</p>
        </div>`).join("")}
      </div>

      ${sectionTitle("06", "Image → Container", "— recipe becomes a dish")}
      <div class="grid cols-3 mt-2">
        <div class="card center reveal"><div class="card-ico float-y" style="margin:0 auto 12px">🖼️</div><h3>Image</h3><p>Static blueprint on disk (the recipe)</p></div>
        <div class="card center reveal" style="display:grid;place-items:center;--d:.1s"><div class="run-arrow">➡️</div><p class="muted mono-pill">docker run</p></div>
        <div class="card center reveal pop-card" style="--d:.2s"><div class="card-ico float-y" style="margin:0 auto 12px">🟢</div><h3>Container</h3><p>Live running app (the cooked dish)</p></div>
      </div>

      ${sectionTitle("07", "Dockerfile", "— the recipe card, line by line")}
      <div class="grid cols-2">
        <div class="code-block reveal">
          <div class="code-head">
            <span class="code-dots"><span class="r"></span><span class="y"></span><span class="g"></span></span>
            <span class="code-title">Dockerfile</span>
            <button class="code-copy" data-copy>Copy</button>
          </div>
          <pre class="code-body">${D.dockerfile.map((l) =>
            `<span class="code-line" data-tip-key="${esc(l.key)}" data-tip="${esc(l.tip)}">${colorYaml(l.code)}</span>`
          ).join("")}</pre>
        </div>
        <div class="reveal" style="--d:.1s">
          <div class="card">
            <h3 style="margin-top:0">Read it like a recipe 📝</h3>
            <p>Docker reads this top-to-bottom. Each line is one prep step. Hover a line on the left for the technical tip — or read the plain version here:</p>
          </div>
          <div class="recipe-steps mt-2">
            ${D.dockerfile.map((l, i) => `<div class="recipe-step reveal" style="--d:${i * 0.06}s">
              <span class="rs-num">${i + 1}</span>
              <div><code class="rs-code">${esc(l.code)}</code><div class="rs-plain">${esc(l.plain)}</div></div>
            </div>`).join("")}
          </div>
        </div>
      </div>

      ${sectionTitle("08", "Docker Commands", "— click a chip to run it")}
      <div class="grid cols-2">
        <div class="terminal reveal">
          <div class="code-head">
            <span class="code-dots"><span class="r"></span><span class="y"></span><span class="g"></span></span>
            <span class="code-title">bash — docker</span>
          </div>
          <div class="term-body" id="dockerTerm">
            <div class="term-line term-out">// Click a command below to simulate it.</div>
          </div>
        </div>
        <div class="reveal" style="--d:.1s">
          <div class="cmd-chips">
            ${D.dockerCommands.map((c, i) => `<button class="cmd-chip" data-dcmd="${i}" title="${esc(c.plain)}">${esc(c.cmd)}</button>`).join("")}
          </div>
          <div class="cmd-plain-list mt-2">
            ${D.dockerCommands.map((c) => `<div class="cmd-plain"><code>${esc(c.cmd.split(" ").slice(0,2).join(" "))}</code> — ${esc(c.plain)}</div>`).join("")}
          </div>
        </div>
      </div>

      ${sectionTitle("09", "Ports Mapping", "— forwarding the doorbell")}
      <div class="callout reveal">
        <span class="ca-emoji float-y">🚪</span>
        <div><strong>Analogy:</strong> your building's main door is <strong>8080</strong>, but your apartment door is <strong>80</strong>. Port mapping is the doorman who forwards anyone at 8080 straight to door 80.</div>
      </div>
      <div class="card reveal mt-2">
        <p class="muted center"><code>docker run -p 8080:80 app</code> — traffic on the host's port 8080 flows into the container's port 80.</p>
        <div class="port-map">
          <div class="port-box host"><div class="pb-label">🖥️ Host Port</div><div class="pb-port">8080</div></div>
          <div class="port-pipe"><span class="rail"></span><span class="packet"></span><span class="packet p2"></span></div>
          <div class="port-box cont"><div class="pb-label">🟢 Container Port</div><div class="pb-port">80</div></div>
        </div>
      </div>
    </div>`;
  }

  /* =====================================================
     KUBERNETES
     ===================================================== */
  function kubernetes() {
    const comp = (c) => `<div class="comp" data-kcomp="${c.id}" role="button" tabindex="0">
      <span class="c-ico">${c.ico}</span>
      <span><span class="c-name">${c.name}</span><br><span class="c-role">${c.role}</span></span>
    </div>`;
    return `<div class="view">
      ${head("☸️ Module 02", `Kubernetes <span class="gradient-text">Architecture</span>`,
        "Kubernetes runs and manages your containers across many machines, automatically. The secret to understanding it: picture a busy restaurant chain.")}

      ${stepShow(D.k8sHowItWorks, "k8s")}

      ${sectionTitle("01", "The Restaurant Analogy", "— the whole cluster in one picture 🍽️")}
      <p class="muted reveal">${D.restaurant.intro}</p>
      <div class="rest-grid">
        ${D.restaurant.rows.map((r, i) => `<div class="rest-card reveal" style="--d:${i * 0.05}s">
          <span class="rest-ico float-y">${r.ico}</span>
          <div class="rest-k8s">${esc(r.k8s)}</div>
          <div class="rest-role">${esc(r.role)}</div>
          <div class="rest-text">${esc(r.text)}</div>
        </div>`).join("")}
      </div>

      ${sectionTitle("02", "Cluster Architecture", "— click any component")}
      <div class="cluster">
        <div class="node-box reveal">
          <div class="nb-head"><span class="dot"></span>🧠 Master / Control Plane <span class="nb-tag">the management office</span></div>
          ${D.masterComponents.map(comp).join("")}
        </div>
        <div class="node-box reveal" style="--d:.1s">
          <div class="nb-head"><span class="dot"></span>🛠️ Worker Node <span class="nb-tag">the kitchen station</span></div>
          ${D.workerComponents.map(comp).join("")}
        </div>
      </div>
      <div class="detail-panel reveal" id="k8sDetail">
        <h4>👆 Click a component</h4>
        <p>Each one shows its real job, its restaurant role, and the key points to remember.</p>
      </div>

      ${sectionTitle("03", "Core Concepts", "— each with an analogy")}
      <div class="grid cols-2">
        ${D.k8sConcepts.map((c, i) => deepCard(c, i)).join("")}
      </div>

      ${sectionTitle("04", "Pod Anatomy")}
      <div class="callout reveal">
        <span class="ca-emoji float-y">📦</span>
        <div>A <strong>Pod</strong> is the smallest unit — the <em>plate</em> that carries your dish. It can hold one main container, plus little helper containers (called sidecars) that share the same plate.</div>
      </div>
      <div class="card mt-2 center reveal">
        <div class="pod-visual">
          <div class="muted" style="margin-bottom:10px">📦 Pod — shared IP &amp; storage</div>
          <span class="pod-mini">🐳 container: nginx</span>
          <span class="pod-mini">🔧 sidecar: logger</span>
        </div>
      </div>

      ${sectionTitle("05", "Full Request Flow", "— click each stage")}
      <p class="muted reveal">From a declared Deployment all the way to a real user on the Internet.</p>
      ${flowDiagram(D.k8sFlow, "knode")}
      <div class="detail-panel reveal" id="k8sFlowDetail">
        <h4>🔁 Deployment → ReplicaSet → Pod → Container → Service → Internet</h4>
        <p>Click each stage to see what it does and its restaurant analogy.</p>
      </div>
    </div>`;
  }

  /* =====================================================
     YAML EXPLORER
     ===================================================== */
  function yaml() {
    const tabs = Object.keys(D.yamlSamples);
    return `<div class="view">
      ${head("📄 Interactive", `YAML <span class="gradient-text">Explorer</span>`,
        "YAML is how you tell Kubernetes what you want — like filling in a form. Pick a file, then click or hover any line for both a plain-words and a technical explanation.")}

      <div class="yaml-tabs reveal">
        ${tabs.map((t, i) => `<button class="yaml-tab ${i === 0 ? "active" : ""}" data-ytab="${t}">${D.yamlSamples[t].label}</button>`).join("")}
      </div>

      <div class="yaml-grid">
        <div class="code-block reveal" id="yamlCode"><!-- injected --></div>
        <div class="reveal" style="--d:.1s">
          <div class="card explain-card" id="yamlExplain">
            <span class="ex-key">Click any line →</span>
            <div class="ex-body explain-empty">Select a key on the left to read what it controls — in both plain and technical words.</div>
          </div>
          <div class="card mt-2" id="yamlFlow"><!-- flow injected --></div>
        </div>
      </div>
    </div>`;
  }

  function yamlCodePanel(sampleKey) {
    const s = D.yamlSamples[sampleKey];
    const lines = s.lines.map((l) =>
      `<span class="code-line yaml-key" data-ykey="${esc(l.k)}">${colorYaml(l.t)}</span>`
    ).join("");
    return `<div class="code-head">
        <span class="code-dots"><span class="r"></span><span class="y"></span><span class="g"></span></span>
        <span class="code-title">${esc(s.label.toLowerCase())}.yaml</span>
        <button class="code-copy" data-copy>Copy</button>
      </div>
      <pre class="code-body">${lines}</pre>`;
  }

  function yamlFlowPanel(sampleKey) {
    const s = D.yamlSamples[sampleKey];
    const steps = s.flow.map((f, i) =>
      `<span class="pod-mini">${esc(f)}</span>${i < s.flow.length - 1 ? '<span class="flow-sep">→</span>' : ""}`
    ).join("");
    let extra = "";
    if (sampleKey === "deployment") {
      extra = `<div class="mt-2">
        <div class="muted" style="font-size:13px;margin-bottom:8px">Scaling demo — drag the number, watch Pods pop in:</div>
        <div class="replica-stage" id="replicaStage"></div>
        <div class="scaler-controls">
          <button class="btn btn-round" data-scale="-1">−</button>
          <span class="replica-count" id="replicaCount">2</span>
          <button class="btn btn-round" data-scale="1">+</button>
          <span class="muted" style="font-size:13px">replicas</span>
        </div>
      </div>`;
    }
    return `<h3 style="margin-top:0">Traffic / ownership flow</h3>
      <div class="flow-line">${steps}</div>${extra}`;
  }

  /* =====================================================
     ARCHITECTURE VIEW (the full journey)
     ===================================================== */
  function architecture() {
    return `<div class="view">
      ${head("🗺️ Big Picture", `The Full <span class="gradient-text">Journey</span>`,
        "How Docker and Kubernetes work together — told as one continuous story, from a developer's idea to a real user opening your app.")}

      ${sectionTitle("01", "From idea to live app", "— 8 plain-language steps")}
      <div class="timeline">
        ${D.journey.map((j, i) => `<div class="tl-item reveal" style="--d:${i * 0.07}s">
          <div class="tl-dot">${j.ico}</div>
          <div class="tl-card">
            <div class="tl-top"><h4>${esc(j.title)}</h4><span class="tl-tag tl-${j.tag.toLowerCase()}">${esc(j.tag)}</span></div>
            <p>${esc(j.text)}</p>
          </div>
        </div>`).join("")}
      </div>

      ${sectionTitle("02", "Build → Ship (Docker)", "— hover any block")}
      ${flowDiagram(D.dockerArch, "anode")}

      ${sectionTitle("03", "Run → Serve (Kubernetes)", "— hover any block")}
      ${flowDiagram(D.k8sFlow, "anode2")}

      <div class="callout mt-3 reveal">
        <span class="ca-emoji float-y">🔗</span>
        <div><strong>The link in one line:</strong> Docker bakes the <em>image</em> → it's stored in a <em>registry</em> → Kubernetes pulls it and runs it in <em>Pods</em> → a <em>Service</em> exposes it to the world. Same box, laptop to production.</div>
      </div>

      ${sectionTitle("04", "Real-world examples")}
      <div class="grid cols-2">
        ${D.realWorld.map((r, i) => `<div class="card reveal" style="--d:${i * 0.06}s">
          <div class="card-ico float-y">${r.ico}</div>
          <h3>${r.title}</h3>
          <p>${r.body}</p>
        </div>`).join("")}
      </div>
    </div>`;
  }

  /* =====================================================
     PLAYGROUND (terminal + YAML editor)
     ===================================================== */
  function playground() {
    const starter = D.yamlSamples.pod.lines.map((l) => l.t).join("\n");
    return `<div class="view">
      ${head("🧪 Hands-on", `<span class="gradient-text">Playground</span>`,
        "Practice safely. Type Docker/kubectl commands in the live simulator, and validate your own Kubernetes YAML in the editor.")}

      ${sectionTitle("01", "Live Terminal Simulator")}
      <div class="terminal reveal">
        <div class="code-head">
          <span class="code-dots"><span class="r"></span><span class="y"></span><span class="g"></span></span>
          <span class="code-title">codeorigin@devops: ~</span>
        </div>
        <div class="term-body" id="playTerm">
          <div class="term-line term-out">Welcome to the Code Origin.AI shell. Type <span class="v-ok">help</span> and press Enter.</div>
        </div>
        <div class="term-input-row">
          <span class="ps">$</span>
          <input class="term-input" id="playInput" autocomplete="off" spellcheck="false" placeholder="try: docker ps  ·  kubectl get pods  ·  help" />
        </div>
      </div>

      ${sectionTitle("02", "Try-it-yourself YAML Editor")}
      <div class="editor-grid">
        <div class="code-block reveal" style="display:flex;flex-direction:column">
          <div class="code-head">
            <span class="code-dots"><span class="r"></span><span class="y"></span><span class="g"></span></span>
            <span class="code-title">your-manifest.yaml</span>
            <button class="code-copy" data-loadsample>Load sample</button>
          </div>
          <textarea class="editor-area" id="yamlEditor" spellcheck="false">${esc(starter)}</textarea>
        </div>
        <div class="card reveal" style="--d:.1s">
          <h3 style="margin-top:0">Validator</h3>
          <p class="muted" style="font-size:13px">A lightweight check for the essential Kubernetes fields. Click validate to inspect your manifest.</p>
          <button class="btn btn-primary mt-2" id="validateBtn">✓ Validate manifest</button>
          <div class="validate-out mt-3" id="validateOut">Awaiting input…</div>
        </div>
      </div>
    </div>`;
  }

  /* =====================================================
     DIAGRAM BUILDER (drag & drop)
     ===================================================== */
  function builder() {
    const palette = [
      { ico: "👩‍💻", label: "Developer" }, { ico: "⌨️", label: "Docker CLI" },
      { ico: "🖼️", label: "Image" }, { ico: "☁️", label: "Registry" },
      { ico: "🚀", label: "Deployment" }, { ico: "🔁", label: "ReplicaSet" },
      { ico: "📦", label: "Pod" }, { ico: "🐳", label: "Container" },
      { ico: "🌐", label: "Service" }, { ico: "🌍", label: "Internet" },
    ];
    return `<div class="view">
      ${head("🧩 Create", `Diagram <span class="gradient-text">Builder</span>`,
        "Drag components from the palette onto the canvas to sketch your own architecture. Drag placed nodes to reposition; click ✕ to remove.")}

      <div class="builder-wrap">
        <div class="palette reveal" id="palette">
          ${palette.map((p) => `<div class="palette-item" draggable="true" data-ico="${p.ico}" data-label="${p.label}">
            <span>${p.ico}</span><span>${p.label}</span>
          </div>`).join("")}
          <button class="btn btn-ghost mt-2" id="clearCanvas">🗑️ Clear canvas</button>
        </div>
        <div class="canvas reveal" id="canvas" style="--d:.1s">
          <div class="canvas-empty" id="canvasEmpty">🧲 Drag components here to build your DevOps pipeline</div>
        </div>
      </div>
    </div>`;
  }

  /* =====================================================
     INTERVIEW Q&A
     ===================================================== */
  function interview() {
    const cats = ["All", ...Array.from(new Set(D.interview.map((q) => q.cat)))];
    return `<div class="view">
      ${head("🎯 Prepare", `Interview <span class="gradient-text">Q&amp;A</span>`,
        "Common Docker & Kubernetes interview questions with concise, correct answers — many backed by the same analogies you just learned.")}

      <div class="filter-bar reveal" id="qaFilter">
        ${cats.map((c, i) => `<button class="chip-filter ${i === 0 ? "active" : ""}" data-cat="${c}">${c}</button>`).join("")}
      </div>

      <div id="qaList">
        ${D.interview.map((q, i) => `<div class="qa-item reveal" data-cat="${q.cat}" data-qa="${i}" style="--d:${i * 0.03}s">
          <div class="qa-q">
            <span class="qa-tag">${q.cat}</span>
            <span>${esc(q.q)}</span>
            <span class="chev">▾</span>
          </div>
          <div class="qa-a"><div class="qa-a-inner">${esc(q.a)}</div></div>
        </div>`).join("")}
      </div>
    </div>`;
  }

  return {
    home, guide, workshop, awslab: awsLab, docker, kubernetes, yaml, architecture, playground, builder, interview,
    yamlCodePanel, yamlFlowPanel, stepShow, codeWalk, workshopDayPanel, renderAwsLesson, awsGraphic,
  };
})();
