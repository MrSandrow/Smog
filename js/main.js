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

// Loader

// const loader = document.querySelector(".loader");

// window.addEventListener("load", loaded);

// function loaded() {
//   loader.classList.add("hidden");
// }

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

  for (let i = 0; i < path.length; i++) {
    path[i].style.strokeDashoffset = "0px";
  }
}

// Form Validation

const login = document.querySelector(".sixth .login");
const signup = document.querySelector(".sixth .signup");
const formSignup = document.forms.Signup;
const formLogin = document.forms.Login;

login.addEventListener("click", toggleForms);
signup.addEventListener("click", toggleForms);

function toggleForms() {
  signup.classList.toggle("inactive");
  login.classList.toggle("inactive");
  formSignup.classList.toggle("hidden");
  formLogin.classList.toggle("hidden");
}

const emailInput = formSignup.email;
const passwordInput = formSignup.password;
const nameInput = formSignup.name;

emailInput.addEventListener("input", removeBorder);
passwordInput.addEventListener("input", removeBorder);
nameInput.addEventListener("input", removeBorder);

function removeBorder() {
  this.classList.remove("red-border");
}

passwordInput.addEventListener("input", checkPassword);

function checkPassword() {
  const password = passwordInput.value;
  const passwordLength = password.length >= 8;
  const passwordCapital = /[A-Z]/.test(password);
  const passwordNumber = /[0-9]/.test(password);
  const svg = document.querySelectorAll(".sixth svg");

  if (passwordLength) {
    svg[0].classList.add("green");
  } else {
    svg[0].classList.remove("green");
  }
  if (passwordCapital) {
    svg[1].classList.add("green");
  } else {
    svg[1].classList.remove("green");
  }
  if (passwordNumber) {
    svg[2].classList.add("green");
  } else {
    svg[2].classList.remove("green");
  }
}

// function validateData() {
//   const email = emailInput.value;
//   const password = passwordInput.value;
//   const name = nameInput.value;
//   const svg = document.querySelectorAll(".sixth svg");

//   const errorsList = {
//     email: {
//       at: email.includes("@"),
//       dot: email.includes("."),
//     },
//     password: {
//       length: password.length >= 8,
//       capital: /[A-Z]/.test(password),
//       number: /[0-9]/.test(password),
//     },
//     name: {
//       length: name.length >= 1,
//     },
//   };

//   function check(value, param) {
//     return errorsList[value][param];
//   }

//   if (check("email", "at") && check("email", "dot")) {
//     emailInput.classList.remove("red-border");
//   }
//   if (check("password", "length")) {
//     svg[0].classList.add("green");
//   } else {
//     svg[0].classList.remove("green");
//   }
//   if (check("password", "capital")) {
//     svg[1].classList.add("green");
//   } else {
//     svg[1].classList.remove("green");
//   }
//   if (check("password", "number")) {
//     svg[2].classList.add("green");
//   } else {
//     svg[2].classList.remove("green");
//   }
//   if (
//     check("password", "length") ||
//     check("password", "capital") ||
//     check("password", "number")
//   ) {
//     passwordInput.classList.remove("red-border");
//   }
//   if (check("name", "length")) {
//     nameInput.classList.remove("red-border");
//   }
// }

formSignup.addEventListener("submit", validateForm);

function handleErrors() {
  const email = emailInput.value;
  const password = passwordInput.value;
  const name = nameInput.value;
  let state = true;

  const errorsList = {
    emailAt: email.includes("@"),
    emailDot: email.includes("."),
    passwordLength: password.length >= 8,
    passwordCapital: /[A-Z]/.test(password),
    passwordNumber: /[0-9]/.test(password),
    nameLength: name.length >= 1,
  };

  function check(value) {
    return errorsList[value];
  }

  function redBorder(element) {
    element.classList.add("red-border");
  }

  if (!check("emailAt") || !check("emailDot")) {
    redBorder(emailInput);
    state = false;
  }
  if (
    !check("passwordLength") ||
    !check("passwordCapital") ||
    !check("passwordNumber")
  ) {
    redBorder(passwordInput);
    state = false;
  }
  if (!check("nameLength")) {
    redBorder(nameInput);
    state = false;
  }

  if (state) {
    return true;
  }
}

function validateForm(event) {
  if (!handleErrors()) {
    event.preventDefault();
  }
}

// Glasmorphism

const cards = document.querySelectorAll(".last .card");

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
  const container = document.querySelector(".last .container");
  const realWidth = Math.max(0, (container.offsetWidth - 375) / (375 + 48));
  const width = Math.min(realWidth, cards.length);

  for (let i = 0; i < width; i++) {
    cards[i].classList.remove("hidden");
  }

  for (let i = cards.length - 1; i > width; i--) {
    cards[i].classList.add("hidden");
  }

  const glare = document.querySelectorAll(".js-tilt-glare-inner");
  const content = document.querySelector(".last .content");
  const height = content.offsetHeight;

  for (let i = 0; i < cards.length; i++) {
    cards[i].style.height = `calc(${height}px + 8rem)`;

    if (hover && browser != "safari") {
      glare[i].style.width = `${cards[i].offsetWidth * 2}px`;
      glare[i].style.height = `${cards[i].offsetWidth * 2}px`;
    }
  }
}
