/* =========================================================
   Code Origin.AI — Content data (enriched)
   Every concept now has: a plain-words line, a real-life
   analogy, a deeper technical note, and key bullet points —
   so even a non-technical reader can follow along.
   ========================================================= */
window.DATA = (function () {

  /* =========================================================
     DOCKER — deep concept cards
     each: { id, ico, tag, title, simple, analogy{emoji,title,text},
             technical, points[] }
     ========================================================= */
  const dockerConcepts = [
    {
      id: "what",
      ico: "🐳", tag: "Concept", title: "What is Docker?",
      simple: "Docker puts your app and everything it needs into one neat box that runs the same way on any computer.",
      analogy: {
        emoji: "🍱",
        title: "Like a ready-to-eat lunchbox",
        text: "Imagine a sealed lunchbox that already has the food, the spoon, the napkin and the heating instructions inside. You can hand it to anyone, anywhere, and they get the exact same meal. Docker does this for software — the app, its tools and settings travel together.",
      },
      technical: "Docker is a containerization platform. It bundles an application with its runtime, libraries, dependencies and configuration into a single isolated unit (a container) that shares the host OS kernel but runs in its own sandbox.",
      points: [
        "Solves the classic 'but it works on my machine!' problem",
        "Starts in seconds and uses very little memory",
        "Runs identically on a laptop, a server, or the cloud",
      ],
    },
    {
      id: "image",
      ico: "🖼️", tag: "Image", title: "Docker Image",
      simple: "An image is the read-only blueprint used to create containers. Build it once, run it anywhere.",
      analogy: {
        emoji: "📜",
        title: "Like a cooking recipe",
        text: "A recipe doesn't feed anyone by itself — but follow it and you can cook the same dish a thousand times. An image is that recipe: a frozen, unchangeable template. Each container you run is one freshly-cooked plate made from it.",
      },
      technical: "An image is an immutable, layered filesystem snapshot. Layers are cached and shared, so rebuilds and downloads are fast. Images are identified by name:tag, e.g. nginx:latest.",
      points: [
        "Read-only — never changes once built",
        "Made of stacked, reusable layers (like lasagna)",
        "Stored locally or in a registry such as Docker Hub",
      ],
    },
    {
      id: "container",
      ico: "🟢", tag: "Container", title: "Docker Container",
      simple: "A container is a running, living copy of an image — your app actually executing, isolated from everything else.",
      analogy: {
        emoji: "🏠",
        title: "Like apartments in one building",
        text: "One building (your computer) holds many apartments (containers). Each family lives independently — own furniture, own door key — yet they all share the same foundation, water and electricity. Containers are isolated apps sharing one operating system.",
      },
      technical: "A container is a runtime instance of an image with a thin writable layer on top. It has its own process tree, network and filesystem view, isolated via Linux namespaces and cgroups.",
      points: [
        "Live and writable, unlike the image it came from",
        "Start, stop and delete freely — the image is untouched",
        "Many containers can run from one image at the same time",
      ],
    },
    {
      id: "registry",
      ico: "☁️", tag: "Registry", title: "Registry (Docker Hub)",
      simple: "A registry is an online library where images are stored and shared. Docker Hub is the most popular one.",
      analogy: {
        emoji: "📚",
        title: "Like an app store / library",
        text: "Just like you download an app from the App Store, you 'pull' ready-made images (nginx, node, postgres) from a registry. And when you build your own, you 'push' it back so teammates and servers can grab the exact same copy.",
      },
      technical: "A registry is a versioned storage and distribution service for images. `docker pull` downloads images, `docker push` uploads them. Registries can be public (Docker Hub) or private.",
      points: [
        "Pull = download an image · Push = upload your own",
        "Public images: nginx, node, python, postgres…",
        "Teams use private registries for their own apps",
      ],
    },
  ];

  // Docker architecture flow (Developer -> CLI -> Daemon -> Images -> Containers)
  const dockerArch = [
    {
      id: "dev", ico: "👩‍💻", title: "Developer", sub: "writes code",
      detail: "The developer writes application code and a Dockerfile describing how to package it.",
      analogy: "The chef who decides what dish to make and writes down the recipe steps.",
      points: ["Writes the app", "Writes the Dockerfile (recipe)", "Types docker commands"],
    },
    {
      id: "cli", ico: "⌨️", title: "Docker CLI", sub: "the client",
      detail: "The Docker CLI (client) sends your commands like 'docker build' and 'docker run' to the Docker Daemon over a REST API.",
      analogy: "The waiter who takes your order and carries it to the kitchen.",
      points: ["You type here: docker build/run", "Just passes orders along", "Talks to the daemon via an API"],
    },
    {
      id: "daemon", ico: "⚙️", title: "Docker Daemon", sub: "docker host",
      detail: "The Daemon (dockerd) runs on the Docker Host. It builds images, runs containers, and manages networks & volumes.",
      analogy: "The kitchen and its chefs — where the real cooking (building & running) happens.",
      points: ["Builds images", "Runs & stops containers", "Manages networks and storage"],
    },
    {
      id: "image", ico: "🖼️", title: "Docker Images", sub: "blueprints",
      detail: "Images are immutable blueprints created by the daemon. They are layered and cached for fast rebuilds.",
      analogy: "The finished recipe cards stored in the kitchen, ready to cook from.",
      points: ["Read-only blueprints", "Built from a Dockerfile", "Reused to create containers"],
    },
    {
      id: "container", ico: "🟢", title: "Containers", sub: "running apps",
      detail: "Containers are the live, isolated instances launched from images. This is where your app actually runs.",
      analogy: "The plated dishes served to customers — the real, edible result.",
      points: ["Live running instances", "Isolated from each other", "Where users' requests are served"],
    },
  ];

  // The three big Docker building blocks
  const dockerBlocks = [
    { ico: "💻", name: "Client", role: "The Docker CLI you type commands into.", analogy: "The remote control", color: "a" },
    { ico: "🖥️", name: "Docker Host", role: "Runs the daemon, images & containers.", analogy: "The TV set doing the work", color: "b" },
    { ico: "☁️", name: "Registry", role: "Docker Hub — stores & shares images.", analogy: "The streaming library", color: "c" },
  ];

  // Docker vs Virtual Machine
  const dockerVsVm = {
    intro: "People often confuse containers with virtual machines (VMs). Here's the easiest way to see the difference.",
    analogy: {
      emoji: "🏘️",
      title: "Houses vs Apartments",
      text: "A Virtual Machine is like building a separate house for every family — each one needs its own foundation, walls, plumbing and electricity. Heavy and slow to build. A Container is like apartments in one building — every family is private, but they share the foundation and utilities. Light and quick.",
    },
    rows: [
      { label: "Startup time", vm: "Minutes (boots a full OS)", cont: "Seconds (just a process)" },
      { label: "Size", vm: "Gigabytes", cont: "Megabytes" },
      { label: "Operating system", vm: "Each VM has its own full OS", cont: "Shares the host's OS kernel" },
      { label: "Isolation", vm: "Very strong (separate machine)", cont: "Strong (process-level sandbox)" },
      { label: "Resource use", vm: "Heavy", cont: "Light" },
    ],
  };

  const dockerImages = [
    { ico: "🌐", name: "nginx", role: "Web server / reverse proxy image" },
    { ico: "🟩", name: "node", role: "Node.js runtime image for JS apps" },
    { ico: "🐍", name: "python", role: "Python runtime image" },
    { ico: "🐘", name: "postgres", role: "PostgreSQL database image" },
  ];

  // Dockerfile with per-line tooltips + plain-language meaning
  const dockerfile = [
    { code: "FROM node:18", key: "FROM", tip: "Sets the base image. Here we start from the official Node.js 18 image so Node is preinstalled.", plain: "Start from a kitchen that already has Node.js installed." },
    { code: "WORKDIR /app", key: "WORKDIR", tip: "Sets the working directory inside the container. Following commands run from /app.", plain: "Pick the folder we'll work inside, like choosing a countertop." },
    { code: "COPY . .", key: "COPY", tip: "Copies files from your project (host) into the image's current directory (/app).", plain: "Bring your ingredients (code files) onto the countertop." },
    { code: "RUN npm install", key: "RUN", tip: "Executes a command at build time. Installs your Node dependencies into the image.", plain: "Prep step: install everything the app needs." },
    { code: 'CMD ["node", "server.js"]', key: "CMD", tip: "The default command run when a container starts. Launches your server.", plain: "The 'serve now' instruction — runs when the container starts." },
  ];

  const dockerCommands = [
    { cmd: "docker build -t app .", out: ["[+] Building 12.4s (8/8) FINISHED", " => exporting to image", " => => naming to docker.io/library/app:latest"], plain: "Cook the recipe into an image named 'app'." },
    { cmd: "docker run -p 3000:3000 app", out: ["Server listening on http://0.0.0.0:3000", "Container is now live 🚀"], plain: "Serve a plate: start a container and open port 3000." },
    { cmd: "docker ps", out: ["CONTAINER ID   IMAGE   STATUS         PORTS", "a1b2c3d4e5f6   app     Up 5 seconds   0.0.0.0:3000->3000/tcp"], plain: "List the dishes currently being served (running containers)." },
    { cmd: "docker images", out: ["REPOSITORY   TAG       SIZE", "app          latest    142MB", "node         18        998MB"], plain: "List all recipes (images) you have on hand." },
    { cmd: "docker stop app", out: ["app"], plain: "Stop serving that dish (stop the container)." },
    { cmd: "docker logs app", out: ["Server listening on http://0.0.0.0:3000", "GET / 200 4ms"], plain: "Peek at what the app has been saying (its logs)." },
  ];

  /* =========================================================
     KUBERNETES
     ========================================================= */

  // The big restaurant analogy that ties the whole cluster together
  const restaurant = {
    intro: "Kubernetes can feel overwhelming. So picture a busy restaurant chain. Every Kubernetes piece maps neatly onto a restaurant role — once you see it, you'll never forget it.",
    rows: [
      { ico: "🏢", k8s: "Cluster", role: "The whole restaurant", text: "All the staff, kitchens and dining area working together." },
      { ico: "🧠", k8s: "Control Plane (Master)", role: "The management office", text: "Makes all the decisions and keeps everything organised." },
      { ico: "🗣️", k8s: "API Server", role: "The front desk", text: "Every request and order goes through here first." },
      { ico: "🧭", k8s: "Scheduler", role: "The head chef assigning stations", text: "Decides which cook (node) prepares each new dish (pod)." },
      { ico: "🛡️", k8s: "Controller Manager", role: "The floor supervisor", text: "Notices a dropped plate and instantly orders a replacement." },
      { ico: "📒", k8s: "etcd", role: "The order ledger / recipe book", text: "The single source of truth: every order and recipe written down." },
      { ico: "👨‍🍳", k8s: "Worker Node", role: "A kitchen station + its cook", text: "Where dishes are actually prepared." },
      { ico: "🍽️", k8s: "Pod", role: "A plate", text: "Holds the dish (container). The smallest thing you serve." },
      { ico: "🍝", k8s: "Container", role: "The dish itself", text: "The actual food — your running application." },
      { ico: "🤵", k8s: "Service", role: "The waiter", text: "Always finds the right plate for a customer, even if cooks change." },
    ],
  };

  const masterComponents = [
    { id: "api", ico: "🛰️", name: "API Server", role: "Front door of the cluster",
      analogy: "🗣️ The restaurant's front desk — every order passes through it.",
      detail: "The kube-apiserver is the central hub. Every command (kubectl) and component talks to it. It validates requests and stores state in etcd.",
      points: ["The single entry point for all commands", "Validates and authenticates every request", "The only component that talks to etcd"] },
    { id: "sched", ico: "🧭", name: "Scheduler", role: "Places Pods on Nodes",
      analogy: "🧑‍🍳 The head chef deciding which cook makes the next dish.",
      detail: "The Scheduler watches for new Pods with no assigned node and picks the best worker node based on resources & constraints.",
      points: ["Finds Pods that need a home", "Picks the best node by CPU/RAM & rules", "Doesn't run Pods — only decides where"] },
    { id: "ctrl", ico: "🎛️", name: "Controller Manager", role: "Keeps desired state",
      analogy: "🛡️ The supervisor who instantly replaces a dropped plate.",
      detail: "Runs controllers that constantly compare desired state vs actual state and fix drift — e.g. recreating a crashed Pod.",
      points: ["Watches 'what you want' vs 'what is'", "Fixes any difference automatically", "Recreates crashed Pods, etc."] },
    { id: "etcd", ico: "🗄️", name: "etcd", role: "Cluster database",
      analogy: "📒 The order ledger — the one true record of everything.",
      detail: "A consistent key-value store that holds the entire cluster state — the single source of truth.",
      points: ["Stores the whole cluster's state", "Key-value database", "The single source of truth"] },
  ];
  const workerComponents = [
    { id: "kubelet", ico: "📟", name: "Kubelet", role: "Node agent",
      analogy: "👨‍🍳 The cook who follows the order ticket exactly.",
      detail: "The agent on each worker node. It makes sure the containers described in a Pod are running and healthy.",
      points: ["Runs on every worker node", "Starts the Pod's containers", "Reports health back to the control plane"] },
    { id: "proxy", ico: "🔀", name: "Kube-proxy", role: "Networking rules",
      analogy: "🚦 The traffic cop directing customers to the right table.",
      detail: "Maintains network rules so Services can route traffic to the right Pods.",
      points: ["Handles cluster networking", "Routes Service traffic to Pods", "Load-balances across Pod copies"] },
    { id: "pod", ico: "📦", name: "Pod", role: "Smallest unit",
      analogy: "🍽️ The plate that carries the dish.",
      detail: "A Pod wraps one or more containers that share network & storage. It's the smallest deployable unit in Kubernetes.",
      points: ["Smallest thing you can deploy", "Wraps one or more containers", "Containers inside share IP & storage"] },
    { id: "runtime", ico: "🐳", name: "Container Runtime", role: "Runs containers",
      analogy: "🔥 The stove that actually cooks the food.",
      detail: "Software like containerd/Docker that actually pulls images and runs the containers inside Pods.",
      points: ["Pulls images from the registry", "Actually runs the containers", "e.g. containerd or Docker"] },
  ];

  // Deep K8s concept cards
  const k8sConcepts = [
    {
      id: "node", ico: "🖥️", tag: "Node", title: "Node",
      simple: "A node is one machine (a computer) in the cluster that runs your apps.",
      analogy: { emoji: "👨‍🍳", title: "A kitchen station", text: "Each node is a workstation with a cook. The more stations you add, the more dishes you can prepare at once." },
      technical: "A node is a physical or virtual machine that runs a kubelet, a container runtime and kube-proxy. Worker nodes run your Pods; the control plane nodes run the management components.",
      points: ["Can be physical or virtual", "Runs the kubelet + container runtime", "Add more nodes to handle more load"],
    },
    {
      id: "pod", ico: "📦", tag: "Pod", title: "Pod",
      simple: "A Pod is the smallest unit — a wrapper around one (or a few) containers.",
      analogy: { emoji: "🍽️", title: "A plate of food", text: "You don't serve loose spaghetti — you put it on a plate. A Pod is that plate: it carries your container(s) and gives them a shared address." },
      technical: "A Pod groups one or more containers that share the same network namespace (one IP) and storage volumes. Pods are ephemeral — they can be created and destroyed at any time.",
      points: ["Smallest deployable unit", "Containers inside share IP & storage", "Treated as disposable / replaceable"],
    },
    {
      id: "rs", ico: "🔁", tag: "ReplicaSet", title: "ReplicaSet",
      simple: "A ReplicaSet keeps a fixed number of identical Pods alive at all times.",
      analogy: { emoji: "🧑‍🤝‍🧑", title: "Always 3 cashiers on duty", text: "A manager insists there must always be exactly 3 cashiers. If one leaves, another is called in immediately. A ReplicaSet does this for Pods." },
      technical: "A ReplicaSet ensures a specified number of replica Pods are running. If a Pod dies, it creates a new one; if there are too many, it removes some.",
      points: ["Guarantees N copies are always running", "Replaces dead Pods automatically", "Usually managed by a Deployment"],
    },
    {
      id: "deploy", ico: "🚀", tag: "Deployment", title: "Deployment",
      simple: "A Deployment manages ReplicaSets for you and handles updates, rollbacks and scaling.",
      analogy: { emoji: "📋", title: "A standing order to the manager", text: "'Always keep 3 fresh pizzas ready, and when the recipe changes, swap them one at a time.' That standing order is a Deployment." },
      technical: "A Deployment declaratively manages ReplicaSets and Pods, enabling rolling updates, version history and easy rollbacks. You change the desired state and Kubernetes makes it happen.",
      points: ["The object you'll use most often", "Rolling updates with zero downtime", "One-command rollback to a previous version"],
    },
    {
      id: "svc", ico: "🌐", tag: "Service", title: "Service",
      simple: "A Service gives your Pods one stable address and spreads traffic across them.",
      analogy: { emoji: "🤵", title: "A reliable waiter", text: "Customers never go into the kitchen to find a cook. They ask the waiter, who always knows which plate to bring — even if the cooks change. A Service is that waiter." },
      technical: "Pod IPs change as Pods come and go. A Service provides a stable virtual IP / DNS name and load-balances requests to all healthy matching Pods (selected by labels).",
      points: ["Stable IP & DNS name that never changes", "Load-balances across healthy Pods", "Types: ClusterIP, NodePort, LoadBalancer"],
    },
  ];

  // Full K8s flow: Deployment -> ReplicaSet -> Pod -> Container -> Service -> Internet
  const k8sFlow = [
    { id: "deploy", ico: "🚀", title: "Deployment", sub: "desired state",
      detail: "You declare 'I want N replicas of this app'. The Deployment owns the rollout strategy.",
      analogy: "The standing order: 'always keep 3 ready'." },
    { id: "rs", ico: "🔁", title: "ReplicaSet", sub: "keeps N pods",
      detail: "Created by the Deployment to guarantee the requested number of Pods are always running.",
      analogy: "The manager ensuring exactly 3 are on duty." },
    { id: "pod", ico: "📦", title: "Pod", sub: "smallest unit",
      detail: "Each Pod is scheduled onto a node and wraps your container(s).",
      analogy: "The plate carrying the dish." },
    { id: "cont", ico: "🐳", title: "Container", sub: "your app",
      detail: "The actual running application inside the Pod.",
      analogy: "The dish — the real food." },
    { id: "svc", ico: "🌐", title: "Service", sub: "stable IP",
      detail: "Exposes the Pods behind one stable address and load-balances across them.",
      analogy: "The waiter delivering to any customer." },
    { id: "net", ico: "🌍", title: "Internet", sub: "users",
      detail: "Through a NodePort/LoadBalancer, real users reach your application.",
      analogy: "The hungry customers walking in." },
  ];

  /* =========================================================
     END-TO-END JOURNEY (plain-language story, step by step)
     ========================================================= */
  const journey = [
    { ico: "👩‍💻", title: "1. Write the app", text: "A developer builds an app and writes a Dockerfile — the recipe for packaging it.", tag: "Docker" },
    { ico: "🔨", title: "2. Build an image", text: "`docker build` turns the recipe into an image: a sealed, portable blueprint of the app.", tag: "Docker" },
    { ico: "☁️", title: "3. Push to a registry", text: "The image is uploaded to a registry (like Docker Hub) so any machine can download the exact same copy.", tag: "Docker" },
    { ico: "📥", title: "4. Kubernetes pulls it", text: "Kubernetes downloads that image when it needs to run your app.", tag: "Kubernetes" },
    { ico: "🚀", title: "5. Deployment declares intent", text: "A Deployment says 'run 3 copies of this image'. A ReplicaSet makes sure 3 Pods exist.", tag: "Kubernetes" },
    { ico: "📦", title: "6. Pods run on nodes", text: "The Scheduler places each Pod on a worker node, and the kubelet starts the containers.", tag: "Kubernetes" },
    { ico: "🌐", title: "7. A Service exposes them", text: "A Service gives the Pods one stable address and load-balances traffic between them.", tag: "Kubernetes" },
    { ico: "🌍", title: "8. Users reach the app", text: "Through the Service, real users on the internet hit your app — which self-heals and scales automatically.", tag: "Live" },
  ];

  /* =========================================================
     GLOSSARY — tech term -> everyday meaning
     ========================================================= */
  const glossary = [
    { term: "Docker", plain: "A way to box up an app so it runs anywhere", like: "🍱 A ready-to-eat lunchbox" },
    { term: "Image", plain: "A read-only blueprint of an app", like: "📜 A cooking recipe" },
    { term: "Container", plain: "A running copy of an image", like: "🍝 The cooked dish" },
    { term: "Dockerfile", plain: "Step-by-step build instructions", like: "📝 The recipe card" },
    { term: "Registry", plain: "Online storage for images", like: "📚 An app store / library" },
    { term: "Cluster", plain: "A group of machines working as one", like: "🏢 A whole restaurant" },
    { term: "Node", plain: "One machine in the cluster", like: "👨‍🍳 A kitchen station" },
    { term: "Pod", plain: "The smallest unit, wraps containers", like: "🍽️ A plate" },
    { term: "Deployment", plain: "Keeps your app running & updated", like: "📋 A standing order" },
    { term: "Service", plain: "A stable address for your Pods", like: "🤵 A waiter" },
  ];

  /* =========================================================
     YAML SAMPLES (with per-key explanations + plain words)
     ========================================================= */
  const yamlSamples = {
    pod: {
      label: "Pod",
      flow: ["User", "Pod", "Container"],
      lines: [
        { t: "apiVersion: v1", k: "apiVersion" },
        { t: "kind: Pod", k: "kind" },
        { t: "metadata:", k: "metadata" },
        { t: "  name: my-pod", k: "name" },
        { t: "spec:", k: "spec" },
        { t: "  containers:", k: "containers" },
        { t: "    - name: nginx", k: "cname" },
        { t: "      image: nginx", k: "image" },
      ],
      explain: {
        apiVersion: { key: "apiVersion", body: "The version of the Kubernetes API used to create this object. 'v1' is the core stable API used for Pods and Services.", plain: "Which 'language version' Kubernetes should read this in." },
        kind: { key: "kind", body: "The type of object you are creating — Pod, Service, Deployment, etc. Here it's a single Pod.", plain: "What you're making — here, a Pod." },
        metadata: { key: "metadata", body: "Data that identifies the object: its name, namespace, labels and annotations.", plain: "The name tag / label info." },
        name: { key: "metadata.name", body: "The unique name of this Pod within its namespace. You'll reference it as 'my-pod'.", plain: "What to call this Pod." },
        spec: { key: "spec", body: "The desired state / configuration of the object — what you actually want Kubernetes to run.", plain: "The 'what I actually want' section." },
        containers: { key: "spec.containers", body: "The list of containers that run inside this Pod. A Pod can hold one or many.", plain: "The apps that go inside the plate." },
        cname: { key: "containers[].name", body: "A name for the container inside the Pod, used in logs and commands.", plain: "A nickname for the app inside." },
        image: { key: "containers[].image", body: "The Docker image to run for this container. Pulled from a registry like Docker Hub.", plain: "Which recipe (image) to cook." },
      },
    },
    deployment: {
      label: "Deployment",
      flow: ["Deployment", "ReplicaSet", "Pods"],
      lines: [
        { t: "apiVersion: apps/v1", k: "apiVersion" },
        { t: "kind: Deployment", k: "kind" },
        { t: "metadata:", k: "metadata" },
        { t: "  name: nginx-deployment", k: "name" },
        { t: "spec:", k: "spec" },
        { t: "  replicas: 2", k: "replicas" },
        { t: "  selector:", k: "selector" },
        { t: "    matchLabels:", k: "matchLabels" },
        { t: "      app: nginx", k: "labelpair" },
        { t: "  template:", k: "template" },
        { t: "    metadata:", k: "tmeta" },
        { t: "      labels:", k: "tlabels" },
        { t: "        app: nginx", k: "labelpair" },
        { t: "    spec:", k: "tspec" },
        { t: "      containers:", k: "containers" },
        { t: "        - name: nginx", k: "cname" },
        { t: "          image: nginx", k: "image" },
      ],
      explain: {
        apiVersion: { key: "apiVersion", body: "Deployments live in the 'apps/v1' API group — a higher-level API than core v1.", plain: "Deployments use the apps/v1 dialect." },
        kind: { key: "kind", body: "Declares this object as a Deployment, which manages ReplicaSets and Pods for you.", plain: "We're making a Deployment." },
        metadata: { key: "metadata", body: "Identity of the Deployment — its name and labels.", plain: "The name tag." },
        name: { key: "metadata.name", body: "The Deployment's name: 'nginx-deployment'.", plain: "Call it nginx-deployment." },
        spec: { key: "spec", body: "The desired state of the Deployment.", plain: "What we want to happen." },
        replicas: { key: "spec.replicas", body: "How many identical Pod copies to keep running. Change this number to scale up or down.", plain: "How many copies to keep alive (here, 2)." },
        selector: { key: "spec.selector", body: "Tells the Deployment which Pods it owns by matching labels.", plain: "How it recognises its own Pods." },
        matchLabels: { key: "selector.matchLabels", body: "The label query — Pods with these labels are managed by this Deployment.", plain: "Match Pods carrying this label." },
        labelpair: { key: "app: nginx", body: "A label key/value. Selector and template labels must match so the Deployment can find its Pods.", plain: "The sticker: app=nginx (must match below)." },
        template: { key: "spec.template", body: "The Pod blueprint. Every replica is created from this template.", plain: "The mould every copy is stamped from." },
        tmeta: { key: "template.metadata", body: "Metadata applied to each created Pod — especially its labels.", plain: "Name tags for each created Pod." },
        tlabels: { key: "template.metadata.labels", body: "Labels stamped on each Pod so the selector above can match them.", plain: "Stickers put on each Pod." },
        tspec: { key: "template.spec", body: "The Pod's own spec — the containers each replica runs.", plain: "What each copy actually runs." },
        containers: { key: "containers", body: "The container list baked into every replica Pod.", plain: "The apps inside each copy." },
        cname: { key: "containers[].name", body: "Name of the container in each Pod.", plain: "Nickname for the app." },
        image: { key: "containers[].image", body: "Image each replica runs: the official nginx image.", plain: "Recipe each copy cooks: nginx." },
      },
    },
    service: {
      label: "Service",
      flow: ["User", "Service", "Pod", "Container"],
      lines: [
        { t: "apiVersion: v1", k: "apiVersion" },
        { t: "kind: Service", k: "kind" },
        { t: "metadata:", k: "metadata" },
        { t: "  name: nginx-service", k: "name" },
        { t: "spec:", k: "spec" },
        { t: "  type: NodePort", k: "type" },
        { t: "  selector:", k: "selector" },
        { t: "    app: nginx", k: "labelpair" },
        { t: "  ports:", k: "ports" },
        { t: "    - port: 80", k: "port" },
        { t: "      targetPort: 80", k: "targetPort" },
        { t: "      nodePort: 30080", k: "nodePort" },
      ],
      explain: {
        apiVersion: { key: "apiVersion", body: "Services use the core 'v1' API.", plain: "Services use the v1 dialect." },
        kind: { key: "kind", body: "Declares a Service — a stable networking endpoint in front of Pods.", plain: "We're making a Service (a waiter)." },
        metadata: { key: "metadata", body: "Identity of the Service.", plain: "The name tag." },
        name: { key: "metadata.name", body: "The Service name 'nginx-service'. Other Pods can reach it by this DNS name.", plain: "Call the waiter nginx-service." },
        spec: { key: "spec", body: "Networking configuration of the Service.", plain: "The networking setup." },
        type: { key: "spec.type", body: "How the Service is exposed. NodePort opens a port on every node so traffic from outside can reach the Pods. Others: ClusterIP, LoadBalancer.", plain: "How outsiders reach it. NodePort = open a door on every machine." },
        selector: { key: "spec.selector", body: "Chooses which Pods receive traffic — those whose labels match.", plain: "Which Pods this waiter serves." },
        labelpair: { key: "app: nginx", body: "The label the Service looks for. Traffic is sent to Pods labelled app=nginx.", plain: "Serve Pods with the app=nginx sticker." },
        ports: { key: "spec.ports", body: "The list of port mappings the Service exposes.", plain: "The doors and where they lead." },
        port: { key: "ports[].port", body: "The port the Service itself listens on inside the cluster (80).", plain: "The Service's own door number (80)." },
        targetPort: { key: "ports[].targetPort", body: "The port on the Pod/container that traffic is forwarded to (80).", plain: "The Pod's door traffic is sent to (80)." },
        nodePort: { key: "ports[].nodePort", body: "The external port opened on each node (30080). Users hit NodeIP:30080 to reach the app.", plain: "The public door (30080) users knock on." },
      },
    },
  };

  /* ---------- INTERVIEW Q&A ---------- */
  const interview = [
    { cat: "Docker", q: "What is the difference between an image and a container?", a: "An image is a read-only template/blueprint that defines what's inside (code, dependencies, config). A container is a running, writable instance created from an image. One image can spawn many containers. (Recipe vs cooked dish.)" },
    { cat: "Docker", q: "How is a container different from a virtual machine?", a: "A VM virtualizes the entire hardware and runs a full guest OS, making it heavy. A container shares the host OS kernel and only isolates the process — so it's far lighter, starts in seconds, and uses less memory. (Separate houses vs apartments in one building.)" },
    { cat: "Docker", q: "What does the Dockerfile CMD vs RUN do?", a: "RUN executes during the image build (e.g. installing packages) and the result is baked into a layer. CMD specifies the default command to run when a container starts from the image." },
    { cat: "Docker", q: "What is Docker Hub / a registry?", a: "A registry is a storage and distribution system for images. Docker Hub is the default public registry where you push and pull images like nginx, node, or your own app images. (Like an app store for images.)" },
    { cat: "Docker", q: "What does -p 8080:80 mean?", a: "It maps port 8080 on the host to port 80 inside the container. Traffic hitting the host's 8080 is forwarded to the container's 80, so you can reach the app from outside." },
    { cat: "Kubernetes", q: "What is a Pod?", a: "A Pod is the smallest deployable unit in Kubernetes. It wraps one or more containers that share the same network namespace (IP) and storage volumes. (Think of it as the plate that carries the dish.)" },
    { cat: "Kubernetes", q: "What is the difference between a Deployment and a ReplicaSet?", a: "A ReplicaSet ensures a fixed number of identical Pods are running. A Deployment manages ReplicaSets and adds rolling updates, rollbacks, and versioning — so you almost always use a Deployment." },
    { cat: "Kubernetes", q: "Why do we need a Service if Pods already have IPs?", a: "Pod IPs are ephemeral — they change when Pods restart or reschedule. A Service gives a stable IP/DNS name and load-balances across the current healthy Pods. (The waiter who always finds the right plate.)" },
    { cat: "Kubernetes", q: "What are the main control plane components?", a: "API Server (front door), Scheduler (assigns Pods to nodes), Controller Manager (reconciles desired vs actual state), and etcd (key-value store holding cluster state)." },
    { cat: "Kubernetes", q: "What's the difference between ClusterIP, NodePort and LoadBalancer?", a: "ClusterIP exposes the Service only inside the cluster. NodePort opens a port on every node for external access. LoadBalancer provisions an external cloud load balancer pointing at the Service." },
    { cat: "Kubernetes", q: "How does Kubernetes self-heal?", a: "Controllers continuously compare desired state (your YAML) with actual state. If a Pod crashes or a node dies, the controller recreates Pods elsewhere to restore the requested count." },
    { cat: "General", q: "What problem does containerization solve?", a: "It eliminates 'works on my machine' issues by packaging the app with its exact environment, enabling consistent, portable, and fast deployments across dev, test and production." },
  ];

  const realWorld = [
    { ico: "🛒", title: "E-commerce scaling", body: "During a flash sale, a Deployment auto-scales nginx + Node replicas from 2 to 20 Pods. A Service load-balances shoppers across all of them with zero downtime." },
    { ico: "🔄", title: "Zero-downtime deploys", body: "A new image version rolls out Pod-by-Pod. If health checks fail, Kubernetes automatically rolls back to the previous ReplicaSet." },
    { ico: "🧩", title: "Microservices", body: "Each service (auth, payments, catalog) ships as its own image and Deployment, talking to each other through internal Services." },
    { ico: "🔬", title: "CI/CD pipelines", body: "Code is built into a Docker image, pushed to a registry, then deployed to Kubernetes — the same artifact moves from dev to prod." },
  ];

  return {
    // docker
    dockerConcepts, dockerArch, dockerBlocks, dockerVsVm, dockerImages, dockerfile, dockerCommands,
    // kubernetes
    restaurant, masterComponents, workerComponents, k8sConcepts, k8sFlow,
    // shared
    journey, glossary, yamlSamples, interview, realWorld,
  };
})();
