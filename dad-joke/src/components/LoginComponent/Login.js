import React from "react";
import { Link, Redirect } from "react-router-dom";
import { isLoggedIn, handleLogin } from "../withAuth/services";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
const LoginForm = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  align-items: center;
  width: 350px;
  height: 500px;
`;

const TextInput = styled.input`
  margin: 25px;
  width: 75%;
  height: 25px;
  border: none;
  border-bottom: 2px solid black;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 200px;
  height: 35px;
  border-radius: 5px;
  border: none;
`;

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };
  Login = async () => {
    let { username, password } = this.state;
    let logged = await handleLogin({ username, password });
    if (logged) {
      this.props.history.push("/");
    }
  };
  register = () => {
    this.props.history.push("/register");
  };
  textFormHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount = () => {
    if (isLoggedIn()) {
      this.props.history.push("/");
    }
  };
  render() {
    if (isLoggedIn()) {
      this.props.history.push("/");
    }
    return (
      <LoginForm>
        <h1>Login Here</h1>
        <TextInput
          type="text"
          name="username"
          placeholder="username/username"
          value={this.state.username}
          onChange={this.textFormHandler}
        />

        <TextInput
          type="password"
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.textFormHandler}
        />
        <Button onClick={this.Login}>Login</Button>
        <Button onClick={this.register}>Register</Button>
      </LoginForm>
    );
  }
}

export default withRouter(Login);
