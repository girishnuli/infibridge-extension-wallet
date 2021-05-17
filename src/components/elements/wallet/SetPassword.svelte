<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { _ } from 'svelte-i18n'
    import { eventTypes } from '../../../constants/eventTypes'
    import { PasswordMetadata } from '../../../models/dto/passwordMetadata'

    export let buttonText = $_('CreateWallet')
    const dispatch = createEventDispatcher()

    let walletName = ''
    let password = ''
    let confirmPassword = ''

    let walletNameError = false
    let passwordError = false
    let confirmPasswordError = false

    const validateWalletName = () => {
        walletNameError = !(
            walletName &&
            walletName.length >= 3 &&
            walletName.length <= 15
        )

        return !walletNameError
    }

    const validatePassword = () => {
        passwordError = !(password && password.length >= 8)
        return !passwordError
    }

    const validateConfirmPassword = () => {
        confirmPasswordError = !(
            confirmPassword &&
            confirmPassword.length >= 8 &&
            confirmPassword === password
        )
        return !confirmPasswordError
    }

    const setPassword = () => {
        if (
            validateWalletName() &&
            validatePassword() &&
            validateConfirmPassword()
        ) {
            dispatch(
                eventTypes.setPassword,
                new PasswordMetadata(walletName, password)
            )
        }
    }
</script>

<div class="mt-6 p-4 shadow rounded-md">
    <form class="space-y-4 max-w" on:submit|preventDefault={setPassword}>
        <div>
            <h3 class="text-lg leading-6 font-medium text-gray-800">
                {$_('SecureWalletTitle')}
            </h3>
            <p class="mt-1 text-sm text-gray-500">
                {$_('SecureWalletMsg')}
            </p>
        </div>
        <div>
            <label for="name" class="label"> {$_('WalletName')} </label>
            <div class="mt-1">
                <input
                    id="name"
                    name="name"
                    type="text"
                    bind:value={walletName}
                    on:input={() => validateWalletName()}
                    required
                    class="textbox" />
                <p class="{walletNameError ? '' : 'hidden'} mt-2 error">
                    {$_('WalletNameError')}
                </p>
            </div>
        </div>
        <div>
            <label for="password" class="label"> {$_('Password')} </label>
            <div class="mt-1">
                <input
                    id="password"
                    name="password"
                    type="password"
                    bind:value={password}
                    on:input={() => validatePassword()}
                    required
                    class="textbox" />
                <p class="{passwordError ? '' : 'hidden'} mt-2 error">
                    {$_('PasswordError')}
                </p>
            </div>
        </div>

        <div>
            <label for="confirm-password" class="label">
                {$_('ConfirmPassword')}
            </label>
            <div class="mt-1">
                <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    bind:value={confirmPassword}
                    on:input={() => validateConfirmPassword()}
                    required
                    class="textbox" />
                <p
                    class="{confirmPasswordError
                        ? ''
                        : 'hidden'} mt-2 text-sm text-red-600">
                    {$_('ConfirmPasswordError')}
                </p>
            </div>
        </div>

        <div>
            <button type="submit" class="primary-btn"> {buttonText} </button>
        </div>
    </form>
</div>
