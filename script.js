/* ============================================================
   TECHNOMITIC — Interactive Features & Mouse Animations
   WebGL Fluid + 3D Magnetic Card Tilt + Custom Cursor + Scroll Reveal
   60 FPS · Zero Bloat
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // 1. CUSTOM CURSOR & MAGNETIC HOVER
  // ============================================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.innerWidth >= 992) {
    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let isMoving = false;

    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
      }
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    }, { passive: true });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover effect on interactive elements
    const interactiveSelectors = 'a, button, .btn, .portfolio__item, .capability-card, .process__step, .founder-item, .testimonial-card';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(interactiveSelectors)) {
        cursorDot.classList.add('hovering');
        cursorRing.classList.add('hovering');
      }
    }, { passive: true });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(interactiveSelectors)) {
        cursorDot.classList.remove('hovering');
        cursorRing.classList.remove('hovering');
      }
    }, { passive: true });
  }

  // ============================================================
  // 2. 3D CARD TILT ON MOUSE MOVE (Interactive Depth)
  // ============================================================
  if (window.innerWidth >= 992) {
    const tiltCards = document.querySelectorAll('.portfolio__item, .capability-card, .process__step, .founder-item__image-box');

    tiltCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / centerX; // -1 to 1
        const deltaY = (y - centerY) / centerY; // -1 to 1

        const rotateX = deltaY * -6; // max 6deg
        const rotateY = deltaX * 6;  // max 6deg

        card.style.transform = 'perspective(800px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-4px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  // ============================================================
  // 3. NAVBAR SCROLL MORPH
  // ============================================================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let isScrolled = false;
    function handleScroll() {
      const scrolled = window.scrollY > 80;
      if (scrolled !== isScrolled) {
        isScrolled = scrolled;
        navbar.classList.toggle('scrolled', isScrolled);
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ============================================================
  // 4. DYNAMIC LOCAL TIME (UTC+5 Offset - Matching Original Site)
  // ============================================================
  const localTimeEl = document.getElementById('localTimeDisplay');
  function updateLocalTime() {
    if (!localTimeEl) return;
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const targetDate = new Date(utc + (3600000 * 5)); // +5 offset
    let hours = targetDate.getHours();
    let minutes = targetDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    const strHours = hours < 10 ? '0' + hours : hours;
    localTimeEl.textContent = strHours + ':' + strMinutes + ' ' + ampm;
  }
  updateLocalTime();
  setInterval(updateLocalTime, 30000);

  // Dynamic Current Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ============================================================
  // 5. MOBILE MENU
  // ============================================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburgerBtn && mobileMenu) {
    let isOpen = false;

    function toggleMenu() {
      isOpen = !isOpen;
      hamburgerBtn.classList.toggle('open', isOpen);
      mobileMenu.classList.toggle('open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    hamburgerBtn.addEventListener('click', toggleMenu);

    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (isOpen) toggleMenu();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) toggleMenu();
    });
  }

  // ============================================================
  // 6. SMOOTH SCROLL FOR ANCHORS
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ============================================================
  // 7. SMOOTH SCROLL REVEAL (Intersection Observer)
  // ============================================================
  if ('IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.portfolio__item, .capability-card, .process__step, .testimonial-card, .founder-item');

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(function (el) {
      el.classList.add('reveal-init');
      observer.observe(el);
    });
  }
})();
