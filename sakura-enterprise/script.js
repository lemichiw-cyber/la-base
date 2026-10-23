/* ============================================================
   Sakura Enterprise — script.js
   ------------------------------------------------------------
   1. Pétalos de sakura en el hero.
   2. Menú móvil accesible.
   3. Resaltado de la sección activa en la navegación.
   4. Botón flotante de WhatsApp (visible al salir del hero).
   5. Formulario de contacto que prepara un mensaje de WhatsApp.
   6. Año dinámico en el pie de página.
   ============================================================ */

(function () {
  'use strict';

  var WHATSAPP_NUMBER = '50379980884';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var petalsContainer = document.getElementById('petals');

  /* ---------- 1. PÉTALOS ---------- */
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createPetals() {
    if (!petalsContainer || reduceMotion.matches) return;

    var MAX_PETALS = 12;
    var DURATION_MIN = 26;
    var DURATION_MAX = 48;

    petalsContainer.innerHTML = '';

    for (var i = 0; i < MAX_PETALS; i++) {
      var petal = document.createElement('span');
      petal.className = 'petal';

      petal.style.left = random(0, 100).toFixed(2) + '%';

      var size = random(8, 15).toFixed(1);
      petal.style.width = size + 'px';
      petal.style.height = size + 'px';
      petal.style.opacity = random(0.14, 0.3).toFixed(2);

      var duration = random(DURATION_MIN, DURATION_MAX);
      petal.style.animationDuration = duration.toFixed(1) + 's';
      petal.style.animationDelay = (-random(0, duration)).toFixed(1) + 's';

      petalsContainer.appendChild(petal);
    }
  }

  createPetals();

  function handleMotionChange(event) {
    if (event.matches) {
      if (petalsContainer) petalsContainer.innerHTML = '';
    } else {
      createPetals();
    }
  }

  if (typeof reduceMotion.addEventListener === 'function') {
    reduceMotion.addEventListener('change', handleMotionChange);
  } else if (typeof reduceMotion.addListener === 'function') {
    reduceMotion.addListener(handleMotionChange);
  }

  /* ---------- 2. MENÚ MÓVIL ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.getElementById('site-nav');

  function setNavOpen(open) {
    if (!navToggle || !siteNav) return;

    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    siteNav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      setNavOpen(!isOpen);
    });

    siteNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setNavOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setNavOpen(false);
    });

    document.addEventListener('click', function (event) {
      if (!document.body.classList.contains('nav-open')) return;
      if (!event.target.closest('.site-header')) setNavOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) setNavOpen(false);
    });
  }

  /* ---------- 3. SECCIÓN ACTIVA ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.site-nav > a[href^="#"]:not(.btn)')
  );

  var navSections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute('href'));
    })
    .filter(function (section) {
      return section !== null;
    });

  if ('IntersectionObserver' in window && navSections.length > 0) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          navLinks.forEach(function (link) {
            if (link.getAttribute('href') !== '#' + entry.target.id) return;

            link.classList.toggle('is-active', entry.isIntersecting);

            if (entry.isIntersecting) {
              link.setAttribute('aria-current', 'location');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    navSections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ---------- 4. BOTÓN FLOTANTE DE WHATSAPP ---------- */
  var hero = document.querySelector('.hero');
  var whatsappFloat = document.querySelector('.whatsapp-float');

  if (whatsappFloat) {
    if ('IntersectionObserver' in window && hero) {
      var heroObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            whatsappFloat.classList.toggle('is-visible', !entry.isIntersecting);
          });
        },
        { threshold: 0.02 }
      );

      heroObserver.observe(hero);
    } else {
      whatsappFloat.classList.add('is-visible');
    }
  }

  /* ---------- 5. FORMULARIO DE CONTACTO ---------- */
  var contactForm = document.getElementById('contact-form');
  var formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      var nameField = contactForm.elements.namedItem('name');
      var emailField = contactForm.elements.namedItem('email');
      var messageField = contactForm.elements.namedItem('message');

      var name = nameField ? nameField.value.trim() : '';
      var email = emailField ? emailField.value.trim() : '';
      var message = messageField ? messageField.value.trim() : '';

      var text =
        'Hola Sakura Enterprise, soy ' + name + '.\n\n' +
        'Correo: ' + email + '\n\n' +
        'Mensaje: ' + message;

      var whatsappUrl =
        'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);

      /* Abrir con un enlace real evita que el bloqueador de ventanas
         emergentes confunda la apertura con un anuncio. */
      var opener = document.createElement('a');
      opener.href = whatsappUrl;
      opener.target = '_blank';
      opener.rel = 'noopener noreferrer';
      opener.style.display = 'none';
      document.body.appendChild(opener);
      opener.click();
      opener.remove();

      formStatus.textContent = '';
      formStatus.appendChild(
        document.createTextNode('Abriendo WhatsApp con tu mensaje. ')
      );

      var fallback = document.createElement('a');
      fallback.href = whatsappUrl;
      fallback.target = '_blank';
      fallback.rel = 'noopener noreferrer';
      fallback.textContent = 'Si no se abre, haz clic aquí';

      formStatus.appendChild(fallback);
      formStatus.appendChild(document.createTextNode('.'));
    });

    contactForm.addEventListener('input', function () {
      if (formStatus.textContent) formStatus.textContent = '';
    });
  }

  /* ---------- 6. AÑO DEL PIE ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
