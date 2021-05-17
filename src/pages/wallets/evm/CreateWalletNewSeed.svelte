<script lang="ts">
    import { push } from 'svelte-spa-router'
    import { _ } from 'svelte-i18n'
    import GetStartedLayout from '../../../layouts/GetStartedLayout.svelte'
    import SetPassword from '../../../components/elements/wallet/SetPassword.svelte'
    import type { PasswordMetadata } from '../../../models/dto/passwordMetadata'
    import {
        generateMnemonic,
        generateNewHDWallet,
    } from '../../../services/walletService'
    import { onMount } from 'svelte'
    import { chains } from '../../../constants/constStrings'
    import { settings } from '../../../stores'

    export let params: any = {}

    let chain = chains.celo
    let seedPhrase = ''
    let seedPhraseVisible = false

    onMount(() => {
        chain = params.chain
        seedPhrase = generateMnemonic()
    })

    const showSeedPhrase = () => {
        seedPhraseVisible = !seedPhraseVisible
    }

    const downloadSeedPhrase = () => {
        if (!seedPhrase || seedPhrase.length <= 0) return

        var element = document.createElement('a')
        element.setAttribute(
            'href',
            'data:text/plain;charset=utf-8,' + encodeURIComponent(seedPhrase)
        )
        element.setAttribute('download', 'seedwords.txt')
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    const createWallet = async (metadata: PasswordMetadata) => {
        const walletName = metadata.walletName
        const password = metadata.password

        await generateNewHDWallet(seedPhrase, walletName, chain, password)
        await settings.loadSettings()

        push('/wallet-ready')
    }

</script>

<GetStartedLayout>
    <h2 slot="header-title" class="mt-6 text-3xl font-bold text-gray-900">
        {$_('SeedPhrase')} - {chain}
    </h2>

    <div class="mt-6">
        <div
            class="border border-2 rounded-md p-8 h-56 text-center text-blue-900 text-base">
            <p class={seedPhraseVisible ? '' : 'text-blurred'}>
                {seedPhrase}
            </p>
            <button
                on:click={() => showSeedPhrase()}
                class="mt-8 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none">
                {seedPhraseVisible
                    ? $_('HideSeedPhrase')
                    : $_('ShowSeedPhrase')}
            </button>
        </div>

        <div class="mt-4">
            <button on:click={() => downloadSeedPhrase()} class="secondary-btn">
                {$_('DownloadSeedPhrase')}
            </button>
        </div>
    </div>

    <SetPassword on:setPassword={async e => await createWallet(e.detail)} />

    <div slot="right-col" class="w-full flex-1 p-2 mt-44">
        <h2 class="text-xl font-bold text-gray-900">
            {$_('MakeBackupTitle')}
        </h2>
        <p class="mt-2 text-base text-gray-600 max-w">
            <strong
                ><em class="text-blue-900">
                    {$_('MakeBackupSubTitle')}
                </em>
                {$_('MakeBackupMsg1')}
            </strong>
        </p>
        <p class="mt-4 text-base text-gray-600 max-w">
            {$_('MakeBackupMsg2')}
        </p>
        <p class="mt-4 text-base text-gray-600 max-w">
            <strong>{$_('Warning')}: </strong>{$_('MakeBackupMsg3')}
        </p>
    </div>
</GetStartedLayout>
