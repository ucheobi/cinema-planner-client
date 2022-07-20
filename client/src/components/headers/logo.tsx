import React from "react";
import styled from "styled-components";

const LogoContainer = styled.div`
    text-align: center;
    padding: 5px;
    min-width: 30%;
`;

const LogoText = styled.p`
    font-weight: bolder;
    color: #eb8b1e;
    font-size: 40px;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-family: Impact, 'Haettenschweiler', 'Arial Narrow Bold', sans-serif;
`;


export const Logo: React.FC = () => {
    return (
        <LogoContainer>
            <LogoText>cinemax</LogoText>
        </LogoContainer>
    )
}

