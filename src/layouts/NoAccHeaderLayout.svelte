<script lang="ts">
    import { isPopupOpen } from '../services/chromeApi'
    import Header from '../components/elements/Header.svelte'
    import { uiState } from '../stores'
    import UnlockWalletModal from '../components/modals/wallets/UnlockWalletModal.svelte'
    import BusyModal from '../components/modals/BusyModal.svelte'

    const popupOpen = isPopupOpen()
</script>

<div
    class="mx-auto shadow-md {popupOpen
        ? 'fixed-container'
        : 'h-full max-w-3xl sm:mt-4'}">
    <Header />

    <div
        class="flex flex-col w-full {popupOpen ? '' : 'pb-4'}"
        style={popupOpen ? 'height: 544px;' : 'height: 800px;'}>
        <slot />
    </div>

    {#if $uiState.showUnlockWalletModal}
        <UnlockWalletModal />
    {/if}

    {#if $uiState.isAppBusy}
        <BusyModal />
    {/if}
</div>
