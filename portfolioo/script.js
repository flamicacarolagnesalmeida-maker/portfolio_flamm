// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// ---------- Highlight current section in nav ----------
const links = [...navLinks.querySelectorAll("a")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => io.observe(s));
}

// ---------- Project filters ----------
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");
filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    const cat = btn.dataset.filter;
    projects.forEach((p) => {
      p.hidden = cat !== "all" && !p.dataset.cat.split(" ").includes(cat);
    });
  })
);

// ---------- Copy buttons ----------
document.querySelectorAll(".copy-btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    const text = btn.dataset.copy;
    const done = () => {
      const old = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(() => (btn.textContent = old), 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, () => selectText(btn));
    } else {
      selectText(btn);
    }
  })
);
function selectText(btn) {
  const target = btn.parentElement.querySelector(".channel-text a, .channel-text span");
  const range = document.createRange();
  range.selectNodeContents(target);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

// ---------- Contact form ----------
// No backend here: this validates and confirms. To receive messages, connect a
// service such as Formspree or EmailJS inside the submit handler.
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const msg = form.message.value.trim();
  note.className = "form-note err";
  if (!name || !email || !msg) { note.textContent = "Fill in your name, email and a message."; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.textContent = "That email address looks incomplete. Check for a missing @ or domain."; return; }
  note.className = "form-note ok";
  note.textContent = `Thanks, ${name}. Your message is ready. Connect a form service to start receiving these.`;
  form.reset();
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();