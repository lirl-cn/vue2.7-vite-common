import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse("233C1D414E2F12AB");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('DBC12F341412EA32');   //十六位十六进制数作为密钥偏移量

//解密方法
function decrypt(word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

//加密方法
function encrypt(word) {
  let str = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}

export default {
  decrypt,
  encrypt,
  ECB: {
    encrypt: (word, key = '1234567890123456', base64 = false) => {
      const encrypted = CryptoJS.AES.encrypt(word, CryptoJS.enc.Latin1.parse(key), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
      return base64 ? encrypted.ciphertext.toString() : encrypted.toString()
    },
    decrypt: (word, key = '1234567890123456', base64 = false) => {
      const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
      const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
      const decrypt = CryptoJS.AES.decrypt(str, CryptoJS.enc.Latin1.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      const decryptStr = CryptoJS.enc.Utf8.stringify(decrypt)
      return decryptStr.toString();
    },
  }
}