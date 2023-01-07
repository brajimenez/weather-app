import { useState } from "react";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import Loading from "./components/Loading";
import WeatherForm from "./components/WeatherForm";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [degrees, setDegrees] = useState();

  const succes = ({ coords }) => {
    const { latitude, longitude } = coords;
    setCoords({ lat: latitude, lon: longitude });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succes);
  }, []);

  useEffect(() => {
    if (coords) {
      const apiKey = "f1ef9541b5d166dfd62d636217c42e8e";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`;
      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data);

          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const farenheit = (celsius * (9 / 5) + 32).toFixed(1);
          setDegrees({ celsius, farenheit });
          console.log(celsius);
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  const getGeocodingApi = (city) => {
    const apiKey = "f1ef9541b5d166dfd62d636217c42e8e";
    const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

    axios
      .get(URL)
      .then(({ data }) => {
        const { lat, lon } = data[0];
        setCoords({ lat, lon });
      })
      .catch((err) => {
        alert("Escriba correctamente el nombre de la ciudad");
        navigator.geolocation.getCurrentPosition(succes);
      });
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(succes);
  };
  const handleChangeCity = (city) => {
    setWeather(null);
    getGeocodingApi(city);
  };

  return (
    <div className="App">
      <WeatherForm
        handleLocation={handleLocation}
        handleChangeCity={handleChangeCity}
      />
      {weather ? (
        <WeatherCard weather={weather} degrees={degrees} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
