import React, { Component } from 'react';
import {Container,Card,Button, CardColumns, ButtonGroup} from 'react-bootstrap';
import { setIssues } from '../actions';
import { connect } from 'react-redux'
class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: "test",
      spaces: []
    };
    console.log(props)
  }
  componentDidMount () {
    let {setIssues} = this.props
    console.log("Home 初始化")
    setIssues()
  }
  handleClick(){
    alert("home")
  };
  preClick(e,value){
    let {setIssues} = this.props
    let data = {}
    data.type = "previous"
    data.after = value
    console.log("设置上一页",data)
    setIssues(data)
  }
  nextClick(e,value){
    let {setIssues} = this.props
    let after = value
    console.log("设置下一页",after)
    setIssues({after})
  }
  render() {
    let CardIssues
    let ButtonNext="",ButtonPre="",CardTotalCount=""
    if(this.props.state.setIssues.issues){
      let issues = this.props.state.setIssues.issues
      let edges = issues.edges
      let pageInfo = issues.pageInfo
      let totalCount = issues.totalCount
      CardIssues = edges.map((list,index) => {
        let date = new Date(list.node.createdAt)
        return (
          <Card key = {index}>
            <Card.Header>{list.node.title}</Card.Header>
            <Card.Title>{date.toLocaleString()}</Card.Title>
            <Card.Body dangerouslySetInnerHTML = {{ __html:list.node.bodyHTML }}></Card.Body>
            <Card.Footer>{list.node.reactions.totalCount}|comments: {list.node.comments.totalCount}</Card.Footer>
          </Card>)
      })
      if(pageInfo.hasPreviousPage){
        ButtonPre = (<Button onClick={(e)=>this.preClick(e,pageInfo.startCursor)}>上一页</Button>)
      }
      if(pageInfo.hasNextPage){
        ButtonNext = (<Button onClick={(e)=>this.nextClick(e,pageInfo.endCursor)}>下一页</Button>)
      }
      CardTotalCount = <div>{totalCount}</div>
    }else{
      CardIssues = (
        <Card>
          请骚等
        </Card>
      )
    }
    return (  
        <Container className="xx-space">
          <Card>
            <Card.Body>

                {CardIssues}
              
            </Card.Body>
            <ButtonGroup>
              {ButtonPre}{ButtonNext} 
            </ButtonGroup>
            <Card.Footer>
              {CardTotalCount}
            </Card.Footer>
          </Card>
        </Container>
    );
  }
}

// mapStateToProps：将state映射到组件的props中
const mapStateToProps = (state) => {
  console.log("state 映射",state)
  return {
      state
  }
}
// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setIssues(data){
      dispatch(setIssues(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
