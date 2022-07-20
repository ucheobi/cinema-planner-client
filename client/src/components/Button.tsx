import React from "react";
import styled, { css } from "styled-components";

export type ButtonProps = {
    color?: 'primary' | 'secondary' | 'success';
    children?: React.ReactNode;
    disabled?: boolean;
    handleSubmit?: () => void;
    type: 'button' | 'submit' | 'reset' | undefined;
}

const ButtonContainer = styled.button<ButtonProps>`
    cursor: pointer;
    width: 45%;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    outline: none;
    transition: all 0.2s;
    ${({ color }) => color && COLOR[color] };
    ${({ disabled }) => disabled && DISABLED }; 
`;


const COLOR = {
    primary: css`
      color: #fff;
      background: linear-gradient(#a8e221, #e4ce09);
      &:hover {
        transform: scale(0.98);
      }
    `,
    secondary: css`
      color: #000;
      background: linear-gradient(#e9b592, #f00625);
      &:hover {
        transform: scale(0.98);
        transition: 0.15s;
      }
    `,
    success: css`
    color: #fff;
    background: #0476e0;
    &:hover {
      transform: scale(0.98);
      transition: 0.15s;
    }
  `,
  };

const DISABLED = css`
  cursor: not-allowed;
  background: #d4d4d4;
  color: #f5f5f5;
`;

export const Button = ({ children, color = 'primary', disabled, handleSubmit, type='submit' }: ButtonProps) => {
    return (
        <ButtonContainer type={type} onClick={handleSubmit} color={color} disabled={disabled}>
            { children }
        </ButtonContainer>
    )
}