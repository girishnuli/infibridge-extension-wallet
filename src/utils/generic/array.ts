// https://stackoverflow.com/a/62765924/537871
export const groupBy = <T, K extends keyof any>(
    list: T[],
    getKey: (item: T) => K
) =>
    list.reduce((previous, currentItem) => {
        const group = getKey(currentItem)
        if (!previous[group]) previous[group] = []
        previous[group].push(currentItem)
        return previous
    }, {} as Record<K, T[]>)
