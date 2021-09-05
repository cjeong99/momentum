const clock = document.querySelector("h2#clock");
function getClock() {
  const date = new Date();
  const hours = date
    .getHours()
    .toString()
    .padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  clock.innerHTML = `${hours}:${min}:${second}`;
}
setInterval(getClock, 1000);
