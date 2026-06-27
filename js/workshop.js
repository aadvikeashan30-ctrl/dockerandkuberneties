/* =========================================================
   Code Origin.AI — Workshop module data
   Reproduces the Cambridge Institute of Technology
   "5-Day Hands-on Workshop on DevOps" schedule, and adds a
   beginner-friendly explanation (simple + analogy + detail)
   for EVERY topic on the agenda.
   Attaches to window.DATA.workshop (data.js runs first).
   ========================================================= */
(function () {
  if (!window.DATA) window.DATA = {};

  const meta = {
    institute: "Cambridge Institute of Technology",
    location: "K.R Puram, Bangalore — 560036",
    dept: "Department of Master of Computer Applications (MCA)",
    title: "5-Day Hands-on Workshop on DevOps",
    crest: "🎓",
    times: {
      s1: "08:40 AM – 10:40 AM",
      tea: "10:40 – 11:00 AM",
      s2: "11:00 AM – 01:00 PM",
      lunch: "01:00 – 01:45 PM",
      s3: "01:45 PM – 03:45 PM",
    },
  };

  // Topic explanations: keyed by exact topic name.
  // { simple: plain words, analogy: real-life comparison, detail: a bit deeper }
  const topics = {
    /* ---- Day 1: AWS Cloud Foundations ---- */
    "Introduction to Cloud Computing": {
      simple: "Renting computers, storage and software over the internet instead of buying and running your own.",
      analogy: "🔌 Like using electricity from the grid instead of running your own noisy generator — you pay only for what you use.",
      detail: "Cloud providers (AWS, Azure, GCP) offer on-demand compute, storage and services billed per use, removing the need to own and maintain data centers.",
    },
    "AWS Global Infrastructure": {
      simple: "The worldwide network of AWS data centers, organized into Regions and Availability Zones.",
      analogy: "🌍 Like a global chain of warehouses — many cities (Regions), each with several separate buildings (Availability Zones) for backup.",
      detail: "Regions are geographic areas; each contains multiple isolated Availability Zones, plus Edge Locations that cache content close to users for speed.",
    },
    "AWS Account Setup": {
      simple: "Creating your AWS account and securing the master (root) login.",
      analogy: "🏦 Like opening a bank account and locking away the master key safely.",
      detail: "Covers the root user, billing alerts, enabling MFA, and the best practice of never using root for day-to-day work.",
    },
    "IAM": {
      simple: "Identity and Access Management — controls WHO can do WHAT in your AWS account.",
      analogy: "🪪 Like office keycards — each person only gets into the rooms they actually need.",
      detail: "IAM users, groups, roles and policies grant fine-grained permissions following the principle of least privilege.",
    },
    "AWS CLI": {
      simple: "A command-line tool to control AWS by typing commands instead of clicking the website.",
      analogy: "💬 Like texting precise instructions to AWS instead of pressing buttons on a screen.",
      detail: "The AWS Command Line Interface lets you script and automate any AWS service action — great for repeatable tasks.",
    },
    "VPC Architecture": {
      simple: "Your own private, isolated network inside AWS.",
      analogy: "🏗️ Like having your own fenced plot of land inside a huge city.",
      detail: "A Virtual Private Cloud lets you define IP ranges, subnets, routing and gateways for your resources.",
    },
    "Public & Private Subnets": {
      simple: "Splitting your network into parts that face the internet (public) or stay hidden (private).",
      analogy: "🏢 Like a building's open lobby (public) versus the locked back offices (private).",
      detail: "Public subnets route to an Internet Gateway; private subnets stay internal and reach out via a NAT when needed.",
    },
    "Internet Gateway (IGW)": {
      simple: "The door that connects your private AWS network to the internet.",
      analogy: "🚪 Like the main gate of a gated community.",
      detail: "An IGW lets resources in public subnets send and receive internet traffic.",
    },
    "Route Tables": {
      simple: "Rules that decide where network traffic should go.",
      analogy: "🪧 Like road signs directing cars to the right destination.",
      detail: "Each subnet is linked to a route table that maps destinations to targets such as an IGW, NAT or peering connection.",
    },
    "Security Groups": {
      simple: "A firewall wrapped around each server, controlling allowed traffic.",
      analogy: "💂 Like a bouncer at each door checking who's allowed in and out.",
      detail: "Stateful, instance-level firewalls — you allow specific ports/IPs and return traffic is automatically permitted.",
    },
    "NACLs": {
      simple: "Network ACLs — a firewall at the subnet level, an extra layer of filtering.",
      analogy: "🚧 Like the neighborhood security gate you pass before reaching your house's own door.",
      detail: "Stateless, subnet-level rules evaluated in number order, complementing Security Groups.",
    },
    "EC2 Deployment": {
      simple: "Launching virtual servers in the cloud to run your applications.",
      analogy: "🖥️ Like renting a computer in a data center by the hour.",
      detail: "Elastic Compute Cloud provides resizable virtual machines in many sizes (instance types) for any workload.",
    },
    "Linux & Windows Servers": {
      simple: "Choosing the operating system for your cloud server.",
      analogy: "📱 Like picking Android vs iPhone — different systems for different needs.",
      detail: "EC2 supports many OS images (AMIs); you connect via SSH for Linux or RDP for Windows.",
    },
    "Instance Lifecycle Management": {
      simple: "Starting, stopping, rebooting and terminating your servers.",
      analogy: "💡 Like switching appliances on and off to save electricity.",
      detail: "Managing states (pending, running, stopped, terminated) keeps costs down and availability up.",
    },
    "Custom VPC Design": {
      simple: "Designing your own network layout from scratch.",
      analogy: "📐 Like drawing the floor plan of your own house before building it.",
      detail: "Combine subnets, route tables, gateways and security layers to fit your application's needs.",
    },
    "Amazon S3 Fundamentals": {
      simple: "Practically unlimited cloud storage for files (called objects).",
      analogy: "☁️ Like an infinite Google Drive that holds any kind of file.",
      detail: "Simple Storage Service stores objects in buckets with extremely high durability (eleven 9's).",
    },
    "Storage Classes": {
      simple: "Different S3 tiers balancing cost against how often/fast you access data.",
      analogy: "🧥 Like keeping daily clothes in your closet but winter coats up in the attic.",
      detail: "Standard, Intelligent-Tiering, Infrequent Access and Glacier make rarely-used data much cheaper.",
    },
    "Static Website Hosting": {
      simple: "Serving a website's files directly from S3 — no server required.",
      analogy: "📌 Like pinning your posters straight onto a public wall.",
      detail: "S3 can host HTML/CSS/JS sites, usually paired with CloudFront for global speed.",
    },
    "Amazon RDS (MySQL)": {
      simple: "A managed database that AWS runs and maintains for you.",
      analogy: "🏠 Like a serviced apartment where the landlord handles all repairs.",
      detail: "Relational Database Service automates backups, patching, and scaling for engines like MySQL and PostgreSQL.",
    },
    "Database Connectivity": {
      simple: "How your app securely talks to its database.",
      analogy: "☎️ Like a private phone line between your app and its filing cabinet.",
      detail: "Uses endpoints, credentials, security groups and connection strings/drivers to connect safely.",
    },
    "Backup & Disaster Recovery": {
      simple: "Keeping copies so you can recover quickly after a failure.",
      analogy: "🔑 Like keeping a spare house key and an insurance policy.",
      detail: "Snapshots, multi-AZ replication and recovery plans minimize data loss and downtime.",
    },
    "VPC Peering": {
      simple: "Connecting two private networks so they can talk to each other.",
      analogy: "🌉 Like building a private bridge between two gated communities.",
      detail: "Peering links VPCs using private IPs without sending traffic over the public internet.",
    },
    "Transit Gateway": {
      simple: "A central hub that connects many networks at once.",
      analogy: "✈️ Like an airport hub linking many cities through one connection point.",
      detail: "Simplifies connectivity between many VPCs and on-prem networks at large scale.",
    },
    "Application Load Balancer (ALB)": {
      simple: "Spreads incoming web traffic evenly across many servers.",
      analogy: "🤵 Like a host seating arriving guests evenly across all the tables.",
      detail: "A Layer-7 load balancer that routes HTTP/HTTPS requests by rules to target groups.",
    },
    "Target Groups": {
      simple: "The set of servers a load balancer is allowed to send traffic to.",
      analogy: "📋 Like the host's list of tables they can seat people at.",
      detail: "Define health checks and register targets such as EC2 instances, IPs or Lambda functions.",
    },
    "Auto Scaling Groups (ASG)": {
      simple: "Automatically adds or removes servers based on demand.",
      analogy: "🧑‍🤝‍🧑 Like calling in extra cashiers when queues grow, and sending them home when it's quiet.",
      detail: "Maintains a desired capacity, scales on metrics, and replaces unhealthy instances automatically.",
    },
    "AWS Lambda Fundamentals": {
      simple: "Run your code without managing any servers at all.",
      analogy: "🥤 Like a vending machine — drop in a request, get a result, no kitchen required.",
      detail: "Serverless functions triggered by events; you pay only for the milliseconds your code runs.",
    },
    "Amazon DynamoDB": {
      simple: "A super-fast, fully-managed NoSQL database.",
      analogy: "🔐 Like a giant, instant key-value locker system.",
      detail: "Delivers single-digit millisecond performance at any scale with a flexible schema.",
    },

    /* ---- Day 2: DevOps · Docker · Kubernetes ---- */
    "DevOps Culture": {
      simple: "Developers and operations working as one team to ship software fast and reliably.",
      analogy: "🍽️ Like the kitchen and the waitstaff cooperating so food comes out hot and on time.",
      detail: "Emphasizes collaboration, automation, continuous feedback and shared responsibility.",
    },
    "SDLC": {
      simple: "The Software Development Life Cycle — the steps software goes through from idea to release.",
      analogy: "🏠 Like building a house: plan, build, inspect, move in, then maintain.",
      detail: "Phases: requirements → design → development → testing → deployment → maintenance.",
    },
    "Docker Architecture": {
      simple: "How Docker's pieces (CLI, daemon, images, containers) fit together.",
      analogy: "🍳 Like a kitchen: you order (CLI), chefs cook (daemon), recipes are stored (images), dishes are served (containers).",
      detail: "Explore this fully in the Docker module — the client talks to the daemon, which builds images and runs containers.",
      link: "docker",
    },
    "Docker Images & Containers": {
      simple: "An image is a blueprint; a container is a running copy of it.",
      analogy: "📜 Image = recipe · 🍝 Container = the cooked dish.",
      detail: "Build an image once, then run many identical containers from it anywhere. See the Docker module.",
      link: "docker",
    },
    "Dockerfiles": {
      simple: "A step-by-step recipe file that tells Docker how to build your image.",
      analogy: "📝 Like a recipe card Docker follows from top to bottom.",
      detail: "FROM, WORKDIR, COPY, RUN, CMD — each line is a build step. Walk through it line-by-line in Start Here.",
      link: "docker",
    },
    "Kubernetes Architecture": {
      simple: "How Kubernetes manages containers across many machines.",
      analogy: "🏢 Like a busy restaurant: a manager (control plane) directs kitchens (worker nodes).",
      detail: "Control plane + worker nodes run and heal your Pods. Explore the full interactive diagram in the Kubernetes module.",
      link: "kubernetes",
    },
    "Minikube Setup": {
      simple: "A tool to run a small Kubernetes cluster on your own laptop.",
      analogy: "🏠 Like a practice kitchen at home before working in a real restaurant.",
      detail: "Minikube spins up a single-node cluster locally — perfect for learning and testing manifests.",
    },
    "Pod Deployment": {
      simple: "Putting your app (inside Pods) onto the cluster so it runs.",
      analogy: "🍽️ Like placing plated dishes onto the serving line.",
      detail: "You apply a manifest and Kubernetes schedules and starts your Pods on available nodes.",
      link: "yaml",
    },
    "CI/CD Pipelines": {
      simple: "Automatically build, test and release code every time it changes.",
      analogy: "🏭 Like a conveyor belt that inspects and ships products automatically.",
      detail: "Continuous Integration/Delivery automate the path from a code commit all the way to production.",
    },
    "Jenkins Integration": {
      simple: "A popular automation server that runs your CI/CD pipelines.",
      analogy: "🤖 Like a tireless robot foreman running the conveyor belt 24/7.",
      detail: "Jenkins orchestrates build/test/deploy jobs using pipelines and a huge plugin ecosystem.",
    },
    "Terraform IaC": {
      simple: "Describe your cloud infrastructure as code, and create it automatically.",
      analogy: "📐 Like a blueprint a robot uses to build the exact same house every single time.",
      detail: "Infrastructure as Code: declarative configs provision, version and reproduce cloud resources reliably.",
    },

    /* ---- Day 3: Monitoring & AI ---- */
    "Prometheus Monitoring": {
      simple: "Collects metrics so you can see how your system is performing.",
      analogy: "⌚ Like a fitness tracker constantly measuring your app's vital signs.",
      detail: "A time-series metrics system with powerful querying and alerting, often visualized with Grafana.",
    },
    "Cluster Observability": {
      simple: "Being able to see exactly what's happening inside your cluster.",
      analogy: "📹 Like CCTV plus health monitors across the whole restaurant.",
      detail: "Combines metrics, logs and traces (the three pillars) to diagnose and prevent issues.",
    },
    "Amazon Bedrock": {
      simple: "An AWS service to build apps using powerful AI models, without managing servers.",
      analogy: "🧞 Like renting a genius assistant through a simple plug.",
      detail: "Access foundation models for text and images through one API, fully managed by AWS.",
    },
    "Prompt Engineering": {
      simple: "Writing clear instructions to get the best answers from an AI.",
      analogy: "🪄 Like asking a very literal genie for exactly the right wish.",
      detail: "Crafting prompts with context, examples and constraints to steer the model's output.",
    },
    "Foundation Models": {
      simple: "Large AI models trained on huge amounts of data, reusable for many tasks.",
      analogy: "🎓 Like a versatile graduate who can be trained for almost any specific job.",
      detail: "Pre-trained large models (LLMs) you adapt via prompting or fine-tuning.",
    },
    "RAG": {
      simple: "Retrieval-Augmented Generation — give the AI your own documents so it answers using them.",
      analogy: "📖 Like letting a student open the textbook during the exam.",
      detail: "Relevant data is retrieved and fed to the model so answers are accurate and grounded in your sources.",
    },
    "AI Chatbot Project": {
      simple: "Build a working chatbot using everything you learned.",
      analogy: "👨‍🍳 Like the final signature dish you cook to prove your skills.",
      detail: "Combine foundation models, prompt engineering and RAG into a deployable assistant.",
    },
    "Project Demonstration & Certification": {
      simple: "Present your project and earn your completion certificate.",
      analogy: "🎓 Like graduation day — show your work and receive the diploma.",
      detail: "A capstone presentation plus the official workshop completion certificate.",
    },

    /* ---- Days 4 & 5 ---- */
    "Mock Interview": {
      simple: "Practice interviews to get you ready for real DevOps and cloud jobs.",
      analogy: "🎭 Like a full dress rehearsal before opening night.",
      detail: "Simulated technical and HR rounds with feedback on AWS, Docker, Kubernetes, CI/CD and more.",
    },
  };

  const days = [
    {
      n: 1, date: "29 June 2026", theme: "AWS Cloud Foundations", ico: "☁️",
      sessions: [
        { label: "Session 1", time: meta.times.s1, topics: [
          "Introduction to Cloud Computing", "AWS Global Infrastructure", "AWS Account Setup", "IAM",
          "AWS CLI", "VPC Architecture", "Public & Private Subnets", "Internet Gateway (IGW)",
          "Route Tables", "Security Groups", "NACLs",
        ] },
        { label: "Session 2", time: meta.times.s2, topics: [
          "EC2 Deployment", "Linux & Windows Servers", "Instance Lifecycle Management",
          "Custom VPC Design", "Amazon S3 Fundamentals", "Storage Classes", "Static Website Hosting",
        ] },
        { label: "Session 3", time: meta.times.s3, topics: [
          "Amazon RDS (MySQL)", "Database Connectivity", "Backup & Disaster Recovery", "VPC Peering",
          "Transit Gateway", "Application Load Balancer (ALB)", "Target Groups",
          "Auto Scaling Groups (ASG)", "AWS Lambda Fundamentals", "Amazon DynamoDB",
        ] },
      ],
    },
    {
      n: 2, date: "30 June 2026", theme: "DevOps · Docker · Kubernetes", ico: "🐳",
      sessions: [
        { label: "Session 1", time: meta.times.s1, topics: [
          "DevOps Culture", "SDLC", "Docker Architecture", "Docker Images & Containers", "Dockerfiles",
        ] },
        { label: "Session 2", time: meta.times.s2, topics: [
          "Kubernetes Architecture", "Minikube Setup", "Pod Deployment", "CI/CD Pipelines",
        ] },
        { label: "Session 3", time: meta.times.s3, topics: [
          "Jenkins Integration", "Terraform IaC",
        ] },
      ],
    },
    {
      n: 3, date: "1 July 2026", theme: "Monitoring & AI", ico: "🤖",
      note: "(Listed as “1 June 2026” on the schedule — shown here as 1 July to follow the consecutive days.)",
      sessions: [
        { label: "Session 1", time: meta.times.s1, topics: [
          "Prometheus Monitoring", "Cluster Observability", "Amazon Bedrock",
        ] },
        { label: "Session 2", time: meta.times.s2, topics: [
          "Prompt Engineering", "Foundation Models", "RAG",
        ] },
        { label: "Session 3", time: meta.times.s3, topics: [
          "AI Chatbot Project", "Project Demonstration & Certification",
        ] },
      ],
    },
    {
      n: 4, date: "3 Aug 2026", theme: "Mock Interview", ico: "🎯", fullDay: true,
      sessions: [{ label: "Full Day", time: "08:40 AM – 03:45 PM", topics: ["Mock Interview"] }],
    },
    {
      n: 5, date: "4 Aug 2026", theme: "Mock Interview", ico: "🏆", fullDay: true,
      sessions: [{ label: "Full Day", time: "08:40 AM – 03:45 PM", topics: ["Mock Interview"] }],
    },
  ];

  window.DATA.workshop = { meta, days, topics };
})();
