// ====== ✍️ AQUÍ ESCRIBES TU CARTA ======
const LINK_YOUTUBE = 'https://youtu.be/fvcxGU8C8pw?si=9VDuJrAIhsJIEBi1';
const carta = `Hola Juana,

Sé que nos dejamos de hablar hace rato y no te escribo esto para incomodarte ni para que pienses que quiero amarrarte ni absolutamente nada que tenga que ver con eso.

Primero, feliz cumple atrasado. Sé que no te dije nada y pues tampoco creo que lo hayas esperado  jajaja.

Solo quería decirte que me quedé pensando mucho timepo en ti y la verdad siento que pudimos ser algo mucho mejor. Tal vez en ese momento no fui lo decidido que tú esperabas o no te di lo que esperabas de mí, y no se porque siento que asi lo pude llegar a sentir por que me dejaste sin darme una explicacion pero bueno, te pido perdón de verdad.

No era por falta de ganas, creo que simplemente no estaba en el momento adecuado.

Me gustaba salir contigo, sentir tu presencia a mi lado, contigo me reía mucho y me gustaría que volviéramos a salir un día de estos, sin afanes, sin presiones, solo a parchar no a nada más.

Si te animas, aquí estoy. Si no, todo bien también, te deseo lo mejor.`;
// =======================================

const reproductor = document.querySelector('#final iframe');
const urlYoutube = new URL(LINK_YOUTUBE);
const videoId = urlYoutube.hostname === 'youtu.be'
  ? urlYoutube.pathname.slice(1)
  : urlYoutube.searchParams.get('v') || urlYoutube.pathname.split('/').filter(Boolean).pop();
if (reproductor) {
  reproductor.removeAttribute('src');
  reproductor.loading = 'eager';
}

const pantallas = document.querySelectorAll('.pantalla');
const musica = document.getElementById('musica');
let actual = 0;

// Cambia de pantalla: quita "activa" a la actual y se la pone a la nueva
function mostrar(i) {
  pantallas[actual].classList.remove('activa');
  pantallas[i].classList.add('activa');
  actual = i;

  // Si llegamos a la carta, empieza el efecto de escritura
  if (pantallas[i].id === 'carta') escribirCarta();
}

// Botón inicial: aquí suena la música (el clic permite el audio)
document.getElementById('btnEmpezar').addEventListener('click', () => {
  if (reproductor && videoId) {
    reproductor.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;
  }
  if (!reproductor || !videoId) {
    musica.volume = 0.8;
    musica.play().catch(() => console.log('No se pudo reproducir el audio'));
  }
  mostrar(1);
});

// Todos los botones "Continuar" avanzan a la siguiente pantalla
document.querySelectorAll('.siguiente').forEach(btn => {
  btn.addEventListener('click', () => mostrar(actual + 1));
});

// Efecto máquina de escribir; al terminar muestra la frase y el reproductor
function escribirCarta() {
  const destino = document.getElementById('textoCarta');
  let i = 0;
  const timer = setInterval(() => {
    destino.textContent += carta[i];
    i++;
    destino.scrollTop = destino.scrollHeight;
    if (i >= carta.length) {
      clearInterval(timer);
      setTimeout(() => {
        document.getElementById('final').classList.remove('oculto');
      }, 1200);
    }
  }, 55); // velocidad: más bajo = más rápido
}

// Corazones flotantes de fondo
setInterval(() => {
  const c = document.createElement('span');
  c.className = 'corazon';
  c.textContent = ['💗', '🤍', '💕', '❤️'][Math.floor(Math.random() * 4)];
  c.style.left = Math.random() * 100 + 'vw';
  c.style.fontSize = 14 + Math.random() * 22 + 'px';
  c.style.animationDuration = 6 + Math.random() * 6 + 's';
  document.getElementById('corazones').appendChild(c);
  setTimeout(() => c.remove(), 12000);
}, 700);
