// Main Elements

const hover = window.matchMedia("(hover: hover)").matches;

function runOnce(fn, context) {
  let executed = false;
  return function () {
    if (!executed) {
      executed = true;
      fn(context);
    }
  };
}

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

  let oldEmoji = emojis.innerText;
  let random = characters[Math.floor(Math.random() * characters.length)];

  if (random === oldEmoji) {
    let x = characters.indexOf(random) + 1;

    if (x === characters.length) {
      x = 0;
    }

    random = characters[x];
  }

  emojis.innerText = random;
}

// Image Slider

const second = document.querySelector(".second");
second.addEventListener("mousemove", slider);

function slider(e) {
  const body = document.querySelector("body");
  const container = document.querySelector(".second .container");
  const img2 = document.querySelector(".img2");
  const width = (body.offsetWidth - container.offsetWidth) / 2;

  let x = Math.max(0, e.clientX - width);
  img2.style.left = x + "px";
}

// Clicks Counter

let number = 0;
const counter = document.querySelector(".counter");
counter.addEventListener("click", count);

function count() {
  const span = document.querySelector(".third span");
  number = number + 1;

  if (number === 1) {
    span.innerText = `${number} Clic`;
  } else {
    span.innerText = `${number} Clics`;
  }
}

// Counter Up

import { CountUp } from "./counter.js";
const third = document.querySelector(".third");

function counterUp() {
  const target = document.querySelector(".counter-up");
  const options = { separator: " " };
  const countUp = new CountUp(target, 500000, options);
  countUp.start();
}

new Waypoint({
  element: third,
  offset: "25%",
  handler: runOnce(counterUp),
});

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

// Line Drawing

const fifth = document.querySelector(".fifth");

const smog = anime({
  targets: "#smog path",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 3000,
  delay: (el, i) => i * 450,
  autoplay: false,
});

function lineDraw() {
  smog.play();
}

new Waypoint({
  element: fifth,
  offset: "30%",
  handler: runOnce(lineDraw),
});

// Glasmorphism

const cards = document.querySelectorAll(".last .card");

if (hover) {
  VanillaTilt.init(cards, {
    max: 15,
    speed: 750,
    scale: 1.075,
    glare: true,
    "max-glare": 0.5,
  });
}

window.addEventListener("load", resize);
window.addEventListener("resize", resize);

function resize() {
  const container = document.querySelector(".last .container");
  const realWidth = Math.max(0, (container.offsetWidth - 375) / (375 + 48));
  const width = Math.min(realWidth, cards.length);
  let i;

  for (i = 0; i < width; i++) {
    cards[i].classList.remove("hidden");
  }

  for (i = cards.length - 1; i > width; i--) {
    cards[i].classList.add("hidden");
  }

  const glare = document.querySelectorAll(".js-tilt-glare-inner");
  const content = document.querySelector(".last .content");
  const height = content.offsetHeight;

  for (i = 0; i < cards.length; i++) {
    cards[i].style.height = `calc(${height}px + 8rem)`;

    if (hover) {
      glare[i].style.width = `${cards[i].offsetWidth * 2}px`;
      glare[i].style.height = `${cards[i].offsetWidth * 2}px`;
    }
  }
}
