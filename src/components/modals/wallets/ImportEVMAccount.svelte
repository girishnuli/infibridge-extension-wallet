<script lang="ts">
    import { fade, scale } from 'svelte/transition'
    import { cubicIn, cubicOut } from 'svelte/easing'
    import { _ } from 'svelte-i18n'
    import { uiState, activeWallet, settings } from '../../../stores'
    import {
        addNewAccountFromKeystoreToWallet,
        addNewAccountFromPrivateKeyToWallet,
        addNewAccountFromWatchAddressToWallet,
    } from '../../../services/walletService'
    import { ImportAccountTabs } from '../../../models/enums/importAccountTabs'
    import ErrorIcon from '../../elements/ErrorIcon.svelte'
    import { getActiveWalletPassword } from '../../../services/chromeApi'
    import { AccountType } from '../../../models/enums/accountType'
    import { chains } from '../../../constants/constStrings'

    let currentTab = ImportAccountTabs.PrivateKey

    let privateKey = ''
    let privateKeyError = false

    let keystorePassword = ''
    let keystorePasswordError = false
    let keystoreFile: any
    let keystoreFileName = ''
    let keystoreFileContent: any
    let keystoreFileError = false

    let watchAddress = ''
    let watchAddressError = false

    const switchTab = (tab: ImportAccountTabs) => {
        if (tab === currentTab) return
        currentTab = tab
    }

    const validatePrivateKey = () => {
        privateKeyError = !privateKey || privateKey.length < 64

        return !privateKeyError
    }

    const validateWatchAddress = () => {
        watchAddressError = !watchAddress || watchAddress.length < 42

        return !watchAddressError
    }

    const validateKeystorePassword = () => {
        keystorePasswordError = !keystorePassword
        return !keystorePasswordError
    }

    const parseFile = (e: any) => {
        keystoreFileError = false
        try {
            const file = e.target.files[0]
            keystoreFileName = file.name
            let reader = new FileReader()
            reader.onload = ev => {
                // @ts-ignore
                keystoreFileContent = ev.target.result
            }
            reader.readAsText(file)
        } catch (error) {
            keystoreFileError = true
        }
    }

    const importAccount = async (accountType: AccountType) => {
        let walletLocked = true

        if (accountType === AccountType.ImportedPvtKey && privateKeyError) {
            return
        } else if (
            accountType === AccountType.WatchAddress &&
            watchAddressError
        ) {
            return
        } else if (accountType === AccountType.ImportedKeystore) {
            if (keystorePasswordError || keystoreFileError) return

            if (!keystoreFileContent) {
                keystoreFileError = true
                return
            }
        }

        uiState.setBusy(true)
        const isUnlocked = activeWallet.isWalletUnlocked($activeWallet.wallet)
        if (isUnlocked) {
            const password = await getActiveWalletPassword(
                $activeWallet.wallet.id
            )
            if (password) {
                const walletId = $activeWallet.wallet.id
                let newAccount
                let success = false
                if (accountType === AccountType.ImportedPvtKey) {
                    newAccount = await addNewAccountFromPrivateKeyToWallet(
                        walletId,
                        password,
                        privateKey
                    )

                    if (!newAccount) {
                        privateKeyError = true
                        uiState.setBusy(false)
                        return
                    } else {
                        success = true
                    }
                } else if (accountType === AccountType.ImportedKeystore) {
                    newAccount = await addNewAccountFromKeystoreToWallet(
                        walletId,
                        password,
                        keystoreFileContent,
                        keystorePassword
                    )
                    if (!newAccount) {
                        keystorePasswordError = true
                        uiState.setBusy(false)
                        return
                    } else {
                        success = true
                    }
                } else if (accountType === AccountType.WatchAddress) {
                    newAccount = await addNewAccountFromWatchAddressToWallet(
                        walletId,
                        watchAddress
                    )
                    if (!newAccount) {
                        watchAddressError = true
                        uiState.setBusy(false)
                        return
                    } else {
                        success = true
                    }
                }

                if (success && newAccount) {
                    // Note: loadWallet will automatically set the
                    // active account. We don't need to explicitly call
                    // changeActiveAccount on activeWallet
                    await activeWallet.loadWallet($activeWallet.wallet.id)
                    await activeWallet.unlockWallet(
                        $activeWallet.wallet,
                        password
                    )
                    uiState.setBusy(false)
                    uiState.hideImportEVMAccountModal()

                    switch ($activeWallet.wallet.blockchain) {
                        case chains.celo:
                            await activeWallet.refreshCeloBalance(
                                newAccount,
                                $settings.activeNetworkId
                            )
                    }

                    return
                }
            }
        }

        if (walletLocked) {
            uiState.hideImportEVMAccountModal()
            uiState.showUnlockWalletModal()
        }

        uiState.setBusy(false)
    }

</script>

