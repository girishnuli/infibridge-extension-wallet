<script lang="ts">
    import CeloFundsTab from '../../components/celo/home/CeloFundsTab.svelte'
    import CeloTabs from '../../components/celo/home/CeloTabs.svelte'
    import CeloTokensTab from '../../components/celo/home/CeloTokensTab.svelte'
    import CeloTransactionsTab from '../../components/celo/home/CeloTransactionsTab.svelte'
    import { CeloTab } from '../../models/enums/celotab'
    import MainLayout from '../../layouts/MainLayout.svelte'
    import CeloActionsTab from '../../components/celo/home/CeloActionsTab.svelte'

    // TODO: Change to funds tab
    let currentTab = CeloTab.Actions

    function switchTab(tab: CeloTab) {
        if (tab === currentTab) return
        currentTab = tab
    }

</script>

<MainLayout>
    <div class="flex-none">
        <CeloTabs {currentTab} on:tabClicked={e => switchTab(e.detail)} />
    </div>

    <!-- Occupy all available space -->
    <div class="flex-grow">
        {#if currentTab === CeloTab.Funds}
            <CeloFundsTab />
        {:else if currentTab === CeloTab.Transactions}
            <CeloTransactionsTab />
        {:else if currentTab === CeloTab.Tokens}
            <CeloTokensTab />
        {:else}
            <CeloActionsTab />
        {/if}
    </div>
</MainLayout>
