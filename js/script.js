(function () {
  "use strict";

  /* -------------------------------------------------
     1. Ambient "recording" timecode — signature detail
  ------------------------------------------------- */
  var recTimeEl = document.getElementById("recTime");
  var startTime = Date.now();

  function pad(n) { return String(n).padStart(2, "0"); }

  function tickClock() {
    if (!recTimeEl) return;
    var elapsed = Math.floor((Date.now() - startTime) / 1000);
    var h = Math.floor(elapsed / 3600);
    var m = Math.floor((elapsed % 3600) / 60);
    var s = elapsed % 60;
    recTimeEl.textContent = pad(h) + ":" + pad(m) + ":" + pad(s);
  }
  setInterval(tickClock, 1000);
  tickClock();

  /* -------------------------------------------------
     2. Mobile menu toggle
  ------------------------------------------------- */
  var menuBtn = document.getElementById("menuBtn");
  var tabs = document.getElementById("tabs");

  if (menuBtn && tabs) {
    menuBtn.addEventListener("click", function () {
      var isOpen = tabs.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    tabs.querySelectorAll(".tab").forEach(function (link) {
      link.addEventListener("click", function () {
        tabs.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -------------------------------------------------
     3. Active tab highlighting (nav bar itself always stays visible)
  ------------------------------------------------- */
  var sections = document.querySelectorAll("#sinopsis, #productores, #capitulos, #audiovisuales, #juego, #enlaces");
  var tabLinks = document.querySelectorAll(".tab");

  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        tabLinks.forEach(function (t) {
          t.classList.toggle("active", t.dataset.tab === id);
        });
      }
    });
  }, { rootMargin: "-40% 0px -50% 0px" });

  sections.forEach(function (s) { navObserver.observe(s); });

  /* -------------------------------------------------
     4. Scroll reveal for doc sheet / crew cards / tapes
  ------------------------------------------------- */
  var revealTargets = document.querySelectorAll(".doc-sheet, .crew-card, .tape-card, .audio-card, .links-card");

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(function (el, i) {
    el.style.transitionDelay = Math.min(i * 60, 300) + "ms";
    revealObserver.observe(el);
  });

  /* -------------------------------------------------
     5. Redacted testimony reveal (click / keyboard)
  ------------------------------------------------- */
  document.querySelectorAll(".redact").forEach(function (span) {
    span.addEventListener("click", function () {
      span.classList.toggle("revealed");
    });
    span.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        span.classList.toggle("revealed");
      }
    });
  });

  /* -------------------------------------------------
     6. Evidence tape modal (teasers / episodes)
  ------------------------------------------------- */
  var modal = document.getElementById("modal");
  var modalTitle = document.getElementById("modalTitle");
  var modalTc = document.getElementById("modalTc");
  var modalScreen = document.getElementById("modalScreen");
  var modalClose = document.getElementById("modalClose");
  var lastFocused = null;

  function openModal(card) {
    if (card.classList.contains("locked")) return;

    var title = card.dataset.title || "Sin título";
    var tc = card.dataset.tc || "";
    var video = card.dataset.video || "";

    modalTitle.textContent = title;
    modalTc.textContent = tc;

    if (video) {
      modalScreen.innerHTML = '<iframe src="' + video + '" title="' + title + '" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    } else {
      modalScreen.innerHTML = '<p class="modal-static">SEÑAL NO DISPONIBLE<br><span>Este material se publicará próximamente.</span></p>';
    }

    lastFocused = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    modalClose.focus();
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modalScreen.innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll(".tape-card").forEach(function (card) {
    card.addEventListener("click", function () { openModal(card); });
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  /* -------------------------------------------------
     7. Back to top button
  ------------------------------------------------- */
  var backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 600) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    }, { passive: true });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

})();