import { isDevEnv } from './env'

export function getTokenBalanceUrl(
    chain: string,
    networkId: number,
    address: string
) {
    if (isDevEnv()) {
        return `https://token-api.infibridge.com/account/balance/${chain.toLowerCase()}/${networkId}/${address}`
    } else {
        return `https://token-api.infibridge.com/account/balance/${chain.toLowerCase()}/${networkId}/${address}`
    }
}

export function getTokenPriceUrl(chain: string, altCurrency: string) {
    if (isDevEnv()) {
        return `https://token-api.infibridge.com/market/price/${chain.toLowerCase()}/${altCurrency}`
    } else {
        return `https://token-api.infibridge.com/market/price/${chain.toLowerCase()}/${altCurrency}`
    }
}
