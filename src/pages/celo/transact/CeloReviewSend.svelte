<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { onMount } from 'svelte'
    import BackButton from '../../../components/elements/BackButton.svelte'
    import NoAccHeaderLayout from '../../../layouts/NoAccHeaderLayout.svelte'
    import { activeWallet } from '../../../stores/index'
    import type Account from '../../../models/account'
    import TokensDropdown from '../../../components/elements/transact/TokensDropdown.svelte'
    import SendAmountInput from '../../../components/elements/transact/SendAmountInput.svelte'

    export let params: any = {}
    let address = ''
    let savedAccount: Account | undefined
    let selectedToken = ''
    let selectedCurrency = ''

    onMount(() => {
        address = params.address
        savedAccount = $activeWallet.wallet.accounts.find(
            x => x.address === address
        )
    })

    const onTokenChanged = (token: string) => {
        selectedToken = token
    }

    const onCurrencyChanged = (currency: string) => {
        selectedCurrency = currency
    }
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
                    <span class="text-gray-600 block text-sm">
                        From {$activeWallet.activeAccount.nickName}
                    </span>
                    <span class="text-blue-500 block text-sm break-all">
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
                    <span class="text-blue-500 block text-sm break-all">
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
                            <TokensDropdown
                                on:tokenChanged={e =>
                                    onTokenChanged(e.detail)} />
                        </div>
                    </div>

                    <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <span
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-1">
                            Amount
                        </span>
                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <SendAmountInput
                                selectedCurrency={selectedToken}
                                on:currencyChanged={e =>
                                    onCurrencyChanged(e.detail)} />
                        </div>
                    </div>

                    <div
                        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <span
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-1">
                            Transaction Fees
                        </span>
                        <div
                            class="mt-1 sm:mt-0 sm:col-span-2 text-sm text-gray-800">
                            <span>0.18 Celo</span>
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
