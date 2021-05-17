import bip39 from 'bip39'
import { Wallet, utils } from 'ethers'
import { v4 as uuidv4 } from 'uuid'
import { plainToClass } from 'class-transformer'
import { encryptAES, decryptAES } from '../utils/wallet/encryptionUtil'
import {
    MnemonicLanguages,
    MnemonicStrength,
    getWordList,
    getLanguages,
} from '../utils/wallet/mnemonicUtil'
import { chains, storageKeys } from '../constants/constStrings'
import InfiWallet from '../models/infiWallet'
import { WalletType } from '../models/enums/walletType'
import Account from '../models/account'
import { saveToStorage, getFromStorage } from './chromeApi'
import { logMessage } from '../utils/infra/logger'
import Vault from '../models/vault'
import { settings } from '../stores'
import { isDevEnv } from '../utils/env'
import { AccountType } from '../models/enums/accountType'

const CELO_DERIVATION_PATH = "m/44'/52752'/0'"
const ETH_DERIVATION_PATH = "m/44'/60'/0'"
const DEFAULT_GROUP_NAME = 'My Accounts'

export async function generateNewHDWallet(
    mnemonic: string,
    walletName: string,
    chain: string,
    password: string
): Promise<string | undefined> {
    const { address, privateKey } = generateAccountFromMnemonic(
        mnemonic,
        0,
        0,
        chain
    )

    const encryptedMnemonic = encryptAES(mnemonic, password)
    const encryptedPrivateKey = encryptAES(privateKey, password)

    const walletId = uuidv4()
    const encryptedWalletId = encryptAES(walletId, password)

    const wallet = new InfiWallet(
        walletId,
        encryptedWalletId,
        chain,
        walletName,
        encryptedMnemonic,
        WalletType.HD,
        [
            new Account(
                walletId,
                0,
                AccountType.HD,
                `Account 1`,
                address,
                encryptedPrivateKey,
                DEFAULT_GROUP_NAME
            ),
        ],
        address
    )

    const savedWalletId = await addWalletToVault(wallet)
    if (savedWalletId) {
        await settings.changeActiveWallet(wallet)
        return savedWalletId
    }

    return undefined
}

export async function generateNewWalletFromPrivateKey(
    private_Key: string,
    walletName: string,
    chain: string,
    password: string
): Promise<string | undefined> {
    const ethersWallet = generateAccountFromPrivateKey(private_Key)

    if (ethersWallet) {
        const { address, privateKey } = ethersWallet
        const encryptedPrivateKey = encryptAES(privateKey, password)

        const walletId = uuidv4()
        const encryptedWalletId = encryptAES(walletId, password)

        const wallet = new InfiWallet(
            walletId,
            encryptedWalletId,
            chain,
            walletName,
            '',
            WalletType.PrivateKey,
            [
                new Account(
                    walletId,
                    0,
                    AccountType.ImportedPvtKey,
                    `Account 1`,
                    address,
                    encryptedPrivateKey,
                    DEFAULT_GROUP_NAME
                ),
            ],
            address
        )

        const savedWalletId = await addWalletToVault(wallet)
        if (savedWalletId) {
            await settings.changeActiveWallet(wallet)
            return savedWalletId
        }

        return undefined
    }
}

export async function generateNewWalletFromKeystore(
    encryptedJson: string,
    encryptionPassword: string,
    walletName: string,
    chain: string,
    password: string
): Promise<string | undefined> {
    const ethersWallet = generateAccountFromKeystore(
        encryptedJson,
        encryptionPassword
    )

    if (ethersWallet) {
        const { address, privateKey } = ethersWallet
        const encryptedPrivateKey = encryptAES(privateKey, password)

        const walletId = uuidv4()
        const encryptedWalletId = encryptAES(walletId, password)

        const wallet = new InfiWallet(
            walletId,
            encryptedWalletId,
            chain,
            walletName,
            '',
            WalletType.Keystore,
            [
                new Account(
                    walletId,
                    0,
                    AccountType.ImportedKeystore,
                    `Account 1`,
                    address,
                    encryptedPrivateKey,
                    DEFAULT_GROUP_NAME
                ),
            ],
            address
        )

        const savedWalletId = await addWalletToVault(wallet)
        if (savedWalletId) {
            await settings.changeActiveWallet(wallet)
            return savedWalletId
        }

        return undefined
    }
}

