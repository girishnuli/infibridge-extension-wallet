<script lang="ts">
    import FullLogo from '../components/elements/FullLogo.svelte'
    import BusyModal from '../components/modals/BusyModal.svelte'
    import { uiState } from '../stores'

    export let isLogoCentered = false
    export let isWidthConstrained = false
</script>

<div class="h-full mx-auto max-w-3xl mb-6">
    <div class="flex mx-auto {isWidthConstrained ? 'w-4/6' : ''}">
        <div class="flex-1 flex flex-col justify-center pt-6 px-4 px-6">
            <div class="mx-auto w-full">
                <FullLogo centered={isLogoCentered} heightClass="h-12" />
                <slot name="header-title" />
            </div>

            <slot />
        </div>

        <slot name="right-col" />
    </div>

    {#if $uiState.isAppBusy}
        <BusyModal />
    {/if}
</div>
