import ChooseSendAddress from '../pages/celo/transact/ChooseSendAddress.svelte'
import SendCelo from '../pages/celo/transact/SendCelo.svelte'
import CeloIndex from '../pages/celo/CeloIndex.svelte'

export default {
    '/celo-index': CeloIndex,

    '/celo-send-address': ChooseSendAddress,

    '/send-celo': SendCelo,
}
