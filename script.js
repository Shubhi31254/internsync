// Login Validation
function validateLogin() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (!user.endsWith("@gmail.com")) {
    alert("Email must end with @gmail.com");
    return;
  }

  if (pass.length < 6 || !/[A-Z]/.test(pass) || !/[0-9]/.test(pass)) {
    alert("Password must be strong (min 6 chars, one uppercase & number)");
    return;
  }

  document.getElementById("popup").style.display = "block";
}

// Redirect to dashboard
function redirectToDashboard() {
  window.location.href = "dashboard.html";
}

// Save entry
function saveEntry() {
  const week = document.getElementById("week").value;
  const task = document.getElementById("task").value;
  const skills = document.getElementById("skills").value;

  const entry = {
    week,
    task,
    skills,
    date: new Date().toLocaleString()
  };

  let data = JSON.parse(localStorage.getItem("timeline") || "[]");
  data.push(entry);
  localStorage.setItem("timeline", JSON.stringify(data));

  displayTimeline();
}

// Display
function displayTimeline(filtered = null) {
  const container = document.getElementById("timeline");
  container.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("timeline") || "[]");

  (filtered || data).forEach((entry, i) => {
    const div = document.createElement("div");
    div.innerHTML = `<b>Week ${entry.week}</b>: ${entry.task} <br> Skills: ${entry.skills} <br> <small>${entry.date}</small>`;
    div.style.marginBottom = "15px";
    container.appendChild(div);
  });
}

// Filter by skills
function filterSkills() {
  const keyword = document.getElementById("filter").value.toLowerCase();
  const all = JSON.parse(localStorage.getItem("timeline") || "[]");
  const filtered = all.filter(e => e.skills.toLowerCase().includes(keyword));
  displayTimeline(filtered);
}

// Export to PDF
function exportToPDF() {
  const text = document.getElementById("timeline").innerText;
  const blob = new Blob([text], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}

// Export to Markdown
function exportToMarkdown() {
  const text = document.getElementById("timeline").innerText;
  const blob = new Blob([text], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "timeline.md";
  link.click();
}

// Load timeline on dashboard
if (window.location.href.includes("dashboard.html")) {
  displayTimeline();
}
