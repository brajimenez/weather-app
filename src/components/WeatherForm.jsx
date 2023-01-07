import React from "react";
import { useState } from "react";

const WeatherForm = ({ handleChangeCity,handleLocation }) => {
  const [city, setCity] = useState("");
  const handleChange = ({target}) => {
    const {value} = target;
    setCity(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      handleChangeCity(city);
      setCity("");
    } else {
      alert("Complete los campos con alguna ciudad");
    }
  };
  
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form__input"
          type="text"
          onChange={handleChange}
          value={city}
          placeholder="Busque alguna ciudad"
        />
        <i className="input-icon fa-solid fa-location-dot" onClick={handleLocation}></i>
      </form>
      
    </div>
  );
};

export default WeatherForm;
