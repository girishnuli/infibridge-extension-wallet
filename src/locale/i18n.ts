import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n'

import en from './en.json'
import es from './es.json'

addMessages('en', en)
addMessages('es', es)

init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
})

export { init }
