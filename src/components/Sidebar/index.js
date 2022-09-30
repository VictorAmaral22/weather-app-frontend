import { useEffect, useState } from 'react';
import Logo from '../../assets/icons/weather.png';
import './styles.css';
import { getCoordsByCity } from '../../api';

export default function Sidebar({
    selectedCity,
    setSelectedCity,
    cityName,
    setCityName,
    setCityHistory,
}){

    const [cityOptions, setCityOptions] = useState([])
    
    const FindCity = async (e) => {
		e.preventDefault();
		if(cityName != ""){
			const cities = await getCoordsByCity(cityName);
			setCityOptions(cities);
		} else {
			alert('Escreva o nome da cidade!');
		}
	}

    return (
        <form onSubmit={(e) => FindCity(e)} className="searchForm">
            <img src={Logo} className='icon' />

            {selectedCity && (
                <div className='cityInfo'>
                    <div>
                        <h1 className='cityName'>{selectedCity.name}</h1>
                        <h4 className='cityDetails'>{selectedCity.state} - {selectedCity.country}</h4>
                    </div>
                    <div className="change-button" type="submit" onClick={() => {setSelectedCity(null); setCityHistory([])}}><p>Trocar Cidade</p></div>
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
                        {cityOptions.length > 0 && cityOptions.map((item, key) => { return (
                            <div key={key} className='placeRow' onClick={() => setSelectedCity(item)}>
                                <p>{item.name}, {item.state} - {item.country}</p>
                            </div>)
                        })}
                    </div>
                </div>
            )}
        </form>
    )
}