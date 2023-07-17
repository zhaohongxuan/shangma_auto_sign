var CryptoJS = require('crypto-js')
const sign = require('./shangma_utils.js')

const nonce = 'yVew0P4g8Mo8wNDyATc1_c5yns1UqZuag1Rim97MP11kovoWbhaJ6nBUUGN8Ph3h'
const digest = CryptoJS.SHA256(nonce)
const digest_sign = sign(digest.toString())
// 7e376048b7200474
var key = CryptoJS.enc.Utf8.parse(digest_sign.substring(0, 16))
// 69b64df706f40507
var iv = CryptoJS.enc.Utf8.parse(digest_sign.substring(16))

function encrypt(word) {
  var srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const encryptTxt = encrypted.ciphertext.toString()
  const hexString = CryptoJS.enc.Hex.parse(encryptTxt)
  return CryptoJS.enc.Base64.stringify(hexString)
}
function decrypt(encryptWord) {
  var wordArray = CryptoJS.enc.Base64.parse(encryptWord)
  // const hexString = wordArray.toString(CryptoJS.enc.Hex);
  const encryptedCiphertext = CryptoJS.enc.Hex.stringify(wordArray)

  const encrypted = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Hex.parse(encryptedCiphertext)
  })

  var decrypt = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

// console.log(encrypt('{}'))
// {}的加密结果： S1uAYaf/g6oBpv8DWUaQlQ==
// const result = decrypt(" S1uAYaf/g6oBpv8DWUaQlQ==")
// console.log(result)
module.exports = { encrypt, decrypt }
