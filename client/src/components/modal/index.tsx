import React from "react";
import styled from "styled-components";
import { CloseButton } from "./CloseModal";
import { Modal } from "./Modal";
import { Data, MovieID } from "../../types";
import { MovieCover, MovieImage, MovieTitle } from "../movie/MoviePage";
import { gql, useQuery } from "@apollo/client";
import { Button } from "../Button";
import { showModal } from "../../redux/features/movie/modalSlice";
import { useAppDispatch } from "../../redux/hooks";
import { AUTH_TOKEN } from "../../constant";
import { Link } from "react-router-dom";


const MainModal = styled.section`
    position: absolute;
    overflow: auto;
    max-height: fit-content;
    width: 80%;
    height: 97%;
    top: 0.6em;
    background-color: #fff;
`;

const MovieDetails = styled.section`
    display: flex;
    padding: 10px;
    justify-content: space-between;
`;

const Details = styled.div`
    display: flex;
    width: 90%;
    padding: 4px;
`;

const DetailsContainer = styled.div`
    margin-left: 10px;
`

const TextTitle = styled.span`
    font-size: 16px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 500;
    color: #e9820d;
    padding: 2px;
`;

const MovieData = styled.span`
    font-size: 14px;
    padding: 5px;
    justify-items: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    width: 80%;
    margin: 0 auto ;
    padding: 10px;
    justify-content: space-between;
`

export const QUERY_SINGLE_MOVIE = gql`
  query MovieQuery($movieId: ID!){
    movie(id: $movieId)    
      {
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
      }
}`;

const MovieModal = ({movieId}: MovieID) => {
    const { data, loading,  } = useQuery<Data, MovieID>(
        QUERY_SINGLE_MOVIE,
        { variables: { movieId: movieId }}
    );

    const token = localStorage.getItem(AUTH_TOKEN);

    const dispatch = useAppDispatch();

    if (loading) return <p>Loading ...</p>
    if (!data) return <p>No data</p> 
    
    const link = token ? "/movie/ticket/" : "/user/profile";

    const StyledLink = {
        width: "90%",
    }

    return (
        <Modal>
            {data && (
                <>
                    <MovieTitle>{data.movie.title}</MovieTitle>
                    <CloseButton />
                    <MainModal>
                        <MovieDetails>
                            <MovieCover><MovieImage src={data.movie.url} /></MovieCover>
                            <DetailsContainer>
                                <Details><TextTitle>Title: </TextTitle><MovieData>{ data.movie.title }</MovieData></Details>
                                <Details><TextTitle>Description: </TextTitle><MovieData>{ data.movie.description }</MovieData></Details>
                                <Details><TextTitle>Genre: </TextTitle><MovieData>{ data.movie.genre }</MovieData></Details>
                                <Details><TextTitle>Date: </TextTitle><MovieData>{ data.movie.date }</MovieData></Details>
                                <Details><TextTitle>Duration: </TextTitle><MovieData>{ data.movie.duration }</MovieData></Details>
                                <Details><TextTitle>Time: </TextTitle><MovieData>{ data.movie.time }</MovieData> </Details>
                                <Details><TextTitle>Cost: </TextTitle><MovieData>{ data.movie.cost } Euros</MovieData></Details>
                                <Details><TextTitle>Availability: </TextTitle><MovieData>{ data.movie.availability }</MovieData> </Details> 
                            </DetailsContainer>  
                                                     
                        </MovieDetails>
                        <ButtonContainer>
                            <Link to={link} style={StyledLink}>
                                <Button 
                                    type="button" 
                                    color="primary" 
                                    handleSubmit={() => dispatch(showModal(false))}
                                >
                                    Book Ticket
                                </Button> 
                            </Link>
                            <Button type="button" color="secondary" handleSubmit={() => dispatch(showModal(false))}>Back</Button> 
                        </ButtonContainer>
                    </MainModal>
                </>
            )}
        </Modal>
    )
}

export default MovieModal;

