/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Query } from "react-apollo";
import {GET_ISSUES} from "../../graphql"
import { Card, Badge} from "react-bootstrap";

const Issues = (props) => (
  <Query 
    query={GET_ISSUES} 
    variables={ props.variables }
    notifyOnNetworkStatusChange  
    fetchPolicy="cache-and-network"
    >
    {({ loading, error, data, refetch, networkStatus,fetchMore  }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      // console.log("状态码",networkStatus )
      // console.log("内容", data)
      // console.log("变量",props.variables)
      // console.log("页面",props.pageInfo)
      let issueEdges = data.repository.issues.edges
      let totalCount = data.repository.issues.totalCount
      let pageInfo = data.repository.issues.pageInfo
      localStorage.setItem("pageInfo",JSON.stringify(pageInfo))
      localStorage.setItem("issuesLodding",false)
      let toGithubComment = (index) =>{
        let url = 'https://github.com/abearxiong/abearxiong.github.io/issues/' + index
        window.open(url)
      }
      let toEditIssues = (e, index) => {
        // e.preventdefault().
        e.stopPropagation()
        console.log("editIssues", this)
        // TODO: 判断是否缓存有内容
        props.props.history.push("/edit/"+index)
      }
      const cardIssues = issueEdges.map(item => {
        let date = new Date(item.node.createdAt);
        let cardLabels = item.node.labels.edges.map(item2=>{
            return (<Badge pill  style={{backgroundColor:"#"+item2.node.color }} id={item2.node.id} key={item2.node.id} title={item2.node.description}>
            {item2.node.name} 
         </Badge>)
        })
        return (
        <Card key={item.node.id}>
            <Card.Header onClick={e=>toGithubComment(item.node.number)}>{item.node.title}<Badge variant="light" onClick={e=>toEditIssues(e, item.node.number)}>编辑</Badge></Card.Header>
            <Card.Title>{date.toLocaleString()}</Card.Title>
            <Card.Body>
                { cardLabels }
                <Card border="light"  dangerouslySetInnerHTML={{ __html: item.node.bodyHTML }}></Card>
            </Card.Body>    
            <Card.Footer>
              <Badge variant="light" onClick={e=>toGithubComment(item.node.number)}>
                    <g-emoji
                      alias="heart"
                      fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2764.png"
                      class="emoji mr-1"
                    >
                      ❤️
                    </g-emoji>
                  {item.node.reactions.totalCount}
              </Badge>

              <Badge variant="light" onClick={e=>toGithubComment(item.node.number)}>
                <g-emoji
                  class="g-emoji"
                  alias="speech_balloon"
                  fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f4ac.png"
                >
                  💬
                </g-emoji>
                {item.node.comments.totalCount}
              </Badge>
               { totalCount }
            </Card.Footer>
        </Card>
        )}
      )
      return (
        <Card border="light" className="issues-wrapper">
            {cardIssues}
        </Card>
      );
    }}
  </Query>
);
export default Issues;