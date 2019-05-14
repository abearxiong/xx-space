import {ApolloClient}from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import Repos from "../graphql/repository"
import CryptoJS from 'crypto-js'
export const config = (data)=>{
    if(!data)return
    var decrypted = CryptoJS.AES.decrypt(data.token,data.key);
    let token = decrypted.toString(CryptoJS.enc.Utf8);//转化为utf8
    //console.log(token)
    const httpLink = new HttpLink({
        uri: 'https://api.github.com/graphql', // 配置请求url 
        headers: { // 配置header
            Authorization: `Bearer ${token}`
        }
    })
    const client =  new ApolloClient({
        link:  httpLink,
        cache: new InMemoryCache() // 缓存
    })  
    // 增加配置
    const repos = new Repos(data)
    return{
        client,repos
    }
}
