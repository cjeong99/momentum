const weather = document.querySelector("#weather");
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuceess(position) {
  console.log(position.coords.latitude);

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
}

function getWeather(lat, lng) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${API_KEY}&units=imperial`
  )
    .then(response => response.json())
    .then(json => {
      const temp = json.main.temp;
      const place = json.name;
      weather.innerText = `${temp} @ ${place}`;
    });
}

function handleGeoError() {
  console.log("Can't Access your Geolocation");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuceess, handleGeoError);
}

const COORDS = "coords";
const API_KEY = "aaa095c560f7686457249ad4169547c5";
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
    getWeather(latitude, longitude);
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    //console.log(parseCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
    //  Get weather
  }
}

loadCoords();
