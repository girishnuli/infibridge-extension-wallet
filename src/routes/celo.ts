import CeloReviewSend from '../pages/celo/transact/CeloReviewSend.svelte'
import CeloSendAddress from '../pages/celo/transact/CeloSendAddress.svelte'
import CeloIndex from '../pages/celo/CeloIndex.svelte'
import CeloDiscoverIndex from '../pages/celo/actions/discover/CeloDiscoverIndex.svelte'
import CeloEarnIndex from '../pages/celo/actions/earn/CeloEarnIndex.svelte'
import CeloVoteIndex from '../pages/celo/actions/vote/CeloVoteIndex.svelte'
import { navRoutes } from '../constants/navRoutes'

export default {
    [navRoutes.CeloIndexRoute]: CeloIndex,
    [navRoutes.CeloReviewSendRoute]: CeloReviewSend,
    [navRoutes.CeloSendAddressRoute]: CeloSendAddress,
    [navRoutes.CeloDiscoverIndexRoute]: CeloDiscoverIndex,
    [navRoutes.CeloEarnIndexRoute]: CeloEarnIndex,
    [navRoutes.CeloVoteIndexRoute]: CeloVoteIndex,
}
