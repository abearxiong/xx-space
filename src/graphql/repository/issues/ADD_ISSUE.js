import gql from "graphql-tag";
/*
{
  "repositoryId":"MDEwOlJlcG9zaXRvcnkxMjM4ODY3NzE=",
  "title":"使用apollo测试的题目",
  "body":"## 使用apollo测试后的body",
  "labelIds": ["MDU6TGFiZWwxMzU2ODYzMTMz"]
}
*/
export default gql`
mutation CreateIssuePayload($repositoryId:ID!,$title:String!,$body:String!,$labelIds:[ID!]){
  createIssue(input:{ repositoryId:$repositoryId,title:$title,,body:$body, labelIds: $labelIds}){
   	issue{
	  id
      number
      title
      bodyHTML
      body
      author{
        login
      }
      createdAt
      labels(first:10){
        edges{
          node{
            id
            name
            color
            description
          }
        }
      }
    }
  }
}
`