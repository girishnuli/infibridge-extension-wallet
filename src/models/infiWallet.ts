import type Account from './account'
import { WalletType } from './enums/walletType'

export default class InfiWallet {
    id: string // uuid
    encId: string
    blockchain: string // blockchain name
    nickName: string // wallet name
    mnemonic: string // encrypted mnemonic
    walletType: WalletType
    accounts: Account[]
    activeAccountAddress: string

    constructor(
        id: string = '',
        encId: string = '',
        blockchain: string = '',
        name: string = '',
        mnemonic: string = '',
        walletType: WalletType = WalletType.HD,
        accounts: Account[] = [],
        activeAccountAddress: string = ''
    ) {
        this.id = id
        this.encId = encId
        this.blockchain = blockchain
        this.nickName = name
        this.mnemonic = mnemonic
        this.walletType = walletType
        this.accounts = accounts
        this.activeAccountAddress = activeAccountAddress
    }
}
