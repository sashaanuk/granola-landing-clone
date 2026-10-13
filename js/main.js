// Small vanilla-JS layer: the page works without it, JS only adds behaviour.

// ---- Navbar: turn into a floating pill once the page is scrolled ----------
const navbar = document.getElementById("navbar");

const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ---- Features dropdown (hover on desktop, click for touch/keyboard) -------
document.querySelectorAll("[data-dropdown]").forEach((item) => {
  const trigger = item.querySelector("button");
  const setOpen = (open) => {
    item.classList.toggle("is-open", open);
    trigger.setAttribute("aria-expanded", String(open));
  };

  item.addEventListener("mouseenter", () => setOpen(true));
  item.addEventListener("mouseleave", () => setOpen(false));
  trigger.addEventListener("click", () => setOpen(!item.classList.contains("is-open")));
  item.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
});

// ---- Mobile menu ----------------------------------------------------------
const burger = document.querySelector("[data-burger]");
burger.addEventListener("click", () => {
  const open = navbar.classList.toggle("is-menu-open");
  burger.setAttribute("aria-expanded", String(open));
});
navbar.querySelectorAll(".mobile-menu a").forEach((a) =>
  a.addEventListener("click", () => navbar.classList.remove("is-menu-open"))
);

// ---- Notepad mockup: "My notes" ↔ "Enhanced" ------------------------------
const notepad = document.querySelector("[data-notepad]");
if (notepad) {
  const tabs = notepad.querySelectorAll("[data-tab]");
  const panes = notepad.querySelectorAll("[data-pane]");

  const show = (name) => {
    tabs.forEach((t) => t.setAttribute("aria-selected", String(t.dataset.tab === name)));
    panes.forEach((p) => (p.hidden = p.dataset.pane !== name));
  };

  tabs.forEach((t) => t.addEventListener("click", () => show(t.dataset.tab)));
  notepad.querySelector("[data-generate]").addEventListener("click", () => show("enhanced"));
}

// ---- Scroll reveal + typewriter, both driven by IntersectionObserver ------
const typewrite = (el) => {
  const text = el.dataset.typewriter;
  let i = 0;
  const tick = () => {
    el.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(tick, 45 + Math.random() * 60);
  };
  tick();
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      entry.target.querySelectorAll("[data-typewriter]").forEach(typewrite);
      observer.unobserve(entry.target); // animate only once
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ---- Chat demo: show a canned answer on submit ----------------------------
const chat = document.querySelector("[data-chat]");
if (chat) {
  chat.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector("[data-chat-answer]").hidden = false;
  });
}

// ---- Marquee: duplicate content so the -50% loop is seamless --------------
document.querySelectorAll("[data-marquee]").forEach((track) => {
  [...track.children].forEach((child) => {
    const clone = child.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });
});
