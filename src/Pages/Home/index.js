import './styles.css';
import { useEffect, useState } from 'react'
import { getCoordsByCity, getForecastByCoords, getWeekForecastByCoords, saveCityHistory, getCityHistory } from '../../api';
import Thermometer from '../../assets/icons/thermometer.png';
import Calendar from '../../assets/icons/calendar.png';
import Details from '../../assets/icons/info.png';
import WeatherSun from '../../assets/icons/01d.png';
import WeatherFewClouds from '../../assets/icons/02d.png';
import WeatherScatteredClouds from '../../assets/icons/03d.png';
import WeatherBrokenClouds from '../../assets/icons/04d.png';
import WeatherShowerRain from '../../assets/icons/09d.png';
import WeatherRain from '../../assets/icons/10d.png';
import WeatherStorm from '../../assets/icons/11d.png';
import WeatherSnow from '../../assets/icons/13d.png';
import WeatherMist from '../../assets/icons/50d.png';
import Sidebar from '../../components/Sidebar';
import Logo from '../../assets/icons/weather.png';
import DoughnutChart from "../../components/Charts/DoughnutChart"
import * as C from './styles'

export default function Home() {
	const [cityName, setCityName] = useState("")
	const [selectedCity, setSelectedCity] = useState(null)
	const [weatherData, setWeatherData] = useState(null)
	const [forecastData, setForecastData] = useState([])
	const [cityHistory, setCityHistory] = useState([])

	// console.log('selectedCity ',selectedCity)

	const getForecast = async () => {
		const response = await getForecastByCoords(selectedCity.lat, selectedCity.lon);
		setWeatherData(response);
		// console.log("response ",response)
		getHistory(response)
		return response
	}
	
	const getWeekForecast = async () => {
		const response = await getWeekForecastByCoords(selectedCity.lat, selectedCity.lon);
		let tmpForecast = [], days = [];

		response.list.map(item => {
			let day = item.dt_txt.split(' ')[0]
			if(!days.find(item2 => item2 == day)){
				days.push(day);
			}
		})
		days = days.slice(1, 4)
		// console.log('days ',days);

		days.map(item => {
			let forecast = response.list.find(item2 => item2.dt_txt.split(' ')[0] == item)
			tmpForecast.push(forecast);
			// console.log('forecast ',forecast)
		})

		setForecastData(tmpForecast);
	}

	const getHistory = async (forecast) => {
		let res = await getCityHistory(forecast.id)
		// console.log("getHistory ",res)
		setCityHistory(res.history)
	}

	useEffect(() => {
		if(selectedCity){
			getForecast();
			getWeekForecast();
		}
	}, [selectedCity]);

	// console.log('weatherData ',weatherData)
	// console.log('forecastData ',forecastData)
	// console.log("selectedCity ",selectedCity)
	console.log("cityHistory ",cityHistory)

	const weatherIcon = (icon) => {
		const icons = [
			{id: "01d", id2: "01n", image: WeatherSun},
			{id: "02d", id2: "02n", image: WeatherFewClouds},
			{id: "03d", id2: "03n", image: WeatherScatteredClouds},
			{id: "04d", id2: "04n", image: WeatherBrokenClouds},
			{id: "09d", id2: "09n", image: WeatherShowerRain},
			{id: "10d", id2: "10n", image: WeatherRain},
			{id: "11d", id2: "11n", image: WeatherStorm},
			{id: "13d", id2: "13n", image: WeatherSnow},
			{id: "50d", id2: "50n", image: WeatherMist},
		];
		return icons.find(item => item.id == icon || item.id2 == icon).image;
	}

	const saveData = async () => {
		let datetime = new Date()
		datetime = datetime.toISOString().split("T")
		const data = {
			"city_id": weatherData.id,
			"city_name": cityName, 
			"date": datetime[0], 
			"time": datetime[1], 
			"temperature": weatherData.main.temp, 
			"sensation": weatherData.main.feels_like, 
			"humidity": weatherData.main.humidity,
			"weather": weatherData.weather[0].description
		}

		// console.log("data ",data)
		let res = await saveCityHistory(data)
		// console.log("res ",res)
		return res;
	}

	useEffect(() => {
		if(weatherData && selectedCity){
			saveData()
		}
	}, [weatherData])

    return (
        <div className="App">
			<Sidebar 
				selectedCity={selectedCity}
				setSelectedCity={(value) => setSelectedCity(value)}
				cityName={cityName}
				setCityName={(value) => setCityName(value)}
				setCityHistory={(value) => setCityHistory(value)}
			/>

			<C.Container>
				<C.Weather>
					<C.Heading>
						<img src={Thermometer} className='tempt-icon' />
						<p className='tempt-title'>Temperatura Atual</p>	
					</C.Heading>
					
					<C.Content>
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
					
						<div className='currentWeather'>
							<img src={weatherData ? weatherIcon(weatherData.weather[0].icon) : WeatherSun} className="wheatherIcon" />
							<p className='wheatherTxt'>{weatherData ? weatherData.weather[0].description : "------"}</p>
						</div>
					</C.Content>

				</C.Weather>
				{/* <div className='currentTemp'>

					<div className="currentTempHeader">
						<img src={Details} className='details-icon' />
						<p className='tempt-title' style={{marginLeft: '4%'}}>Outras informações</p>
					</div>

					<div className='currentWeatherDetails'>
						<ul>
							<li>Sensação Térmica: {weatherData ? weatherData.main.feels_like+"°" : "0°"}</li>
							<li>Pressão Atmosférica: {weatherData ? weatherData.main.pressure+" atm" : "0 atm"}</li>
							<li>Humidade: {weatherData ? weatherData.main.humidity+"%" : "0%"}</li>
						</ul>
					</div>
					
					<div className='nextTemp'>
						<div className="currentTempHeader">
							<img src={Calendar} className='tempt-icon' />
							<p className='tempt-title' style={{marginLeft: '4%'}}>Previsão nos Próximos Dias</p>
						</div>

						<div className='nextTemperature'>
							<div className='daysDiv'>
								{forecastData && forecastData.length > 0 && forecastData.map(item => {
									let date = item.dt_txt.split(" ")[0].split("-");
									return <div className='dayCard'>
										<p className='dayCardDate'>{`${date[2]}/${date[1]}`}</p>
										<img className='dayCardIcon' src={item.weather ? weatherIcon(item.weather[0].icon) : WeatherSun} />
										<p className='dayCardTemp'>{item.main.temp}°</p>
										<p className='dayCardDescrpt'>{item.weather[0].description}</p>
									</div>
								})}
								{forecastData && forecastData.length === 0 && [1,2,3].map(item => {
									return <div className='dayCard'>
										<p className='dayCardDate'>10/09</p>
										<img className='dayCardIcon' src={WeatherSun} />
										<p className='dayCardTemp'>0°</p>
										<p className='dayCardDescrpt'>Tempe Ensolarado</p>
									</div>
								})}
							</div>

						</div>					
						
						<div className="currentTempHeader">
							<img src={Calendar} className='tempt-icon' />
							<p className='tempt-title' style={{marginLeft: '4%'}}>Histórico da cidade</p>
						</div>
						<div className='history'>
							<DoughnutChart history={cityHistory}/>
						</div>
					</div>	
				</div> */}
			</C.Container>
        </div>
    );
}
