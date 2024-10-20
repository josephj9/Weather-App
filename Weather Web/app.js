document.getElementById('getWeather').addEventListener('click', function(){
    const city = document.getElementById('city').value;
    const apiKey = 'YOUR API KEY';  // Replace with your OpenWeatherMap API key

    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.cod === '404'){
            document.getElementById('weatherResult').innerHTML = '<p>City not found. Please try again.</p>';
        } 
        
        else{
            const weather = data.weather[0].main.toLowerCase();
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            let iconFile = '';
            switch(weather) {
                case 'clear':
                    iconFile = 'clear.png';
                    break;
                case 'clouds':
                    iconFile = 'clouds.png';
                    break;
                case 'rain':
                    iconFile = 'rain.png';
                    break;
                case 'drizzle':
                    iconFile = 'drizzle.png';
                    break;
                case 'snow':
                    iconFile = 'snow.png';
                    break;
                case 'mist':
                    iconFile = 'mist.png';
                    break;
                default:
                    iconFile = 'clear.png';  
            }

            const iconUrl = `./images/${iconFile}`; 
            document.getElementById('weatherResult').innerHTML = `
                <p>Weather: ${weather}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Humidity: ${humidity}%</p>
                <img id="weatherIcon" src="${iconUrl}" alt="Weather icon">
                `;
            }
        })
        .catch(error =>{
            document.getElementById('weatherResult').innerHTML = '<p>An error occurred. Please try again.</p>';
        });
});
