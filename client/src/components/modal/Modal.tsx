import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../redux/hooks";

interface CurrentModalState {
    children: React.ReactNode;
    modal?: boolean;
}

const ModalContainer = styled.div<CurrentModalState>`
    display: ${({ modal }) => modal ? 'block' : "none"};
    position: fixed;
    z-index: 1100;
    top: 20%;
    left: 15%;
    align-items: center;
    width: 80%;
    height: 67%;    
`;

export const Modal = ({ children }: CurrentModalState) => {

    const show = useAppSelector((state) => state.modal.show);

    return <ModalContainer modal={show}>
        { children }
    </ModalContainer>
}