<div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="import-account-modal"
    role="dialog"
    aria-modal="true">
    <div class="flex items-center justify-center min-h-screen text-center">
        <div
            in:fade={{ duration: 300, easing: cubicOut }}
            out:fade={{ duration: 300, easing: cubicIn }}
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true" />

        <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">&#8203;</span>

        <div
            in:scale={{ duration: 150, start: 0.95, easing: cubicOut }}
            out:scale={{ duration: 100, start: 0.95, easing: cubicIn }}
            class="inline-block align-bottom bg-white rounded-lg px-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all">
            <div>
                <div>
                    <div class="block">
                        <div class="border-b border-gray-200">
                            <nav
                                class="-mb-px flex space-x-4"
                                aria-label="Tabs">
                                <a
                                    on:click|preventDefault={() =>
                                        switchTab(ImportAccountTabs.PrivateKey)}
                                    href="/"
                                    class={currentTab ===
                                    ImportAccountTabs.PrivateKey
                                        ? 'active-tab'
                                        : 'normal-tab'}>
                                    {$_('PrivateKey')}
                                </a>

                                <a
                                    on:click|preventDefault={() =>
                                        switchTab(
                                            ImportAccountTabs.KeystoreFile
                                        )}
                                    href="/"
                                    class={currentTab ===
                                    ImportAccountTabs.KeystoreFile
                                        ? 'active-tab'
                                        : 'normal-tab'}>
                                    {$_('KeystoreFile')}
                                </a>

                                <a
                                    on:click|preventDefault={() =>
                                        switchTab(ImportAccountTabs.Address)}
                                    href="/"
                                    class={currentTab ===
                                    ImportAccountTabs.Address
                                        ? 'active-tab'
                                        : 'normal-tab'}>
                                    {$_('Address')}
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>

                <div class="block absolute top-0 right-0 pt-4 pr-4">
                    <button
                        on:click={() => uiState.hideImportEVMAccountModal()}
                        type="button"
                        class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="sr-only">Close</span>
                        <svg
                            class="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {#if currentTab === ImportAccountTabs.PrivateKey}
                    <div class="w-96">
                        <div class="mt-4">
                            <textarea
                                id="private-key"
                                name="private-key"
                                rows="4"
                                bind:value={privateKey}
                                on:input={() => validatePrivateKey()}
                                required
                                class="textbox mt-1"
                                placeholder={$_('PastePrivateKeyHere')} />
                            <p
                                class="{privateKeyError
                                    ? ''
                                    : 'hidden'} mt-2 text-sm text-red-600">
                                {$_('PrivateKeyErrorMsg')}
                            </p>

                            <div class="mt-5 w-full">
                                <button
                                    on:click={() =>
                                        importAccount(
                                            AccountType.ImportedPvtKey
                                        )}
                                    type="button"
                                    class="primary-btn-inline">
                                    {$_('ImportPrivateKey')}
                                </button>
                            </div>
                        </div>
                    </div>
                {:else if currentTab === ImportAccountTabs.KeystoreFile}
                    <div class="w-96">
                        <div class="mt-4">
                            <div
                                class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div class="space-y-1 text-center">
                                    <svg
                                        class="wallet-action-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor">
                                        <path
                                            fill-rule="evenodd"
                                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <div class="flex text-sm justify-center">
                                        <label
                                            for="file-upload"
                                            class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                            <span
                                                >{$_(
                                                    'SelectKeystoreFile'
                                                )}</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                on:change={e => parseFile(e)}
                                                bind:this={keystoreFile}
                                                class="sr-only" />
                                        </label>
                                    </div>

                                    <p
                                        class="{keystoreFileName
                                            ? ''
                                            : 'hidden'} mt-1 text-sm font-bold text-gray-600 break-all">
                                        {keystoreFileName}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p
                            class="{keystoreFileError
                                ? ''
                                : 'hidden'} mt-2 text-sm text-red-600">
                            {$_('InvalidKeystoreFileOrPassword')}
                        </p>

                        <div
                            class="mt-4 relative max-w-lg flex rounded-md shadow-sm">
                            <span class="grouped-textbox-label w-24">
                                {$_('Password')}
                            </span>
                            <input
                                bind:value={keystorePassword}
                                on:input={() => validateKeystorePassword()}
                                type="password"
                                name="password"
                                id="password"
                                class="grouped-textbox-input"
                                required />
                            {#if keystorePasswordError}
                                <ErrorIcon />
                            {/if}
                        </div>
                        <p
                            class="{keystorePasswordError
                                ? ''
                                : 'hidden'} mt-2 error">
                            {$_('InvalidPassword')}
                        </p>

                        <div class="mt-5">
                            <button
                                on:click={() =>
                                    importAccount(AccountType.ImportedKeystore)}
                                type="button"
                                class="primary-btn-inline w-full">
                                {$_('ImportKeystore')}
                            </button>
                        </div>
                    </div>
                {:else if currentTab === ImportAccountTabs.Address}
                    <div class="w-96">
                        <div class="mt-4">
                            <textarea
                                id="address"
                                name="address"
                                rows="4"
                                bind:value={watchAddress}
                                on:input={() => validateWatchAddress()}
                                required
                                class="textbox mt-1"
                                placeholder={$_('PasteAddressHere')} />
                            <p
                                class="{watchAddressError
                                    ? ''
                                    : 'hidden'} mt-2 text-sm text-red-600">
                                {$_('AddressErrorMsg')}
                            </p>

                            <div class="mt-5 w-full">
                                <button
                                    on:click={() =>
                                        importAccount(AccountType.WatchAddress)}
                                    type="button"
                                    class="primary-btn-inline">
                                    {$_('ImportAddress')}
                                </button>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>
