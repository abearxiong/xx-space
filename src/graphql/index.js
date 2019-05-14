import {ApolloClient}from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const token = '2a4917fe31a289c29616b82047f0e03c8c1976a6'
const httpLink = new HttpLink({
    uri: 'https://api.github.com/graphql', // 配置请求url 
    headers: { // 配置header
        Authorization: `Bearer ${token}`
    }
})

export default new ApolloClient({
    link:  httpLink,
    cache: new InMemoryCache() // 缓存
})