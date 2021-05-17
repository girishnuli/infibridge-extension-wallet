<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { fade } from 'svelte/transition'
    import { cubicIn, cubicOut } from 'svelte/easing'
    import AccountMenu from './AccountMenu.svelte'
    import { getTrimmedAddress } from '../../utils/wallet/accountUtil'
    import { activeWallet, settings, uiState } from '../../stores'
    import { copyTextToClipboard, openUrlInNewTab } from '../../utils/ui'
    import Blockchain from '../../models/blockchain'

    // $: isAccountConnected = true
    let showCopiedText = false

    function copyAddress() {
        const success = copyTextToClipboard($activeWallet.activeAccount.address)
        if (success) {
            showCopiedText = true
            setTimeout(() => {
                showCopiedText = false
            }, 2000)
        }
    }

    function openAddressInCeloExplorer() {
        const activeNetwork = Blockchain.list()
            .filter(x => x.name === $settings.activeBlockchainName)[0]
            .networks.filter(x => x.networkId === $settings.activeNetworkId)[0]

        openUrlInNewTab(
            `${activeNetwork.networkExplorerUrl}/address/${$activeWallet.activeAccount.address}/transactions`
        )
    }

</script>

<div class="flex flex-row items-center px-2 py-2">
    <div class="flex-grow flex flex-col">
        <h3 class="flex items-center">
            <span
                class="inline-flex items-center text-base text-gray-800 font-medium">
                {$activeWallet.activeAccount.nickName}
                <span
                    class="ml-1 inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-600">
                    {$activeWallet.wallet.nickName}&nbsp;{'>'}&nbsp;
                    {$activeWallet.activeAccount.group}
                </span>
            </span>

            <!-- <span class="ml-1 inline-flex items-center">
                {#if isAccountConnected}
                    <Badge
                        bgndColor={Colors.Green}
                        textColor={Colors.Green}
                        badgeText={$_('Connected')} />
                {:else}
                    <Badge
                        bgndColor={Colors.Gray}
                        textColor={Colors.Gray}
                        badgeText={$_('NotConnected')} />
                {/if}
            </span> -->
        </h3>
        <p class="block flex items-center text-sm text-gray-800">
            <span
                class="hover:bg-gray-800 hover:text-white"
                on:click={() => copyAddress()}>
                {getTrimmedAddress($activeWallet.activeAccount.address)}
            </span>
            {#if showCopiedText}
                <span
                    in:fade={{ duration: 300, easing: cubicIn }}
                    out:fade={{ duration: 300, easing: cubicOut }}
                    class="ml-2 text-xs text-blue-800">
                    {$_('Copied')}
                </span>
            {/if}
        </p>
    </div>

    <div class="flex-none flex flex-row">
        <!-- Open in explorer button -->
        <button
            on:click={() => openAddressInCeloExplorer()}
            class="rounded-sm text-gray-500 hover:text-gray-900 p-1 hover:bg-gray-400 focus:outline-none">
            <svg
                class="transaction-details-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                    d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path
                    d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
        </button>

        <!-- Account details button -->
        <button
            on:click={() => uiState.showAccountDetailsModal()}
            class="rounded-sm flex items-center text-gray-500 hover:text-gray-900 p-1 hover:bg-gray-400 focus:outline-none">
            <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                    fill-rule="evenodd"
                    d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z"
                    clip-rule="evenodd" />
                <path
                    d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z" />
            </svg>
        </button>

        <!-- Account menu button and dropdown list -->
        <AccountMenu />
    </div>
</div>
