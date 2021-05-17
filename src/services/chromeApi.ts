/// <reference types="chrome" />

import { push } from 'svelte-spa-router'
import { isDevEnv } from '../utils/env'
import { logMessage } from '../utils/infra/logger'
import makePromise from '../utils/makePromise'
import { messageKeys } from '../constants/constStrings'
import type { Nav } from '../models/interfaces/nav'

let devEnvActiveWallet = {
    walletId: '',
    password: '',
}

const resetDevEnvActiveWallet = () => {
    devEnvActiveWallet.walletId = ''
    devEnvActiveWallet.password = ''
}

export const getActiveWalletPassword = (walletId: string) => {
    const promise = new Promise<string | undefined>(
        (resolve: any, reject: any) => {
            if (isDevEnv()) {
                if (walletId === devEnvActiveWallet.walletId) {
                    resolve(devEnvActiveWallet.password)
                } else {
                    resetDevEnvActiveWallet()
                    resolve(undefined)
                }
            } else {
                chrome.runtime.sendMessage(
                    { message: messageKeys.getPassword },
                    function (response) {
                        const wallet = response
                        if (wallet.walletId === walletId) {
                            resolve(response.password)
                        } else {
                            resolve(undefined)
                        }
                    }
                )
            }
        }
    )

    return promise
}

export const setActiveWalletPassword = (walletId: string, password: string) => {
    if (isDevEnv()) {
        devEnvActiveWallet.walletId = walletId
        devEnvActiveWallet.password = password
    } else {
        chrome.runtime.sendMessage(
            { message: messageKeys.setPassword, data: { walletId, password } },
            function (response) {
                console.log(response)
            }
        )
    }
}

export const clearActiveWalletPassword = () => {
    if (isDevEnv()) {
        resetDevEnvActiveWallet()
    } else {
        chrome.runtime.sendMessage(
            { message: messageKeys.clearPassword },
            function (response) {
                console.log(response)
            }
        )
    }
}

export const getNavRoute = () => {
    const promise = new Promise<Nav | undefined>(
        (resolve: any, reject: any) => {
            if (isDevEnv()) resolve(undefined)

            chrome.runtime.sendMessage(
                { message: messageKeys.getNav },
                function (response) {
                    const nav = <Nav>response
                    if (nav.navCount > 0 && nav.navRoute) {
                        resolve(nav)
                    } else {
                        resolve(undefined)
                    }
                }
            )
        }
    )

    return promise
}

export const setNavRoute = (route: string, count: number) => {
    const promise = new Promise<any>((resolve: any, reject: any) => {
        if (isDevEnv()) resolve(undefined)

        chrome.runtime.sendMessage(
            {
                message: messageKeys.setNav,
                data: { navCount: count, navRoute: route },
            },
            function (response) {
                console.log(response)
                resolve(response)
            }
        )
    })

    return promise
}

export const clearNavRoute = () => {
    const promise = new Promise<any>((resolve: any, reject: any) => {
        if (isDevEnv()) resolve(undefined)

        chrome.runtime.sendMessage(
            { message: messageKeys.clearNav },
            function (response) {
                console.log(response)
                resolve(response)
            }
        )
    })

    return promise
}

export const isPopupOpen = () => {
    if (isDevEnv()) return false

    // https://stackoverflow.com/a/8921196
    const views = chrome.extension.getViews({ type: 'popup' })
    return views && views.length > 0
}

export const openOptionsPage = async (
    route: string,
    isNonDefaultRoute: boolean
) => {
    if (!isDevEnv()) {
        if (isPopupOpen()) {
            if (isNonDefaultRoute) {
                await setNavRoute(route, 1)
            }

            chrome.runtime.openOptionsPage()
            window.close()
        } else {
            const url = `${chrome.runtime.getURL('index.html')}/#${route}`
            window.location.href = url
        }
    } else {
        push(route)
    }
}

export const restartExtension = () => {
    if (!isDevEnv()) {
        // @ts-ignore
        chrome.extension.getBackgroundPage().window.location.href = '/'
    } else {
        window.location.href = '/'
    }
}

export const saveToStorage = (key: string, value: object) => {
    const promise = makePromise((resolve: any, reject: any) => {
        if (isDevEnv()) {
            localStorage.setItem(key, JSON.stringify(value))
            resolve()
        } else {
            chrome.storage.local.set({ [key]: value }, () => {
                if (chrome.runtime.lastError) {
                    logMessage(chrome.runtime.lastError)
                    reject(chrome.runtime.lastError)
                }

                resolve()
            })
        }
    })

    return promise
}

export const getFromStorage = (key: string) => {
    const promise = makePromise((resolve: any, reject: any) => {
        if (isDevEnv()) {
            const data = localStorage.getItem(key)
            if (data) {
                resolve(JSON.parse(data))
            } else {
                resolve(undefined)
            }
        } else {
            chrome.storage.local.get([key], response => {
                if (chrome.runtime.lastError) reject(chrome.runtime.lastError)

                resolve(response)
            })
        }
    })

    return promise
}

export const removeFromStorage = (key: string) => {
    const promise = makePromise((resolve: any, reject: any) => {
        if (isDevEnv()) {
            localStorage.removeItem(key)
            resolve()
        } else {
            chrome.storage.local.remove([key], () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                }

                resolve()
            })
        }
    })

    return promise
}
