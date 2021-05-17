<script lang="ts">
    import { fly } from 'svelte/transition'
    import BackButton from '../../../components/elements/BackButton.svelte'
</script>

<div transition:fly={{ duration: 300, x: 400, opacity: 0.5 }} class="w-full">
    <BackButton />

    <div class="w-full h-full flex flex-col">
        <div class="flex-grow grid grid-cols-1 place-items-center">
            <p class="empty-content">Wow, such empty!</p>
        </div>
    </div>
</div>
