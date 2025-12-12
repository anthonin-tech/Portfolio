const phrases = [
  "Je suis étudiant à EPSI.",
  "Je fais actuellement un bachelor en informatique.",
  "Je fais également un BTS SIO.",
  "J'aime beaucoup créer des projets !"
];

const typingElement = document.getElementById("typing");

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let lastTime = 0; 

const typeSpeed = 80;     
const deleteSpeed = 40;
const pauseAfterWrite = 2500; 
const pauseAfterDelete = 500; 

let nextActionTime = 0; 

function loop(currentTime) {
  if (!lastTime) lastTime = currentTime;

  if (currentTime < nextActionTime) {
    requestAnimationFrame(loop);
    return;
  }

  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    if (charIndex > 0) {
      charIndex--;
      nextActionTime = currentTime + deleteSpeed;
    } else {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      nextActionTime = currentTime + pauseAfterDelete;
    }
  } else {
    if (charIndex < currentPhrase.length) {
      charIndex++;
      nextActionTime = currentTime + typeSpeed;
    } else {
      isDeleting = true;
      nextActionTime = currentTime + pauseAfterWrite;
    }
  }

  typingElement.textContent = currentPhrase.substring(0, charIndex);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);