<script lang="ts">
    import { getAllWallets, deleteWallet } from '../../services/walletService'
    import { settings, activeWallet, uiState } from '../../stores/index'
    import { onMount } from 'svelte'
    import type InfiWallet from '../../models/infiWallet'
    import { chains } from '../../constants/constStrings'
    import { push } from 'svelte-spa-router'
    import { _ } from 'svelte-i18n'
    import tooltip from '../../utils/tooltip'
    import DeleteWalletModal from '../../components/modals/wallets/DeleteWalletModal.svelte'
    import { isPopupOpen, restartExtension } from '../../services/chromeApi'
    import EditWalletModal from '../../components/modals//wallets/EditWalletModal.svelte'
    import { openOptionsPage } from '../../services/chromeApi'
    import { navRoutes } from '../../constants/navRoutes'

    const popupOpen = isPopupOpen()

    let showEditWalletModal = false
    let showDeleteWalletModal = false

    let selectedWallet: InfiWallet
    let wallets: InfiWallet[] = []

    onMount(async () => {
        wallets = await getAllWallets()

        if (wallets.length === 0) {
            restartExtension()
            return
        }

        selectedWallet = $activeWallet.wallet
    })

    const newWallet = () => {
        openOptionsPage(navRoutes.WalletActionRoute, true)
    }

    const useWallet = (wallet: InfiWallet) => {
        if (wallet.id !== selectedWallet.id) {
            activeWallet.loadWallet(wallet.id)
        }

        switch (wallet.blockchain) {
            case chains.celo:
                push(navRoutes.CeloIndexRoute)
                break
        }
    }

    const editWallet = (wallet: InfiWallet) => {
        selectedWallet = wallet
        showEditWalletModal = true
    }

    const editWalletInfoSuccess = async () => {
        showEditWalletModal = false
        wallets = await getAllWallets()
    }

    const confirmDeleteWallet = (wallet: InfiWallet) => {
        selectedWallet = wallet
        showDeleteWalletModal = true
    }

    const deleteWalletAction = async () => {
        showDeleteWalletModal = false
        uiState.setBusy(true)
        const success = await deleteWallet(selectedWallet.id)
        if (success) {
            wallets = await getAllWallets()

            if (wallets.length === 0) {
                activeWallet.unloadWallet()
                await settings.removeActiveWallet()
                uiState.setBusy(false)
                restartExtension()
            } else {
                if ($settings.activeWalletId === selectedWallet.id) {
                    activeWallet.unloadWallet()
                    await settings.removeActiveWallet()
                }
            }
        }

        uiState.setBusy(false)
    }

    const passwordChangedAction = async () => {
        showEditWalletModal = false
        activeWallet.unloadWallet()
        await settings.removeActiveWallet()
        wallets = await getAllWallets()
    }

    const getLogoUrl = (chain: string) => {
        switch (chain) {
            case chains.celo:
                return '/images/logos/celo.png'

            case chains.eth:
                return '/images/logos/eth.png'
        }
    }

</script>

<div
    class="h-full mx-auto shadow-md {popupOpen
        ? 'fixed-container'
        : 'max-w-3xl sm:mt-4'}">
    <header class="bg-gray-800" style="height: 55px;">
        <div class="mx-auto px-2">
            <div class="relative py-2 flex justify-between items-center">
                <!-- Logo -->
                <div class="relative z-10 px-2 flex">
                    <div class="flex-shrink-0 flex items-center">
                        <img
                            class="block h-10 w-auto"
                            src="/images/icon-48x48.png"
                            alt="Infibridge logo" />
                    </div>
                </div>

                <div
                    class="relative flex-1 px-2 mx-2 flex items-center justify-center">
                    <span
                        class="bg-gray-800 flex-shrink-0 p-1 text-gray-200 text-sm font-medium uppercase hover:text-white">
                        {$_('MyWallets')}
                    </span>
                </div>

                <button
                    on:click={() => newWallet()}
                    use:tooltip={{ content: $_('CreateNewWalletTip') }}
                    type="button"
                    class="inline-flex items-center p-1 mr-3 border border-transparent rounded-full text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true">
                        <path
                            fill-rule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    </header>

    <ul class="divide-y divide-gray-200">
        {#each wallets as wallet}
            <li
                on:click|stopPropagation={() => useWallet(wallet)}
                class="flex flex-row items-center px-4 py-4 cursor-pointer {wallet.id ===
                $activeWallet.wallet.id
                    ? 'bg-blue-100 hover:bg-blue-200'
                    : 'hover:bg-gray-100'}">
                <div
                    on:click|stopPropagation={() => useWallet(wallet)}
                    class="flex-grow flex flex-row">
                    <span class="flex items-center">
                        <img
                            class="h-8 w-8"
                            src={getLogoUrl(wallet.blockchain)}
                            alt={wallet.blockchain} />
                        <p class="list-item-title ml-4 flex items-center">
                            {wallet.nickName}
                            {#if wallet.id === $activeWallet.wallet.id && $activeWallet.isUnlocked}
                                <span class="ml-2 text-gray-500">
                                    <svg
                                        use:tooltip={{
                                            content: $_('WalletIsUnlocked'),
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                    </svg>
                                </span>
                            {/if}
                        </p>
                    </span>
                </div>

                <div class="flex-none flex flex-row space-x-2">
                    <!-- Delete button -->
                    <button
                        use:tooltip={{ content: $_('DeleteWalletTip') }}
                        on:click|stopPropagation={() =>
                            confirmDeleteWallet(wallet)}
                        class="rounded-sm text-gray-500 hover:text-gray-900 p-1 hover:bg-gray-400 focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>

                    <!-- Edit button -->
                    <button
                        use:tooltip={{ content: $_('EditWalletMsg') }}
                        on:click|stopPropagation={() => editWallet(wallet)}
                        class="rounded-sm flex items-center text-gray-500 hover:text-gray-900 p-1 hover:bg-gray-400 focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path
                                fill-rule="evenodd"
                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </li>
        {/each}
    </ul>

    {#if showEditWalletModal}
        <EditWalletModal
            wallet={selectedWallet}
            on:closeModal={() => (showEditWalletModal = false)}
            on:success={async () => await editWalletInfoSuccess()}
            on:passwordChanged={async () => await passwordChangedAction()} />
    {/if}

    {#if showDeleteWalletModal}
        <DeleteWalletModal
            wallet={selectedWallet}
            on:closeModal={() => (showDeleteWalletModal = false)}
            on:confirmAction={async () => await deleteWalletAction()} />
    {/if}
</div>
