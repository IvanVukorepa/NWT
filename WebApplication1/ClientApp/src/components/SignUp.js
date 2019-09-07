import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Layout } from './Layout';

//import axios from 'axios';


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

export class SignUp extends Component {
    displayName = SignUp.name

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName:  ""
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

        formData.append('FirstName', a.state.firstName);
        formData.append('Lastname', a.state.lastName);
        formData.append('Password', "password");

        await fetch('api/UserController/signUp', {
            method: 'POST',
            body: formData
        }).then(async (response) => {
            console.log(response);
            fetch('api/UserController/logIn', {
                method: 'POST',
                body: formData
            }).then(await handleResponse).then( user => {
                console.log(user);
                localStorage.setItem('user', JSON.stringify(user));               
            });
        });

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
                <LinkContainer to={'/'}>
                    <button onClick={e => this.submit(this)}>submit</button>
                </LinkContainer>
            </Layout>
        );
    }
}
