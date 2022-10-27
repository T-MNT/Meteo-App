import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Card from './Card';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faStar } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [city, setCity] = useState();
  const [weatherData, setWeatherData] = useState([]);
  const [favData, setFavData] = useState([]);

  let mappedData;
  let favList = [];
  let mappedFavs;

  const getWeatherData = async (e) => {
    e.preventDefault();
    if (city) {
      let cityInseeCode;
      let cityName;

      try {
        await axios
          .get(
            `https://geo.api.gouv.fr/communes?nom=${city}&fields=departement&boost=population&limit=5`
          )
          .then(
            (res) => (
              (cityInseeCode = res.data[0].code), (cityName = res.data[0].nom)
            )
          );

        axios
          .get(
            `https://api.meteo-concept.com/api/forecast/daily?token=e12c8d46b8bb13effbbbbbc08747aaaa9a18860b5e1f15e2a876343e9cf02c68&insee=${cityInseeCode}`
          )
          .then((res) => setWeatherData(res.data.forecast));
        document.getElementById('error').textContent = '';
        document.getElementById(
          'say'
        ).textContent = `Voici les prévisions météo à ${cityName} pour les 14 prochains jours`;
      } catch (error) {
        document.getElementById('error').textContent =
          'Veuillez indiquer un nom de ville correct';
        document.getElementById('say').textContent = '';
      }
    }
  };

  const dataMapper = () => {
    mappedData = weatherData.map((weatherDayData) => (
      <li>
        <Card
          tMax={weatherDayData.tmax}
          tMin={weatherDayData.tmin}
          probaRain={weatherDayData.probarain}
          date={weatherDayData.datetime}
          windSpeed={weatherDayData.wind10m}
          weather={weatherDayData.weather}
        />
      </li>
    ));
  };

  const addFav = () => {
    if (localStorage.getItem('Ville(s) favorite(s)')) {
      favList = JSON.parse(localStorage.getItem('Ville(s) favorite(s)'));
      setFavData(favList);
    }
    if (!favList.includes(city)) {
      favList.push(city);
      setFavData(favList);
      window.localStorage.setItem(
        'Ville(s) favorite(s)',
        JSON.stringify(favList)
      );
    } else {
    }
  };
  const deleteFav = (fav) => {
    if (localStorage.getItem('Ville(s) favorite(s)')) {
      favList = JSON.parse(localStorage.getItem('Ville(s) favorite(s)'));
      setFavData(favList);
    }
    if (favList.includes(fav)) {
      let i = favList.indexOf(fav);
      favList.splice(i, 1);
      setFavData(favList);
      window.localStorage.setItem(
        'Ville(s) favorite(s)',
        JSON.stringify(favList)
      );
    }
  };

  const getWeatherDataFromFav = (favCity, e) => {
    setCity(favCity);
    getWeatherData(e);
  };

  const favDisplayer = () => {
    if (localStorage.getItem('Ville(s) favorite(s)')) {
      favList = JSON.parse(localStorage.getItem('Ville(s) favorite(s)'));
    }
    mappedFavs = favList.map((fav) => (
      <li>
        <p onClick={(e) => getWeatherDataFromFav(fav, e)}>{fav}</p>

        <span>
          <FontAwesomeIcon
            icon={faCircleXmark}
            onClick={() => deleteFav(fav)}
          />
        </span>
      </li>
    ));
  };

  useEffect(() => {
    dataMapper();
  }, [weatherData]);

  useEffect(() => {
    favDisplayer();
  }, [favData]);

  favDisplayer();
  dataMapper();
  return (
    <div className="App">
      <header>
        <h1>Meteo App</h1>
        <div className="form-container">
          <form onSubmit={(e) => getWeatherData(e)}>
            <div className="label-input-container">
              <label id="error"></label>
              <div className="fav-input-container">
                <span id="fav">
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: 'yellow' }}
                    onClick={() => addFav()}
                  />
                </span>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Indiquez votre ville"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <input type="submit" value="Valider" />
          </form>
        </div>
        <div className="favoris">
          <h3>Favoris</h3>
          <ul>{mappedFavs}</ul>
        </div>
      </header>

      <main>
        <span id="say"></span>
        <ul className="previsions">{mappedData}</ul>
      </main>
    </div>
  );
}

export default App;
