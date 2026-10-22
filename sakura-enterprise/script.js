/* ============================================================
   Sakura Enterprise — script.js
   ------------------------------------------------------------
   Única responsabilidad: crear los pétalos de sakura que caen
   en el hero. Máximo 12, opacidad baja, caída muy lenta.
   Si el usuario tiene activado "reducir movimiento"
   (prefers-reduced-motion), no se crea ningún pétalo.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Configuración editable ---------- */
  var MAX_PETALES = 12;        // máximo de pétalos en pantalla
  var DURACION_MIN = 26;       // segundos que tarda un pétalo en caer
  var DURACION_MAX = 48;       // rango para que no caigan todos a la vez

  var contenedor = document.getElementById('petals');
  if (!contenedor) return;

  /* ---------- Respetar prefers-reduced-motion ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches) return;   // sin pétalos si el usuario lo pide

  /* ---------- Utilidad: número aleatorio en un rango ---------- */
  function azar(min, max) {
    return Math.random() * (max - min) + min;
  }

  /* ---------- Crear los pétalos ---------- */
  for (var i = 0; i < MAX_PETALES; i++) {
    var petalo = document.createElement('span');
    petalo.className = 'petal';

    // Posición horizontal aleatoria y tamaño ligeramente distinto
    petalo.style.left = azar(0, 100).toFixed(2) + '%';
    var tamano = azar(8, 15).toFixed(1);
    petalo.style.width = tamano + 'px';
    petalo.style.height = tamano + 'px';

    // Opacidad baja y variada
    petalo.style.opacity = azar(0.14, 0.30).toFixed(2);

    // Caída muy lenta, con retraso negativo para que ya estén a mitad
    // de su recorrido cuando cargue la página (no aparecen todos juntos)
    var duracion = azar(DURACION_MIN, DURACION_MAX);
    petalo.style.animationDuration = duracion.toFixed(1) + 's';
    petalo.style.animationDelay = (-azar(0, duracion)).toFixed(1) + 's';

    contenedor.appendChild(petalo);
  }

  /* ---------- Si el usuario cambia la preferencia en caliente ---------- */
  reduceMotion.addEventListener('change', function (e) {
    if (e.matches) {
      contenedor.innerHTML = '';   // quita los pétalos
    }
  });
})();
