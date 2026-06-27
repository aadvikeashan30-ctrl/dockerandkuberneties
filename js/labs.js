/* =========================================================
   Code Origin.AI — Unified Animated Lessons Lab
   Combines Day-1 AWS lessons (from aws.js) with new animated
   lessons for Day 2 (DevOps/Docker/K8s), Day 3 (Monitoring & AI)
   and the Mock-Interview days. Builds window.DATA.lab.
   Runs AFTER aws.js, BEFORE views.js.
   ========================================================= */
(function () {
  if (!window.DATA) window.DATA = {};
  const aws = window.DATA.aws || { sessions: [], lessons: {}, order: [] };

  // ---- Day 2: DevOps · Docker · Kubernetes ----
  const day2 = {
    devops: {
      ico: "♾️", title: "DevOps Culture", graphic: "devops",
      oneLine: "Developers and Operations working as one team to build, ship and run software quickly and reliably.",
      analogy: "🍽️ Like the kitchen and the waiters cooperating so every dish comes out hot, correct and on time — no blaming each other.",
      explain: "Before DevOps, developers wrote code and 'threw it over the wall' to a separate operations team to run — leading to delays and finger-pointing. DevOps merges these worlds with shared ownership, heavy automation, and fast feedback loops. The famous 'infinity loop' shows the never-ending cycle: plan → code → build → test → release → deploy → operate → monitor → back to plan.",
      points: [
        "Culture first: collaboration + shared responsibility",
        "Automate everything repeatable (build, test, deploy)",
        "Fast feedback: catch problems early and often",
        "Goal: ship more often, with fewer failures",
      ],
      example: { label: "The DevOps lifecycle", lines: [
        "  plan → code → build → test → release → deploy → operate → monitor",
        "    ↑___________________________________________________________│",
        "",
        "# Each loop is faster and safer than the last,",
        "# powered by automation (CI/CD) and monitoring.",
      ] },
    },
    sdlc: {
      ico: "🔁", title: "SDLC (Software Development Life Cycle)", graphic: "sdlc",
      oneLine: "The organised stages software passes through, from first idea to running in production and being maintained.",
      analogy: "🏠 Like building a house: plan it, design it, build it, inspect it, move in, then keep maintaining it.",
      explain: "SDLC gives teams a repeatable roadmap so nothing important is skipped. Classic phases are: Requirements (what to build) → Design (how) → Development (write code) → Testing (verify) → Deployment (release) → Maintenance (fix & improve). DevOps speeds this cycle up and automates the hand-offs between phases.",
      points: [
        "Requirements → Design → Develop → Test → Deploy → Maintain",
        "Each phase feeds the next; testing guards quality",
        "Models: Waterfall (linear) vs Agile (iterative sprints)",
        "DevOps automates and tightens the whole loop",
      ],
      example: { label: "Agile vs Waterfall", lines: [
        "Waterfall: Requirements → Design → Build → Test → Release (one big pass)",
        "Agile:     small sprints, each producing a working slice every 1-2 weeks",
        "",
        "# Most modern teams use Agile + DevOps for speed and feedback.",
      ] },
    },
    dockerarch: {
      ico: "🐳", title: "Docker Architecture", graphic: "dockerflow", link: "docker",
      oneLine: "How Docker's pieces fit together to turn your code into a running, portable container.",
      analogy: "🍳 Like a kitchen: you place an order (CLI), the chefs cook (daemon), recipes are filed (images), and dishes are served (containers).",
      explain: "You type commands into the Docker CLI (client). It sends them to the Docker daemon, which does the heavy lifting: building images, pulling them from a registry, and running containers. Images are the read-only blueprints; containers are the live, running copies. Explore the full clickable diagram in the Docker module.",
      points: [
        "CLI (client) → Daemon (does the work)",
        "Daemon builds images & runs containers",
        "Registry (Docker Hub) stores & shares images",
        "Same image runs identically on any machine",
      ],
      example: { label: "Build then run", lines: [
        "$ docker build -t myapp .      # CLI asks daemon to build an image",
        "$ docker run -p 3000:3000 myapp # daemon starts a container",
        "  Server listening on http://0.0.0.0:3000  🚀",
      ] },
    },
    dockerimg: {
      ico: "📦", title: "Docker Images & Containers", graphic: "dockerflow", focus: "img", link: "docker",
      oneLine: "An image is a read-only blueprint; a container is a live, running copy made from it.",
      analogy: "📜 The recipe (image) vs 🍝 the cooked dish (container). One recipe → many identical dishes.",
      explain: "Images are built in layers and are immutable — they never change once created. You can run many containers from one image, and each container is an isolated, writable instance. Stop or delete containers freely; the image stays untouched, ready to spawn more.",
      points: [
        "Image = read-only, layered blueprint",
        "Container = running, writable instance",
        "One image → many containers",
        "Containers are disposable; images are reusable",
      ],
      example: { label: "One image, many containers", lines: [
        "$ docker run -d --name web1 myapp",
        "$ docker run -d --name web2 myapp",
        "$ docker ps",
        "  web1  myapp  Up 2s",
        "  web2  myapp  Up 1s    # both from the SAME image",
      ] },
    },
    dockerfile: {
      ico: "📝", title: "Dockerfiles", graphic: "dockerfile", link: "docker",
      oneLine: "A step-by-step recipe file that tells Docker exactly how to build your image.",
      analogy: "📝 Like a recipe card Docker reads from top to bottom — each line is one prep step.",
      explain: "Each instruction creates a cached layer. FROM picks a base image, WORKDIR sets the folder, COPY brings your files in, RUN executes build steps (like installing dependencies), and CMD is the command that runs when a container starts. Change one line and Docker rebuilds only from that layer down — fast.",
      points: [
        "FROM = base image to start from",
        "COPY/RUN = bring files in & run build steps",
        "CMD = what runs when the container starts",
        "Each line is a cached layer (fast rebuilds)",
      ],
      example: { label: "A real Dockerfile", lines: [
        "FROM node:18",
        "WORKDIR /app",
        "COPY . .",
        "RUN npm install",
        'CMD ["node", "server.js"]',
      ] },
    },
    k8sarch: {
      ico: "☸️", title: "Kubernetes Architecture", graphic: "k8sflow", link: "kubernetes",
      oneLine: "How Kubernetes manages containers across many machines, automatically.",
      analogy: "🏢 Like a busy restaurant: a management office (control plane) directs many kitchen stations (worker nodes).",
      explain: "A Kubernetes cluster has a control plane (the brain: API Server, Scheduler, Controller Manager, etcd) and worker nodes that actually run your apps inside Pods. You declare what you want; Kubernetes constantly works to make reality match — scheduling Pods, healing failures and scaling. Explore the full interactive diagram in the Kubernetes module.",
      points: [
        "Control plane = decisions (API, Scheduler, Controllers, etcd)",
        "Worker nodes = run your Pods",
        "You declare desired state; K8s makes it real",
        "Self-heals and scales automatically",
      ],
      example: { label: "Ask for 3 copies", lines: [
        "$ kubectl apply -f deployment.yaml",
        "$ kubectl get pods",
        "  nginx-7d8-abc  Running",
        "  nginx-7d8-def  Running",
        "  nginx-7d8-ghi  Running   # K8s keeps exactly 3 alive",
      ] },
    },
    minikube: {
      ico: "💻", title: "Minikube Setup", graphic: "minikube",
      oneLine: "A tool that runs a small, single-node Kubernetes cluster right on your own laptop.",
      analogy: "🏠 Like a practice kitchen at home before you cook in a real restaurant — safe to experiment.",
      explain: "Real Kubernetes clusters are big and cloud-hosted. Minikube lets you learn and test locally: it spins up a one-node cluster inside a VM or container on your machine. You use the same kubectl commands as production, so everything you practice transfers directly.",
      points: [
        "Single-node K8s on your laptop",
        "Perfect for learning & testing manifests",
        "Uses the same kubectl as real clusters",
        "Start/stop instantly, no cloud cost",
      ],
      example: { label: "Start a local cluster", lines: [
        "$ minikube start",
        "  😄  minikube v1.33 on your laptop",
        "  🚀  Done! kubectl is now configured to use 'minikube'",
        "$ kubectl get nodes",
        "  minikube   Ready   control-plane   30s",
      ] },
    },
    poddeploy: {
      ico: "📦", title: "Pod Deployment", graphic: "pod", link: "yaml",
      oneLine: "Placing your app (wrapped in Pods) onto the cluster so it actually runs.",
      analogy: "🍽️ Like setting plated dishes onto the serving line so customers can be served.",
      explain: "You describe what you want in a YAML manifest and apply it. Kubernetes' scheduler picks a node, the kubelet starts the container(s), and your Pod goes 'Running'. Usually you don't create bare Pods — you use a Deployment that keeps the right number running and replaces any that crash.",
      points: [
        "Pod = smallest unit, wraps your container(s)",
        "Scheduler places it; kubelet runs it",
        "Use a Deployment for self-healing & scaling",
        "kubectl apply -f makes it happen",
      ],
      example: { label: "Deploy and watch", lines: [
        "$ kubectl apply -f pod.yaml",
        "  pod/my-pod created",
        "$ kubectl get pod my-pod -w",
        "  my-pod   0/1   ContainerCreating",
        "  my-pod   1/1   Running   ✅",
      ] },
    },
    cicd: {
      ico: "🏭", title: "CI/CD Pipelines", graphic: "pipeline",
      oneLine: "Automatically build, test and release your code every time it changes.",
      analogy: "🏭 Like a conveyor belt that inspects each product and ships only the good ones — automatically.",
      explain: "CI (Continuous Integration) means every code push is automatically built and tested, catching bugs early. CD (Continuous Delivery/Deployment) automatically pushes passing builds towards production. Together they form a pipeline of stages — so releasing goes from a scary manual event to a safe, routine, push-button (or fully automatic) process.",
      points: [
        "CI: auto build + test on every commit",
        "CD: auto deliver/deploy passing builds",
        "Stages: build → test → deploy",
        "Fewer bugs, faster & safer releases",
      ],
      example: { label: "A typical pipeline", lines: [
        "commit → [ Build ] → [ Test ] → [ Deploy to staging ] → [ Deploy to prod ]",
        "             ✅           ✅              ✅                    ✅",
        "",
        "# If any stage fails, the pipeline stops — bad code never ships.",
      ] },
    },
    jenkins: {
      ico: "🤖", title: "Jenkins Integration", graphic: "jenkins",
      oneLine: "A popular automation server that runs your CI/CD pipelines.",
      analogy: "🤖 Like a tireless robot foreman running the conveyor belt 24/7 — building, testing and deploying for you.",
      explain: "Jenkins watches your code repository and, on every change, runs a defined pipeline of jobs (build, test, deploy). It has thousands of plugins to connect with Git, Docker, Kubernetes, AWS and more. Pipelines are written as code (a Jenkinsfile), so your automation is versioned alongside your app.",
      points: [
        "Automation server for CI/CD",
        "Triggers pipelines on code changes",
        "Huge plugin ecosystem (Git, Docker, K8s…)",
        "Pipeline-as-code via a Jenkinsfile",
      ],
      example: { label: "A simple Jenkinsfile", lines: [
        "pipeline {",
        "  agent any",
        "  stages {",
        "    stage('Build')  { steps { sh 'docker build -t app .' } }",
        "    stage('Test')   { steps { sh 'npm test' } }",
        "    stage('Deploy') { steps { sh 'kubectl apply -f k8s/' } }",
        "  }",
        "}",
      ] },
    },
    terraform: {
      ico: "📐", title: "Terraform (Infrastructure as Code)", graphic: "terraform",
      oneLine: "Describe your cloud infrastructure as code, then create it automatically and repeatably.",
      analogy: "📐 Like a blueprint a robot uses to build the exact same house every time — no manual clicking in consoles.",
      explain: "Instead of clicking around the AWS console to create servers and networks, you write declarative config files describing what you want. Terraform reads them and makes reality match — creating, updating or destroying resources. Because it's code, you can version it, review it, and rebuild an identical environment in minutes.",
      points: [
        "Declarative: describe the end state, not steps",
        "One command builds/updates all resources",
        "Versioned & reviewable like normal code",
        "Reproduce identical environments instantly",
      ],
      example: { label: "Terraform config + apply", lines: [
        'resource "aws_instance" "web" {',
        '  ami           = "ami-0abc123"',
        '  instance_type = "t3.micro"',
        "}",
        "",
        "$ terraform apply   ->  Plan: 1 to add. Creating... ✅",
      ] },
    },
  };

  // ---- Day 3: Monitoring & AI ----
  const day3 = {
    prometheus: {
      ico: "📊", title: "Prometheus Monitoring", graphic: "prometheus",
      oneLine: "Collects metrics over time so you can see exactly how your system is performing.",
      analogy: "⌚ Like a fitness tracker constantly measuring your app's heart rate, steps and temperature.",
      explain: "Prometheus regularly 'scrapes' numeric metrics (CPU, memory, request rate, errors) from your apps and stores them as time-series data. You query them with PromQL and set alerts (e.g. 'page me if error rate > 5%'). It's usually paired with Grafana for beautiful dashboards.",
      points: [
        "Scrapes & stores time-series metrics",
        "PromQL to query; alerts on thresholds",
        "Pairs with Grafana for dashboards",
        "The standard for Kubernetes monitoring",
      ],
      example: { label: "A PromQL query + alert", lines: [
        "# Requests per second over the last 5 minutes:",
        "rate(http_requests_total[5m])",
        "",
        "# Alert if 95th-percentile latency is too high:",
        "histogram_quantile(0.95, http_request_duration_seconds) > 0.5",
      ] },
    },
    observability: {
      ico: "🔭", title: "Cluster Observability", graphic: "observability",
      oneLine: "Being able to see and understand exactly what's happening inside your cluster.",
      analogy: "📹 Like CCTV plus health monitors across the whole restaurant — you instantly spot what went wrong and where.",
      explain: "Observability rests on three pillars: Metrics (numbers over time, e.g. CPU), Logs (text records of events), and Traces (the journey of one request across services). Together they let you detect problems, find the root cause fast, and keep the cluster healthy.",
      points: [
        "Three pillars: Metrics, Logs, Traces",
        "Metrics = what's happening (numbers)",
        "Logs = detailed event records",
        "Traces = follow one request end-to-end",
      ],
      example: { label: "The three pillars in action", lines: [
        "Metric:  cpu_usage = 92%  ⚠️  (something's hot)",
        "Log:     ERROR  payment-svc: DB timeout after 30s",
        "Trace:   user → api(120ms) → payment(30s ❌) → db",
        "         → root cause found in seconds.",
      ] },
    },
    bedrock: {
      ico: "🧠", title: "Amazon Bedrock", graphic: "bedrock",
      oneLine: "An AWS service to build apps using powerful AI models — without managing any servers.",
      analogy: "🧞 Like renting a genius assistant through a simple plug: you ask, it answers, AWS runs the brains.",
      explain: "Bedrock gives you access to top foundation models (for text, chat and images) from several providers through one simple API. There's no infrastructure to manage — you call the model, pay per use, and can customise it with your own data. It's the easy on-ramp to building AI features on AWS.",
      points: [
        "One API for many foundation models",
        "Fully managed — no servers or GPUs to run",
        "Pay per use; scales automatically",
        "Customise with your own data (privately)",
      ],
      example: { label: "Call a model via Bedrock", lines: [
        "$ aws bedrock-runtime invoke-model \\",
        "    --model-id anthropic.claude-3 \\",
        "    --body '{\"prompt\":\"Explain Docker in one line\"}' out.json",
        "  -> \"Docker packs an app + its environment into a portable box.\"",
      ] },
    },
    prompt: {
      ico: "🪄", title: "Prompt Engineering", graphic: "prompt",
      oneLine: "Writing clear, well-structured instructions to get the best possible answers from an AI.",
      analogy: "🪄 Like asking a very literal genie for exactly the right wish — vague wishes give messy results.",
      explain: "AI models do what you ask — so HOW you ask matters enormously. Good prompts give context, show examples, set the desired format, and add constraints. Techniques like 'few-shot' (showing examples) and 'chain-of-thought' (asking it to reason step by step) dramatically improve answers.",
      points: [
        "Be specific: context + task + format",
        "Few-shot: include a couple of examples",
        "Ask for step-by-step reasoning when needed",
        "Iterate — refine the prompt and re-try",
      ],
      example: { label: "Vague vs engineered prompt", lines: [
        "❌  \"write about dogs\"",
        "",
        "✅  \"Write a 3-bullet summary for 10-year-olds about why dogs",
        "    make good pets. Keep each bullet under 12 words.\"",
        "   → focused, useful, correctly formatted output.",
      ] },
    },
    foundation: {
      ico: "🎓", title: "Foundation Models", graphic: "foundation",
      oneLine: "Large AI models trained on huge amounts of data that can be reused for many different tasks.",
      analogy: "🎓 Like a versatile graduate who already knows a lot and can be quickly trained for almost any specific job.",
      explain: "A foundation model (like a large language model) is pre-trained once on enormous datasets, learning general patterns of language or images. You then adapt it to your needs — either by prompting it cleverly or by fine-tuning it on a smaller, specific dataset. One model powers chatbots, summarisers, translators and more.",
      points: [
        "Pre-trained on massive, broad data",
        "General-purpose: one model, many tasks",
        "Adapt via prompting or fine-tuning",
        "Examples: LLMs for text, models for images",
      ],
      example: { label: "One model, many jobs", lines: [
        "Foundation Model",
        "  ├─ summarise documents",
        "  ├─ answer questions (chatbot)",
        "  ├─ translate languages",
        "  └─ write & explain code",
      ] },
    },
    rag: {
      ico: "📚", title: "RAG (Retrieval-Augmented Generation)", graphic: "rag",
      oneLine: "Give the AI your own documents so it answers using YOUR data, accurately.",
      analogy: "📖 Like letting a student open the textbook during the exam — answers become correct and grounded.",
      explain: "Plain models can 'hallucinate' or lack your private knowledge. RAG fixes this: when a question comes in, the system first retrieves the most relevant chunks from your documents (stored as searchable vectors), then feeds them to the model along with the question. The model answers using those facts — so responses are accurate and up to date.",
      points: [
        "Retrieve relevant docs → feed to the model",
        "Answers grounded in YOUR data",
        "Reduces hallucinations; stays current",
        "Uses a vector database for fast search",
      ],
      example: { label: "How a RAG query flows", lines: [
        "Question → 🔎 search your docs → top 3 relevant chunks",
        "         → 🧠 model reads chunks + question",
        "         → ✅ accurate answer citing your data",
      ] },
    },
    chatbot: {
      ico: "💬", title: "AI Chatbot Project", graphic: "chatbot",
      oneLine: "Build a working chatbot that combines everything: a model, good prompts, and your own data (RAG).",
      analogy: "👨‍🍳 Like the final signature dish you cook to prove all your skills come together.",
      explain: "The capstone: wire a foundation model (via Bedrock) behind a chat interface, use prompt engineering for tone and rules, and add RAG so it answers from your knowledge base. Deploy it (containerised on Kubernetes, or serverless on Lambda) and you have a real, useful assistant.",
      points: [
        "Model + prompts + RAG = smart assistant",
        "Front-end chat UI talks to the model API",
        "Deploy via containers or serverless",
        "Ties together the whole workshop",
      ],
      example: { label: "The chatbot stack", lines: [
        "User ↔ Chat UI ↔ API ↔ [ Prompt + RAG context ] ↔ Bedrock model",
        "                              ↑",
        "                     your documents (vector DB)",
      ] },
    },
    cert: {
      ico: "🏅", title: "Project Demonstration & Certification", graphic: "cert",
      oneLine: "Present your project, show what you built, and earn your workshop completion certificate.",
      analogy: "🎓 Like graduation day — you demo your work and receive your well-earned diploma.",
      explain: "The finale: each participant demonstrates their chatbot/project, explains the AWS, Docker, Kubernetes and AI pieces they used, and answers questions. Successful completion earns a certificate recognising the hands-on skills gained across the five days.",
      points: [
        "Demonstrate your end-to-end project",
        "Explain the tech choices you made",
        "Q&A on what you learned",
        "Receive your completion certificate 🎉",
      ],
      example: { label: "Demo-day checklist", lines: [
        "✅ Project runs end-to-end",
        "✅ Can explain AWS + Docker + K8s + AI parts",
        "✅ Handles questions confidently",
        "🏅 Certificate awarded!",
      ] },
    },
  };

  // ---- Days 4 & 5: Mock Interview ----
  const mock = {
    mock: {
      ico: "🎯", title: "Mock Interview", graphic: "mock",
      oneLine: "Practice interviews that prepare you for real DevOps and cloud job interviews.",
      analogy: "🎭 Like a full dress rehearsal before opening night — you make your mistakes here, not on the real stage.",
      explain: "Two full days of simulated technical and HR interview rounds. You'll be asked about AWS, Docker, Kubernetes, CI/CD and the AI topics from the workshop, and get honest feedback on both your answers and your communication. Repetition here builds the confidence that wins real offers.",
      points: [
        "Simulated technical + HR rounds",
        "Covers AWS, Docker, K8s, CI/CD & AI",
        "Personalised feedback to improve",
        "Builds real interview confidence",
      ],
      example: { label: "Sample questions you'll practice", lines: [
        "Q: Image vs container?  → blueprint vs running copy",
        "Q: Why a Service in K8s? → stable address + load-balancing",
        "Q: What is IAM least-privilege? → grant only what's needed",
        "Q: Explain CI/CD. → auto build, test & deploy on every change",
        "💡 Tip: use the Interview Q&A module to rehearse!",
      ] },
    },
  };

  const day2sessions = [
    { label: "Session 1", time: "08:40 AM – 10:40 AM", ico: "🌅", ids: ["devops", "sdlc", "dockerarch", "dockerimg", "dockerfile"] },
    { label: "Session 2", time: "11:00 AM – 01:00 PM", ico: "🌤️", ids: ["k8sarch", "minikube", "poddeploy", "cicd"] },
    { label: "Session 3", time: "01:45 PM – 03:45 PM", ico: "🌇", ids: ["jenkins", "terraform"] },
  ];
  const day3sessions = [
    { label: "Session 1", time: "08:40 AM – 10:40 AM", ico: "🌅", ids: ["prometheus", "observability", "bedrock"] },
    { label: "Session 2", time: "11:00 AM – 01:00 PM", ico: "🌤️", ids: ["prompt", "foundation", "rag"] },
    { label: "Session 3", time: "01:45 PM – 03:45 PM", ico: "🌇", ids: ["chatbot", "cert"] },
  ];

  const groups = [
    { day: 1, title: "AWS Cloud Foundations", ico: "☁️", sessions: aws.sessions },
    { day: 2, title: "DevOps · Docker · Kubernetes", ico: "🐳", sessions: day2sessions },
    { day: 3, title: "Monitoring & AI", ico: "🤖", sessions: day3sessions },
    { day: 4, title: "Mock Interview (Days 4 & 5)", ico: "🎯", sessions: [
      { label: "Full Day", time: "08:40 AM – 03:45 PM", ico: "🎯", ids: ["mock"] },
    ] },
  ];

  const lessons = Object.assign({}, aws.lessons, day2, day3, mock);
  const order = groups.reduce((a, g) => a.concat(g.sessions.reduce((b, s) => b.concat(s.ids), [])), []);

  window.DATA.lab = { groups, lessons, order };
})();
