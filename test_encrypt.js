var CryptoJS = require("crypto-js");
const sign = require('./lib/shangma_utils.js');

const nonce = "yVew0P4g8Mo8wNDyATc1_c5yns1UqZuag1Rim97MP11kovoWbhaJ6nBUUGN8Ph3h"
const digest = CryptoJS.SHA256(nonce)
const digest_sign = sign(digest.toString())
// 7e376048b7200474
var key = CryptoJS.enc.Utf8.parse(digest_sign.substring(0, 16));  
// 69b64df706f40507
var iv  = CryptoJS.enc.Utf8.parse(digest_sign.substring(16)); 

function encrypt (word) {
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString();
}

const dataToEncrypt = '{}';
const result= encrypt(dataToEncrypt)

const encodeResult = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(result));
console.log(encodeResult)

// {}的加密结果： S1uAYaf/g6oBpv8DWUaQlQ== 