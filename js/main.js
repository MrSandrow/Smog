// Variables

const moon = document.querySelector(".moon");
const emojis = document.querySelector(".emojis");
const second = document.querySelector(".second");
const counter = document.querySelector(".counter");
let number = 0;
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

// Event Listeners

moon.addEventListener("click", theme);
emojis.addEventListener("mouseover", randomEmoji);
second.addEventListener("mousemove", slider);
counter.addEventListener("click", count);
next.addEventListener("click", () => slide(-1));
prev.addEventListener("click", () => slide(1));

// Functions

function theme() {
  document.documentElement.classList.toggle("dark");
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

function slider(e) {
  const body = document.querySelector("body");
  const container = document.querySelector(".second .container");
  const width = (body.offsetWidth - container.offsetWidth) / 2;
  const img2 = document.querySelector(".img2");
  let x = e.clientX - width;

  if (x < 0) {
    x = 0;
  }

  img2.style.left = x + "px";
}

function count() {
  const span = document.querySelector(".third span");
  number = number + 1;

  if (number === 1) {
    span.innerText = `${number} Clic`;
  } else {
    span.innerText = `${number} Clics`;
  }
}

// Slider

const sliderWrapper = document.querySelector(".fourth .container");
let parts = [];
let images = ["img/day.jpg", "img/night.jpg"];
let current = 0;

let part = document.querySelector(".part");

let section = document.createElement("div");
section.className = "section";

let img = document.createElement("img");
img.src = images[current];

section.appendChild(img);
part.appendChild(section);

parts.push(part);

// Slide handler
console.log(part.childNodes);
let playing = false;

const slide = (dir) => {
  if (!playing) {
    playing = true;

    if (current + dir < 0) {
      current = images.length - 1;
    } else if (current + dir >= images.length) {
      current = 0;
    } else {
      current += dir;
    }

    const up = (part, next) => {
      part.appendChild(next);
      anime({
        targets: part,
        duration: 1000,
        easing: "easeOutSine",
        translateY: [0, -window.innerHeight],
        complete: () => {
          part.removeChild(part.childNodes[0]);
          playing = false;
          part.style.transform = "translateY(0)";
        },
      });
    };

    const down = (part, next) => {
      part.insertBefore(next, part.firstChild);
      anime({
        targets: part,
        duration: 1000,
        easing: "easeOutSine",
        translateY: [-window.innerHeight, 0],
        complete: () => {
          part.removeChild(part.childNodes[1]);
          playing = false;
        },
      });
    };

    for (let p in parts) {
      let part = parts[p];
      let next = document.createElement("div");
      next.className = "section";

      let img = document.createElement("img");
      img.src = images[current];

      next.appendChild(img);

      if ((p - Math.max(0, dir)) % 2 === 0) {
        down(part, next);
      } else {
        up(part, next);
      }
    }
  }
};
