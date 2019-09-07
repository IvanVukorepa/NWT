import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Layout } from './Layout';

async function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export class LogIn extends Component {
    displayName = LogIn.name

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: ""
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

    submit = async (a) => {

        var formData = new FormData();

        formData.append('LastName', a.state.firstName);
        formData.append('Password', a.state.lastName);
        //formData.append('Password', "password");
 
        await fetch('api/UserController/logIn', {
            method: 'POST',
            body: formData
        }).then(await handleResponse).then(user => {
            console.log(user);
            localStorage.setItem('user', JSON.stringify(user));
        });
    }

    render() {
        return (
            <Layout>
                <p>
                    log in form
                </p>
                <div>
                     User name:
                    <input type="text" onChange={this.handleFirstNameChange}></input>
                </div>
                <div>
                    password:
                    <input type="text" onChange={this.handleLastNameChange}></input>
                </div>
                <LinkContainer to={'/'}>
                    <button onClick={e => this.submit(this)}>Log In</button>
                </LinkContainer>
                <LinkContainer to={'/SignUp'} state={{ props: {userName: this.state.firstName} }}>
                    <button>Register</button>
                </LinkContainer>
            </Layout>
        );
    }
}
