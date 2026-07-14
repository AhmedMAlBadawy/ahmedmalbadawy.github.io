document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav) {
    const closeBtn = nav.querySelector(".menu-close");
    const navLinks = nav.querySelectorAll("a");

    const closeMenu = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    };

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.classList.toggle("menu-open", isOpen);
    });

    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  }

  const forms = document.querySelectorAll("form[data-gform]");
  const toast = document.getElementById("formToast");

  forms.forEach((form) => {
    const submitBtn = form.querySelector("[data-submit]");
    const note = form.querySelector("[data-note]");
    if (!submitBtn) return;

    form.addEventListener("submit", () => {
      if (submitBtn.disabled) return;
      submitBtn.disabled = true;
      submitBtn.classList.add("is-loading");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      if (note) note.textContent = "Submitting your inquiry...";

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.classList.remove("is-loading");
        submitBtn.textContent = originalText;
        if (note) note.textContent = "Submitted. We will respond within 1–2 business days.";
        if (toast) {
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 3000);
        }
      }, 1800);
    });
  });
});
