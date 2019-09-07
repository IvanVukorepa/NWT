import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { SignUp } from './components/SignUp';
import { LogIn } from './components/LogIn';
import { PostDetails } from "./components/PostDetails"

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
        <Route path='/signUp' component={SignUp} />
        <Route path='/logIn' component={LogIn} />
        <Route path='/postDetails' component={PostDetails} />
      </div>
    );
  }
}
