import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);
  const [imgWeater, setImgWheater] = useState('');

  let getWheater = async (lat, long) => {
    let res = await axios.get(
      "http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    console.log(res.data);
    setWeather(res.data);
    setImgWheater('https://copacabana24horas.com.br/wp-content/uploads/2016/11/previsao-do-tempo-clima-tempo.jpg');
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWheater(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    })
  }, [])
  if (location === false) {
    return (
      <>
        Você precisa ativar a localização no Browser o/
      </>
    )
  } else if (weather === false) {
    return (
      <>
        Carregando o Clima
      </>
    )

  } else {
    return (

      <>
        <Navbar />
        <main>

          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img className="w-full" src={imgWeater} alt="Sunset in the mountains" />
              <div className="px-6 py-4">
                <h3 className='font-bold text-xl mb-2'>Tempo agora em {weather['name']}</h3>
                <ul className='px-3 py-3 '>
                  <li>{weather['weather'][0]['description']}</li>
                  <li>Temperatura atual: {weather['main']['temp']}°</li>
                  <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
                  <li>Temperatura minima: {weather['main']['temp_min']}°</li>
                  <li>Pressão: {weather['main']['pressure']} hpa</li>
                  <li>Umidade: {weather['main']['humidity']}%</li>
                  <li>Velocidade do vento: {weather['wind']['speed']}m/s</li>
                  <li>Visibilidade:{weather['visibility']}mt</li>
                </ul>
              </div>
              {/* <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
              </div> */}
            </div>

          </div>

        </main>

      </>
    );
  }
}
export default App;