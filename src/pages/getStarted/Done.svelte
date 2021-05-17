<script lang="ts">
    import { push } from 'svelte-spa-router'
    import { _ } from 'svelte-i18n'
    import GetStartedLayout from '../../layouts/GetStartedLayout.svelte'
    import { settings, activeWallet } from '../../stores/index'
    import { chains } from '../../constants/constStrings'

    const goToWalletDashboard = async () => {
        if ($settings.activeWalletId) {
            await activeWallet.loadWallet($settings.activeWalletId)
            if ($activeWallet.wallet && $activeWallet.wallet.id) {
                switch ($activeWallet.wallet.blockchain) {
                    case chains.celo:
                        push('/celo-index')
                        break
                }
            } else {
                push('/my-wallets')
            }
        }
    }

</script>

<GetStartedLayout>
    <div class="shadow rounded-md">
        <div class="px-4 py-5 sm:p-6">
            <h2 class="mt-6 text-3xl font-bold text-gray-900">
                {$_('WalletReady')}
            </h2>
            <p class="mt-4 text-base text-gray-800 max-w">
                {$_('WalletReadyMsg')}
            </p>
            <div class="mt-5">
                <ul
                    class="list-disc list-inside leading-loose text-gray-600 text-base">
                    <li>
                        {$_('WalletTip1')}
                    </li>
                    <li>
                        {$_('WalletTip2')}
                    </li>
                    <li>
                        {$_('WalletTip3')}
                    </li>
                    <li>
                        <strong>{$_('PhishingAlert')}</strong>
                        {$_('PhishingAlertMsg')}
                    </li>
                </ul>
            </div>
            <div class="mt-5 grid grid-cols-2 gap-3 grid-flow-row-dense">
                <button
                    on:click={() => goToWalletDashboard()}
                    type="button"
                    class="primary-btn-inline col-start-2">
                    {$_('WalletDashboard')}
                </button>
                <button
                    on:click={() => push('/wallet-action')}
                    type="button"
                    class="secondary-btn-inline col-start-1">
                    {$_('CreateAnotherWallet')}
                </button>
            </div>
        </div>
    </div>
</GetStartedLayout>
