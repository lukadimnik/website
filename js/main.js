// main.js — nav state, typed line, count-up metrics, scroll reveal
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("has-js");

  document.getElementById("year") && (document.getElementById("year").textContent = new Date().getFullYear());

  /* nav border on scroll */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("stuck", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* typed prompt line */
  var typed = document.querySelector("[data-type]");
  if (typed) {
    var full = typed.getAttribute("data-type");
    var symHTML = '<span class="sym">➜</span> <span class="dim">~</span> ';
    var curHTML = '<span class="type-cur"></span>';
    if (reduce) {
      typed.innerHTML = symHTML + full + curHTML;
    } else {
      var i = 0;
      typed.innerHTML = symHTML + curHTML;
      var tick = function () {
        i++;
        typed.innerHTML = symHTML + full.slice(0, i) + curHTML;
        if (i < full.length) setTimeout(tick, 34 + Math.random() * 36);
      };
      setTimeout(tick, 520);
    }
  }

  /* count-up metrics */
  function animateNum(el) {
    var target = parseFloat(el.getAttribute("data-to"));
    var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    var dur = 1200, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(dec);
    }
    requestAnimationFrame(step);
  }

  var counts = document.querySelectorAll("[data-to]");
  if (reduce) {
    counts.forEach(function (el) {
      var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
      el.textContent = parseFloat(el.getAttribute("data-to")).toFixed(dec);
    });
  } else if ("IntersectionObserver" in window) {
    var numObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateNum(e.target); numObs.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counts.forEach(function (el) { numObs.observe(el); });
  } else {
    counts.forEach(animateNum);
  }

  /* scroll reveal */
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); revObs.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { revObs.observe(el); });
  }

  /* safety net: reveal everything if IntersectionObserver never fires */
  setTimeout(function () {
    document.querySelectorAll(".reveal:not(.in)").forEach(function (el) { el.classList.add("in"); });
    document.querySelectorAll("[data-to]").forEach(function (el) {
      if (el.textContent === "0") animateNum(el);
    });
  }, 1600);
})();
