import MyWallets from '../pages/wallets/MyWallets.svelte'
import EVMCreateWalletNewSeed from '../pages/wallets/evm/CreateWalletNewSeed.svelte'
import EVMCreateWalletImportSeed from '../pages/wallets/evm/CreateWalletImportSeed.svelte'
import EVMCreateWalletPrivateKey from '../pages/wallets/evm/CreateWalletPrivateKey.svelte'
import EVMCreateWalletKeystoreFile from '../pages/wallets/evm/CreateWalletKeystoreFile.svelte'
import { navRoutes } from '../constants/navRoutes'

export default {
    [navRoutes.MyWallets]: MyWallets,

    [navRoutes.EVMCreateWalletNewSeed]: EVMCreateWalletNewSeed,

    [navRoutes.EVMCreateWalletImportSeed]: EVMCreateWalletImportSeed,

    [navRoutes.EVMCreateWalletPrivateKey]: EVMCreateWalletPrivateKey,

    [navRoutes.EVMCreateWalletKeystoreFile]: EVMCreateWalletKeystoreFile,
}
