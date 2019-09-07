import React, { Component } from 'react';
import {Container,Card,Button, CardColumns, ButtonGroup} from 'react-bootstrap';

class Base extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: "test",
      spaces: []
    };
  }
  componentDidMount () {

  }

  render() {
    return (  
        <Container className="xx-space">
            Base
        </Container>
    );
  }
}

export default Base
