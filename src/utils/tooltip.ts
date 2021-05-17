// @ts-nocheck

import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale-subtle.css'

interface TipContent {
    content: string
}

export default function tooltip(node: any, tipContent: TipContent) {
    const tip = tippy(node, {
        animation: 'scale-subtle',
        content: tipContent.content,
    })

    return {
        update: (newTipContent: TipContent) =>
            tip.setProps({ content: newTipContent.content }),

        destroy: () => tip.destroy(),
    }
}
