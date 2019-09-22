import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Layout } from './Layout';
import UserService from '../services/UserService';
import { LogIn } from './LogIn';

export class SignUp extends Component {
    displayName = SignUp.name

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            userName: "",
            password: ""
        };
    }

    handleFirstNameChange = (event) => {
        this.setState({
            firstName: event.target.value
        });
    }

    handleLastNameChange = (event) => {
        this.setState({
            lastName: event.target.value
        });
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

        if (this.state.firstName === "" || this.state.lastName === "" || this.state.userName === "" || this.state.password === "") {
            alert("You need to fill in every field");
            return;
        }

        if (await UserService.isUserNameTaken(this.state.userName)) {
            alert("username is already taken!");
            return;
        }

        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            password: this.state.password
        }

        var success = await UserService.SignUp(data);
        if (!success) {
            alert("Registration failed");
            return;
        }
        success = await UserService.LogIn(data);
        if (!success) {
            alert("Log in failed");
            return;
        }

        this.props.history.push('/');
    }

    render() {
        return (
            <Layout>
                <p>
                    sign Up form
                </p>
                <div>
                    First name:
                    <input type="text" onChange={e => this.handleFirstNameChange(e)}></input>
                </div>
                <div>
                    Last name
                    <input type="text" onChange={e => this.handleLastNameChange(e)}></input>               
                </div>
                <div>
                    User name
                    <input type="text" onChange={e => this.handleUserNameChange(e)}></input>
                </div>
                <div>
                    Password
                    <input type="password" onChange={e => this.handlePasswordChange(e)}></input>
                </div>
                <div>
                    <button onClick={this.submit}>submit</button>
                </div>
            </Layout>
        );
    }
}
