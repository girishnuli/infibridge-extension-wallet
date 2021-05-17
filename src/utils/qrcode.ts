import QRCode from 'qrcode'
import { logMessage } from './infra/logger'

const generateQRCode = async (text: string): Promise<string> => {
    try {
        const qrcode = await QRCode.toDataURL(text)
        return qrcode
    } catch (error) {
        logMessage(error)
    }

    return ''
}

export { generateQRCode }
