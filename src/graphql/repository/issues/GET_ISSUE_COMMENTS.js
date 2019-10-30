import gql from "graphql-tag";
export default  gql`
query Issues($owner:String!, $name:String!, $number: Int, $first: Int!, $after: String){
  repository(owner: $owner, name: $name) {
    issue(number: $number){
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
      comments( first: $first, after: $after) {
        totalCount
        edges{
          node{
            bodyHTML
            author{
              login
            }
            reactions(content:HEART){
              totalCount
            }
            createdAt
          }
          cursor
        }
      }
      reactions(content:HEART){
        totalCount
      }
    }
  }
}
`