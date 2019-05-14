import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Route,HashRouter, Switch,Redirect } from 'react-router-dom';
import Post from './components/post';
import Home from './components/home';
import Edit from './components/edit';

import {setConfig} from './actions/ReposActions'
import './App.css';
const token = '2a4917fe31a289c29616b82047f0e03c8c1976a6' // 私有限制权限的token
const owner = 'abearxiong'  // 仓库拥有者
const name = 'abearxiong.github.io' // 仓库名字
const labels = 'xx-space' //'MDU6TGFiZWwxMzU2ODYzMTMz' // label的id
const config = {
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