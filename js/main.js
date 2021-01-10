// Main Variables

const hover = window.matchMedia("(hover: hover)").matches;

// Dark Theme

const html = document.documentElement;
const moon = document.querySelector(".moon");
const theme = localStorage.getItem("theme");

moon.addEventListener("click", switchTheme);

if (theme === "dark") {
  html.classList.add("dark");
}

function switchTheme() {
  if (html.classList.contains("dark")) {
    localStorage.removeItem("theme");
  } else {
    localStorage.setItem("theme", "dark");
  }

  html.classList.toggle("dark");
}

// Random Emojis

const emojis = document.querySelector(".emojis");

if (hover) {
  emojis.addEventListener("mouseover", randomEmoji);
} else {
  emojis.addEventListener("click", randomEmoji);
}

function randomEmoji() {
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
  emojis.innerText = characters[Math.floor(Math.random() * characters.length)];
}

// Image Slider

const second = document.querySelector(".second");

if (hover) {
  second.addEventListener("mousemove", slider);
} else {
  second.addEventListener("touchmove", slider);
}

function slider(e) {
  const body = document.querySelector("body");
  const container = document.querySelector(".second .container");
  const img2 = document.querySelector(".img2");
  const width = (body.offsetWidth - container.offsetWidth) / 2;

  if (hover) {
    let x = Math.max(0, e.clientX - width);
    img2.style.left = x + "px";
  } else {
    let x = Math.max(0, e.touches[0].clientX - width);
    img2.style.left = x + "px";
  }
}

// Counter

let number = 0;
const counter = document.querySelector(".counter");
counter.addEventListener("click", count);

function count() {
  const strong = document.querySelector(".third strong");
  number = number + 1;

  if (number === 1) {
    strong.innerText = `${number} Clic`;
  } else {
    strong.innerText = `${number} Clics`;
  }
}

// Carrousel

let src = 0;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const images = [
  "img/day.jpg",
  "img/night.jpg",
  "img/cactus.jpg",
  "img/city.jpg",
  "img/mountains.jpg",
];

prev.addEventListener("click", prevo);
next.addEventListener("click", nexto);

function prevo() {
  const container = document.querySelector(".fourth .container");

  if (src === 0) {
    src = images.length - 1;
  } else {
    src--;
  }
  container.style.background = `url(${images[src]}) center/cover`;
}

function nexto() {
  const container = document.querySelector(".fourth .container");

  if (src >= images.length - 1) {
    src = 0;
  } else {
    src++;
  }
  container.style.background = `url(${images[src]}) center/cover`;
}
