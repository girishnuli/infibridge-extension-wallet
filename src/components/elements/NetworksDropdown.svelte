<script lang="ts">
    import { fade } from 'svelte/transition'
    import { cubicIn, cubicOut } from 'svelte/easing'
    import { clickOutside } from '../../utils/ui'
    import { activeWallet, settings } from '../../stores'
    import Blockchain from '../../models/blockchain'
    import { chains } from '../../constants/constStrings'

    let isDropdownOpen = false
    const activeBlockchain = Blockchain.list().filter(
        x => x.name === $settings.activeBlockchainName
    )[0]
    const networks = activeBlockchain.networks
    $: activeNetwork = networks.filter(
        x => x.networkId === $settings.activeNetworkId
    )[0]

    async function networkChanged(networkId: number) {
        if (networkId === activeNetwork.networkId) {
            isDropdownOpen = false
            return
        }

        const newNetwork = activeBlockchain.networks.find(
            x => x.networkId == networkId
        )

        if (newNetwork) {
            isDropdownOpen = false
            await settings.changeNetwork(newNetwork)
            switch (activeBlockchain.name) {
                case chains.celo:
                    await activeWallet.refreshCeloBalance(
                        $activeWallet.activeAccount,
                        newNetwork.networkId
                    )
            }
        }
    }

</script>

<div
    class="z-10 relative w-full ml-1"
    use:clickOutside={{
        enabled: isDropdownOpen,
        cb: () => (isDropdownOpen = false),
    }}>
    <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        class="bg-gray-600 relative w-full rounded-sm pl-3 pr-10 py-1 text-left cursor-default text-base"
        on:click={() => (isDropdownOpen = !isDropdownOpen)}>
        <span class="block truncate text-white">
            {activeNetwork.name}
        </span>
        <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <!-- Heroicon name: solid/selector -->
            <svg
                class="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
            </svg>
        </span>
    </button>

    {#if isDropdownOpen}
        <div
            in:fade={{ duration: 100, easing: cubicIn }}
            out:fade={{ duration: 100, easing: cubicOut }}
            class="absolute mt-1 w-full menu-bgnd">
            <ul
                tabindex="-1"
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-item-3"
                class="max-h-60 rounded-sm py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {#each networks as network}
                    <li
                        id="listbox-item-0"
                        role="option"
                        class="network-dd-item"
                        on:click={() => networkChanged(network.networkId)}>
                        <div class="flex items-center">
                            <span
                                class="{network.id === activeNetwork.id
                                    ? 'font-semibold'
                                    : 'font-normal'} ml-3 block">
                                {network.name}
                            </span>
                        </div>

                        <!--
                            Checkmark, only display for selected option.
                        -->
                        {#if network.id === activeNetwork.id}
                            <span
                                class="absolute inset-y-0 right-0 flex items-center pr-4">
                                <!-- Heroicon name: solid/check -->
                                <svg
                                    class="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true">
                                    <path
                                        fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>
                        {/if}
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>
