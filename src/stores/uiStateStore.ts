import { writable } from 'svelte/store'

const initialState = {
    showAccountDetailsModal: false,
    showUnlockWalletModal: false,
    showImportEVMAccountModal: false,
    isAppBusy: false,
}

function createUIStateStore() {
    const { subscribe, update } = writable(initialState)

    return {
        subscribe,

        showAccountDetailsModal: () => {
            update(
                state => (state = { ...state, showAccountDetailsModal: true })
            )
        },

        hideAccountDetailsModal: () => {
            update(
                state => (state = { ...state, showAccountDetailsModal: false })
            )
        },

        showUnlockWalletModal: () => {
            update(state => (state = { ...state, showUnlockWalletModal: true }))
        },

        hideUnlockWalletModal: () => {
            update(
                state => (state = { ...state, showUnlockWalletModal: false })
            )
        },

        showImportEVMAccountModal: () => {
            update(
                state => (state = { ...state, showImportEVMAccountModal: true })
            )
        },

        hideImportEVMAccountModal: () => {
            update(
                state =>
                    (state = { ...state, showImportEVMAccountModal: false })
            )
        },

        setBusy: (isBusy: boolean) => {
            update(state => (state = { ...state, isAppBusy: isBusy }))
        },
    }
}

export const uiStateStore = createUIStateStore()
