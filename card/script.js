const cards = document.querySelectorAll('.card');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const startBtn = document.getElementById('startBtn');

let currentCard = 0;
let audioTimeout;

function showCard(index) {
  // Clear any pending audio play timeout
  if (audioTimeout) {
    clearTimeout(audioTimeout);
  }

  // Stop all media and deactivate cards
  cards.forEach(card => {
    card.classList.remove('active');

    const audio = card.querySelector('audio');
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    const video = card.querySelector('video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  });

  // Activate new card
  cards[index].classList.add('active');

  const audio = cards[index].querySelector('audio');
  const video = cards[index].querySelector('video');

  // Play media accordingly
  if (audio && !video) {
    audioTimeout = setTimeout(() => audio.play(), 1500);
  }
  if (video) {
    video.play();
  }

  currentCard = index;

  // Toggle next button visibility
  if (currentCard === cards.length - 1) {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = '';
  }

  if (currentCard === 0) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  } else {
    prevBtn.style.display = '';
  }
}



startBtn.addEventListener('click', () => {
  showCard(1);
});

nextBtn.addEventListener('click', () => {
  if (currentCard < cards.length - 1) {
    showCard(currentCard + 1);
  }
});

prevBtn.addEventListener('click', () => {
  if (currentCard > 0) {
    showCard(currentCard - 1);
  }
});

document.addEventListener('DOMContentLoaded', () => {

  // Initialize the first card
  showCard(0);
});
