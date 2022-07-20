import React from "react";
import {  useForm } from "react-hook-form";
import styled from "styled-components";
import Joi from "joi";
import { Button } from "../Button";
import { joiResolver } from "@hookform/resolvers/joi";
import { IHandler } from "../../types";
import { Member } from "./Member";
import { registerUser } from "../../redux/features/user/userSlice";
import { useAppDispatch } from "../../redux/hooks";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../../constant";


const SIGNUP_MUTATION = gql`
    mutation signup($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        email
        firstName
      }
    }
}
`;

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
})

const FormContainer = styled.div`
  width: 45%;
  padding: 10px;
  margin: 20px auto;
  border-radius: 4px;
`;

const Title = styled.h3`
  text-align: center;
  margin: 20px 10px 20px 25px;
`

const Header = styled.h2`
  text-align: center;
  text-decoration: underline;
  margin-bottom: 15px;
  font-family: Tahoma, 'Geneva', Verdana, sans-serif;
`;

const Form = styled.form`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 20px;
  width: 100%;
  margin: 0 auto;
`

const FirstNameInput = styled.input.attrs({
  type: "firstName",
  placeholder: "Enter your first name",
  placeholderTextColor: "#c8b9da",
})`
  width: 70%;
  font-size: 10px;
  padding: 10px;
  border: none;
  box-shadow: 1px 2px 1px 0 rgba(0, 0, 0, 0.2), 2px 2px 8px 0 rgba(0, 0, 0, 0.19);
  border-radius: 4px;
  resize: vertical;
`;

const LastNameInput = styled.input.attrs({
  type: "lastName",
  placeholder: "Enter your last name",
  placeholderTextColor: "#c8b9da",
})`
  width: 70%;
  font-size: 10px;
  padding: 10px;
  border: none;
  box-shadow: 1px 2px 1px 0 rgba(0, 0, 0, 0.2), 2px 2px 8px 0 rgba(0, 0, 0, 0.19);
  border-radius: 4px;
  resize: vertical;
`;

const EmailInput = styled.input.attrs({
  type: "email",
  placeholder: "Enter your email address",
  placeholderTextColor: "#c8b9da",
})`
  width: 70%;
  font-size: 10px;
  padding: 10px;
  border: none;
  box-shadow: 1px 2px 1px 0 rgba(0, 0, 0, 0.2), 2px 2px 8px 0 rgba(0, 0, 0, 0.19);
  border-radius: 4px;
  resize: vertical;
`;

const PasswordInput = styled.input.attrs({
  type: "password",
  placeholder: "Enter your password",
  placeholderTextColor: "#c8b9da",
})`
  width: 70%;
  font-size: 10px;
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

const Important = styled.span`
    font-size: 10px;
    font-weight: bold;
    padding: 12px 2px 0 5px;
`

const Submit = styled.span`
    width: 55%;
    display: flex;
    padding: 5px;
    margin: 20px 2px 2px 120px;
    justify-content: space-between;
    text-align: right;
`;

const AsterikMessage = styled.span`
  margin-left: 10rem;
  font-size: 8px;
  text-align: center;
`

const Register = ({ setMember }: IHandler) => {

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({ 
    resolver: joiResolver(schema)
  });

  const [ currentState, setCurrentState ] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    login: false,
  });

  const [signupMember, { loading }] = useMutation(SIGNUP_MUTATION)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const signupHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      signupMember({
        variables: {
          firstName: currentState.firstName,
          lastName: currentState.lastName,
          email: currentState.email,
          password: currentState.password
        },
      })
      .then(({ data }: any) => {
        localStorage.setItem(AUTH_TOKEN, data.login.token);
        navigate("/");
        dispatch(registerUser({
          currentUser: {
            email: data.login.user.email,
            password: data.login.user.password,
            firstName: data.login.user.firstName,
            lastName: data.login.user.lastName,
          },
          loading: false,    
          error: false,
          member: true
        }));
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setCurrentState({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          login: true
        });
      }
    );
  }


  return (
    <FormContainer>
      <Header>New Member?</Header>
      <Form onSubmit={signupHandler}>
        <Title>Create an Account</Title>
        <InputContainer>
          <Label>First Name:</Label>
          <FirstNameInput 
            {...register("firstName")} 
            value={currentState.firstName}
            onChange={(e) => setCurrentState({...currentState, firstName: e.target.value })}
          />
          <Important>*</Important> 
        </InputContainer>
        
        <InputContainer>
          <Label>Last Name:</Label>
          <LastNameInput 
            {...register("lastName")} 
            value={currentState.lastName}
            onChange={(e) => setCurrentState({ ...currentState, lastName: e.target.value })}
          />  
          <Important>*</Important> 
        </InputContainer>

        <InputContainer>
          <Label>Email:</Label>
          <EmailInput 
            {...register("email")} 
            value={currentState.email}
            onChange={(e) => setCurrentState({ ...currentState, email: e.target.value })}
          /> 
          <Important>*</Important> 
        </InputContainer>
        
        <InputContainer>
          <Label>Password:</Label>
          <PasswordInput 
            {...register("password")} 
            value={currentState.password}
            onChange={(e) => setCurrentState({ ...currentState, password: e.target.value })}
          />
          <Important>*</Important> 
        </InputContainer>

        <AsterikMessage>* indicates required fields</AsterikMessage>

        <Submit>
          <Button type="submit" color="success">Submit</Button>
          <Button type="submit" color="secondary">Back</Button>
        </Submit> 

        <Member text='Login here' title='Existing Member?' setMember={setMember}/> 

      </Form>
    </FormContainer> 
  );
}





export default Register;


