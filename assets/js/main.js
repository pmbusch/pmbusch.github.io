(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Light/dark toggle. The saved choice is applied early by an inline script in
  // head.html; here we only flip it and remember it.
  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    var darkQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    var isDark = function () {
      var t = document.documentElement.getAttribute("data-theme");
      if (t) return t === "dark";
      return !!(darkQuery && darkQuery.matches);
    };
    var syncLabel = function () {
      themeToggle.setAttribute("aria-pressed", isDark() ? "true" : "false");
    };
    themeToggle.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncLabel();
    });
    syncLabel();
  }

  // Research page: outline sidebar scroll-spy (highlights the section in view)
  var outlineBoxes = Array.prototype.slice.call(document.querySelectorAll(".outline-box"));
  var researchSections = Array.prototype.slice.call(document.querySelectorAll(".research-line"));
  if (outlineBoxes.length && researchSections.length && "IntersectionObserver" in window) {
    var setActive = function (id) {
      outlineBoxes.forEach(function (box) {
        box.classList.toggle("is-active", box.dataset.target === id);
      });
    };
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    researchSections.forEach(function (section) { observer.observe(section); });
    setActive(researchSections[0].id);
  }

  // Publications filter (chips: line + type), URL query driven
  var list = document.getElementById("pub-list");
  if (!list) return;

  var chips = Array.prototype.slice.call(document.querySelectorAll(".filter-chip"));
  var rows = Array.prototype.slice.call(list.querySelectorAll(".pub-row"));
  var groupHeaders = Array.prototype.slice.call(list.querySelectorAll(".pub-group-header"));
  var yearHeaders = Array.prototype.slice.call(list.querySelectorAll(".pub-year-header"));
  var emptyMsg = document.getElementById("pub-empty");

  function paramsFromUrl() {
    var params = new URLSearchParams(window.location.search);
    return {
      line: params.get("line") || "all",
      type: params.get("type") || "all"
    };
  }

  function applyFilter(state) {
    chips.forEach(function (chip) {
      var isMatch =
        (chip.dataset.filterKind === "all" && state.line === "all" && state.type === "all") ||
        (chip.dataset.filterKind === "line" && chip.dataset.filterValue === state.line) ||
        (chip.dataset.filterKind === "type" && chip.dataset.filterValue === state.type);
      chip.setAttribute("aria-pressed", isMatch ? "true" : "false");
    });

    var visibleCount = 0;
    rows.forEach(function (row) {
      var lines = (row.dataset.lines || "").split(",");
      var type = row.dataset.type;
      var lineOk = state.line === "all" || lines.indexOf(state.line) !== -1;
      var typeOk = state.type === "all" || type === state.type;
      var visible = lineOk && typeOk;
      row.hidden = !visible;
      if (visible) visibleCount++;
    });

    // Hide year headers that have no visible rows before the next header of any kind
    yearHeaders.forEach(function (header) {
      var el = header.nextElementSibling;
      var hasVisible = false;
      while (el && !el.classList.contains("pub-group-header") && !el.classList.contains("pub-year-header")) {
        if (el.classList.contains("pub-row") && !el.hidden) hasVisible = true;
        el = el.nextElementSibling;
      }
      header.hidden = !hasVisible;
    });

    // Hide group headers that have no visible rows anywhere before the next group header
    groupHeaders.forEach(function (header) {
      var el = header.nextElementSibling;
      var hasVisible = false;
      while (el && !el.classList.contains("pub-group-header")) {
        if (el.classList.contains("pub-row") && !el.hidden) hasVisible = true;
        el = el.nextElementSibling;
      }
      header.hidden = !hasVisible;
    });

    if (emptyMsg) emptyMsg.hidden = visibleCount !== 0;
  }

  function setState(state, pushUrl) {
    if (pushUrl) {
      var params = new URLSearchParams();
      if (state.line !== "all") params.set("line", state.line);
      if (state.type !== "all") params.set("type", state.type);
      var qs = params.toString();
      var newUrl = window.location.pathname + (qs ? "?" + qs : "");
      window.history.replaceState(null, "", newUrl);
    }
    applyFilter(state);
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var state = paramsFromUrl();
      if (chip.dataset.filterKind === "all") {
        state.line = "all";
        state.type = "all";
      } else if (chip.dataset.filterKind === "line") {
        state.line = chip.dataset.filterValue;
      } else {
        state.type = chip.dataset.filterValue;
      }
      setState(state, true);
    });
  });

  applyFilter(paramsFromUrl());
})();
