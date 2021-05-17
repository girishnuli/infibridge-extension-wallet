<script lang="ts">
    import { pop } from 'svelte-spa-router'
    import { _ } from 'svelte-i18n'

    export let useContainer = false
    export let textSize = 'text-base'
    export let fontWeight = 'font-medium'
    const baseClasses =
        'relative inline-flex items-center text-gray-500 hover:text-blue-500 focus:z-10'

    const backText = $_('Back')
</script>

{#if useContainer}
    <div class="bg-gray-100">
        <span class="relative z-0 inline-flex">
            <button
                type="button"
                class="{baseClasses} {textSize} {fontWeight}"
                on:click={() => pop()}>
                <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
                {backText}
            </button>
        </span>
    </div>
{:else}
    <button
        type="button"
        class="{baseClasses} {textSize} {fontWeight}"
        on:click={() => pop()}>
        <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd" />
        </svg>
        {backText}
    </button>
{/if}
