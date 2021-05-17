export default class Network {
    id: string
    name: string
    networkId: number
    networkExplorerUrl: string
    isBuiltIn: boolean
    isOnline: boolean

    constructor(
        id: string,
        name: string,
        networkId: number,
        networkExplorerUrl: string,
        isBuiltIn: boolean,
        isOnline: boolean
    ) {
        this.id = id
        this.name = name
        this.networkId = networkId
        this.networkExplorerUrl = networkExplorerUrl
        this.isBuiltIn = isBuiltIn
        this.isOnline = isOnline
    }
}
