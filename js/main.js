// Main Elements

let i;

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

// Loader

const loader = document.querySelector(".loader");

window.addEventListener("load", loaded);

function loaded() {
  loader.classList.add("hidden");
}

// Dark Theme

const html = document.documentElement;
const moon = document.querySelector(".moon");

moon.addEventListener("click", switchTheme);

function switchTheme() {
  const dataTheme = html.getAttribute("data-theme");
  let targetTheme;

  if (dataTheme === "light") {
    targetTheme = "dark";
  } else if (dataTheme === "dark") {
    targetTheme = "light";
  }

  html.setAttribute("data-theme", targetTheme);
  localStorage.setItem("storedTheme", targetTheme);
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
  if (browser != "safari") {
    smog.play();
  }
}

new Waypoint({
  element: fifth,
  offset: "30%",
  handler: runOnce(lineDraw),
});

if (browser === "safari") {
  const path = document.querySelectorAll("#smog path");

  for (i = 0; i < path.length; i++) {
    path[i].style.strokeDashoffset = "0px";
  }
}

// Form Validation

const bLogin = document.querySelector(".sixth .b-login");
const bSignup = document.querySelector(".sixth .b-signup");
const fLogin = document.querySelector(".sixth .f-login");
const fSignup = document.querySelector(".sixth .f-signup");
const sEmail = document.getElementById("s-email");
const sPassword = document.getElementById("s-password");
const sName = document.getElementById("s-name");
const sSubmit = document.querySelector(".s-submit");
const svg = document.querySelectorAll(".sixth svg");

bLogin.addEventListener("click", toggleForms);
bSignup.addEventListener("click", toggleForms);
sPassword.addEventListener("input", validateForm);
sPassword.addEventListener("input", validation);
fSignup.addEventListener("submit", validateEmail)


function toggleForms() {
  bSignup.classList.toggle("inactive");
  bLogin.classList.toggle("inactive");
  fSignup.classList.toggle("hidden");
  fLogin.classList.toggle("hidden");
}

function validation() {
  if (
    checkLength() === false ||
    checkCapital() === false ||
    checkNumber() === false
  ) {
    // Empecher de submit
    // fill le SVG correspondant en rouge
  }
}

function validateForm() {
  checkLength();
  checkCapital();
  checkNumber();
}

function checkLength() {
  if (sPassword.value.length < 8) {
    svg[0].classList.remove("complete");
    return false;
  } else {
    svg[0].classList.add("complete");
  }
}

function checkCapital() {
  const hasCapital = /[A-Z]/;
  const testCapital = hasCapital.test(sPassword.value);

  if (testCapital === false) {
    svg[1].classList.remove("complete");
    return false;
  } else {
    svg[1].classList.add("complete");
  }
}

function checkNumber() {
  const hasNumber = /[0-9]/;
  const testNumber = hasNumber.test(sPassword.value);

  if (testNumber === false) {
    svg[2].classList.remove("complete");
    return false;
  } else {
    svg[2].classList.add("complete");
  }
}

const checkAt = sEmail.value.includes("@");
const checkDot = sEmail.value.includes(".");
const checkBlank = sEmail.value != ""

function checkEmail() {
  if (checkAt === false || checkDot === false || checkBlank === false) {
    // const span = document.querySelector(".sixth .email span");
    // span.classList.remove("transparent");
    return false
  }
}

function validateEmail() {
  return false
}

console.log(validateEmail());
// Glasmorphism

const cards = document.querySelectorAll(".last .card");

if (browser != "safari") {
  for (i = 0; i < cards.length; i++) {
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
  const container = document.querySelector(".last .container");
  const realWidth = Math.max(0, (container.offsetWidth - 375) / (375 + 48));
  const width = Math.min(realWidth, cards.length);

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

    if (hover && browser != "safari") {
      glare[i].style.width = `${cards[i].offsetWidth * 2}px`;
      glare[i].style.height = `${cards[i].offsetWidth * 2}px`;
    }
  }
}
