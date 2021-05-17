// @ts-nocheck
export function clickOutside(node, { enabled: initialEnabled, cb }) {
    const handleOutsideClick = ({ target }) => {
        if (!node.contains(target)) {
            cb()
        }
    }

    function update({ enabled }) {
        if (enabled) {
            window.addEventListener('click', handleOutsideClick)
        } else {
            window.removeEventListener('click', handleOutsideClick)
        }
    }

    update(initialEnabled)
    return {
        update,
        destroy() {
            window.removeEventListener('click', handleOutsideClick)
        },
    }
}

export function copyElementToClipboard(element) {
    // Reference: https://stackoverflow.com/a/48020189
    if (element) {
        try {
            var range = document.createRange()
            range.selectNode(element)
            window.getSelection().removeAllRanges()
            window.getSelection().addRange(range)
            document.execCommand('copy')
            window.getSelection().removeAllRanges()
            return true
        } catch {}
    }

    return false
}

export function copyTextToClipboard(text: string) {
    if (text) {
        try {
            const element = document.createElement('textarea')
            element.value = text
            document.body.appendChild(element)
            element.select()
            document.execCommand('copy')
            document.body.removeChild(element)
            return true
        } catch {}
    }

    return false
}

export function openUrlInNewTab(url: string) {
    window.open(url, '_blank')
}
