<script lang="ts">
    import { fade, scale } from 'svelte/transition'
    import { cubicIn, cubicOut } from 'svelte/easing'
    import { _ } from 'svelte-i18n'
    import { uiState, activeWallet, settings } from '../../stores'
    import { getPrivateKey } from '../../services/walletService'
    import { AccountTabs } from '../../models/enums/accountTabs'
    import { openUrlInNewTab, copyTextToClipboard } from '../../utils/ui'
    import ErrorIcon from '../elements/ErrorIcon.svelte'
    import { chains } from '../../constants/constStrings'
    import { generateQRCode } from '../../utils/qrcode'
    import { onMount } from 'svelte'
    import Blockchain from '../../models/blockchain'

    let showCopiedText = false
    let explorerUrl = ''
    const activeNetwork = Blockchain.list()
        .filter(x => x.name === $settings.activeBlockchainName)[0]
        .networks.filter(x => x.networkId === $settings.activeNetworkId)[0]

    switch ($activeWallet.wallet.blockchain) {
        case chains.celo:
            explorerUrl = `${activeNetwork.networkExplorerUrl}/address/${$activeWallet.activeAccount.address}/transactions`
            break
    }

    let qrcodeDataUrl = ''
    let currentTab = AccountTabs.AccountInfo
    let accountName = $activeWallet.activeAccount.nickName
    let accountNameError = false
    let groupName = $activeWallet.activeAccount.group
    let groupNameError = false

    let privateKey: string | undefined = $_('PrivateKeyPrompt')
    let password = ''
    let passwordError = false
    let showPasswordErrorMsg = false
    let privateKeyUnlocked = false

    onMount(async () => {
        qrcodeDataUrl = await generateQRCode(
            $activeWallet.activeAccount.address
        )
    })

    const copyAddress = () => {
        const success = copyTextToClipboard($activeWallet.activeAccount.address)
        if (success) {
            showCopiedText = true
            setTimeout(() => {
                showCopiedText = false
            }, 2000)
        }
    }

    const switchTab = (tab: AccountTabs) => {
        if (tab === currentTab) return
        currentTab = tab
    }

    const validateInput = () => {
        accountNameError =
            !accountName || accountName.length === 0 || accountName.length > 15
        groupNameError =
            !groupName || groupName.length === 0 || groupName.length > 15
    }

    const validatePassword = () => {
        showPasswordErrorMsg = false
        passwordError = !password || password.length < 8
    }

    const save = async () => {
        if (accountNameError || groupNameError) return

        await activeWallet.updateAccountMetadata(
            $activeWallet.activeAccount,
            accountName,
            groupName
        )
        uiState.hideAccountDetailsModal()
    }

    const showPrivateKey = () => {
        privateKeyUnlocked = false

        if (passwordError) {
            showPasswordErrorMsg = true
            return
        }

        privateKey = getPrivateKey(
            $activeWallet.activeAccount.privateKey,
            password
        )
        if (!privateKey) {
            privateKey = $_('PrivateKeyPrompt')
            showPasswordErrorMsg = true
            return
        } else {
            password = ''
            privateKeyUnlocked = true
            showPasswordErrorMsg = false
        }
    }

</script>

