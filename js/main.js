// Variables

const characters = [
  "😂",
  "😅",
  "😄",
  "😎",
  "😍",
  "🤩",
  "🤑",
  "😲",
  "😨",
  "😇",
  "🤯",
  "😮",
  "🤐",
  "😫",
  "🤤",
  "😤",
  "😬",
  "🥳",
];
const emojis = document.querySelector(".emojis");
const moon = document.querySelector(".moon");
const img2 = document.querySelector(".img2");
const mode = localStorage.getItem("mode");

// Event Listeners

emojis.addEventListener("mouseover", randomEmoji);
moon.addEventListener("click", theme);
window.addEventListener("mousemove", slider);

// Functions

function randomEmoji() {
  emojis.innerText = characters[Math.floor(Math.random() * characters.length)];
}

function theme() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("mode", "dark");
}

function slider(e) {
  const x = e.clientX;
  img2.style.left = x + "px";
}
