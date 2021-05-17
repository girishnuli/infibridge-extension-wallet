import Blockchain from './blockchain'

export default class Setting {
    agreeToTerms: boolean
    locale: string
    activeBlockchainName: string
    activeNetworkId: number
    activeWalletId: string

    constructor(
        agreeToTerms: boolean = false,
        locale: string = 'en',
        activeBlockchainName: string = Blockchain.list()[0].name,
        activeNetworkId: number = Blockchain.list()[0].networks[0].networkId,
        activeWalletId: string = ''
    ) {
        this.agreeToTerms = agreeToTerms
        this.locale = locale
        this.activeBlockchainName = activeBlockchainName
        this.activeNetworkId = activeNetworkId
        this.activeWalletId = activeWalletId
    }
}
