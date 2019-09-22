import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Layout } from './Layout';
import UserService from '../services/UserService';


export class LogIn extends Component {
    displayName = LogIn.name

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        };
    }

    handleUserNameChange = (event) => {
        this.setState({
            userName: event.target.value
        });
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    submit = async (e) => {
        if (this.state.userName === "" || this.state.password === "") {
            alert("You need to fill in every field");
            return;
        }

        let data = {
            userName: this.state.userName,
            password: this.state.password
        }

        let sucess = await UserService.LogIn(data);

        if (!sucess) {
            alert("Log in failed");
            return;
        }
        this.props.history.push('/');
    }

    render() {
        return (
            <Layout>
                <p>
                    log in form
                </p>
                <div>
                     User name:
                    <input type="text" onChange={this.handleUserNameChange}></input>
                </div>
                <div>
                    password:
                    <input type="password" onChange={this.handlePasswordChange}></input>
                </div>
                <div>
                    <button onClick={e => this.submit(e)}>Log In</button>
                </div>
                <LinkContainer to={'/SignUp'} state={{ props: {userName: this.state.firstName} }}>
                    <button>Register</button>
                </LinkContainer>
            </Layout>
        );
    }
}
