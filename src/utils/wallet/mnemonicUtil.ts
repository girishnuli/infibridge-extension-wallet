// Copyright 2021 The Celo Foundation (https://celo.org)

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as bip39 from 'bip39'

export enum MnemonicLanguages {
    chinese_simplified,
    chinese_traditional,
    english,
    french,
    italian,
    japanese,
    korean,
    spanish,
    portuguese,
}

export enum MnemonicStrength {
    s128_12words = 128,
    s256_24words = 256,
}

export function isLatinBasedLanguage(language: MnemonicLanguages) {
    if (
        language === MnemonicLanguages.chinese_simplified ||
        language === MnemonicLanguages.chinese_traditional ||
        language === MnemonicLanguages.japanese ||
        language === MnemonicLanguages.korean
    ) {
        return false
    }
    return true
}

export function getWordList(language?: MnemonicLanguages) {
    switch (language) {
        case MnemonicLanguages.chinese_simplified:
            return bip39.wordlists.chinese_simplified
        case MnemonicLanguages.chinese_traditional:
            return bip39.wordlists.chinese_traditional
        case MnemonicLanguages.english:
            return bip39.wordlists.english
        case MnemonicLanguages.french:
            return bip39.wordlists.french
        case MnemonicLanguages.italian:
            return bip39.wordlists.italian
        case MnemonicLanguages.japanese:
            return bip39.wordlists.japanese
        case MnemonicLanguages.korean:
            return bip39.wordlists.korean
        case MnemonicLanguages.spanish:
            return bip39.wordlists.spanish
        case MnemonicLanguages.portuguese:
            return bip39.wordlists.portuguese
        default:
            return bip39.wordlists.english
    }
}

export function getLanguages() {
    return [
        MnemonicLanguages.chinese_simplified,
        MnemonicLanguages.chinese_traditional,
        MnemonicLanguages.english,
        MnemonicLanguages.french,
        MnemonicLanguages.italian,
        MnemonicLanguages.japanese,
        MnemonicLanguages.korean,
        MnemonicLanguages.spanish,
        MnemonicLanguages.portuguese,
    ]
}
