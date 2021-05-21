<script lang="ts">
    import { push } from 'svelte-spa-router'
    import { _ } from 'svelte-i18n'
    import BackButton from '../../../components/elements/BackButton.svelte'
    import NoAccHeaderLayout from '../../../layouts/NoAccHeaderLayout.svelte'
    import { groupBy } from '../../../utils/generic/array'
    import { activeWallet } from '../../../stores/index'
    import { getTrimmedAddress } from '../../../utils/wallet/accountUtil'
    import { AccountType } from '../../../models/enums/accountType'
    import tooltip from '../../../utils/tooltip'
    import type Account from '../../../models/account'
    import { navRoutes } from '../../../constants/navRoutes'

    $: groupedAccounts = groupBy($activeWallet.wallet.accounts, x => x.group)

    let recipientAddress = ''
    let recipientAddressError = false

    const validateRecipientAddress = () => {
        // TODO: Validate EVM address here and in ImportEVMAccount modal
        recipientAddressError =
            !recipientAddress || recipientAddress.length < 42

        return !recipientAddressError
    }

    const sendToAddress = () => {
        if (validateRecipientAddress()) {
            reviewSend(recipientAddress)
        } else {
            recipientAddressError = true
        }
    }

    const accountSelected = (account: Account) => {
        reviewSend(account.address)
    }

    const reviewSend = (address: string) => {
        push(`${navRoutes.CeloReviewSendRoute}/${address}`)
    }

</script>

<NoAccHeaderLayout>
    <div class="w-full flex flex-col overflow-y-scroll">
        <div class="py-2 pl-2 w-full bg-gray-200">
            <BackButton />
        </div>

        <!-- Address input -->
        <div class="px-4 mt-4">
            <form on:submit|preventDefault={() => sendToAddress()}>
                <div class="mt-2 flex rounded-sm shadow-sm">
                    <div
                        class="relative flex items-stretch flex-grow focus-within:z-10">
                        <input
                            type="text"
                            name="address"
                            id="address"
                            bind:value={recipientAddress}
                            on:input={() => validateRecipientAddress()}
                            class="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-none rounded-l-sm pl-2 text-sm border-gray-300"
                            placeholder={$_('RecipientAddress')} />
                    </div>
                    <button
                        type="submit"
                        class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-sm text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                            <path
                                fill-rule="evenodd"
                                d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <p
                    class="{recipientAddressError
                        ? ''
                        : 'hidden'} mt-2 text-sm text-red-600">
                    {$_('AddressErrorMsg')}
                </p>
            </form>
        </div>

        <!-- OR -->
        <div class="mx-auto mt-8">
            <span
                class=" w-14 h-14 p-4 rounded-full text-base font-medium bg-gray-600 text-white">
                {$_('OR')}
            </span>
        </div>

        <!-- Select own address -->
        <div>
            <label
                for="own-accounts"
                class="block text-base font-semibold text-gray-600 pt-4 ml-6"
                >{$_('OwnAccounts').toLocaleUpperCase()}</label>
            <div class="mt-2">
                {#each Object.entries(groupedAccounts) as [group, accounts]}
                    <div
                        class="border-t border-b border-blue-200 bg-blue-50 px-6 py-1 text-sm font-medium text-blue-500">
                        <h3>{group}</h3>
                    </div>

                    <div class="">
                        {#each accounts as account}
                            {#if account.address !== $activeWallet.activeAccount.address}
                                <a
                                    on:click|preventDefault={() =>
                                        accountSelected(account)}
                                    href="/"
                                    class="account-item hover:bg-gray-100">
                                    <span class="account-seq">
                                        {#if account.accountType === AccountType.HD}
                                            <!-- Heroicon location-marker -->
                                            <svg
                                                use:tooltip={{
                                                    content: $_('HDAccountTip'),
                                                }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        {:else if account.accountType === AccountType.ImportedPvtKey}
                                            <!-- Heroicon key -->
                                            <svg
                                                use:tooltip={{
                                                    content:
                                                        $_('PvtKeyAccountTip'),
                                                }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        {:else if account.accountType === AccountType.ImportedKeystore}
                                            <svg
                                                use:tooltip={{
                                                    content:
                                                        $_(
                                                            'KeystoreAccountTip'
                                                        ),
                                                }}
                                                class="h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        {:else if account.accountType === AccountType.WatchAddress}
                                            <svg
                                                use:tooltip={{
                                                    content:
                                                        $_('WatchAddressTip'),
                                                }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        {/if}
                                    </span>
                                    <div
                                        class="ml-4 flex justify-between items-center w-full">
                                        <div class="py-1">
                                            <p
                                                class="account-title flex items-center">
                                                {account.nickName}
                                            </p>
                                            <p class="account-address">
                                                {getTrimmedAddress(
                                                    account.address
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            {/if}
                        {/each}
                    </div>
                {/each}

                <!-- <ul class="divide-y divide-gray-200 mx-4">
                    <li class="p-4 flex hover:bg-gray-200 cursor-pointer">
                        <span class="account-seq">1</span>
                        <div class="ml-3">
                            <p class="text-base font-medium text-gray-800">
                                Account 1
                                <span class="ml-1 italic text-blue-400"
                                    >800000000 celo</span>
                            </p>
                            <p class="text-xs text-gray-500">
                                0xe52B02c0c5CbDc5b59662d9c916c040F8E568857
                            </p>
                        </div>
                    </li>

                    <li class="py-4 px-4 flex hover:bg-gray-200 cursor-pointer">
                        <span class="account-seq">2</span>
                        <div class="ml-3">
                            <p class="text-base font-medium text-gray-900">
                                Account 2
                                <span class="ml-1 italic text-blue-400"
                                    >800000000 celo</span>
                            </p>
                            <p class="text-xs text-gray-500">
                                0xe52B02c0c5CbDc5b59662d9c916c040F8E568857
                            </p>
                        </div>
                    </li>

                    <li class="py-4 px-4 flex hover:bg-gray-200 cursor-pointer">
                        <span class="account-seq">3</span>
                        <div class="ml-3">
                            <p class="text-base font-medium text-gray-900">
                                Account 3
                                <span class="ml-1 italic text-blue-400"
                                    >800000000 celo</span>
                            </p>
                            <p class="text-xs text-gray-500">
                                0xe52B02c0c5CbDc5b59662d9c916c040F8E568857
                            </p>
                        </div>
                    </li>

                    <li class="py-4 px-4 flex hover:bg-gray-200 cursor-pointer">
                        <span class="account-seq">4</span>
                        <div class="ml-3">
                            <p class="text-base font-medium text-gray-900">
                                Account 4
                                <span class="ml-1 italic text-blue-400"
                                    >800000000 celo</span>
                            </p>
                            <p class="text-xs text-gray-500">
                                0xe52B02c0c5CbDc5b59662d9c916c040F8E568857
                            </p>
                        </div>
                    </li>

                    <li class="py-4 px-4 flex hover:bg-gray-200 cursor-pointer">
                        <span class="account-seq">5</span>
                        <div class="ml-3">
                            <p class="text-base font-medium text-gray-900">
                                Account 5
                                <span class="ml-1 italic text-blue-400"
                                    >800000000 celo</span>
                            </p>
                            <p class="text-xs text-gray-500">
                                0xe52B02c0c5CbDc5b59662d9c916c040F8E568857
                            </p>
                        </div>
                    </li>
                </ul> -->
            </div>
        </div>
    </div>
</NoAccHeaderLayout>
