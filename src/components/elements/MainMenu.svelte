<script lang="ts">
    import { push } from 'svelte-spa-router'
    import { fade } from 'svelte/transition'
    import { cubicIn, cubicOut } from 'svelte/easing'
    import { _ } from 'svelte-i18n'
    import { clickOutside } from '../../utils/ui'
    import { activeWallet } from '../../stores/index'
    import { isPopupOpen, openOptionsPage } from '../../services/chromeApi'
    import { navRoutes } from '../../constants/navRoutes'

    let isMenuOpen = false
    const isInPopup = isPopupOpen()

    const openInNewTab = async () => {
        await openOptionsPage('/', false)
    }

    const navigateToMyWallets = () => {
        push(navRoutes.MyWalletsRoute)
    }

    const logout = () => {
        activeWallet.unloadWallet()
        navigateToMyWallets()
    }

</script>

<div
    class="relative z-10 flex items-center"
    use:clickOutside={{ enabled: isMenuOpen, cb: () => (isMenuOpen = false) }}>
    <div class="flex-shrink-0 relative">
        <div>
            <button
                type="button"
                class="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                on:click={() => (isMenuOpen = !isMenuOpen)}>
                <svg
                    class="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>

        {#if isMenuOpen}
            <div
                on:click={() => (isMenuOpen = false)}
                in:fade={{ duration: 100, easing: cubicIn }}
                out:fade={{ duration: 100, easing: cubicOut }}
                class="menu-bgnd origin-top-right absolute right-0 mt-2 w-64 ring-1 ring-black ring-opacity-5 py-1 divide-y divide-gray-800"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu">
                {#if isInPopup}
                    <div class="py-1">
                        <a
                            on:click|preventDefault={() => openInNewTab()}
                            href="/"
                            class="menu-item"
                            role="menuitem">
                            <svg
                                class="menu-item-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    stroke="#ccc"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 8V4m0 0h4M3 4l4 4m8 0V4m0 0h-4m4 0l-4 4m-8 4v4m0 0h4m-4 0l4-4m8 4l-4-4m4 4v-4m0 4h-4" />
                            </svg>
                            {$_('OpenInNewTab')}
                        </a>
                    </div>
                {/if}
                <div class="py-1">
                    <a
                        on:click|preventDefault={() => navigateToMyWallets()}
                        href="/"
                        class="menu-item"
                        role="menuitem">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="menu-item-icon"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                        {$_('MyWallets')}
                    </a>
                    <a
                        on:click|preventDefault
                        href="/"
                        class="menu-item"
                        role="menuitem">
                        <svg
                            class="menu-item-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                clip-rule="evenodd" />
                        </svg>
                        {$_('Settings')}
                    </a>
                    <a
                        on:click|preventDefault
                        href="/"
                        class="menu-item"
                        role="menuitem">
                        <svg
                            class="menu-item-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path d="M13 7H7v6h6V7z" />
                            <path
                                fill-rule="evenodd"
                                d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
                                clip-rule="evenodd" />
                        </svg>
                        {$_('ConnectHardwareWallet')}
                    </a>
                </div>
                <div class="py-1">
                    <a
                        on:click|preventDefault
                        href="/"
                        class="menu-item"
                        role="menuitem">
                        <svg
                            class="menu-item-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                clip-rule="evenodd" />
                        </svg>
                        {$_('Documentation')}
                    </a>
                </div>
                <a
                    on:click|preventDefault={() => logout()}
                    href="/"
                    class="menu-item"
                    role="menuitem">
                    <svg
                        class="menu-item-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                            clip-rule="evenodd" />
                    </svg>
                    {$_('Logout')}
                </a>
            </div>
        {/if}
    </div>
</div>
