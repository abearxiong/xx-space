import React, { Component } from 'react';
import { Container, Card, Button, CardColumns, ButtonGroup, Nav } from 'react-bootstrap';
import './head.scss'
class Head extends Component {
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
    toLogin = () => {
        alert("TO login")
        let url = "https://github.com/login/oauth/authorize"
        // let client_id = `ccf21c3104b11fcd9219` // xx-space
        let client_id = `6d1f0f1a67b21e729050` //xx-space-local-dev
        let redirect_uri = encodeURIComponent(window.location.href)
        // let redirect_uri = encodeURIComponent("https://abearxiong.github.io/space")
        // fetch(`${url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=public_repo`)
        let loginLink = `${url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=public_repo`
        window.location.href = loginLink
    }
    render() {
        return (
            <div className="header-wraper">
                <header className="Header">
                    <div className="Header-item">
                        <a className="Header-link" href="/">
                            <svg className="octicon octicon-mark-github v-align-middle" height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
                        </a>
                    </div>
                    <div className="Header-item"><input type="text" /></div>
                    <div className="Header-item">
                        <a className="Header-link" href="/article">文章</a>
                        <a className="Header-link" href="/space">空间</a>
                        <a className="Header-link" href="/draft">草稿</a>
                        <a className="Header-link" href="/project">计划</a>
                        <a className="Header-link" href="/feed.xml">RSS</a>
                    </div>
                    <div className=" Header-item Header-login float-right">
                        <div className="Header-link" onClick={this.toLogin}>登录</div>
                        <div className="Header-link" onClick={this.toLogin}>登录</div>
                    </div>
                </header>
            </div>
        );
    }
}

export default Head
