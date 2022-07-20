import React from 'react'
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setMovieId } from '../../redux/features/movie/modalSlice';
import { Movie } from '../../types';
import MovieModal from '../modal';
import { ShowMovieDetails } from './ShowDetails';


const Container = styled.section`
    padding: 10px;
    margin:0 auto;
`;

const MovieHighlight = styled.article`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const MovieImage = styled.img`
    width: 235px;
    height: 320px;
    margin: 2px;
    src: ${ props => props.src };
    &:hover {
        cursor: pointer;
        border: solid 1px #70707084;
        opacity: 0.4;
    }
`;

export const MovieCover = styled.div`
    width: 245px;
    height: 332px;
    padding: 3px;
    &:hover {
        border: solid 1px #70707084;
    }
`;

export const MovieTitle = styled.h3`
    color: white;
    text-transform: uppercase;
    font-size: 18px;
    width: 100%;
    text-align: center;
    margin-top: 10px;
`;

export const MoviePage = (props: {movie: Movie}) => {

    const { movie } = props;
    const movieId = useAppSelector((state) => state.modal.movieId);
    const dispatch = useAppDispatch();


    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        e.preventDefault();
        dispatch(setMovieId(parseInt(e.currentTarget.id)));    
    }

    
    return (
        <Container>
            <MovieHighlight 
                id={movie.id.toString()} 
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => handleClick(e)}
            >
                <MovieCover>
                    <MovieImage src={movie.url} />
                </MovieCover>
                <MovieModal movieId={movieId} />
                <ShowMovieDetails key={movie.id} />
                <MovieTitle>{movie.title}</MovieTitle>
            </MovieHighlight>
        </Container>
    )
}


