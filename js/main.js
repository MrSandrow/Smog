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

// Copyright

const footer = document.querySelector("footer");
footer.innerText = `Copyright - © ${new Date().getFullYear()}`;

// Imports

import {} from "./_index.js";