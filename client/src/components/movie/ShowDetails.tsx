import React from 'react'
import styled from 'styled-components';
import {  showModal } from '../../redux/features/movie/modalSlice';
import { useAppDispatch } from '../../redux/hooks';

interface ShowProps {
    details?: boolean
}

const ShowDetails = styled.span<ShowProps>`
    display: block;
    z-index: 999;
    border: solid 4px #eb8b1e;
    border-radius: 5px;
    color: white;
    padding: 1px;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    width: 70%;
    position: absolute;
    top: 100px;
    &:hover {
        cursor: pointer;
        background-color: #eb8b1e;
        color: white;
    }
`;


export const ShowMovieDetails = () => {

    const dispatch = useAppDispatch();

     return (
        <ShowDetails  
            onClick={() => dispatch(showModal(true))}   
        >
            show details
        </ShowDetails>
     )
}