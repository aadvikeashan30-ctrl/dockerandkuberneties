/* =========================================================
   Code Origin.AI — View templates
   Each function returns an HTML string for a view.
   Interactivity is wired up by app.js after injection.
   ========================================================= */
window.VIEWS = (function () {
  const D = window.DATA;

  /* ---------- helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function head(eyebrow, title, sub) {
    return `<div class="page-head">
      <span class="eyebrow">${eyebrow}</span>
      <h1 class="page-title">${title}</h1>
      <p class="page-sub">${sub}</p>
    </div>`;
  }

  // Build a horizontal animated flow diagram from a node list
  function flowDiagram(nodes, idAttr) {
    const parts = nodes.map((n, i) => {
      const node = `<div class="flow-node" data-${idAttr}="${n.id}" role="button" tabindex="0">
        <div class="fn-ico">${n.ico}</div>
        <div class="fn-title">${n.title}</div>
        <div class="fn-sub">${n.sub}</div>
      </div>`;
      const arrow = i < nodes.length - 1
        ? `<div class="flow-arrow"><span class="pulse" style="animation-delay:${i * 0.3}s"></span></div>`
        : "";
      return node + arrow;
    }).join("");
    return `<div class="flow-wrap"><div class="flow">${parts}</div></div>`;
  }

  // Simple YAML syntax coloring for static code blocks
  function colorYaml(line) {
    let s = esc(line);
    // comments
    s = s.replace(/(#.*)$/, '<span class="tok-cmt">$1</span>');
    // key:
    s = s.replace(/^(\s*-?\s*)([\w.\-\/]+)(:)/, (m, pre, key, colon) => `${pre}<span class="tok-prop">${key}</span>${colon}`);
    // quoted strings
    s = s.replace(/(["'].*?["'])/g, '<span class="tok-str">$1</span>');
    // standalone numbers
    s = s.replace(/(:\s*)(\d+)(\s*$)/, (m, a, n, b) => `${a}<span class="tok-num">${n}</span>${b}`);
    return s;
  }

  function codeBlock(title, lines, opts = {}) {
    const body = lines.map((l) => `<span class="ln">${opts.raw ? esc(l) : colorYaml(l)}</span>`).join("");
    return `<div class="code-block">
      <div class="code-head">
        <span class="code-dots"><span class="r"></span><span class="y"></span><span class="g"></span></span>
        <span class="code-title">${esc(title)}</span>
        <button class="code-copy" data-copy>Copy</button>
      </div>
      <pre class="code-body">${body}</pre>
    </div>`;
  }

  /* =====================================================
     HOME / OVERVIEW
     ===================================================== */
  function home() {
    const cards = [
      { ico: "🐳", title: "Docker Fundamentals", body: "Images, containers, Dockerfile, commands & port mapping — explained visually.", view: "docker" },
      { ico: "☸️", title: "Kubernetes Architecture", body: "Control plane, worker nodes, Pods and the full request flow.", view: "kubernetes" },
      { ico: "📄", title: "YAML Explorer", body: "Hover any line of Pod, Deployment & Service YAML to learn what it does.", view: "yaml" },
      { ico: "🧪", title: "Playground", body: "A live terminal simulator and a try-it-yourself YAML editor.", view: "playground" },
      { ico: "🧩", title: "Diagram Builder", body: "Drag and drop components to build your own cloud architecture.", view: "builder" },
      { ico: "🎯", title: "Interview Q&A", body: "Curated DevOps interview questions with clear answers.", view: "interview" },
    ];
    return `<div class="view">
      ${head("Interactive DevOps Trainer", `Learn <span class="gradient-text">Docker &amp; Kubernetes</span> visually`,
        "Code Origin.AI turns dense DevOps concepts into diagrams, animated flows and hands-on playgrounds. Pick a module below and go from beginner to advanced.")}

      <div class="stats">
        <div class="stat"><div class="s-num a">2</div><div class="s-lbl">Core Modules</div></div>
        <div class="stat"><div class="s-num b">3</div><div class="s-lbl">YAML Files Decoded</div></div>
        <div class="stat"><div class="s-num c">12</div><div class="s-lbl">Interview Questions</div></div>
        <div class="stat"><div class="s-num d">∞</div><div class="s-lbl">Hands-on Practice</div></div>
      </div>

      <div class="grid cols-3">
        ${cards.map((c) => `<div class="card lift-3d" data-goto="${c.view}" role="button" tabindex="0">
          <div class="card-ico">${c.ico}</div>
          <h3>${c.title}</h3>
          <p>${c.body}</p>
          <div class="pill-row"><span class="pill">Explore →</span></div>
        </div>`).join("")}
      </div>

      <div class="callout mt-3">
        <span class="ca-emoji">💡</span>
        <div><strong>How to use this trainer:</strong> Everything is interactive — hover code lines for tooltips, click diagram nodes for explanations, run commands in the simulator, and drag components in the builder. Your progress ring (bottom-left) fills as you visit modules.</div>
      </div>
    </div>`;
  }

  /* =====================================================
     DOCKER
     ===================================================== */
  function docker() {
    return `<div class="view">
      ${head("🐳 Module 01", `Docker <span class="gradient-text">Fundamentals</span>`,
        "Docker packages an app and its environment into a portable container. Work through the building blocks below — each is visual and interactive.")}

      <!-- 1 & 2: concept cards -->
      <h2 class="section-title"><span class="st-num">01</span> Concepts &amp; Analogy</h2>
      <div class="grid cols-2">
        ${D.dockerCards.map((c) => `<div class="card">
          <div class="card-ico">${c.ico}</div>
          <span class="tagline">${c.tag}</span>
          <h3>${c.title}</h3>
          <p>${c.body}</p>
        </div>`).join("")}
      </div>

      <!-- Architecture diagram -->
      <h2 class="section-title"><span class="st-num">02</span> Docker Architecture</h2>
      <p class="muted">Click any block to learn its role. This is the path your code takes from keyboard to running container.</p>
      ${flowDiagram(D.dockerArch, "dnode")}
      <div class="detail-panel" id="dockerDetail">
        <h4>👆 Click a block above</h4>
        <p>Select Developer, Docker CLI, Daemon, Images or Containers to see what each part does.</p>
      </div>

      <div class="grid cols-3 mt-3">
        ${D.dockerBlocks.map((b) => `<div class="card">
          <div class="card-ico">${b.ico}</div>
          <h3>${b.name}</h3>
          <p>${b.role}</p>
        </div>`).join("")}
      </div>

      <!-- Images -->
      <h2 class="section-title"><span class="st-num">03</span> Docker Images <span class="muted" style="font-size:13px;font-weight:400">— the blueprints 🖼️</span></h2>
      <div class="grid cols-4">
        ${D.dockerImages.map((im) => `<div class="card center">
          <div class="card-ico" style="margin:0 auto 12px">${im.ico}</div>
          <h3 style="font-family:var(--mono)">${im.name}</h3>
          <p>${im.role}</p>
        </div>`).join("")}
      </div>

      <!-- Containers -->
      <h2 class="section-title"><span class="st-num">04</span> Docker Containers</h2>
      <div class="callout">
        <span class="ca-emoji">🟢</span>
        <div>A <strong>container</strong> is a <em>live, running instance</em> of an image. Below is a container coming alive — an isolated box running your app, started from a static blueprint.</div>
      </div>
      <div class="grid cols-3 mt-2">
        <div class="card center"><div class="card-ico" style="margin:0 auto 12px">🖼️</div><h3>Image</h3><p>Static blueprint on disk</p></div>
        <div class="card center" style="display:grid;place-items:center"><div style="font-size:30px" class="blink">➡️</div><p class="muted">docker run</p></div>
        <div class="card center" style="border-color:var(--neon)"><div class="card-ico" style="margin:0 auto 12px;animation:pulseGlow 3s infinite">🟢</div><h3>Container</h3><p>Live running process</p></div>
      </div>

      <!-- Dockerfile -->
      <h2 class="section-title"><span class="st-num">05</span> Dockerfile <span class="muted" style="font-size:13px;font-weight:400">— hover each line</span></h2>
      <div class="grid cols-2">
        <div class="code-block">
          <div class="code-head">
            <span class="code-dots"><span class="r"></span><span class="y"></span><span class="g"></span></span>
            <span class="code-title">Dockerfile</span>
            <button class="code-copy" data-copy>Copy</button>
          </div>
          <pre class="code-body">${D.dockerfile.map((l) =>
            `<span class="code-line" data-tip-key="${esc(l.key)}" data-tip="${esc(l.tip)}">${colorYaml(l.code)}</span>`
          ).join("")}</pre>
        </div>
        <div class="card">
          <h3>What a Dockerfile does</h3>
          <p>A Dockerfile is a recipe. Each instruction creates a cached layer. Docker reads it top-to-bottom to build your image. Hover any line on the left to see exactly what it does.</p>
          <div class="pill-row">
            <span class="pill">FROM = base</span><span class="pill">WORKDIR = folder</span>
            <span class="pill">COPY = files</span><span class="pill">RUN = build step</span><span class="pill">CMD = start</span>
          </div>
        </div>
      </div>

      <!-- Commands -->
      <h2 class="section-title"><span class="st-num">06</span> Docker Commands</h2>
      <p class="muted">Click a command chip to run it in the mini terminal.</p>
      <div class="grid cols-2">
        <div class="terminal">
          <div class="code-head">
            <span class="code-dots"><span class="r"></span><span class="y"></span><span class="g"></span></span>
            <span class="code-title">bash — docker</span>
          </div>
          <div class="term-body" id="dockerTerm">
            <div class="term-line term-out">// Click a command below to simulate it.</div>
          </div>
        </div>
        <div>
          <div class="cmd-chips">
            ${D.dockerCommands.map((c, i) => `<button class="cmd-chip" data-dcmd="${i}">${esc(c.cmd)}</button>`).join("")}
          </div>
          <div class="callout mt-3"><span class="ca-emoji">⌨️</span><div>These run against a <strong>simulated</strong> Docker engine — safe to click. Try them in order: build → run → ps.</div></div>
        </div>
      </div>

      <!-- Ports mapping -->
      <h2 class="section-title"><span class="st-num">07</span> Ports Mapping</h2>
      <div class="card">
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
        "Kubernetes orchestrates containers across many machines. A control plane makes decisions; worker nodes run the Pods. Click any component to learn its job.")}

      <h2 class="section-title"><span class="st-num">01</span> Cluster Architecture</h2>
      <div class="cluster">
        <div class="node-box">
          <div class="nb-head"><span class="dot"></span>🧠 Master / Control Plane</div>
          ${D.masterComponents.map(comp).join("")}
        </div>
        <div class="node-box">
          <div class="nb-head"><span class="dot"></span>🛠️ Worker Node</div>
          ${D.workerComponents.map(comp).join("")}
        </div>
      </div>
      <div class="detail-panel" id="k8sDetail">
        <h4>👆 Click a component</h4>
        <p>Select any box from the Master or Worker node to see what it does.</p>
      </div>

      <h2 class="section-title"><span class="st-num">02</span> Core Concepts</h2>
      <div class="grid cols-3">
        ${D.k8sConcepts.map((c) => `<div class="card">
          <div class="card-ico">${c.ico}</div>
          <span class="tagline">${c.tag}</span>
          <h3>${c.title}</h3>
          <p>${c.body}</p>
        </div>`).join("")}
      </div>

      <h2 class="section-title"><span class="st-num">03</span> Pod Anatomy</h2>
      <div class="callout">
        <span class="ca-emoji">📦</span>
        <div>A <strong>Pod</strong> is the smallest unit. It's a box that holds one or more containers sharing the same network and storage.</div>
      </div>
      <div class="card mt-2 center">
        <div style="display:inline-block;padding:24px 30px;border-radius:18px;border:1.5px dashed var(--neon);background:rgba(124,92,255,.08)">
          <div class="muted" style="margin-bottom:10px">📦 Pod (shared IP &amp; storage)</div>
          <span class="pod-mini">🐳 container: nginx</span>
          <span class="pod-mini">🔧 sidecar: logger</span>
        </div>
      </div>

      <h2 class="section-title"><span class="st-num">04</span> Full Request Flow</h2>
      <p class="muted">From a declared Deployment all the way to a real user on the Internet. Click any stage.</p>
      ${flowDiagram(D.k8sFlow, "knode")}
      <div class="detail-panel" id="k8sFlowDetail">
        <h4>🔁 Deployment → ReplicaSet → Pod → Container → Service → Internet</h4>
        <p>This is how your app becomes reachable. Click each stage above to understand the hand-off.</p>
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
        "Kubernetes is configured with YAML. Pick a file type, then click or hover any line to see exactly what that field means.")}

      <div class="yaml-tabs">
        ${tabs.map((t, i) => `<button class="yaml-tab ${i === 0 ? "active" : ""}" data-ytab="${t}">${D.yamlSamples[t].label}</button>`).join("")}
      </div>

      <div class="yaml-grid">
        <div class="code-block" id="yamlCode"><!-- injected --></div>
        <div>
          <div class="card explain-card" id="yamlExplain">
            <span class="ex-key">Click any line →</span>
            <div class="ex-body explain-empty">Select a key on the left to read a plain-English explanation of what it controls.</div>
          </div>
          <div class="card mt-2" id="yamlFlow"><!-- flow injected --></div>
        </div>
      </div>
    </div>`;
  }

  // Build the YAML code panel for a given sample key
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
      `<span class="pod-mini">${esc(f)}</span>${i < s.flow.length - 1 ? '<span style="color:var(--neon);margin:0 2px">→</span>' : ""}`
    ).join("");
    let extra = "";
    if (sampleKey === "deployment") {
      extra = `<div class="mt-2">
        <div class="muted" style="font-size:13px;margin-bottom:8px">Scaling demo — watch replicas grow:</div>
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
      <div style="font-size:14px;line-height:2">${steps}</div>${extra}`;
  }

  /* =====================================================
     ARCHITECTURE VIEW (combined big picture)
     ===================================================== */
  function architecture() {
    return `<div class="view">
      ${head("🗺️ Big Picture", `End-to-end <span class="gradient-text">Architecture View</span>`,
        "How Docker and Kubernetes fit together — from a developer's laptop to users hitting your app in production.")}

      <h2 class="section-title"><span class="st-num">01</span> Build → Ship</h2>
      ${flowDiagram(D.dockerArch, "anode")}

      <div class="divider"></div>

      <h2 class="section-title"><span class="st-num">02</span> Run → Serve</h2>
      ${flowDiagram(D.k8sFlow, "anode2")}

      <div class="callout mt-3">
        <span class="ca-emoji">🔗</span>
        <div><strong>The link:</strong> Docker builds the <em>image</em>; the image is pushed to a <em>registry</em>; Kubernetes pulls that image and runs it inside <em>Pods</em>, then exposes it through a <em>Service</em>. Same artifact, dev to prod.</div>
      </div>

      <h2 class="section-title"><span class="st-num">03</span> Real-world examples</h2>
      <div class="grid cols-2">
        ${D.realWorld.map((r) => `<div class="card">
          <div class="card-ico">${r.ico}</div>
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

      <h2 class="section-title"><span class="st-num">01</span> Live Terminal Simulator</h2>
      <div class="terminal">
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

      <h2 class="section-title"><span class="st-num">02</span> Try-it-yourself YAML Editor</h2>
      <div class="editor-grid">
        <div class="code-block" style="display:flex;flex-direction:column">
          <div class="code-head">
            <span class="code-dots"><span class="r"></span><span class="y"></span><span class="g"></span></span>
            <span class="code-title">your-manifest.yaml</span>
            <button class="code-copy" data-loadsample>Load sample</button>
          </div>
          <textarea class="editor-area" id="yamlEditor" spellcheck="false">${esc(starter)}</textarea>
        </div>
        <div class="card">
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
        <div class="palette" id="palette">
          ${palette.map((p) => `<div class="palette-item" draggable="true" data-ico="${p.ico}" data-label="${p.label}">
            <span>${p.ico}</span><span>${p.label}</span>
          </div>`).join("")}
          <button class="btn btn-ghost mt-2" id="clearCanvas">🗑️ Clear canvas</button>
        </div>
        <div class="canvas" id="canvas">
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
        "Common Docker & Kubernetes interview questions with concise, correct answers. Filter by topic and click a question to reveal its answer.")}

      <div class="filter-bar" id="qaFilter">
        ${cats.map((c, i) => `<button class="chip-filter ${i === 0 ? "active" : ""}" data-cat="${c}">${c}</button>`).join("")}
      </div>

      <div id="qaList">
        ${D.interview.map((q, i) => `<div class="qa-item" data-cat="${q.cat}" data-qa="${i}">
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
    home, docker, kubernetes, yaml, architecture, playground, builder, interview,
    // sub-renderers used by app.js
    yamlCodePanel, yamlFlowPanel,
  };
})();
