import React, { Component } from 'react';
import { Container, Card, Button, CardColumns, ButtonGroup, Nav } from 'react-bootstrap';
import './head.scss'
class Head extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "head",
            desc: "显示关于应用中的头部的信息",
            message: "test",
            spaces: []
        };
        console.log("props:",props,window.location.href)
    }
    componentDidMount() {

    }
    toIndex = (e)=>{
        //console.log(e)
        //console.log("props",this.props,'state',this.state)
        this.props.history.push("/")
    }
    toAddNewSpace = (e)=>{
        //console.log("添加新的内容")
        this.props.history.push("/edit/new")
    }
    render() {
        return (
                <Card className="Header">
                   <ButtonGroup>
                    <Button onClick={e=>this.toIndex(e)}>首页</Button>
                    <Button onClick={e=>this.toAddNewSpace(e)}>新增</Button>
                    <Button>登录</Button>
                   </ButtonGroup>
                </Card>
        );
    }
}

export default Head
