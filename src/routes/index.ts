import getStartedRoutes from './getStarted'
import celoRoutes from './celo'
import walletRoutes from './wallets'
import NotFound from '../pages/NotFound.svelte'

const catchAllRoute = {
    '*': NotFound,
}

export default {
    ...getStartedRoutes,
    ...walletRoutes,
    ...celoRoutes,
    ...catchAllRoute,
}
