const Weather = ({ capital, weatherData }) => {
    if (!weatherData) {
        return <p>Loading weather...</p>;
    }

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>Temperature: {weatherData.main.temp} Celsius</p>
            <img 
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                alt={weatherData.weather[0].description} 
            />
            <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
    );
};

export default Weather