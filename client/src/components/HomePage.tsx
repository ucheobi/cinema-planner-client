import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import User from './user/User';
import Header  from './headers'
import MovieDetails from './movie';
import Seat from './seats';
import Ticket from './ticket';
import BookingSummary from './BookingSummary';

const Main = styled.main`
  
`

const HomePage: React.FC = (): JSX.Element => {


  return (
    <Main>
      <Header />
      <Routes>
        <Route path='/' element={<MovieDetails />} />
        <Route path='/user/profile' element={<User />} />
        <Route path='/movie/ticket' element={<Ticket />} />
        <Route path='/movie/ticket/available-seats' element={<Seat />} />
        <Route path='/movie/ticket/booking-summary' element={<BookingSummary />} />
      </Routes>
    </Main>
  )
}

export default HomePage