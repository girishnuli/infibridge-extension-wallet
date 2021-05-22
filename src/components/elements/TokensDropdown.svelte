<script lang="ts">
    import { fade } from 'svelte/transition'
    import { cubicIn, cubicOut } from 'svelte/easing'
    import { clickOutside } from '../../utils/ui'

    let isDropdownOpen = false

    const tokens = [
        {
            id: 0,
            name: 'Celo',
            balance: 3000,
            isSelected: true,
        },
        {
            id: 1,
            name: 'cUSD',
            balance: 20000,
            isSelected: false,
        },
        {
            id: 2,
            name: 'cEUR',
            balance: 0,
            isSelected: false,
        },
    ]

    let selectedToken = tokens[0]

    function tokenChanged(tokenId: number) {
        isDropdownOpen = false
        selectedToken = tokens.filter(x => x.id === tokenId)[0]
    }

</script>

<div
    class="relative w-full"
    use:clickOutside={{
        enabled: isDropdownOpen,
        cb: () => (isDropdownOpen = false),
    }}>
    <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        class="relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default text-sm"
        on:click={() => (isDropdownOpen = !isDropdownOpen)}>
        <p class="flex items-center">
            <span>
                {selectedToken.name}
            </span>
            <span class="ml-2">
                {`(Balance: ${selectedToken.balance})`}
            </span>
        </p>
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
            class="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md  border border-gray-300 py-1 overflow-auto focus:outline-none text-sm">
            <ul
                tabindex="-1"
                class="max-h-60 py-1 overflow-auto focus:outline-none text-sm">
                {#each tokens as token}
                    <li
                        id="listbox-item-0"
                        role="option"
                        class="cursor-default select-none relative py-2 pl-3 pr-9 hover-base text-gray-800"
                        on:click={() => tokenChanged(token.id)}>
                        <p class="flex items-center">
                            <span
                                class="{token.id === selectedToken.id
                                    ? 'font-semibold'
                                    : 'font-normal'} ml-3 block">
                                {token.name}
                            </span>
                            <span
                                class="ml-2 {token.id === selectedToken.id
                                    ? 'font-semibold'
                                    : 'font-normal'}">
                                {`(Balance: ${token.balance})`}
                            </span>
                        </p>

                        <!--
                            Checkmark, only display for selected option.
                        -->
                        {#if token.id === selectedToken.id}
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
