<script lang="ts">
    import { BigNumber as BN } from 'bignumber.js'
    import { createEventDispatcher } from 'svelte'
    import { eventTypes } from '../../../constants/eventTypes'

    const dispatch = createEventDispatcher()

    // TODO: Load all the currencies of the selected chain, plus fiat (USD, EUR etc)
    let currencies = ['USD', 'EUR', 'Celo', 'cUSD', 'cEUR']
    export let selectedCurrency = currencies[0]

    let amount = '0.00'
    let amountError = false

    const cUSDPriceInUSD = 1
    const cEURPriceInUSD = 1.22
    const celoPriceInUSD = 5.0

    let total: BN = new BN(0.0)
    let totalDisplay = `0 USD`
    let conversionRate = `1 ${selectedCurrency} = ${celoPriceInUSD} USD`

    const currencyChanged = (e: any) => {
        const currency = e.target.value
        dispatch(eventTypes.currencyChanged, currency)
    }

    const amountChanged = () => {
        try {
            if (!amount) {
                amountError = false
                updateDisplayAmount(new BN(0))
                dispatch(eventTypes.amountChanged, '0.0')
                return
            }

            const amountBN = new BN(amount)
            if (amountBN.isZero() || amountBN.isPositive()) {
                amountError = false
                updateDisplayAmount(amountBN)
                dispatch(eventTypes.amountChanged, amount)
                return
            }

            amountError = true
        } catch (error) {
            amountError = true
        }
    }

    const updateDisplayAmount = (amountBN: BN) => {
        switch (selectedCurrency) {
            case 'Celo':
                total = amountBN.multipliedBy(celoPriceInUSD)
                break

            case 'cUSD':
                total = amountBN.multipliedBy(cUSDPriceInUSD)
                break

            case 'cEUR':
                total = amountBN.multipliedBy(cEURPriceInUSD)
                break
        }
    }
</script>

<div class="relative w-full flex flex-col">
    <div class="w-full flex items-center">
        <input
            type="text"
            bind:value={amount}
            on:input={() => amountChanged()}
            class="block w-full text-sm font-bold border-gray-300 rounded-md"
            placeholder="0.00" />
        <div class="absolute right-0 flex items-center">
            <select
                bind:value={selectedCurrency}
                on:blur={e => currencyChanged(e)}
                class="h-full py-2 pl-2 pr-7 border-transparent bg-transparent text-gray-500 text-sm rounded-md">
                {#each currencies as currency}
                    <option>{currency}</option>
                {/each}
            </select>
        </div>
        <div class="absolute right-20 flex items-center">
            <button
                type="button"
                class="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded text-blue-500 bg-blue-100 hover:bg-blue-800 hover:text-white focus:outline-none">
                MAX
            </button>
        </div>
    </div>
    {#if amountError}
        <span class="block error p-2">Invalid amount.</span>
    {/if}

    <div
        class="px-2 pt-2 flex items-center justify-between text-xs text-gray-600 font-medium">
        <p>&asymp; {totalDisplay}</p>
        <!-- <p>{conversionRate}</p> -->
    </div>
</div>
