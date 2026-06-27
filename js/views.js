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

  /* =====================================================
     HOME / OVERVIEW
     ===================================================== */
  function home() {
    const cards = [
      { ico: "🐳", title: "Docker Fundamentals", body: "Images, containers, Dockerfile, commands & ports — explained with everyday analogies.", view: "docker" },
      { ico: "☸️", title: "Kubernetes Architecture", body: "The control plane, worker nodes and Pods — told as a busy restaurant story.", view: "kubernetes" },
      { ico: "📄", title: "YAML Explorer", body: "Click any line of Pod, Deployment & Service YAML to see plain-English meaning.", view: "yaml" },
      { ico: "🗺️", title: "Architecture View", body: "The full journey from a developer's laptop to users on the internet.", view: "architecture" },
      { ico: "🧪", title: "Playground", body: "A live terminal simulator and a try-it-yourself YAML validator.", view: "playground" },
      { ico: "🎯", title: "Interview Q&A", body: "Curated DevOps interview questions with clear, analogy-backed answers.", view: "interview" },
    ];
    return `<div class="view">
      ${head("Interactive DevOps Trainer", `Learn <span class="gradient-text">Docker &amp; Kubernetes</span> the easy way`,
        "No jargon overload. Every idea here comes with a real-life analogy, a plain-words explanation and an animated diagram — so anyone, technical or not, can truly get it.")}

      <div class="stats reveal">
        <div class="stat"><div class="s-num a" data-count="2">0</div><div class="s-lbl">Core Modules</div></div>
        <div class="stat"><div class="s-num b" data-count="9">0</div><div class="s-lbl">Concepts + Analogies</div></div>
        <div class="stat"><div class="s-num c" data-count="8">0</div><div class="s-lbl">Journey Steps</div></div>
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
    home, docker, kubernetes, yaml, architecture, playground, builder, interview,
    yamlCodePanel, yamlFlowPanel,
  };
})();
