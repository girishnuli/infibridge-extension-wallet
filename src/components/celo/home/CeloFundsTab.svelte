<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { activeWallet, settings, uiState } from '../../../stores/index'
    import { push } from 'svelte-spa-router'
    import tooltip from '../../../utils/tooltip'
    import { onMount } from 'svelte'
    import { chains } from '../../../constants/constStrings'
    import { navRoutes } from '../../../constants/navRoutes'

    const altCurrency = 'usd'

    onMount(async () => {
        switch ($activeWallet.wallet.blockchain) {
            case chains.celo:
                await activeWallet.refreshCeloBalance(
                    $activeWallet.activeAccount,
                    $settings.activeNetworkId
                )
        }
    })

    const send = () => {
        push(navRoutes.CeloSendAddressRoute)
    }

</script>

<div class="w-full flex flex-col">
    <div class="mt-8">
        <div class="flex flex-col items-center">
            <img
                style="height: 36px; width: 36px;"
                src="/images/logos/celo.png"
                alt="celo logo" />

            <p class="mt-1 flex items-center pb-2 pt-2">
                <span class="text-5xl font-medium"
                    >{$activeWallet.celoBalance.totalCelo}</span>
                <span class="text-base font-medium ml-1 text-gray-700"
                    >CELO</span>
            </p>
            <p class="mt-1 text-sm font-medium text-gray-500 italic">
                &asymp; {$activeWallet.celoBalance.totalValueInAltCurrency}
                {altCurrency.toUpperCase()}
            </p>

            <!-- Funds Breakdown -->
            <div class="px-0 mt-4 shadow rounded-md">
                <dl class="grid grid-cols-2 divide-gray-200 divide-x">
                    <div>
                        <div class="celo-fbd-container">
                            <dt class="celo-fbd-title">Celo</dt>
                            <dd class="mt-1 block flex flex-col">
                                <p class="celo-fbd-amount">
                                    {$activeWallet.celoBalance.CELO}
                                </p>
                            </dd>
                        </div>
                    </div>
                    <div>
                        <div class="celo-fbd-container">
                            <dt class="celo-fbd-title">Locked Celo</dt>
                            <dd class="mt-1 block flex">
                                <div class="celo-fbd-amount">
                                    {$activeWallet.celoBalance.lockedCELO}
                                </div>
                            </dd>
                        </div>
                    </div>
                </dl>

                <dl
                    class="grid grid-cols-2 border-t border-gray-200 divide-gray-200 divide-x">
                    <div>
                        <div class="celo-fbd-container">
                            <dt class="celo-fbd-title">cUSD</dt>
                            <dd class="mt-1 block flex">
                                <div class="celo-fbd-amount">
                                    {$activeWallet.celoBalance.cUSD}
                                </div>
                            </dd>
                        </div>
                    </div>
                    <div>
                        <div class="celo-fbd-container">
                            <dt class="celo-fbd-title">cEUR</dt>
                            <dd class="mt-1 block flex">
                                <div class="celo-fbd-amount">
                                    {$activeWallet.celoBalance.cEUR}
                                </div>
                            </dd>
                        </div>
                    </div>
                </dl>
            </div>

            <div class="mt-5 grid grid-cols-2 gap-6">
                <button
                    type="button"
                    use:tooltip={{ content: $_('ReceiveMsg') }}
                    class="secondary-btn"
                    on:click={() => uiState.showAccountDetailsModal()}
                    >{$_('Receive')}</button>

                <button
                    type="button"
                    use:tooltip={{ content: $_('SendMsg') }}
                    class="primary-btn"
                    on:click={() => send()}>
                    {$_('Send')}
                </button>
            </div>
        </div>
    </div>
</div>
