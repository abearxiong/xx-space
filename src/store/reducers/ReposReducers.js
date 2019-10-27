// 它就是将来真正要用到的数据，我们将其统一放置在reducers.js文件
import defaultState from '../state.js'
import * as Types from '../../actions/ReposActionsType'
function setIssue(state = defaultState.config,action){
    // console.log("setIssue Type:",action.type)
    switch(action.type){
        case Types.SET_ISSUE:
            state.issue = action.data
            //console.log("得到",state,"data",action,action.type)
            //return state
            return Object.assign({},state) //直接返回state是不会自动的刷新的
        case Types.SET_ISSUE_ADD_STATUS:
            // 设置更新后的状态
            // state.setIssueAddConent = action.data
            return Object.assign({}, action.data)
        default:
            return state
    }
}
function setIssues(state = defaultState.config,action){
    // console.log("setIssues Type:",action.type)
    switch(action.type){
        case Types.SET_ISSUES:
        state.issues = action.data
        console.log("得到",state,"data",action,action.type)
        //return state
        return Object.assign({},state)
        default:
        return state
    }
}
function setConfig (state = defaultState.config,action){
    switch(action.type){
        case Types.SET_CONFIG:
        state.config = action.data
        //console.log("进入",state,"data",action,action.type)
        return state
        case Types.SET_CLIENT:
        state.client = action.data
        //console.log("进入",state,"data",action,action.type)
        return state
        default:
        //console.log("得到",state,"data",action,action.type)
        return state
    }
}
function pageTitle (state = defaultState.pageTitle,action) {
// 不同的action有不同的处理逻辑
    switch (action.type) {
        case 'SET_PAGE_TITLE':
        return action.data
        default:
        return state
    }
}

function user (state = defaultState.user, action){
    switch (action.type) {
        case 'SET_USER':
        return action.data
        default:
        return state
    }
}

export {
    setIssue,
    setIssues,
    setConfig,
    pageTitle,
    user
}