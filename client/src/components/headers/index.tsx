import React from "react";
import styled from "styled-components";
import Account from "./Account";
import { Logo } from "./logo";
import { NavBar } from "./navbar";

const HeaderContainer = styled.section`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 5px;
    background-color: black;
    align-items: center;
`;

 const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <Logo />
            <NavBar />
            <Account />
        </HeaderContainer>
    )
}

export default Header;


