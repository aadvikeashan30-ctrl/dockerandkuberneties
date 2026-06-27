/* =========================================================
   Code Origin.AI — App controller
   Router + navigation + all view interactivity.
   ========================================================= */
(function () {
  "use strict";
  const D = window.DATA;
  const V = window.VIEWS;

  const content = document.getElementById("content");
  const nav = document.getElementById("nav");
  const sidebar = document.getElementById("sidebar");
  const scrim = document.getElementById("scrim");
  const menuToggle = document.getElementById("menuToggle");
  const tip = document.getElementById("floatingTip");

  const VIEW_KEYS = ["home", "guide", "workshop", "awslab", "docker", "kubernetes", "yaml", "architecture", "playground", "builder", "interview"];
  const visited = new Set(JSON.parse(localStorage.getItem("co_visited") || "[]"));
  let pendingAws = null; // deep-link target for AWS Lab (#awslab:topic)

  /* ---------------- Router ---------------- */
  function currentView() {
    let raw = location.hash || "#home";
    try { raw = decodeURIComponent(raw); } catch (e) {}
    let h = raw.replace(/^#/, "");
    // accept a separator (':' or '/') for deep-links like #awslab:sg or #awslab/sg
    const sep = h.search(/[:\/]/);
    if (sep > -1) { pendingAws = h.slice(sep + 1); h = h.slice(0, sep); }
    return VIEW_KEYS.includes(h) ? h : "home";
  }

  function render() {
    const view = currentView();
    content.innerHTML = V[view] ? V[view]() : V.home();
    content.scrollTop = 0;
    window.scrollTo(0, 0);

    // active nav
    nav.querySelectorAll(".nav-item").forEach((a) =>
      a.classList.toggle("active", a.dataset.view === view));

    // progress
    visited.add(view);
    localStorage.setItem("co_visited", JSON.stringify(Array.from(visited)));
    updateProgress();

    // wire interactions for this view
    wireCommon();
    if (view === "home") wireHome();
    if (view === "guide") wireGuide();
    if (view === "workshop") wireWorkshop();
    if (view === "awslab") { wireAwsLab(pendingAws); pendingAws = null; }
    if (view === "docker") wireDocker();
    if (view === "kubernetes") wireKubernetes();
    if (view === "yaml") wireYaml();
    if (view === "architecture") wireArchitecture();
    if (view === "playground") wirePlayground();
    if (view === "builder") wireBuilder();
    if (view === "interview") wireInterview();

    closeSidebar();
  }

  function updateProgress() {
    const pct = Math.round((visited.size / VIEW_KEYS.length) * 100);
    const ring = document.getElementById("progressRing");
    const lbl = document.getElementById("progressPct");
    if (ring) ring.style.setProperty("--pct", pct);
    if (lbl) lbl.textContent = pct + "%";
  }

  /* ---------------- Sidebar (mobile) ---------------- */
  function openSidebar() { sidebar.classList.add("open"); scrim.classList.add("show"); }
  function closeSidebar() { sidebar.classList.remove("open"); scrim.classList.remove("show"); }
  menuToggle.addEventListener("click", () => sidebar.classList.contains("open") ? closeSidebar() : openSidebar());
  scrim.addEventListener("click", closeSidebar);

  /* ---------------- Global tooltip ---------------- */
  function showTip(target) {
    const txt = target.getAttribute("data-tip");
    if (!txt) return;
    const key = target.getAttribute("data-tip-key");
    tip.innerHTML = (key ? `<span class="tip-key">${key}</span>` : "") + txt;
    tip.classList.add("show");
    positionTip(target);
  }
  function positionTip(target) {
    const r = target.getBoundingClientRect();
    const tr = tip.getBoundingClientRect();
    let left = r.left;
    let top = r.bottom + 10;
    if (left + tr.width > window.innerWidth - 12) left = window.innerWidth - tr.width - 12;
    if (top + tr.height > window.innerHeight - 12) top = r.top - tr.height - 10;
    tip.style.left = Math.max(12, left) + "px";
    tip.style.top = Math.max(12, top) + "px";
  }
  function hideTip() { tip.classList.remove("show"); }

  /* ---------------- Common wiring (runs every render) ---------------- */
  function wireCommon() {
    // tooltips for any [data-tip]
    content.querySelectorAll("[data-tip]").forEach((elm) => {
      elm.addEventListener("mouseenter", () => showTip(elm));
      elm.addEventListener("mousemove", () => positionTip(elm));
      elm.addEventListener("mouseleave", hideTip);
      elm.addEventListener("focus", () => showTip(elm));
      elm.addEventListener("blur", hideTip);
    });
    // copy buttons
    content.querySelectorAll("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pre = btn.closest(".code-block").querySelector(".code-body, .editor-area");
        const text = pre ? (pre.value !== undefined ? pre.value : pre.innerText) : "";
        copyText(text, btn);
      });
    });
    // technical-detail toggles on deep cards
    content.querySelectorAll("[data-techtoggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const panel = btn.nextElementSibling;
        const open = panel.hasAttribute("hidden");
        if (open) { panel.removeAttribute("hidden"); btn.textContent = "🔬 Hide the technical detail"; }
        else { panel.setAttribute("hidden", ""); btn.textContent = "🔬 Show the technical detail"; }
      });
    });
    // scroll-reveal
    setupReveal();
    // animated "how it works" players
    content.querySelectorAll("[data-stepshow]").forEach(initStepShow);
  }

  /* ---------------- Animated stepShow player ---------------- */
  function initStepShow(root) {
    const stages = Array.from(root.querySelectorAll("[data-ss-stage]"));
    const links = Array.from(root.querySelectorAll(".ss-link"));
    const captionNum = root.querySelector("[data-ss-cnum]");
    const captionText = root.querySelector("[data-ss-ctext]");
    const bar = root.querySelector("[data-ss-bar]");
    const playBtn = root.querySelector("[data-ss-play]");
    const total = stages.length;
    let idx = 0, timer = null, playing = false;

    const specMap = {
      "docker": D.dockerHowItWorks, "k8s": D.k8sHowItWorks,
      "guide-docker": D.dockerHowItWorks, "guide-k8s": D.k8sHowItWorks,
    };
    const spec = specMap[root.getAttribute("data-stepshow")] || { stages: [] };

    function paint() {
      stages.forEach((s, i) => {
        s.classList.toggle("done", i < idx);
        s.classList.toggle("active", i === idx);
      });
      links.forEach((l, i) => l.classList.toggle("lit", i < idx));
      const st = spec.stages[idx];
      if (st) {
        captionNum.textContent = idx + 1;
        captionText.textContent = st.caption;
      }
      bar.style.width = (((idx + 1) / total) * 100) + "%";
    }
    function go(i) { idx = Math.max(0, Math.min(total - 1, i)); paint(); }
    function next() {
      if (idx >= total - 1) { stop(); return; }
      go(idx + 1);
    }
    function play() {
      if (playing) { stop(); return; }
      if (idx >= total - 1) idx = 0;
      playing = true; playBtn.innerHTML = "⏸ Pause"; paint();
      timer = setInterval(() => {
        if (idx >= total - 1) { stop(); return; }
        go(idx + 1);
      }, 2100);
    }
    function stop() { playing = false; clearInterval(timer); timer = null; playBtn.innerHTML = "▶ Play"; }
    function reset() { stop(); go(0); }

    playBtn.addEventListener("click", play);
    root.querySelector("[data-ss-next]").addEventListener("click", () => { stop(); next(); });
    root.querySelector("[data-ss-reset]").addEventListener("click", reset);
    stages.forEach((s, i) => s.addEventListener("click", () => { stop(); go(i); }));
    go(0);
  }

  /* ---------------- Scroll reveal ---------------- */
  let revealObserver = null;
  function setupReveal() {
    const els = content.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    if (revealObserver) revealObserver.disconnect();
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); revealObserver.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    els.forEach((e) => revealObserver.observe(e));
    // reveal anything already in view on next frame
    requestAnimationFrame(() => {
      els.forEach((e) => { const r = e.getBoundingClientRect(); if (r.top < window.innerHeight) e.classList.add("in"); });
    });
  }

  /* ---------------- Count-up numbers ---------------- */
  function countUp() {
    content.querySelectorAll("[data-count]").forEach((el) => {
      const target = +el.getAttribute("data-count");
      if (!target) { el.textContent = el.getAttribute("data-count"); return; }
      let cur = 0;
      const step = Math.max(1, Math.round(target / 24));
      const tick = () => {
        cur = Math.min(target, cur + step);
        el.textContent = cur;
        if (cur < target) requestAnimationFrame(tick);
      };
      tick();
    });
  }

  function copyText(text, btn) {
    const done = () => { if (btn) { const o = btn.textContent; btn.textContent = "✓ Copied"; setTimeout(() => (btn.textContent = o), 1400); } };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else { fallbackCopy(text, done); }
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta); done && done();
  }

  /* ---------------- HOME ---------------- */
  function wireHome() {
    countUp();
    content.querySelectorAll("[data-goto]").forEach((card) => {
      const go = () => { location.hash = "#" + card.dataset.goto; };
      card.addEventListener("click", go);
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
      tilt(card);
    });
  }

  // subtle 3D tilt on hover
  function tilt(el) {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `translateY(-6px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  }

  /* ---------------- GUIDE (Start Here) ---------------- */
  function wireGuide() {
    // players + reveal handled by wireCommon; nothing extra needed yet
  }

  /* ---------------- WORKSHOP ---------------- */
  function wireWorkshop() {
    const W = D.workshop;
    const panel = document.getElementById("wsDayPanel");
    const explain = document.getElementById("wsExplain");
    countUp();

    function showTopic(name) {
      const t = W.topics[name];
      if (!t) { explain.innerHTML = `<span class="ex-key">${name}</span><div class="ex-body">A hands-on session topic in the workshop.</div>`; return; }
      const linkHtml = t.link ? `<a class="link-inline" href="#${t.link}">Open the ${t.link} module →</a>` : "";
      const awsId = AWS_MAP[name];
      const awsBtn = awsId ? `<a class="btn btn-primary mt-3" href="#awslab:${awsId}">▶ Open the full animated lesson</a>` : "";
      explain.innerHTML = `<span class="ex-key">${name}</span>
        <div class="dc-simple" style="margin:10px 0 0"><span class="dc-badge">In simple words</span>${t.simple}</div>
        <div class="analogy-box" style="margin:12px 0"><span class="analogy-emoji float-y">💭</span>
          <div><div class="analogy-title">It's like…</div><div class="analogy-text">${t.analogy}</div></div></div>
        <div class="ex-body">${t.detail} ${linkHtml}</div>
        ${awsBtn}`;
      explain.classList.add("flash");
      setTimeout(() => explain.classList.remove("flash"), 400);
    }

    function loadDay(i) {
      panel.innerHTML = V.workshopDayPanel(i);
      panel.querySelectorAll("[data-wstopic]").forEach((chip) => {
        chip.addEventListener("click", () => {
          panel.querySelectorAll("[data-wstopic]").forEach((x) => x.classList.remove("sel"));
          chip.classList.add("sel");
          showTopic(chip.dataset.wstopic);
        });
      });
    }

    content.querySelectorAll("[data-wsday]").forEach((tab) => {
      tab.addEventListener("click", () => {
        content.querySelectorAll("[data-wsday]").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        loadDay(+tab.dataset.wsday);
      });
    });

    loadDay(0);
  }

  // map ALL Workshop topic names -> Animated Lab lesson ids (for deep-linking)
  const AWS_MAP = {
    // Day 1 — AWS
    "Introduction to Cloud Computing": "cloud", "AWS Global Infrastructure": "global",
    "AWS Account Setup": "account", "IAM": "iam", "AWS CLI": "cli", "VPC Architecture": "vpc",
    "Public & Private Subnets": "subnets", "Internet Gateway (IGW)": "igw", "Route Tables": "routes",
    "Security Groups": "sg", "NACLs": "nacl", "EC2 Deployment": "ec2", "Linux & Windows Servers": "osservers",
    "Instance Lifecycle Management": "lifecycle", "Custom VPC Design": "customvpc",
    "Amazon S3 Fundamentals": "s3", "Storage Classes": "storageclasses", "Static Website Hosting": "staticsite",
    "Amazon RDS (MySQL)": "rds", "Database Connectivity": "dbconn", "Backup & Disaster Recovery": "backup",
    "VPC Peering": "peering", "Transit Gateway": "transit", "Application Load Balancer (ALB)": "alb",
    "Target Groups": "targets", "Auto Scaling Groups (ASG)": "asg", "AWS Lambda Fundamentals": "lambda",
    "Amazon DynamoDB": "dynamo",
    // Day 2 — DevOps / Docker / Kubernetes
    "DevOps Culture": "devops", "SDLC": "sdlc", "Docker Architecture": "dockerarch",
    "Docker Images & Containers": "dockerimg", "Dockerfiles": "dockerfile",
    "Kubernetes Architecture": "k8sarch", "Minikube Setup": "minikube", "Pod Deployment": "poddeploy",
    "CI/CD Pipelines": "cicd", "Jenkins Integration": "jenkins", "Terraform IaC": "terraform",
    // Day 3 — Monitoring & AI
    "Prometheus Monitoring": "prometheus", "Cluster Observability": "observability", "Amazon Bedrock": "bedrock",
    "Prompt Engineering": "prompt", "Foundation Models": "foundation", "RAG": "rag",
    "AI Chatbot Project": "chatbot", "Project Demonstration & Certification": "cert",
    // Days 4 & 5
    "Mock Interview": "mock",
  };

  /* ---------------- ANIMATED LAB (course player) ---------------- */
  function wireAwsLab(initialId) {
    const A = D.lab;
    const stage = document.getElementById("awsStage");
    if (!stage) return;
    let cur = null;
    let replayTimer = null;

    function replayExample(id) {
      const body = document.getElementById("awsExampleBody");
      if (!body) return;
      const lines = A.lessons[id].example.lines;
      clearInterval(replayTimer);
      body.innerHTML = "";
      let i = 0;
      replayTimer = setInterval(() => {
        if (i >= lines.length) { clearInterval(replayTimer); return; }
        const span = document.createElement("span");
        span.className = "ln";
        span.textContent = lines[i] === "" ? "\u00a0" : lines[i];
        body.appendChild(span);
        body.scrollTop = body.scrollHeight;
        i++;
      }, 170);
    }

    function load(id, doScroll) {
      if (!A.lessons[id]) id = A.order[0];
      cur = id;
      stage.innerHTML = V.renderAwsLesson(id);
      content.querySelectorAll("[data-awsid]").forEach((b) =>
        b.classList.toggle("active", b.dataset.awsid === id));
      // wire nav buttons
      stage.querySelectorAll("[data-awsnav]").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (btn.disabled) return;
          const i = A.order.indexOf(cur);
          const t = btn.dataset.awsnav === "next" ? A.order[i + 1] : A.order[i - 1];
          if (t) load(t, true);
        });
      });
      const replay = stage.querySelector("[data-awsreplay]");
      if (replay) replay.addEventListener("click", () => replayExample(id));
      stage.querySelectorAll(".reveal").forEach((e) => e.classList.add("in"));
      replayExample(id);
      if (doScroll) stage.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    content.querySelectorAll("[data-awsid]").forEach((b) =>
      b.addEventListener("click", () => load(b.dataset.awsid, true)));

    load(initialId || A.order[0], false);
  }

  /* ---------------- DOCKER ---------------- */
  function wireDocker() {
    // architecture node detail
    const detail = document.getElementById("dockerDetail");
    content.querySelectorAll("[data-dnode]").forEach((n) => {
      const act = () => {
        content.querySelectorAll("[data-dnode]").forEach((x) => x.classList.remove("active"));
        n.classList.add("active");
        const node = D.dockerArch.find((d) => d.id === n.dataset.dnode);
        detail.innerHTML = `<h4>${node.ico} ${node.title}</h4><p>${node.detail}</p>
          <div class="dp-analogy">🔎 Like: ${node.analogy}</div>
          <ul class="dp-points">${node.points.map((p) => `<li>${p}</li>`).join("")}</ul>`;
      };
      n.addEventListener("click", act);
      n.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); } });
    });

    // command chips -> simulated terminal
    const term = document.getElementById("dockerTerm");
    content.querySelectorAll("[data-dcmd]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const c = D.dockerCommands[+chip.dataset.dcmd];
        appendLine(term, `<span class="term-prompt">$</span> ${escapeHtml(c.cmd)}`);
        typeOutput(term, c.out);
      });
    });
  }

  function appendLine(term, html, cls) {
    const div = document.createElement("div");
    div.className = "term-line" + (cls ? " " + cls : "");
    div.innerHTML = html;
    term.appendChild(div);
    term.scrollTop = term.scrollHeight;
    return div;
  }
  function typeOutput(term, lines) {
    let i = 0;
    (function next() {
      if (i >= lines.length) return;
      appendLine(term, `<span class="term-out">${escapeHtml(lines[i])}</span>`);
      i++; setTimeout(next, 220);
    })();
  }
  function escapeHtml(s) { return String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); }

  /* ---------------- KUBERNETES ---------------- */
  function wireKubernetes() {
    const all = D.masterComponents.concat(D.workerComponents);
    const detail = document.getElementById("k8sDetail");
    content.querySelectorAll("[data-kcomp]").forEach((c) => {
      const act = () => {
        content.querySelectorAll("[data-kcomp]").forEach((x) => x.classList.remove("active"));
        c.classList.add("active");
        const comp = all.find((x) => x.id === c.dataset.kcomp);
        detail.innerHTML = `<h4>${comp.ico} ${comp.name}</h4><p>${comp.detail}</p>
          <div class="dp-analogy">${comp.analogy}</div>
          <ul class="dp-points">${comp.points.map((p) => `<li>${p}</li>`).join("")}</ul>`;
      };
      c.addEventListener("click", act);
      c.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); } });
    });

    const flowDetail = document.getElementById("k8sFlowDetail");
    content.querySelectorAll("[data-knode]").forEach((n) => {
      n.addEventListener("click", () => {
        content.querySelectorAll("[data-knode]").forEach((x) => x.classList.remove("active"));
        n.classList.add("active");
        const node = D.k8sFlow.find((d) => d.id === n.dataset.knode);
        flowDetail.innerHTML = `<h4>${node.ico} ${node.title}</h4><p>${node.detail}</p>
          <div class="dp-analogy">🔎 Like: ${node.analogy}</div>`;
      });
    });
  }

  /* ---------------- YAML EXPLORER ---------------- */
  let replicaTarget = 2;
  function wireYaml() {
    let current = "pod";
    const codeEl = document.getElementById("yamlCode");
    const flowEl = document.getElementById("yamlFlow");
    const explain = document.getElementById("yamlExplain");

    function loadSample(key) {
      current = key;
      codeEl.innerHTML = V.yamlCodePanel(key);
      flowEl.innerHTML = V.yamlFlowPanel(key);
      explain.innerHTML = `<span class="ex-key">Click any line →</span><div class="ex-body explain-empty">Select a key on the left to read what it controls.</div>`;
      wireYamlKeys(key);
      wireCopyIn(codeEl);
      if (key === "deployment") { replicaTarget = 2; wireScaler(); }
    }

    function wireYamlKeys(key) {
      const sample = D.yamlSamples[key];
      codeEl.querySelectorAll("[data-ykey]").forEach((line) => {
        const select = () => {
          codeEl.querySelectorAll("[data-ykey]").forEach((x) => x.classList.remove("sel"));
          line.classList.add("sel");
          const info = sample.explain[line.dataset.ykey];
          if (info) explain.innerHTML = `<span class="ex-key">${info.key}</span>`
            + (info.plain ? `<div class="dc-simple" style="margin:8px 0 0"><span class="dc-badge">Plain words</span>${info.plain}</div>` : "")
            + `<div class="ex-body">${info.body}</div>`;
        };
        line.addEventListener("click", select);
        line.addEventListener("mouseenter", select);
      });
    }

    content.querySelectorAll("[data-ytab]").forEach((tab) => {
      tab.addEventListener("click", () => {
        content.querySelectorAll("[data-ytab]").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        loadSample(tab.dataset.ytab);
      });
    });

    loadSample("pod");
  }

  function wireCopyIn(scope) {
    scope.querySelectorAll("[data-copy]").forEach((btn) => {
      btn.onclick = () => {
        const pre = btn.closest(".code-block").querySelector(".code-body");
        copyText(pre.innerText, btn);
      };
    });
  }

  function wireScaler() {
    const stage = document.getElementById("replicaStage");
    const count = document.getElementById("replicaCount");
    if (!stage) return;
    function paint() {
      count.textContent = replicaTarget;
      stage.innerHTML = "";
      for (let i = 0; i < replicaTarget; i++) {
        const r = document.createElement("div");
        r.className = "replica";
        r.style.animationDelay = (i * 0.05) + "s";
        r.textContent = "📦";
        stage.appendChild(r);
      }
    }
    content.querySelectorAll("[data-scale]").forEach((b) => {
      b.onclick = () => {
        replicaTarget = Math.max(1, Math.min(8, replicaTarget + (+b.dataset.scale)));
        paint();
      };
    });
    paint();
  }

  /* ---------------- ARCHITECTURE ---------------- */
  function wireArchitecture() {
    // make all flow nodes show a transient tooltip-style detail using title
    const map = {};
    D.dockerArch.concat(D.k8sFlow).forEach((n) => (map[n.id] = n));
    content.querySelectorAll("[data-anode], [data-anode2]").forEach((n) => {
      const id = n.dataset.anode || n.dataset.anode2;
      const node = map[id];
      if (!node) return;
      n.setAttribute("data-tip", node.detail + (node.analogy ? "<br><br>🔎 Like: " + node.analogy : ""));
      n.setAttribute("data-tip-key", node.title);
      n.addEventListener("mouseenter", () => showTip(n));
      n.addEventListener("mousemove", () => positionTip(n));
      n.addEventListener("mouseleave", hideTip);
    });
  }

  /* ---------------- PLAYGROUND ---------------- */
  function wirePlayground() {
    const term = document.getElementById("playTerm");
    const input = document.getElementById("playInput");
    const history = [];
    let hi = -1;

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = input.value.trim();
        if (cmd) { history.push(cmd); hi = history.length; }
        appendLine(term, `<span class="term-prompt">$</span> ${escapeHtml(cmd)}`);
        runSim(term, cmd);
        input.value = "";
      } else if (e.key === "ArrowUp") {
        if (hi > 0) { hi--; input.value = history[hi] || ""; e.preventDefault(); }
      } else if (e.key === "ArrowDown") {
        if (hi < history.length - 1) { hi++; input.value = history[hi] || ""; } else { hi = history.length; input.value = ""; }
      }
    });
    input.focus();

    // validator
    const editor = document.getElementById("yamlEditor");
    document.getElementById("validateBtn").addEventListener("click", () => validateYaml(editor.value));
    document.querySelector("[data-loadsample]").addEventListener("click", () => {
      editor.value = D.yamlSamples.deployment.lines.map((l) => l.t).join("\n");
      validateYaml(editor.value);
    });
  }

  function runSim(term, cmd) {
    if (!cmd) return;
    const c = cmd.toLowerCase();
    const out = (lines, cls) => lines.forEach((l) => appendLine(term, `<span class="${cls || "term-out"}">${escapeHtml(l)}</span>`));

    if (c === "help") {
      out([
        "Available simulated commands:",
        "  docker build -t app .      build an image",
        "  docker run -p 3000:3000 app  run a container",
        "  docker ps                  list running containers",
        "  docker images              list images",
        "  kubectl get pods           list pods",
        "  kubectl get deployments    list deployments",
        "  kubectl get services       list services",
        "  kubectl apply -f file.yaml apply a manifest",
        "  clear                      clear the screen",
      ]);
      return;
    }
    if (c === "clear") { term.innerHTML = ""; return; }

    // docker
    const known = D.dockerCommands.find((x) => x.cmd.toLowerCase() === c);
    if (known) { typeOutput(term, known.out); return; }
    if (c.startsWith("docker run")) { out(["Container started 🚀", "App is now live."]); return; }
    if (c.startsWith("docker build")) { out(["[+] Building... FINISHED", "Image built successfully ✓"]); return; }
    if (c === "docker ps") { out(["CONTAINER ID   IMAGE   STATUS", "a1b2c3d4e5f6   app     Up 3s"]); return; }

    // kubectl
    if (c === "kubectl get pods") {
      out(["NAME                    READY   STATUS    RESTARTS   AGE",
           "nginx-deploy-7d8-abc    1/1     Running   0          12s",
           "nginx-deploy-7d8-def    1/1     Running   0          12s"]); return;
    }
    if (c === "kubectl get deployments") {
      out(["NAME               READY   UP-TO-DATE   AVAILABLE   AGE", "nginx-deployment   2/2     2            2           30s"]); return;
    }
    if (c === "kubectl get services") {
      out(["NAME            TYPE       CLUSTER-IP     PORT(S)        AGE", "nginx-service   NodePort   10.96.0.12     80:30080/TCP   30s"]); return;
    }
    if (c === "kubectl get nodes") {
      out(["NAME       STATUS   ROLES           AGE   VERSION", "master-1   Ready    control-plane   1d    v1.30.0", "worker-1   Ready    <none>          1d    v1.30.0"]); return;
    }
    if (c.startsWith("kubectl apply")) { out(["deployment.apps/nginx-deployment created ✓"]); return; }
    if (c.startsWith("kubectl")) { out(["Simulated kubectl — try: get pods | get deployments | get services | get nodes"]); return; }

    out([`command not found: ${cmd}. Type 'help' for options.`], "term-err");
  }

  function validateYaml(text) {
    const out = document.getElementById("validateOut");
    const lines = text.split("\n");
    const findKey = (k) => lines.find((l) => new RegExp("^\\s*" + k + "\\s*:").test(l));
    const get = (k) => { const l = findKey(k); return l ? l.split(":").slice(1).join(":").trim() : null; };
    const msgs = [];
    let errors = 0, warns = 0;

    const required = ["apiVersion", "kind", "metadata", "spec"];
    required.forEach((k) => {
      if (findKey(k)) msgs.push(`<span class="v-ok">✓ ${k} present</span>`);
      else { msgs.push(`<span class="v-bad">✗ missing required field: ${k}</span>`); errors++; }
    });

    const kind = get("kind");
    if (kind) {
      msgs.push(`<span class="v-ok">✓ kind = ${kind}</span>`);
      if (kind === "Deployment" && !findKey("replicas")) { msgs.push(`<span class="v-warn">⚠ Deployment usually defines spec.replicas</span>`); warns++; }
      if (kind === "Deployment" && get("apiVersion") !== "apps/v1") { msgs.push(`<span class="v-warn">⚠ Deployment apiVersion should be apps/v1</span>`); warns++; }
      if ((kind === "Pod" || kind === "Service") && get("apiVersion") !== "v1") { msgs.push(`<span class="v-warn">⚠ ${kind} apiVersion is typically v1</span>`); warns++; }
      if (kind === "Service" && !findKey("ports")) { msgs.push(`<span class="v-warn">⚠ Service usually defines spec.ports</span>`); warns++; }
    }
    // basic indentation sanity (tabs are illegal in YAML)
    if (lines.some((l) => l.includes("\t"))) { msgs.push(`<span class="v-bad">✗ tabs detected — YAML requires spaces for indentation</span>`); errors++; }

    const verdict = errors
      ? `<span class="v-bad">✗ ${errors} error(s), ${warns} warning(s)</span>`
      : warns ? `<span class="v-warn">✓ valid with ${warns} warning(s)</span>`
              : `<span class="v-ok">✓ Looks good! All essential fields present.</span>`;

    out.innerHTML = verdict + "\n\n" + msgs.join("\n");
  }

  /* ---------------- DIAGRAM BUILDER ---------------- */
  function wireBuilder() {
    const canvas = document.getElementById("canvas");
    const empty = document.getElementById("canvasEmpty");
    let dragData = null;

    // palette drag start
    content.querySelectorAll(".palette-item").forEach((p) => {
      p.addEventListener("dragstart", (e) => {
        dragData = { ico: p.dataset.ico, label: p.dataset.label };
        e.dataTransfer.setData("text/plain", p.dataset.label);
        e.dataTransfer.effectAllowed = "copy";
      });
    });

    canvas.addEventListener("dragover", (e) => { e.preventDefault(); canvas.classList.add("drop-hint"); });
    canvas.addEventListener("dragleave", () => canvas.classList.remove("drop-hint"));
    canvas.addEventListener("drop", (e) => {
      e.preventDefault();
      canvas.classList.remove("drop-hint");
      if (!dragData) return;
      const r = canvas.getBoundingClientRect();
      placeNode(dragData.ico, dragData.label, e.clientX - r.left - 40, e.clientY - r.top - 20);
      dragData = null;
    });

    function placeNode(ico, label, x, y) {
      empty.style.display = "none";
      const node = document.createElement("div");
      node.className = "placed";
      node.style.left = Math.max(0, x) + "px";
      node.style.top = Math.max(0, y) + "px";
      node.innerHTML = `<span>${ico}</span><span>${label}</span><span class="rm" title="remove">✕</span>`;
      canvas.appendChild(node);
      node.querySelector(".rm").addEventListener("click", (ev) => {
        ev.stopPropagation();
        node.remove();
        if (!canvas.querySelector(".placed")) empty.style.display = "grid";
      });
      makeDraggableInCanvas(node, canvas);
    }

    document.getElementById("clearCanvas").addEventListener("click", () => {
      canvas.querySelectorAll(".placed").forEach((n) => n.remove());
      empty.style.display = "grid";
    });
  }

  function makeDraggableInCanvas(node, canvas) {
    let sx, sy, ox, oy, moving = false;
    node.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("rm")) return;
      moving = true;
      sx = e.clientX; sy = e.clientY;
      ox = parseInt(node.style.left, 10); oy = parseInt(node.style.top, 10);
      node.style.cursor = "grabbing"; node.style.zIndex = 10;
      e.preventDefault();
    });
    document.addEventListener("mousemove", (e) => {
      if (!moving) return;
      const r = canvas.getBoundingClientRect();
      let nx = ox + (e.clientX - sx), ny = oy + (e.clientY - sy);
      nx = Math.max(0, Math.min(r.width - node.offsetWidth, nx));
      ny = Math.max(0, Math.min(r.height - node.offsetHeight, ny));
      node.style.left = nx + "px"; node.style.top = ny + "px";
    });
    document.addEventListener("mouseup", () => { moving = false; node.style.cursor = "grab"; });
  }

  /* ---------------- INTERVIEW ---------------- */
  function wireInterview() {
    content.querySelectorAll(".qa-q").forEach((q) => {
      q.addEventListener("click", () => q.closest(".qa-item").classList.toggle("open"));
    });
    content.querySelectorAll("[data-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        content.querySelectorAll(".chip-filter").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.cat;
        content.querySelectorAll(".qa-item").forEach((item) => {
          item.style.display = (cat === "All" || item.dataset.cat === cat) ? "" : "none";
        });
      });
    });
  }

  /* ---------------- boot ---------------- */
  window.addEventListener("hashchange", render);
  window.addEventListener("scroll", hideTip, true);
  updateProgress();
  render();
})();
