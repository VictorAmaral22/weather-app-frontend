import styled from "styled-components";

export const Container = styled.div`
    grid-area: places;	
    display: grid;
    grid-template-areas: "weather forecast"
                         "info    history";
    width: 70vw;
    height: 70vh;
    align-self: center;
    margin-left: 10%;
    background-color: #00487C;
    border-radius: 10px;
`;

export const Weather = styled.div`
    grid-area: weather;
    display: flex;
    flex-direction: column;
    padding-left: 3%;
    padding-top: 3%;
`;

export const Forecast = styled.div`
    grid-area: forecast;
    display: flex;
    flex-direction: column;
`;

export const Info = styled.div`
    grid-area: info;
    display: flex;
    flex-direction: column;
`;

export const History = styled.div`
    grid-area: history;
    display: flex;
    flex-direction: column;
`;

export const Heading = styled.div`
    display: flex;


`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
`;