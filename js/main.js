/**
 * BANGALORE UNIVERSITY — DEPARTMENT OF ELECTRONIC MEDIA (BUELM)
 * Client-Side Dynamic Interactivity (main.js)
 * Clean, Vanilla ES6+, High-Performance, Accessible
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Mobile Navigation Menu Toggle
  // -------------------------------------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta-btn');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('is-active');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('is-active')) {
          navMenu.classList.remove('is-active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // -------------------------------------------------------------------------
  // 2. Navigation Active State on Scroll (IntersectionObserver)
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const mainNavLinks = document.querySelectorAll('.nav-menu .nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        mainNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));

  // -------------------------------------------------------------------------
  // 3. Academic Programs Tabbed Interface
  // -------------------------------------------------------------------------
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-tab');

      // Update button state
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Update pane state
      tabPanes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 4. Faculty Filter (All / Core / Guest)
  // -------------------------------------------------------------------------
  const facultyFilterBtns = document.querySelectorAll('[data-faculty-filter]');
  const facultyCards = document.querySelectorAll('[data-faculty-type]');

  facultyFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-faculty-filter');

      // Update active button
      facultyFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      facultyCards.forEach(card => {
        const cardType = card.getAttribute('data-faculty-type');
        if (filterValue === 'all' || cardType === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 5. Events & Media Club Filter (All / Lectures / Field Visits / Webinars)
  // -------------------------------------------------------------------------
  const eventFilterBtns = document.querySelectorAll('[data-event-filter]');
  const eventCards = document.querySelectorAll('[data-event-category]');

  eventFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-event-filter');

      eventFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      eventCards.forEach(card => {
        const cardCat = card.getAttribute('data-event-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 6. Animated Statistics Numbers on Scroll
  // -------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let hasAnimatedStats = false;

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 1200; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentVal = Math.floor(progress * target);

        stat.textContent = `${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = `${target}${suffix}`;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const statsSection = document.getElementById('statsBanner');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedStats) {
          hasAnimatedStats = true;
          animateStats();
        }
      });
    }, { threshold: 0.2 });

    statsObserver.observe(statsSection);
  }

  // -------------------------------------------------------------------------
  // 7. Faculty Profile Modal View
  // -------------------------------------------------------------------------
  const modal = document.getElementById('facultyModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalName = document.getElementById('modalFacultyName');
  const modalRole = document.getElementById('modalFacultyRole');
  const modalDept = document.getElementById('modalFacultyDept');
  const modalImg = document.getElementById('modalFacultyImg');
  const modalPdfLink = document.getElementById('modalFacultyPdf');
  const modalDetails = document.getElementById('modalFacultyDetails');

  const openProfileBtns = document.querySelectorAll('[data-view-profile]');

  openProfileBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.faculty-card');
      if (!card) return;

      const name = card.getAttribute('data-name');
      const role = card.getAttribute('data-role');
      const dept = card.getAttribute('data-dept');
      const imgSrc = card.getAttribute('data-img');
      const pdf = card.getAttribute('data-pdf');
      const bio = card.getAttribute('data-bio');

      if (modalName) modalName.textContent = name;
      if (modalRole) modalRole.textContent = role;
      if (modalDept) modalDept.textContent = dept;
      if (modalImg) modalImg.src = imgSrc;
      if (modalDetails) modalDetails.textContent = bio;

      if (modalPdfLink) {
        if (pdf && pdf !== 'none') {
          modalPdfLink.href = pdf;
          modalPdfLink.style.display = 'inline-flex';
        } else {
          modalPdfLink.style.display = 'none';
        }
      }

      if (modal) {
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        closeModal();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 8. Interactive Admission Inquiry Form Handling
  // -------------------------------------------------------------------------
  const inquiryForm = document.getElementById('inquiryForm');
  const formStatus = document.getElementById('formStatus');

  if (inquiryForm && formStatus) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('inquiryName').value.trim();
      const email = document.getElementById('inquiryEmail').value.trim();
      const program = document.getElementById('inquiryProgram').value;
      const message = document.getElementById('inquiryMessage').value.trim();

      if (!name || !email || !program || !message) {
        formStatus.textContent = 'Please fill out all required fields.';
        formStatus.style.display = 'block';
        formStatus.className = 'badge badge-primary';
        return;
      }

      // Successful simulated submission
      formStatus.textContent = `Thank you, ${name}! Your inquiry regarding ${program} has been recorded. Office staff will reply during inquiry hours (10:30 AM – 4:30 PM).`;
      formStatus.style.display = 'block';
      formStatus.className = 'badge badge-accent';
      inquiryForm.reset();

      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 8000);
    });
  }
});
