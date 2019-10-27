import gql from 'graphql-tag'
class Repository {
  constructor(config) {
    this.owner = config.owner
    this.name = config.name
    this.labels = config.labels ? `,labels:"${config.labels}"` : ""
    this.labelIds = config.labelIds ? config.labelIds : "MDU6TGFiZWwxMzU2ODYzMTMz"
    this.repositoryId = config.repositoryId ? config.repositoryId : "MDEwOlJlcG9zaXRvcnkxMjM4ODY3NzE="
    this.graphql = ""
    this.currentPage = "first:10"
  }
  // 获取所有的ISSUES
  getIssues(type, first, after, labels) {
    if(type === "next"){
      first = first? `first:${first}`:""
      after =after?`,after:"${after}"`:""
    }else{
      first = first? `last:${first}`:""
      after =after?`,before:"${after}"`:""
    }
    return gql `
        {
          repository(owner: "${this.owner}", name: "${this.name}") {
              issues(${first} ${after},orderBy:{field:CREATED_AT,direction:DESC}){
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
  }
  // 获取某一个issue，进行查看具体的详细内容。
  getIssue(number, first, after) {
    number = `number:${number}`
    first = first? `first:${first}`:""
    after =after?`,after:"${after}"`:""
    //,orderBy:{field:CREATED_AT,direction:DESC}
    return gql `
        {
          repository(owner: "${this.owner}", name: "${this.name}") {
              issue(${number}){
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
                comments( ${first} ${after}) {
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
  }
  setIssueAdd(content,title,repositoryId,labelIds){
    let first =`first: 100` //第一次更新是没有first的
    title = title?title : "没有标题真是太奇怪了" 
    labelIds = labelIds?labelIds:this.labelIds
    repositoryId = repositoryId? repositoryId: this.repositoryId
    if(!repositoryId){
      alert('需要仓库的ID')
      return
    }
    //console.log(title,labelIds,repositoryId,content)
    return gql `
    mutation CreateIssuePayload
    {
      createIssue(input:{repositoryId:"${repositoryId}", title: "${title}",body:" ${content}",labelIds: "${labelIds}"}) {
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
            comments( ${first}) {
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
  }
}
export default Repository;