<div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="account-details-modal"
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
                                        switchTab(AccountTabs.AccountInfo)}
                                    href="/"
                                    class={currentTab ===
                                    AccountTabs.AccountInfo
                                        ? 'active-tab'
                                        : 'normal-tab'}>
                                    {$_('AccountInfo')}
                                </a>

                                <a
                                    on:click|preventDefault={() =>
                                        switchTab(AccountTabs.PrivateKey)}
                                    href="/"
                                    class={currentTab === AccountTabs.PrivateKey
                                        ? 'active-tab'
                                        : 'normal-tab'}>
                                    {$_('PrivateKey')}
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>

                <div class="block absolute top-0 right-0 pt-4 pr-4">
                    <button
                        on:click={() => uiState.hideAccountDetailsModal()}
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

                {#if currentTab === AccountTabs.AccountInfo}
                    <div class="w-80">
                        <img
                            src={qrcodeDataUrl}
                            alt="qr-code"
                            class="mx-auto mt-3 h-48 w-48" />

                        {#if showCopiedText}
                            <p
                                in:fade={{ duration: 300, easing: cubicIn }}
                                out:fade={{
                                    duration: 300,
                                    easing: cubicOut,
                                }}
                                class="py-1 text-xs text-blue-800 text-center">
                                {$_('Copied')}
                            </p>
                        {/if}

                        <p
                            on:click={() => copyAddress()}
                            id="address"
                            class="py-1 text-sm break-all text-center hover:bg-gray-500 hover:text-white">
                            {$activeWallet.activeAccount.address}
                        </p>

                        <div class="mt-3 text-center">
                            <button
                                class="link-button text-sm"
                                on:click|preventDefault={() =>
                                    openUrlInNewTab(explorerUrl)}
                                >{$_('OpenInExplorer')}
                            </button>
                        </div>

                        <form
                            class="mt-5"
                            on:submit|preventDefault={async () => await save()}>
                            <div
                                class="relative max-w-lg flex rounded-md shadow-sm">
                                <span class="grouped-textbox-label w-24">
                                    {$_('Name')}
                                </span>
                                <input
                                    bind:value={accountName}
                                    on:input={() => validateInput()}
                                    type="text"
                                    name="account-name"
                                    id="account-name"
                                    class="grouped-textbox-input"
                                    required
                                    maxlength="15" />
                                {#if accountNameError}
                                    <ErrorIcon />
                                {/if}
                            </div>

                            <div
                                class="mt-2 relative max-w-lg flex rounded-md shadow-sm">
                                <span class="grouped-textbox-label w-24">
                                    {$_('Group')}
                                </span>
                                <input
                                    bind:value={groupName}
                                    on:input={() => validateInput()}
                                    type="text"
                                    name="account-group"
                                    id="account-group"
                                    class="grouped-textbox-input"
                                    required
                                    maxlength="15" />
                                {#if groupNameError}
                                    <ErrorIcon />
                                {/if}
                            </div>

                            <div
                                class="mt-5 grid grid-cols-2 gap-3 grid-flow-row-dense">
                                <button
                                    type="submit"
                                    class="primary-btn-inline col-start-2">
                                    {$_('Save')}
                                </button>
                                <button
                                    on:click={() =>
                                        uiState.hideAccountDetailsModal()}
                                    type="button"
                                    class="secondary-btn-inline mt-0 col-start-1">
                                    {$_('Cancel')}
                                </button>
                            </div>
                        </form>
                    </div>
                {:else if currentTab === AccountTabs.PrivateKey}
                    <div class="w-80">
                        <div
                            class="mt-3 flex items-center justify-center border border-2 rounded-md p-8 h-48 text-center text-blue-900 text-base">
                            <p class={privateKeyUnlocked ? 'break-all' : ''}>
                                {privateKey}
                            </p>
                        </div>
                        <p class="mt-5 text-sm">
                            {$_('PrivateKeyNotice')}
                        </p>
                        <form
                            class="mt-5"
                            on:submit|preventDefault={() => showPrivateKey()}>
                            <div
                                class="mt-2 relative max-w-lg flex rounded-md shadow-sm">
                                <span class="grouped-textbox-label w-24">
                                    {$_('Password')}
                                </span>
                                <input
                                    bind:value={password}
                                    on:input={() => validatePassword()}
                                    type="password"
                                    name="password"
                                    id="password"
                                    class="grouped-textbox-input"
                                    required />
                                {#if passwordError}
                                    <ErrorIcon />
                                {/if}
                            </div>
                            <p
                                class="{showPasswordErrorMsg
                                    ? ''
                                    : 'hidden'} mt-2 error">
                                {$_('InvalidPassword')}
                            </p>

                            <div class="mt-5">
                                <button
                                    type="submit"
                                    class="primary-btn-inline w-full">
                                    {$_('ShowPrivateKey')}
                                </button>
                            </div>
                        </form>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>
