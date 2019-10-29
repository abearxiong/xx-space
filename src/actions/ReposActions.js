// import * as Types from "./ReposActionsType"

export const setIssues = (data = {}) => {
    return (dispatch)=>{
        console.log("setIssues吉祥物")
        // client.query({
        //     query: GET_ISSUSE, 
        //     variables: { owner: cg.owner, name: cg.name, first, after },    
        // }).then(res=>{
        //     dispatch({type:Types.SET_ISSUES, data: res.data.repository.issues})
        // })
    }
}
// // 设置post内容
export const setIssue = (data = {}) => {
    return (dispatch)=>{
        console.log("setIssue吉祥物")

        // client.query({query:repos.getIssue(number,first,after)}).then(res=>{
        //     let issue = res.data.repository.issue
        //     dispatch({type:Types.SET_ISSUE, data:issue})
        // }) 
    }
}
// // 设置post内容之增加post
export const setIssueEdit = ( data = {})=> {
    return (dispatch)=>{
        console.log("setIssueEdit吉祥物")
        // client.mutate({
        //     mutation : repos.setIssueAdd(content,title)
        // }).then(res=>{
        //     console.log("增加后的结果",res)
        //     dispatch({type:Types.SET_ISSUE_ADD_STATUS, data:res})
        // })
    }
}
// // 异步获取内容
// export const setRepos = (type,start,end) => {
//     return (dispatch)=>{
//         dispatch({type: Types.SET_REPOS})
//     }
//   };

//   // 设置page信息
//   export const setPageInfo = (data={})=>{
//     return (dispatch)=>{
//         dispatch({type: Types.SET_PAGEINFO, data})
//     }
//   }
//   // 设置下一页信息
//   export const setNextPage = (data={})=>{
//     return (dispatch)=>{
//         dispatch({type: Types.SET_NEXTPAGE, data})
//     }
//   }