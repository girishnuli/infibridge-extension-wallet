import { chains } from '../constants/constStrings'
import type Network from './network'

export default class Blockchain {
    id: number
    name: string // Name is a string and not enum in order to support multi-word names
    explorerName: string
    currencySymbol: string
    networks: Network[]

    constructor(
        id: number,
        name: string,
        explorerName: string,
        currencySymbol: string,
        networks: Network[]
    ) {
        this.id = id
        this.name = name
        this.explorerName = explorerName
        this.currencySymbol = currencySymbol
        this.networks = networks
    }

    static list(): Blockchain[] {
        return [
            {
                id: 1,
                name: chains.celo,
                explorerName: 'Celo Explorer',
                currencySymbol: 'CELO',
                networks: [
                    {
                        id: 'celo-mainnet',
                        name: 'Mainnet',
                        networkId: 42220,
                        networkExplorerUrl: 'https://explorer.celo.org',
                        isBuiltIn: true,
                        isOnline: true,
                    },
                    {
                        id: 'celo-alfajores',
                        name: 'Alfajores Testnet',
                        networkId: 44787,
                        networkExplorerUrl:
                            'https://alfajores-blockscout.celo-testnet.org',
                        isBuiltIn: true,
                        isOnline: true,
                    },
                    {
                        id: 'celo-baklava',
                        name: 'Baklava Testnet',
                        networkId: 62320,
                        networkExplorerUrl:
                            'https://baklava-blockscout.celo-testnet.org',
                        isBuiltIn: true,
                        isOnline: true,
                    },
                ],
            },
        ]
    }

    static getCurrencySymbol(chain: string): string {
        const blockchain = Blockchain.list().filter(x => x.name === chain)[0]
        return blockchain.currencySymbol
    }
}
