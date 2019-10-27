let CryptoJS = require('crypto-js')
const key = "xx-space"
const token = 'U2FsdGVkX19B3HPXWKdG/BW8oy5ld+5t4WogKry+ve6B0RWRGtSjQlGr32zwr4nn7zBE9woFkj4mWNj8jZv1dg==' // 私有限制权限的token
var decrypted = CryptoJS.AES.decrypt(token, key);
let originToken = decrypted.toString(CryptoJS.enc.Utf8);//转化为utf8
console.log("我的原始GitHub token", originToken)

let argv = process.argv;
// console.log(argv)

if(argv[2]==='get'){
    if(!argv[3]){
        console.log("第四个参数必须存在。为你的私人的github 的token")
        process.exit()
    }
    let personkey = argv[3]
    let key = argv[4]?argv[4]:"xx-space"
    console.log("私人key", personkey)
    console.log("加密key", key)
    let encrypted = CryptoJS.AES.encrypt(personkey, key)
    console.log("加密内容",encrypted.toString())
}else if( argv[2] ==='origin'){
    let personkey = argv[3]
    let key = argv[4]?argv[4]:"xx-space"
    console.log("私人key", personkey)
    console.log("加密key", key)
    var decrypted = CryptoJS.AES.decrypt(personkey, key);
    let originToken = decrypted.toString(CryptoJS.enc.Utf8);//转化为utf8
    console.log("原始key", originToken)
}



else{
    console.log("原因：github提交的包含私有token会注销按个key，所以加密一下token")
    console.log("例子1: 获取token")
    console.log('node ./getToken.js get 8l78ene5ba234fd108797g3w45h5c27cgh34fujc xx-space')
    console.log("例子2: 获取原始的")
    console.log("npm run getToken origine U2FsdGVkX1+mFddckNom5bvuYt9IMr7p3watpPR9750H4l09QCE5RksQ01Kusl4sQ8agDHPR3f1Ee+0pDqBjwg==")
    console.log("程序退出")
    process.exit()
}