<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { onMount } from 'svelte'
    import BackButton from '../../../components/elements/BackButton.svelte'
    import NoAccHeaderLayout from '../../../layouts/NoAccHeaderLayout.svelte'
    import { activeWallet } from '../../../stores/index'
    import type Account from '../../../models/account'

    export let params: any = {}
    let address = ''
    let savedAccount: Account | undefined

    onMount(() => {
        address = params.address
        savedAccount = $activeWallet.wallet.accounts.find(
            x => x.address === address
        )
    })

</script>

<NoAccHeaderLayout>
    <div class="py-2 pl-4 w-full bg-gray-200 flex justify-between items-center">
        <BackButton />
        <p class="label pr-4 font-bold">
            {$_('Send').toLocaleUpperCase()}
        </p>
    </div>

    <div class="w-full h-full flex flex-col">
        <div class="-space-y-px p-4">
            <div
                class="border-gray-200 rounded-tl-md rounded-tr-md relative border p-2 flex">
                <div class="flex flex-col">
                    <span class="text-gray-500 block text-sm">
                        From {$activeWallet.activeAccount.nickName}
                    </span>
                    <span class="text-blue-500 block text-sm">
                        {$activeWallet.activeAccount.address}
                    </span>
                </div>
            </div>

            <div
                class="border-gray-200 rounded-bl-md rounded-br-md relative border p-2 flex">
                <div class="flex flex-col">
                    <span class="text-gray-500 block text-sm">
                        To
                        {#if savedAccount}
                            {savedAccount.nickName}
                        {/if}
                    </span>
                    <span class="text-blue-500 block text-sm">
                        {address}
                    </span>
                </div>
            </div>
        </div>
    </div>
</NoAccHeaderLayout>
