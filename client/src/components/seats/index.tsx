import React from 'react';
import styled from 'styled-components'
import { CinemaSeats } from './CinemaSeats';


const TheatreContainer = styled.div`
  
`;

const ScreenTitle = styled.h4`
  width: fit-content;
  font-size: 10px;
  font-weight: bold;
  margin: 25px auto;
  text-align: center;
`;


export const Screen = styled.div`
    display: flex;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px; 
    height: 100px;
    border: solid 3px #000;
    border-color: #000 transparent transparent transparent;
    border-radius: 60%/100px 100px 0 0;
`;


const Seat = () => {

  return (
    <TheatreContainer>
      <Screen />
      <ScreenTitle>Screen</ScreenTitle>
      <CinemaSeats />
    </TheatreContainer>
  )
}


export default Seat;
