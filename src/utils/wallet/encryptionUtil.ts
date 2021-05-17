// Reference: https://stackoverflow.com/a/47904542/537871

import CryptoJS from 'crypto-js'

const keySize = 256
const ivSize = 128
const saltSize = 256
const iterations = 1000

export function encryptAES(plainText: string, password: string) {
    const salt = CryptoJS.lib.WordArray.random(saltSize / 8)
    const key = CryptoJS.PBKDF2(password, salt, {
        keySize: keySize / 32,
        iterations: iterations,
    })
    const iv = CryptoJS.lib.WordArray.random(ivSize / 8)

    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    })
    const encryptedHex = base64ToHex(encrypted.toString())
    const base64Encoded = hexToBase64(`${salt}${iv}${encryptedHex}`)

    return base64Encoded
}

export function decryptAES(encryptedText: string, pass: string) {
    var hexData = base64ToHex(encryptedText)
    var salt = CryptoJS.enc.Hex.parse(hexData.substr(0, 64))
    var iv = CryptoJS.enc.Hex.parse(hexData.substr(64, 32))
    var encrypted = hexToBase64(hexData.substring(96))
    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize / 32,
        iterations: iterations,
    })

    var decryptedData = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    })

    return decryptedData.toString(CryptoJS.enc.Utf8)
}

function hexToBase64(str: any) {
    return btoa(
        String.fromCharCode.apply(
            null,
            str
                .replace(/\r|\n/g, '')
                .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
                .replace(/ +$/, '')
                .split(' ')
        )
    )
}

function base64ToHex(str: any) {
    for (
        var i = 0, bin = atob(str.replace(/[ \r\n]+$/, '')), hex = [];
        i < bin.length;
        ++i
    ) {
        var tmp = bin.charCodeAt(i).toString(16)
        if (tmp.length === 1) tmp = '0' + tmp
        hex[hex.length] = tmp
    }
    return hex.join('')
}

// Note: Below code does not work with browser apps. Left here for reference to use with nodejs
// Credits: https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb
// const IV_LENGTH = 16
// const AES_KEY_LENGTH = 32

// export function encryptAES(plainText: string, password: string) {
//     const iv = crypto.randomBytes(IV_LENGTH)
//     const key = crypto.scryptSync(password, iv, AES_KEY_LENGTH)
//     const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)

//     let encryptedData = cipher.update(plainText)
//     encryptedData = Buffer.concat([encryptedData, cipher.final()])

//     return `${iv.toString('hex')}:${encryptedData.toString('hex')}`
// }

// export function decryptAES(encryptedText: string, password: string) {
//     const textParts = encryptedText.split(':')
//     const iv = Buffer.from(textParts[0], 'hex')
//     const key = crypto.scryptSync(password, iv, AES_KEY_LENGTH)
//     const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)

//     const encrypted = Buffer.from(textParts[1], 'hex')
//     let decrypted = decipher.update(encrypted)
//     decrypted = Buffer.concat([decrypted, decipher.final()])

//     return decrypted.toString()
// }
