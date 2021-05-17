import Setting from '../models/setting'
import {
    getSettingsFromStorage,
    saveSettingsToStorage,
} from '../services/settingsService'
import { writable } from 'svelte/store'
import type Network from '../models/network'
import Blockchain from '../models/blockchain'
import type InfiWallet from '../models/infiWallet'

const defaultSettings = new Setting()
const initialState = { ...defaultSettings }

const getDefaultNetworkId = (chain: string) => {
    const defaultNetwork = Blockchain.list().filter(x => x.name === chain)[0]
        .networks[0]
    return defaultNetwork.networkId
}

const isNetworkInChain = (chain: string, networkIdToCheck: number) => {
    const networks = Blockchain.list().filter(x => x.name === chain)[0].networks
    const filteredNetworks = networks.filter(
        x => x.networkId === networkIdToCheck
    )
    if (filteredNetworks && filteredNetworks.length > 0) {
        return true
    }

    return false
}

function createSettingsStore() {
    const { subscribe, update } = writable(initialState)

    return {
        subscribe,

        loadSettings: async () => {
            const settings = await getSettingsFromStorage()
            update(
                state =>
                    (state = {
                        agreeToTerms: settings.agreeToTerms,
                        locale: settings.locale,
                        activeBlockchainName: settings.activeBlockchainName,
                        activeNetworkId: settings.activeNetworkId,
                        activeWalletId: settings.activeWalletId,
                    })
            )
        },

        agreeToTerms: async (agreed: boolean) => {
            let settings = await getSettingsFromStorage()
            settings.agreeToTerms = agreed
            await saveSettingsToStorage(settings)
            update(state => (state = { ...state, agreeToTerms: agreed }))
        },

        changeLocale: async (newLocale: string) => {
            let settings = await getSettingsFromStorage()
            settings.locale = newLocale
            await saveSettingsToStorage(settings)
            update(state => (state = { ...state, locale: newLocale }))
        },

        changeNetwork: async (network: Network) => {
            let settings = await getSettingsFromStorage()
            settings.activeNetworkId = network.networkId
            await saveSettingsToStorage(settings)
            update(
                state =>
                    (state = { ...state, activeNetworkId: network.networkId })
            )
        },

        changeBlockchain: async (
            blockchain: Blockchain,
            activeWalletId: string
        ) => {
            let settings = await getSettingsFromStorage()
            settings.activeBlockchainName = blockchain.name
            settings.activeNetworkId = blockchain.networks[0].networkId
            settings.activeWalletId = activeWalletId

            await saveSettingsToStorage(settings)
            update(
                state =>
                    (state = {
                        ...state,
                        activeBlockchainName: settings.activeBlockchainName,
                        activeNetworkId: settings.activeNetworkId,
                        activeWalletId: settings.activeWalletId,
                    })
            )
        },

        changeActiveWallet: async (wallet: InfiWallet) => {
            let settings = await getSettingsFromStorage()
            settings.activeWalletId = wallet.id

            if (wallet.blockchain !== settings.activeBlockchainName) {
                settings.activeBlockchainName = wallet.blockchain
            }

            if (
                !isNetworkInChain(wallet.blockchain, settings.activeNetworkId)
            ) {
                settings.activeNetworkId = getDefaultNetworkId(
                    wallet.blockchain
                )
            }

            await saveSettingsToStorage(settings)

            update(
                state =>
                    (state = {
                        ...state,
                        activeWalletId: settings.activeWalletId,
                        activeBlockchainName: settings.activeBlockchainName,
                        activeNetworkId: settings.activeNetworkId,
                    })
            )
        },

        removeActiveWallet: async () => {
            let settings = await getSettingsFromStorage()
            settings.activeWalletId = ''

            await saveSettingsToStorage(settings)

            update(
                state =>
                    (state = {
                        ...state,
                        activeWalletId: settings.activeWalletId,
                    })
            )
        },
    }
}

export const settingsStore = createSettingsStore()
