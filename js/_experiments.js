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

// Hybrid Section

if (hover) {
  slideSection();
  window.addEventListener("scroll", slideSection);
  window.addEventListener("resize", slideSection);
}

function slideSection() {
  const viewportHeight = document.documentElement.clientHeight;
  const viewportWidth = document.documentElement.clientWidth;
  const scrolledValue = window.scrollY;

  const experimentsFirst = document.querySelector(".experiments-first");
  const experimentsSecond = document.querySelector(".experiments-second");
  const ratio = Math.min(1, scrolledValue / viewportHeight);
  const translated = ratio * viewportWidth;

  if (ratio < 1) {
    experimentsFirst.classList.add("fixed");
    experimentsSecond.classList.add("fixed");
  } else {
    experimentsFirst.classList.remove("fixed");
    experimentsSecond.classList.remove("fixed");
  }

  gsap.to(experimentsFirst, { x: translated, duration: 0 });
}

// Fireworks

const fireworksContainer = document.querySelector(".experiments-first .container");
const canvasEl = document.querySelector(".fireworks");
const ctx = canvasEl.getContext("2d");

anime({
  duration: Infinity,
  autoplay: true,
  update: () => ctx.clearRect(0, 0, canvasEl.width, canvasEl.height),
});

function getFontSize() {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function setCanvasSize() {
  canvasEl.width = fireworksContainer.offsetWidth * 2;
  canvasEl.height = fireworksContainer.offsetHeight * 2;
  canvasEl.style.width = fireworksContainer.offsetWidth + "px";
  canvasEl.style.height = fireworksContainer.offsetHeight + "px";
  canvasEl.getContext("2d").scale(2, 2);
}

setCanvasSize();

window.addEventListener("resize", setCanvasSize);
fireworksContainer.addEventListener("mousedown", startFirework);

function startFirework(e) {
  const leftSpace = fireworksContainer.getBoundingClientRect().left;
  const topSpace = fireworksContainer.getBoundingClientRect().top;
  const pointerX = (e.clientX || e.touches[0].clientX) - leftSpace;
  const pointerY = (e.clientY || e.touches[0].clientY) - topSpace;

  animateParticules(pointerX, pointerY);
}

function animateParticules(x, y) {
  const circle = createCircle(x, y);
  const numberOfParticules = 35;
  const particules = [];

  for (let i = 0; i < numberOfParticules; i++) {
    particules.push(createParticule(x, y));
  }

  anime({
    targets: particules,
    x: (p) => p.endPos.x,
    y: (p) => p.endPos.y,
    radius: 0.1,
    duration: anime.random(1200, 1800),
    easing: "easeOutExpo",
    update: renderParticule,
  });

  anime({
    targets: circle,
    radius: anime.random(getFontSize() * 13, getFontSize() * 15),
    lineWidth: 0,
    alpha: {
      value: 0,
      easing: "linear",
      duration: anime.random(400, 800),
    },
    duration: anime.random(1200, 1800),
    easing: "easeOutExpo",
    update: renderParticule,
    offset: 0,
  });
}

function createCircle(x, y) {
  const p = {};

  p.x = x;
  p.y = y;
  p.color = "#FFF";
  p.radius = 0.1;
  p.alpha = 0.5;
  p.lineWidth = 6;
  p.draw = function () {
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.lineWidth = p.lineWidth;
    ctx.strokeStyle = p.color;
    ctx.stroke();
    ctx.globalAlpha = 1;
  };

  return p;
}

function createParticule(x, y) {
  const colors = ["#eafc0b", "#305edc", "#02cdfe", "#f55e49"];
  const p = {};

  p.x = x;
  p.y = y;
  p.color = colors[anime.random(0, colors.length - 1)];
  p.radius = anime.random(getFontSize() * 1.5, getFontSize() * 3);
  p.endPos = setParticuleDirection(p);
  p.draw = function () {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = p.color;
    ctx.fill();
  };

  return p;
}

function setParticuleDirection(p) {
  const angle = (anime.random(0, 360) * Math.PI) / 180;
  const value = anime.random(getFontSize() * 4, getFontSize() * 16);
  const radius = [-1, 1][anime.random(0, 1)] * value;

  return {
    x: p.x + radius * Math.cos(angle),
    y: p.y + radius * Math.sin(angle),
  };
}

function renderParticule(anim) {
  for (let i = 0; i < anim.animatables.length; i++) {
    anim.animatables[i].target.draw();
  }
}

// Filters

const characters = [];
getCharacters("https://rickandmortyapi.com/api/character");

function getCharacters(url) {
  fetchCharacters(url).then(storeCharacters).catch(displayErreur);
}

async function fetchCharacters(url) {
  const request = await fetch(url);
  const response = await request.json();
  return response;
}

function storeCharacters(response) {
  const results = response.results;
  const nextPage = response.info.next;

  results.forEach((item) => characters.push(item));

  if (nextPage) {
    getCharacters(nextPage);
  } else {
    injectResult(characters);
  }
}

function injectResult(array) {
  const elements = document.querySelector(".experiments-second .elements");
  let results = "";

  for (let i = 0; i < Math.min(10, array.length); i++) {
    const species = array[i].species === "unknown" ? "Unknown Species" : array[i].species;

    results += `
    <div class="result">
      <div class="result-image">
        <img src="${array[i].image}" alt="${array[i].name}">
      </div>
      <div class="result-text">
        <h2>${array[i].name}</h2>
        <span>${species}</span>
      </div>
    </div>`;
  }

  elements.innerHTML = results;
  setTimeout(revealText, 100);

  function revealText() {
    const resultTexts = document.querySelectorAll(".experiments-second .result-text");
    resultTexts.forEach((item) => item.classList.add("loaded"));
  }
}

function displayErreur() {
  const erreur = document.querySelector(".experiments-second .erreur");
  erreur.classList.remove("hidden");
}

const filters = document.querySelector(".experiments-second .filters");
const filtersButton = document.querySelector(".experiments-second .filter-icon");
const cancelButton = document.querySelector(".experiments-second .cancel");
const applyButton = document.querySelector(".experiments-second .apply");

filtersButton.addEventListener("click", displayFilters);
cancelButton.addEventListener("click", hideFilters);
applyButton.addEventListener("click", applyFilters);

function displayFilters() {
  filters.classList.remove("hidden");
}

function hideFilters() {
  filters.classList.add("hidden");
}

function applyFilters() {
  filterResults();
  filters.classList.add("hidden");
}

const criteria = document.querySelectorAll(".experiments-second .criteria");

for (let i = 0; i < criteria.length; i++) {
  criteria[i].addEventListener("click", toggleCriteria);
}

function toggleCriteria() {
  this.classList.toggle("active");
}

function filterResults() {
  const status = document.querySelectorAll(".experiments-second .status .active");
  const species = document.querySelectorAll(".experiments-second .species .active");
  const origin = document.querySelectorAll(".experiments-second .origin .active");
  const fail = document.querySelector(".experiments-second .fail");

  const statusFilters = [];
  const speciesFilters = [];
  const originFilters = [];

  if (status) {
    status.forEach((item) => statusFilters.push(item.textContent.toLowerCase()));
  }

  if (species) {
    species.forEach((item) => speciesFilters.push(item.textContent.toLowerCase()));
  }

  if (origin) {
    origin.forEach((item) => originFilters.push(item.textContent.toLowerCase()));
  }

  function filteredStatus() {
    if (statusFilters.length > 0) {
      return characters.filter((item) => statusFilters.includes(item.status.toLowerCase()));
    } else {
      return characters;
    }
  }

  function filteredSpecies() {
    if (speciesFilters.length > 0) {
      return filteredStatus().filter((item) => speciesFilters.includes(item.species.toLowerCase()));
    } else {
      return filteredStatus();
    }
  }

  function filteredOrigin() {
    if (originFilters.length > 0) {
      return filteredSpecies().filter((item) => originFilters.includes(item.origin.name.toLowerCase()));
    } else {
      return filteredSpecies();
    }
  }

  if (filteredOrigin().length > 0) {
    injectResult(filteredOrigin());
    fail.classList.add("hidden");
  } else {
    injectResult(new Array());
    fail.classList.remove("hidden");
  }
}

// Weather API

checkWeather().then(displayWeather).catch(abortProcess);

async function checkWeather() {
  const url = `https://api.weatherapi.com/v1/current.json?key=2fb89afe83e14609b16200513212903&q=le-coudray-montceaux`;
  const request = await fetch(url);
  const response = await request.json();
  return response;
}

function displayWeather(response) {
  const temperature = Math.round(response.current.feelslike_c);
  const span = document.querySelector(".experiments-fourth span");

  span.innerText = `La température ressentie dehors est de ${temperature}°C`;
}

function abortProcess() {
  const span = document.querySelector(".experiments-fourth span");
  span.innerText = "Une erreur s'est produite avec l'API.";
}

// MailboxLayer API

const formInput = document.forms.mailboxlayer.email;
const submitButton = document.querySelector(".experiments-fifth button");

submitButton.addEventListener("click", submitForm);

function submitForm(event) {
  event.preventDefault();

  if (formInput.value.length > 0) {
    checkEmail(formInput.value).then(setBorder).catch(handleError);
  } else {
    formInput.classList.add("fail");
  }
}

async function checkEmail(email) {
  const url = `https://apilayer.net/api/check?access_key=cc2a8440b76e7f4a719942710f3f2401&email=${email}&smtp=1&format=1`;
  const request = await fetch(url);
  const response = await request.json();
  return response;
}

function setBorder(response) {
  if (response.error) {
    handleError();
  } else if (response.disposable || !response.smtp_check) {
    formInput.classList.remove("success");
    formInput.classList.add("fail");
  } else {
    formInput.classList.remove("fail");
    formInput.classList.add("success");
  }
}

function handleError() {
  const errorMessage = document.createTextNode("Une erreur s'est produite avec l'API");
  document.forms.mailboxlayer.insertBefore(errorMessage, formInput);
}

// GSAP

const experimentsSixth = document.querySelector(".experiments-sixth");

new Waypoint({
  element: experimentsSixth,
  offset: "50%",
  handler: runOnce(displayCard),
});

function displayCard() {
  const sixthCard = document.querySelector(".experiments-sixth .card");

  sixthCard.classList.remove("hidden");
  gsap.timeline().add(firstTl()).add(secondTl()).add(thirdTl());

  function firstTl() {
    const tl = gsap.timeline({ defaults: { duration: 0.7, ease: Back.easeOut.config(2), opacity: 0 } });

    tl.from(".experiments-sixth .card", { scale: 0.2, delay: "0.2" });
    tl.from(".experiments-sixth .card .image", { scaleY: 0, transformOrigin: "top" });
    tl.from(".experiments-sixth .card .icon", { scale: 0.2, transformOrigin: "center", delay: "-0.7" });
    tl.from(".experiments-sixth .card .blip1", { scaleX: 0 });
    tl.from(".experiments-sixth .card .blip2", { scaleX: 0, delay: "-0.2" });
    tl.from(".experiments-sixth .card .blip3", { scaleX: 0, delay: "-0.3" });
    tl.from(".experiments-sixth .card .blip4", { scaleX: 0, delay: "-0.5" });
    tl.from(".experiments-sixth .card .blip5", { scaleX: 0, delay: "-0.7" });
    tl.then(removeTransform);

    return tl;
  }

  function secondTl() {
    const tl = gsap.timeline({ defaults: { duration: 0.4 } });

    tl.to(".experiments-sixth .card .background", { scaleX: 0, transformOrigin: "right" });
    tl.to(".experiments-sixth .card span", { opacity: 1, delay: "-0.2" });

    return tl;
  }

  function thirdTl() {
    const tl = gsap.timeline();

    tl.to(".experiments-sixth .card .blip4, .experiments-sixth .card .blip5", {
      scale: 1.1,
      repeat: -1,
      yoyoEase: "bounce.out",
    });

    return tl;
  }

  function removeTransform() {
    sixthCard.style.removeProperty("transform");
  }
}

// Three JS

import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";

const seventhContainer = document.querySelector(".experiments-seventh .container");
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance", alpha: true });
const camera = new THREE.PerspectiveCamera(75, seventhContainer.offsetWidth / seventhContainer.offsetHeight, 0.01, 100);
const geometry = new THREE.TorusGeometry(0.5, 0.15, 30, 100);
const material = new THREE.MeshMatcapMaterial({ matcap: applyTexture() });
const mesh = new THREE.Mesh(geometry, material);
const controls = new OrbitControls(camera, renderer.domElement);

setRendererSize();
addScene();
animate();

window.addEventListener("resize", setRendererSize);

new Waypoint({
  element: seventhContainer,
  offset: "20%",
  handler: runOnce(transformMesh),
});

function applyTexture() {
  const matcaps = ["orange", "red", "blue", "green", "dark", "grey", "white"];

  if (localStorage.matcap) {
    const removed = matcaps.indexOf(localStorage.matcap);
    matcaps.splice(removed, 1);
  }

  const index = Math.round(Math.random() * (matcaps.length - 1));
  const texture = new THREE.TextureLoader().load(`img/texture-${matcaps[index]}.jpg`);

  localStorage.setItem("matcap", matcaps[index]);
  return texture;
}

function setRendererSize() {
  renderer.setSize(seventhContainer.offsetWidth, seventhContainer.offsetHeight);
  camera.aspect = seventhContainer.offsetWidth / seventhContainer.offsetHeight;
  camera.updateProjectionMatrix();
}

function addScene() {
  scene.add(mesh);

  mesh.scale.z = 1.5;
  camera.position.set(0, 0, 2);

  seventhContainer.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function transformMesh() {
  const tl = gsap.timeline({ repeat: -1 });
  const angle = -180 * (Math.PI / 180);

  tl.to(mesh.scale, { z: 0.5, duration: 0.5, ease: "power1" });
  tl.to(mesh.scale, { z: 1.5, duration: 2, ease: "elastic" });
  tl.to(mesh.rotation, { y: angle, duration: 3, delay: -1, ease: "power2" });
}

// Parallax Effect

const card = document.querySelector(".experiments-last .card");
const mouseLeave = gsap.to(card, {
  rotationX: 0,
  rotationY: 0,
  duration: 2.5,
  ease: "elastic",
  paused: true,
});

if (hover) {
  card.addEventListener("mousemove", transformCard);
  card.addEventListener("mouseleave", resetCard);
}

function transformCard(event) {
  const container = document.querySelector(".experiments-last .container");
  const eventX = event.clientX - container.getBoundingClientRect().left;
  const eventY = event.clientY - container.getBoundingClientRect().top;
  const xAxis = (container.offsetWidth / 2 - eventX) / 10;
  const yAxis = -(container.offsetHeight / 2 - eventY) / 10;

  mouseLeave.pause();
  gsap.to(card, { rotationX: yAxis, rotationY: xAxis, duration: 0 });
}

function resetCard() {
  mouseLeave.invalidate();
  mouseLeave.restart();
}
