<script lang="ts">
    import { fade } from 'svelte/transition'
    import { _ } from 'svelte-i18n'
    import { cubicIn, cubicOut } from 'svelte/easing'
    import { getTrimmedAddress } from '../../utils/wallet/accountUtil'
    import { clickOutside } from '../../utils/ui'
    import { addNewHDAccountToWallet } from '../../services/walletService'
    import type Account from '../../models/account'
    import { AccountType } from '../../models/enums/accountType'
    import { activeWallet, settings, uiState } from '../../stores'
    import { groupBy } from '../../utils/generic/array'
    import { WalletType } from '../../models/enums/walletType'
    import { getActiveWalletPassword } from '../../services/chromeApi'
    import tooltip from '../../utils/tooltip'
    import { chains } from '../../constants/constStrings'

    let isAccMenuOpen = false
    $: groupedAccounts = groupBy($activeWallet.wallet.accounts, x => x.group)

    const openMenu = () => {
        isAccMenuOpen = !isAccMenuOpen
    }

    const addHDAccount = async () => {
        let walletLocked = true

        const isUnlocked = activeWallet.isWalletUnlocked($activeWallet.wallet)
        if (isUnlocked) {
            const password = await getActiveWalletPassword(
                $activeWallet.wallet.id
            )
            if (password) {
                uiState.setBusy(true)
                const newAccount = await addNewHDAccountToWallet(
                    $activeWallet.wallet.id,
                    password
                )
                if (newAccount) {
                    await activeWallet.loadWallet($activeWallet.wallet.id)
                    await activeWallet.unlockWallet(
                        $activeWallet.wallet,
                        password
                    )
                    await activeWallet.changeActiveAccount(newAccount)

                    walletLocked = false
                    uiState.setBusy(false)
                }
            }
        }

        if (walletLocked) {
            isAccMenuOpen = false
            uiState.showUnlockWalletModal()
        }
    }

    const importAccount = () => {
        isAccMenuOpen = false

        const isUnlocked = activeWallet.isWalletUnlocked($activeWallet.wallet)
        if (isUnlocked) {
            uiState.showImportEVMAccountModal()
        } else {
            uiState.showUnlockWalletModal()
        }
    }

    const switchAccount = async (account: Account) => {
        isAccMenuOpen = false

        if ($activeWallet.activeAccount.address === account.address) {
            return
        }

        await activeWallet.changeActiveAccount(account)
        switch ($settings.activeBlockchainName) {
            case chains.celo:
                await activeWallet.refreshCeloBalance(
                    account,
                    $settings.activeNetworkId
                )
        }
    }

</script>

<div
    use:clickOutside={{
        enabled: isAccMenuOpen,
        cb: () => (isAccMenuOpen = false),
    }}
    class="relative">
    <div>
        <button
            on:click={() => openMenu()}
            class="rounded-sm p-1 flex items-center text-gray-500 hover:text-gray-900 hover:bg-gray-400"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true">
            <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
        </button>
    </div>

    {#if isAccMenuOpen}
        <div
            in:fade={{ duration: 200, easing: cubicOut }}
            out:fade={{ duration: 150, easing: cubicIn }}
            class="absolute z-10 right-0 mt-4 mb-3 px-1 w-screen max-w-sm">
            <div
                class="rounded-sm shadow-lg ring-1 ring-black ring-opacity-5 max-h-96 overflow-y-scroll">
                <div class="p-3 bg-gray-200 flex justify-between">
                    {#if $activeWallet.wallet.walletType === WalletType.HD}
                        <div class="flow-root">
                            <button
                                on:click={() => addHDAccount()}
                                class="-m-3 p-3 flex items-center text-sm font-medium text-gray-600 hover:bg-gray-300 transition ease-in-out duration-150">
                                <svg
                                    class="flex-shrink-0 h-5 w-5 text-gray-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="ml-1">Create Account</span>
                            </button>
                        </div>
                    {/if}

                    <div class="flow-root">
                        <button
                            on:click={() => importAccount()}
                            class="-m-3 p-3 flex items-center text-sm font-medium text-gray-600 hover:bg-gray-300 transition ease-in-out duration-150">
                            <svg
                                class="flex-shrink-0 h-5 w-5 text-gray-600"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="ml-1">Import Account</span>
                        </button>
                    </div>
                </div>

                <div class="relative bg-white w-full">
                    {#each Object.entries(groupedAccounts) as [group, accounts]}
                        <div
                            class="z-11 sticky top-0 border-t border-b border-blue-200 bg-blue-50 px-6 py-1 text-sm font-medium text-blue-500">
                            <h3>{group}</h3>
                        </div>

                        <div>
                            {#each accounts as account}
                                <a
                                    on:click|preventDefault={() =>
                                        switchAccount(account)}
                                    href="/"
                                    class="account-item {account.address ===
                                    $activeWallet.activeAccount.address
                                        ? 'bg-blue-100 hover:bg-blue-200'
                                        : 'hover:bg-gray-100'}">
                                    <span class="account-seq">
                                        {#if account.accountType === AccountType.HD}
                                            <!-- Heroicon location-marker -->
                                            <svg
                                                use:tooltip={{
                                                    content: $_('HDAccountTip'),
                                                }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        {:else if account.accountType === AccountType.ImportedPvtKey}
                                            <!-- Heroicon key -->
                                            <svg
                                                use:tooltip={{
                                                    content: $_(
                                                        'PvtKeyAccountTip'
                                                    ),
                                                }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        {:else if account.accountType === AccountType.ImportedKeystore}
                                            <svg
                                                use:tooltip={{
                                                    content: $_(
                                                        'KeystoreAccountTip'
                                                    ),
                                                }}
                                                class="h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        {:else if account.accountType === AccountType.WatchAddress}
                                            <svg
                                                use:tooltip={{
                                                    content: $_(
                                                        'WatchAddressTip'
                                                    ),
                                                }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        {/if}
                                    </span>
                                    <div
                                        class="ml-4 flex justify-between items-center w-full">
                                        <div class="py-1">
                                            <p
                                                class="account-title flex items-center">
                                                {account.nickName}
                                            </p>
                                            <p class="account-address">
                                                {getTrimmedAddress(
                                                    account.address
                                                )}
                                            </p>
                                        </div>
                                        <!-- <div>
                                            <p class="account-balance">
                                                <strong
                                                    >{account.balance}</strong>
                                                <span class="text-gray-500"
                                                    >{currencySymbol}</span>
                                            </p>
                                        </div> -->
                                    </div>
                                </a>
                            {/each}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>
