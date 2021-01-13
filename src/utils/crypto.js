/**
 * 对页面上输入的密码进行加密传输给后台进行验证，对返回的数据进行解密，在页面展示
 */
import CryptoJS from 'crypto-js';

/*
 * 对密码进行加密，传输给后台进行验证
 * @param  {String}     word    需要加密的密码
 * @param  {String}     keyStr    对密码加密的秘钥
 * @return {String}     加密的密文
 * */
export const encrypt = (word: string, keyStr: string) => {
  // 加密
  keyStr = keyStr ? keyStr : 'ABGHNJHGSHUYG12';
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};
/*
 * 对加密之后的密文在页面上进行解密，以便用户进行修改
 * @param  {String}     word    需要加密的密码
 * @param  {String}     keyStr    对密码加密的秘钥
 * @return {String}      解密的明文
 * */
export const decrypt = (word: string, keyStr: string) => {
  // 解密
  keyStr = keyStr ? keyStr : 'ABGHNJHGSHUYG12';
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
};

// window.crypt = { encrypt, decrypt };
