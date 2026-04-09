let currentSlide = 1;
let popCount = 0;
let gameMusic = null;
let slideMusic = null;
let isSlideMusicPlaying = false;

function playClick() {
    const sound = document.getElementById("clickSound");
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(err => console.log("Click sound failed:", err));
    }
}

function showVideoPopup() {
    const popup = document.getElementById("videoPopup");
    if (popup) {
        popup.style.display = 'flex';
    }
}

function closeVideoPopup() {
    const popup = document.getElementById("videoPopup");
    if (popup) {
        popup.style.display = 'none';
    }
}

function nextSlide() {
   const current = document.getElementById(`slide${currentSlide}`);
   if (current) {
      const videos = current.querySelectorAll('video');
      videos.forEach(video => {
         video.pause();
         video.currentTime = 0;
      });
      current.classList.remove('active');
   }
   currentSlide++;
   const next = document.getElementById(`slide${currentSlide}`);
   if (next) next.classList.add('active');
}

function goToSlide(slideNumber) {
   const current = document.getElementById(`slide${currentSlide}`);
   if (current) {
      const videos = current.querySelectorAll('video');
      videos.forEach(video => {
         video.pause();
         video.currentTime = 0;
      });
      current.classList.remove('active');
   }
   currentSlide = slideNumber;
   const next = document.getElementById(`slide${currentSlide}`);
   if (next) next.classList.add('active');
}

function randomizeButtonPosition() {
    const btn = document.getElementById("balloonBtn");
    if (!btn) return;
    
    const gameBox = document.querySelector(".game-box");
    if (!gameBox) return;
    
    const gameBoxRect = gameBox.getBoundingClientRect();
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;
    const boxPadding = 20;
    
    const maxX = gameBoxRect.width - btnWidth - boxPadding;
    const maxY = gameBoxRect.height - btnHeight - boxPadding - 60;
    
    const randomX = Math.random() * Math.max(0, maxX);
    const randomY = Math.random() * Math.max(0, maxY);
    
    btn.style.position = "absolute";
    btn.style.left = randomX + "px";
    btn.style.top = randomY + "px";
}

function startGame() {
   popCount = 0;
   document.getElementById('popCounter').textContent = '0';
   document.getElementById('popupGame').style.display = 'flex';
   
   setTimeout(() => {
      randomizeButtonPosition();
   }, 10);
}

function closeGame() {
   document.getElementById('popupGame').style.display = 'none';
   popCount = 0;
}

function popBalloon() {
   popCount++;
   document.getElementById('popCounter').textContent = popCount;
   
   if (popCount < 19) {
      randomizeButtonPosition();
   } else {
      document.getElementById('popupGame').style.display = 'none';
      goToSlide(4);
   }
}

let heartCount = 0;
const maxHearts = 20;

function createHeart() {
   if (heartCount >= maxHearts) return;
   
   const heart = document.createElement('div');
   heart.className = 'heart';
   heart.innerHTML = '💖';
   // Position on the right side, slightly randomized vertically
   heart.style.right = '20px';
   heart.style.top = (Math.random() * 60 + 20) + 'vh'; // Random between 20vh and 80vh
   document.body.appendChild(heart);
   heartCount++;
   
   setTimeout(() => {
      heart.remove();
      heartCount--;
   }, 6000);
}

function exitWindow() {
   window.close();
}

setInterval(createHeart, 2000);