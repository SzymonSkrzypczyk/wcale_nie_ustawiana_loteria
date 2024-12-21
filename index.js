const images = [
    "images/AGH.png",
    "images/PGD.png",
    "images/PKR.png",
    "images/PPO.png",
    "images/PRZ.png",
    "images/PSL.png",
    "images/PWA.png",
    "images/PWR.png",
    "images/UMED.png",
    "images/ZUT.png",
    "images/PLO.png"
  ];
  
  // Predefined winning combination
  const winningCombination = [
    "images/AGH.png",
    "images/AGH.png",
    "images/AGH.png"
  ];

  const startButton = document.getElementById("start-button");
  let spinCount = 0;

  function setup() {
    // set random images at the page load
    document.getElementById("slot1-img").src = images[Math.floor(Math.random() * images.length)];
    document.getElementById("slot2-img").src = images[Math.floor(Math.random() * images.length)];
    document.getElementById("slot3-img").src = images[Math.floor(Math.random() * images.length)];
  }
  
  function spin() {
    spinCount++;
    // a small easter egg for the resilient ;)
    if(spinCount == 5){
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
    // disable the button to prevent spamming
    startButton.disabled = true;
    startButton.classList.add("disabled");
    
    const audio = new Audio("hit.mp3");
    audio.play();
    const slot1 = document.getElementById("slot1-img");
    const slot2 = document.getElementById("slot2-img");
    const slot3 = document.getElementById("slot3-img");

    slotsStopped = 0; // Reset counter
    animateSlot(slot1, 0, getRandomSpins());
    animateSlot(slot2, 1, getRandomSpins());
    animateSlot(slot3, 2, getRandomSpins());
  }

  function animateSlot(slot, index, spins) {
    let position = 0;
    const interval = setInterval(() => {
      position++;
      const randomImage = images[Math.floor(Math.random() * images.length)];
      slot.src = randomImage;

      // Move image from top to bottom
      slot.style.transform = `translateY(${(position % 2) === 0 ? '-100%' : '0'})`;

      // Stop spinning after the random number of spins
      if (position >= spins) {
        clearInterval(interval);
        slot.src = winningCombination[index];
        slot.style.transform = "translateY(0)";
        checkIfAllSlotsStopped();
      }
    }, 100);
  }

  function getRandomSpins() {
    // Generate a random number between 10 and 20 for spins
    return Math.floor(Math.random() * 11) + 10;
  }

  function checkIfAllSlotsStopped() {
    slotsStopped++;
    if (slotsStopped === 3) {
      playWinSound();
    }
  }

  function playWinSound() {
    const audio = new Audio("winning_sound.mp3");
    audio.play();
    // re-enable the button
    startButton.disabled = false;
    startButton.classList.remove("disabled");
  }