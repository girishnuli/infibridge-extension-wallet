export const navRoutes = {
    // Get Started
    Welcome: '/',
    WalletAction: '/wallet-action',
    WalletReady: '/wallet-ready',

    // My wallets
    MyWallets: '/my-wallets',

    // Create EVM wallet
    EVMCreateWalletNewSeed: '/evm-create-wallet-new-seed/:chain',
    EVMCreateWalletImportSeed: '/evm-create-wallet-import-seed/:chain',
    EVMCreateWalletPrivateKey: '/evm-create-wallet-private-key/:chain',
    EVMCreateWalletKeystoreFile: '/evm-create-wallet-keystore-file/:chain',

    // Celo
    CeloIndex: '/celo-index',
    ChooseSendAddress: '/celo-send-address',
    SendCelo: '/send-celo',
}
