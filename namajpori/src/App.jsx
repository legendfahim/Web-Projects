import { useEffect, useState } from "react";
import "./App.css";
import { GetLocation } from "./components/GetLocation";
import { Main } from "./components/Main";
import { Navbar } from "./components/Navbar";

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [prayerTimes, setPrayerTimes] = useState({
    fajr: "",
    dhuhr: "",
    asr: "",
    maghrib: "",
    isha: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      getLocation();
    }
  }, [latitude, longitude]);

  const getLocation = async () => {
    const url = `https://api.opencagedata.com/geocode/v1/json?key=dcdd4e41da694a25b67e243c86276da3&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }
      const data = await response.json();
      const cityFullName = data.results[0].components.city;
      const cityName = cityFullName.split(" ")[0];
      setCountry(data.results[0].components.country);
      setCity(cityName);

      getTime(cityName, data.results[0].components.country);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const getTime = async (city, country) => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const url = `https://api.aladhan.com/v1/timingsByCity/${day}-${month}-${year}?city=${city}&country=${country}&method=8`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch prayer times data");
      }
      const resData = await response.json();
      const { Fajr, Dhuhr, Asr, Maghrib, Isha } = resData.data.timings;
      setPrayerTimes({
        fajr: convertTo12HourFormat(Fajr),
        dhuhr: convertTo12HourFormat(Dhuhr),
        asr: convertTo12HourFormat(Asr),
        maghrib: convertTo12HourFormat(Maghrib),
        isha: convertTo12HourFormat(Isha),
      });
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours, 10);
    const suffix = hour >= 12 ? "PM" : "AM";
    hour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${hour}:${minutes} ${suffix}`;
  };

  let notFound;
  let main;

  if (!latitude || !longitude) {
    notFound = <GetLocation />;
  } else {
    main = (
      <Main
        city={city}
        country={country}
        fajr={prayerTimes.fajr}
        dhuhr={prayerTimes.dhuhr}
        asr={prayerTimes.asr}
        maghrib={prayerTimes.maghrib}
        isha={prayerTimes.isha}
      />
    );
  }

  return (
    <>
      <Navbar />
      <div className="h-fit py-5 px-3  ">
        {notFound}
        {main}
      </div>
    </>
  );
}

export default App;
