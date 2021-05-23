<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { isPopupOpen } from '../services/chromeApi'
    import { uiState } from '../stores'
    import UnlockWalletModal from '../components/modals/wallets/UnlockWalletModal.svelte'
    import BusyModal from '../components/modals/BusyModal.svelte'
    import BackButton from '../components/elements/BackButton.svelte'

    const popupOpen = isPopupOpen()

    export let title = ''
    export let searchPlatceholderText = $_('Search')
    export let showSearch = true
</script>

<div
    class="mx-auto shadow-md {popupOpen
        ? 'fixed-container'
        : 'h-full max-w-3xl sm:mt-4'}">
    <div
        class="flex flex-col w-full {popupOpen ? '' : 'pb-4'}"
        style={popupOpen ? 'height: 544px;' : 'height: 800px;'}>
        <div class="bg-gray-800">
            <nav>
                <div class="max-w-3xl mx-auto px-2">
                    <div
                        class="relative flex items-center {showSearch
                            ? 'justify-between'
                            : ''}"
                        style="height: 55px;">
                        <div class="px-2 flex items-center">
                            <div class="flex-shrink-0">
                                <img
                                    class="block h-10 w-auto"
                                    src="/images/icon-48x48.png"
                                    alt="Infibridge logo" />
                            </div>
                        </div>
                        <div class="block ml-4">
                            <div class="flex">
                                <span class="text-sm font-medium text-white">
                                    {title.toLocaleUpperCase()}
                                </span>
                            </div>
                        </div>
                        {#if showSearch}
                            <div class="flex-1 px-2 flex ml-6 justify-end">
                                <div class="w-full max-w-xs">
                                    <label for="search" class="sr-only"
                                        >Search</label>
                                    <div
                                        class="relative text-light-blue-100 focus-within:text-gray-400">
                                        <div
                                            class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <svg
                                                class="flex-shrink-0 h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <input
                                            id="search"
                                            name="search"
                                            class="block w-full py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 focus:outline-none focus:bg-white focus:ring-white focus:border-white focus:placeholder-gray-500 focus:text-gray-900 text-sm"
                                            placeholder={searchPlatceholderText}
                                            type="search" />
                                    </div>
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
            </nav>
        </div>

        <div class="py-2 pl-2 w-full bg-gray-200">
            <BackButton />
        </div>

        <slot />
    </div>

    {#if $uiState.showUnlockWalletModal}
        <UnlockWalletModal />
    {/if}

    {#if $uiState.isAppBusy}
        <BusyModal />
    {/if}
</div>
