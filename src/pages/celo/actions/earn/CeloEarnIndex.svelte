<script lang="ts">
    import { _ } from 'svelte-i18n'
    import ActionsLayout from '../../../../layouts/ActionsLayout.svelte'
</script>

<ActionsLayout
    title={$_('Earn')}
    searchPlatceholderText={$_('SearchValidators')}>
    <ul class="flex flex-col p-4 overflow-y-auto">
        <li
            class="shadow divide-y divide-gray-200 border border-1 border-gray-200">
            <div class="w-full flex items-center justify-between p-6 space-x-6">
                <div class="flex-1 truncate">
                    <div class="flex items-center space-x-3">
                        <a
                            href="/"
                            class="flex items-center text-gray-800 text-sm font-medium truncate items-center">
                            0x35ae10f412503abcf9275133613e8df7f56e72be
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 flex-shrink-0 inline-block ml-1 text-blue-500"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path
                                    d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                        </a>
                    </div>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Delegation Address:&nbsp;<span
                            class="text-gray-700 font-medium"
                            >0x35ae10f412503abcf9275133613e8df7f56e72be</span>
                    </p>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Balance:&nbsp;<span class="text-gray-700 font-medium"
                            >$3,840,464</span>
                    </p>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Voting Power: <span class="text-gray-700 font-medium"
                            >5.28%</span>
                    </p>
                </div>
                <span
                    class="flex-shrink-0 inline-block px-2.5 py-1 text-white text-xs font-medium bg-blue-600 rounded-full"
                    >6%</span>
            </div>
            <div>
                <div class="-mt-px flex divide-x divide-gray-200">
                    <div class="-ml-px w-0 flex-1 flex">
                        <a
                            href="/"
                            class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-500 font-medium border border-transparent hover:text-white hover:bg-gray-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="ml-3">More Info</span>
                        </a>
                    </div>
                    <div class="-ml-px w-0 flex-1 flex">
                        <a
                            href="/"
                            class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-green-700 font-medium border border-transparent hover:text-white hover:bg-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="ml-3">Stake</span>
                        </a>
                    </div>
                </div>
            </div>
        </li>

        <li
            class="mt-4 shadow divide-y divide-gray-200 border border-1 border-gray-200">
            <div class="w-full flex items-center justify-between p-6 space-x-6">
                <div class="flex-1 truncate">
                    <div class="flex items-center space-x-3">
                        <a
                            href="/"
                            class="flex items-center text-gray-800 text-sm font-medium truncate items-center">
                            Polychain labs
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 flex-shrink-0 inline-block ml-1 text-blue-500"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path
                                    d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                        </a>
                    </div>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Delegation Address:&nbsp;<span
                            class="text-gray-700 font-medium"
                            >0x47b2db6af05a55d42ed0f3731735f9479abf0673</span>
                    </p>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Balance:&nbsp;<span class="text-gray-700 font-medium"
                            >$3,033,546</span>
                    </p>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Voting Power: <span class="text-gray-700 font-medium"
                            >4.17%</span>
                    </p>
                </div>
                <span
                    class="flex-shrink-0 inline-block px-2.5 py-1 text-white text-xs font-medium bg-blue-600 rounded-full"
                    >6%</span>
            </div>
            <div>
                <div class="-mt-px flex divide-x divide-gray-200">
                    <div class="-ml-px w-0 flex-1 flex">
                        <a
                            href="/"
                            class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-500 font-medium border border-transparent hover:text-white hover:bg-gray-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="ml-3">More Info</span>
                        </a>
                    </div>
                    <div class="-ml-px w-0 flex-1 flex">
                        <a
                            href="/"
                            class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-green-700 font-medium border border-transparent hover:text-white hover:bg-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="ml-3">Stake</span>
                        </a>
                    </div>
                </div>
            </div>
        </li>

        <li
            class="mt-4 shadow divide-y divide-gray-200 border border-1 border-gray-200">
            <div class="w-full flex items-center justify-between p-6 space-x-6">
                <div class="flex-1 truncate">
                    <div class="flex items-center space-x-3">
                        <a
                            href="/"
                            class="flex items-center text-gray-800 text-sm font-medium truncate items-center">
                            Bison Trails
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 flex-shrink-0 inline-block ml-1 text-blue-500"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path
                                    d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                        </a>
                    </div>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Delegation Address:&nbsp;<span
                            class="text-gray-700 font-medium"
                            >0xdadbd6cfb29b054adc9c4c2ef0f21f0bbdb44871</span>
                    </p>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Balance:&nbsp;<span class="text-gray-700 font-medium"
                            >$2,876,215</span>
                    </p>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Voting Power: <span class="text-gray-700 font-medium"
                            >3.96%</span>
                    </p>
                </div>
                <span
                    class="flex-shrink-0 inline-block px-2.5 py-1 text-white text-xs font-medium bg-blue-600 rounded-full"
                    >6%</span>
            </div>
            <div>
                <div class="-mt-px flex divide-x divide-gray-200">
                    <div class="-ml-px w-0 flex-1 flex">
                        <a
                            href="/"
                            class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-500 font-medium border border-transparent hover:text-white hover:bg-gray-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="ml-3">More Info</span>
                        </a>
                    </div>
                    <div class="-ml-px w-0 flex-1 flex">
                        <a
                            href="/"
                            class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-green-700 font-medium border border-transparent hover:text-white hover:bg-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="ml-3">Stake</span>
                        </a>
                    </div>
                </div>
            </div>
        </li>

        <li
            class="mt-4 shadow divide-y divide-gray-200 border border-1 border-gray-200">
            <div class="w-full flex items-center justify-between p-6 space-x-6">
                <div class="flex-1 truncate">
                    <div class="flex items-center space-x-3">
                        <a
                            href="/"
                            class="flex items-center text-gray-800 text-sm font-medium truncate items-center">
                            Figment
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 flex-shrink-0 inline-block ml-1 text-blue-500"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path
                                    d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                        </a>
                    </div>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Delegation Address:&nbsp;<span
                            class="text-gray-700 font-medium"
                            >0x01b2b83fdf26afc3ca7062c35bc68c8dde56db04</span>
                    </p>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Balance:&nbsp;<span class="text-gray-700 font-medium"
                            >$2,615,493</span>
                    </p>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Voting Power: <span class="text-gray-700 font-medium"
                            >3.6%</span>
                    </p>
                </div>
                <span
                    class="flex-shrink-0 inline-block px-2.5 py-1 text-white text-xs font-medium bg-blue-600 rounded-full"
                    >5.99%</span>
            </div>
            <div>
                <div class="-mt-px flex divide-x divide-gray-200">
                    <div class="-ml-px w-0 flex-1 flex">
                        <a
                            href="/"
                            class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-500 font-medium border border-transparent hover:text-white hover:bg-gray-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="ml-3">More Info</span>
                        </a>
                    </div>
                    <div class="-ml-px w-0 flex-1 flex">
                        <a
                            href="/"
                            class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-green-700 font-medium border border-transparent hover:text-white hover:bg-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="ml-3">Stake</span>
                        </a>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</ActionsLayout>
