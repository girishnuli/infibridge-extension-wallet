import Welcome from '../pages/getStarted/Welcome.svelte'
import WalletReady from '../pages/getStarted/WalletReady.svelte'
import WalletAction from '../pages/getStarted/WalletAction.svelte'
import { navRoutes } from '../constants/navRoutes'

export default {
    [navRoutes.WelcomeRoute]: Welcome,

    [navRoutes.WalletActionRoute]: WalletAction,

    [navRoutes.WalletReadyRoute]: WalletReady,
}
