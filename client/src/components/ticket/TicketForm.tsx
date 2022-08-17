import React from "react";
import {  useForm } from "react-hook-form";
import styled from "styled-components";
import Joi from "joi";
import { Button } from "../Button";
import { joiResolver } from "@hookform/resolvers/joi";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Ticket, TicketType } from "../../types";
import { useNavigate } from "react-router-dom";
import { setTicket } from "../../redux/features/ticket/ticketSlice";

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  ticketType: TicketType;
};

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  ticketType: Joi.string()
})


const FormContainer = styled.div`
  width: 60%;
  padding: 30px;
  margin: 40px auto;
`;


const Header = styled.h2`
    text-align: center;
    text-decoration: underline;
    margin-bottom: 15px;
    font-family: Tahoma, Geneva, Verdana, sans-serif;
`

const Form = styled.form`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 20px;
  border-radius: 4px;
  width: 100%;
  margin: 0 auto;
`

const Input = styled.input`
    width: 70%;
    padding: 10px;
    border: none;
    box-shadow: 1px 2px 1px 0 rgba(0, 0, 0, 0.2), 2px 2px 8px 0 rgba(0, 0, 0, 0.19);
    border-radius: 4px;
    resize: vertical;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 20px auto 0 auto;
`

const Label = styled.label`
    font-size: 12px;
    width: 30%;
    text-align: right;
    padding: 10px 5px 5px 0;
    margin-left: 5px;
`;

const SelectInput = styled.select`
    width: 30%;
    padding: 1px 0;
    font-size: 12px;
    margin-right: 180px;
    border: none;
    border-radius: 4px;
    background-color: #f1f1f1;
`;

const SelectOption = styled.option`
    
`

const Important = styled.span`
    font-size: 10px;
    font-weight: bold;
    padding: 12px 2px 0 5px;
`

const Submit = styled.span`
    display: flex;
    width: 80%;
    padding: 5px;
    margin: 20px auto;
`;

const AsterikMessage = styled.span`
  margin-left: 10rem;
  font-size: 8px;
  text-align: center;
`;

const TicketForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({ 
    resolver: joiResolver(schema)
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const StyledLink = {
    width: "100%",
    marginRight: "10px"
  }

  const onSubmitHandler = (data: Ticket) => {
    dispatch(setTicket(data));
    navigate('/movie/ticket/available-seats');
  }


  return (
    <FormContainer>
      <Header>Ticket Owner's Details</Header>
      <Form>
        <InputContainer>
          <Label>First Name:</Label>
          <Input {...register("firstName")} placeholder='First Name' type='text' /> 
          <Important>*</Important> 
        </InputContainer>
        
        <InputContainer>
          <Label>Last Name:</Label>
          <Input {...register("lastName")} placeholder='Last Name' type='text'/>
          <Important>*</Important> 
        </InputContainer>

        <InputContainer>
          <Label>Email:</Label>
          <Input {...register("email")} placeholder='Email' type='email' />  
          <Important>*</Important> 
        </InputContainer>
        
        <InputContainer>
          <Label>Ticket Type:</Label>
          <SelectInput {...register("ticketType")} placeholder='Ticket Type' defaultValue={TicketType.SINGLE}>
            <SelectOption value='SINGLE'>SINGLE</SelectOption>
            <SelectOption value='COUPLE'>COUPLE</SelectOption>
            <SelectOption value='FAMILY'>FAMILY</SelectOption>
          </SelectInput>      
        </InputContainer>

        <AsterikMessage>* indicates required fields</AsterikMessage> 

        <Submit>
          <Button type='submit' handleSubmit={handleSubmit(onSubmitHandler)}>Choose Seat</Button>
          <Button type="button" color="secondary">Back</Button>
        </Submit>    
      </Form>
    </FormContainer> 
  );
}

export default TicketForm;
