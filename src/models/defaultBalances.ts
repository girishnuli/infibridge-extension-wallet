import { chains } from '../constants/constStrings'
import type { CeloAccountBalance } from './interfaces/celo/celoAccountBalance'

export const getDefaultCeloBalance = (address: string) => {
    return <CeloAccountBalance>{
        address: address,
        CELO: '0',
        lockedCELO: '0',
        cEUR: '0',
        cUSD: '0',
        pricePerUnitInAltCurrency: '0',
        totalCelo: '0',
        totalValueInAltCurrency: '0',
    }
}
