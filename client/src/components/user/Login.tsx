import React, { FormEventHandler } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi"
import { Button } from "../Button";
import {  IHandler } from "../../types";
import { Member } from "./Member";
import { useAppDispatch } from "../../redux/hooks";
import { loginUser } from "../../redux/features/user/userSlice";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../../constant";


const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        firstName
      }
    }
  }
`;

interface IFormInputs {
  email: string;
  password: string;
};

const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
                 .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

const FormContainer = styled.div`
  width: 45%;
  padding: 10px;
  margin: 20px auto;
  border-radius: 4px;
`;

const Header = styled.h2`
  text-align: center;
  text-decoration: underline;
  margin-bottom: 15px;
  font-family: Tahoma, 'Geneva', Verdana, sans-serif;
`

const Title = styled.h3`
  text-align: center;
  margin: 20px 10px 20px 25px;
`

const Form = styled.form`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 20px;
  border-radius: 4px;
  width: 100%;
  margin: 0 auto;
`

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
    padding: 8px 5px 5px 0;
    margin-left: 5px;
`;

const Important = styled.span`
    font-size: 10px;
    font-weight: bold;
    padding: 12px 2px 0 5px;
`

const Submit = styled.div`
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
`;

const Login = ({ setMember }: IHandler) => {

  const { register, formState: { errors } } = useForm<IFormInputs>({ 
    resolver: joiResolver(schema)
  });

  const [ currentState, setCurrentState ] = React.useState({
    email: "",
    password: "",
    login: false
  });


  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ loginMember, { error } ] = useMutation(LOGIN_MUTATION);

  React.useEffect(() => {

  }, [currentState.login]);

  const loginHandler = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        loginMember({
          variables: {
            email: currentState.email,
            password: currentState.password
          }
        })
        .then(({ data }) => {
          localStorage.setItem(AUTH_TOKEN, data.login.token);
          navigate("/");
          dispatch(loginUser({
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
            email: "",
            password: "",
            login: true
          });
        }
    );
  }
  

  return (
    <FormContainer>
        <Header>Existing User?</Header>
      <Form 
        onSubmit={loginHandler}>
        <Title>Login</Title>
        <InputContainer>
          <Label>Email:</Label>
          <EmailInput 
            {...register("email")} 
            value={currentState.email} 
            onChange={(e) => setCurrentState({...currentState, email: e.target.value })}
          />
          <Important>*</Important> 
        </InputContainer>
        
        <InputContainer>
          <Label>Password:</Label>
          <PasswordInput 
            {...register("password")} 
            onChange={(e) => setCurrentState({ ...currentState, password: e.target.value })}
            value={currentState.password} 
          />
          <Important>*</Important> 
        </InputContainer>

        <AsterikMessage>* indicates required fields</AsterikMessage>

        <Submit>
          <Button type="submit" color="success">Submit</Button>
          <Button type="submit" color="secondary">Back</Button>
        </Submit> 

        <Member title="New Member?" text="Create an account here" setMember={setMember} />
      </Form>
    </FormContainer> 
  );
}


export default Login;
