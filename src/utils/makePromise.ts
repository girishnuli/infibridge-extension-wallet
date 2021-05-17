// https://dev.to/paulasantamaria/chrome-extensions-local-storage-1b34
export default function makePromise(callback: any) {
    const promise = new Promise((resolve, reject) => {
        try {
            callback(resolve, reject)
        } catch (err) {
            reject(err)
        }
    })
    return promise
}
