import gql from 'graphql-tag'
export default gql`
mutation AddCommentPayload($subjectId: ID!,$body:String!){
  addComment(input:{subjectId:$subjectId,body:$body}){
    commentEdge{
      node{
        id
        body
        bodyHTML
        bodyText
      }
    }
  }
}
`