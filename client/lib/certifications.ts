export type Certification = {
  title: string;
  slug: string;
  issuer: string;
  issueDate: string;
  credentialLink: string;
  description: string;
  image: string;
  keyTopics: string[];
  whatILearned: string;
  whyItMatters: string;
  skills: string[];
  takeaway: string;
};

type CertificationInput = Omit<Certification, "slug"> & { slug?: string };

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const certificationInputs: CertificationInput[] = [
  {
    title: "Linux System Administration Certification",
    issuer: "Linux Challenge Program",
    issueDate: "2025-09-15",
    credentialLink: "#",
    image: "/certifications/linux.png",
    description:
      "Hands-on Linux training covering system architecture, file systems, process management, permissions, networking fundamentals, and shell scripting with real command-line exercises.",
    keyTopics: [
      "File system hierarchy and disk management",
      "User and group permissions with chmod/chown",
      "Process management with ps, top, and kill",
      "Networking fundamentals — IP config, SSH, firewall rules",
      "Shell scripting and cron job automation",
      "Package management with apt and yum",
    ],
    whatILearned:
      "This certification pushed me to get genuinely comfortable with the command line — not just running one-liners but actually understanding what's happening underneath. I spent a lot of time working through permission models, debugging broken scripts, and setting up services from scratch. The networking section was probably the most eye-opening part for me. Getting SSH tunneling right, locking down firewall rules with ufw, and understanding how routing tables actually work gave me a much stronger foundation for everything I've done in cloud and DevOps since.",
    whyItMatters:
      "Almost everything I build eventually runs on Linux in production. Whether it's an EC2 instance, a Docker container, or a VPS — knowing how to navigate and manage that environment without a GUI is a non-negotiable skill. This certification formalized a lot of knowledge I had picked up informally and filled in the gaps I didn't know I had.",
    skills: ["Linux CLI", "Bash Scripting", "SSH", "File Permissions", "Process Management", "Cron Jobs", "Networking Basics"],
    takeaway:
      "Linux is the backbone of most of what I do. After finishing this, I stopped being afraid of a bare terminal and started actually enjoying working in it.",
  },
  {
    title: "AWS 3-Tier Architecture Project Certification",
    issuer: "AWS Hands-On Program",
    issueDate: "2025-10-10",
    credentialLink: "#",
    image: "/certifications/Aws.png",
    description:
      "Designed and deployed a complete 3-tier architecture using EC2, S3, Application Load Balancer, IAM, and security groups, focusing on scalability, availability, and best practices.",
    keyTopics: [
      "VPC design with public and private subnets",
      "EC2 instances across multiple availability zones",
      "Application Load Balancer and Auto Scaling Groups",
      "RDS for the database tier with multi-AZ failover",
      "IAM roles and least-privilege access policies",
      "S3 for static asset storage with lifecycle rules",
    ],
    whatILearned:
      "The project started simple — deploy a web app across three tiers — but the details made it complex fast. Setting up the VPC correctly, making sure the private subnet couldn't be reached from the internet, getting the ALB health checks to pass, configuring security groups that were actually restrictive instead of just open... every piece had to be deliberate. The IAM work was particularly useful. Writing policies from scratch instead of slapping AdministratorAccess on everything forced me to think about what each component actually needed access to.",
    whyItMatters:
      "The 3-tier model is one of those architectural patterns that shows up everywhere in real production systems. Understanding it at the infrastructure level — not just conceptually — means I can have meaningful conversations with backend teams, review infrastructure PRs with actual understanding, and catch security oversights before they reach production.",
    skills: ["AWS EC2", "AWS VPC", "IAM", "Application Load Balancer", "Auto Scaling", "RDS", "S3", "Security Groups"],
    takeaway:
      "Cloud architecture isn't intimidating once you've wired it up yourself. This project gave me the hands-on confidence to work with AWS infrastructure rather than just reading about it.",
  },
  {
    title: "DevOps Engineering Certification",
    issuer: "DevOps Training Program",
    issueDate: "2025-12-18",
    credentialLink: "#",
    image: "/certifications/Devops.png",
    description:
      "Practical DevOps training involving CI/CD pipelines, Docker containerization, Jenkins automation, Ansible configuration management, and Git/GitHub workflows.",
    keyTopics: [
      "CI/CD pipeline design and implementation with Jenkins",
      "Docker image building, multi-stage builds, and registries",
      "Ansible playbooks for repeatable configuration management",
      "Git branching strategies and pull request workflows",
      "Infrastructure as Code fundamentals",
      "Monitoring and alerting basics with Prometheus",
    ],
    whatILearned:
      "Going into this I already used Docker and Git daily, but the training forced me to be more systematic. Writing Jenkins pipelines from scratch, dealing with pipeline failures mid-deploy, and figuring out how to structure Ansible playbooks cleanly were all harder than I expected. The Ansible section especially clicked something for me — once you treat your configuration as code that lives in version control and gets reviewed like any other change, a lot of the chaos in infrastructure management goes away. I also spent time on monitoring setup, which is something developers often skip until something breaks in production.",
    whyItMatters:
      "DevOps isn't just a job title — it's a set of practices that make shipping software less painful for everyone involved. Understanding automation, repeatability, and observability at a practical level means I can contribute to the full delivery pipeline, not just write code and hand it off.",
    skills: ["Jenkins", "Docker", "Ansible", "CI/CD", "GitHub Actions", "YAML", "Linux Automation", "Prometheus"],
    takeaway:
      "The best part of this certification was realizing how much manual work can be automated without much complexity. Automate the boring parts, monitor the important ones, and let developers focus on actually building things.",
  },
  {
    title: "DevOps and AWS Cloud Certification",
    issuer: "Full Stack Academy",
    issueDate: "2025-12-19",
    credentialLink: "#",
    image: "/certifications/devops-aws.png",
    description:
      "Comprehensive DevOps and AWS training covering CI/CD pipelines, Docker, AWS services (EC2, S3, IAM), infrastructure as code, and best practices for cloud deployment and management.",
    keyTopics: [
      "End-to-end CI/CD on AWS with CodePipeline and CodeBuild",
      "Dockerized deployments on ECS and ECR",
      "Terraform for infrastructure provisioning",
      "CloudWatch logging and alarms",
      "IAM roles and cross-account access patterns",
      "Cost optimization strategies for cloud workloads",
    ],
    whatILearned:
      "This one brought DevOps and AWS together in a way that felt much more production-realistic than either topic on its own. Setting up CodePipeline to test, build, and deploy a Docker image end-to-end — with proper rollback on failure — was genuinely satisfying. The Terraform module was challenging but worth it. Writing infra as code means you can spin up a full environment in minutes and tear it down just as fast, which changes how you think about staging and testing environments entirely.",
    whyItMatters:
      "Most companies are running their infrastructure on cloud providers and automating their deployments. Being able to work across both — understanding the AWS primitives and the DevOps workflows that orchestrate them — is what makes an engineer genuinely useful on a modern team.",
    skills: ["AWS CodePipeline", "ECS", "ECR", "Terraform", "CloudWatch", "Docker", "IAM", "Cost Optimization"],
    takeaway:
      "When the cloud and DevOps practices work together properly, deploying software feels unremarkable — which is exactly how it should feel. This certification helped me get closer to that.",
  },
  {
    title: "Postman API Fundamentals Student Certification",
    issuer: "Postman",
    issueDate: "2025-03-20",
    credentialLink: "https://badgr.com/public/assertions/l1JA7K4WSfiCQxqrZ1QDZg?identity__email=syedomerali2006%40gmail.com",
    image: "/certifications/postman.png",
    description:
      "Fundamental training on API development and testing using Postman, covering request building, response validation, environment management, and test automation.",
    keyTopics: [
      "Building and organizing REST API requests in collections",
      "Environment and variable management for different stages",
      "Writing JavaScript-based test assertions in Postman",
      "Response validation and schema checking",
      "Running automated test suites with Newman CLI",
      "Documenting APIs directly from Postman collections",
    ],
    whatILearned:
      "Before this certification I used Postman like a lot of developers do — as a fancy way to send HTTP requests manually. This changed that. Learning how to write test scripts that assert response bodies, validate status codes, and chain requests together made me rethink what API testing can actually look like. The Newman CLI section was a practical highlight — being able to run an entire Postman collection as part of a CI pipeline meant the testing knowledge had immediate real-world application.",
    whyItMatters:
      "APIs are the connective tissue between everything in modern software. Being rigorous about testing them — not just trying the happy path — catches issues before they become production incidents. This certification built habits I still use every time I'm working with or building an API.",
    skills: ["Postman", "REST APIs", "API Testing", "Newman CLI", "Test Automation", "Environment Variables", "JavaScript Assertions"],
    takeaway:
      "Good API testing is underrated. It's one of the fastest ways to catch integration bugs early, and Postman makes it surprisingly approachable once you know what you're doing.",
  },
  {
    title: "Introduction to Programming Using HTML and CSS Certification",
    issuer: "LetsUpgrade",
    issueDate: "2025-01-25",
    credentialLink: "#",
    image: "/certifications/html-css.png",
    description:
      "Comprehensive introduction to web development covering HTML structure, CSS styling, responsive design, and best practices for building modern, accessible websites.",
    keyTopics: [
      "HTML5 semantic structure and accessibility best practices",
      "CSS box model, Flexbox, and Grid layout",
      "Responsive design with media queries",
      "Typography, color, and spacing fundamentals",
      "Forms, inputs, and basic interaction patterns",
      "Cross-browser compatibility considerations",
    ],
    whatILearned:
      "HTML and CSS seem deceptively simple from the outside, but doing them well takes real attention to detail. This certification covered the fundamentals thoroughly — semantic HTML matters not just for SEO, but for screen readers and assistive technology. The CSS layout section spent serious time on Flexbox and Grid, which are now the tools I reach for instinctively. Getting comfortable with responsive design from the beginning meant I never developed bad habits around fixed pixel layouts.",
    whyItMatters:
      "You can't build good user interfaces without understanding HTML and CSS deeply. No amount of JavaScript or React knowledge compensates for a broken DOM structure or a layout that falls apart on mobile. These fundamentals underpin every piece of frontend work I do.",
    skills: ["HTML5", "CSS3", "Flexbox", "CSS Grid", "Responsive Design", "Accessibility", "Semantic Markup"],
    takeaway:
      "The web is built on HTML and CSS. Understanding them properly — not just well enough — is what separates developers who struggle with UI bugs from those who solve them quickly.",
  },
  {
    title: "JavaScript Specialist Certification",
    issuer: "Udemy",
    issueDate: "2024-09-10",
    credentialLink: "https://udemy-certificate.s3.amazonaws.com/image/UC-8732de05-ea94-4275-b95b-d7820a241896.jpg",
    image: "/certifications/javascript.png",
    description:
      "In-depth JavaScript training covering core concepts, ES6+ features, asynchronous programming, closures, prototypes, and practical application development.",
    keyTopics: [
      "Closures, scope, and the execution context",
      "Prototype chain and object-oriented patterns",
      "ES6+ features: destructuring, spread, modules, optional chaining",
      "Asynchronous JavaScript: callbacks, Promises, and async/await",
      "Event loop and concurrency model",
      "Error handling and defensive programming patterns",
    ],
    whatILearned:
      "JavaScript is one of those languages where you can write it for years without really understanding how it works. This certification changed that. The section on the event loop and the call stack finally made async behavior click for me in a way that tutorials hadn't managed before. Understanding closures deeply — not just knowing they exist, but being able to predict their behavior — directly improved how I write hooks in React and modules in Node. The prototypal inheritance material was dense but worth it, especially since so much of modern JavaScript is still built on top of those patterns even when it hides them.",
    whyItMatters:
      "JavaScript is the language of the web. Whether you're building a Next.js frontend, a Node.js API, or a mobile app with React Native, you're writing JavaScript. Being genuinely fluent in it — understanding the runtime, not just the syntax — makes everything faster and less error-prone.",
    skills: ["JavaScript ES6+", "Async/Await", "Promises", "Closures", "Prototypes", "Event Loop", "DOM Manipulation", "Error Handling"],
    takeaway:
      "After this certification, JavaScript stopped feeling like a language I was fighting against and started feeling like one I actually understood. That shift made a real difference in how fast I can write and debug code.",
  },
  {
    title: "Full Stack Web Development Certification",
    issuer: "Full Stack Training Program",
    issueDate: "2025-10-12",
    credentialLink: "#",
    image: "/certifications/fullstack.png",
    description:
      "Comprehensive full-stack development certification covering frontend (React, TypeScript), backend (Node.js, Express), databases, REST APIs, authentication, and deployment of production-ready applications.",
    keyTopics: [
      "React component architecture and state management",
      "Node.js and Express REST API design",
      "MongoDB schema design and query optimization",
      "JWT-based authentication and session management",
      "TypeScript for both frontend and backend",
      "Deployment pipelines with CI/CD and cloud hosting",
    ],
    whatILearned:
      "The training structured itself around building a real application rather than isolated exercises, which made a big difference. Working across the full stack on a single project — designing the database schema, building the API, wiring up the frontend, handling auth — forced me to think about how every layer affects the others. TypeScript across both client and server was a requirement, which initially felt like overhead but quickly became something I wouldn't want to give up. Catching type errors at compile time rather than runtime is worth the setup cost every time.",
    whyItMatters:
      "Full-stack capability means I can take a feature from idea to production without being blocked on waiting for someone else. I can make informed decisions about API design when building the frontend, and I understand frontend constraints when designing the backend. That end-to-end perspective is something I actively use on every project.",
    skills: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "JWT Auth", "REST APIs", "CI/CD", "Deployment"],
    takeaway:
      "Building full stack isn't about being mediocre at everything — it's about understanding the whole system well enough to make good decisions at every layer. This certification helped me develop that perspective.",
  },
];

const buildCertifications = (inputs: CertificationInput[]): Certification[] => {
  const usedSlugs = new Set<string>();

  return inputs.map((certification) => {
    const slug = certification.slug
      ? slugify(certification.slug)
      : slugify(certification.title);

    if (!slug) {
      throw new Error(`Invalid slug for certification: ${certification.title}`);
    }

    if (usedSlugs.has(slug)) {
      throw new Error(`Duplicate slug detected: ${slug}`);
    }

    usedSlugs.add(slug);

    return {
      ...certification,
      slug,
    };
  });
};

export const certifications = buildCertifications(certificationInputs);

export const getCertificationBySlug = (slug: string) =>
  certifications.find((certification) => certification.slug === slug);
