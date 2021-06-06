<script lang="ts">
    import { push } from 'svelte-spa-router'
    import { _ } from 'svelte-i18n'
    import { onMount } from 'svelte'
    import BackButton from '../../../components/elements/BackButton.svelte'
    import NoAccHeaderLayout from '../../../layouts/NoAccHeaderLayout.svelte'
    import { activeWallet } from '../../../stores/index'
    import type Account from '../../../models/account'
    import TokensDropdown from '../../../components/elements/transact/TokensDropdown.svelte'
    import SendAmountInput from '../../../components/elements/transact/SendAmountInput.svelte'
    import GasPriceInput from '../../../components/elements/transact/GasPriceInput.svelte'
    import { navRoutes } from '../../../constants/navRoutes'
    import { CeloProvider } from '../../../libs/celo/EthersJSWrapper/CeloProvider'
    import { CeloEthersWallet } from '../../../libs/celo/EthersJSWrapper/CeloEthersWallet'
    import { utils } from 'ethers'
    import type { CeloTransactionRequest } from '../../../libs/celo/EthersJSWrapper/CeloTransactionsWrapper'

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

    const sendTransaction = async () => {
        // test with baklava
        const provider = new CeloProvider(
            'https://baklava-forno.celo-testnet.org'
        )
        await provider.ready

        // // Baklava validator accout
        const from = 'FROM_ADDRESS'
        const wallet = new CeloEthersWallet(
            'PRIVATE_KEY',
            provider
        )

        // const balance = await wallet.getBalance()
        // console.log(`Balance: ${balance}`)

        const amountToSend = utils.parseEther('1')
        console.log(`Amount to send (in wei): ${amountToSend}`)
        const amountInHex = amountToSend.toHexString()
        console.log(`Amount to send (hex): ${amountInHex}`)

        const gasPrice = await wallet.getGasPrice()
        console.log(`Gas price: ${gasPrice}`)

        const txCount = await provider.getTransactionCount(from)
        console.log(`Tx count (for nonce): ${txCount}`)

        // const transactionRequest = <CeloTransactionRequest>{
        //     chainId: 62320,
        //     from: from,
        //     to: 'TO_ADDRESS',
        //     value: amountToSend.toHexString(),
        //     nonce: utils.hexlify(txCount),
        //     gasPrice: gasPrice,
        // }

        // const estimatedGas = await wallet.estimateGas(transactionRequest)
        // console.log(`Estimated gas: ${estimatedGas}`)
        // transactionRequest.gasLimit = estimatedGas

        // const signed = await wallet.signTransaction(transactionRequest)
        // console.log(`Signed transaction: ${signed}`)

        // // Send to validator group account
        // const txResponse = await wallet.sendTransaction(transactionRequest)

        // const txReceipt = await txResponse.wait()
        // console.log(`Transaction hash: ${txReceipt.transactionHash}`)
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

        <div class="w-full px-2">
            <div
                class="w-full space-y-8 divide-y divide-gray-200 overflow-y-auto px-2">
                <div class="w-full space-y-4">
                    <div class="grid grid-cols-4 gap-4 items-start">
                        <span
                            class="block text-sm font-medium text-gray-700 pt-2">
                            Token
                        </span>
                        <div class="col-span-3">
                            <TokensDropdown
                                on:tokenChanged={e =>
                                    onTokenChanged(e.detail)} />
                        </div>
                    </div>

                    <div class="grid grid-cols-4 gap-4 items-start">
                        <span
                            class="block text-sm font-medium text-gray-700 pt-2">
                            Amount
                        </span>
                        <div class="col-span-3">
                            <SendAmountInput
                                selectedCurrency={selectedToken}
                                on:currencyChanged={e =>
                                    onCurrencyChanged(e.detail)} />
                        </div>
                    </div>

                    <div class="grid grid-cols-4 gap-4 items-center">
                        <span class="block text-sm font-medium text-gray-700">
                            Gas
                        </span>
                        <div class="col-span-3">
                            <GasPriceInput />
                        </div>
                    </div>

                    <div class="grid grid-cols-4 gap-4 items-center">
                        <span class="block text-sm font-medium text-gray-700">
                            Tx Fee
                        </span>
                        <div class="col-span-3 text-sm text-gray-800">
                            <span class="font-bold">0.000031 Celo</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-4 gap-4 items-center">
                        <span class="block text-sm font-medium text-gray-700">
                            Total
                        </span>
                        <div class="col-span-3 text-sm text-gray-800">
                            <span class="font-bold">0.000031 Celo</span>
                        </div>
                    </div>
                </div>

                <div class="py-6">
                    <div class="flex justify-center">
                        <button
                            on:click={() => push(navRoutes.CeloIndexRoute)}
                            type="button"
                            class="secondary-btn mr-2">
                            Cancel
                        </button>
                        <button
                            on:click={() => sendTransaction()}
                            type="button"
                            class="primary-btn ml-2">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</NoAccHeaderLayout>
