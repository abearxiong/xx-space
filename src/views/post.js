import React, { Component } from "react";
import {
  Container,
  Card,
  Button
  // Form, ButtonGroup
} from "react-bootstrap";
import { connect } from "react-redux";
import { setIssue } from "../actions";
class Post extends Component {
  constructor(props) {
    super(props);
    //console.log(props)
    let params = props.match.params;
    let number = params.number ? params.number : 6;
    this.state = { msg: "msg hhh", number };
  }
  componentDidMount() {
    let setIssue = this.props.setIssue;
    let number = this.state.number;
    console.log("Post初始化", number);
    setIssue({ number }); // number first after 后面两个是评论的
  }
  handleClick() {
    this.setState({
      msg: "msg修改"
    });
    //console.log(this)
  }
  render() {
    let CardIssue;
    if (this.props.state.setIssue.issue) {
      let issue = this.props.state.setIssue.issue;
      CardIssue = (
        <Card className="post-content">
          <Card.Header>{issue.title}</Card.Header>
          <Card.Title>{issue.createdAt}</Card.Title>
          <Card.Body dangerouslySetInnerHTML={{ __html: issue.bodyHTML }} />
        </Card>
      );
    } else {
      CardIssue = <Card>等等</Card>;
    }
    return (
      <Container className="xx-space-post">
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
