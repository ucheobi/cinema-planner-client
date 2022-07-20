import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import User from './user/User';
import Header  from './headers'
import MovieDetails from './movie';
import Seat from './seats';
import Ticket from './ticket';

const Main = styled.main`
  
`

const HomePage: React.FC = (): JSX.Element => {


  return (
    <Main>
      <Header />
      <Routes>
        <Route path='/' element={<MovieDetails />} />
        <Route path='/user/profile' element={<User />} />
        <Route path='/movie/id/ticket' element={<Ticket />} />
        <Route path='/movie/id/ticket/available-seats' element={<Seat />} />
      </Routes>
    </Main>
  )
}

export default HomePage