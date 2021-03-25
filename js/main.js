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
  let currentPage = window.location.pathname.substring(1);

  if (currentPage.includes(".html")) {
    currentPage = currentPage.substring(0, currentPage.length - 5);
  }

  if (currentPage.length === 0) {
    currentPage = "index";
  }

  import(`./_${currentPage}.js`);
}

loadScript();
