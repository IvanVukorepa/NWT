﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
    displayName = NavMenu.name

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        };
    }
    componentDidMount() {
        if (this.state.user !== JSON.parse(localStorage.getItem('user'))){
            this.setState({
                user: JSON.parse(localStorage.getItem('user'))
            });
        }
    }

    signUpClick = () => {
        if (this.state.user !== null) {
            localStorage.removeItem('user');
        }
    }

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
           <Link to={'/'}>{this.state.user !== null ? this.state.user.firstName : ""}</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} exact>
              <NavItem>
                <Glyphicon glyph='home' /> Home
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/logIn'}>
                <NavItem onClick={this.signUpClick}>
                    <Glyphicon glyph='glyphicon-user' /> {this.state.user !== null ? "Log out" : "Sign Up"}
                </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
