let findWeather = async (location) => {
  let API_key = "6e981f86d1cae5e3be65718ee6bdbaee";
  let response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      location +
      "&units=metric&appid=" +
      API_key
  );
  let data = await response.json();
  return data;
};

let getdetails = (city) => {
  let data = findWeather(city);
  data.then((value) => {
    if (value.cod === "404") {
      document.querySelector(".load").innerText = "City not found";
    } else {
      document.querySelector(".load").innerText = "Loading...";
      let descript = value.weather[0];
      let main = value.main;
      document.querySelector(".city").innerText = "Weather in " + city;
      document.querySelector(".description").innerText = descript.main;
      document.querySelector(".image").src =
        "http://openweathermap.org/img/wn/" + descript.icon + "@2x.png";
      document.querySelector(".temp").innerText = main.temp + "℃";
      document.querySelector(".humidity").innerText =
        "Humidity: " + main.humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + value.wind.speed + "km/h";
      document.querySelector(".background").style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + city + "')";
      document.querySelector(".loading").style.display = "none";
      document.querySelector(".loaded").style.display = "block";
    }
  });
};
let searchfunction = () => {
  let city = document.querySelector(".search-input").value;
  if (city) {
    document.querySelector(".loaded").style.display = "none";
    document.querySelector(".loading").style.display = "block";
    getdetails(city);
  }
};

document.querySelector(".search-input").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    let city = document.querySelector(".search-input").value;
    if (city) {
      document.querySelector(".loaded").style.display = "none";
      document.querySelector(".loading").style.display = "block";
      getdetails(city);
    }
  }
});

getdetails("Kerala");
