import gql from "graphql-tag";
export default  gql`
query IssuesLabels($owner: String!, $name: String!, $first: Int!, $after: String) {
  repository(owner: $owner, name: $name) {
    labels(first: $first, after: $after) {
      totalCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
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
`
