<script lang="ts">
    import { fade, scale } from 'svelte/transition'
    import { cubicIn, cubicOut } from 'svelte/easing'
    import BusyIndicator from './BusyIndicator.svelte'
    const width = 96
    const height = 96

</script>

<div
    class="fixed z-50 inset-0 overflow-y-auto"
    aria-labelledby="busy-modal"
    role="dialog"
    aria-modal="true">
    <div class="flex items-center justify-center min-h-screen text-center">
        <div
            in:fade={{ duration: 300, easing: cubicOut }}
            out:fade={{ duration: 300, easing: cubicIn }}
            class="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity"
            aria-hidden="true" />

        <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">&#8203;</span>

        <div
            in:scale={{ duration: 150, start: 0.95, easing: cubicOut }}
            out:scale={{ duration: 100, start: 0.95, easing: cubicIn }}
            class="inline-block overflow-hidden transform transition-all">
            <BusyIndicator {width} {height} />
        </div>
    </div>
</div>
