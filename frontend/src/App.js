import './App.css';
import { Fragment, useRef, useState } from "react";

export default function App() {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(false);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputCityName = useRef();

  const addCityHandler = (event) => {
    if (inputCityName.current.value.trim() === "") {
      setError(true);
    } else {
      setError(false);
    }
    setCities((prevState) => {
      return [...prevState, inputCityName.current.value];
    });
    inputCityName.current.value = "";
  };

  const onInputCityChange = (event) => {
    if (event.target.value.trim() === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  const clearHandler = () => {
    setResult([]);
    setCities([]);
    setIsLoading(false);
    setError(false);
    inputCityName.current.value = "";
  };

  const fetchWeather = async () => {
    if (error) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch("https://weather-app-node-assignment.herokuapp.com/getWeather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cities: cities
        })
      });
      const responseData = await response.json();
      setIsLoading(false);
      setResult(responseData);
      console.log(responseData);
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="assign">Assignment</h1>
      <div className="App">
        <div className="search">
          <div>
            <input
              type="text"
              ref={inputCityName}
              onChange={onInputCityChange}
            />
            {error && (
              <p style={{ color: "red" }}>Please Enter a Valid City!!</p>
            )}
          </div>
          <button onClick={addCityHandler}>Add City</button>
          <div>
            {cities.map((city, index) => {
              return <p key={index}>{city}</p>;
            })}
          </div>
          {cities.length > 0 && (
            <button className="findWeather" onClick={fetchWeather}>
              Find Weather
            </button>
          )}
        </div>
        <div className="results">
          {isLoading && <p style={{ color: "red" }}>Loading.........</p>}
          {result.length > 0 &&
            result.map((city, index) => {
              for (let key in city) {
                return (
                  <p key={index}>
                    {key} : {city[key]}
                  </p>
                );
              }
            })}
        </div>
      </div>
      <div className="clear">
        <button onClick={clearHandler}>Clear Everything</button>
      </div>
    </Fragment>
  );
}

