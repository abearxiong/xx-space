import React, { Component } from "react";
import {Container,Card,Button, Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { setIssue } from "../actions";
import {GET_ISSUE} from "../graphql"
import Comments from "../components/issues/issueComments"
import './post.scss'
import Head from '../components/head/head'
import {ADD_ISSUE_COMMENT} from "../graphql";
class Post extends Component {
  constructor(props) {
    super(props);
    //console.log(props)
    let params = props.match.params;
    let number = params.number ? params.number : 6;
    this.state = { 
     description: "显示post的页面",
     number,
     newPages: []
    };
  }
  componentDidMount() {
    let number = this.state.number;
    let pageInfo = { endCursor: null, hasNextPage: true  }
    localStorage.setItem("commentPageInfo",JSON.stringify(pageInfo))
    localStorage.setItem("commentsLodding",false)

    console.log("Post初始化", number);
    let { config, client} = this.props.state.setConfig
    let variables = {
      owner: config.owner,
      name: config.name,
      number: parseInt(number),
      first: 100,
      after: null
    }
    client.query({
      query: GET_ISSUE,
      variables: variables
    }).then(res=>{
      // console.log("getdata",res)
      this.setState({
        HasIssue: true,
        issue: res.data.repository.issue,

      })
    })
    this.getIssueComment()
    window.addEventListener('scroll',this.scrollNew)
    let user = localStorage.getItem("user")
    this.setState({
      user
    })
  }
  componentWillUnmount (){
    window.removeEventListener('scroll',this.scrollNew)
  }
  scrollNew = ()=>{
    let scrollHeight = document.documentElement.scrollHeight
    let scrollTop = document.documentElement.scrollTop
    let clientHeight = document.documentElement.clientHeight
    let lodding = localStorage.getItem("commentsLodding")
    // console.log("height",scrollHeight,scrollTop,clientHeight)
    if(scrollTop + clientHeight > scrollHeight - 2&&lodding!=="lodding"){
      // 单纯的相等的情况会出现 浮点数的情况，就不能执行
      this.getIssueComment()
      // console.log("新一页")
      localStorage.setItem("commentsLodding","lodding")
    }
  }

  handleClick = () => {

  }
  getChilder =(pageInfo) =>{
    // console.log("父层", pageInfo)
  }
  getIssueComment = () =>{
        // window.removeEventListener("scroll",this.scrollNew) // 因为奇葩的问题导致内容重复问题
        let pageInfo = JSON.parse(localStorage.getItem("commentPageInfo"))
        let after = pageInfo.endCursor
        let variables = this.props.state.setConfig.variables
        variables.after = after
        variables.number = parseInt(this.state.number)
        // console.log("variables:",variables)
        if(!pageInfo.hasNextPage){
          alert("没有更多了")
          // window.removeEventListener("scroll",this.scrollNew)
          return 
        }
        // console.log("key:", pageInfo.endCursor)
        let newComments = (<Comments 
          key = {pageInfo.endCursor}
          variables={variables} 
          props={{...this.props}} 
          />    )
        let newPages = this.state.newPages
        newPages.push(newComments)
        // console.log(newPages)
        this.setState({
          newPages,
        })
        // setTimeout(this.getIssueComment(), 5000)      
  }
  onCommentChange= (e)=>{
    let value = e.target.value
    console.log(value,e)
    this.setState({
      comment: value
    })
  }
  onUserChange= (e)=>{
    let value = e.target.value
    console.log(value,e)
    this.setState({
      user: value
    })
    localStorage.setItem("user",value)
  }
  onAddComment = ()=>{
    let { client} = this.props.state.setConfig
    let variables = {
      subjectId : this.state.issue.id,
      body: this.state.comment + "\n联系方式:" + this.state.user
    }
    client.mutate({
      mutation: ADD_ISSUE_COMMENT,
      variables: variables
    }).then(res=>{
      console.log("add issue comment", res)
      let issueComment = res.data.addComment.commentEdge.node
      this.setState({
        issueComment
      })
    })
  }
  render() {
    let CardIssue;
    if(this.state.HasIssue){
      let issue = this.state.issue
      let BadgeLabel =  issue.labels.edges.map(item=>
          <Badge pill  style={{backgroundColor:"#"+item.node.color }} id={item.node.id} key={item.node.id} title={item.node.description}>
              {item.node.name} 
          </Badge>) 
      CardIssue = (
        <Card className="post-comments" >
          <div>
            {issue.title} 
          </div>
          <div>
          {BadgeLabel}
          </div>
          <Card border="light"  dangerouslySetInnerHTML={{ __html: issue.bodyHTML }}></Card>
        </Card>
      )
    }
    
    return (
      <Container className="xx-space-post">
         <Head {...this.props}/>
        {CardIssue}
        <Card className="post-add-comments" border="dark">
          <div className="post-add-comments-title">添加评论</div>
          <textarea className="post-add-comment-textarea" onChange={e=>this.onCommentChange(e)} rows="4">

          </textarea>
          <input id="post-user" onChange={e=>this.onUserChange(e)} defaultValue={this.state.user} placeholder="联系方式："/>
          <Button onClick={e=>this.onAddComment()}>确定</Button>
        </Card>
        <Card border="info" className="post-comments">
          <div className="post-comments-title">显示评论</div>
          {this.state.newPages.map(item=>item)}
          {
            this.state.issueComment?
            (<Card dangerouslySetInnerHTML={{__html:this.state.issueComment.bodyHTML}}></Card>)
            :""
          }
        </Card>

      </Container>
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
