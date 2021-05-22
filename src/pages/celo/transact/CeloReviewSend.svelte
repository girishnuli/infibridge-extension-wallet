<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { onMount } from 'svelte'
    import BackButton from '../../../components/elements/BackButton.svelte'
    import NoAccHeaderLayout from '../../../layouts/NoAccHeaderLayout.svelte'
    import { activeWallet, settings, uiState } from '../../../stores/index'
    import type Account from '../../../models/account'
    import tooltip from '../../../utils/tooltip'
    import TokensDropdown from '../../../components/elements/TokensDropdown.svelte'

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

<!-- li -->
<!-- Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
    Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
-->

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
                    <span class="text-gray-600 block text-sm">
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
                    <span class="text-gray-600 block text-sm">
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

        <div class="p-4">
            <div class="space-y-8 divide-y divide-gray-200 overflow-y-auto">
                <div class="space-y-6 sm:space-y-5">
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                        <span
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-1">
                            Token
                        </span>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <TokensDropdown />
                        </div>
                    </div>

                    <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                            for="about"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            About
                        </label>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <textarea
                                id="about"
                                name="about"
                                rows="3"
                                class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md" />
                            <p class="mt-2 text-sm text-gray-500">
                                Write a few sentences about yourself.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="pt-5">
                    <div class="flex justify-center">
                        <button
                            type="button"
                            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</NoAccHeaderLayout>
