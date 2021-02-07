const html = document.documentElement;
const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const storedTheme = localStorage.getItem("storedTheme");

if (storedTheme) {
  html.setAttribute("data-theme", storedTheme);
} else if (dark) {
  html.setAttribute("data-theme", "dark");
} else {
  html.setAttribute("data-theme", "light");
}
