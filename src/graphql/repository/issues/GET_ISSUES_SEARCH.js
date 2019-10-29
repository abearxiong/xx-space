import gql from "graphql-tag";
/**
 * 
{
  "queryString": "repo:abearxiong/abearxiong.github.io is:issue label:xx-space",
  "first": 10,
  "after": null
}
 * 
 */
export default gql`
query SearchIssues($queryString: String!,$first: Int!,$after: String){
    search(query: $queryString,type:ISSUE,first:$first,after:$after){
      pageInfo{
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      issueCount
      edges{
        node{
          ...on Issue{
                id
                number
                title
                bodyHTML
                body
                author{
                    login
                }
                createdAt
                comments {
                    totalCount
                }
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
                reactions(content:HEART){
                    totalCount
              }
          }	
        }
      }
    }
  }
`