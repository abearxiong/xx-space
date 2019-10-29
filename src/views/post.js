import React, { Component } from "react";
import {
  Container,
  Card,
  Button
  // Form, ButtonGroup
} from "react-bootstrap";
import { connect } from "react-redux";
import { setIssue } from "../actions";
import Issues from "../components/issues/issues"
class Post extends Component {
  constructor(props) {
    super(props);
    //console.log(props)
    let params = props.match.params;
    let number = params.number ? params.number : 6;
    this.state = { 
     msg: "msg hhh",
     number,
     variables:{
        owner: "abearxiong", 
        name: "abearxiong.github.io", 
        first:10 
      }
    };
  }
  componentDidMount() {
    let number = this.state.number;
    console.log("Post初始化", number);
  }
  handleClick = () => {

  }
  getChilder =(pageInfo) =>{
    // console.log("父层", pageInfo)
  }
  render() {
    // 公用会报错
    // const { loading, error, data } = useQuery(GET_ISSUE);
    // if (loading) return (<Card>Loading...</Card>)
    // if (error) return (<Card>Error :(</Card>)
    // console.log(data)
    let CardIssue;
    return (

      <Container className="xx-space-post">
        <Issues variables={this.state.variables} pageInfo={this.getChilder} />
        <Card>{CardIssue}</Card>
        <Card>放评论的地方</Card>
        <Button onClick={e => this.handleClick(e)}>Evernote</Button>
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
