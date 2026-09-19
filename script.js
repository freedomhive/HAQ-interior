(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     MOBILE NAV
  ========================================================= */
  var menuToggle = document.getElementById("menuToggle");
  var mobileNav = document.getElementById("mobile-nav");

  function closeMobileNav() {
    mobileNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }
  function openMobileNav() {
    mobileNav.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
  }

  menuToggle.addEventListener("click", function () {
    var isOpen = mobileNav.classList.contains("is-open");
    if (isOpen) { closeMobileNav(); } else { openMobileNav(); }
  });

  Array.prototype.forEach.call(document.querySelectorAll(".mobile-nav-link, .mobile-nav-cta"), function (link) {
    link.addEventListener("click", closeMobileNav);
  });

  /* =========================================================
     ACTIVE NAV LINK ON SCROLL
  ========================================================= */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = ["top", "about", "skills", "projects", "experience", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function setActiveLink() {
    var scrollPos = window.scrollY + 140;
    var current = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) { current = sec; }
    });
    navLinks.forEach(function (link) {
      var target = link.getAttribute("href").replace("#", "") || "top";
      link.classList.toggle("is-active", target === current.id);
    });
  }
  window.addEventListener("scroll", throttle(setActiveLink, 120), { passive: true });
  setActiveLink();

  function throttle(fn, wait) {
    var last = 0, timer = null;
    return function () {
      var now = Date.now();
      var args = arguments;
      if (now - last >= wait) {
        last = now;
        fn.apply(null, args);
      } else {
        clearTimeout(timer);
        timer = setTimeout(function () { last = Date.now(); fn.apply(null, args); }, wait - (now - last));
      }
    };
  }

  /* =========================================================
     SCROLL REVEAL
  ========================================================= */
  var revealEls = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* =========================================================
     PROJECT DATA + MODAL
  ========================================================= */
  var projects = {
    kumbh: {
      category: "Website \u00b7 Digital Marketing \u00b7 Ecommerce",
      title: "Kumbh Snan",
      overview: "A digital service and ecommerce concept built around Maha Kumbh Nashik 2027, designed for devotees who may not be able to physically attend.",
      role: "Founder / Project Lead \u2014 handled the website, digital marketing direction and business concept end to end.",
      built: [
        "Developed the website and landing-page experience",
        "Worked on digital service positioning",
        "Planned Meta advertising campaigns and audience targeting",
        "Created marketing videos and ad creatives using AI tools",
        "Worked on Meta Pixel and tracking concepts",
        "Developed ecommerce offerings around Ganga Jal",
        "Worked on branding, customer acquisition and business strategy"
      ],
      skills: ["Web Development", "Meta Ads", "Meta Pixel", "AI Content Creation", "Ecommerce", "Branding"],
      learnings: "Learned how to take a concept from idea to a live website, then connect it to a marketing and ecommerce plan built for a real, specific audience.",
      thumbClass: "project-thumb-kumbh",
      live: "https://kumbh-snan.com"
    },
    fashionhood: {
      category: "Ecommerce \u00b7 Web Development \u00b7 UI/UX",
      title: "Fashion Hood",
      overview: "An ecommerce website project focused on building a practical online fashion shopping experience.",
      role: "Project Developer \u2014 built and structured the storefront experience.",
      built: [
        "Built ecommerce website components using HTML, CSS and JavaScript",
        "Worked on product pages, navigation and responsive layouts",
        "Worked on cart functionality",
        "Explored Firebase / Firestore for product and order management",
        "Worked on ecommerce UX and product presentation",
        "Explored digital marketing integration"
      ],
      skills: ["HTML/CSS/JS", "Ecommerce UX", "Firebase / Firestore", "Responsive Design"],
      learnings: "Learned how ecommerce UX decisions \u2014 navigation, product pages, cart flow \u2014 shape usability, and explored Firebase/Firestore for managing product data.",
      thumbClass: "project-thumb-fashion",
      live: null
    },
    freedomstudio: {
      category: "Website \u00b7 Digital Marketing \u00b7 Branding",
      title: "Freedom Studio",
      overview: "A digital services agency concept focused on helping small businesses with websites, marketing and digital growth.",
      role: "Founder \u2014 developed the agency concept, service packages and positioning.",
      built: [
        "Developed the agency concept and service packages",
        "Worked on website development offerings",
        "Worked on Meta Ads and social media marketing services",
        "Worked on branding and creative services",
        "Explored client acquisition strategies",
        "Explored business positioning and growth strategy"
      ],
      skills: ["Branding", "Meta Ads", "Web Development", "Client Acquisition"],
      learnings: "Learned how to think about a digital agency from the business side \u2014 packaging services, positioning offers, and mapping how a small business actually finds and acquires clients.",
      thumbClass: "project-thumb-freedom",
      live: null
    }
  };

  var modal = document.getElementById("projectModal");
  var modalPanel = modal.querySelector(".modal-panel");
  var modalClose = document.getElementById("modalClose");
  var lastFocusedEl = null;

  function fillList(ulEl, items) {
    ulEl.innerHTML = "";
    items.forEach(function (text) {
      var li = document.createElement("li");
      li.textContent = text;
      ulEl.appendChild(li);
    });
  }

  function openModal(key) {
    var data = projects[key];
    if (!data) { return; }

    document.getElementById("modalCategory").textContent = data.category;
    document.getElementById("modalTitle").textContent = data.title;
    document.getElementById("modalOverview").textContent = data.overview;
    document.getElementById("modalRole").textContent = data.role;
    fillList(document.getElementById("modalBuilt"), data.built);
    document.getElementById("modalLearnings").textContent = data.learnings;

    var skillsUl = document.getElementById("modalSkills");
    skillsUl.innerHTML = "";
    data.skills.forEach(function (s) {
      var li = document.createElement("li");
      li.textContent = s;
      skillsUl.appendChild(li);
    });

    var thumb = document.getElementById("modalThumb");
    thumb.className = "modal-thumb " + data.thumbClass;
    document.getElementById("modalThumbLabel").textContent = data.title;

    var liveLink = document.getElementById("modalLiveLink");
    if (data.live) {
      liveLink.href = data.live;
      liveLink.hidden = false;
    } else {
      liveLink.hidden = true;
    }

    lastFocusedEl = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocusedEl) { lastFocusedEl.focus(); }
  }

  Array.prototype.forEach.call(document.querySelectorAll(".js-open-project"), function (btn) {
    btn.addEventListener("click", function () {
      openModal(btn.getAttribute("data-project"));
    });
  });

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) { closeModal(); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) { closeModal(); }
    if (e.key === "Tab" && !modal.hidden) {
      var focusables = modalPanel.querySelectorAll('a[href], button:not([hidden]), [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) { return; }
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* =========================================================
     SUBTLE CUSTOM CURSOR (desktop / fine pointer only)
  ========================================================= */
  var cursorDot = document.getElementById("cursorDot");
  var hasFinePointer = window.matchMedia("(pointer: fine)").matches;

  if (hasFinePointer && !prefersReducedMotion) {
    window.addEventListener("mousemove", function (e) {
      cursorDot.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px) translate(-50%,-50%)";
      cursorDot.classList.add("is-active");
    }, { passive: true });
    document.addEventListener("mouseleave", function () { cursorDot.classList.remove("is-active"); });
  } else if (cursorDot) {
    cursorDot.style.display = "none";
  }

  /* =========================================================
     NOTE FOR MAINTAINER
     Update the GitHub profile URL below once available.
  ========================================================= */
  var githubURL = "https://github.com/"; // TODO: replace with actual GitHub username
  Array.prototype.forEach.call(document.querySelectorAll(".js-github-link"), function (a) {
    a.setAttribute("href", githubURL);
  });

})();
