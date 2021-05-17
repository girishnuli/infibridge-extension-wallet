import MyWallets from '../pages/wallets/MyWallets.svelte'
import EVMCreateWalletNewSeed from '../pages/wallets/evm/CreateWalletNewSeed.svelte'
import EVMCreateWalletImportSeed from '../pages/wallets/evm/CreateWalletImportSeed.svelte'
import EVMCreateWalletPrivateKey from '../pages/wallets/evm/CreateWalletPrivateKey.svelte'
import EVMCreateWalletKeystoreFile from '../pages/wallets/evm/CreateWalletKeystoreFile.svelte'

export default {
    '/my-wallets': MyWallets,

    '/evm-create-wallet-new-seed/:chain': EVMCreateWalletNewSeed,

    '/evm-create-wallet-import-seed/:chain': EVMCreateWalletImportSeed,

    '/evm-create-wallet-private-key/:chain': EVMCreateWalletPrivateKey,

    '/evm-create-wallet-keystore-file/:chain': EVMCreateWalletKeystoreFile,
}
