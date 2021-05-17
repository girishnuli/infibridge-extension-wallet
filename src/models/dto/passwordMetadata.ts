export class PasswordMetadata {
    walletName: string
    password: string
    constructor(walletName: string, password: string) {
        this.walletName = walletName
        this.password = password
    }
}
