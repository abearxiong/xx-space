/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from "react";
import {Container, Card} from "react-bootstrap";
import { setIssues } from "../actions";
import { connect } from "react-redux";
import Head from "../components/head/head";
import Issues from "../components/issues/issues"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "首页",
      description: "这里是显示内容的主页",
      message: "test",
      spaces: [],
      newPages:[],
      lastPageInfo: {},
    };
  }
  componentDidMount() {
    let pageInfo = { endCursor: null, hasNextPage: true  }
    localStorage.setItem("pageInfo",JSON.stringify(pageInfo))
    localStorage.setItem("issuesLodding",false)
    window.addEventListener('scroll',this.scrollNew)
    // console.log(this.state.description)
    this.getNewPage();
  }
  componentWillUnmount (){
    window.removeEventListener('scroll',this.scrollNew)
  }
  scrollNew = ()=>{
    let scrollHeight = document.documentElement.scrollHeight
    let scrollTop = document.documentElement.scrollTop
    let clientHeight = document.documentElement.clientHeight
    let lodding = localStorage.getItem("issuesLodding")
    // console.log("height",scrollHeight,scrollTop,clientHeight)
    if(scrollTop + clientHeight > scrollHeight - 2&&lodding!=="lodding"){
      // 单纯的相等的情况会出现 浮点数的情况，就不能执行
      this.getNewPage()
      // console.log("新一页")
      localStorage.setItem("issuesLodding","lodding")
    }
  }
  getNewPage = ()=>{
    // window.removeEventListener("scroll",this.scrollNew) // 因为奇葩的问题导致内容重复问题
    let pageInfo = JSON.parse(localStorage.getItem("pageInfo"))
    let after = pageInfo.endCursor
    let variables = this.props.state.setConfig.variables
    variables.after = after
    if(!pageInfo.hasNextPage){
      alert("没有更多了")
      window.removeEventListener("scroll",this.scrollNew)
      return 
    }
    let key = pageInfo.endCursor
    let newPage = (<Issues 
      key = {key}
      variables={variables} 
      props={{...this.props}}
      getNextPage={this.getNextPage} 
      
      />    )
    let newPages = this.state.newPages
    newPages.push(newPage)
    // console.log(newPages)
    this.setState({
      newPages,
    })
  }
  render() { 
    return (
      <Container className="xx-space">
        <Head {...this.props} />
        <Card border="light"> 
            {this.state.newPages.map(item=>item)}
        </Card>
      </Container>
    );
  }
}

// mapStateToProps：将state映射到组件的props中
const mapStateToProps = state => {
  console.log("home-state 映射", state);
  return {
    state
  };
};
// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setIssues(data) {
      dispatch(setIssues(data));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
