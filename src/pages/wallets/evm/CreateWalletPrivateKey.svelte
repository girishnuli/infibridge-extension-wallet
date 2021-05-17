<script lang="ts">
    import { push } from 'svelte-spa-router'
    import { _ } from 'svelte-i18n'
    import GetStartedLayout from '../../../layouts/GetStartedLayout.svelte'
    import SetPassword from '../../../components/elements/wallet/SetPassword.svelte'
    import type { PasswordMetadata } from '../../../models/dto/passwordMetadata'
    import { generateNewWalletFromPrivateKey } from '../../../services/walletService'
    import { chains } from '../../../constants/constStrings'
    import { settings } from '../../../stores'
    import { onMount } from 'svelte'

    export let params: any = {}

    let chain = chains.celo
    let privateKey = ''
    let privateKeyError = false

    onMount(() => {
        chain = params.chain
    })

    const validatePrivateKey = () => {
        privateKeyError = !privateKey

        return !privateKeyError
    }

    const createWallet = async (metadata: PasswordMetadata) => {
        if (validatePrivateKey()) {
            const walletName = metadata.walletName
            const password = metadata.password
            const walletId = await generateNewWalletFromPrivateKey(
                privateKey,
                walletName,
                chain,
                password
            )

            if (walletId) {
                await settings.loadSettings()
                push('/wallet-ready')
            } else {
                privateKeyError = true
            }
        }
    }
</script>

<GetStartedLayout isWidthConstrained={true}>
    <h2 slot="header-title" class="mt-6 text-3xl font-bold text-gray-900">
        {$_('ImportPrivateKey')} - {chain}
    </h2>

    <div class="mt-6">
        <div class="p-4 shadow rounded-md">
            <label for="private-key" class="label">
                {$_('PrivateKey')}
            </label>
            <textarea
                id="private-key"
                name="private-key"
                rows="4"
                bind:value={privateKey}
                on:input={() => validatePrivateKey()}
                required
                class="textbox mt-1"
                placeholder={$_('PastePrivateKeyHere')} />
            <p
                class="{privateKeyError
                    ? ''
                    : 'hidden'} mt-2 text-sm text-red-600">
                {$_('PrivateKeyErrorMsg')}
            </p>
        </div>
    </div>

    <SetPassword on:setPassword={async e => await createWallet(e.detail)} />
</GetStartedLayout>