async function addWalletToVault(
    wallet: InfiWallet
): Promise<string | undefined> {
    let vault: Vault | undefined

    try {
        vault = await getVault()
        if (!vault) {
            vault = new Vault()
        }

        vault.wallets.push(wallet)
        await saveVault(vault)
        return wallet.id
    } catch (error) {
        logMessage(error)
        return undefined
    }
}

export async function replaceWalletInVault(
    wallet: InfiWallet,
    vault: Vault
): Promise<boolean> {
    try {
        vault.wallets = vault.wallets.filter(x => x.id !== wallet.id)
        vault.wallets.push(wallet)
        await saveVault(vault)
        return true
    } catch (error) {
        logMessage(error)
        return false
    }
}

async function saveVault(vault: Vault) {
    try {
        if (isDevEnv()) {
            await saveToStorage(storageKeys.walletsKey, vault)
        } else {
            await saveToStorage(storageKeys.walletsKey, vault.wallets)
        }
    } catch (error) {
        logMessage(error)
    }
}

export function generateMnemonic(
    strength: MnemonicStrength = MnemonicStrength.s256_24words,
    language: MnemonicLanguages = MnemonicLanguages.english
): string {
    const mnemonic = bip39.generateMnemonic(
        strength,
        undefined,
        getWordList(language)
    )
    return mnemonic
}

export function validateMnemonic(mnemonic: string) {
    const languages = getLanguages()
    for (const language of languages) {
        if (bip39.validateMnemonic(mnemonic, getWordList(language))) {
            return true
        }
    }

    return false
}

export async function addNewHDAccountToWallet(
    walletId: string,
    password: string
): Promise<Account | undefined> {
    let vault = await getVault()
    if (!vault) return undefined

    let wallet = vault.wallets.find(x => x.id === walletId)
    if (!wallet) return undefined

    let accountIndex = 0
    const hdAccounts = wallet.accounts.filter(
        x => x.accountType === AccountType.HD
    )
    if (hdAccounts && hdAccounts.length > 0) {
        accountIndex = hdAccounts.length + 1
    }

    const mnemonic = decryptAES(wallet.mnemonic, password)
    if (!mnemonic) return undefined

    const { address, privateKey } = generateAccountFromMnemonic(
        mnemonic,
        0,
        accountIndex,
        wallet.blockchain
    )
    const encryptedPrivateKey = encryptAES(privateKey, password)
    if (!encryptedPrivateKey) return undefined

    const maxSeq = getMaxSeq(wallet)
    const account = new Account(
        walletId,
        maxSeq,
        AccountType.HD,
        `Account ${maxSeq + 1}`,
        address,
        encryptedPrivateKey,
        DEFAULT_GROUP_NAME
    )

    wallet.activeAccountAddress = address
    wallet.accounts.push(account)

    const success = await replaceWalletInVault(wallet, vault)
    return success ? account : undefined
}

export async function addNewAccountFromPrivateKeyToWallet(
    walletId: string,
    password: string,
    privateKey: string
): Promise<Account | undefined> {
    let vault = await getVault()
    if (!vault) return undefined

    let wallet = vault.wallets.find(x => x.id === walletId)
    if (!wallet) return undefined

    const ethersWallet = generateAccountFromPrivateKey(privateKey)
    if (!ethersWallet) return undefined

    const encryptedPrivateKey = encryptAES(privateKey, password)
    if (!encryptedPrivateKey) return undefined

    const maxSeq = getMaxSeq(wallet)
    const account = new Account(
        walletId,
        maxSeq,
        AccountType.ImportedPvtKey,
        `Account ${maxSeq + 1}`,
        ethersWallet.address,
        encryptedPrivateKey,
        DEFAULT_GROUP_NAME
    )

    wallet.activeAccountAddress = ethersWallet.address
    wallet.accounts.push(account)

    const success = await replaceWalletInVault(wallet, vault)
    return success ? account : undefined
}

