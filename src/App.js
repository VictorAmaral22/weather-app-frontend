import './App.css';
import { useState } from 'react'
import { getCoordsByCity } from './api';

function App() {
	const [cityName, setCityName] = useState("")
	const [selectedCity, setSelectedCity] = useState(null)
	const [cityOptions, setCityOptions] = useState([
		// {name: "Guri", state: "AS", country: "Ih rapaiz"},
		// {name: "Guri", state: "AS", country: "Ih rapaiz"},
		// {name: "Guri", state: "AS", country: "Ih rapaiz"},
		// {name: "Guri", state: "AS", country: "Ih rapaiz"},
	])
	
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

    return (
        <div className="App">
			<form onSubmit={(e) => FindCity(e)} className="searchForm">
				<img src="/assets/weather.png" className='icon' />

				{selectedCity && (
					<div>
						<h1>{selectedCity.name}</h1>
						<h4>{selectedCity.state} - {selectedCity.country}</h4>
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
				{/* Temperatura atual */}
				<div className='currentTemp'></div>

				{/* sensação térmica */}
				<div className='termalSense'></div>

				{/* temperatura mínima, máxima,  */}
				<div className=''></div>
				
				{/* umidade,  */}
				<div className='termalSense'></div>

				{/* informações sobre tempo está limpo, chuvoso, etc */}
				
			</div>
        </div>
    );
}

export default App;
