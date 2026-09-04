const projectData = {
  health: {
    title: "KLD Health Management System",
    id: "PROJECT_001",
    status: "COMPLETE",
    stack: "Java Swing / MySQL / XAMPP",
    objective: "Modernize a paper-based school health appointment workflow.",
    details: "A collaborative system for student registration, authentication, appointment booking, healthcare-provider management, and administrative controls.",
    result: "A structured digital booking flow that brings students and school healthcare providers into one manageable system.",
    link: "https://github.com/6sceed/KLDHMS-V2"
  },
  vote: {
    title: "VoteEase - Online Voting System",
    id: "PROJECT_002",
    status: "COMPLETE",
    stack: "PHP / MySQL / JavaScript / Tailwind CSS",
    objective: "Create a responsive voting platform with clear administration and live results.",
    details: "Includes authentication with email notifications, candidate and voter management, election configuration, vote tracking, prepared statements, password hashing, input validation, and a live results dashboard.",
    result: "A full web voting workflow with security-minded validation and separate user and administrator experiences.",
    link: "https://github.com/6sceed/VotingSystem"
  }
};

const output = document.querySelector("#terminalOutput");
const terminalForm = document.querySelector("#terminalForm");
const terminalInput = document.querySelector("#terminalInput");
const modal = document.querySelector("#projectModal");
const modalTitle = document.querySelector("#modalTitle");
const modalContent = document.querySelector("#modalContent");
const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#siteNav");

function goToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  nav?.classList.remove("is-open");
}

document.querySelectorAll("[data-command]").forEach((button) => {
  button.addEventListener("click", () => goToSection(button.dataset.command));
});

document.querySelectorAll("[data-project]").forEach((card) => {
  card.addEventListener("click", () => openProject(card.dataset.project));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(card.dataset.project);
    }
  });
});

function openProject(key) {
  const project = projectData[key];
  if (!project || !modal) return;
  modalTitle.textContent = project.title;
  modalContent.innerHTML = `
    <div class="modal-section"><h3>PROJECT_ID / STATUS / STACK</h3><p>${project.id} / ${project.status} / ${project.stack}</p></div>
    <div class="modal-section"><h3>OBJECTIVE</h3><p>${project.objective}</p></div>
    <div class="modal-section"><h3>TECHNICAL DETAILS</h3><p>${project.details}</p></div>
    <div class="modal-section"><h3>RESULT</h3><p>${project.result}</p></div>
    <a class="modal-link" href="${project.link}" target="_blank" rel="noreferrer">OPEN CASE FILE ON GITHUB -></a>`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close")?.focus();
}

function closeProject() {
  modal?.classList.remove("is-open");
  modal?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelector(".modal-close")?.addEventListener("click", closeProject);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeProject();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProject();
});

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

const commandHelp = "Available: help, whoami, about, skills, projects, contact, clear";
const commandMap = {
  whoami: ["Cedrick Garcia", "Information Systems student and full-stack developer."],
  about: ["Identity profile loaded.", "Focus: software development, systems, databases, and practical digital experiences."],
  skills: ["Capability index loaded.", "HTML/CSS, JavaScript, PHP, Java, MySQL, React, Node.js, Git, REST APIs."],
  projects: ["Project index loaded.", "KLD Health Management System; VoteEase Online Voting System."],
  contact: ["Public contact available.", "zenovcozru66@gmail.com | github.com/6sceed"]
};

function printLine(text, className = "") {
  const line = document.createElement("p");
  line.className = `terminal-line ${className}`;
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

terminalForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const command = terminalInput.value.trim().toLowerCase();
  if (!command) return;
  printLine(`visitor@cedrick:~$ ${command}`, "command-line");
  terminalInput.value = "";
  if (command === "clear") {
    output.innerHTML = "";
    return;
  }
  if (command === "help") {
    printLine(commandHelp);
    return;
  }
  if (commandMap[command]) {
    commandMap[command].forEach((line) => printLine(line));
    goToSection(command === "whoami" || command === "about" ? "whoami" : command);
    return;
  }
  printLine("Command not recognized. Type help for the available commands.");
});

const uptime = document.querySelector("#uptime");
const loadedAt = Date.now();
function updateUptime() {
  const seconds = Math.floor((Date.now() - loadedAt) / 1000);
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const remaining = String(seconds % 60).padStart(2, "0");
  if (uptime) uptime.textContent = `${hours}:${minutes}:${remaining}`;
}
updateUptime();
window.setInterval(updateUptime, 1000);

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("#siteNav a");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.setAttribute("aria-current", link.getAttribute("href") === `#${entry.target.id}` ? "true" : "false"));
    }
  });
}, { rootMargin: "-35% 0px -55%" });
sections.forEach((section) => observer.observe(section));
