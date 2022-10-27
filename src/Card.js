import React from 'react';
import './card.css';

const Card = (props) => {
  const dateFormater = () => {
    let date = props.date.split('T')[0];
    let [year, month, day] = date.split('-');

    switch (month) {
      case '01':
        month = 'Janvier';

        break;

      case '02':
        month = 'Février';

        break;

      case '03':
        month = 'Mars';

        break;

      case '04':
        month = 'Avril';

        break;

      case '05':
        month = 'Mai';

        break;

      case '06':
        month = 'Juin';

        break;

      case '07':
        month = 'Juillet';

        break;

      case '08':
        month = 'Août';

        break;

      case '09':
        month = 'Septembre';

        break;

      case '10':
        month = 'Octobre';

        break;

      case '11':
        month = 'Novembre';

        break;

      case '12':
        month = 'Decembre';

        break;

      default:
        break;
    }

    date = [day, month, year].join(' ');
    return date;
  };
  const imageDisplayer = () => {
    switch (props.weather) {
      case 0:
        return <img src="./Assets/images/logo_soleil.png" />;
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 30:
      case 31:
      case 32:
      case 40:
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
      case 46:
      case 47:
      case 48:
      case 70:
      case 71:
      case 72:
      case 73:
      case 74:
      case 75:
      case 76:
      case 77:
      case 78:
      case 210:
      case 211:
      case 212:
      case 230:
      case 231:
      case 232:
        return <img src="./Assets/images/logo_pluie.png" />;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return <img src="./Assets/images/logo_nuage.png" />;
      case 20:
      case 21:
        return <img src="./Assets/images/logo_neige.png" />;
      case 6 || 7:
        return <img src="./Assets/images/logo_brouillard.png" />;
      default:
        break;
    }
  };
  return (
    <div className="card">
      <h1>{dateFormater()}</h1>
      {imageDisplayer()}
      <ul className="card-ul">
        <li>Temperature minimale : {props.tMin} °C</li>
        <li>Temperature maximale : {props.tMax} °C</li>
        <li>Probabilité de pluie : {props.probaRain} % </li>
        <li>Vitesse moyenne des vents : {props.windSpeed} km/h</li>
        <li></li>
      </ul>
    </div>
  );
};

export default Card;