export async function addNewAccountFromKeystoreToWallet(
    walletId: string,
    walletPassword: string,
    encryptedJson: string,
    keystorePassword: string
): Promise<Account | undefined> {
    let vault = await getVault()
    if (!vault) return undefined

    let wallet = vault.wallets.find(x => x.id === walletId)
    if (!wallet) return undefined

    const ethersWallet = generateAccountFromKeystore(
        encryptedJson,
        keystorePassword
    )
    if (!ethersWallet) return undefined

    const encryptedPrivateKey = encryptAES(
        ethersWallet.privateKey,
        walletPassword
    )
    if (!encryptedPrivateKey) return undefined

    const maxSeq = getMaxSeq(wallet)
    const account = new Account(
        walletId,
        maxSeq,
        AccountType.ImportedKeystore,
        `Account ${maxSeq + 1}`,
        ethersWallet.address,
        encryptedPrivateKey,
        DEFAULT_GROUP_NAME
    )

    wallet.activeAccountAddress = ethersWallet.address
    wallet.accounts.push(account)

    const success = await replaceWalletInVault(wallet, vault)
    return success ? account : undefined
}

export async function addNewAccountFromWatchAddressToWallet(
    walletId: string,
    watchAddress: string
): Promise<Account | undefined> {
    try {
        const isValid = utils.isAddress(watchAddress)
        if (!isValid) return undefined
    } catch {
        return undefined
    }

    let vault = await getVault()
    if (!vault) return undefined

    let wallet = vault.wallets.find(x => x.id === walletId)
    if (!wallet) return undefined

    const maxSeq = getMaxSeq(wallet)
    const account = new Account(
        walletId,
        maxSeq,
        AccountType.WatchAddress,
        `Account ${maxSeq + 1}`,
        watchAddress,
        '',
        DEFAULT_GROUP_NAME
    )

    wallet.activeAccountAddress = watchAddress
    wallet.accounts.push(account)

    const success = await replaceWalletInVault(wallet, vault)
    return success ? account : undefined
}

function generateAccountFromMnemonic(
    mnemonic: string,
    changeIndex: number = 0,
    addressIndex: number = 0,
    blockchain: string = chains.celo
): Wallet {
    let derivationPath: string = CELO_DERIVATION_PATH

    switch (blockchain) {
        case chains.celo:
            derivationPath = CELO_DERIVATION_PATH
            break

        case chains.eth:
            derivationPath = ETH_DERIVATION_PATH
            break
    }

    const wallet = Wallet.fromMnemonic(
        mnemonic,
        `${derivationPath}/${changeIndex}/${addressIndex}`
    )

    return wallet
}

function generateAccountFromPrivateKey(privateKey: string): Wallet | undefined {
    try {
        const wallet = new Wallet(privateKey)
        return wallet
    } catch (error) {
        logMessage(error)
        return undefined
    }
}

function generateAccountFromKeystore(
    encryptedJson: string,
    password: string
): Wallet | undefined {
    try {
        const wallet = Wallet.fromEncryptedJsonSync(encryptedJson, password)
        return wallet
    } catch (error) {
        logMessage(error)
        return undefined
    }
}

export async function getVault(): Promise<Vault | undefined> {
    try {
        let data = await getFromStorage(storageKeys.walletsKey)
        if (data) {
            let vault = plainToClass(Vault, data)
            return vault
        }
    } catch (error) {
        logMessage(error)
    }

    return undefined
}

export async function getAllWallets(): Promise<InfiWallet[]> {
    try {
        const data = await getVault()
        if (data && data.wallets.length > 0) {
            const wallets = data.wallets.sort((a, b) =>
                a.nickName.localeCompare(b.nickName)
            )
            return wallets
        }
    } catch (error) {
        logMessage(error)
    }

    return []
}

export async function getWalletsInBlockchain(
    chain: string
): Promise<InfiWallet[] | undefined> {
    try {
        const data = await getVault()
        if (data && data.wallets.length > 0) {
            const walletsInChain = data.wallets.filter(
                x => x.blockchain === chain
            )

            return walletsInChain
        }
    } catch (error) {
        logMessage(error)
    }

    return undefined
}

export async function getWallet(id: string): Promise<InfiWallet | undefined> {
    try {
        let vault = await getVault()
        if (vault && vault.wallets.length > 0) {
            const wallet = vault.wallets.find(x => x.id === id)
            return wallet
        }
    } catch (error) {
        logMessage(error)
    }

    return undefined
}

