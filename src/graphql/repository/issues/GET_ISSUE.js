import gql from "graphql-tag";
export default  gql`
query Issues($owner:String!, $name:String!, $number: Int!, $first: Int!, $after: String){
  repository(owner: $owner, name: $name) {
    issue(number: $number){
      id
      number
      title
      bodyHTML
      body
      createdAt
      labels(first:$first,after:$after){
        edges{
          node{
            id
            name
            color
            description
            url
          }
        }
      }
    }
  }
}
`