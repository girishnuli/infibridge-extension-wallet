<script lang="ts">
    import { onMount } from 'svelte'
    import BackButton from '../../../components/elements/BackButton.svelte'
    import NoAccHeaderLayout from '../../../layouts/NoAccHeaderLayout.svelte'

    export let params: any = {}
    let address = ''

    onMount(() => {
        address = params.address
    })

</script>

<NoAccHeaderLayout>
    <div class="py-2 pl-2 w-full bg-gray-200">
        <BackButton />
    </div>

    <div class="w-full h-full flex flex-col">
        <div class="flex-grow grid grid-cols-1 place-items-center">
            <p class="empty-content">{address}</p>
        </div>
    </div>
</NoAccHeaderLayout>
