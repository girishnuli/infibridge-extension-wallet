<script lang="ts">
    import { BigNumber as BN } from 'bignumber.js'
    import ErrorIcon from '../ErrorIcon.svelte'

    let gasPrice = 0.000031
    let gasPriceError = false
    let gasLimit = 21000
    let gasLimitError = false

    const gasPriceChanged = () => {
        try {
            if (!gasPrice) {
                gasPriceError = true
                return
            }

            const gasPriceBN = new BN(gasPrice)

            if (!gasPriceBN.isPositive()) {
                gasPriceError = true
                return
            }
            gasPriceError = false
        } catch (error) {
            gasPriceError = true
        }
    }

    const gasLimitChanged = () => {
        try {
            if (!gasLimit) {
                gasLimitError = true
                return
            }

            const gasLimitBN = new BN(gasLimit)

            if (!gasLimitBN.isPositive()) {
                gasLimitError = true
                return
            }
            gasLimitError = false
        } catch (error) {
            gasLimitError = true
        }
    }
</script>

<div class="relative w-full flex items-center justify-between">
    <div class="w-full relative flex rounded-md shadow-sm">
        <span class="grouped-textbox-label w-16"> Price </span>
        <input
            bind:value={gasPrice}
            on:input={() => gasPriceChanged()}
            type="text"
            class="grouped-textbox-input text-gray-700"
            required />
        <div class="absolute right-0 flex items-center">
            <select
                class="h-full py-2 pl-2 pr-7 border-transparent bg-transparent text-gray-500 text-sm rounded-md">
                <option>Celo</option>
                <option>cUSD</option>
                <option>cEUR</option>
            </select>
        </div>
    </div>

    <!-- <div class="ml-2 relative flex rounded-md shadow-sm">
        <span class="grouped-textbox-label w-16"> Limit </span>
        <input
            bind:value={gasLimit}
            on:input={() => gasLimitChanged()}
            type="text"
            class="grouped-textbox-input text-gray-700"
            required />
        {#if gasLimitError}
            <ErrorIcon />
        {/if}
    </div> -->
</div>
