import Welcome from '../pages/getStarted/Welcome.svelte'
import Done from '../pages/getStarted/Done.svelte'
import WalletAction from '../pages/getStarted/WalletAction.svelte'

export default {
    '/': Welcome,

    '/wallet-action': WalletAction,

    '/wallet-ready': Done,
}
