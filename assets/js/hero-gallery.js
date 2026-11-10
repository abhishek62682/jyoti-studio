/* Hero: draggable infinite masonry with periodic auto-slide */
(function () {
  var images = [
    "strip-1.jpg","strip-2.jpg","strip-3.jpg","strip-4.jpg","strip-5.jpg",
    "strip-6.jpg","strip-7.jpg","strip-8.jpg","strip-9.jpg","strip-10.jpg"
  ];
  var base = "./assets/img/hero-strip/";

  // ---- tunables ----
  var DRAG_GAIN = 1.35;     // >1 = lighter drag (image moves further than finger). 1 = exact 1:1
  var DRAG_SMOOTH = 0.35;   // 0.2 = silky/soft, 0.6 = tight/direct
  var FRICTION = 0.955;     // glide after release (0.92 stops sooner, 0.97 glides far)
  var MAX_FLING = 4;        // max fling speed, px per ms
  var AUTO_STEP = 0.20;     // each auto-slide moves 20% of the screen width
  var AUTO_PAUSE = 2500;    // ms of rest between auto-slides (also the wait after you touch it)
  var AUTO_TIME = 1000;     // ms one auto-slide glide takes
  // ------------------

  var columns = [
    { grow: [55, 45] }, { grow: [45, 55] }, { grow: [58, 42] },
    { grow: [42, 58] }, { grow: [50, 50] }
  ];

  var viewport = document.querySelector(".hero2__viewport");
  var track = document.getElementById("hero2Track");
  var hero = document.querySelector(".hero2");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 2 identical sets (one set is wider than the screen, so no gap ever shows).
  // Fewer images in the DOM = lighter, smoother dragging.
  var n = 0;
  function buildSet(isClone) {
    columns.forEach(function (def) {
      var col = document.createElement("div");
      col.className = "hero2-col";
      if (isClone) col.setAttribute("aria-hidden", "true");
      def.grow.forEach(function (grow) {
        var img = document.createElement("img");
        img.src = base + images[(n++) % images.length];
        img.alt = "";
        img.draggable = false;
        img.decoding = "async";   // eager (not lazy) so nothing pops in while dragging
        img.style.flexGrow = grow;
        col.appendChild(img);
      });
      track.appendChild(col);
    });
  }
  buildSet(false);
  n = 0; buildSet(true);

  var cols = track.children;
  var perSet = columns.length;
  var setW = 0, colW = 0;
  function measure() {
    setW = cols[perSet].offsetLeft - cols[0].offsetLeft;
    colW = cols[1].offsetLeft - cols[0].offsetLeft;
  }
  measure();

  // ---- state ----
  var pos = 0;                      // track x, always kept in [-setW, 0]
  var mode = "idle";                // idle | drag | inertia | nudge
  var vel = 0;                      // px per ms
  var pointerDown = false, hovering = false;
  var startX = 0, startPos = 0, dragTarget = 0, lastX = 0, lastT = 0;
  var idleSince = performance.now();
  var tween = null;
  var visible = true;
  var prevT = performance.now();

  function markActive() { idleSince = performance.now(); }

  function wrap() {
    var shift = 0;
    while (pos > 0)     { pos -= setW; shift -= setW; }
    while (pos < -setW) { pos += setW; shift += setW; }
    if (shift) {
      startPos += shift; dragTarget += shift;
      if (tween) { tween.from += shift; tween.to += shift; }
    }
  }

  function ease(t) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2; }

  function tick(now) {
    var dt = Math.min(now - prevT, 50);
    prevT = now;

    if (visible && !document.hidden) {
      if (mode === "drag") {
        // soft follow: removes finger jitter, still feels instant
        var k = 1 - Math.pow(1 - DRAG_SMOOTH, dt / 16.67);
        pos += (dragTarget - pos) * k;
      } else if (mode === "inertia") {
        pos += vel * dt;
        vel *= Math.pow(FRICTION, dt / 16.67);
        if (Math.abs(vel) < 0.02) { mode = "idle"; vel = 0; markActive(); }
      } else if (mode === "nudge") {
        var p = Math.min((now - tween.t0) / AUTO_TIME, 1);
        pos = tween.from + (tween.to - tween.from) * ease(p);
        if (p >= 1) { mode = "idle"; tween = null; markActive(); }
      } else if (mode === "idle") {
        // untouched for AUTO_PAUSE -> slide exactly AUTO_STEP of the screen, then rest again
        if (!reduceMotion && !pointerDown && now - idleSince > AUTO_PAUSE) {
          tween = { from: pos, to: pos - viewport.clientWidth * AUTO_STEP, t0: now };
          mode = "nudge";
        }
      }
      wrap();
      track.style.transform = "translate3d(" + pos.toFixed(2) + "px,0,0)";
    }
    requestAnimationFrame(tick);
  }

  // ---- drag ----
  viewport.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointerDown = true;
    mode = "drag";               // instantly stops auto-slide / inertia
    tween = null;
    vel = 0;
    startX = lastX = e.clientX;
    startPos = dragTarget = pos;
    lastT = performance.now();
    viewport.classList.add("is-dragging");
    try { viewport.setPointerCapture(e.pointerId); } catch (_) {}
  });

  viewport.addEventListener("pointermove", function (e) {
    if (!pointerDown || mode !== "drag") return;
    var now = performance.now();
    dragTarget = startPos + (e.clientX - startX) * DRAG_GAIN;
    var dt = now - lastT;
    if (dt > 0) {
      var inst = ((e.clientX - lastX) * DRAG_GAIN) / dt;
      vel = vel * 0.6 + inst * 0.4;
    }
    lastX = e.clientX; lastT = now;
  });

  function endDrag() {
    if (!pointerDown) return;
    pointerDown = false;
    viewport.classList.remove("is-dragging");
    if (performance.now() - lastT > 80) vel = 0;   // finger paused before lifting: no fling
    vel = Math.max(-MAX_FLING, Math.min(MAX_FLING, vel));
    pos = dragTarget;                               // no jump, continue from where finger left
    if (Math.abs(vel) > 0.05) mode = "inertia";
    else { mode = "idle"; markActive(); }
  }
  viewport.addEventListener("pointerup", endDrag);
  viewport.addEventListener("pointercancel", endDrag);
  viewport.addEventListener("lostpointercapture", endDrag);

  // trackpad / shift+wheel horizontal swipe also moves it (vertical page scroll untouched)
  viewport.addEventListener("wheel", function (e) {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    tween = null; mode = "idle";
    pos -= e.deltaX * DRAG_GAIN;
    markActive();
  }, { passive: false });

  // mouse hover pauses auto-nudge
  viewport.addEventListener("pointerenter", function (e) {
    if (e.pointerType === "mouse") hovering = true;
  });
  viewport.addEventListener("pointerleave", function (e) {
    if (e.pointerType === "mouse") { hovering = false; markActive(); }
  });

  // ---- housekeeping ----
  new IntersectionObserver(function (entries) {
    visible = entries[0].isIntersecting;
    prevT = performance.now();
    markActive();
  }, { threshold: 0.1 }).observe(hero);

  document.addEventListener("visibilitychange", function () {
    prevT = performance.now();
    markActive();
  });

  var rT;
  window.addEventListener("resize", function () {
    clearTimeout(rT);
    rT = setTimeout(function () {
      var oldSet = setW || 1;
      measure();
      var r = setW / oldSet;
      pos *= r; startPos *= r; dragTarget *= r;
      if (tween) { tween.from *= r; tween.to *= r; }
    }, 150);
  });

  requestAnimationFrame(tick);
})();
