<script lang="ts">
    import { fade, scale } from 'svelte/transition'
    import { cubicIn, cubicOut } from 'svelte/easing'
    import { createEventDispatcher } from 'svelte'
    import { eventTypes } from '../../../constants/eventTypes'
    import { _ } from 'svelte-i18n'
    import tooltip from '../../../utils/tooltip'
    import ErrorIcon from '../../elements/ErrorIcon.svelte'
    import { isValidWalletPassword } from '../../../services/walletService'
    import type InfiWallet from '../../../models/infiWallet'

    export let wallet: InfiWallet

    const dispatch = createEventDispatcher()

    let password = ''
    let passwordError = false

    const validatePassword = () => {
        passwordError = !(password && password.length >= 8)
        return !passwordError
    }

    const cancel = () => {
        dispatch(eventTypes.closeModal)
    }

    const confirmDelete = async () => {
        if (passwordError) return

        const isValidPwd = await isValidWalletPassword(wallet.id, password)
        if (!isValidPwd) {
            passwordError = true
            return
        }

        dispatch(eventTypes.confirmAction)
    }
</script>

<div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="delete-wallet-modal"
    role="dialog"
    aria-modal="true">
    <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                    on:click={() => cancel()}
                    type="button"
                    class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span class="sr-only">Close</span>
                    <!-- Heroicon name: outline/x -->
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
            <div class="sm:flex sm:items-start">
                <div
                    class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <!-- Heroicon name: outline/exclamation -->
                    <svg
                        class="h-6 w-6 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                        class="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title">
                        {$_('DeleteWalletTitle')}
                        {wallet.nickName}
                    </h3>
                    <div class="mt-2">
                        <p class="text-sm text-gray-500 break-words">
                            {$_('DeleteWalletMsg')}
                        </p>
                    </div>
                    <div>
                        <form
                            class="mt-5"
                            on:submit|preventDefault={async () =>
                                await confirmDelete()}>
                            <div
                                use:tooltip={{
                                    content: $_('EnterPwdToDeleteMsg'),
                                }}
                                class="relative max-w-lg flex rounded-md shadow-sm">
                                <span class="grouped-textbox-label w-36">
                                    {$_('WalletPassword')}
                                </span>
                                <input
                                    bind:value={password}
                                    on:input={() => validatePassword()}
                                    type="password"
                                    name="wallet-password"
                                    id="wallet-password"
                                    class="grouped-textbox-input"
                                    required />
                                {#if passwordError}
                                    <ErrorIcon />
                                {/if}
                            </div>
                            <p
                                class="{passwordError
                                    ? ''
                                    : 'hidden'} mt-2 error">
                                {$_('InvalidPassword')}
                            </p>

                            <div class="mt-5 sm:flex sm:flex-row-reverse">
                                <button
                                    on:click={() => confirmDelete()}
                                    type="submit"
                                    class="danger-btn sm:ml-3">
                                    {$_('Delete')}
                                </button>
                                <button
                                    on:click={() => cancel()}
                                    type="button"
                                    class="secondary-btn mt-3 sm:mt-0">
                                    {$_('Cancel')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
