import React from 'react'
import styled from 'styled-components'


const SeatContainer = styled.div`
    width: 80%;
    height: 200px;
    border: 5px solid red;
    display: flex;
`;

const SingleSeat = styled.div`
    width: 20px;
    height: 20px;
    margin: 5px;
    background-color: #19aaee;
    border-radius: 2px;
`

const Seat = () => {

  
  return (
    <SeatContainer>
    </SeatContainer>
  )
}

export default Seat;
