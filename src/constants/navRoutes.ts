export const navRoutes = {
    // Get Started
    WelcomeRoute: '/',
    WalletActionRoute: '/wallet-action',
    WalletReadyRoute: '/wallet-ready',

    // My wallets
    MyWalletsRoute: '/my-wallets',

    // Create EVM wallet
    EVMCreateWalletNewSeedTemplate: '/evm-create-wallet-new-seed/:chain',
    EVMCreateWalletNewSeedRoute: '/evm-create-wallet-new-seed',

    EVMCreateWalletImportSeedTemplate: '/evm-create-wallet-import-seed/:chain',
    EVMCreateWalletImportSeedRoute: '/evm-create-wallet-import-seed',

    EVMCreateWalletPrivateKeyTemplate: '/evm-create-wallet-private-key/:chain',
    EVMCreateWalletPrivateKeyRoute: '/evm-create-wallet-private-key',

    EVMCreateWalletKeystoreFileTemplate:
        '/evm-create-wallet-keystore-file/:chain',
    EVMCreateWalletKeystoreFileRoute: '/evm-create-wallet-keystore-file',

    // Celo
    CeloIndexRoute: '/celo-index',
    CeloSendAddressRoute: '/celo-send-address',
    CeloReviewSendRoute: '/celo-review-send',
    CeloDiscoverIndexRoute: '/celo-discover-index',
    CeloEarnIndexRoute: '/celo-earn-index',
    CeloVoteIndexRoute: '/celo-vote-index',
}
