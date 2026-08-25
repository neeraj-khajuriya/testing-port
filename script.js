/* ============================================================
   TECHNOMITIC — Interactive Features & Application Logic
   Clean Dynamic Cursor · Portfolio Filter · Animated Counters
   Interactive FAQ · On-Site Project Estimator Modal · 60 FPS
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // 1. SIMPLE & MINIMAL DYNAMIC CURSOR (With 10% Reactive Scale)
  // ============================================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.innerWidth >= 992) {
    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let prevMouseX = -100, prevMouseY = -100;
    let isMoving = false;
    let stopTimeout = null;
    let currentMode = '';

    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isMoving) {
        isMoving = true;
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
      }

      const deltaX = mouseX - prevMouseX;
      const deltaY = mouseY - prevMouseY;
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      if (speed > 1.5 && !currentMode) {
        cursorRing.classList.add('is-moving');
        cursorDot.classList.add('is-moving');
      }

      clearTimeout(stopTimeout);
      stopTimeout = setTimeout(function () {
        cursorRing.classList.remove('is-moving');
        cursorDot.classList.remove('is-moving');
      }, 100);

      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    }, { passive: true });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    document.addEventListener('mouseover', function (e) {
      const target = e.target;

      // 1. Buttons, CTAs, Modal Chips & Inputs
      if (target.closest('.btn, button, .navbar__hamburger, .filter-btn, .modal__close, .chip, .modal__chip, input, textarea, select')) {
        setCursorState('cursor--btn');
      }
      // 2. Tech / Skill Chips (Neon cyan focus)
      else if (target.closest('.tech-item, .hero__tag, .experience__tag, .portfolio__badge')) {
        setCursorState('cursor--chip');
      }
      // 3. Cards / Boxes (Portfolio, Capabilities, About, Process, Testimonials, Stats, FAQ, Team, Contact)
      else if (target.closest('.portfolio__item, .capability-card, .about-card, .process__step, .testimonial-card, .founder-card, .contact-card, .footer-cta, .faq-item, .stat-card')) {
        setCursorState('cursor--card');
      }
      // 4. Images & Avatars
      else if (target.closest('.hero__avatar, .founder-card__image-box img, .capability-card__img, .process__step-icon')) {
        setCursorState('cursor--media');
      }
      // 5. Navigation Links, Social Buttons & Anchors
      else if (target.closest('a, .contact__social-icon-btn, .footer__social, .official-channels-bottom__btn')) {
        setCursorState('cursor--link');
      }
    }, { passive: true });

    document.addEventListener('mouseout', function (e) {
      const target = e.target;
      if (target.closest('.btn, button, .portfolio__item, .capability-card, .about-card, .process__step, .testimonial-card, .founder-card, .contact-card, .footer-cta, .faq-item, .stat-card, .tech-item, .hero__tag, .experience__tag, .portfolio__badge, a, img, .navbar__hamburger, .filter-btn, .modal__close, .chip, .modal__chip, input, textarea, select, .contact__social-icon-btn, .footer__social, .official-channels-bottom__btn')) {
        resetCursorState();
      }
    }, { passive: true });

    function setCursorState(className) {
      currentMode = className;
      cursorRing.className = 'cursor-ring ' + className;
      cursorDot.className = 'cursor-dot ' + className;
    }

    function resetCursorState() {
      currentMode = '';
      cursorRing.className = 'cursor-ring';
      cursorDot.className = 'cursor-dot';
    }
  }

  // ============================================================
  // 2. INTERACTIVE CARD SPOTLIGHT GLOW & 15% SCALE 3D TILT
  // ============================================================
  if (window.innerWidth >= 992) {
    const spotlightCards = document.querySelectorAll(
      '.portfolio__item, .capability-card, .about-card, .process__step, .testimonial-card, .founder-card, .contact-card, .footer-cta, .stat-card, .faq-item'
    );

    spotlightCards.forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        card.style.setProperty('--spotlight-opacity', '1');
      });

      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        const rotateX = (deltaY * -4.2).toFixed(2);
        const rotateY = (deltaX * 4.2).toFixed(2);

        card.style.transform = 'perspective(900px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px) scale3d(1.12, 1.12, 1.12)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.setProperty('--spotlight-opacity', '0');
        card.style.transform = '';
      });
    });

    // Magnetic micro-interaction for interactive buttons and pills (15% scale-up)
    const magneticElements = document.querySelectorAll(
      '.btn, .official-channels-bottom__btn, .footer__social, .filter-btn, .modal__close, .navbar__hamburger, .mobile-menu__close, .mobile-menu__social-btn'
    );

    magneticElements.forEach(function (elem) {
      elem.addEventListener('mousemove', function (e) {
        const rect = elem.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.22;
        const deltaY = (e.clientY - centerY) * 0.22;

        elem.style.transform = 'translate(' + deltaX.toFixed(1) + 'px, ' + (deltaY - 4).toFixed(1) + 'px) scale(1.15)';
      });

      elem.addEventListener('mouseleave', function () {
        elem.style.transform = '';
      });
    });
  }

  // ============================================================
  // 3. INTERACTIVE CASE STUDY FILTER TABS
  // ============================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio__item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(function (item) {
        const categories = item.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.indexOf(filterValue) !== -1) {
          item.classList.remove('is-hidden');
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(function () {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 30);
        } else {
          item.classList.add('is-hidden');
        }
      });
    });
  });

  // ============================================================
  // 4. ANIMATED STAT COUNTERS
  // ============================================================
  const statsSection = document.getElementById('statsSection');
  let countersAnimated = false;

  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    statsObserver.observe(statsSection);
  } else {
    animateCounters();
  }

  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(function (counter) {
      const target = parseFloat(counter.getAttribute('data-target'));
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
      const duration = 1800; // ms
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = easeOutProgress * target;

        counter.textContent = decimals > 0 ? currentVal.toFixed(decimals) : Math.floor(currentVal);

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = decimals > 0 ? target.toFixed(decimals) : target;
        }
      }
      requestAnimationFrame(updateNumber);
    });
  }

  // ============================================================
  // 5. INTERACTIVE FAQ ACCORDION
  // ============================================================
  const faqQuestions = document.querySelectorAll('.faq-item__question');
  faqQuestions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-item__answer');
      const isOpen = item.classList.contains('is-open');

      // Close other open items
      document.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
          openItem.querySelector('.faq-item__answer').style.maxHeight = null;
        }
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        item.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      }
    });
  });

  // ============================================================
  // 6. ON-SITE PROJECT ESTIMATOR MODAL
  // ============================================================
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const openModalBtns = document.querySelectorAll('.js-open-modal');
  const projectForm = document.getElementById('projectForm');
  const formSuccess = document.getElementById('formSuccess');

  function openModal() {
    if (!projectModal) return;
    projectModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!projectModal) return;
    projectModal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('is-active')) {
      closeModal();
    }
  });



  window.handleFormSubmit = function (e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending to Inbox...</span>';
    }

    const formData = new FormData(projectForm);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      if (result.success) {
        showSuccess();
      } else {
        console.warn('Web3Forms response:', result);
        showSuccess();
      }
    })
    .catch(function (error) {
      console.warn('Submission network fallback:', error);
      showSuccess();
    });

    function showSuccess() {
      if (projectForm && formSuccess) {
        projectForm.reset();
        submitBtn.style.display = 'none';
        formSuccess.style.display = 'block';
        setTimeout(function () {
          closeModal();
          setTimeout(function () {
            formSuccess.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Submit Project Inquiry</span><span class="btn__icon"><svg class="icon-arrow" viewBox="0 0 17 17"><path d="M3 8.5L14 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.5 13L14 8.5L9.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
          }, 400);
        }, 3400);
      }
    }
  };

  // ============================================================
  // 7. NAVBAR SCROLL MORPH
  // ============================================================
  const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
  if (navbar) {
    let isScrolled = false;
    function handleScroll() {
      const scrolled = window.scrollY > 60;
      if (scrolled !== isScrolled) {
        isScrolled = scrolled;
        navbar.classList.toggle('is-scrolled', isScrolled);
        navbar.classList.toggle('scrolled', isScrolled);
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ============================================================
  // 8. DYNAMIC LOCAL TIME (India Time - Asia/Kolkata IST UTC+5:30)
  // ============================================================
  function updateLocalTime() {
    const localTimeEl = document.getElementById('localTimeDisplay');
    if (!localTimeEl) return;
    try {
      const now = new Date();
      const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istMs = utcMs + (5.5 * 3600000);
      const istDate = new Date(istMs);
      
      let hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const seconds = istDate.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      
      const strHours = hours < 10 ? '0' + hours : hours;
      const strMinutes = minutes < 10 ? '0' + minutes : minutes;
      const strSeconds = seconds < 10 ? '0' + seconds : seconds;
      
      localTimeEl.textContent = strHours + ':' + strMinutes + ':' + strSeconds + ' ' + ampm + ' IST';
    } catch (e) {
      console.error('Time update error:', e);
    }
  }
  updateLocalTime();
  setInterval(updateLocalTime, 1000);

  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ============================================================
  // 9. MOBILE MENU
  // ============================================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');

  if (hamburgerBtn && mobileMenu) {
    let isOpen = false;

    function toggleMenu(forceState) {
      if (typeof forceState === 'boolean') {
        isOpen = forceState;
      } else {
        isOpen = !isOpen;
      }
      hamburgerBtn.classList.toggle('open', isOpen);
      mobileMenu.classList.toggle('open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    hamburgerBtn.addEventListener('click', function () { toggleMenu(); });

    if (mobileMenuCloseBtn) {
      mobileMenuCloseBtn.addEventListener('click', function () {
        if (isOpen) toggleMenu(false);
      });
    }

    mobileMenu.querySelectorAll('.mobile-menu__item, .mobile-menu__link, .mobile-menu__cta').forEach(function (item) {
      item.addEventListener('click', function () {
        if (isOpen) toggleMenu(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) toggleMenu(false);
    });
  }

  // ============================================================
  // 10. SMOOTH SCROLL FOR ANCHORS (With Navbar Offset)
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navHeight = navbar ? navbar.offsetHeight : 80;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - (navHeight - 10);
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ============================================================
  // 11. ULTRA-SMOOTH SCROLL REVEAL (Intersection Observer + Mobile Optimization)
  // ============================================================
  if ('IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll(
      '.portfolio__item, .capability-card, .about-card, .process__step, .testimonial-card, .founder-card, .contact-card, .capabilities__featured, .footer-cta, .faq-item, .stat-card, .official-channels-bottom'
    );

    const isMobile = window.innerWidth < 768;
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: isMobile ? '120px 0px 120px 0px' : '0px 0px -20px 0px',
      threshold: isMobile ? 0 : 0.06
    });

    revealElements.forEach(function (el, index) {
      el.classList.add('reveal-init');
      // Stagger slight transition delay on desktop for cards in a row
      if (!isMobile && el.parentElement) {
        const siblingIndex = Array.from(el.parentElement.children).indexOf(el);
        if (siblingIndex >= 0 && siblingIndex < 6) {
          el.style.transitionDelay = (siblingIndex * 0.07) + 's';
        }
      }
      observer.observe(el);
    });

    // Safety fallback: Ensure all elements are visible after 1.8s in case of fast scroll/edge cases
    setTimeout(function () {
      revealElements.forEach(function (el) {
        if (!el.classList.contains('in-view')) {
          el.classList.add('in-view');
        }
      });
    }, 1800);
  } else {
    // Fallback for browsers without IntersectionObserver
    document.querySelectorAll(
      '.portfolio__item, .capability-card, .about-card, .process__step, .testimonial-card, .founder-card, .contact-card, .capabilities__featured, .footer-cta, .faq-item, .stat-card, .official-channels-bottom'
    ).forEach(function (el) {
      el.classList.add('in-view');
    });
  }
})();

