import './styles.css';
import { useEffect, useState } from 'react'
import { getCoordsByCity, getForecastByCoords } from '../../api';
import Logo from '../../assets/icons/weather.png';
import Thermometer from '../../assets/icons/thermometer.png';
import Calendar from '../../assets/icons/calendar.png';
import SunnyBackground from '../../assets/images/clear_sky.jpg';
import WeatherSun from '../../assets/icons/01d.png';
import WeatherFewClouds from '../../assets/icons/02d.png';
import WeatherScatteredClouds from '../../assets/icons/03d.png';
import WeatherBrokenClouds from '../../assets/icons/04d.png';
import WeatherShowerRain from '../../assets/icons/09d.png';
import WeatherRain from '../../assets/icons/10d.png';
import WeatherStorm from '../../assets/icons/11d.png';
import WeatherSnow from '../../assets/icons/13d.png';
import WeatherMist from '../../assets/icons/50d.png';

export default function Home() {
	const [cityName, setCityName] = useState("")
	const [selectedCity, setSelectedCity] = useState(null)
	const [cityOptions, setCityOptions] = useState([])
	const [weatherData, setWeatherData] = useState(null)
	
	const FindCity = async (e) => {
		e.preventDefault();

		console.log('cityName ',cityName)
		if(cityName != ""){
			const cities = await getCoordsByCity(cityName);
			setCityOptions(cities);
		} else {
			alert('Escreva o nome da cidade!');
		}
	}

	console.log('selectedCity ',selectedCity)

	const getForecast = async () => {
		const response = await getForecastByCoords(selectedCity.lat, selectedCity.lon);
		setWeatherData(response);
	}

	useEffect(() => {
		if(selectedCity){
			getForecast();
		}
	}, [selectedCity]);

	console.log('weatherData ',weatherData)

	const weatherIcon = (icon) => {
		const icons = [
			{id: "01d", image: WeatherSun},
			{id: "02d", image: WeatherFewClouds},
			{id: "03d", image: WeatherScatteredClouds},
			{id: "04d", image: WeatherBrokenClouds},
			{id: "09d", image: WeatherShowerRain},
			{id: "10d", image: WeatherRain},
			{id: "11d", image: WeatherStorm},
			{id: "13d", image: WeatherSnow},
			{id: "50d", image: WeatherMist},
		];
		console.log('icon ',icon)

		return icons.find(item => item.id == icon).image;
	}

    return (
        <div className="App">
			<form onSubmit={(e) => FindCity(e)} className="searchForm">
				<img src={Logo} className='icon' />

				{selectedCity && (
					<div className='cityInfo'>
						<div>
							<h1 className='cityName'>{selectedCity.name}</h1>
							<h4 className='cityDetails'>{selectedCity.state} - {selectedCity.country}</h4>
						</div>
						<div className="change-button" type="submit" onClick={() => setSelectedCity(null)}><p>Trocar Cidade</p></div>
						<h4 className='cityCoords'>{selectedCity.lat}, {selectedCity.lon}</h4>
					</div>
				)}
				{!selectedCity && (
					<div>
						<h2>Qual cidade desejas ver?</h2>
						<div className='searchDiv'>
							<input className="input-text" type="text" name="city" placeholder='Escreva o nome da Cidade...' defaultValue={cityName} onChange={(e) => setCityName(e.target.value)} required />
							<button className="input-button" type="submit">Pesquisar</button>
						</div>

						<div className='placesDiv'>
							{cityOptions.length > 0 && cityOptions.map(item => { return (
								<div className='placeRow' onClick={() => setSelectedCity(item)}>
									<p>{item.name}, {item.state} - {item.country}</p>
								</div>)
							})}
						</div>
					</div>
				)}
			</form>

			<div className='forecast'>
				<div className='backgroundImg' style={{backgroundImage: `url(${SunnyBackground})`}}></div>
				{/* Temperatura atual */}
				<div className='currentTemp'>
					<div class="currentTempHeader">
						<img src={Thermometer} className='tempt-icon' />
						<p class='tempt-title'>Temperatura Atual</p>
					</div>

					<div className='currentTemperature'>
						<div className='temperDiv'>
							<p className='temperature temperatureMain' style={{color: "#4BB3FD"}}>
								{weatherData ? weatherData.main.temp.toFixed(1)+"°" : "0°"}
							</p>
							<div className='temperMinMax'>
								<p className='temperature' style={{color: "#FDEB4B"}}>
									{weatherData ? weatherData.main.temp_max.toFixed(1)+"°" : "0°"}
								</p>
								<p className='temperature' style={{color: "#D8EFFF"}}>
									{weatherData ? weatherData.main.temp_min.toFixed(1)+"°" : "0°"}
								</p>
							</div>
						</div>

						<div className='currentWeather'>
							<img src={weatherData ? weatherIcon(weatherData.weather[0].icon) : WeatherSun} className="wheatherIcon" />
							<p className='wheatherTxt'>{weatherData ? weatherData.weather[0].description : "------"}</p>
						</div>
					</div>
					
				</div>

				{/* Próximos dias */}
				<div className='nextTemp'>
					<div class="currentTempHeader">
						<img src={Calendar} className='tempt-icon' />
						<p class='tempt-title' style={{marginLeft: '4%'}}>Previsão nos Próximos Dias</p>
					</div>

					<div className='currentTemperature'>
						<div className='temperDiv'>
							<p className='temperature'>18°</p>
							<div className='temperMinMax'>
								<p className='temperature'>22°</p>
								<p className='temperature'>16°</p>
							</div>
						</div>

						<div className='currentWeather'>
							<img src={WeatherSun} className="wheatherIcon" />
							<p className='wheatherTxt'>Ensolarado</p>
						</div>
					</div>					
				</div>				
			</div>
        </div>
    );
}
