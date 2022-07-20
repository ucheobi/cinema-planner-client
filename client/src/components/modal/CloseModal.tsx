import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { showModal } from "../../redux/features/movie/modalSlice";
import { useAppDispatch } from "../../redux/hooks";


const CloseBtnContainer = styled.div`
    float: right;
    right: 13rem;
    cursor: pointer;
    z-index: 1000;
    position: relative;
    top: -1rem;
`;

const TextButton = styled.span`
    color: red;
    font-size: 30px;
    font-weight: bolder;
    &:hover {
        color: #080807;
    }
`;

export const CloseButton = () => {

    const dispatch = useAppDispatch();

   return  (
    <CloseBtnContainer onClick={() => dispatch(showModal(false))}>
        <TextButton>
            <FontAwesomeIcon icon={faXmark}  />
        </TextButton>
    </CloseBtnContainer>)
}