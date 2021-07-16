// AES 加密 ECB

const CryptoJS = require('./aes.js');
const _KEY = "13asd5412asdfasd";

//字符串加密
function encrypt(str) {
    let key = CryptoJS.enc.Utf8.parse(_KEY);
    let encrypted = '';
    let srcs = CryptoJS.enc.Utf8.parse(str);
    encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.ciphertext.toString(); //hex
    return encrypted.ciphertext.toString().toUpperCase(); //大写
    return encrypted.toString(); //base64
}

//字符串解密
function decrypt(str) {
    let key = CryptoJS.enc.Utf8.parse(_KEY);
    let encryptedHexStr = CryptoJS.enc.Hex.parse(str);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    // let srcs = str
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

module.exports = {
    Decrypt: decrypt,
    Encrypt: encrypt
}

/* 使用

const AES = require('../../utils/aes2/aesUtils')
AES.Encrypt('123')

*/