<script lang="ts">
    import { push } from 'svelte-spa-router'
    import { _ } from 'svelte-i18n'
    import GetStartedLayout from '../../../layouts/GetStartedLayout.svelte'
    import SetPassword from '../../../components/elements/wallet/SetPassword.svelte'
    import type { PasswordMetadata } from '../../../models/dto/passwordMetadata'
    import {
        validateMnemonic,
        generateNewHDWallet,
    } from '../../../services/walletService'
    import { chains } from '../../../constants/constStrings'
    import { settings } from '../../../stores'
    import { onMount } from 'svelte'
    import { navRoutes } from '../../../constants/navRoutes'

    export let params: any = {}

    let chain = chains.celo
    let seedPhrase = ''
    let seedPhraseError = false

    onMount(() => {
        chain = params.chain
    })

    const validateSeedPhrase = () => {
        if (!seedPhrase) {
            seedPhraseError = true
        } else if (seedPhrase.trim().split(/\s+/g).length < 24) {
            seedPhraseError = true
        } else {
            seedPhraseError = !validateMnemonic(seedPhrase)
        }

        return !seedPhraseError
    }

    const createWallet = async (metadata: PasswordMetadata) => {
        if (validateSeedPhrase()) {
            const walletName = metadata.walletName
            const password = metadata.password
            await generateNewHDWallet(seedPhrase, walletName, chain, password)

            await settings.loadSettings()

            push(navRoutes.WalletReadyRoute)
        }
    }

</script>

<GetStartedLayout isWidthConstrained={true}>
    <h2 slot="header-title" class="mt-6 text-3xl font-bold text-gray-900">
        {$_('ImportSeedPhrase')} - {chain}
    </h2>

    <div class="mt-6">
        <div class="p-4 shadow rounded-md">
            <label for="seed-phrase" class="label">
                {$_('SeedPhrase')}
            </label>
            <textarea
                id="seed-phrase"
                name="seed-phrase"
                rows="8"
                bind:value={seedPhrase}
                on:input={() => validateSeedPhrase()}
                required
                class="textbox mt-1"
                placeholder={$_('PasteOrTypeSeedPhrase')} />
            <p
                class="{seedPhraseError
                    ? ''
                    : 'hidden'} mt-2 text-sm text-red-600">
                {$_('ImportSeedErrorMsg')}
            </p>
        </div>
    </div>

    <SetPassword on:setPassword={async e => await createWallet(e.detail)} />
</GetStartedLayout>
