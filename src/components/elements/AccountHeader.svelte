<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { fade } from 'svelte/transition'
    import { cubicIn, cubicOut } from 'svelte/easing'
    import AccountMenu from './AccountMenu.svelte'
    import { getTrimmedAddress } from '../../utils/wallet/accountUtil'
    import { activeWallet, settings, uiState } from '../../stores'
    import { copyTextToClipboard, openUrlInNewTab } from '../../utils/ui'
    import Blockchain from '../../models/blockchain'
    import tooltip from '../../utils/tooltip'

    // $: isAccountConnected = true
    let showCopiedText = false
    $: isTestNetwork = Blockchain.list()
        .filter(x => x.name === $settings.activeBlockchainName)[0]
        .networks.filter(x => x.networkId === $settings.activeNetworkId)[0]
        .name.includes('Testnet')

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
        <!-- Get test tokens -->
        {#if isTestNetwork}
            <button
                use:tooltip={{ content: $_('GetTestFunds') }}
                class="rounded-sm text-gray-500 hover:text-white p-1 hover:bg-gray-600 focus:outline-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    class="h-5 w-5"
                    viewBox="0 0 30 30"
                    fill="currentColor">
                    <path
                        d="M 18.316406 1.847656 C 15.175781 1.847656 12.605469 4.414062 12.605469 7.554688 C 12.605469 10.695312 15.175781 13.265625 18.316406 13.265625 C 21.457031 13.265625 24.027344 10.695312 24.027344 7.554688 C 24.027344 4.414062 21.457031 1.847656 18.316406 1.847656 Z M 18.316406 3.921875 C 20.335938 3.921875 21.949219 5.535156 21.949219 7.554688 C 21.949219 9.574219 20.335938 11.1875 18.316406 11.1875 C 16.296875 11.1875 14.683594 9.574219 14.683594 7.554688 C 14.683594 5.535156 16.296875 3.921875 18.316406 3.921875 Z M 9.984375 14.304688 C 6.667969 14.304688 2.269531 16.128906 2.269531 16.128906 L 3.03125 18.058594 C 3.03125 18.058594 7.503906 16.378906 9.984375 16.378906 C 10.988281 16.378906 12.703125 16.988281 14.101562 17.703125 C 14.804688 18.058594 15.433594 18.4375 15.898438 18.742188 C 16.128906 18.898438 16.320312 19.035156 16.445312 19.132812 C 16.457031 19.144531 16.457031 19.148438 16.46875 19.160156 C 16.519531 19.203125 16.566406 19.246094 16.605469 19.296875 L 16.667969 19.394531 C 16.800781 19.640625 16.796875 19.945312 16.621094 20.199219 C 16.417969 20.484375 16.0625 20.597656 15.730469 20.484375 L 11.214844 18.335938 L 10.320312 20.210938 L 14.984375 22.429688 L 15.035156 22.445312 C 15.992188 22.78125 16.960938 22.457031 17.714844 21.835938 L 18.007812 21.835938 L 18.316406 21.394531 L 18.320312 21.394531 C 18.730469 20.804688 18.878906 20.109375 18.800781 19.4375 L 23.757812 18.628906 C 24.308594 18.539062 24.828125 18.851562 25.007812 19.378906 C 25.191406 19.941406 24.9375 20.523438 24.398438 20.757812 C 22.878906 21.429688 20.402344 22.429688 18.207031 23.257812 C 17.105469 23.671875 16.074219 24.039062 15.269531 24.300781 C 14.867188 24.433594 14.523438 24.535156 14.269531 24.601562 C 14.011719 24.667969 13.796875 24.683594 13.902344 24.683594 C 13.964844 24.683594 13.535156 24.585938 13.046875 24.320312 C 12.554688 24.058594 11.960938 23.679688 11.347656 23.289062 C 10.734375 22.898438 10.101562 22.5 9.5 22.179688 C 8.894531 21.859375 8.359375 21.570312 7.625 21.570312 C 5.925781 21.570312 4.40625 22.226562 4.40625 22.226562 L 5.199219 24.148438 C 5.199219 24.148438 6.492188 23.648438 7.625 23.648438 C 7.597656 23.648438 8.03125 23.75 8.527344 24.011719 C 9.019531 24.273438 9.621094 24.652344 10.234375 25.042969 C 10.84375 25.429688 11.464844 25.832031 12.058594 26.152344 C 12.652344 26.472656 13.164062 26.761719 13.902344 26.761719 C 14.253906 26.761719 14.472656 26.695312 14.789062 26.609375 C 15.109375 26.527344 15.484375 26.414062 15.914062 26.273438 C 16.765625 25.996094 17.816406 25.621094 18.933594 25.199219 C 21.171875 24.359375 23.65625 23.355469 25.238281 22.660156 C 26.292969 22.195312 26.773438 21.175781 26.90625 20.089844 L 27.429688 20.089844 L 26.976562 18.726562 C 26.480469 17.242188 24.964844 16.328125 23.421875 16.582031 L 23.417969 16.582031 L 17.738281 17.507812 C 17.71875 17.492188 17.691406 17.476562 17.671875 17.460938 C 17.652344 17.445312 17.636719 17.429688 17.617188 17.414062 L 17.3125 17.195312 L 17.308594 17.199219 C 17.21875 17.136719 17.148438 17.082031 17.046875 17.015625 C 16.511719 16.65625 15.816406 16.246094 15.046875 15.851562 C 13.503906 15.0625 11.6875 14.304688 9.984375 14.304688 Z M 9.984375 14.304688 " />
                </svg>
            </button>
        {/if}

        <!-- Open in explorer button -->
        <button
            use:tooltip={{ content: $_('OpenInExplorer') }}
            on:click={() => openAddressInCeloExplorer()}
            class="rounded-sm text-gray-500 hover:text-white p-1 hover:bg-gray-600 focus:outline-none">
            <svg
                class="h-5 w-5"
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
            use:tooltip={{ content: $_('AccountDetails') }}
            on:click={() => uiState.showAccountDetailsModal()}
            class="rounded-sm flex items-center text-gray-500 hover:text-white p-1 hover:bg-gray-600 focus:outline-none">
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
