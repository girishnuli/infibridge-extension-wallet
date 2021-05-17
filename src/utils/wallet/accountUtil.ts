function getTrimmedAddress(address: string): string {
    if (!address || address.length <= 0) return address

    let start = address.substring(0, 8)
    let end = address.substr(address.length - 8)

    return `${start}...${end}`
}

export { getTrimmedAddress }
