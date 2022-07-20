import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../../constant';
import { useAppSelector } from '../../redux/hooks';


const AccountContainer = styled.div`
    display: flex;
    color: white;
    padding: 10px;
    margin-right: 20px;

    &:hover {
        cursor: pointer;
        color: #ff8800;
    }
`;

const UserText = styled.span`
    font-size: 12px;
    font-weight: 600;
    margin: 5px;
`;

const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-decoration: none;
`;

const User = styled.span`
    font-size: 12px;
    color: #109fca;
    margin: 5px;
`

const Account = () => {
    const token = localStorage.getItem(AUTH_TOKEN);
    const navigate = useNavigate();
    const user = useAppSelector(state => state.user);

    const StyledLink = {
        color: 'white',
        textDecoration: 'none',
    }
    
  return (
    <AccountContainer>
        {
            token ? (
                <Link style={StyledLink} to="/" onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN);
                    navigate('/');
                }}>
                    <LinkContainer>
                        <FontAwesomeIcon icon={faUser} />
                        <User>Hello, { user.currentUser?.firstName }</User>
                        <UserText>Logout</UserText>
                    </LinkContainer>   
                </Link>
            ) : (   
                 
                <Link to="/user/profile" style={StyledLink}>
                    <LinkContainer>
                        <FontAwesomeIcon icon={faUser} />
                        <UserText>Login/Signup</UserText>
                    </LinkContainer>    
                </Link>
            )
        }  
    </AccountContainer>
  )
}

export default Account;