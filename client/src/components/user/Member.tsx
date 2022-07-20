import React from 'react'
import styled from 'styled-components'
import { IHandler, primaryColor } from '../../types';

const NewMember = styled.div`
  margin: 30px 0 30px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MemberText = styled.h5`
  margin: 5px 0;
`

const NewMemberLink = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: ${primaryColor};
  font-family: Tahoma, 'Geneva', Verdana, sans-serif;
  border: solid 1px #d1cfcc;
  border-radius: 4px;
  padding: 5px 30px;
  margin: 10px;

  &:hover {
    cursor: pointer;
    transform: scale(0.98);
  }
`

export const Member = ({ setMember, text, title}: IHandler) => {
  return (
    <NewMember>
          <MemberText>{ title }</MemberText>
          <NewMemberLink onClick={setMember}>{ text }</NewMemberLink>
    </NewMember>
  )
}
