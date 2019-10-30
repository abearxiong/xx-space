import gql from 'graphql-tag'
/*
{
  "id":"MDU6SXNzdWU1MTQwODM3NDQ=",
  "state": "OPEN",
  "title":"使用apollo测试的题目",
  "body":"## 使用apollo测试后的body\r\n测试更新2",
  "labelIds": ["MDU6TGFiZWwxMzU2ODYzMTMz"]
}
*/
export default gql`
mutation UpdateIssuePayload($id:ID!,$state:IssueState,$title:String!,$body:String!,$labelIds:[ID!]){
  updateIssue(input:{ id:$id,state:$state,title:$title,,body:$body, labelIds: $labelIds}){
   	issue{
			id
      number
      title
      bodyHTML
      body
      author{
        login
      }
      state
      createdAt
      labels(first:10){
        edges{
          node{
            id
            description
            color
            url
            name
          }
        }
      }
    }
  }
}
`