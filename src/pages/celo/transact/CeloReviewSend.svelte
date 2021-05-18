<script lang="ts">
    import { fade } from 'svelte/transition'
    import BackButton from '../../../components/elements/BackButton.svelte'

</script>

<div transition:fade={{ duration: 150 }} class="w-full">
    <BackButton />

    <div class="w-full h-full flex flex-col">
        <div class="flex-grow grid grid-cols-1 place-items-center">
            <p class="empty-content">Wow, such empty!</p>
        </div>
    </div>
</div>
