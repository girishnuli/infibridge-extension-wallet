import { storageKeys } from '../constants/constStrings'
import Setting from '../models/setting'
import { getFromStorage, saveToStorage } from './chromeApi'
import { isDevEnv } from '../utils/env'
import { plainToClass } from 'class-transformer'
import { logMessage } from '../utils/infra/logger'

export async function getSettingsFromStorage(): Promise<Setting> {
    let settings: Setting

    try {
        const settingsObj = await getFromStorage(storageKeys.settingsKey)
        if (isDevEnv()) {
            if (settingsObj) {
                settings = plainToClass(Setting, settingsObj)
                return settings
            }
        } else {
            // @ts-ignore
            if (Object.keys(settingsObj).length > 0) {
                // @ts-ignore
                settings = plainToClass(Setting, settingsObj.settings)
                // @ts-ignore
                return settings
            }
        }
    } catch (error) {
        logMessage(error)
    }

    return new Setting()
}

export async function saveSettingsToStorage(settings: Setting) {
    try {
        await saveToStorage(storageKeys.settingsKey, settings)
    } catch (error) {
        logMessage(error)
    }
}
