import ChooseSendAddress from '../pages/celo/transact/ChooseSendAddress.svelte'
import SendCelo from '../pages/celo/transact/SendCelo.svelte'
import CeloIndex from '../pages/celo/CeloIndex.svelte'
import { navRoutes } from '../constants/navRoutes'

export default {
    [navRoutes.CeloIndexRoute]: CeloIndex,

    [navRoutes.ChooseSendAddressRoute]: ChooseSendAddress,

    [navRoutes.SendCeloRoute]: SendCelo,
}
