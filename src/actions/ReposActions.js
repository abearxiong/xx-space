import * as Types from "./ReposActionsType"
import { useQuery } from '@apollo/react-hooks';
import {config} from "./Config"
import GET_ISSUSE from "../graphql/repository/issues/GET_ISSUES"
var client 
var repos 
var cg
export const setConfig = (data)=>{
    let cf = config(data)
    cg = data
    client = cf.client
    repos = cf.repos
    return true
}

export const setIssues = (data = {}) => {
    return (dispatch)=>{
        let first = data.first || 10
        let after = data.after || null
        client.query({
            query: GET_ISSUSE, 
            variables: { owner: cg.owner, name: cg.name, first, after },    
        }).then(res=>{
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
        console.log("增加的数据data",data)
        let content = data.content
        let title  = data.title
        client.mutate({
            mutation : repos.setIssueAdd(content,title)
        }).then(res=>{
            console.log("增加后的结果",res)
            dispatch({type:Types.SET_ISSUE_ADD_STATUS, data:res})
        })
        // client.query({query:repos.getIssue(number,first,after)}).then(res=>{
        //     console.log(res)
        //     //let issue = res.data.repository.issue
        //     //dispatch({type:Types.SET_ISSUE, data:issue})
        // }) 
    }
}
// DOING: 更新issue
export const setIssueUpdate = ( data = {}) =>{
    return (dispatch)=>{
        console.log("更新的数据data", data)
        let content = data.content
        let title  = data.title
        client.mutate({
            mutation : repos.setIssueAdd(content,title)
        }).then(res=>{
            // TODO: 更新后的结果
            console.log("更新后的结果",res)
            // dispatch({type:Types.SET_ISSUE_ADD_STATUS, data:res})
        })
    }
}
// 异步获取内容
export const setRepos = (type,start,end) => {
    return (dispatch)=>{
        dispatch({type: Types.SET_REPOS})
    }
  };
