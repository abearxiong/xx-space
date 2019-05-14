import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Route,HashRouter, Switch,Redirect } from 'react-router-dom';
import Post from './components/post';
import Home from './components/home';
import Edit from './components/edit';
import {setConfig} from './actions/ReposActions'
import './App.css';
// 私有token上传会自动把token无效；所以加密一下啊 解密
// import CryptoJS from 'crypto-js'
// var decrypted = CryptoJS.AES.decrypt(token,key);
// let token = decrypted.toString(CryptoJS.enc.Utf8);//转化为utf8
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

class App extends Component {
  constructor(props){
    super(props);
    //store.dispatch({type: Types.SET_CONFIG,data: config})
    setConfig(config);
  };
  componentDidMount () {
    //console.log("App初始化完成",store)
  }
  render() {
    return (      
           <Provider store = {store}>
           <HashRouter>
              <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/post/:number" component={Post}/>
                  <Route path="/edit/:number" component={Edit}/>
                  <Redirect to="/" />
              </Switch>
            </HashRouter>
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