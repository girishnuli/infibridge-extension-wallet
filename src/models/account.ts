import { AccountType } from './enums/accountType'

export default class Account {
    walletId: string
    seq: number
    accountType: AccountType
    nickName: string
    address: string
    privateKey: string
    group: string

    constructor(
        walletId: string = '',
        seq: number = 0,
        accountType: AccountType = AccountType.HD,
        nickName: string = '',
        address: string = '',
        privateKey: string = '',
        group: string = ''
    ) {
        this.walletId = walletId
        this.seq = seq
        this.accountType = accountType
        this.nickName = nickName
        this.address = address
        this.privateKey = privateKey
        this.group = group
    }
}
