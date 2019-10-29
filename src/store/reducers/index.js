import {combineReducers} from 'redux'
import { setIssue,setIssues,setConfig } from "./ReposReducers"

export default combineReducers({
    setIssue,setIssues,setConfig
})