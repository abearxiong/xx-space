import React, { Component } from 'react';
import { Container, Card, Button, CardColumns, ButtonGroup, Nav } from 'react-bootstrap';
import './nav.scss'
class SpaceNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "test",
            spaces: []
        };
        console.log("props:",props,window.location.href)
    }
    componentDidMount() {

    }
    toEdit(){
        this.
    }
    render() {
        return (
            <div className="nav-wraper">
                <div className="btn" onClick={(e)=>this.toEdit}>
                    编辑内容
                </div>
            </div>
        );
    }
}

export default SpaceNav
