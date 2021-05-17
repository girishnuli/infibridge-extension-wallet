<script lang="ts">
    import { fade, scale } from 'svelte/transition'
    import { cubicIn, cubicOut } from 'svelte/easing'
    import { _ } from 'svelte-i18n'
    import { WalletTabs } from '../../../models/enums/walletTabs'
    import ErrorIcon from '../../elements/ErrorIcon.svelte'
    import { createEventDispatcher, onMount } from 'svelte'
    import type InfiWallet from '../../../models/infiWallet'
    import { eventTypes } from '../../../constants/eventTypes'
    import tooltip from '../../../utils/tooltip'
    import {
        updateWalletMetaData,
        isValidWalletPassword,
        changeWalletPassword,
    } from '../../../services/walletService'

    export let wallet: InfiWallet

    const dispatch = createEventDispatcher()
    let currentTab = WalletTabs.WalletInfo

    let walletName = ''
    let infoChangePassword = ''

    let walletNameError = false
    let infoChangePasswordError = false

    let currentPassword = ''
    let newPassword = ''
    let confirmPassword = ''

    let currentPasswordError = false
    let newPasswordError = false
    let confirmPasswordError = false

    onMount(() => {
        walletName = wallet.nickName
    })

    const switchTab = (tab: WalletTabs) => {
        if (tab === currentTab) return
        currentTab = tab
    }

    const validateWalletName = () => {
        walletNameError = !(
            walletName &&
            walletName.length >= 3 &&
            walletName.length <= 15
        )

        return !walletNameError
    }

    const validateInfoChangePassword = () => {
        infoChangePasswordError =
            !infoChangePassword || infoChangePassword.length < 8
    }

    const validateCurrentPassword = () => {
        currentPasswordError = !(currentPassword && currentPassword.length >= 8)
        return !currentPasswordError
    }

    const validateNewPassword = () => {
        newPasswordError = !(newPassword && newPassword.length >= 8)
        return !newPasswordError
    }

    const validateConfirmPassword = () => {
        confirmPasswordError = !(
            confirmPassword &&
            confirmPassword.length >= 8 &&
            confirmPassword === newPassword
        )
        return !confirmPasswordError
    }

    const saveInfo = async () => {
        if (walletNameError || infoChangePasswordError) return

        const isValidPwd = await isValidWalletPassword(
            wallet.id,
            infoChangePassword
        )
        if (!isValidPwd) {
            infoChangePasswordError = true
            return
        }

        if (walletName === wallet.nickName) {
            dispatch(eventTypes.success)
            return
        }

        const success = await updateWalletMetaData(wallet.id, walletName)
        if (success) {
            dispatch(eventTypes.success)
        } else {
            walletNameError = true
        }
    }

    const changePassword = async () => {
        if (
            !validateCurrentPassword() &&
            !validateNewPassword() &&
            !validateConfirmPassword()
        ) {
            return
        }

        const isValidPwd = await isValidWalletPassword(
            wallet.id,
            currentPassword
        )
        if (!isValidPwd) {
            currentPasswordError = true
            return
        }

        const success = await changeWalletPassword(
            wallet.id,
            currentPassword,
            newPassword
        )
        if (success) {
            dispatch(eventTypes.passwordChanged)
        } else {
            currentPasswordError = true
        }
    }

    const cancel = () => {
        dispatch(eventTypes.closeModal)
    }
</script>

