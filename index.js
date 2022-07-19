// move bg with mouse
const element = document.body;

element.addEventListener("mousemove", (e) => {
  element.style.backgroundPositionX = -e.offsetX/100 + "px";
  element.style.backgroundPositionY = -e.offsetY/100 + "px";
});


//OpenWeather API
let weather = {
  apiKey: "ec3887fddff5f8a4ad177ca74853cc18",

  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found");
          throw new Error("No weather found");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city-with-link").innerText = name;
    document.querySelector(".city-with-link").setAttribute("href", "https://www.google.com/search?q=" + name);
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temperature").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind: " + speed + " km/h";
    document.querySelector(".loading").innerText = "";
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1920x1080/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Dubai");