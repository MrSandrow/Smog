// Main Elements

const hover = window.matchMedia("(hover: hover)").matches;

// Hybrid Section

if (hover) {
  window.addEventListener("load", slideSection);
  window.addEventListener("scroll", slideSection);
  window.addEventListener("resize", slideSection);
}

function slideSection() {
  const viewportHeight = document.documentElement.clientHeight;
  const viewportWidth = document.documentElement.clientWidth;
  const scrolledValue = window.scrollY;

  const experimentsFirst = document.querySelector(".experiments-first");
  const ratio = Math.min(1, scrolledValue / viewportHeight);
  const translated = ratio * viewportWidth;

  experimentsFirst.style.transform = `translateX(${translated}px)`;
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
      return filteredSpecies().filter((item) =>
        originFilters.includes(item.origin.name.toLowerCase())
      );
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

// Parallax Effect

const card = document.querySelector(".experiments-last .card");
let mouseLeave;

if (hover) {
  card.addEventListener("mousemove", transformCard);
  card.addEventListener("mouseleave", resetCard);
}

function transformCard(event) {
  const container = document.querySelector(".experiments-last .container");
  const eventX = event.clientX - container.getBoundingClientRect().left;
  const eventY = event.clientY - container.getBoundingClientRect().top;
  const xAxis = (container.offsetWidth / 2 - eventX) / 10;
  const yAxis = (container.offsetHeight / 2 - eventY) / 10;

  if (mouseLeave) {
    mouseLeave.pause();
  }

  card.style.transform = `perspective(750px) rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
}

function resetCard() {
  mouseLeave = anime({
    targets: card,
    rotateX: 0,
    rotateY: 0,
    easing: "spring(1, 100, 10, 0)",
  });
}
