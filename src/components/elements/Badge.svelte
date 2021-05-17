<script lang="ts">
    import { fade } from 'svelte/transition'
    import { cubicIn, cubicOut } from 'svelte/easing'
    import { Colors } from '../../models/enums/colors'

    export let bgndColor: Colors = Colors.Gray
    export let textColor: Colors = Colors.Gray
    export let badgeText: string = 'badge'
    export let useFade = false

    const isWhiteOrBlack =
        textColor === Colors.White || textColor === Colors.Black
</script>

{#if useFade}
    <span
        in:fade={{ duration: 300, easing: cubicIn }}
        out:fade={{ duration: 300, easing: cubicOut }}
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
        {isWhiteOrBlack
            ? `bg-${bgndColor.toString()}`
            : `bg-${bgndColor.toString()}-200`} 
            
        {isWhiteOrBlack
            ? `text-${textColor.toString()}`
            : `text-${textColor.toString()}-800`}">
        {badgeText}
    </span>
{:else}
    <span
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
        {isWhiteOrBlack
            ? `bg-${bgndColor.toString()}`
            : `bg-${bgndColor.toString()}-200`} 
            
        {isWhiteOrBlack
            ? `text-${textColor.toString()}`
            : `text-${textColor.toString()}-800`}">
        {badgeText}
    </span>
{/if}
