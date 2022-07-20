import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Movies } from "../../types";
import { MoviePage } from "./MoviePage";
import styled from "styled-components";


// Scroll down to see the movie queries - too long to put at the top here

const MovieDetailsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background-color: black;
`;

const MovieDetails: React.FC = (): JSX.Element => { 
    const { data } = useQuery<Movies>(QUERY_ALL_MOVIES);
  
    
    return (
      <MovieDetailsContainer>      
          {
            data && (
              <>
                {data.movies.map((movie) => (
                    <MoviePage key={movie.id} movie={movie} /> 
                ))}
              </>      
            )  
          }
      </MovieDetailsContainer>
    )
}

const QUERY_ALL_MOVIES = gql`
 {
 movies {
   id
   title
   url
   cost
   description
   date
   duration
   time
   genre
    availability
    tickets {
      id
      email
      firstName
      lastName
      active
      createdAt
      totalCost
      owner {
        email
        firstName
        id
        lastName
        role
      }
      seat {
        id
        seatNumber
        seatPosition
      }
  }
 }
}
`;


export default MovieDetails