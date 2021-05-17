export function isDevEnv(): boolean {
    if (import.meta.env.MODE === 'development') {
        return true
    }

    return false
}
