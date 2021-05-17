<script lang="ts">
    import NetworksDropdown from './NetworksDropdown.svelte'
    import MainMenu from './MainMenu.svelte'
    import { settings } from '../../stores'
</script>

<header class="bg-gray-800" style="height: 55px;">
    <div class="mx-auto px-2">
        <div class="relative py-2 flex justify-between">
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
                <!-- Blockchains button -->
                <button
                    class="bg-gray-800 flex-shrink-0 p-1 text-gray-200 text-sm font-medium uppercase hover:text-white">
                    {$settings.activeBlockchainName}
                </button>
                <!-- Networks dropdown -->
                <NetworksDropdown />
            </div>

            <!-- Main menu -->
            <MainMenu />
        </div>
    </div>
</header>
