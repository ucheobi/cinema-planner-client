import React from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom'


const NavContainer = styled.div`
    display: flex;
    width: 50%;
    padding: 25px;
`;

const ItemContainer = styled.ul`
  display: flex;
  min-width: 100%;
  list-style: none;
`;

const NavItem = styled.li`
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 0 15px;

  &:hover {
    color: #eb8b1e;
  }
`;



export const NavBar: React.FC = () => {

  const StyledLink = {
    color: 'white',
    textDecoration: 'none',
  }
  
  return (
        <NavContainer>
          <ItemContainer>
            <Link to='/' style={StyledLink}><NavItem>HOME</NavItem></Link>
            <Link to='/aboutus' style={StyledLink}><NavItem>ABOUT</NavItem></Link>
            <Link to='/movies' style={StyledLink}><NavItem>MOVIES</NavItem></Link>
            <Link to='/contact'  style={StyledLink}><NavItem>CONTACT</NavItem></Link>
          </ItemContainer>
        </NavContainer>
  )
}


