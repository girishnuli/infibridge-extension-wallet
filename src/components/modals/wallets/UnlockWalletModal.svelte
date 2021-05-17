<script lang="ts">
    import { fade, scale } from 'svelte/transition'
    import { cubicIn, cubicOut } from 'svelte/easing'
    import { _ } from 'svelte-i18n'
    import { activeWallet, uiState } from '../../../stores/index'
    import ErrorIcon from '../../elements/ErrorIcon.svelte'

    let password = ''
    let passwordError = false

    const validatePassword = () => {
        passwordError = !(password && password.length >= 8)
        return !passwordError
    }

    const unlock = async () => {
        if (passwordError) return

        const unlockedWallet = await activeWallet.unlockWallet(
            $activeWallet.wallet,
            password
        )

        if (unlockedWallet) {
            uiState.hideUnlockWalletModal()
        } else {
            passwordError = true
        }
    }

    const cancel = () => {
        uiState.hideUnlockWalletModal()
    }
</script>

<div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="wallet-password-modal"
    role="dialog"
    aria-modal="true">
    <div class="flex items-center justify-center min-h-screen text-center">
        <div
            in:fade={{ duration: 300, easing: cubicOut }}
            out:fade={{ duration: 300, easing: cubicIn }}
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true" />

        <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">&#8203;</span>

        <div
            in:scale={{ duration: 150, start: 0.95, easing: cubicOut }}
            out:scale={{ duration: 100, start: 0.95, easing: cubicIn }}
            class="inline-block align-bottom bg-white rounded-lg px-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all">
            <div>
                <div>
                    <div class="mt-4">
                        <h3 class="modal-title">
                            {$_('Unlock')}
                            {$activeWallet.wallet.nickName}
                        </h3>
                    </div>
                </div>

                <div class="block absolute top-0 right-0 pt-4 pr-4">
                    <button
                        on:click={() => cancel()}
                        type="button"
                        class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="sr-only">Close</span>
                        <svg
                            class="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="w-80">
                    <form
                        class="mt-5"
                        on:submit|preventDefault={() => unlock()}>
                        <div
                            class="mt-2 relative max-w-lg flex rounded-md shadow-sm">
                            <span class="grouped-textbox-label w-24">
                                {$_('Password')}
                            </span>
                            <input
                                bind:value={password}
                                on:change={() => validatePassword()}
                                type="password"
                                name="password"
                                id="password"
                                class="grouped-textbox-input"
                                required />
                            {#if passwordError}
                                <ErrorIcon />
                            {/if}
                        </div>
                        <p class="{passwordError ? '' : 'hidden'} mt-2 error">
                            {$_('InvalidPassword')}
                        </p>

                        <div class="mt-5">
                            <button
                                type="submit"
                                class="primary-btn-inline w-full">
                                {$_('UnlockWallet')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
