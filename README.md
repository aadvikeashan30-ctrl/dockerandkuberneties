# ⚡ Code Origin.AI — Interactive DevOps Trainer

A modern, futuristic, **single-page educational web app** that teaches **Docker** and **Kubernetes** visually — with diagrams, animated flows, hover tooltips, a live terminal simulator, an interactive YAML explorer, and a drag-and-drop architecture builder.

> Dark theme · neon blue + purple · glassmorphism cards · glowing borders · smooth animations.

**Zero dependencies. No build step. No network required.** Just open `index.html`.

---

## ✨ Features

### 🐳 Docker Fundamentals
- **What is Docker** + a shipping-box analogy card
- **Docker Architecture** — clickable flow: `Developer → Docker CLI → Docker Daemon → Images → Containers`
- The three building blocks: **Client · Docker Host · Registry (Docker Hub)**
- **Images** as blueprints (nginx, node, python, postgres)
- **Containers** — image → `docker run` → live running box
- **Dockerfile** with a **per-line hover tooltip** explaining `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`
- **Commands panel** — click chips to run them in a simulated terminal
- **Ports mapping** — animated packets flowing `Host 8080 → Container 80`

### ☸️ Kubernetes Architecture
- **Interactive cluster diagram** — clickable Master (API Server, Scheduler, Controller Manager, etcd) and Worker (Kubelet, Kube-proxy, Pod, Runtime) components
- **Node** and **Pod** concept cards + Pod anatomy
- **Full request flow** — `Deployment → ReplicaSet → Pod → Container → Service → Internet` with glowing animated arrows

### 📄 YAML Explorer
- Switch between **Pod**, **Deployment** and **Service** manifests
- **Click/hover any line** to read a plain-English explanation of the field
- **Replica scaling animation** on the Deployment tab (watch Pods pop in/out)
- Traffic/ownership flow shown per manifest

### 🗺️ Architecture View
- The end-to-end "build → ship → run → serve" big picture
- Real-world DevOps examples (scaling, zero-downtime deploys, microservices, CI/CD)

### 🧪 Playground
- **Live terminal simulator** — supports `docker ...` and `kubectl ...` commands, history (↑/↓), and `help`/`clear`
- **Try-it-yourself YAML editor** with a lightweight **validator** (checks required fields, kind-specific rules, tab usage)

### 🧩 Diagram Builder
- **Drag and drop** components onto a canvas, reposition them, and remove them — sketch your own pipeline

### 🎯 Interview Q&A
- Curated Docker / Kubernetes interview questions with concise answers, filterable by topic

---

## 🚀 Run it

No tooling needed — it's pure static HTML/CSS/JS.

```bash
# Option 1: just open the file
open index.html        # macOS
# or double-click index.html

# Option 2: serve it locally (recommended for clipboard APIs)
python3 -m http.server 8000
# then visit http://localhost:8000
```

### Deploy on GitHub Pages
1. Push this repo to GitHub.
2. Settings → Pages → Source: `main` branch, root (`/`).
3. Your trainer goes live at `https://<user>.github.io/<repo>/`.

---

## 📁 Project structure

```
.
├── index.html          # App shell: sidebar nav + view container
├── css/
│   └── styles.css      # Dark/neon/glassmorphism theme + animations
└── js/
    ├── data.js         # All learning content (Docker, K8s, YAML, Q&A)
    ├── views.js        # HTML templates for each view
    └── app.js          # Router + navigation + all interactivity
```

## 🎨 Tech
- Vanilla **HTML + CSS + JavaScript** (no frameworks, no bundler)
- Hash-based routing, `localStorage` progress tracking
- Respects `prefers-reduced-motion`
