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

const browser = (function (agent) {
  switch (true) {
    case agent.indexOf("edge") > -1:
      return "edge";
    case agent.indexOf("edg") > -1:
      return "chromium based edge (dev or canary)";
    case agent.indexOf("opr") > -1 && !!window.opr:
      return "opera";
    case agent.indexOf("chrome") > -1 && !!window.chrome:
      return "chrome";
    case agent.indexOf("trident") > -1:
      return "ie";
    case agent.indexOf("firefox") > -1:
      return "firefox";
    case agent.indexOf("safari") > -1:
      return "safari";
    default:
      return "other";
  }
})(window.navigator.userAgent.toLowerCase());

// Scroll 100 VH

const scrollWrapper = document.querySelector(".index-slider .wrapper");
let currentSection = 0;

window.addEventListener("wheel", scrollSection);

function scrollSection(event) {
  if (event.deltaY < 0) {
    currentSection = currentSection - 1;
  } else {
    currentSection = currentSection + 1;
  }

  scrollWrapper.style.transform = `translateY(-${currentSection * 100}vh)`;
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

const second = document.querySelector(".index-second");
second.addEventListener("mousemove", slider);
second.addEventListener("touchmove", slider);

function slider(e) {
  const body = document.querySelector("body");
  const container = document.querySelector(".index-second .container");
  const img2 = document.querySelector(".img2");
  const width = (body.offsetWidth - container.offsetWidth) / 2;
  const clientX = e.clientX || e.touches[0].clientX;

  let x = Math.max(0, clientX - width);
  img2.style.width = x + "px";
}

// Clicks Counter

const counter = document.querySelector(".counter");
counter.addEventListener("click", count);

let number = 0;

function count() {
  const span = document.querySelector(".index-third span");

  span.style.transform = "translateY(-1.5rem)";
  number = number + 1;

  if (number === 1) {
    span.innerText = `${number} Clic`;
  } else {
    span.innerText = `${number} Clics`;
  }

  anime({
    targets: span,
    translateY: 0,
    duration: 1500,
    easing: "easeOutElastic",
  });
}

// Counter Up

import { CountUp } from "https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.0.7/countUp.js";
const third = document.querySelector(".index-third");

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

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const sliderWrapper = document.querySelector(".index-fourth .wrapper");
let currentSlide = 0;

prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);

function prevSlide() {
  if (currentSlide === 0) {
    currentSlide = sliderWrapper.childElementCount - 1;
  } else {
    currentSlide = currentSlide - 1;
  }

  sliderWrapper.style.marginLeft = `-${currentSlide * 100}%`;
}

function nextSlide() {
  if (currentSlide === sliderWrapper.childElementCount - 1) {
    currentSlide = 0;
  } else {
    currentSlide = currentSlide + 1;
  }

  sliderWrapper.style.marginLeft = `-${currentSlide * 100}%`;
}

// Line Drawing

const fifth = document.querySelector(".index-fifth");

const smog = anime({
  targets: ".smog path",
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

const cards = document.querySelectorAll(".index-last .card");

if (browser != "safari") {
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.add("backdropfilter");
  }
}

if (hover && browser != "safari") {
  VanillaTilt.init(cards, {
    max: 15,
    speed: 750,
    scale: 1.075,
    glare: true,
    "max-glare": 0.5,
  });
} else if (hover && browser === "safari") {
  VanillaTilt.init(cards, {
    max: 15,
    speed: 750,
    scale: 1.075,
    glare: false,
  });
}

window.addEventListener("load", resize);
window.addEventListener("resize", resize);

function resize() {
  const container = document.querySelector(".index-last .container");
  const realWidth = Math.max(0, (container.offsetWidth - 375) / (375 + 48));
  const width = Math.min(realWidth, cards.length);

  for (let i = 0; i < width; i++) {
    cards[i].classList.remove("hidden");
  }

  for (let i = cards.length - 1; i > width; i--) {
    cards[i].classList.add("hidden");
  }

  const glare = document.querySelectorAll(".js-tilt-glare-inner");
  const content = document.querySelector(".index-last .content");
  const height = content.offsetHeight;

  for (let i = 0; i < cards.length; i++) {
    cards[i].style.height = `calc(${height}px + 8rem)`;

    if (hover && browser != "safari") {
      glare[i].style.width = `${cards[i].offsetWidth * 2}px`;
      glare[i].style.height = `${cards[i].offsetWidth * 2}px`;
    }
  }
}
