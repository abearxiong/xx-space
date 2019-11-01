/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Query } from "react-apollo";
import { GET_ISSUE_COMMENTS} from "../../graphql"
import { Card } from "react-bootstrap";

const IssuesComments = (props) => (
  <Query 
    query={GET_ISSUE_COMMENTS} 
    variables={ props.variables }
    notifyOnNetworkStatusChange  
    >
    {({ loading, error, data, refetch, networkStatus,fetchMore  }) => {
      if (loading) return <p>Loading...</p>;
      if (error) {
            console.log(error)
            return <p>Error :(</p>;
        }
      // console.log("状态码",networkStatus )
      // console.log("内容", data)
    //   console.log("变量",props.variables)
      // console.log("页面",props.pageInfo)
    //   console.log("comments data:", data)
      let commentsEdges = data.repository.issue.comments.edges
      // let totalCount = data.repository.issues.totalCount
      let pageInfo = data.repository.issue.comments.pageInfo
      localStorage.setItem("commentPageInfo",JSON.stringify(pageInfo))
      localStorage.setItem("commentsLodding",false)
      return (
        <>
            {
                commentsEdges.map(item=>{
                    return (<Card className="post-comment" border="light" key={item.node.id} >
                            <Card border="light"  dangerouslySetInnerHTML={{ __html: item.node.bodyHTML }}></Card>
                    </Card>)
                })
            }
        </>
      );
    }}
  </Query>
);
export default IssuesComments;