<script lang="ts">
    import { CeloTab } from '../../../models/enums/celotab'
    import { createEventDispatcher } from 'svelte'
    import { eventTypes } from '../../../constants/eventTypes'

    const dispatch = createEventDispatcher()

    export let currentTab: CeloTab
</script>

<div class="border-b border-gray-200">
    <nav class="-mb-px flex justify-between" aria-label="Tabs">
        <a
            href="/"
            class={currentTab === CeloTab.Funds ? 'active-tab' : 'normal-tab'}
            on:click|preventDefault={() =>
                dispatch(eventTypes.tabClicked, CeloTab.Funds)}>
            Funds
        </a>
        <a
            href="/"
            class={currentTab === CeloTab.Transactions
                ? 'active-tab'
                : 'normal-tab'}
            on:click|preventDefault={() =>
                dispatch(eventTypes.tabClicked, CeloTab.Transactions)}>
            Transactions
        </a>
        <a
            href="/"
            class={currentTab === CeloTab.Tokens ? 'active-tab' : 'normal-tab'}
            on:click|preventDefault={() =>
                dispatch(eventTypes.tabClicked, CeloTab.Tokens)}>
            Tokens
        </a>
        <a
            href="/"
            class={currentTab === CeloTab.Actions ? 'active-tab' : 'normal-tab'}
            on:click|preventDefault={() =>
                dispatch(eventTypes.tabClicked, CeloTab.Actions)}>
            Actions
        </a>
    </nav>
</div>
