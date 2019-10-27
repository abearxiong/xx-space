import gql from "graphql-tag";
export default  gql`
query Issues($owner:String!, $name:String!, $first: Int!, $after: String){
    repository(owner: $owner, name: $name) {
        issues(first: $first, after: $after, orderBy:{field:CREATED_AT,direction:DESC}){
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