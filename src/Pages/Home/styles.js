import styled from "styled-components";

export const Container = styled.div`
    display: grid;
	width: 100%;
	height: 100vh;
	padding: 0;
	grid-template-columns: 10fr 60fr;
	grid-template-areas: "searchForm places"
						 "searchForm places";
	/* justify-content: center; */
	background-color: #3E6680;
`;

export const Dashboard = styled.div`
    grid-area: places;	
    display: grid;
    grid-template-columns: 4fr 3fr;
    grid-template-areas: "weather forecast"
                         "info    history";
    width: 80%;
    height: 90vh;
    align-self: center;
    background-color: #00487C;
    justify-self: center;
    border-radius: 10px;
    padding-left: 2%;
    padding-top: 1%;
`;

export const Weather = styled.div`
    grid-area: weather;
    display: flex;
    height: 40vh;
    flex-direction: column;
`;

export const Forecast = styled.div`
    grid-area: forecast;
    display: flex;
    flex-direction: column;
`;

export const Info = styled.div`
    grid-area: info;
    display: flex;
    height: 50vh;
    flex-direction: column;
`;

export const History = styled.div`
    grid-area: history;
    display: flex;
    flex-direction: column;
`;

export const Heading = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`;

export const Icon = styled.img`
    width: 50px;
    margin-right: 4%;
`;

export const HeadingTitle = styled.p`
    font-size: 1.5em;
    font-weight: bold;
    color: #fff;
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    /* flex-direction: column; */

    .temperatureMain {
        font-size: 5em;
        margin-right: 5%;
    }

    .temperMinMax {
        display: flex;
        flex-direction: column;
    }

    .currentWeather {
        margin-left: 10%;
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        align-items: center;
        color: #fff;
        font-weight: bold;
    }

    .wheatherIcon {
        width: 132px;
        margin-top: 2vh;
        margin-bottom: 5vh;
    }

    .currentWeatherDetails {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        background-color: #01416e;
        width: 90%;
        border-radius: 5px;
    }

    .currentWeatherDetails ul {
        justify-self: flex-start;
    }
`;

export const DayCard = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #01416e;
    width: 20%;
    height: 230px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding-left: 3%;
    padding-right: 3%;

    .dayCardDate {
        font-weight: bold;
        color: #fff;
    }

    .dayCardIcon {
        width: 70%;
    }

    .dayCardTemp {
        font-size: 0.9em;
        text-align: center;
        font-weight: bold;
        color: #0496FF;
        margin-bottom: -2%;
    }

    .dayCardDescrpt {
        font-size: 0.9em;
        text-align: center;
        font-weight: bold;
        color: #fff;
    }

    .details-icon {
        width: 10%;
    }
`;

export const ChartWrapper = styled.div`
    width: 26vw;
    height: 37vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    padding-bottom: 5%;
`;

export const ChartOptions = styled.div`
    display: flex;
    width: 100%;
    height: 10%;
    justify-content: space-evenly;
    align-items: center;
    background-color: #01416e;
    position: absolute;
    bottom: 0;
    border-radius: 0px 0px 5px 5px;
    
    .option, .option-selected {
        color: #fff;
        font-weight: bold;
        width: 40%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all ease 0.2s;
    }

    .option:hover {
        background-color: #fff;
        color: #01416e;
        border-radius: 0px 0px 5px 5px;
    }

    .option-selected {
        background-color: #fff;
        color: #01416e;
        border-radius: 0px 0px 5px 5px;
    }
`;