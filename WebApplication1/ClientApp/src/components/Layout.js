import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    displayName = Layout.name

    constructor(props) {
        super(props);
        this.state = {
            userName: ""
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.userName !== state.userName) {
            return { userName: props.userName };
        }
        return null;
    }

    componentDidMount() {
        this.setState({
            userName: this.props.userName
        });
        console.log(this.state.userName);
        console.log(this.props);
    }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col sm={3}>
            <NavMenu />
          </Col>
          <Col sm={9}>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    );
  }
}
