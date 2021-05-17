<script lang="ts">
    import { push } from 'svelte-spa-router'
    import { _ } from 'svelte-i18n'
    import GetStartedLayout from '../../layouts/GetStartedLayout.svelte'
    import { settings } from '../../stores/index'
    import { onMount } from 'svelte'

    let acceptedTerms = false
    let showErrorMsg = false

    const defaultNextStep = '/wallet-action'

    onMount(() => {
        if ($settings.agreeToTerms) {
            push(defaultNextStep)
        }
    })

    const start = async () => {
        if (!acceptedTerms) {
            showErrorMsg = true
            return
        } else {
            await settings.agreeToTerms(acceptedTerms)
            push(defaultNextStep)
        }
    }

</script>

<GetStartedLayout>
    <div slot="header-title">
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
            {$_('Welcome')}
        </h2>
        <p class="mt-2 text-base text-gray-600 max-w">
            {$_('WelcomeToInfibridgeMsg')}
        </p>
    </div>

    <div class="mt-6">
        <div>
            <div class="flex items-center">
                <input
                    id="accept_terms"
                    name="accept_terms"
                    type="checkbox"
                    class="checkbox"
                    bind:checked={acceptedTerms} />
                <label
                    for="accept_terms"
                    class="ml-2 block text-sm text-gray-800">
                    {$_('ToSMsg')}
                    <a
                        href="https://www.infibridge.com/termsofuse"
                        target="_blank">{$_('ToS')}</a>
                </label>
            </div>
            <p
                class="{showErrorMsg
                    ? ''
                    : 'hidden'} mt-2 ml-6 text-sm text-red-600">
                {$_('ToSErrorMsg')}
            </p>
            <button
                on:click={async () => await start()}
                class=" primary-btn mt-4">
                {$_('GetStarted')}
            </button>
        </div>
    </div>

    <div class="mt-6">
        <div>
            <div>
                <div class="grid grid-cols-3 gap-3">
                    <div>
                        <a
                            href="https://www.infibridge.com/docs"
                            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            {$_('Documentation')}
                        </a>
                    </div>

                    <div>
                        <a
                            href="https://twitter.com/infibridge"
                            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span class="sr-only">View on Twitter</span>
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true">
                                <path
                                    d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>
                    </div>

                    <div>
                        <a
                            href="https://github.com/infibridge/infibridge-browser-extension"
                            class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span class="sr-only">View on GitHub</span>
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true">
                                <path
                                    fill-rule="evenodd"
                                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-6 mx-auto w-full">
        <iframe
            title="Infibridge Intro Video"
            width="385"
            height="217"
            src="https://www.youtube.com/embed/epytphgm_a4?rel=0"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen />
    </div>

    <div slot="right-col" class="hidden sm:block relative w-0 flex-1">
        <img
            class="absolute inset-0 h-full w-full object-cover"
            src="/images/welcome.jpg"
            alt="welcome poster" />
    </div>
</GetStartedLayout>
