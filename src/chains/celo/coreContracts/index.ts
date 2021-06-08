import AccountsContract from './ABI/accounts'
import AttestationsContract from './ABI/attestations'
import ElectionContract from './ABI/election'
import EpochRewardsContract from './ABI/epochRewards'
import EscrowContract from './ABI/escrow'
import ExchangeContract from './ABI/exchange'
import GasPriceMinimumContract from './ABI/gasPriceMinimum'
import GoldTokenContract from './ABI/goldToken'
import GovernanceContract from './ABI/governance'
import LockedGoldContract from './ABI/lockedGold'
import MultiSigContract from './ABI/multiSig'
import ProxyContract from './ABI/proxy'
import RegistryContract from './ABI/registry'
import ReleaseGoldContract from './ABI/releaseGold'
import ReserveContract from './ABI/reserve'
import SortedOraclesContract from './ABI/sortedOracles'
import StableTokenContract from './ABI/stableToken'
import ValidatorsContract from './ABI/validators'

// Registry contract is always predeployed to this address
// https://github.com/celo-org/celo-monorepo/blob/8e21a5d970c69917deda5f587e07276273cfb19f/packages/sdk/contractkit/src/address-registry.ts
const RegistryContractAddress = '0x000000000000000000000000000000000000ce10'

export {
    AccountsContract,
    AttestationsContract,
    ElectionContract,
    EpochRewardsContract,
    EscrowContract,
    ExchangeContract,
    GasPriceMinimumContract,
    GoldTokenContract,
    GovernanceContract,
    LockedGoldContract,
    MultiSigContract,
    ProxyContract,
    RegistryContract,
    ReleaseGoldContract,
    ReserveContract,
    SortedOraclesContract,
    StableTokenContract,
    ValidatorsContract,
    RegistryContractAddress,
}
