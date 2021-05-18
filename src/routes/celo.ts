import CeloReviewSend from '../pages/celo/transact/CeloReviewSend.svelte'
import CeloSendAddress from '../pages/celo/transact/CeloSendAddress.svelte'
import CeloIndex from '../pages/celo/CeloIndex.svelte'
import { navRoutes } from '../constants/navRoutes'

export default {
    [navRoutes.CeloIndexRoute]: CeloIndex,
    [navRoutes.CeloReviewSendRoute]: CeloReviewSend,
    [navRoutes.CeloSendAddressRoute]: CeloSendAddress,
}
