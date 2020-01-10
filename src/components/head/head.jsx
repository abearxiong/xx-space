import React, { Component } from 'react';
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Modal } from 'react-bootstrap';
import './head.scss'
import IssuesLabels from "../issues/labels/labels"
class Head extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "head",
            desc: "显示关于应用中的头部的信息",
            message: "test",
            spaces: [],
            showLabels: false
        };
        // console.log("props:", props, window.location.href)
    }
    componentDidMount() {

    }
    toIndex = (e) => {
        //console.log(e)
        //console.log("props",this.props,'state',this.state)
        this.props.history.push("/")
    }
    onToAddNewSpace = (e) => {
        //console.log("添加新的内容")
        this.props.history.push("/edit/new")
    }
    onShowLabels = () => {
        this.setState({
            showLabels: true
        })
    }
    onLabelsClose = () =>{
        this.setState({
            showLabels: false
        })
    }
    onSearch = () =>{
        alert("搜索功能未添加")
    }
    render() {
        return (
            <Navbar className="Header" bg="light" expand="lg">
                <Navbar.Brand href="#">GitHub空间</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <Nav.Link href="#">Home</Nav.Link> */}
                        <Nav.Link onClick={e => this.onToAddNewSpace()}>增加</Nav.Link>
                        <Nav.Link onClick={e => this.onShowLabels()}>标签</Nav.Link>
                        <Nav.Link onClick={e=>this.props.history.go(-1)}>返回</Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="ac">Action</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button varint="outline-success" onClick={e=>this.onSearch(e)}>Search</Button>
                    </Form>
                </Navbar.Collapse>
                <Modal show={this.state.showLabels} onHide={e=>this.onLabelsClose()} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>显示标签</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <IssuesLabels variables={this.props.state.setConfig.variables}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={e=>this.onLabelsClose()}>
                            Close
                        </Button>
                        {/* <Button variant="primary" onClick={e=>this.onLabelsClose()}>
                                Save Changes
                        </Button> */}
                    </Modal.Footer>
                </Modal>
            </Navbar>

        );
    }
}

export default Head
