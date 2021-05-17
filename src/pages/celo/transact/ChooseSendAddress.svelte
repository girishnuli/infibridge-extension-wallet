<script lang="ts">
    //   import { push } from "svelte-spa-router";
    import BackButton from '../../../components/elements/BackButton.svelte'
</script>

<div class="w-full flex flex-col overflow-y-scroll" style="height:544px;">
    <BackButton />

    <!-- Address input -->
    <div class="p-4">
        <label for="address" class="block text-base font-medium text-gray-700"
            >Recipient Address / QR Code</label>
        <div class="mt-2 flex rounded-sm shadow-sm">
            <div
                class="relative flex items-stretch flex-grow focus-within:z-10">
                <input
                    type="text"
                    name="address"
                    id="address"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-sm pl-2 text-sm border-gray-300"
                    placeholder="Recipient address" />
            </div>
            <button
                class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-sm text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
        </div>
    </div>

    <!-- OR -->
    <span
        class="mx-auto w-14 h-14 p-4 rounded-full text-base font-medium bg-gray-600 text-white">
        OR
    </span>

    <!-- Select own address -->
    <div>
        <label
            for="own-accounts"
            class="block text-base font-semibold text-gray-600 mx-4 pt-4 pb-2 border-b-4 border-double border-gray-200"
            >Own Accounts</label>
        <div>
            <ul class="divide-y divide-gray-200 mx-4">
                <li class="p-4 flex hover:bg-gray-200 cursor-pointer">
                    <span class="account-seq">1</span>
                    <div class="ml-3">
                        <p class="text-base font-medium text-gray-800">
                            Account 1
                            <span class="ml-1 italic text-blue-400"
                                >800000000 celo</span>
                        </p>
                        <p class="text-xs text-gray-500">
                            0xe52B02c0c5CbDc5b59662d9c916c040F8E568857
                        </p>
                    </div>
                </li>

                <li class="py-4 px-4 flex hover:bg-gray-200 cursor-pointer">
                    <span class="account-seq">2</span>
                    <div class="ml-3">
                        <p class="text-base font-medium text-gray-900">
                            Account 2
                            <span class="ml-1 italic text-blue-400"
                                >800000000 celo</span>
                        </p>
                        <p class="text-xs text-gray-500">
                            0xe52B02c0c5CbDc5b59662d9c916c040F8E568857
                        </p>
                    </div>
                </li>

                <li class="py-4 px-4 flex hover:bg-gray-200 cursor-pointer">
                    <span class="account-seq">3</span>
                    <div class="ml-3">
                        <p class="text-base font-medium text-gray-900">
                            Account 3
                            <span class="ml-1 italic text-blue-400"
                                >800000000 celo</span>
                        </p>
                        <p class="text-xs text-gray-500">
                            0xe52B02c0c5CbDc5b59662d9c916c040F8E568857
                        </p>
                    </div>
                </li>

                <li class="py-4 px-4 flex hover:bg-gray-200 cursor-pointer">
                    <span class="account-seq">4</span>
                    <div class="ml-3">
                        <p class="text-base font-medium text-gray-900">
                            Account 4
                            <span class="ml-1 italic text-blue-400"
                                >800000000 celo</span>
                        </p>
                        <p class="text-xs text-gray-500">
                            0xe52B02c0c5CbDc5b59662d9c916c040F8E568857
                        </p>
                    </div>
                </li>

                <li class="py-4 px-4 flex hover:bg-gray-200 cursor-pointer">
                    <span class="account-seq">5</span>
                    <div class="ml-3">
                        <p class="text-base font-medium text-gray-900">
                            Account 5
                            <span class="ml-1 italic text-blue-400"
                                >800000000 celo</span>
                        </p>
                        <p class="text-xs text-gray-500">
                            0xe52B02c0c5CbDc5b59662d9c916c040F8E568857
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
