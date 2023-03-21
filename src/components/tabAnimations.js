// tabAnimations.js
let tabAnimationInterval;
// function animatePong() {
//   const title = "New Message! ";
//   const emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂"];
//   let direction = 1;
//   let index = 0;
//   const originalTitle = document.title;

//   tabAnimationInterval = setInterval(() => {
//     document.title = title.slice(0, index) + emojis[index % emojis.length] + title.slice(index + 1);
//     index += direction;

//     if (index === emojis.length - 1 || index === 0) {
//       direction = -direction;
//     }
//   }, 150);

//   window.addEventListener("focus", () => {
//     clearInterval(tabAnimationInterval);
//     document.title = originalTitle;
//   }, { once: true });
// }

function animateSpinningMoon() {
  const moonPhases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
  let currentPhase = 0;
  const originalTitle = document.title;

  tabAnimationInterval = setInterval(() => {
    document.title = moonPhases[currentPhase] + " New Message!";
    currentPhase = (currentPhase + 1) % moonPhases.length;
  }, 100);

  window.addEventListener("focus", () => {
    clearInterval(tabAnimationInterval);
    document.title = originalTitle;
  }, { once: true });
}

function animateHeartBeat() {
      const heartBeats = ["💓", "💗", "💖"];
  let currentBeat = 0;
  const originalTitle = document.title;

  tabAnimationInterval = setInterval(() => {
    document.title = heartBeats[currentBeat] + " New Message!";
    currentBeat = (currentBeat + 1) % heartBeats.length;
  }, 100);

  window.addEventListener("focus", () => {
    clearInterval(tabAnimationInterval);
    document.title = originalTitle;
  }, { once: true });
}

  
export { animateSpinningMoon, animateHeartBeat };
//   export { animatePong, animateSpinningMoon };
  