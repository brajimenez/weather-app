import React, { useState } from "react";

const WeatherCard = ({ weather, degrees }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const handleClick = () => setIsCelsius(!isCelsius);
  return (
    <section className="weather__container">
      <article className="card">
        <header className="card_header">
          <h1 className="card__title">Weather App</h1>
          <h2 className="card__name-Country">
            {weather?.name}, {weather?.sys.country}
          </h2>
        </header>
        <section>
          <img
            className="card__icon-container"
            src={
              weather &&
              `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`
            }
            alt=""
            width={300}
          />
        </section>
        <section className="card__info">
          <h3 className="card__description">
            "{weather?.weather[0].description}"
          </h3>
          <ul className="card__list">
            <li className="card__item">
              <i className="fa-solid card__icon fa-wind"></i>
              <span className="card__span"> Wind Speed: </span>
              <span className="card__text">{weather?.wind.speed} m/s</span>
            </li>
            <li className="card__item">
              <i className="fa-solid card__icon fa-cloud"></i>
              <span className="card__span"> Clouds: </span>
              <span className="card__text">{weather?.clouds.all} %</span>
            </li>
            <li className="card__item">
              <i className="fa-solid card__icon fa-temperature-arrow-down"></i>
              <span className="card__span"> Pressure: </span>
              <span className="card__text">{weather?.main.pressure} hPa</span>
            </li>
            <li className="card__item">
              <i className="fa-solid card__icon fa-droplet"></i>
              <span className="card__span"> Humidity: </span>
              <span className="card__text">{weather?.main.humidity} %</span>
            </li>
          </ul>
        </section>
        <h3 className="card__temp">
          {isCelsius ? degrees?.celsius + " °C" : degrees?.farenheit + " °F"}
        </h3>
        <footer className="card__footer">
          <button className="card__btn" onClick={handleClick}>
            Change to {isCelsius ? "°F" : "°C"}
          </button>
        </footer>
      </article>
    </section>
  );
};

export default WeatherCard;
