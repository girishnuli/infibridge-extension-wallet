<script lang="ts">
    import { push } from 'svelte-spa-router'
    import { _ } from 'svelte-i18n'
    import GetStartedLayout from '../../../layouts/GetStartedLayout.svelte'
    import SetPassword from '../../../components/elements/wallet/SetPassword.svelte'
    import type { PasswordMetadata } from '../../../models/dto/passwordMetadata'
    import { generateNewWalletFromKeystore } from '../../../services/walletService'
    import { chains } from '../../../constants/constStrings'
    import { settings } from '../../../stores'
    import { onMount } from 'svelte'

    export let params: any = {}

    let chain = chains.celo
    let keystorePassword = ''
    let keystorePasswordError = false
    let keystoreFile: any
    let keystoreFileName = ''
    let keystoreFileContent: any
    let keystoreFileError = false

    onMount(() => {
        chain = params.chain
    })

    const validateKeystorePassword = () => {
        keystorePasswordError = !keystorePassword
        return !keystorePasswordError
    }

    const parseFile = (e: any) => {
        keystoreFileError = false
        try {
            const file = e.target.files[0]
            keystoreFileName = file.name
            let reader = new FileReader()
            reader.onload = ev => {
                // @ts-ignore
                keystoreFileContent = ev.target.result
            }
            reader.readAsText(file)
        } catch (error) {
            keystoreFileError = true
        }
    }

    const createWallet = async (metadata: PasswordMetadata) => {
        if (validateKeystorePassword()) {
            if (keystoreFileContent) {
                const walletName = metadata.walletName
                const password = metadata.password

                const walletId = await generateNewWalletFromKeystore(
                    keystoreFileContent,
                    keystorePassword,
                    walletName,
                    chain,
                    password
                )

                if (walletId) {
                    await settings.loadSettings()
                    push('/wallet-ready')
                } else {
                    keystoreFileError = true
                }
            } else {
                keystoreFileError = true
            }
        }
    }

</script>

<GetStartedLayout isWidthConstrained={true}>
    <h2 slot="header-title" class="mt-6 text-3xl font-bold text-gray-900">
        {$_('ImportKeystore')} - {chain}
    </h2>

    <div class="mt-6">
        <div class="p-4 shadow rounded-md space-y-4">
            <div>
                <div
                    class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
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
                        <div class="flex text-sm justify-center">
                            <label
                                for="file-upload"
                                class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                <span>{$_('SelectKeystoreFile')}</span>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    on:change={e => parseFile(e)}
                                    bind:this={keystoreFile}
                                    class="sr-only" />
                            </label>
                        </div>

                        <p
                            class="{keystoreFileName
                                ? ''
                                : 'hidden'} mt-1 text-sm font-bold text-gray-600">
                            {keystoreFileName}
                        </p>
                    </div>
                </div>
            </div>
            <p class="{keystoreFileError ? '' : 'hidden'} text-sm text-red-600">
                {$_('InvalidKeystoreFileOrPassword')}
            </p>
            <div>
                <label for="keystore-password" class="label">
                    {$_('KeystorePassword')}
                </label>
                <div class="mt-1">
                    <input
                        id="keystore-password"
                        name="keystore-password"
                        type="password"
                        bind:value={keystorePassword}
                        on:input={() => validateKeystorePassword()}
                        required
                        class="textbox" />
                    <p
                        class="{keystorePasswordError
                            ? ''
                            : 'hidden'} mt-2 error">
                        {$_('EmptyPassword')}
                    </p>
                </div>
            </div>
        </div>
    </div>

    <SetPassword on:setPassword={async e => await createWallet(e.detail)} />
</GetStartedLayout>
