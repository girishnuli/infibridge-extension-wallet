<script lang="ts">
    import { init } from './locale/i18n'
    import { settings, activeWallet } from './stores'
    import {
        openOptionsPage,
        getActiveWalletPassword,
        isPopupOpen,
        getNavRoute,
        clearNavRoute,
        setNavRoute,
    } from './services/chromeApi'
    import { walletsExist } from './services/walletService'
    import Router from 'svelte-spa-router'
    import { push } from 'svelte-spa-router'
    import routes from './routes'
    import { chains } from './constants/constStrings'
    import { onMount } from 'svelte'

    onMount(async () => {
        await settings.loadSettings()

        init({
            initialLocale: $settings.locale,
            fallbackLocale: 'en',
        })

        const wltsExist = await walletsExist()

        if (wltsExist) {
            if ($settings.activeWalletId) {
                await activeWallet.loadWallet($settings.activeWalletId)

                if ($activeWallet.wallet && $activeWallet.wallet.id) {
                    const password = await getActiveWalletPassword(
                        $settings.activeWalletId
                    )
                    if (password) {
                        await activeWallet.unlockWallet(
                            $activeWallet.wallet,
                            password
                        )
                    }

                    let continueLoading = true

                    // Check if options page nav is pending
                    if (!isPopupOpen()) {
                        const nav = await getNavRoute()
                        if (nav) {
                            if (nav.navCount === 1 && nav.navRoute) {
                                continueLoading = false
                                await setNavRoute(
                                    nav.navRoute,
                                    nav.navCount + 1
                                )
                                push(nav.navRoute)
                            } else if (nav.navCount >= 2) {
                                continueLoading = false
                                await clearNavRoute()
                            }
                        }
                    }

                    if (continueLoading) {
                        switch ($activeWallet.wallet.blockchain) {
                            case chains.celo:
                                push('/celo-index')
                                break
                        }
                    }
                } else {
                    push('/my-wallets')
                }
            }
        } else {
            openOptionsPage('/', false)
        }
    })

</script>

<Router {routes} />
