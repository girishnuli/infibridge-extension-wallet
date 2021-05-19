<script lang="ts">
    import { _ } from 'svelte-i18n'
    import ActionsLayout from '../../../../layouts/ActionsLayout.svelte'

</script>

<ActionsLayout
    title={$_('Vote')}
    searchPlatceholderText={$_('SearchProposals')}>
    <ul class="flex flex-col p-4 overflow-y-auto">
        <li
            class="shadow divide-y divide-gray-200 border border-1 border-gray-200">
            <div class="w-full flex items-center justify-between p-6 space-x-6">
                <div class="flex-1 truncate">
                    <div class="flex items-center space-x-3">
                        <a
                            href="/"
                            class="flex items-center text-gray-800 text-sm font-medium truncate items-center">
                            CGP [0029]: Increase Validator Set Size
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
                        Authors:&nbsp;<span class="text-gray-700 font-medium"
                            >@trianglesphere</span>
                    </p>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Submitted: <span class="text-gray-700 font-medium"
                            >Monday, April 26th 2021, UTC+05:30 (23 days ago)</span>
                    </p>
                </div>
                <span
                    class="flex-shrink-0 inline-block px-2 py-0.5 text-white text-xs font-medium bg-black rounded-full"
                    >draft</span>
            </div>
            <div>
                <div class="-mt-px flex divide-x divide-gray-200">
                    <div class="w-0 flex-1 flex">
                        <a
                            href="/"
                            class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-red-700 font-medium border border-transparent hover:text-white hover:bg-red-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="ml-3">No</span>
                        </a>
                    </div>
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
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="ml-3">Abstain</span>
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
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="ml-3">Yes</span>
                        </a>
                    </div>
                </div>
            </div>
        </li>

        <li
            class="mt-8 shadow divide-y divide-gray-200 border border-1 border-gray-200">
            <div class="w-full flex items-center justify-between p-6 space-x-6">
                <div class="flex-1 truncate">
                    <div class="flex items-center space-x-3">
                        <a
                            href="/"
                            class="flex items-center text-gray-800 text-sm font-medium truncate items-center">
                            <strong>#27</strong>: Initialize uptime lookback
                            window
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
                        Proposed By:&nbsp;<span
                            class="text-gray-700 font-medium"
                            >0xf3eb910da09b8af348e0e5b6636da442cfa79239</span>
                    </p>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Proposal Date: <span class="text-gray-700 font-medium"
                            >14 days ago</span>
                    </p>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Approved: <span class="text-gray-700 font-medium"
                            >13 days ago</span>
                    </p>
                </div>
                <span
                    class="flex-shrink-0 inline-block px-2 py-0.5 text-white text-xs font-medium bg-green-500 rounded-full"
                    >passed</span>
            </div>
        </li>

        <li
            class="mt-8 shadow divide-y divide-gray-200 border border-1 border-gray-200">
            <div class="w-full flex items-center justify-between p-6 space-x-6">
                <div class="flex-1 truncate">
                    <div class="flex items-center space-x-3">
                        <a
                            href="/"
                            class="flex items-center text-gray-800 text-sm font-medium truncate items-center">
                            <strong>#26</strong>: cEUR activation window
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
                        Proposed By:&nbsp;<span
                            class="text-gray-700 font-medium"
                            >0xf3eb910da09b8af348e0e5b6636da442cfa79239</span>
                    </p>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Proposal Date: <span class="text-gray-700 font-medium"
                            >36 days ago</span>
                    </p>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Approved: <span class="text-gray-700 font-medium"
                            >34 days ago</span>
                    </p>
                </div>
                <span
                    class="flex-shrink-0 inline-block px-2 py-0.5 text-white text-xs font-medium bg-green-500 rounded-full"
                    >passed</span>
            </div>
        </li>

        <li
            class="mt-8 shadow divide-y divide-gray-200 border border-1 border-gray-200">
            <div class="w-full flex items-center justify-between p-6 space-x-6">
                <div class="flex-1 truncate">
                    <div class="flex items-center space-x-3">
                        <a
                            href="/"
                            class="flex items-center text-gray-800 text-sm font-medium truncate items-center">
                            <strong>#25</strong>: Community Appreciation Gifts
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
                        Proposed By:&nbsp;<span
                            class="text-gray-700 font-medium"
                            >0xf3eb910da09b8af348e0e5b6636da442cfa79239</span>
                    </p>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Proposal Date: <span class="text-gray-700 font-medium"
                            >61 days ago</span>
                    </p>
                    <p class="mt-1 text-gray-500 text-sm truncate">
                        Approved: <span class="text-gray-700 font-medium"
                            >60 days ago</span>
                    </p>
                </div>
                <span
                    class="flex-shrink-0 inline-block px-2 py-0.5 text-white text-xs font-medium bg-green-500 rounded-full"
                    >passed</span>
            </div>
        </li>
    </ul>
</ActionsLayout>
