// const {encrypt, decrypt} = require("../crypto")
// let word = "A122333333"
// let key = "234"
// let mi = encrypt(word)
// let jie = decrypt(mi)
// console.log(word,key)
// console.log("加密：",mi)
// console.log("解密：",jie)
const CryptoJS = require('crypto-js');
var myString = "2324344c6234f15fdga5c27ca65fb2c";//要被加密的字符串
var myKey= "xx-space";//秘钥

//1.进行加密
var encrypted = CryptoJS.AES.encrypt(myString, myKey);
//输出加密后的字符串
console.log(encrypted.toString());

//2.进行解密,输入要解密的密文和秘钥
var decrypted = CryptoJS.AES.decrypt(encrypted, myKey);//默认是base64格式
//输出解密后的字符串
console.log(decrypted.toString(CryptoJS.enc.Utf8));//转化为utf8

var dec2 = CryptoJS.AES.decrypt("U2FsdGVk2342342342X146572fgha+5t4WogKry+ve6B0RWRGt24325jQlGr32zwr4nn7zBE9woFkj4mWNj8jZv1dg==",myKey);
console.log(dec2.toString(CryptoJS.enc.Utf8));//转化为utf8