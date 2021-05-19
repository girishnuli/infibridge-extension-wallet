<script lang="ts">
    import { isPopupOpen } from '../services/chromeApi'
    import Header from '../components/elements/Header.svelte'
    import AccountHeader from '../components/elements/AccountHeader.svelte'
    import { uiState } from '../stores'
    import AccountDetailsModal from '../components/modals/AccountDetailsModal.svelte'
    import UnlockWalletModal from '../components/modals/wallets/UnlockWalletModal.svelte'
    import ImportEVMAccountModal from '../components/modals/wallets/ImportEVMAccount.svelte'
    import BusyModal from '../components/modals/BusyModal.svelte'

    const popupOpen = isPopupOpen()

</script>

<div
    class="h-full mx-auto shadow-md {popupOpen
        ? 'fixed-container'
        : 'max-w-3xl sm:mt-4'}">
    <Header />

    <div
        class="flex flex-col w-full {popupOpen ? '' : 'pb-4'}"
        style={popupOpen ? 'height: 544px;' : 'height: 800px;'}>
        <div class="flex-none bg-gray-100">
            <AccountHeader />
        </div>

        <slot />
    </div>

    {#if $uiState.showAccountDetailsModal}
        <AccountDetailsModal />
    {/if}

    {#if $uiState.showImportEVMAccountModal}
        <ImportEVMAccountModal />
    {/if}

    {#if $uiState.showUnlockWalletModal}
        <UnlockWalletModal />
    {/if}

    {#if $uiState.isAppBusy}
        <BusyModal />
    {/if}
</div>
