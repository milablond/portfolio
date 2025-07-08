let currentSlide = 0;
const totalSlides = 3;
let gameActive = false;
let gameScore = 0;
let gameTimer = 30;
let gameInterval;
let timerInterval;

// Animation du texte tapé
const subtitle = document.getElementById('subtitle');
const text = 'Développeuse Junior • Paris';
let i = 0;

function typeWriter() {
  if (i < text.length) {
    subtitle.innerHTML += text.charAt(i);
    subtitle.classList.add('typing');
    i++;
    setTimeout(typeWriter, 100);
  }
}

// Démarrage de l'animation après le chargement
window.addEventListener('load', function () {
  setTimeout(typeWriter, 1500);
});

// Animation des sections au scroll
function animateOnScroll() {
  const sections = document.querySelectorAll('section');
  const windowHeight = window.innerHeight;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollTop = window.pageYOffset;

    if (scrollTop > sectionTop - windowHeight + sectionHeight / 3) {
      section.classList.add('visible');

      // Animation des compétences
      if (section.id === 'skills') {
        const skillItems = section.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('animate');
          }, index * 200);
        });
      }
    }
  });
}

// Slider des projets
function updateSlider() {
  const slider = document.getElementById('projectSlider');
  const slideWidth = slider.children[0].offsetWidth + 30; // largeur + margin
  const visibleSlides = Math.floor(
    slider.parentElement.offsetWidth / slideWidth
  );
  const maxSlide = Math.max(0, slider.children.length - visibleSlides);

  if (currentSlide > maxSlide) {
    currentSlide = maxSlide;
  }

  slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

  // Mise à jour des dots
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle(
      'active',
      index === Math.floor(currentSlide / visibleSlides)
    );
  });
}

function nextSlide() {
  const slider = document.getElementById('projectSlider');
  const slideWidth = slider.children[0].offsetWidth + 30;
  const visibleSlides = Math.floor(
    slider.parentElement.offsetWidth / slideWidth
  );
  const maxSlide = Math.max(0, slider.children.length - visibleSlides);

  if (currentSlide < maxSlide) {
    currentSlide++;
    updateSlider();
  }
}

function previousSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlider();
  }
}

function goToSlide(n) {
  currentSlide = n - 1;
  updateSlider();
}

// Jeu
function openGame() {
  const modal = document.getElementById('gameModal');
  modal.classList.add('show');
  resetGame();
}

function closeGame() {
  const modal = document.getElementById('gameModal');
  modal.classList.remove('show');
  if (gameActive) {
    endGame();
  }
}

function startGame() {
  gameActive = true;
  gameScore = 0;
  gameTimer = 30;
  updateGameDisplay();
  moveTarget();

  timerInterval = setInterval(() => {
    gameTimer--;
    updateGameDisplay();
    if (gameTimer <= 0) {
      endGame();
    }
  }, 1000);
}

function resetGame() {
  gameScore = 0;
  gameTimer = 30;
  updateGameDisplay();
}

function endGame() {
  gameActive = false;
  clearInterval(timerInterval);
  clearInterval(gameInterval);

  if (gameTimer <= 0) {
    alert(`Jeu terminé ! Score final : ${gameScore}`);
  }
}

function moveTarget() {
  if (!gameActive) return;

  const target = document.getElementById('target');
  const gameArea = document.getElementById('gameArea');
  const maxX = gameArea.offsetWidth - target.offsetWidth;
  const maxY = gameArea.offsetHeight - target.offsetHeight;

  const newX = Math.random() * maxX;
  const newY = Math.random() * maxY;

  target.style.left = newX + 'px';
  target.style.top = newY + 'px';

  gameInterval = setTimeout(moveTarget, 1500);
}

function updateGameDisplay() {
  document.getElementById('score').textContent = gameScore;
  document.getElementById('timer').textContent = gameTimer;
}

// Event listeners
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('resize', updateSlider);

// Clic sur la cible
document.getElementById('target').addEventListener('click', function () {
  if (gameActive) {
    gameScore++;
    updateGameDisplay();
    clearTimeout(gameInterval);
    moveTarget();
  }
});

// Fermeture du modal en cliquant à l'extérieur
document.getElementById('gameModal').addEventListener('click', function (e) {
  if (e.target === this) {
    closeGame();
  }
});

// Initialisation
document.addEventListener('DOMContentLoaded', function () {
  animateOnScroll();
  updateSlider();
});
