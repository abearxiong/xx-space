import React, { Component } from "react";
import {
  Container,
  Card,
  Button
  // Form, ButtonGroup
} from "react-bootstrap";
import { connect } from "react-redux";
import { setIssue } from "../actions";
import {  useQuery } from '@apollo/react-hooks';
import { GET_ISSUE } from '../graphql'
import gql from "graphql-tag";
import { ApolloProvider } from '@apollo/react-hooks';
import {ApolloClient}from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import CryptoJS from 'crypto-js'
const key = "xx-space"
const token = 'U2FsdGVkX19B3HPXWKdG/BW8oy5ld+5t4WogKry+ve6B0RWRGtSjQlGr32zwr4nn7zBE9woFkj4mWNj8jZv1dg==' // 私有限制权限的token
const owner = 'abearxiong'  // 仓库拥有者
const name = 'abearxiong.github.io' // 仓库名字
const labels = 'xx-space' //'MDU6TGFiZWwxMzU2ODYzMTMz' // label的id
const config = {
  key,
  token,
  owner,
  name,
  labels,
}

var decrypted = CryptoJS.AES.decrypt(config.token,config.key);
let setToken = decrypted.toString(CryptoJS.enc.Utf8);//转化为utf8
//console.log(token)
const httpLink = new HttpLink({
    uri: 'https://api.github.com/graphql', // 配置请求url 
    headers: { // 配置header
        Authorization: `Bearer ${setToken}`
    }
})
const client =  new ApolloClient({
    link:  httpLink,
    cache: new InMemoryCache() // 缓存
})
class Post extends Component {
  constructor(props) {
    super(props);
    //console.log(props)
    let params = props.match.params;
    let number = params.number ? params.number : 6;
    this.state = { msg: "msg hhh", number };
  }
  componentDidMount() {
    let number = this.state.number;
    console.log("Post初始化", number);
  }
  handleClick = () => {

  }
  
  render() {
    // 公用会报错
    // const { loading, error, data } = useQuery(GET_ISSUE);
    // if (loading) return (<Card>Loading...</Card>)
    // if (error) return (<Card>Error :(</Card>)
    // console.log(data)
    let CardIssue;
    return (
      // <ApolloProvider client={client}>

      <Container className="xx-space-post">
        <Card>{CardIssue}</Card>
        <Card>放评论的地方</Card>
        <Button onClick={e => this.handleClick(e)}>Evernote</Button>
      </Container>
      {/* </ApolloProvider> */}

    );
  }
}

// mapStateToProps：将state映射到组件的props中
const mapStateToProps = state => {
  console.log("state 映射", state);
  return {
    state
  };
};
// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setIssue(data) {
      dispatch(setIssue(data));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
//export default Post;
