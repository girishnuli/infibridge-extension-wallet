import InfiWallet from '../models/infiWallet'
import { writable } from 'svelte/store'
import {
    getWallet,
    unlockWallet,
    setActiveAccount,
} from '../services/walletService'
import {
    getCeloAccountBalance,
    updateAccountMetaData,
} from '../services/accountService'
import Account from '../models/account'
import { settings } from './index'
import {
    getActiveWalletPassword,
    setActiveWalletPassword,
    clearActiveWalletPassword,
} from '../services/chromeApi'
import { getDefaultCeloBalance } from '../models/defaultBalances'
import { chains } from '../constants/constStrings'

const initialState = {
    wallet: new InfiWallet(),
    activeAccount: new Account(),
    celoBalance: getDefaultCeloBalance(''),
    isUnlocked: false,
}

const resetState = async () => {
    await settings.removeActiveWallet()
    clearActiveWalletPassword()
}

function createActiveWalletStore() {
    const { subscribe, update } = writable(initialState)

    return {
        subscribe,

        updateAccountMetadata: async (
            account: Account,
            newAccountName: string,
            newGroupName: string
        ) => {
            const updated = await updateAccountMetaData(
                account,
                newAccountName,
                newGroupName
            )
            if (updated) {
                account.nickName = newAccountName
                account.group = newGroupName
                update(
                    state =>
                        (state = {
                            ...state,
                            activeAccount: account,
                        })
                )
            }
        },

        loadWallet: async (walletId: string) => {
            const wallet = await getWallet(walletId)
            if (wallet) {
                await settings.changeActiveWallet(wallet)
                let activeAccount: Account
                const account = wallet.accounts.find(
                    x => x.address === wallet.activeAccountAddress
                )
                if (account) {
                    activeAccount = account
                } else {
                    activeAccount = wallet.accounts[0]
                }

                await setActiveAccount(
                    activeAccount.walletId,
                    activeAccount.address
                )

                update(
                    state =>
                        (state = {
                            ...state,
                            isUnlocked: false,
                            wallet: wallet,
                            activeAccount: activeAccount,
                            celoBalance: getDefaultCeloBalance(
                                activeAccount.address
                            ),
                        })
                )

                return wallet
            } else {
                await resetState()
                update(state => (state = { ...state, ...initialState }))
                return undefined
            }
        },

        unlockWallet: async (wallet: InfiWallet, password: string) => {
            if (wallet && password) {
                const unlockedWallet = unlockWallet(wallet, password)
                if (unlockedWallet) {
                    setActiveWalletPassword(unlockedWallet.id, password)
                    let activeAccount: Account
                    const account = unlockedWallet.accounts.find(
                        x => x.address === unlockedWallet.activeAccountAddress
                    )

                    if (account) {
                        activeAccount = account
                    } else {
                        activeAccount = unlockedWallet.accounts[0]
                    }

                    update(
                        state =>
                            (state = {
                                ...state,
                                isUnlocked: true,
                                wallet: unlockedWallet,
                                activeAccount: activeAccount,
                            })
                    )

                    return unlockedWallet
                }
            }

            return undefined
        },

        changeActiveAccount: async (account: Account) => {
            const success = await setActiveAccount(
                account.walletId,
                account.address
            )
            if (success) {
                update(
                    state =>
                        (state = {
                            ...state,
                            activeAccount: account,
                        })
                )
            }
        },

        refreshCeloBalance: async (account: Account, networkId: number) => {
            const balance = await getCeloAccountBalance(
                account,
                chains.celo,
                networkId
            )
            update(
                state =>
                    (state = {
                        ...state,
                        celoBalance: balance,
                    })
            )
        },

        isWalletUnlocked: async (wallet: InfiWallet) => {
            const password = await getActiveWalletPassword(wallet.id)
            if (password && wallet.id === wallet.encId) {
                update(
                    state =>
                        (state = {
                            ...state,
                            isUnlocked: true,
                        })
                )
                return true
            }

            update(
                state =>
                    (state = {
                        ...state,
                        isUnlocked: false,
                    })
            )
            return false
        },

        unloadWallet: () => {
            clearActiveWalletPassword()
            update(state => (state = { ...state, ...initialState }))
        },
    }
}

export const activeWalletStore = createActiveWalletStore()
