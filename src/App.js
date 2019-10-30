import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route,HashRouter, Switch,Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import {ApolloClient}from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import CryptoJS from 'crypto-js'
import store from './store';
import Post from './views/post';
import Home from './views/home';
import Edit from './views/edit';
import * as Types from "./actions/Types"
// import Head from './components/head/head'
import './App.css';
// 私有token上传会自动把token无效；所以加密一下啊 解密
// import CryptoJS from 'crypto-js'
// var decrypted = CryptoJS.AES.decrypt(token,key);
// let token = decrypted.toString(CryptoJS.enc.Utf8);//转化为utf8
const key = "xx-space"
const token = 'U2FsdGVkX19B3HPXWKdG/BW8oy5ld+5t4WogKry+ve6B0RWRGtSjQlGr32zwr4nn7zBE9woFkj4mWNj8jZv1dg==' // 私有限制权限的token
const owner = 'abearxiong'  // 仓库拥有者
const name = 'abearxiong.github.io' // 仓库名字
const repositoryId = "MDEwOlJlcG9zaXRvcnkxMjM4ODY3NzE="
const config = {
  key,
  token,
  owner,
  name,
  repositoryId
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
// client.query({
//   query: GET_ISSUES,variables: { owner: "abearxiong", name: "abearxiong.github.io", first:10 },    }).then(res=>{
//     console.log("测试client",res)
//   })
class App extends Component {
  constructor(props){
    super(props);
    store.dispatch({type: Types.SET_CONFIG, data: { ...config, client }}) // store分发举例，其他库，自动配置
    this.state = {
      description: "设置关于起始显示的地方"
    }
  };
  componentDidMount () {
    // console.log("App初始化完成",store)
    
  }
  render() {
    return (   
      <Provider store = {store}>
        <ApolloProvider client={client}>
           <HashRouter>
              <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/post/:number" component={Post}/>
                  <Route path="/edit/:number" component={Edit}/>
                  <Redirect to="/" />
              </Switch>
            </HashRouter>
          </ApolloProvider>   
      </Provider>   
    );
  }
}
// // mapStateToProps：将state映射到组件的props中
// const mapStateToProps = (state) => {
//   return {
//       user: state.user,
//   }
// }
// // mapDispatchToProps：将dispatch映射到组件的props中
// const mapDispatchToProps = (dispatch, ownProps) => {
// return {
//   setConfig (data) {
//       dispatch(setConfig(data))
//   }
// }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(App)
export default App;