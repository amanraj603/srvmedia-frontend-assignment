// ── Must-Visit Slider —-
(function () {
  const track = document.getElementById("mv-track");
  const prev = document.getElementById("mv-prev");
  const next = document.getElementById("mv-next");
  const status = document.getElementById("mv-status");
  if (!track) return;

  const SCROLL = 368;
  const TOTAL = track.querySelectorAll(".mv__card").length;

  function announcePosition() {
    if (!status) return;
    const card = track.querySelector(".mv__card");
    const cardW = card ? card.offsetWidth + 18 : SCROLL;
    const current = Math.round(track.scrollLeft / cardW) + 1;
    status.textContent = `Showing item ${Math.min(current, TOTAL)} of ${TOTAL}`;
  }

  function scrollNext() {
    track.scrollBy({ left: SCROLL, behavior: "smooth" });
    setTimeout(announcePosition, 400);
  }
  function scrollPrev() {
    track.scrollBy({ left: -SCROLL, behavior: "smooth" });
    setTimeout(announcePosition, 400);
  }

  next.addEventListener("click", scrollNext);
  prev.addEventListener("click", scrollPrev);

  track.closest(".mv__slider").addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    }
  });

  announcePosition();
})();

// -- form submission --
(function () {
  const form = document.getElementById("lead-form");
  const errorEl = document.getElementById("form-error");
  if (!form) return;

  function setError(msg) {
    if (errorEl) errorEl.textContent = msg;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("parent-name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const grade = document.getElementById("grade").value.trim();

    if (!name || !phone || !grade) {
      setError("Please fill in all fields before submitting.");
      // Move focus to first empty field
      if (!name) document.getElementById("parent-name").focus();
      else if (!phone) document.getElementById("phone").focus();
      else document.getElementById("grade").focus();
      return;
    }

    setError("");
    const btn = document.getElementById("btn-submit");
    const label = btn.querySelector(".form__submit-label");
    const icon = btn.querySelector(".form__submit-icon");

    label.textContent = "✓ Registered!";
    btn.setAttribute("aria-disabled", "true");
    btn.disabled = true;
    if (icon) icon.style.background = "#16a34a";
    btn.style.background = "#22c55e";

    setTimeout(() => {
      label.textContent = "SUBMIT";
      btn.style.background = "";
      if (icon) icon.style.background = "";
      btn.removeAttribute("aria-disabled");
      btn.disabled = false;
      form.reset();
      setError("");
    }, 3000);
  });
})();

// ── Navbar: white → gradient on scroll ──
(function () {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  const THRESHOLD = 60;

  function updateNav() {
    if (window.scrollY > THRESHOLD) {
      nav.classList.add("navbar--scrolled");
    } else {
      nav.classList.remove("navbar--scrolled");
    }
  }

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();
})();
