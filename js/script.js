const daysToShow = 5;
const cityName = 'Kharkiv'
const countForecastElements = 6;

let weather = {
    apiKey: 'e20f39623c66dea394e1e1148c99e726',

    fetchWeather: function(city) {
        let self = this;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`;
        $.get(url, function(data) {
            self.displayWeather(data);
        })
    },

    fetchForecast: function(city) {
        let self = this;
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${daysToShow + 1}&appid=${this.apiKey}`;
        $.get(url, function(data) {
            self.displayForecast(data);
        })
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
    
        $(".city-val").text(name);
        $(".icon").attr("src", "https://openweathermap.org/img/wn/"+ icon + "@4x.png");
        $(".temperature").text(temp + '°C');
        $(".description").text(description);
        $(".humidity-val").text(humidity + "%");
        $(".wind-val").text(speed + " km/h");

        $("body").css("background-image", "url('https://source.unsplash.com/1600x900/?" + name + "')");
    },

    displayForecast: function(data) {
        $('.forecast').empty();

        let currentDate = data.list[0].dt_txt.split(' ')[0];
        let countElements = 0;

        data.list.forEach(elem => {
            if (countElements > countForecastElements) return;

            const time = formateTime(elem.dt_txt);
            const { icon } = elem.weather[0];
            const { temp } = elem.main;

            let dayElement = document.createElement('div');
            dayElement.classList.add('day');

            let timeElement = document.createElement('h3');
            timeElement.textContent = time;

            let iconElement = document.createElement('img');
            iconElement.classList.add('weather-icon');
            iconElement.src = "https://openweathermap.org/img/wn/"+ icon + "@4x.png";
            iconElement.style.width = '100px'

            let temperatureElement = document.createElement('p');
            let str = "";
            if (temp > 0) str += '+';
            let temperature = temp - 273.15;
            temperatureElement.textContent = str + temperature.toFixed(2) + '°C';

            dayElement.appendChild(timeElement);
            dayElement.appendChild(iconElement);
            dayElement.appendChild(temperatureElement);

            $('.forecast').append(dayElement);
            countElements++;
        })
    }
}

$(".search-button").click(function() {
    let city = $(".search-bar").val();
    weather.fetchWeather(city);
    weather.fetchForecast(city);
})

$(document).keypress(function(event) {
    if (event.key == 'Enter') {
        let city = $(".search-bar").val();
        weather.fetchWeather(city);
        weather.fetchForecast(city);
    }
})

function formateTime(time) {
    let str1 = time.toString().split(' ')[1];
    let str2 = str1.toString().split(':');
    return str2[0] + ":" + str2[1];
}

weather.fetchWeather(cityName);
weather.fetchForecast(cityName);
