import { getVault, replaceWalletInVault } from './walletService'
import type Account from '../models/account'
import axios from 'axios'
import { getTokenBalanceUrl, getTokenPriceUrl } from '../utils/api'
import type { CeloAccountBalance } from '../models/interfaces/celo/celoAccountBalance'
import { BigNumber } from 'bignumber.js'
import { getDefaultCeloBalance } from '../models/defaultBalances'

export async function getCeloAccountBalance(
    account: Account,
    chain: string,
    networkId: number
) {
    if (!account || !account.address) {
        return getDefaultCeloBalance('')
    }

    const balanceResponse = await axios.get(
        getTokenBalanceUrl(chain, networkId, account.address)
    )
    if (balanceResponse.status === 200) {
        let celoBalance: CeloAccountBalance = balanceResponse.data
        const price = await getTokenPrice(chain, 'usd')
        if (price) {
            const pricePerUnit = new BigNumber(
                price[chain.toLowerCase()]['usd']
            )
            const totalCelo = new BigNumber(celoBalance.totalCelo)
            const totalValue = totalCelo.multipliedBy(pricePerUnit)
            const roundedTotal = totalValue.decimalPlaces(
                2,
                BigNumber.ROUND_DOWN
            )
            celoBalance.pricePerUnitInAltCurrency = pricePerUnit.toString()
            celoBalance.totalValueInAltCurrency = roundedTotal.toString()
        }
        return celoBalance
    }

    return getDefaultCeloBalance(account.address)
}

export async function updateAccountMetaData(
    account: Account,
    newAccountName: string,
    newGroupName: string
): Promise<boolean> {
    let vault = await getVault()
    if (!vault) return false

    let wallet = vault.wallets.find(x => x.id === account.walletId)
    if (wallet && wallet.accounts.length > 0) {
        for (let i = 0; i < wallet.accounts.length; i++) {
            if (wallet.accounts[i].address === account.address) {
                let accountModified = false
                if (wallet.accounts[i].nickName !== newAccountName) {
                    wallet.accounts[i].nickName = newAccountName
                    accountModified = true
                }

                if (wallet.accounts[i].group !== newGroupName) {
                    wallet.accounts[i].group = newGroupName
                    accountModified = true
                }

                if (accountModified) {
                    return await replaceWalletInVault(wallet, vault)
                }
                break
            }
        }
    }

    return false
}

async function getTokenPrice(chain: string, altCurrency: string) {
    const priceResponse = await axios.get(getTokenPriceUrl(chain, altCurrency))
    if (priceResponse.status === 200 && priceResponse.data) {
        return JSON.parse(priceResponse.data)
    }

    return undefined
}
