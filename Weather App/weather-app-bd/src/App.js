import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [name, setName] = useState("Dhaka");

  useEffect(() => {
    //get API key from .env.local file
    const apiKey = process.env.REACT_APP_API_KEY;

    //get background image from .env.local file
    const hotWeather = process.env.REACT_APP_HOT_WEATHER_IMAGE_URL;
    const normalWeather = process.env.REACT_APP_NORMAL_WEATHER_IMAGE_URL;
    const coldWeather = process.env.REACT_APP_COLD_WEATHER_IMAGE_URL;
    const veryColdWeather = process.env.REACT_APP_VERY_COLD_WEATHER_IMAGE_URL;
    const empty = process.env.REACT_APP_EMPTY_IMAGE_URL;

    async function getData() {
      try {
        // Get response from Weather API
        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${apiKey}`
        );
        response = await response.json();

        if (
          !response.main ||
          !response.main.temp ||
          isNaN(response.main.temp)
        ) {
          // No temperature data found
          document.querySelector(".main").style.backgroundImage = `${empty}`;
          document.querySelector(".data").textContent = "No data found";

          return;
        }

        const temperature = response.main.temp;

        // set background image by Temperature
        if (temperature > 35) {
          document.querySelector(
            ".main"
          ).style.backgroundImage = `url(${hotWeather})`;
        } else if (temperature > 25 && temperature <= 35) {
          // normal weather
          document.querySelector(
            ".main"
          ).style.backgroundImage = `url(${normalWeather})`;

          document.querySelector(".data").style.color = "white";
        } else if (temperature >= 10 && temperature <= 25) {
          // cold weather
          document.querySelector(
            ".main"
          ).style.backgroundImage = `url(${coldWeather})`;
        } else if (temperature < 10) {
          // very cold weather
          document.querySelector(
            ".main"
          ).style.backgroundImage = `url(${veryColdWeather})`;
        }

        // Update the `data` elements in the `footer` section
        document.querySelector(".data").textContent = temperature + "°C";
      } catch (error) {
        // Handle error

        document.querySelector(".data").textContent = "No data found";
        document.querySelector(".data").style.color = "black";
      }
    }

    setTimeout(() => {
      console.clear();
    }, 1000);
    getData();
  }, [name]);

  const onChangeHandler = (e) => {
    // if (name.length <= 13) {
    e.preventDefault();
    setName(e.target.value);
    //   console.log("Writing");
    // } else {
    //   console.log("blocked");
    // }
  };
  return (
    <>
      {/* header  */}
      <div className="headerSection">
        <h1 className="headerText">Quick Weather BD</h1>
      </div>
      {/* main container / content  */}
      <section id="mainSection">
        <div className="main">
          <div className="header">
            <div className="containerHeader">
              <h1 className="subtitle">
                <i>Developed by</i>{" "}
                <span className="devName">
                  <b>
                    <u>Istiak Rahman</u>
                  </b>
                </span>
              </h1>
              <input
                value={name}
                onChange={onChangeHandler}
                type="text"
                className="inputField"
                placeholder="Inter Country or Division name"
              />
              <div className="countryName">{name}</div>
            </div>
          </div>
          <div className="footer">
            {/* info section  */}

            <div className="info">
              <div className="data"></div>
              <div className="data"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
