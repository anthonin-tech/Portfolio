const phrases = [
  "Je suis étudiant à EPSI.",
  "Je fais actuellement un bachelor SIN.",
  "Je fais également un BTS SIO.",
  "J'aime créer des projets !"
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



const panel = document.getElementById("news-panel");
const current = panel.querySelector(".current");
const next = panel.querySelector(".next");

const projects = [
  { title: "Dernier Projet Réalisé", name: "site e-commerce pour lampe", date: "19/12/2025", icon: "assets/illustration/icone-lampe.png", description: "Création d'un site e-commerce. Nous nous sommes inspirés d'Amazon pour ce projet.", url: "#" },
  { title: "Mon Projet Favoris", name: "site e-commerce pour lampe", date: "19/12/2025", icon: "assets/illustration/icone-lampe.png", description: "C'est mon projet préféré car c'est celui qui se rapproche le plus de ce que j'aime faire sans restriction.", url: "#" }
];

let currentIndex = 0;

function render(project, element) {
  element.innerHTML = `
    <h3>${project.title}</h3><br>
    <h2><strong class="is-underlined">${project.name}</strong> - <span>${project.date}</span></h2><br>
    <img src="${project.icon}" style="cursor:pointer; width:128px; height:128px;" /><br>
    <p>${project.description}</p>
  `;
  const icon = element.querySelector("img");
  icon.onclick = () => window.open(project.url, "_blank");
}

render(projects[currentIndex], current);
current.classList.add("show");

setInterval(() => {
  const nextIndex = (currentIndex + 1) % projects.length;

  render(projects[nextIndex], next);
  next.classList.add("show");

  setTimeout(() => {
    current.classList.remove("show");

    const temp = current.innerHTML;
    current.innerHTML = next.innerHTML;
    current.classList.add("show");
    next.classList.remove("show");
    next.innerHTML = "";
  }, 500);

  currentIndex = nextIndex;
}, 6000);





