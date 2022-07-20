import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Login from "./Login";
import Register from "./Register";
import { setMember } from "../../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";

const UserContainer = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
`;

const User = () => {

  const member = useAppSelector((state) => state.user.member);
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    e.preventDefault();
    dispatch(setMember());
  }

  return (
    <UserContainer>
      {member ? <Register setMember={handleClick} /> : <Login setMember={handleClick} />}
    </UserContainer>
  )
}

export default User