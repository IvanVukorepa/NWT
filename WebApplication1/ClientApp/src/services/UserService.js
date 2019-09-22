import React, { Component } from 'react';
import { LogIn } from '../components/LogIn';

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

const UserService = {
    SignUp: async function (data) {
        let success = await fetch('api/UserController/signUp', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => response.json());
        return success;
    },

    LogIn: async function (data) {
        var user = await fetch('api/UserController/logIn', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(await handleResponse);

        if (typeof (user) === typeof ("")) {
            return false;   
        }
        localStorage.setItem('user', JSON.stringify(user));
        return true;
    },

    getUser: async function (id) {
        const requestOptions = {
            method: 'GET'
        };

        var user = await fetch('api/UserController/getUser?id=' + id, requestOptions)
            .then(response => response.json());

        return user;
    },

    isUserNameTaken: async function (userName) {
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userName)
        };

        var isTaken = await fetch('api/UserController/checkUserName', requestOptions)
            .then(response => response.json());

        return isTaken;
    }
};

export default UserService;