export async function updateWalletMetaData(
    walletId: string,
    newName: string
): Promise<boolean> {
    let vault = await getVault()
    if (vault) {
        let wallet = vault.wallets.find(x => x.id === walletId)
        if (wallet && wallet.nickName !== newName) {
            wallet.nickName = newName
            return await replaceWalletInVault(wallet, vault)
        }
    }

    return false
}

export async function walletsExist(): Promise<boolean> {
    try {
        let vault = await getVault()
        if (vault && vault.wallets.length > 0) {
            return true
        }
    } catch (error) {
        logMessage(error)
    }

    return false
}

export async function getUnlockedWalletFromStorage(
    id: string,
    password: string
) {
    try {
        let wallet = await getWallet(id)
        if (wallet) {
            return unlockWallet(wallet, password)
        }
    } catch (error) {
        logMessage(error)
        return undefined
    }
}

export function unlockWallet(
    wallet: InfiWallet,
    password: string
): InfiWallet | undefined {
    try {
        if (wallet) {
            wallet.encId = decryptAES(wallet.encId, password)
            if (!wallet.encId) return undefined

            if (wallet.walletType === WalletType.HD) {
                wallet.mnemonic = decryptAES(wallet.mnemonic, password)
                if (!wallet.mnemonic) return undefined
            }

            for (let i = 0; i < wallet.accounts.length; i++) {
                if (
                    wallet.accounts[i].accountType === AccountType.WatchAddress
                ) {
                    continue
                }

                const privateKey = decryptAES(
                    wallet.accounts[i].privateKey,
                    password
                )
                if (!privateKey) return undefined

                wallet.accounts[i].privateKey = privateKey
            }

            return wallet
        }
    } catch (error) {
        logMessage(error)
        return undefined
    }
}

export async function isValidWalletPassword(
    id: string,
    password: string
): Promise<boolean> {
    try {
        let wallet = await getWallet(id)
        if (wallet) {
            const id = decryptAES(wallet.encId, password)
            if (wallet.id === id) return true
        }
    } catch (error) {
        logMessage(error)
    }

    return false
}

export async function changeWalletPassword(
    id: string,
    currentPassword: string,
    newPassword: string
): Promise<boolean> {
    try {
        let wallet = await getUnlockedWalletFromStorage(id, currentPassword)
        if (wallet) {
            wallet.encId = encryptAES(wallet.encId, newPassword)

            if (wallet.walletType === WalletType.HD) {
                wallet.mnemonic = encryptAES(wallet.mnemonic, newPassword)
            }

            for (let i = 0; i < wallet.accounts.length; i++) {
                wallet.accounts[i].privateKey = encryptAES(
                    wallet.accounts[i].privateKey,
                    newPassword
                )
            }

            let vault = await getVault()
            if (vault) {
                return await replaceWalletInVault(wallet, vault)
            }
        }
    } catch (error) {
        logMessage(error)
    }

    return false
}

export async function deleteWallet(id: string): Promise<boolean> {
    try {
        let vault = await getVault()
        if (vault && vault.wallets && vault.wallets.length > 0) {
            vault.wallets = vault.wallets.filter(x => x.id !== id)
            await saveVault(vault)
            return true
        }
    } catch (error) {
        logMessage(error)
    }

    return false
}

export async function setActiveAccount(
    walletId: string,
    accountAddress: string
): Promise<boolean> {
    try {
        let wallet = await getWallet(walletId)
        if (wallet) {
            wallet.activeAccountAddress = accountAddress

            let vault = await getVault()
            if (vault) {
                return await replaceWalletInVault(wallet, vault)
            }
        }
    } catch (error) {
        logMessage(error)
    }

    return false
}

export function getPrivateKey(
    encryptedKey: string,
    password: string
): string | undefined {
    try {
        const key = decryptAES(encryptedKey, password)
        return key
    } catch {}

    return undefined
}

const getMaxSeq = (wallet: InfiWallet) => {
    let maxSeq = 0

    if (wallet.accounts.length > 0) {
        maxSeq = Math.max(...wallet.accounts.map(m => m.seq), 0)
        maxSeq = maxSeq + 1
    }

    return maxSeq
}
