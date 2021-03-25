// Dark Theme

const moon = document.querySelector(".moon");

if (moon) {
  moon.addEventListener("click", switchTheme);
}

function switchTheme() {
  const html = document.documentElement;
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

if (footer) {
  footer.innerText = `Copyright - © ${new Date().getFullYear()}`;
}

// Imports

function loadScript() {
  const pageLocation = window.location.pathname;
  let currentPage = pageLocation.substring(1, pageLocation.length - 5);

  if (currentPage === "/") {
    currentPage = "index";
  }

  import(`./_${currentPage}.js`);
}

loadScript();