<div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="edit-wallet-modal"
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
                    <div class="block">
                        <div class="border-b border-gray-200">
                            <nav
                                class="-mb-px flex space-x-4"
                                aria-label="Tabs">
                                <a
                                    on:click|preventDefault={() =>
                                        switchTab(WalletTabs.WalletInfo)}
                                    href="/"
                                    class={currentTab === WalletTabs.WalletInfo
                                        ? 'active-tab'
                                        : 'normal-tab'}>
                                    {$_('WalletInfo')}
                                </a>

                                <a
                                    on:click|preventDefault={() =>
                                        switchTab(WalletTabs.Password)}
                                    href="/"
                                    class={currentTab === WalletTabs.Password
                                        ? 'active-tab'
                                        : 'normal-tab'}>
                                    {$_('Password')}
                                </a>
                            </nav>
                        </div>
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

                {#if currentTab === WalletTabs.WalletInfo}
                    <div class="w-96">
                        <form
                            class="mt-5"
                            on:submit|preventDefault={async () =>
                                await saveInfo()}>
                            <div
                                class="relative max-w-lg flex rounded-md shadow-sm">
                                <span class="grouped-textbox-label w-36">
                                    {$_('Name')}
                                </span>
                                <input
                                    bind:value={walletName}
                                    on:input={() => validateWalletName()}
                                    type="text"
                                    name="wallet-name"
                                    id="wallet-name"
                                    class="grouped-textbox-input"
                                    required />
                                {#if walletNameError}
                                    <ErrorIcon />
                                {/if}
                            </div>

                            <div
                                use:tooltip={{
                                    content: $_('EnterPwdToSaveMsg'),
                                }}
                                class="mt-2 relative max-w-lg flex rounded-md shadow-sm">
                                <span class="grouped-textbox-label w-36">
                                    {$_('WalletPassword')}
                                </span>
                                <input
                                    bind:value={infoChangePassword}
                                    on:input={() =>
                                        validateInfoChangePassword()}
                                    type="password"
                                    name="wallet-password"
                                    id="wallet-password"
                                    class="grouped-textbox-input"
                                    required />
                                {#if infoChangePasswordError}
                                    <ErrorIcon />
                                {/if}
                            </div>
                            <p
                                class="{infoChangePasswordError
                                    ? ''
                                    : 'hidden'} mt-2 error">
                                {$_('InvalidPassword')}
                            </p>

                            <div class="mt-5">
                                <button
                                    type="submit"
                                    class="primary-btn-inline w-full">
                                    {$_('Save')}
                                </button>
                            </div>
                        </form>
                    </div>
                {:else if currentTab === WalletTabs.Password}
                    <div class="w-96">
                        <form
                            class="mt-5"
                            on:submit|preventDefault={async () =>
                                await changePassword()}>
                            <div
                                class="mt-2 relative max-w-lg flex rounded-md shadow-sm">
                                <span class="grouped-textbox-label w-36">
                                    {$_('CurrentPassword')}
                                </span>
                                <input
                                    bind:value={currentPassword}
                                    on:input={() => validateCurrentPassword()}
                                    type="password"
                                    name="current-password"
                                    id="current-password"
                                    class="grouped-textbox-input"
                                    required />
                                {#if currentPasswordError}
                                    <ErrorIcon />
                                {/if}
                            </div>
                            <p
                                class="{currentPasswordError
                                    ? ''
                                    : 'hidden'} mt-2 error">
                                {$_('InvalidPassword')}
                            </p>

                            <div
                                class="mt-2 relative max-w-lg flex rounded-md shadow-sm">
                                <span class="grouped-textbox-label w-36">
                                    {$_('NewPassword')}
                                </span>
                                <input
                                    bind:value={newPassword}
                                    on:input={() => validateNewPassword()}
                                    type="password"
                                    name="new-password"
                                    id="new-password"
                                    class="grouped-textbox-input"
                                    required />
                                {#if newPasswordError}
                                    <ErrorIcon />
                                {/if}
                            </div>
                            <p
                                class="{newPasswordError
                                    ? ''
                                    : 'hidden'} mt-2 error">
                                {$_('PasswordError')}
                            </p>

                            <div
                                class="mt-2 relative max-w-lg flex rounded-md shadow-sm">
                                <span class="grouped-textbox-label w-36">
                                    {$_('ConfirmPassword')}
                                </span>
                                <input
                                    bind:value={confirmPassword}
                                    on:input={() => validateConfirmPassword()}
                                    type="password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    class="grouped-textbox-input"
                                    required />
                                {#if confirmPasswordError}
                                    <ErrorIcon />
                                {/if}
                            </div>
                            <p
                                class="{confirmPasswordError
                                    ? ''
                                    : 'hidden'} mt-2 error">
                                {$_('ConfirmPasswordError')}
                            </p>

                            <div class="mt-5">
                                <button
                                    type="submit"
                                    class="primary-btn-inline w-full">
                                    {$_('ChangeWalletPassword')}
                                </button>
                            </div>
                        </form>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>
