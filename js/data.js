/* =========================================================
   Code Origin.AI — Content data
   All learning content lives here so views stay declarative.
   ========================================================= */
window.DATA = (function () {

  /* ---------- DOCKER ---------- */
  const dockerCards = [
    {
      ico: "📦",
      tag: "Concept",
      title: "What is Docker?",
      body: "Docker is a platform that packages an application together with everything it needs — code, runtime, libraries and settings — into a single, portable unit called a container. It runs the same way on every machine.",
    },
    {
      ico: "🧱",
      tag: "Analogy",
      title: "Think of a shipping box",
      body: "Just like a shipping container holds goods so any ship or truck can carry them, a Docker container holds your app so any server can run it — no 'it works on my machine' problems.",
    },
    {
      ico: "🖼️",
      tag: "Image",
      title: "Images = Blueprints",
      body: "An image is a read-only template (a blueprint) used to create containers. Examples: nginx, node, python. You build images once and run them anywhere.",
    },
    {
      ico: "🟢",
      tag: "Container",
      title: "Containers = Live Apps",
      body: "A container is a running instance of an image — a live, isolated process. You can start, stop and delete containers without affecting the image they came from.",
    },
  ];

  // Docker architecture flow nodes (Developer -> CLI -> Daemon -> Images -> Containers)
  const dockerArch = [
    { id: "dev", ico: "👩‍💻", title: "Developer", sub: "writes code", detail: "The developer writes application code and a Dockerfile describing how to package it." },
    { id: "cli", ico: "⌨️", title: "Docker CLI", sub: "the client", detail: "The Docker CLI (client) sends your commands like 'docker build' and 'docker run' to the Docker Daemon over a REST API." },
    { id: "daemon", ico: "⚙️", title: "Docker Daemon", sub: "docker host", detail: "The Daemon (dockerd) runs on the Docker Host. It builds images, runs containers, and manages networks & volumes." },
    { id: "image", ico: "🖼️", title: "Docker Images", sub: "blueprints", detail: "Images are immutable blueprints created by the daemon. They are layered and cached for fast rebuilds." },
    { id: "container", ico: "🟢", title: "Containers", sub: "running apps", detail: "Containers are the live, isolated instances launched from images. This is where your app actually runs." },
  ];

  // The three big Docker building blocks
  const dockerBlocks = [
    { ico: "💻", name: "Client", role: "The Docker CLI you type commands into.", color: "a" },
    { ico: "🖥️", name: "Docker Host", role: "Runs the daemon, images & containers.", color: "b" },
    { ico: "☁️", name: "Registry", role: "Docker Hub — stores & shares images.", color: "c" },
  ];

  const dockerImages = [
    { ico: "🌐", name: "nginx", role: "Web server / reverse proxy image" },
    { ico: "🟩", name: "node", role: "Node.js runtime image for JS apps" },
    { ico: "🐍", name: "python", role: "Python runtime image" },
    { ico: "🐘", name: "postgres", role: "PostgreSQL database image" },
  ];

  // Dockerfile with per-line tooltips
  const dockerfile = [
    { code: "FROM node:18", key: "FROM", tip: "Sets the base image. Here we start from the official Node.js 18 image so Node is preinstalled." },
    { code: "WORKDIR /app", key: "WORKDIR", tip: "Sets the working directory inside the container. Following commands run from /app." },
    { code: "COPY . .", key: "COPY", tip: "Copies files from your project (host) into the image's current directory (/app)." },
    { code: "RUN npm install", key: "RUN", tip: "Executes a command at build time. Installs your Node dependencies into the image." },
    { code: 'CMD ["node", "server.js"]', key: "CMD", tip: "The default command run when a container starts. Launches your server." },
  ];

  const dockerCommands = [
    { cmd: "docker build -t app .", out: ["[+] Building 12.4s (8/8) FINISHED", " => exporting to image", " => => naming to docker.io/library/app:latest"] },
    { cmd: "docker run -p 3000:3000 app", out: ["Server listening on http://0.0.0.0:3000", "Container is now live 🚀"] },
    { cmd: "docker ps", out: ["CONTAINER ID   IMAGE   STATUS         PORTS", "a1b2c3d4e5f6   app     Up 5 seconds   0.0.0.0:3000->3000/tcp"] },
    { cmd: "docker images", out: ["REPOSITORY   TAG       SIZE", "app          latest    142MB", "node         18        998MB"] },
    { cmd: "docker stop app", out: ["app"] },
    { cmd: "docker logs app", out: ["Server listening on http://0.0.0.0:3000", "GET / 200 4ms"] },
  ];

  /* ---------- KUBERNETES ---------- */
  const masterComponents = [
    { id: "api", ico: "🛰️", name: "API Server", role: "Front door of the cluster", detail: "The kube-apiserver is the central hub. Every command (kubectl) and component talks to it. It validates requests and stores state in etcd." },
    { id: "sched", ico: "🧭", name: "Scheduler", role: "Places Pods on Nodes", detail: "The Scheduler watches for new Pods with no assigned node and picks the best worker node based on resources & constraints." },
    { id: "ctrl", ico: "🎛️", name: "Controller Manager", role: "Keeps desired state", detail: "Runs controllers that constantly compare desired state vs actual state and fix drift — e.g. recreating a crashed Pod." },
    { id: "etcd", ico: "🗄️", name: "etcd", role: "Cluster database", detail: "A consistent key-value store that holds the entire cluster state — the single source of truth." },
  ];
  const workerComponents = [
    { id: "kubelet", ico: "📟", name: "Kubelet", role: "Node agent", detail: "The agent on each worker node. It makes sure the containers described in a Pod are running and healthy." },
    { id: "proxy", ico: "🔀", name: "Kube-proxy", role: "Networking rules", detail: "Maintains network rules so Services can route traffic to the right Pods." },
    { id: "pod", ico: "📦", name: "Pod", role: "Smallest unit", detail: "A Pod wraps one or more containers that share network & storage. It's the smallest deployable unit in Kubernetes." },
    { id: "runtime", ico: "🐳", name: "Container Runtime", role: "Runs containers", detail: "Software like containerd/Docker that actually pulls images and runs the containers inside Pods." },
  ];

  const k8sConcepts = [
    { ico: "🖥️", tag: "Node", title: "Node", body: "A node is a machine (virtual or physical) that runs your workloads. The cluster is made of a control plane plus one or more worker nodes." },
    { ico: "📦", tag: "Pod", title: "Pod", body: "The smallest unit in Kubernetes. A Pod holds one or more tightly-coupled containers that share an IP and storage." },
    { ico: "🔁", tag: "ReplicaSet", title: "ReplicaSet", body: "Ensures a specified number of identical Pod copies are running at all times. If one dies, a new one is created." },
    { ico: "🚀", tag: "Deployment", title: "Deployment", body: "Manages ReplicaSets and gives you rolling updates, rollbacks and easy scaling of your application." },
    { ico: "🌐", tag: "Service", title: "Service", body: "A stable network endpoint that load-balances traffic to a set of Pods, even as Pods come and go." },
  ];

  // Full K8s flow: Deployment -> ReplicaSet -> Pod -> Container -> Service -> Internet
  const k8sFlow = [
    { id: "deploy", ico: "🚀", title: "Deployment", sub: "desired state", detail: "You declare 'I want N replicas of this app'. The Deployment owns the rollout strategy." },
    { id: "rs", ico: "🔁", title: "ReplicaSet", sub: "keeps N pods", detail: "Created by the Deployment to guarantee the requested number of Pods are always running." },
    { id: "pod", ico: "📦", title: "Pod", sub: "smallest unit", detail: "Each Pod is scheduled onto a node and wraps your container(s)." },
    { id: "cont", ico: "🐳", title: "Container", sub: "your app", detail: "The actual running application inside the Pod." },
    { id: "svc", ico: "🌐", title: "Service", sub: "stable IP", detail: "Exposes the Pods behind one stable address and load-balances across them." },
    { id: "net", ico: "🌍", title: "Internet", sub: "users", detail: "Through a NodePort/LoadBalancer, real users reach your application." },
  ];

  /* ---------- YAML SAMPLES (with per-key explanations) ---------- */
  // Each token: {t:text, key?:explanation-id, indent}
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
        apiVersion: { key: "apiVersion", body: "The version of the Kubernetes API used to create this object. 'v1' is the core stable API used for Pods and Services." },
        kind: { key: "kind", body: "The type of object you are creating — Pod, Service, Deployment, etc. Here it's a single Pod." },
        metadata: { key: "metadata", body: "Data that identifies the object: its name, namespace, labels and annotations." },
        name: { key: "metadata.name", body: "The unique name of this Pod within its namespace. You'll reference it as 'my-pod'." },
        spec: { key: "spec", body: "The desired state / configuration of the object — what you actually want Kubernetes to run." },
        containers: { key: "spec.containers", body: "The list of containers that run inside this Pod. A Pod can hold one or many." },
        cname: { key: "containers[].name", body: "A name for the container inside the Pod, used in logs and commands." },
        image: { key: "containers[].image", body: "The Docker image to run for this container. Pulled from a registry like Docker Hub." },
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
        apiVersion: { key: "apiVersion", body: "Deployments live in the 'apps/v1' API group — a higher-level API than core v1." },
        kind: { key: "kind", body: "Declares this object as a Deployment, which manages ReplicaSets and Pods for you." },
        metadata: { key: "metadata", body: "Identity of the Deployment — its name and labels." },
        name: { key: "metadata.name", body: "The Deployment's name: 'nginx-deployment'." },
        spec: { key: "spec", body: "The desired state of the Deployment." },
        replicas: { key: "spec.replicas", body: "How many identical Pod copies to keep running. Change this number to scale up or down." },
        selector: { key: "spec.selector", body: "Tells the Deployment which Pods it owns by matching labels." },
        matchLabels: { key: "selector.matchLabels", body: "The label query — Pods with these labels are managed by this Deployment." },
        labelpair: { key: "app: nginx", body: "A label key/value. Selector and template labels must match so the Deployment can find its Pods." },
        template: { key: "spec.template", body: "The Pod blueprint. Every replica is created from this template." },
        tmeta: { key: "template.metadata", body: "Metadata applied to each created Pod — especially its labels." },
        tlabels: { key: "template.metadata.labels", body: "Labels stamped on each Pod so the selector above can match them." },
        tspec: { key: "template.spec", body: "The Pod's own spec — the containers each replica runs." },
        containers: { key: "containers", body: "The container list baked into every replica Pod." },
        cname: { key: "containers[].name", body: "Name of the container in each Pod." },
        image: { key: "containers[].image", body: "Image each replica runs: the official nginx image." },
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
        apiVersion: { key: "apiVersion", body: "Services use the core 'v1' API." },
        kind: { key: "kind", body: "Declares a Service — a stable networking endpoint in front of Pods." },
        metadata: { key: "metadata", body: "Identity of the Service." },
        name: { key: "metadata.name", body: "The Service name 'nginx-service'. Other Pods can reach it by this DNS name." },
        spec: { key: "spec", body: "Networking configuration of the Service." },
        type: { key: "spec.type", body: "How the Service is exposed. NodePort opens a port on every node so traffic from outside can reach the Pods. Others: ClusterIP, LoadBalancer." },
        selector: { key: "spec.selector", body: "Chooses which Pods receive traffic — those whose labels match." },
        labelpair: { key: "app: nginx", body: "The label the Service looks for. Traffic is sent to Pods labelled app=nginx." },
        ports: { key: "spec.ports", body: "The list of port mappings the Service exposes." },
        port: { key: "ports[].port", body: "The port the Service itself listens on inside the cluster (80)." },
        targetPort: { key: "ports[].targetPort", body: "The port on the Pod/container that traffic is forwarded to (80)." },
        nodePort: { key: "ports[].nodePort", body: "The external port opened on each node (30080). Users hit NodeIP:30080 to reach the app." },
      },
    },
  };

  /* ---------- INTERVIEW Q&A ---------- */
  const interview = [
    { cat: "Docker", q: "What is the difference between an image and a container?", a: "An image is a read-only template/blueprint that defines what's inside (code, dependencies, config). A container is a running, writable instance created from an image. One image can spawn many containers." },
    { cat: "Docker", q: "How is a container different from a virtual machine?", a: "A VM virtualizes the entire hardware and runs a full guest OS, making it heavy. A container shares the host OS kernel and only isolates the process — so it's far lighter, starts in seconds, and uses less memory." },
    { cat: "Docker", q: "What does the Dockerfile CMD vs RUN do?", a: "RUN executes during the image build (e.g. installing packages) and the result is baked into a layer. CMD specifies the default command to run when a container starts from the image." },
    { cat: "Docker", q: "What is Docker Hub / a registry?", a: "A registry is a storage and distribution system for images. Docker Hub is the default public registry where you push and pull images like nginx, node, or your own app images." },
    { cat: "Docker", q: "What does -p 8080:80 mean?", a: "It maps port 8080 on the host to port 80 inside the container. Traffic hitting the host's 8080 is forwarded to the container's 80, so you can reach the app from outside." },
    { cat: "Kubernetes", q: "What is a Pod?", a: "A Pod is the smallest deployable unit in Kubernetes. It wraps one or more containers that share the same network namespace (IP) and storage volumes." },
    { cat: "Kubernetes", q: "What is the difference between a Deployment and a ReplicaSet?", a: "A ReplicaSet ensures a fixed number of identical Pods are running. A Deployment manages ReplicaSets and adds rolling updates, rollbacks, and versioning — so you almost always use a Deployment." },
    { cat: "Kubernetes", q: "Why do we need a Service if Pods already have IPs?", a: "Pod IPs are ephemeral — they change when Pods restart or reschedule. A Service gives a stable IP/DNS name and load-balances across the current healthy Pods." },
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
    dockerCards, dockerArch, dockerBlocks, dockerImages, dockerfile, dockerCommands,
    masterComponents, workerComponents, k8sConcepts, k8sFlow,
    yamlSamples, interview, realWorld,
  };
})();
