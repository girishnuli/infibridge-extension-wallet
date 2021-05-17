<script lang="ts">
    import { getTrimmedAddress } from '../../../utils/wallet/accountUtil'

    let transactionsCount = 2
</script>

<div class="w-full h-full flex flex-col">
    {#if transactionsCount === 0}
        <div class="flex-grow grid grid-cols-1 place-items-center">
            <p class="empty-content">Wow, such empty!</p>
        </div>
    {:else}
        <div class="w-full">
            <a href="/" class="transaction-item">
                <span class="transaction-seq">2</span>
                <div class="ml-4 flex justify-between items-center w-full">
                    <div class="py-1">
                        <p class="transaction-title flex items-center">
                            <span>Sent</span>
                            <span class="ml-2 inline-flex">
                                <svg
                                    class="transaction-details-svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                    <path
                                        d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                </svg>
                            </span>
                        </p>
                        <p class="transaction-address">
                            To: {getTrimmedAddress(
                                '0xe52B02c0c5CbDc5b59662d9c916c040F8E568857'
                            )}
                        </p>
                    </div>
                    <div>
                        <p class="transaction-balance">
                            <strong>- 8</strong> ETH
                        </p>
                    </div>
                </div>
            </a>

            <a href="/" class="transaction-item">
                <span class="transaction-seq">1</span>
                <div class="ml-4 flex justify-between items-center w-full">
                    <div class="py-1">
                        <p class="transaction-title flex items-center">
                            <span>Received</span>
                            <span class="ml-2 inline-flex">
                                <svg
                                    class="transaction-details-svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                    <path
                                        d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                </svg>
                            </span>
                        </p>
                        <p class="transaction-address">
                            From: {getTrimmedAddress(
                                '0xhjB02c0c5CbDc5b59662d9c916c040F8E568868'
                            )}
                        </p>
                    </div>
                    <div>
                        <p class="transaction-balance">
                            <strong>+ 3000</strong> ETH
                        </p>
                    </div>
                </div>
            </a>
        </div>
    {/if}
</div>
