// Event Listeners

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

next.addEventListener("click", () => slide(-1));
prev.addEventListener("click", () => slide(1));
window.addEventListener("wheel", defile);

function defile(event) {
  if (event.deltaY < 0) {
    slide(-1);
  } else {
    slide(1);
  }
}

// Add images to the HTML-markup

const sliderWrapper = document.getElementById("sliderWrapper");
let parts = [];
let images = ["img/day.jpg", "img/night.jpg"];
let current = 0;

let part = document.createElement("div");
part.className = "part";

let section = document.createElement("div");
section.className = "section";

let img = document.createElement("img");
img.src = images[current];

section.appendChild(img);
part.appendChild(section);
sliderWrapper.appendChild(part);

parts.push(part);

// Slide handler
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
