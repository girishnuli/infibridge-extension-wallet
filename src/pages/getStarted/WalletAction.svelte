<script lang="ts">
    import { push } from 'svelte-spa-router'
    import { _ } from 'svelte-i18n'
    import { chains } from '../../constants/constStrings'
    import GetStartedLayout from '../../layouts/GetStartedLayout.svelte'
    import { navRoutes } from '../../constants/navRoutes'

    let selectedChain = chains.celo

    const createWallet = () => {
        if (selectedChain === chains.celo || selectedChain === chains.eth) {
            push(`${navRoutes.EVMCreateWalletNewSeedRoute}/${selectedChain}`)
        }
    }

    const importSeedPhrase = () => {
        if (selectedChain === chains.celo || selectedChain === chains.eth) {
            push(`${navRoutes.EVMCreateWalletImportSeedRoute}/${selectedChain}`)
        }
    }

    const importPrivateKey = () => {
        if (selectedChain === chains.celo || selectedChain === chains.eth) {
            push(`${navRoutes.EVMCreateWalletPrivateKeyRoute}/${selectedChain}`)
        }
    }

    const importKeystoreFile = () => {
        if (selectedChain === chains.celo || selectedChain === chains.eth) {
            push(
                `${navRoutes.EVMCreateWalletKeystoreFileRoute}/${selectedChain}`
            )
        }
    }

</script>

<GetStartedLayout isLogoCentered={true}>
    <!-- <div class="mx-auto text-center">
        <h2 class="mt-6 text-3xl font-bold text-gray-900">Blockchain</h2>
        <p class="mt-2 text-base text-gray-600 max-w">
            {$_('SelectBlockchainMsg')}
        </p>
    </div>

    <ul class="mt-6 mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2">
        <li
            on:click={() => switchBlockchain(chains.celo)}
            class="bl-li {selectedChain == chains.celo
                ? 'bl-active'
                : 'bl-normal'}">
            <div class="bl-logo-container">
                <img
                    class="w-24 h-24 flex-shrink-0 mx-auto"
                    src="/images/logos/celo.png"
                    alt="Celo logo" />
                <h3 class="bl-name">Celo</h3>
            </div>
        </li>
        <li
            on:click={() => switchBlockchain(chains.eth)}
            class="bl-li {selectedChain == chains.eth
                ? 'bl-active'
                : 'bl-normal'}">
            <div class="bl-logo-container">
                <img
                    class="w-16 h-24 flex-shrink-0 mx-auto"
                    src="/images/logos/eth.png"
                    alt="Ethereum logo" />
                <h3 class="bl-name">Ethereum</h3>
            </div>
        </li>
    </ul> -->

    <div class="mx-auto text-center">
        <h2 class="mt-12 text-3xl font-bold text-gray-900">
            {$_('Action')}
        </h2>
    </div>

    <ul class="mt-6 grid grid-cols-2 gap-6">
        <li class="wallet-action-li">
            <div class="wallet-action-container">
                <svg
                    class="wallet-action-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <dl class="mt-2 flex-grow flex flex-col justify-between">
                    <dd class="text-gray-500 text-base">
                        {$_('CreateNewSeedMsg')}
                    </dd>
                    <button
                        on:click={() => createWallet()}
                        class="mt-3 primary-btn">
                        {$_('CreateWallet')}
                    </button>
                </dl>
            </div>
        </li>
        <li class="wallet-action-li">
            <div class="wallet-action-container">
                <svg
                    class="wallet-action-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <dl class="mt-2 flex-grow flex flex-col justify-between">
                    <dd class="text-gray-500 text-base">
                        {$_('ImportSeedMsg')}
                    </dd>
                    <button
                        on:click={() => importSeedPhrase()}
                        class="mt-3 primary-btn">
                        {$_('ImportSeedPhrase')}
                    </button>
                </dl>
            </div>
        </li>

        <li class="wallet-action-li">
            <div class="wallet-action-container">
                <svg
                    class="wallet-action-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <dl class="mt-2 flex-grow flex flex-col justify-between">
                    <dd class="text-gray-500 text-base">
                        {$_('ImportPvtKeyMsg')}
                    </dd>
                    <button
                        on:click={() => importPrivateKey()}
                        class="mt-3 primary-btn">
                        {$_('ImportPvtKey')}
                    </button>
                </dl>
            </div>
        </li>

        <li class="wallet-action-li">
            <div class="wallet-action-container">
                <svg
                    class="wallet-action-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clip-rule="evenodd" />
                </svg>
                <dl class="mt-2 flex-grow flex flex-col justify-between">
                    <dd class="text-gray-500 text-base">
                        {$_('ImportKeystoreMsg')}
                    </dd>
                    <button
                        on:click={() => importKeystoreFile()}
                        class="mt-3 primary-btn">
                        {$_('ImportKeystore')}
                    </button>
                </dl>
            </div>
        </li>
    </ul>
</GetStartedLayout>
