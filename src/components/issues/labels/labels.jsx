/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Query } from "react-apollo";
import {GET_LABELS} from "../../../graphql"
import { Card, Badge} from "react-bootstrap";

const IssuesLabels = (props) => (
  <Query 
    query={GET_LABELS} 
    variables={ props.variables }
    notifyOnNetworkStatusChange  
    fetchPolicy="cache-and-network"
    >
    {({ loading, error, data, refetch, networkStatus,fetchMore  }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
    //   console.log("状态码",networkStatus )
      // console.log("内容", data)
      console.log("变量",props.variables)
      // console.log("页面",props.pageInfo)
      let labelsEdges = data.repository.labels.edges
    //   let totalCount = data.repository.labels.totalCount
      let pageInfo = data.repository.labels.pageInfo
      localStorage.setItem("pageInfo",JSON.stringify(pageInfo))
    //   localStorage.setItem("labelsLodding",false)
      let CardLabels = labelsEdges.map(item=>{
        return <Badge >{item.node.name}</Badge>
      })
      return (
        <Card border="light" className="Labels-wrapper">
            <div>{CardLabels}
            </div>
        </Card>
      );
    }}
  </Query>
);
export default IssuesLabels;