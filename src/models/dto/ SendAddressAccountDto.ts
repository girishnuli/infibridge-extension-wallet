import type { AccountType } from '../enums/accountType'

export default interface SendAddressAccountDto {
    nickName: string
    group: string
    accountType: AccountType
    address: string
}
