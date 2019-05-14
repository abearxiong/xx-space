import * as Types from "./ReposActionsType"
import {config} from "./Config"
var client 
var repos 
export const setConfig = (data)=>{
    let cf = config(data)
    client = cf.client
    repos = cf.repos
}
export const setIssues = (data = {}) => {
    return (dispatch)=>{
        let type = data.type || "next"
        let first = data.first || 10
        let after = data.after
        client.query({query:repos.getIssues(type,first,after)}).then(res=>{
            //console.log("issues获取的内容",res)
            //let issues = res.data.repository.issues
            dispatch({type:Types.SET_ISSUES, data: res.data.repository.issues})
        }) 
    }
}
// 设置post内容
export const setIssue = (data = {}) => {
    return (dispatch)=>{
        let number = data.number || 6
        let first = data.first || 10
        let after = data.after
        client.query({query:repos.getIssue(number,first,after)}).then(res=>{
            let issue = res.data.repository.issue
            dispatch({type:Types.SET_ISSUE, data:issue})
        }) 
    }
}
// 设置post内容之增加post
export const setIssueAdd = ( data = {})=> {
    return (dispatch)=>{
        console.log("data",data)
        let content = data.content
        let title  = data.title
        client.mutate({
            mutation : repos.setIssueAdd(content,title)
        }).then(res=>{
            console.log(res)

        })
        // client.query({query:repos.getIssue(number,first,after)}).then(res=>{
        //     console.log(res)
        //     //let issue = res.data.repository.issue
        //     //dispatch({type:Types.SET_ISSUE, data:issue})
        // }) 
    }
}
// 异步获取内容
export const setRepos = (type,start,end) => {
    return (dispatch)=>{
        dispatch({type: Types.SET_REPOS})
    }
  };
