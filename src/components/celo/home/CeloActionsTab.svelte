<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { push } from 'svelte-spa-router'
    import { navRoutes } from '../../../constants/navRoutes'

</script>

<div
    class="bg-gray-200 overflow-hidden divide-y divide-gray-200 divide-y-0 grid grid-cols-1 gap-px">
    <div class="relative group hover:bg-gray-100 bg-white p-6">
        <div>
            <span
                class="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                <!-- Heroicon name: globe -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </span>
        </div>
        <div class="mt-8">
            <h3 class="text-lg font-medium">
                <a
                    on:click|preventDefault={() =>
                        push(navRoutes.CeloDiscoverIndexRoute)}
                    href="/"
                    class="focus:outline-none text-gray-800">
                    <span class="absolute inset-0" aria-hidden="true" />
                    {$_('Discover')}
                </a>
            </h3>
            <p class="mt-2 text-sm text-gray-500">
                {$_('DiscoverSub')}
            </p>
        </div>
        <span
            class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </span>
    </div>

    <div class="relative group hover:bg-gray-100 bg-white p-6">
        <div>
            <span
                class="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                <!-- Heroicon name: currency-dollar -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </span>
        </div>
        <div class="mt-8">
            <h3 class="text-lg font-medium">
                <a
                    on:click|preventDefault={() =>
                        push(navRoutes.CeloEarnIndexRoute)}
                    href="/"
                    class="focus:outline-none text-gray-800">
                    <span class="absolute inset-0" aria-hidden="true" />
                    {$_('Earn')}
                </a>
            </h3>
            <p class="mt-2 text-sm text-gray-500">
                {$_('EarnSub')}
            </p>
        </div>
        <span
            class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </span>
    </div>

    <div class="relative group hover:bg-gray-100 bg-white p-6">
        <div>
            <span
                class="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                <!-- Heroicon name: thumb-up -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
            </span>
        </div>
        <div class="mt-8">
            <h3 class="text-lg font-medium">
                <a
                    on:click|preventDefault={() =>
                        push(navRoutes.CeloVoteIndexRoute)}
                    href="/"
                    class="focus:outline-none text-gray-800">
                    <span class="absolute inset-0" aria-hidden="true" />
                    {$_('Vote')}
                </a>
            </h3>
            <p class="mt-2 text-sm text-gray-500">
                {$_('VoteSub')}
            </p>
        </div>
        <span
            class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </span>
    </div>
</div>
