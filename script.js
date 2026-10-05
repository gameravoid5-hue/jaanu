/* ==========================================
   1. Music Controller (User Interaction Safe)
   ========================================== */
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const musicLabel = document.getElementById('music-label');
let isPlaying = false;

function toggleMusic() {
  if (isPlaying) {
    bgMusic.pause();
    isPlaying = false;
    musicBtn.classList.remove('playing');
    musicLabel.textContent = 'Play Music 🎵';
  } else {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicBtn.classList.add('playing');
      musicLabel.textContent = 'Pause Music 🎶';
    }).catch(() => {
      musicLabel.textContent = 'Add music.mp3 🎵';
    });
  }
}

musicBtn.addEventListener('click', toggleMusic);

/* ==========================================
   2. Floating Background Hearts & Petals
   ========================================== */
const particlesContainer = document.getElementById('particles-container');
let particleSymbols = ['❤️', '💕', '✨', '🌸'];

function spawnFloatingParticle() {
  const item = document.createElement('div');
  item.className = 'floating-item';
  item.textContent = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];

  const leftPos = Math.random() * 100;
  const size = 14 + Math.random() * 16;
  const duration = 7 + Math.random() * 6;

  item.style.left = `${leftPos}vw`;
  item.style.fontSize = `${size}px`;
  item.style.animationDuration = `${duration}s`;

  particlesContainer.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, duration * 1000);
}

setInterval(spawnFloatingParticle, 750);

/* ==========================================
   3. Heart Burst Particle Transition Effect
   ========================================== */
function createHeartBurst(x, y, count = 16) {
  const emojis = ['❤️', '💖', '💕', '✨', '🌹'];
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'burst-heart';
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.5);
    const distance = 60 + Math.random() * 110;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const rot = -45 + Math.random() * 90;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    particle.style.setProperty('--rot', `${rot}deg`);

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 1000);
  }
}

/* ==========================================
   4. Step Navigation & Section Interactions
   ========================================== */
function goToStep(stepNumber, event) {
  if (event) {
    createHeartBurst(event.clientX, event.clientY, 14);
  }

  document.querySelectorAll('.step-card').forEach(card => {
    card.classList.remove('active');
  });

  const target = document.getElementById(`step-${stepNumber}`);
  if (target) {
    target.classList.add('active');
  }

  // Enhance final section with extra rose petals
  if (stepNumber === 7) {
    particleSymbols = ['❤️', '🌹', '🌸', '💖', '✨'];
  }
}

// Step 1: Welcome Click
function handleWelcomeClick(event) {
  goToStep(2, event);
}

// Step 2: Flirty Question Answers (Roman Hindi)
function answerFlirtyQuestion(choice, event) {
  createHeartBurst(event.clientX, event.clientY, 12);
  const responseBox = document.getElementById('flirty-response');
  const nextGroup = document.getElementById('step-2-next');

  if (choice === 1) {
    responseBox.innerHTML = "Acha ji? Itna bhola banne ki acting mat karo, is ada pe toh main aur fida ho gaya 🙈❤️";
  } else {
    responseBox.innerHTML = "Uff... itna smooth jawaab! Ab kya jaan logi meri? 😌💕";
  }

  responseBox.style.display = 'block';
  nextGroup.style.display = 'flex';
}

/* ==========================================
   5. Step 3: Flirty Compliments + Her Photos
   ========================================== */
const complimentsData = [
  {
    text: "Tumhari yeh smile bilkul unfair hai yaar, seedha dil pe lagti hai 😭❤️",
    img: "7.jpg"
  },
  {
    text: "Ab tum hi batao, jab tum itni pyari lagogi toh mera kisi aur kaam me dhyan kaise lagega? 👀✨",
    img: "8.jpg"
  },
  {
    text: "Sach bolun toh poore phone me tumhara message hi meri sabse favorite notification hai 😌💕",
    img: "9.jpg"
  },
  {
    text: "Warning: Tumhare baare me sochte hi mere chehre pe apne aap smile aa jaati hai 🥰",
    img: "10.jpg"
  },
  {
    text: "Waise... abhi ke abhi tum mujhe ek cute si smile udhaar deti ho, jaldi se muskurao! 😏❤️",
    img: "11.jpg"
  }
];

let complimentIndex = 1; // Starts at 1 since index 0 (7.jpg) is already shown on load

function revealNextCompliment(event) {
  createHeartBurst(event.clientX, event.clientY, 12);

  if (complimentIndex < complimentsData.length) {
    // Move previous line into the mini history list below
    const prevText = complimentsData[complimentIndex - 1].text;
    const historyContainer = document.getElementById('compliments-container');
    const historyItem = document.createElement('div');
    historyItem.className = 'compliment-item';
    historyItem.textContent = `✓ ${prevText}`;
    historyContainer.appendChild(historyItem);

    // Update featured card with new photo + flirty line
    const currentItem = complimentsData[complimentIndex];
    const card = document.getElementById('featured-compliment-card');
    const imgEl = document.getElementById('compliment-img');
    const textEl = document.getElementById('compliment-text');

    // Re-trigger animation smoothly
    card.style.animation = 'none';
    card.offsetHeight; // trigger reflow
    card.style.animation = 'popIn 0.45s ease forwards';

    // Dynamic fallback: agar image na mile toh 9:16 placeholder me uska sahi naam (8.jpg, 9.jpg etc.) dikhaye
    imgEl.onerror = function() {
      this.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="360" height="640"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%236e142b"/><stop offset="100%" stop-color="%232b0912"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g)"/><text x="50%" y="46%" font-size="48" text-anchor="middle">😍✨</text><text x="50%" y="56%" font-family="sans-serif" font-size="18" fill="%23ffb3c6" text-anchor="middle">${currentItem.img}</text></svg>`;
    };

    imgEl.src = currentItem.img;
    textEl.textContent = `"${currentItem.text}"`;

    complimentIndex++;
    document.getElementById('compliment-counter').textContent =
      `${complimentIndex} of ${complimentsData.length} revealed`;
  }

  if (complimentIndex >= complimentsData.length) {
    document.getElementById('more-compliment-btn').style.display = 'none';
    document.getElementById('to-gallery-btn').style.display = 'inline-flex';
  }
}

// Step 5: Love Letter Envelope Open
function openLoveLetter(event) {
  createHeartBurst(event.clientX, event.clientY, 18);
  document.getElementById('envelope-closed').style.display = 'none';
  document.getElementById('letter-opened').style.display = 'block';
  document.getElementById('step-5-next').style.display = 'flex';
}

// Step 6: Naughty Question
function answerNaughtyQuestion(event) {
  createHeartBurst(event.clientX, event.clientY, 14);
  document.getElementById('naughty-response').style.display = 'block';
  document.getElementById('step-6-next').style.display = 'flex';
}

// Step 7: Final Surprise Button
function triggerFinalChoice(event) {
  createHeartBurst(event.clientX, event.clientY, 28);
  const finalResponse = document.getElementById('final-response');
  const stayBtn = document.getElementById('stay-btn');

  finalResponse.style.display = 'block';
  stayBtn.textContent = "Hamesha Ke Liye Lock 🔒❤️";

  // Extra celebration bursts across screen
  setTimeout(() => createHeartBurst(window.innerWidth * 0.3, window.innerHeight * 0.4, 18), 250);
  setTimeout(() => createHeartBurst(window.innerWidth * 0.7, window.innerHeight * 0.4, 18), 500);
}