import gql from "graphql-tag";
/*
{
  "owner":"abearxiong",
  "name":"abearxiong.github.io",
  "number": 52,
  "first": 10,
  "after": null
}
*/
export default  gql`
query IssueComment($owner:String!, $name:String!, $number: Int!, $first: Int!, $after: String){
  repository(owner: $owner, name: $name) {
    issue(number: $number){
      id
			comments(first:$first,after:$after){
       	pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
        }
        edges{
          node{
            id
            body
            bodyHTML
            bodyText
          }
        }
      }
    }
  }
}
`