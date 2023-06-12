var city = 'Kharkiv';
var daysToShow = 5;

let weather = {
    apiKey: 'e20f39623c66dea394e1e1148c99e726',

    fetchWeather: function(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },

    fetchForecast: function(city) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${daysToShow + 1}&appid=${this.apiKey}`)
        .then((response) => response.json())
        .then((data) => this.displayForecast(data))
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
    
        $(".city-val").text(name);
        $(".icon").attr("src", "https://openweathermap.org/img/wn/"+ icon + ".png");
        $(".temperature").text(temp + '°C');
        $(".description").text(description);
        $(".humidity-val").text(humidity + "%");
        $(".wind-val").text(speed + " km/h");

        $(".weather").removeClass("loading");
        $("body").css("background-image", "url('https://source.unsplash.com/1600x900/?" + name + "')");
    },

    displayForecast: function(data) {
        console.log(data);
        var currentDate = data.list[0].dt_txt.split(' ')[0];
        $('.forecast').empty();
        
        data.list.forEach(elem => {
            const time = formateTime(elem.dt_txt);
            if (elem.dt_txt.split(' ')[0] != currentDate 
                && time != '00:00') return;

            const { icon, description } = elem.weather[0];
            const { temp, humidity } = elem.main;
            const { speed } = elem.wind;

            let dayElement = document.createElement('div');
            dayElement.classList.add('day');

            let dateElement = document.createElement('h3');
            dateElement.textContent = time;


            let iconElement = document.createElement('img');
            iconElement.classList.add('weather-icon');
            iconElement.src = "https://openweathermap.org/img/wn/"+ icon + ".png";
            iconElement.style.width = '100px'

            let temperatureElement = document.createElement('p');
            let str = "";
            if (temp > 0) str += '+';
            let temperature = temp - 273.15;
            temperatureElement.textContent = str + temperature.toFixed(2) + '°C';

            dayElement.appendChild(dateElement);
            dayElement.appendChild(iconElement);
            dayElement.appendChild(temperatureElement);

            $('.forecast').append(dayElement);
        })
    }
}

$(".search-button").click(function() {
    city = $(".search-bar").val();
    weather.fetchWeather(city);
    weather.fetchForecast(city);
})

function formateTime(time) {
    let str1 = time.toString().split(' ')[1];
    let str2 = str1.toString().split(':');
    return str2[0] + ":" + str2[1];
}

weather.fetchWeather(city);
weather.fetchForecast(city);