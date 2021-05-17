/// <reference types="chrome"/>

console.log('Background script initialized.')

const defaultNav = {
    navCount: 0, // 0 - default, 1 - unhandled, 2 - handled
    navRoute: '',
}

const defaultData = {
    walletId: '',
    password: '',
}

let nav = defaultNav
let activeWallet = defaultData

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.message) {
        case 'getPassword':
            sendResponse({ ...activeWallet })
            break

        case 'setPassword':
            activeWallet = { ...request.data }
            sendResponse({ result: 'success' })
            break

        case 'clearPassword':
            activeWallet = defaultData
            sendResponse({ result: 'success' })
            break

        case 'getNav':
            sendResponse({ ...nav })
            break

        case 'setNav':
            nav = { ...request.data }
            sendResponse({ result: 'success' })
            break

        case 'clearNav':
            nav = defaultNav
            sendResponse({ result: 'success' })
    }

    //  Required to return true: http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
    return true
})
